// store/shop.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { Product } from '@/types/product'

import { useGetImage } from '@/composables/useGetImage'

export const useShopStore = defineStore('shop', () => {
  const { getImage } = useGetImage()

  // State
  const shopList = ref<Product[]>([
    {
      id: 1,
      title: 'Nike Red',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      img: getImage('1.png'),
      gallery: [
        {
          name: 'Nike boots first',
          img: getImage('1.png'),
        },
        {
          name: 'Nike boots second',
          img: getImage('2.png'),
        },
        {
          name: 'Nike boots third',
          img: getImage('3.png'),
        },
      ],
    },
    {
      id: 2,
      title: 'Nike Default',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      img: getImage('4.png'),
      gallery: [
        {
          name: 'Nike boots first',
          img: getImage('4.png'),
        },
        {
          name: 'Nike boots second',
          img: getImage('5.png'),
        },
        {
          name: 'Nike boots third',
          img: getImage('6.png'),
        },
      ],
    },
    {
      id: 3,
      title: 'Nike Green',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      img: getImage('7.png'),
      gallery: [
        {
          name: 'Nike boots first',
          img: getImage('7.png'),
        },
        {
          name: 'Nike boots second',
          img: getImage('8.png'),
        },
        {
          name: 'Nike boots third',
          img: getImage('9.png'),
        },
      ],
    },
    {
      id: 4,
      title: 'Nike Street',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      img: getImage('10.png'),
      gallery: [
        {
          name: 'Nike boots second',
          img: getImage('11.png'),
        },
        {
          name: 'Nike boots third',
          img: getImage('12.png'),
        },
      ],
    },
  ])

  // Getters
  const getShopList = computed((): Product[] => shopList.value)

  const getProduct = (id: number): Product | undefined => {
    return shopList.value.find((product) => product.id === id)
  }

  // Actions
  // можно добавить actions при необходимости

  return {
    shopList,
    getShopList,
    getProduct,
  }
})
