"use client"

import { useEffect, useState } from "react"
import { BookCard } from "@/components/book-card"
import type { Book } from "@/lib/types"
import { getRecommendedBooks } from "@/lib/actions"

interface BookRecommendationsProps {
  bookId: string
  genres: string[]
}

export function BookRecommendations({ bookId, genres }: BookRecommendationsProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recommendations = await getRecommendedBooks(bookId, genres)
        setBooks(recommendations)
      } catch (error) {
        console.error("Failed to load recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    loadRecommendations()
  }, [bookId, genres])

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">You might also like</h2>
        <div className="h-[200px] rounded-lg border border-dashed flex items-center justify-center">
          <p className="text-muted-foreground">Loading recommendations...</p>
        </div>
      </div>
    )
  }

  if (books.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">You might also like</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
