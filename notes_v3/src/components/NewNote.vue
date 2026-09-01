<script setup lang="ts">
import { reactive, watch } from 'vue';

import type { Note } from '@/types/note';

import Radio from "@/components/Radio.vue";

export interface Props {
  note: Note;
}

const props = defineProps<Props>();

const emit = defineEmits(['addNote'])

const newNote = reactive({
  title: props.note.title,
  description: props.note.description,
  priority: props.note.priority
})

watch(() => props.note, (note: Note) => {
  newNote.title = note.title
  newNote.description = note.description
  newNote.priority = note.priority
}, { deep: true })

function addNote() {
  emit('addNote', { ...newNote })
}
</script>

<template>
  <!-- new note -->
  <div class="new-note">
    <p class="input-wrap">
      <label for="title">Title</label>
      <input v-model="newNote.title" type="text" id="title" />
    </p>

    <p class="input-wrap">
      <label for="description">Description</label>
      <textarea v-model="newNote.description" id="description"></textarea>
    </p>

    <fieldset class="new-note__priority">
      <legend>Priority</legend>

      <Radio v-model="newNote.priority" val="normal" caption="Normal" />

      <Radio v-model="newNote.priority" val="medium" caption="Medium" />

      <Radio v-model="newNote.priority" val="high" caption="High" />
    </fieldset>

    <button class="btn btnPrimary" @click="addNote">New note</button>

    <!-- <div>Priority: {{ note.priority }}</div> -->
  </div>
</template>


<style lang="scss">
.new-note {
  text-align: center;
}
.input-wrap {
  margin-bottom: 30px;
}
.new-note__priority {
  margin-bottom: 50px;
  border: 0;

  legend {
    margin-bottom: 10px;
  }
}
</style>
