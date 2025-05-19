import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { genres } from "@/lib/data"

interface GenreFilterProps {
  selectedGenres: string[]
  onGenreChange: (genre: string) => void
}

export function GenreFilter({ selectedGenres, onGenreChange }: GenreFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Genres</h3>
      <div className="space-y-2">
        {genres.map((genre) => (
          <div key={genre} className="flex items-center space-x-2">
            <Checkbox
              id={`genre-${genre}`}
              checked={selectedGenres.includes(genre)}
              onCheckedChange={() => onGenreChange(genre)}
            />
            <Label htmlFor={`genre-${genre}`} className="text-sm cursor-pointer">
              {genre}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
