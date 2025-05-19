import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { moods } from "@/lib/data"

interface MoodFilterProps {
  selectedMoods: string[]
  onMoodChange: (mood: string) => void
}

export function MoodFilter({ selectedMoods, onMoodChange }: MoodFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Moods</h3>
      <div className="space-y-2">
        {moods.map((mood) => (
          <div key={mood} className="flex items-center space-x-2">
            <Checkbox
              id={`mood-${mood}`}
              checked={selectedMoods.includes(mood)}
              onCheckedChange={() => onMoodChange(mood)}
            />
            <Label htmlFor={`mood-${mood}`} className="text-sm cursor-pointer">
              {mood}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
