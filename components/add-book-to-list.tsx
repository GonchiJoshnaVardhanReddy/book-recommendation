"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Book } from "@/lib/types"

interface AddBookToListProps {
  book: Book
  onAdd: () => void
  disabled?: boolean
}

export function AddBookToList({ book, onAdd, disabled }: AddBookToListProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded">
        <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{book.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{book.author}</p>
      </div>
      <Button size="sm" variant="outline" onClick={onAdd} disabled={disabled} className="flex-shrink-0">
        {disabled ? (
          "Added"
        ) : (
          <>
            <Plus className="h-4 w-4 mr-1" /> Add
          </>
        )}
      </Button>
    </div>
  )
}
