import { SiteHeader } from "@/components/site-header"
import { BookDiscovery } from "@/components/book-discovery"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Discover Books</h1>
          <p className="text-muted-foreground">Find your next favorite read</p>
        </div>
        <BookDiscovery />
      </main>
    </div>
  )
}
