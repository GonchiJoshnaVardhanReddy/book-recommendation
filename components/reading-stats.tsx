"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReadingStats() {
  const [period, setPeriod] = useState("year")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Reading Analytics</CardTitle>
          <CardDescription>Track your reading habits and progress</CardDescription>
        </div>
        <Select value={period} onValueChange={setPeriod} className="ml-auto w-[180px]">
          <SelectTrigger>
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="genres">
          <TabsList className="mb-4">
            <TabsTrigger value="genres">Genres</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="genres">
            <div className="space-y-4">
              {[
                { name: "Fantasy", percentage: 35, count: 15 },
                { name: "Science Fiction", percentage: 25, count: 10 },
                { name: "Mystery", percentage: 15, count: 6 },
                { name: "Romance", percentage: 10, count: 4 },
                { name: "Non-Fiction", percentage: 15, count: 7 },
              ].map((genre) => (
                <div key={genre.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{genre.name}</span>
                    <span className="text-sm text-muted-foreground">{genre.count} books</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${genre.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="authors">
            <div className="space-y-4">
              {[
                { name: "Brandon Sanderson", count: 8 },
                { name: "N.K. Jemisin", count: 5 },
                { name: "Andy Weir", count: 3 },
                { name: "Octavia Butler", count: 3 },
                { name: "Tana French", count: 2 },
              ].map((author) => (
                <div key={author.name} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="font-medium">{author.name}</span>
                  <span className="text-sm text-muted-foreground">{author.count} books</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <div className="h-[200px] rounded-lg border border-dashed flex items-center justify-center">
              <p className="text-muted-foreground">Reading timeline visualization coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
