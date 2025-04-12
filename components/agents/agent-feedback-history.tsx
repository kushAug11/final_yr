"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


//Aisa ek array bnade interface does this mean we have to create an array of this interface
interface FeedbackItem {
  id: string
  date: string
  customer: string
  rating: number
  sentiment: "positive" | "neutral" | "negative"
  comment: string
}


//Agent ka naam ais hoga 
interface AgentFeedbackHistoryProps {
  agentName: string
}
// The function takes the employee name and fetches the no of calls 
// POA can have 2 ways
//1. idhar hi call mar do end point pe
//2. ya fir helper function banake 
//error boundary bhi dalni hogi i guess
export function AgentFeedbackHistory({ agentName }: AgentFeedbackHistoryProps) {
  // This would normally be fetched based on the agent name
  //here we have to add useEffect to fetch data from Api

  //it will come and be stored in this array 

  //I think we have to remove sentiment from right here

  const feedbackHistory: FeedbackItem[] = [
    {
      id: "f1",
      date: "2023-11-28",
      customer: "John Smith",
      rating: 5,
      sentiment: "positive",
      comment: "Very helpful and resolved my issue quickly.",
    },
    {
      id: "f2",
      date: "2023-11-26",
      customer: "Sophia Brown",
      rating: 4,
      sentiment: "positive",
      comment: "Quick resolution to my problem.",
    },
    {
      id: "f3",
      date: "2023-11-24",
      customer: "Robert Johnson",
      rating: 5,
      sentiment: "positive",
      comment: "Excellent service, very knowledgeable agent.",
    },
    {
      id: "f4",
      date: "2023-11-22",
      customer: "Emma Wilson",
      rating: 4,
      sentiment: "positive",
      comment: "Good service but took a bit longer than expected.",
    },
    {
      id: "f5",
      date: "2023-11-20",
      customer: "William Davis",
      rating: 3,
      sentiment: "neutral",
      comment: "Average experience, issue was resolved.",
    },
    {
      id: "f6",
      date: "2023-11-18",
      customer: "Olivia Martin",
      rating: 5,
      sentiment: "positive",
      comment: "Very patient and explained everything clearly.",
    },
    {
      id: "f7",
      date: "2023-11-16",
      customer: "James Taylor",
      rating: 4,
      sentiment: "positive",
      comment: "Professional and courteous.",
    },
  ]

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Recent Feedback for {agentName}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Sentiment</TableHead>
            <TableHead>Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbackHistory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.customer}</TableCell>
              <TableCell>{item.rating}/5</TableCell>
              <TableCell>
                {/* Sentiment Badge */}
                <Badge
                  variant={
                    item.sentiment === "positive" ? "success" : item.sentiment === "neutral" ? "warning" : "destructive"
                  }
                >

                  {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                </Badge>
                {/* Sentiment Badge  End */}
              </TableCell>
              {/* Comment We can use map function here agein to display the comment we will store it here */}
              <TableCell className="max-w-[300px] truncate">{item.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

