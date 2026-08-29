<script setup lang="ts">
import ShopItem from '@/components/ShopItem.vue'

import { useShopStore } from '@/stores/shop'

const shopStore = useShopStore()

const shopList = shopStore.getShopList
</script>

<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <h1>Shop page</h1>

        <div class="item__wrepper">
          <ShopItem v-for="product in shopList" :key="product.id" :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>
