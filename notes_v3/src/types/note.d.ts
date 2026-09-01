export interface Note {
  title: string;
  priority: 'low' | 'normal' | 'medium' | 'high';
  description: string;
  date?: string;
}

export type NewNote = Omit<Note, 'date'>;
