import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { DatabaseSync } from 'node:sqlite';
import ogs from 'open-graph-scraper';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

// ─── Configuration ──────────────────────────────────────────────
const PORT = 3000;
const JWT_SECRET = 'bookmark-app-secret-key';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '..', 'db', 'bookmarks.db');

// ─── SQLite Database ────────────────────────────────────────────
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    alias TEXT NOT NULL UNIQUE
  );
  CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    url TEXT NOT NULL,
    title TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  );
`);

// ─── Express Application ────────────────────────────────────────
const app = express();

app.use(cors());
app.use(express.json());

// ─── Middleware: JWT Token Verification ──────────────────────────
interface JwtPayload {
  id: number;
  email: string;
  name: string;
}

function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token not provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ─── Password Hashing (SHA-256) ─────────────────────────────────
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

// ═══════════════════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════════════════

// POST /api/auth/login — returns JWT token
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Fields email and password are required' });
    return;
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token });
});

// GET /api/auth/profile — current user profile (from DB)
app.get('/api/auth/profile', authMiddleware, (req, res) => {
  const jwtUser = (req as any).user as JwtPayload;

  // Read actual data from DB
  const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(jwtUser.id) as any;

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ id: user.id, email: user.email, name: user.name });
});

// ═══════════════════════════════════════════════════════════════
//  PROFILE (backward compatibility with original course API)
// ═══════════════════════════════════════════════════════════════

// GET /api/profile — returns name (backward compatibility)
app.get('/api/profile', (req, res) => {
  // If token is present — take name from it, otherwise return default
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      res.json({ name: decoded.name });
      return;
    } catch {
      // Invalid token — return default name
    }
  }

  res.json({ name: 'Guest' });
});

// ═══════════════════════════════════════════════════════════════
//  CATEGORIES
// ═══════════════════════════════════════════════════════════════

// GET /api/categories — all categories
app.get('/api/categories', (_req, res) => {
  const rows = db.prepare('SELECT id, name, alias FROM categories').all();
  res.json(rows);
});

// POST /api/categories — create category
app.post('/api/categories', (req, res) => {
  const { name, alias } = req.body;

  if (!name || !alias) {
    res.status(400).json({ error: 'Fields name and alias are required' });
    return;
  }

  try {
    const result = db.prepare('INSERT INTO categories (name, alias) VALUES (?, ?)').run(name, alias);
    res.status(201).json({ id: Number(result.lastInsertRowid), name, alias });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/categories/:id — update category
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name, alias } = req.body;

  if (!name || !alias) {
    res.status(400).json({ error: 'Fields name and alias are required' });
    return;
  }

  db.prepare('UPDATE categories SET name = ?, alias = ? WHERE id = ?').run(name, alias, Number(id));
  res.json({ id: Number(id), name, alias });
});

// DELETE /api/categories/:id — delete category (and all its bookmarks)
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM bookmarks WHERE category_id = ?').run(Number(id));
  db.prepare('DELETE FROM categories WHERE id = ?').run(Number(id));
  res.json({ success: true });
});

// ═══════════════════════════════════════════════════════════════
//  BOOKMARKS
// ═══════════════════════════════════════════════════════════════

// GET /api/categories/:id/bookmarks — category bookmarks (with sorting)
app.get('/api/categories/:id/bookmarks', (req, res) => {
  const { id } = req.params;
  const sort = req.query.sort as string | undefined;

  let orderBy = 'created_at DESC';
  if (sort === 'title') {
    orderBy = 'title ASC';
  } else if (sort === 'date') {
    orderBy = 'created_at DESC';
  }

  const rows = db
    .prepare(`SELECT id, category_id, url, title, image, created_at FROM bookmarks WHERE category_id = ? ORDER BY ${orderBy}`)
    .all(Number(id));

  res.json(rows);
});

// POST /api/bookmarks — create bookmark (with automatic OpenGraph parsing)
app.post('/api/bookmarks', async (req, res) => {
  const { category_id, url } = req.body;

  if (!category_id || !url) {
    res.status(400).json({ error: 'Fields category_id and url are required' });
    return;
  }

  // Parse OpenGraph metadata from the URL
  let title = url;
  let image = '';

  try {
    const { result } = await ogs({ url });
    if (result.ogTitle) title = result.ogTitle;
    if (result.ogImage && result.ogImage.length > 0) {
      image = result.ogImage[0].url;
    }
  } catch {
    // If parsing failed — keep url as title
  }

  try {
    const result = db
      .prepare('INSERT INTO bookmarks (category_id, url, title, image) VALUES (?, ?, ?, ?)')
      .run(Number(category_id), url, title, image);

    res.status(201).json({
      id: Number(result.lastInsertRowid),
      category_id: Number(category_id),
      url,
      title,
      image,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bookmarks/:id — delete bookmark
app.delete('/api/bookmarks/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM bookmarks WHERE id = ?').run(Number(id));
  res.json({ success: true });
});

// ─── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Bookmark API is running: http://localhost:${PORT}/api`);
});
