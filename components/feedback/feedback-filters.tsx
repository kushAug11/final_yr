"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function FeedbackFilters() {
  const [ratingRange, setRatingRange] = useState([1, 5])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label htmlFor="agent">Agent</Label>
        <Select>
          <SelectTrigger id="agent">
            <SelectValue placeholder="All Agents" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agents</SelectItem>
            <SelectItem value="sarah">Sarah Johnson</SelectItem>
            <SelectItem value="michael">Michael Brown</SelectItem>
            <SelectItem value="jessica">Jessica Lee</SelectItem>
            <SelectItem value="david">David Wilson</SelectItem>
            <SelectItem value="emily">Emily Davis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sentiment">Sentiment</Label>
        <Select>
          <SelectTrigger id="sentiment">
            <SelectValue placeholder="All Sentiments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sentiments</SelectItem>
            <SelectItem value="positive">Positive</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="negative">Negative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select>
          <SelectTrigger id="department">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="technical">Technical Support</SelectItem>
            <SelectItem value="customer">Customer Service</SelectItem>
            <SelectItem value="billing">Billing Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Rating Range</Label>
        <div className="pt-4 px-2">
          <Slider defaultValue={[1, 5]} max={5} min={1} step={1} value={ratingRange} onValueChange={setRatingRange} />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{ratingRange[0]}</span>
            <span>to</span>
            <span>{ratingRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="keyword">Keyword Search</Label>
        <Input id="keyword" placeholder="Search in comments..." />
      </div>

      <div className="space-y-2 flex items-end">
        <div className="flex space-x-2 w-full">
          <Button className="flex-1">Apply Filters</Button>
          <Button variant="outline" className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

