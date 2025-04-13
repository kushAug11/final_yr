"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { fetchEmployeeSummary, getAllEmployees } from "@/lib/HelperFunction"; // Adjust the import path as needed

// Update the Agent interface to match your Employee schema
interface Agent {
  id: string;               // Maps to _id from Employee
  name: string;             // Maps to name from Employee
  email: string;            // Maps to email from Employee
  unique_employee_id: number; // Maps to unique_employee_id from Employee
  status: "online" | "offline" | "busy"; // Placeholder, adjust as needed
  rating: number;           // Placeholder, adjust as needed (e.g., from Analysis_result)
}


interface AgentsListProps {
  onSelectAgent: (name: string) => void;
  selectedAgent: string | null;
}

export function AgentsList({ onSelectAgent, selectedAgent }: AgentsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employees from the database when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const employees = await getAllEmployees(); 
         const emp = await fetchEmployeeSummary(employees.unique_employee_id||1001); // Call the API to get employees
        
        // Map the employee data to the Agent interface
        const mappedAgents: Agent[] = employees.map((employee: any) => ({
          id: employee._id,
          name: employee.name,
          email: employee.email,
          unique_employee_id: employee.unique_employee_id,
          status: "offline", // Placeholder: You might need to derive this from another source
          rating: 4,       // Placeholder: You might calculate this from Analysis_result
        }));
        setAgents(mappedAgents);
      } catch (err) {
        setError("Failed to fetch employees");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

     fetchEmployees();
  }, []);

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.unique_employee_id.toLowerCase().includes(searchQuery.toLowerCase()) // Using email instead of department
  );

  if (loading) {
    return <div>Loading agents...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search agents..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ScrollArea className="h-[500px]">
        <div className="space-y-2">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-muted ${
                selectedAgent === agent.name ? "bg-muted" : ""
              }`}
              onClick={() => onSelectAgent(agent)}
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
                <p className="text-xs text-muted-foreground truncate">{agent.unique_employee_id}</p> {/* Using email */}
              </div>
              <div className="flex flex-col items-end space-y-1">
                {/* <Badge
                  variant={agent.status === "online" ? "success" : agent.status === "busy" ? "warning" : "outline"}
                  className="text-xs"
                >
                  {agent.status}
                </Badge> */}
                <span className="text-xs">{agent.rating}/5</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}