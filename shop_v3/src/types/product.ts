export interface ProductGalleryItem {
  name: string
  img: string
}

export interface Product {
  id: number
  title: string
  description: string
  img: string
  gallery: ProductGalleryItem[]
}
