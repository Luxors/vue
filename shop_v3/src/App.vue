<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const nav = ref([
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Shop',
    url: '/shop',
  },
])
</script>

<template>
  <div class="wrapper">
    <header>
      <nav class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">VUE-CLI</div>
            <ul class="navbar-list">
              <li class="navbar-item" v-for="link in nav" :key="link.title">
                <RouterLink class="navbar-link" :to="link.url">{{ link.title }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style lang="scss">
@use './assets/styles/main.scss';

.navbar-link.router-link-exact-active {
  color: #494ce8;
}
</style>
