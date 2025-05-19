"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, BookOpen, Calendar, Plus } from "lucide-react"

export function ReadingChallenges() {
  const [challenges, setChallenges] = useState([
    {
      id: "1",
      title: "2025 Reading Challenge",
      description: "Read 50 books in 2025",
      progress: 42,
      total: 50,
      icon: Calendar,
    },
    {
      id: "2",
      title: "Genre Explorer",
      description: "Read books from 10 different genres",
      progress: 8,
      total: 10,
      icon: BookOpen,
    },
    {
      id: "3",
      title: "Award Winners",
      description: "Read 5 award-winning books",
      progress: 3,
      total: 5,
      icon: Award,
    },
  ])

  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    total: "12",
    type: "books",
  })

  const handleCreateChallenge = () => {
    if (!newChallenge.title.trim()) return

    const challenge = {
      id: Date.now().toString(),
      title: newChallenge.title,
      description: newChallenge.description || `Read ${newChallenge.total} ${newChallenge.type}`,
      progress: 0,
      total: Number.parseInt(newChallenge.total),
      icon: BookOpen,
    }

    setChallenges([...challenges, challenge])
    setNewChallenge({
      title: "",
      description: "",
      total: "12",
      type: "books",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reading Challenges</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Challenge
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new reading challenge</DialogTitle>
              <DialogDescription>Set a goal to motivate your reading journey</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Challenge title</Label>
                <Input
                  id="title"
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                  placeholder="2025 Reading Challenge"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  value={newChallenge.description}
                  onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                  placeholder="Read X books in 2025"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="total">Goal</Label>
                  <Input
                    id="total"
                    type="number"
                    min="1"
                    value={newChallenge.total}
                    onChange={(e) => setNewChallenge({ ...newChallenge, total: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newChallenge.type}
                    onValueChange={(value) => setNewChallenge({ ...newChallenge, type: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="pages">Pages</SelectItem>
                      <SelectItem value="genres">Genres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Button onClick={handleCreateChallenge}>Create Challenge</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Card key={challenge.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </div>
                <challenge.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">
                    {challenge.progress} / {challenge.total}
                  </span>
                </div>
                <Progress value={(challenge.progress / challenge.total) * 100} />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Update Progress
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
