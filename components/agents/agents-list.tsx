"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Agent {
  id: string
  name: string
  role: string
  department: string
  status: "online" | "offline" | "busy"
  rating: number
}

const agents: Agent[] = [
  {
    id: "a1",
    name: "Sarah Johnson",
    role: "Senior Agent",
    department: "Technical Support",
    status: "online",
    rating: 4.8,
  },
  {
    id: "a2",
    name: "Michael Brown",
    role: "Agent",
    department: "Customer Service",
    status: "online",
    rating: 4.6,
  },
  {
    id: "a3",
    name: "Jessica Lee",
    role: "Senior Agent",
    department: "Billing Support",
    status: "busy",
    rating: 4.5,
  },
  {
    id: "a4",
    name: "David Wilson",
    role: "Agent",
    department: "Technical Support",
    status: "offline",
    rating: 4.3,
  },
  {
    id: "a5",
    name: "Emily Davis",
    role: "Junior Agent",
    department: "Customer Service",
    status: "online",
    rating: 4.2,
  },
  {
    id: "a6",
    name: "Robert Taylor",
    role: "Agent",
    department: "Billing Support",
    status: "offline",
    rating: 4.0,
  },
  {
    id: "a7",
    name: "Olivia Martin",
    role: "Junior Agent",
    department: "Technical Support",
    status: "busy",
    rating: 3.9,
  },
  {
    id: "a8",
    name: "James Johnson",
    role: "Senior Agent",
    department: "Customer Service",
    status: "online",
    rating: 4.7,
  },
]

interface AgentsListProps {
  onSelectAgent: (name: string) => void
  selectedAgent: string | null
}

export function AgentsList({ onSelectAgent, selectedAgent }: AgentsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <Input placeholder="Search agents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <ScrollArea className="h-[500px]">
        <div className="space-y-2">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-muted ${
                selectedAgent === agent.name ? "bg-muted" : ""
              }`}
              onClick={() => onSelectAgent(agent.name)}
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {agent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{agent.name}</p>
                <p className="text-xs text-muted-foreground truncate">{agent.department}</p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge
                  variant={agent.status === "online" ? "success" : agent.status === "busy" ? "warning" : "outline"}
                  className="text-xs"
                >
                  {agent.status}
                </Badge>
                <span className="text-xs">{agent.rating}/5</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

