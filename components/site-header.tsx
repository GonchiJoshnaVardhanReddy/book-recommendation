"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Heart, Home, List, Search, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <BookOpen className="h-5 w-5" />
          <span className="hidden sm:inline-block">BookReads</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline-block">Home</span>
          </Link>
          <Link
            href="/discover"
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
              pathname === "/discover" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline-block">Discover</span>
          </Link>
          <Link
            href="/wishlist"
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
              pathname === "/wishlist" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline-block">Wishlist</span>
          </Link>
          <Link
            href="/lists"
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
              pathname === "/lists" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline-block">Lists</span>
          </Link>
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
              pathname === "/profile" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline-block">Profile</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
