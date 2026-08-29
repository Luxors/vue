<script setup lang="ts">
import type { Product } from '@/types/product'

export interface Props {
  product: Product
}

defineProps<Props>()
</script>

<template>
  <div class="item">
    <img :src="product.img" :alt="product.title" />
    <router-link :to="`/shop/${product.id}`" class="link">{{ product.title }}</router-link>
  </div>
</template>

<style>
.item {
  max-width: 48%;
  text-align: center;

  p {
    font-size: 22px;
  }
}
</style>
