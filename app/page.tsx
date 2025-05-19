import { BookDiscovery } from "@/components/book-discovery"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <BookDiscovery />
      </main>
    </div>
  )
}
