"use clients"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function InputBox() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input placeholder="Search tools..." />
      <Button type="submit">Search</Button>
    </div>
  )
}

