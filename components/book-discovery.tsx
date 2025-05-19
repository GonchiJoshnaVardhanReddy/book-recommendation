"use client"

import { useState } from "react"
import { BookCard } from "@/components/book-card"
import { GenreFilter } from "@/components/genre-filter"
import { MoodFilter } from "@/components/mood-filter"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"
import { SwipeRecommender } from "@/components/swipe-recommender"
import { books } from "@/lib/data"

export function BookDiscovery() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "swipe">("grid")

  const filteredBooks = books.filter((book) => {
    if (selectedGenres.length > 0 && !selectedGenres.some((genre) => book.genres.includes(genre))) {
      return false
    }
    if (selectedMoods.length > 0 && !selectedMoods.some((mood) => book.moods.includes(mood))) {
      return false
    }
    return true
  })

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const handleMoodChange = (mood: string) => {
    setSelectedMoods((prev) => (prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]))
  }

  const handleRandomBook = () => {
    // Implement random book selection logic
    alert("Random book feature coming soon!")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold">Discover Books</h2>
          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              Grid View
            </Button>
            <Button
              variant={viewMode === "swipe" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("swipe")}
            >
              Swipe View
            </Button>
          </div>
          <Button variant="outline" onClick={handleRandomBook} className="flex items-center gap-2">
            <Shuffle className="h-4 w-4" />
            Surprise Me
          </Button>
        </div>

        <GenreFilter selectedGenres={selectedGenres} onGenreChange={handleGenreChange} />

        <MoodFilter selectedMoods={selectedMoods} onMoodChange={handleMoodChange} />
      </div>

      <div>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <SwipeRecommender books={filteredBooks} />
        )}
      </div>
    </div>
  )
}
