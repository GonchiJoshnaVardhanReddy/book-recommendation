"use server"

import type { Book } from "./types"
import { books } from "./data"

// Simulate database operations with local state
let favoriteBooks: string[] = []
const userLists = {}

export async function toggleFavorite(bookId: string, isFavorite: boolean) {
  try {
    // In a real app, this would update a database
    if (isFavorite) {
      favoriteBooks.push(bookId)
    } else {
      favoriteBooks = favoriteBooks.filter((id) => id !== bookId)
    }

    return { success: true }
  } catch (error) {
    console.error("Error toggling favorite:", error)
    return { success: false, error: "Failed to update favorite status" }
  }
}

export async function getFavoriteBooks(): Promise<Book[]> {
  try {
    // In a real app, this would query a database
    return books.filter((book) => favoriteBooks.includes(book.id) || book.isFavorite)
  } catch (error) {
    console.error("Error getting favorite books:", error)
    return []
  }
}

export async function updateWishlistOrder(bookIds: string[]) {
  try {
    // In a real app, this would update a database with the new order
    favoriteBooks = bookIds
    return { success: true }
  } catch (error) {
    console.error("Error updating wishlist order:", error)
    return { success: false, error: "Failed to update wishlist order" }
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  try {
    // In a real app, this would query a database
    const book = books.find((book) => book.id === id)
    return book || null
  } catch (error) {
    console.error("Error getting book by ID:", error)
    return null
  }
}

export async function getRecommendedBooks(bookId: string, genres: string[]): Promise<Book[]> {
  try {
    // In a real app, this would use a recommendation algorithm
    // For now, just return books with similar genres, excluding the current book
    return books.filter((book) => book.id !== bookId && book.genres.some((genre) => genres.includes(genre))).slice(0, 4)
  } catch (error) {
    console.error("Error getting recommended books:", error)
    return []
  }
}

export async function createList(name: string, description?: string) {
  try {
    const listId = name.toLowerCase().replace(/\s+/g, "-")
    userLists[listId] = {
      id: listId,
      name,
      description,
      books: [],
    }
    return { success: true, listId }
  } catch (error) {
    console.error("Error creating list:", error)
    return { success: false, error: "Failed to create list" }
  }
}

export async function addBookToList(listId: string, bookId: string) {
  try {
    if (!userLists[listId]) {
      return { success: false, error: "List not found" }
    }

    if (userLists[listId].books.includes(bookId)) {
      return { success: true } // Book already in list
    }

    userLists[listId].books.push(bookId)
    return { success: true }
  } catch (error) {
    console.error("Error adding book to list:", error)
    return { success: false, error: "Failed to add book to list" }
  }
}

export async function removeBookFromList(listId: string, bookId: string) {
  try {
    if (!userLists[listId]) {
      return { success: false, error: "List not found" }
    }

    userLists[listId].books = userLists[listId].books.filter((id) => id !== bookId)
    return { success: true }
  } catch (error) {
    console.error("Error removing book from list:", error)
    return { success: false, error: "Failed to remove book from list" }
  }
}
