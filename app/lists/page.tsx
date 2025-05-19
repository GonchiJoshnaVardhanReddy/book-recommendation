"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, BookOpen, BookMarked, BookCheck, Search } from "lucide-react"
import { BookCard } from "@/components/book-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { books } from "@/lib/data"
import { AddBookToList } from "@/components/add-book-to-list"

export default function ListsPage() {
  const [activeTab, setActiveTab] = useState("reading")
  const [lists, setLists] = useState([
    { id: "reading", name: "Currently Reading", icon: BookOpen, books: [] },
    { id: "toread", name: "To Be Read", icon: BookMarked, books: [] },
    { id: "finished", name: "Finished", icon: BookCheck, books: [] },
  ])
  const [newListName, setNewListName] = useState("")
  const [newListDescription, setNewListDescription] = useState("")
  const [showAddBookDialog, setShowAddBookDialog] = useState(false)

  const handleCreateList = () => {
    if (!newListName.trim()) return

    const newList = {
      id: newListName.toLowerCase().replace(/\s+/g, "-"),
      name: newListName,
      icon: BookOpen,
      books: [],
    }

    setLists([...lists, newList])
    setNewListName("")
    setNewListDescription("")
    setActiveTab(newList.id)
  }

  const handleAddBookToList = (book) => {
    const currentList = lists.find((list) => list.id === activeTab)
    if (!currentList) return

    // Check if book is already in the list
    if (currentList.books.some((b) => b.id === book.id)) return

    const updatedLists = lists.map((list) => {
      if (list.id === activeTab) {
        return {
          ...list,
          books: [...list.books, book],
        }
      }
      return list
    })

    setLists(updatedLists)
    setShowAddBookDialog(false)
  }

  const handleRemoveBookFromList = (bookId) => {
    const updatedLists = lists.map((list) => {
      if (list.id === activeTab) {
        return {
          ...list,
          books: list.books.filter((book) => book.id !== bookId),
        }
      }
      return list
    })

    setLists(updatedLists)
  }

  const activeList = lists.find((list) => list.id === activeTab) || lists[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Reading Lists</h1>
            <p className="text-muted-foreground">Organize your books into custom lists</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new reading list</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">List name</Label>
                  <Input
                    id="name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Summer Reads, Sci-Fi Favorites, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    placeholder="What's this list about?"
                  />
                </div>
              </div>
              <Button onClick={handleCreateList}>Create List</Button>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="reading" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex w-full flex-wrap">
            {lists.map((list) => (
              <TabsTrigger key={list.id} value={list.id} className="flex items-center">
                <list.icon className="mr-2 h-4 w-4" />
                {list.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {lists.map((list) => (
            <TabsContent key={list.id} value={list.id}>
              <div className="mb-4 flex justify-between">
                <h2 className="text-xl font-semibold">{list.name}</h2>
                <Button onClick={() => setShowAddBookDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Book
                </Button>
              </div>

              {list.books.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                  <BookOpen className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-center text-muted-foreground">No books in this list yet</p>
                  <Button variant="outline" className="mt-4" onClick={() => setShowAddBookDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Book
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                  {list.books.map((book) => (
                    <div key={book.id} className="relative">
                      <BookCard book={book} />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute right-2 top-2 z-10"
                        onClick={() => handleRemoveBookFromList(book.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={showAddBookDialog} onOpenChange={setShowAddBookDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add Book to {activeList?.name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search books..." className="flex-1" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {books.map((book) => (
                  <AddBookToList
                    key={book.id}
                    book={book}
                    onAdd={() => handleAddBookToList(book)}
                    disabled={activeList?.books.some((b) => b.id === book.id)}
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
