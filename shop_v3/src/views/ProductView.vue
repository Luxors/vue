<script setup lang="ts">
import { useRoute } from 'vue-router'

import 'vue3-carousel/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

import { useShopStore } from '@/stores/shop'
import { computed } from 'vue'

const route = useRoute()

const shopStore = useShopStore()

const product = computed(() => {
  const id = Number(route.params.id)
  return shopStore.getProduct(id)
})
</script>

<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section v-if="product">
      <div class="container">
        <div class="product__wraper">
          <div class="product-slider">
            <Carousel
              :perPage="1"
              :paginationEnabled="true"
              paginationColor="#b3b3b3"
              paginationActiveColor="#494ce8"
            >
              <Slide v-for="(slide, index) in product.gallery" :key="index">
                <img :src="slide.img" :alt="slide.name" />
              </Slide>
            </Carousel>
          </div>

          <div class="product-content">
            <h1 class="title">{{ product.title }}</h1>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>
    </section>
    <div class="container" v-else>
      <div class="product__not-found">Such a product does not exist</div>
    </div>
  </div>
</template>

<style>
.product__wraper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-slider,
.product-content {
  max-width: 48%;
  text-align: center;
}
.product__not-found {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
