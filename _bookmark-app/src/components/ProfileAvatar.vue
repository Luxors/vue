<script setup lang="ts">
const { name } = defineProps<{ name: string }>()
</script>

<template>
  <div class="profile-avatar">
    <img src="../assets/images/avatar.jpg" alt="User avatar" class="profile-avatar__image" />
    <p class="profile-avatar__name"><b>Hello</b>, {{ name }}</p>
  </div>
</template>

<style lang="css" scoped>
.profile-avatar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-avatar__image {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 100%;
}

.profile-avatar__name {
  font-size: 1.125rem;
}
</style>
