"use client"; // Mark this component as client-side only

import { useState, useEffect } from "react";
 // Adjust the import path as needed
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentsList } from "@/components/agents/agents-list";
import { AgentPerformance } from "@/components/dashboard/agent-performance";
import { AgentFeedbackHistory } from "@/components/agents/agent-feedback-history";
import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addEmployee,fetchEmployeeSummary} from "@/lib/HelperFunction"; // Assuming this is where addEmployee is defined

export function AgentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    uniqueEmployeeId: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [agentData, setAgentData] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Fetch employee summary when selectedAgent changes
  useEffect(() => {
    const fetchData = async () => {
      if (selectedAgent) {
        setLoading(true);
        console.log("Fetching data for employee ID:", selectedAgent); // Debug log
        try {
          const data = await fetchEmployeeSummary(selectedAgent.unique_employee_id);
          console.log("Fetched data:", data); // Debug log
          if (data && (data.average_score || data.total_calls || data.average_duration)) {
            setAgentData(data);
            setError(null);
          } else {
            setError("Invalid data received from API");
          }
        } catch (err) {
          console.error("Fetch error:", err.response?.data || err.message); // Detailed error log
          setError("Failed to load agent data. Please try again.");
          setAgentData(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [selectedAgent]);

  const handleGenerateReport = () => {
    alert(`Generating agent performance report...`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "uniqueEmployeeId" ? parseInt(value) || 0 : value,
    }));
  };

  const handleAddAgent = async () => {
    try {
      setError(null);
      const { name, email, uniqueEmployeeId } = formData;
      if (!name || !email || !uniqueEmployeeId) {
        setError("All fields are required");
        return;
      }
      const result = await addEmployee(name, email, uniqueEmployeeId);
      console.log("Agent added:", result);
      setFormData({ name: "", email: "", uniqueEmployeeId: 0 });
      setOpen(false);
      alert(`Agent ${name} added successfully!`);
    } catch (err) {
      console.error("Failed to add agent:", err);
      setError("Failed to add agent. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
          <div className="flex items-center gap-2">
            <DateRangePicker date={date} setDate={setDate} />
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleGenerateReport}>
              <Download className="h-3.5 w-3.5" />
              <span>Export Report</span>
            </Button>
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
                  <DialogDescription>
                    Enter the details of the new agent to add them to the system.
                  </DialogDescription>
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Agent Directory</CardTitle>
              <CardDescription>Select an agent to view their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <AgentsList onSelectAgent={setSelectedAgent} selectedAgent={selectedAgent} />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>
                {selectedAgent
                  ? `Performance metrics for ${selectedAgent}`
                  : "Select an agent to view their performance"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Loading...
                </div>
              ) : selectedAgent ? (
                <Tabs defaultValue="metrics" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                    {/* <TabsTrigger value="feedback">Feedback History</TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="metrics" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {agentData?.average_score
                              ? agentData.average_score.toFixed(2)
                              : "N/A"}
                          </div>
                          {/* <p className="text-xs text-muted-foreground">+0.3 from last month</p> */}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {agentData?.total_calls ? agentData.total_calls : "N/A"}
                          </div>
                          {/* <p className="text-xs text-muted-foreground">+12 from last month</p> */}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {agentData?.average_duration
                              ? `${Math.floor(agentData.average_duration / 60)}m ${
                                  (agentData.average_duration % 60).toFixed(0)
                                }s`
                              : "N/A"}
                          </div>
                          {/* <p className="text-xs text-muted-foreground">-45s from last month</p> */}
                        </CardContent>
                      </Card>
                    </div>
                    <AgentPerformance data={agentData} />
                  </TabsContent>

                  {/* <TabsContent value="feedback">
                    <AgentFeedbackHistory agentName={selectedAgent} data={agentData?.calls} />
                  </TabsContent> */}
                </Tabs>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Select an agent from the list to view their performance details
                </div>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}