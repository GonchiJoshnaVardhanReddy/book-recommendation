"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Book } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { toggleFavorite } from "@/lib/actions"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(book.isFavorite || false)
  const [isHovered, setIsHovered] = useState(false)

  const handleFavoriteToggle = async () => {
    setIsFavorite(!isFavorite)
    // Update in the backend
    await toggleFavorite(book.id, !isFavorite)
  }

  return (
    <div
      className="group relative rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/book/${book.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            fill
            className={cn("object-cover transition-transform duration-300", isHovered ? "scale-110" : "scale-100")}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <div className="mt-2 flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn("h-4 w-4", i < book.rating ? "fill-amber-500 text-amber-500" : "text-gray-300")}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({book.reviewCount})</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {book.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
        onClick={handleFavoriteToggle}
      >
        <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "")} />
        <span className="sr-only">Toggle favorite</span>
      </Button>
    </div>
  )
}
