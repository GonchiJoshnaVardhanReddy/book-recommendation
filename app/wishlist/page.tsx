"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import type { Book } from "@/lib/types"
import { getFavoriteBooks, updateWishlistOrder } from "@/lib/actions"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, GripVertical } from "lucide-react"

export default function WishlistPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const favoriteBooks = await getFavoriteBooks()
        setBooks(favoriteBooks)
      } catch (error) {
        console.error("Failed to load favorite books:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [])

  const handleDragEnd = async (result) => {
    if (!result.destination) return

    const items = Array.from(books)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBooks(items)

    // Update the order in the backend
    const bookIds = items.map((book) => book.id)
    await updateWishlistOrder(bookIds)
  }

  const handleRemoveFromWishlist = async (bookId: string) => {
    setBooks(books.filter((book) => book.id !== bookId))
    await updateWishlistOrder(books.filter((book) => book.id !== bookId).map((book) => book.id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">Drag to reorder your favorite books</p>
        </div>

        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="text-center">
              <p>Loading your wishlist...</p>
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
            <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
            <p className="mb-4 text-muted-foreground">Start adding books you love to your wishlist</p>
            <Button asChild>
              <Link href="/discover">Discover Books</Link>
            </Button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="wishlist">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {books.map((book, index) => (
                    <Draggable key={book.id} draggableId={book.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center rounded-lg border bg-card p-4 shadow-sm"
                        >
                          <div {...provided.dragHandleProps} className="mr-4 cursor-grab">
                            <GripVertical className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div className="relative h-20 w-14 overflow-hidden rounded">
                            <Image
                              src={book.coverImage || "/placeholder.svg"}
                              alt={book.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="font-semibold">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFromWishlist(book.id)}
                            className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                          >
                            <Heart className="h-5 w-5 fill-red-500" />
                            <span className="sr-only">Remove from wishlist</span>
                          </Button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </main>
    </div>
  )
}
