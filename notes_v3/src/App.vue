<script setup lang="ts">
import { ref, computed } from 'vue';

import type { Note } from '@/types/note';

import Message from '@/components/Message.vue';
import NewNote from '@/components/NewNote.vue';
import Search from '@/components/Search.vue';
import Notes from "@/components/Notes.vue";

const title = ref('Notes App');
const message = ref(null);
const grid = ref(true);
const search = ref('');
const note = ref<Note>({
  title: '',
  priority: 'normal',
  description: ''
});

const notesFilter = computed(() => {
  // let array = this.notes;
  // let array = [];
  //   let search2 = search.value;
  // if (!search2) return array
  // // Small
  // search2 = search2.trim().toLowerCase()
  // // Filter
  // array = array.filter(function (item) {
  //   if (item.title.toLowerCase().indexOf(search) !== -1) {
  //     return item
  //   }
  // })
  // Error
  // return array
  return []
})

function addNote() {
  console.log(title.value);
}

function removeNote() {
  console.log(title.value);
}
</script>

<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          <div class="note-header" style="margin: 36px 0; justify-content: center">
            <p>{{title}}</p>
          </div>
          <!-- message -->
          <Message v-if="message" :message="message" />

          <!-- new note -->
          <NewNote :note="note" @addNote="addNote" />

          <div class="note-header" style="margin: 36px 0">
            <!-- title -->
            <h1>{{ title }}</h1>

            <!-- search -->
            <Search v-model="search" placeholder="Find your note" />

            <!-- icons controls -->
            <div class="icons">
              <button type="button" @click="grid = true">
                <svg
                  :class="{ active: grid }"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button type="button" @click="grid = false">
                <svg
                  :class="{ active: !grid }"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3" y2="6"></line>
                  <line x1="3" y1="12" x2="3" y2="12"></line>
                  <line x1="3" y1="18" x2="3" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- note list -->
          <Notes :notes="notesFilter" :grid="grid" @remove="removeNote" />
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
