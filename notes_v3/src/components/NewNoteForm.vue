<script setup lang="ts">
import { computed } from 'vue';

import type { Note } from '@/types/note';

import Radio from '@/components/Radio.vue';

export interface Props {
  modelValue: Note;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'addNote']);

const newNote = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function addNote() {
  emit('addNote', { ...newNote });
}
</script>

<template>
  <!-- new note -->
  <form class="new-note">
    <p class="input-wrap">
      <label for="title">Title</label>
      <input
        v-model="newNote.title"
        type="text"
        id="title"
      />
    </p>

    <p class="input-wrap">
      <label for="description">Description</label>
      <textarea
        v-model="newNote.description"
        id="description"
      ></textarea>
    </p>

    <fieldset class="new-note-priority">
      <legend class="new-note-priority__legend">Priority</legend>

      <div class="new-note-priority__inputs">
        <Radio
          v-model="newNote.priority"
          val="normal"
          caption="Normal"
        />

        <Radio
          v-model="newNote.priority"
          val="medium"
          caption="Medium"
        />

        <Radio
          v-model="newNote.priority"
          val="high"
          caption="High"
        />
      </div>
    </fieldset>

    <button
      type="button"
      class="btn btnPrimary"
      @click="addNote"
    >
      New note
    </button>

    <!-- <div>Priority: {{ note.priority }}</div> -->
  </form>
</template>

<style lang="scss">
.new-note {
  text-align: center;

  .input-wrap {
    margin-bottom: 30px;
  }
}
.new-note-priority {
  margin-bottom: 50px;
  border: 0;

  &__legend {
    margin-bottom: 10px;
  }

  &__inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
}
</style>
