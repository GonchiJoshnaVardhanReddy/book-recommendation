export interface Book {
  id: string
  title: string
  author: string
  description: string
  longDescription?: string
  coverImage: string
  rating: number
  reviewCount: number
  genres: string[]
  moods: string[]
  isFavorite?: boolean
  publishDate?: string
  pages?: number
  language?: string
  isbn?: string
  publisher?: string
}
