"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { PhoneCall } from "lucide-react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
        <PhoneCall className="h-5 w-5" />
        <span>Call Feedback</span>
      </Link>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/agents"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/agents" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Agents
      </Link>
      <Link
        href="/feedback"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/feedback" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Feedback
      </Link>
      {/* <Link
        href="/reports"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reports" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Reports
      </Link> */}
    </nav>
  )
}

