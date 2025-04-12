"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentsList } from "@/components/agents/agents-list"
import { AgentPerformance } from "@/components/dashboard/agent-performance"
import { AgentFeedbackHistory } from "@/components/agents/agent-feedback-history"
import { DateRangePicker } from "@/components/date-range-picker"
import { Button } from "@/components/ui/button"
import { Download, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { addEmployee } from "@/lib/HelperFunction"// Import the API function

export function AgentsPage() {
  //for the data filter that we have to remove
  const [date, setDate] = useState<Date | undefined>(new Date())

  //for the agent selection what happens isme hi saara khel hai guru
  
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const [open, setOpen] = useState(false) // Control dialog open/close

  //Ye humara form data hai jo agent add karne ke liye hai
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    uniqueEmployeeId: 0, // Assuming this is required; adjust as needed
  })


  //Nazar hati durghatna ghati 
  const [error, setError] = useState<string | null>(null) // For error feedback

  
  const handleGenerateReport = () => {
    alert(`Generating agent performance report...`)
  }

  // Handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: id === "uniqueEmployeeId" ? parseInt(value) || 0 : value, // Convert to number for uniqueEmployeeId
    }))
  }

  // Handle form submission
  //for adding agent giving the details to the fastapi backend
  const handleAddAgent = async () => {
    try {
      setError(null) // Clear previous errors
      const { name, email, uniqueEmployeeId } = formData
      if (!name || !email || !uniqueEmployeeId) {
        setError("All fields are required")
        return
      }

      const result = await addEmployee(name, email, uniqueEmployeeId)
      console.log("Agent added:", result)
      
      // Reset form and close dialog on success
      setFormData({ name: "", email: "", uniqueEmployeeId: 0 })
      setOpen(false)
      alert(`Agent ${name} added successfully!`) // Optional feedback
    } catch (err) {
      console.error("Failed to add agent:", err)
      console.log(err)
      setError("Failed to add agent. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
          <div className="flex items-center gap-2">
            {/* Date range picker for filtering data  bss yhi remove krna hai */}
            <DateRangePicker date={date} setDate={setDate} />

            {/* Export report button  ye bhi remove krna hai */}
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleGenerateReport}>
              <Download className="h-3.5 w-3.5" />
              <span>Export Report</span>
            </Button>
            {/*This is adding agent the whl=ole logic is implemented right here only  */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Add Agent</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Agent</DialogTitle>
                  <DialogDescription>Enter the details of the new agent to add them to the system.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Agent name"
                      className="col-span-3"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      placeholder="agent@example.com"
                      className="col-span-3"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="uniqueEmployeeId" className="text-right">
                      Employee ID
                    </Label>
                    <Input
                      id="uniqueEmployeeId"
                      type="number"
                      placeholder="Unique Employee ID"
                      className="col-span-3"
                      value={formData.uniqueEmployeeId || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm col-span-4">{error}</p>}
                </div>
                <DialogFooter>
                  <Button onClick={handleAddAgent}>Add Agent</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* This is adding agent end */}
          </div>
        </div>

        {/* end for the first div */}

        {/* This is the grid for the agent directory and agent performance  it gives call to 3 pages 
            1. agent directory(agents list tsx)
            2. agent performance(agent performance tsx)
            3. agent feedback history(agent feedback history tsx)
        */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* 1. agent directory(agents list tsx) */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Agent Directory</CardTitle>
              <CardDescription>Select an agent to view their performance</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Agent List Component this gives the agent name here as props to his child component */}
              <AgentsList onSelectAgent={setSelectedAgent} selectedAgent={selectedAgent} />
            </CardContent>
          </Card>

          {/* 2. agent performance(agent performance tsx) */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>
                {/* Whatever agent is selected the name displays here remember it was updated using usestate */}
                {selectedAgent
                  ? `Performance metrics for ${selectedAgent}`
                  : "Select an agent to view their performance"}
              </CardDescription>
            </CardHeader>
            {/* This is the tab component for the agent performance 
                1. metrics(performance metrics)
                2. feedback(feedback history)
            */}
            <CardContent>
              {selectedAgent ? (
                <Tabs defaultValue="metrics" className="space-y-4">
                  {/* Above select bar */}
                  <TabsList>
                    <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                    <TabsTrigger value="feedback">Feedback History</TabsTrigger>
                  </TabsList>
                  {/* We have to get this from the backend and make one call again but it will be tedious  
                  
                      -if we can find out a way to make a call here and send data from here to all the other page then we can minimize backend calls
                      - We send in props
                      - we can create a function that we can export to others */}

                  <TabsContent value="metrics" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                      {/* 1. Average Rating */}
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        </CardHeader>
                        {/* This is the average rating  that we will fetch*/}
                        <CardContent>
                          <div className="text-2xl font-bold">4.6/5</div>
                          <p className="text-xs text-muted-foreground">+0.3 from last month</p>
                        </CardContent>
                      </Card>

                      {/* Kitna kaam kiya employee ne call ne total calls */}
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {/* This is the total calls fetch this from backend or get all the calls of the employee then use a loop to do this */}
                          <div className="text-2xl font-bold">142</div>
                          {/*This is just some random data that we can put by math.random*/}
                          <p className="text-xs text-muted-foreground">+12 from last month</p>
                        </CardContent>
                      </Card>


                      {/*Average Call Duraton*/}
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
                        </CardHeader>
                        {/* This is the average call duration fetch this from backend or get all the calls of the employee then use a loop to do this */}
                        <CardContent>
                          <div className="text-2xl font-bold">6m 18s</div>
                          <p className="text-xs text-muted-foreground">-45s from last month</p>
                        </CardContent>
                      </Card>
                    </div>
                    {/* Here it is!!! we will call the agent component whlie sending detail as a prop as we discussed in one approach  */}
                    <AgentPerformance />
                  </TabsContent>

                  {/* This is the feedback history component */}
                  <TabsContent value="feedback">
                    {/* Dekho jaise isme gya hai bss vaise hi kr dena hai */}
                    <AgentFeedbackHistory agentName={selectedAgent} />
                  </TabsContent>
                </Tabs>

              ) : (
                //if no agent is selected then this will be displayed
                // This is the default state when no agent is selected

                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Select an agent from the list to view their performance details
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}