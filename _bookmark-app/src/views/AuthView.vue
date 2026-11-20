<script setup lang="ts">
import { ref } from 'vue';

import { useAuthStore } from '@/stores/auth.store';

import BaseInputText from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

const authStore = useAuthStore();

const form = ref<{
  email?: string;
  password?: string;
}>({});

function onSubmit(event: Event) {
  event.preventDefault();
  if (!form.value.email || !form.value.password) {
    return;
  }
  authStore.login(form.value.email, form.value.password);
}
</script>

<template>
  <main class="auth">
    <div class="auth__caption">
      <h1 class="auth__title">Bookmarkly</h1>
      <form class="auth__form" @submit="onSubmit">
        <BaseInputText v-model="form.email" placeholder="Email" />
        <BaseInputText v-model="form.password" type="password" placeholder="Password" />
        <BaseButton type="submit" label="Enter" />
        {{ authStore.getToken }}
      </form>
    </div>
  </main>
</template>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.auth__caption {
  max-width: 18.5rem;
  text-align: center;
}

.auth__title {
  margin-bottom: 3rem;
  font-size: 3.25rem;
}

.auth__form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
