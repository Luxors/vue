export type UseGetImageReturn = ReturnType<typeof useGetImage>

export function useGetImage() {
  const getImage = (image: string): string => {
    return new URL(`/src/assets/images/${image}`, import.meta.url).href
  }

  return { getImage }
}
