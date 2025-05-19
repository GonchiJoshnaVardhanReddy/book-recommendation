import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Star, BookOpen } from "lucide-react"
import { getBookById } from "@/lib/actions"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { BookRecommendations } from "@/components/book-recommendations"

interface BookPageProps {
  params: {
    id: string
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] lg:gap-12">
          <div className="mx-auto w-full max-w-[300px]">
            <div className="sticky top-24 space-y-4">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg border shadow-md">
                <Image
                  src={book.coverImage || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Now
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">{book.title}</h1>
              <p className="text-xl text-muted-foreground">by {book.author}</p>
              <div className="mt-2 flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < book.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {book.rating.toFixed(1)} ({book.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {book.genres.map((genre) => (
                <span key={genre} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {genre}
                </span>
              ))}
            </div>

            <Separator />

            <div>
              <h2 className="mb-4 text-2xl font-semibold">About this book</h2>
              <div className="prose max-w-none dark:prose-invert">
                <p>{book.description}</p>
                <p>{book.longDescription}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Details</h2>
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Published</dt>
                  <dd>{book.publishDate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Pages</dt>
                  <dd>{book.pages}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Language</dt>
                  <dd>{book.language}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">ISBN</dt>
                  <dd>{book.isbn}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Publisher</dt>
                  <dd>{book.publisher}</dd>
                </div>
              </dl>
            </div>

            <Separator />

            <BookRecommendations bookId={book.id} genres={book.genres} />
          </div>
        </div>
      </main>
    </div>
  )
}
