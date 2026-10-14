<script setup lang="ts">
const { term = "Not specified", descr = "Not specified" } = defineProps({
  term: String,
  descr: String,
});
</script>

<template>
  <div class="app-stat">
    <dt class="app-stat__term">{{ term }}</dt>
    <dd class="app-stat__descr">{{ descr }}</dd>
  </div>
</template>

<style lang="css" scoped>
.app-stat {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.app-stat__term {
  font-weight: 700;
}
.app-stat__descr {
  font-weight: 500;
}
</style>
