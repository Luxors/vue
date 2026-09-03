<script setup lang="ts">
import { ref, computed } from 'vue';

import type { Note } from '@/types/note';

import IconGrid from '@/components/icons/IconGrid.vue';
import IconTile from '@/components/icons/IconTile.vue';

import Message from '@/components/Message.vue';
import NewNote from '@/components/NewNote.vue';
import Search from '@/components/Search.vue';
import NotesList from '@/components/NotesList.vue';

import { useNotesStore } from '@/stores/notes';

const store = useNotesStore();

const title = ref('Notes App');
const message = ref<string | null>(null);
const grid = ref(true);
const search = ref('');
const newNote = ref<Note>({
  title: '',
  priority: 'normal',
  description: '',
});

const filteredNotes = computed(() => {
  let notesList = store.getNotes;
  let searchResult = search.value;
  if (!searchResult) return notesList;
  // Small
  searchResult = searchResult.trim().toLowerCase();
  // Filter
  notesList = notesList.filter(function (item) {
    if (item.title.toLowerCase().indexOf(searchResult) !== -1) {
      return item;
    }
  });
  // Error
  return notesList;
});

function addNote() {
  const { title, priority, description } = newNote.value;
  console.log(title, priority, description);

  if (!title) {
    message.value = 'title can`t be blank!';
    return false;
  }

  store.addNote({
    title,
    priority,
    description,
  });

  message.value = null;
  newNote.value.title = '';
  newNote.value.priority = 'normal';
  newNote.value.description = '';
}

function removeNote(index: number) {
  store.removeNote(index);
}
</script>

<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <div
            class="note-header"
            style="margin: 36px 0; justify-content: center"
          >
            <p>{{ title }}</p>
          </div>
          <!-- message -->
          <Message
            v-if="message"
            :message="message"
          />

          <!-- new note -->
          <NewNote
            v-model="newNote"
            @addNote="addNote"
          />

          <header
            class="note-header"
            style="margin: 36px 0"
          >
            <!-- title -->
            <h1>{{ title }}</h1>

            <!-- search -->
            <Search
              v-model="search"
              placeholder="Find your note"
            />

            <!-- icons controls -->
            <div class="icons">
              <button
                type="button"
                @click="grid = true"
              >
                <IconGrid :class="{ active: grid }" />
              </button>
              <button
                type="button"
                @click="grid = false"
              >
                <IconTile :class="{ active: !grid }" />
              </button>
            </div>
          </header>

          <!-- note list -->
          <NotesList
            :notes="filteredNotes"
            :grid="grid"
            @remove="removeNote"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/main.scss';

.icons {
  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
}
</style>
