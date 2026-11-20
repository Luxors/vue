import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { DatabaseSync } from 'node:sqlite';
import ogs from 'open-graph-scraper';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

// ─── Конфигурация ───────────────────────────────────────────────
const PORT = 3000;
const JWT_SECRET = 'bookmark-app-secret-key';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '..', 'db', 'bookmarks.db');

// ─── База данных SQLite ─────────────────────────────────────────
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

// ─── Express приложение ─────────────────────────────────────────
const app = express();

app.use(cors());
app.use(express.json());

// ─── Middleware: проверка JWT токена ─────────────────────────────
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
    res.status(401).json({ error: 'Токен не предоставлен' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Невалидный токен' });
  }
}

// ─── Хеширование пароля (SHA-256) ───────────────────────────────
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

// ═══════════════════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════════════════

// POST /api/auth/login — возвращает JWT токен
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Поля email и password обязательны' });
    return;
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token });
});

// GET /api/auth/profile — профиль текущего пользователя (из БД)
app.get('/api/auth/profile', authMiddleware, (req, res) => {
  const jwtUser = (req as any).user as JwtPayload;

  // Читаем актуальные данные из БД
  const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(jwtUser.id) as any;

  if (!user) {
    res.status(404).json({ error: 'Пользователь не найден' });
    return;
  }

  res.json({ id: user.id, email: user.email, name: user.name });
});

// ═══════════════════════════════════════════════════════════════
//  PROFILE (совместимость с оригинальным API курса)
// ═══════════════════════════════════════════════════════════════

// GET /api/profile — возвращает имя (обратная совместимость)
app.get('/api/profile', (req, res) => {
  // Если есть токен — берём имя из него, иначе отдаём дефолтное
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      res.json({ name: decoded.name });
      return;
    } catch {
      // Токен невалидный — отдаём дефолтное имя
    }
  }

  res.json({ name: 'Guest' });
});

// ═══════════════════════════════════════════════════════════════
//  CATEGORIES
// ═══════════════════════════════════════════════════════════════

// GET /api/categories — все категории
app.get('/api/categories', (_req, res) => {
  const rows = db.prepare('SELECT id, name, alias FROM categories').all();
  res.json(rows);
});

// POST /api/categories — создать категорию
app.post('/api/categories', (req, res) => {
  const { name, alias } = req.body;

  if (!name || !alias) {
    res.status(400).json({ error: 'Поля name и alias обязательны' });
    return;
  }

  try {
    const result = db.prepare('INSERT INTO categories (name, alias) VALUES (?, ?)').run(name, alias);
    res.status(201).json({ id: Number(result.lastInsertRowid), name, alias });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/categories/:id — обновить категорию
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name, alias } = req.body;

  if (!name || !alias) {
    res.status(400).json({ error: 'Поля name и alias обязательны' });
    return;
  }

  db.prepare('UPDATE categories SET name = ?, alias = ? WHERE id = ?').run(name, alias, Number(id));
  res.json({ id: Number(id), name, alias });
});

// DELETE /api/categories/:id — удалить категорию (и все её закладки)
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM bookmarks WHERE category_id = ?').run(Number(id));
  db.prepare('DELETE FROM categories WHERE id = ?').run(Number(id));
  res.json({ success: true });
});

// ═══════════════════════════════════════════════════════════════
//  BOOKMARKS
// ═══════════════════════════════════════════════════════════════

// GET /api/categories/:id/bookmarks — закладки категории (с сортировкой)
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

// POST /api/bookmarks — создать закладку (с автоматическим парсингом OpenGraph)
app.post('/api/bookmarks', async (req, res) => {
  const { category_id, url } = req.body;

  if (!category_id || !url) {
    res.status(400).json({ error: 'Поля category_id и url обязательны' });
    return;
  }

  // Парсинг OpenGraph метаданных по ссылке
  let title = url;
  let image = '';

  try {
    const { result } = await ogs({ url });
    if (result.ogTitle) title = result.ogTitle;
    if (result.ogImage && result.ogImage.length > 0) {
      image = result.ogImage[0].url;
    }
  } catch {
    // Если не удалось спарсить — оставляем url как title
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

// DELETE /api/bookmarks/:id — удалить закладку
app.delete('/api/bookmarks/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM bookmarks WHERE id = ?').run(Number(id));
  res.json({ success: true });
});

// ─── Запуск ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Bookmark API запущен: http://localhost:${PORT}/api`);
});
