"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, BarChart, PieChart, TrendingUp, Users } from "lucide-react";
import { ReportGenerator } from "@/components/reports/report-generator";
import { SavedReports } from "@/components/reports/saved-reports";
import { fetchCallAnalysis } from "@/lib/HelperFunction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { marked } from "marked";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export function ReportsPage() {
  const [callId, setCallId] = useState("");
  const [callData, setCallData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const reportRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const searchParams = useSearchParams();

  // Read callId from query parameters on mount
  useEffect(() => {
    const callIdFromQuery = searchParams.get("callId");
    if (callIdFromQuery) {
      const numericCallId = callIdFromQuery.replace("CALL-", "");
      setCallId(numericCallId);
      fetchData(numericCallId); // Auto-fetch report
    }
  }, [searchParams]);

  // Fetch call analysis data
  const fetchData = async (id) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchCallAnalysis(id);
      setCallData(data);
    } catch (err) {
      console.error("Failed to fetch call analysis:", err);
      setError("Failed to fetch data from backend. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleGenerateReport = (e) => {
    e.preventDefault();
    if (callId) {
      fetchData(callId);
    } else {
      setError("Please enter a valid Call ID.");
    }
  };

  // Ensure charts are rendered before PDF download
  const waitForCharts = () => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const timeout = 5000; // 5 seconds max wait
      const checkCharts = () => {
        const barCanvas = barChartRef.current?.canvas;
        const lineCanvas = lineChartRef.current?.canvas;
        if (barCanvas && lineCanvas && Date.now() - startTime < timeout) {
          // Check if canvases are rendered (non-empty)
          const barContext = barCanvas.getContext("2d");
          const lineContext = lineCanvas.getContext("2d");
          if (barContext && lineContext) {
            resolve();
            return;
          }
        }
        if (Date.now() - startTime >= timeout) {
          console.warn("Timeout waiting for charts to render");
          resolve(); // Proceed anyway to avoid hanging
        } else {
          setTimeout(checkCharts, 100);
        }
      };
      checkCharts();
    });
  };

  // Download report as PDF
  const downloadPDF = async () => {
    try {
      await waitForCharts(); // Wait for charts to render
      const element = reportRef.current;
      if (!element) {
        console.error("Report content not found");
        setError("Unable to generate PDF: Report content missing");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff", // Ensure white background
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`call_analysis_${callId || "report"}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      setError("Failed to generate PDF. Please try again.");
    }
  };

  // Chart data preparation
  const prepareBarChartData = (data) => {
    const params = data?.scorecard_A?.individual_parameters || {};
    return {
      labels: ["Clarity", "Knowledge", "Confidence", "Empathy", "Resolution"],
      datasets: [
        {
          label: "Agent Scores",
          data: [
            params.clarity_score || 0,
            params.knowledge_score || 0,
            params.confidence_score || 0,
            params.empathy_score || 0,
            params.resolution_score || 0,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  const prepareLineChartData = (data) => {
    const numerics = data?.scorecard_B?.numerics || [];
    return {
      labels: numerics.map((_, index) => index + 1),
      datasets: [
        {
          label: "Emotion Score Over Time",
          data: numerics.map((n) => n.emotion_score_smoothed),
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
        },
      ],
    };
  };

  // Custom markdown renderer for tables
  const renderer = new marked.Renderer();
  renderer.table = (header, body) => {
    return `
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          ${header}
        </thead>
        <tbody>
          ${body}
        </tbody>
      </table>
    `;
  };

  renderer.tablecell = (content, flags) => {
    const tag = flags.header ? "th" : "td";
    return `<${tag} class="border border-gray-200 px-4 py-2 ${flags.header ? "font-semibold bg-gray-100" : ""}">${content}</${tag}>`;
  };
  renderer.tablerow = (content) => `<tr>${content}</tr>`;
  marked.setOptions({ renderer });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        </div>

        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList>
            <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="generate" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Agent Performance */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Agent Performance</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm">Detailed performance metrics for all agents or individual agents.</div>
                </CardContent>
                <CardFooter />
              </Card>

              {/* Feedback Summary */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Feedback Summary</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm">Summary of all feedback with sentiment analysis and ratings.</div>
                </CardContent>
                <CardFooter />
              </Card>

              {/* Sentiment Trends */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sentiment Trends</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm">Analysis of sentiment trends over time with key insights.</div>
                </CardContent>
                <CardFooter />
              </Card>

              {/* Call Analytics */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Call Analytics</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm">Detailed analysis of call durations, volumes, and outcomes.</div>
                  <form onSubmit={handleGenerateReport} className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="callId">Enter Call ID</Label>
                      <Input
                        id="callId"
                        value={callId}
                        onChange={(e) => setCallId(e.target.value)}
                        placeholder="e.g., 2"
                        className="mt-1"
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? "Generating..." : "Generate Report"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter />
              </Card>
            </div>

            {/* Report Output */}
            {callData && (
              <Card>
                <CardHeader>
                  <CardTitle>Call Analysis Report - Call ID: {callData.call_id}</CardTitle>
                  <CardDescription>Detailed analysis based on call data</CardDescription>
                </CardHeader>
                <CardContent ref={reportRef} className="space-y-6">
                  {error && <div className="text-red-500">{error}</div>}

                  {/* Summary */}
                  <div>
                    <h3 className="text-lg font-semibold">Summary</h3>
                    <p><strong>Call ID:</strong> {callData.call_id}</p>
                    <p><strong>Final Score:</strong> {callData.final_score}</p>
                    <p><strong>Agent Competence Score:</strong> {callData.scorecard_A.score}</p>
                    <p><strong>Emotion Score:</strong> {callData.scorecard_B.score}</p>
                    <p><strong>Agent ID:</strong> {1000 + callData.call_id || "Unknown (not provided)"}</p>
                  </div>

                  {/* Charts */}
                  <div className="space-y-6">
                    {/* Bar Chart: Agent Competence */}
                    <div>
                      <h4 className="text-md font-medium">Agent Competence Metrics</h4>
                      <div className="h-64">
                        <Bar
                          ref={barChartRef}
                          data={prepareBarChartData(callData)}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { position: "top" }, title: { display: true, text: "Agent Scores" } },
                          }}
                        />
                      </div>
                    </div>

                    {/* Line Chart: Emotion Trends */}
                    <div>
                      <h4 className="text-md font-medium">Caller Emotion Trends</h4>
                      <div className="h-64">
                        <Line
                          ref={lineChartRef}
                          data={prepareLineChartData(callData)}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { position: "top" }, title: { display: true, text: "Emotion Over Time" } },
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detailed Evaluation */}
                  <div>
                    <h3 className="text-lg font-semibold">Detailed Evaluation</h3>
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: marked.parse(callData.final_markdown) }}
                    />
                  </div>

                  {/* Transcript */}
                  <div className="transcript-section">
                    <h3 className="text-lg font-semibold">Call Transcript</h3>
                    <div className="space-y-2">
                      {callData.transcript.map((entry, index) => (
                        <div key={index} className="border-l-4 pl-4 py-2">
                          <p><strong>Speaker {entry.speaker}:</strong> {entry.sentence}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.start_time}s - {entry.end_time}s
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button onClick={downloadPDF} className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Report as PDF
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}