<script setup lang="ts"></script>

<template>
  <div class="home">
    <h1 class="home__title">Welcome to Bookmarkly</h1>
    <p class="home__description">To get started, select a bookmark category or create a new one.</p>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.563rem;
  height: 100%;
}

.home__title {
  font-size: 1.5rem;
}

.home__description {
  font-size: 1rem;
}
</style>
