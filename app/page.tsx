import { DashboardPage } from "@/components/dashboard/dashboard-page"

export default function Home() {
  // In a real app, you would check authentication here
  // If not authenticated, redirect to login
  // For demo purposes, we'll just show the dashboard

  return <DashboardPage />
}

