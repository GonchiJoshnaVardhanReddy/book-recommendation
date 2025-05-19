"use client"

import { useState } from "react"
import Image from "next/image"
import type { Book } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Heart, X, Star, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { toggleFavorite } from "@/lib/actions"
import { useRouter } from "next/navigation"

interface SwipeRecommenderProps {
  books: Book[]
}

export function SwipeRecommender({ books }: SwipeRecommenderProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [exiting, setExiting] = useState(false)

  const currentBook = books[currentIndex]

  if (!currentBook) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No more books to recommend</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      </div>
    )
  }

  const handleSwipe = async (liked: boolean) => {
    setDirection(liked ? "right" : "left")
    setExiting(true)

    // If liked, add to favorites
    if (liked) {
      await toggleFavorite(currentBook.id, true)
    }

    // Wait for animation to complete
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setDirection(null)
      setExiting(false)
    }, 300)
  }

  const handleViewDetails = () => {
    router.push(`/book/${currentBook.id}`)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[500px] w-full max-w-md">
        <div
          className={cn(
            "absolute inset-0 rounded-lg border bg-card shadow-lg transition-all duration-300",
            exiting && direction === "left" && "translate-x-[-100%] rotate-[-10deg] opacity-0",
            exiting && direction === "right" && "translate-x-[100%] rotate-[10deg] opacity-0",
          )}
        >
          <div className="relative h-[60%] overflow-hidden rounded-t-lg">
            <Image
              src={currentBook.coverImage || "/placeholder.svg"}
              alt={currentBook.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold">{currentBook.title}</h3>
            <p className="text-muted-foreground">{currentBook.author}</p>
            <div className="mt-2 flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn("h-4 w-4", i < currentBook.rating ? "fill-amber-500 text-amber-500" : "text-gray-300")}
                />
              ))}
            </div>
            <p className="mt-2 line-clamp-2 text-sm">{currentBook.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={() => handleSwipe(false)}>
          <X className="h-6 w-6" />
          <span className="sr-only">Dislike</span>
        </Button>

        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={handleViewDetails}>
          <Info className="h-6 w-6" />
          <span className="sr-only">View details</span>
        </Button>

        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600"
          onClick={() => handleSwipe(true)}
        >
          <Heart className="h-6 w-6" />
          <span className="sr-only">Like</span>
        </Button>
      </div>
    </div>
  )
}
