import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import type { Note, NewNote } from '@/types/note';

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([
    {
      title: 'First Note',
      priority: 'normal',
      description: 'Description for first note',
      date: new Date(Date.now()).toLocaleString(),
    },
    {
      title: 'Second Note',
      priority: 'medium',
      description: 'Description for second note',
      date: new Date(Date.now()).toLocaleString(),
    },
    {
      title: 'Third Note',
      priority: 'high',
      description: 'Description for third note',
      date: new Date(Date.now()).toLocaleString(),
    },
  ]);

  // Getters
  const getNotes = computed(() => notes.value);

  const getNotesCount = computed(() => notes.value.length);

  const getNotesByPriority = computed(() => {
    return (priority: Note['priority']) => {
      return notes.value.filter((note) => note.priority === priority);
    };
  });

  // Actions
  const addNote = (payload: NewNote) => {
    notes.value.push({
      ...payload,
      date: new Date().toLocaleString(),
    });
  };

  const removeNote = (index: number) => {
    if (index >= 0 && index < notes.value.length) {
      notes.value.splice(index, 1);
    }
  };

  const updateNote = (index: number, payload: Partial<NewNote>) => {
    const current = notes.value.at(index) as NewNote;

    notes.value[index] = {
      ...current,
      ...payload,
    };
  };

  const clearNotes = () => {
    notes.value = [];
  };

  return {
    notes,
    getNotes,
    getNotesByPriority,
    getNotesCount,
    addNote,
    removeNote,
    updateNote,
    clearNotes,
  };
});
