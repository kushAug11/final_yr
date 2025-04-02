# Call Feedback Automation System

A comprehensive full-stack web application for call centers to monitor agent performance, analyze customer feedback, and generate actionable reports to improve service quality.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [License](#license)

## ✨ Features

- **Interactive Dashboard**: Real-time overview of key metrics and performance indicators
- **Agent Management**: Track and analyze individual agent performance
- **Feedback Analysis**: Comprehensive tools for analyzing customer feedback
- **Advanced Reporting**: Generate custom reports with various metrics and visualizations
- **Dark/Light Mode**: Full theme support throughout the application
- **Responsive Design**: Works seamlessly on all device sizes
- **Data Visualization**: Interactive charts and graphs for better insights
- **Advanced Filtering**: Comprehensive filtering across all sections

## 🛠️ Technologies Used

- **Frontend**:
  - Next.js 14 (App Router)
  - React.js
  - Tailwind CSS
  - shadcn/ui components
  - Recharts for data visualization

- **Backend**:
  - Next.js API Routes
  - Server Components and Server Actions
  - (Optional: Can be extended with a dedicated backend)

- **Other Tools**:
  - TypeScript
  - Lucide React for icons
  - date-fns for date manipulation
  - Radix UI for accessible components

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/call-feedback-automation.git
cd call-feedback-automation
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

Then start the production server:

\`\`\`bash
npm run start
# or
yarn start
\`\`\`

## 📁 Project Structure

\`\`\`
call-feedback-automation/
├── app/                    # Next.js App Router
│   ├── agents/             # Agents page
│   ├── feedback/           # Feedback page
│   ├── reports/            # Reports page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Dashboard page
├── components/             # React components
│   ├── agents/             # Agent-related components
│   ├── dashboard/          # Dashboard components
│   ├── feedback/           # Feedback components
│   ├── reports/            # Report components
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── main-nav.tsx        # Main navigation
│   └── theme-provider.tsx  # Theme provider
├── lib/                    # Utility functions
└── public/                 # Static assets
\`\`\`

## 📖 Usage Guide

### Dashboard

The dashboard provides a comprehensive overview of your call center's performance:

1. **Key Metrics**: View total calls, average ratings, sentiment distribution, and call durations
2. **Charts**: Analyze trends in customer satisfaction and sentiment over time
3. **Recent Feedback**: Quick access to the latest customer feedback
4. **Date Filtering**: Filter data by specific date ranges

### Agent Management

The Agents page allows you to:

1. **View Agent Directory**: See all agents with their status and ratings
2. **Agent Performance**: Analyze individual agent metrics and feedback
3. **Add New Agents**: Easily add new agents to the system
4. **Export Reports**: Generate agent-specific performance reports

### Feedback Analysis

The Feedback page provides tools to:

1. **View All Feedback**: Browse through all customer feedback
2. **Filter by Sentiment**: Focus on positive, neutral, or negative feedback
3. **Advanced Filtering**: Filter by agent, department, rating, and keywords
4. **Sentiment Analysis**: Visualize sentiment trends and distribution

### Report Generation

The Reports page allows you to:

1. **Generate Reports**: Create weekly, monthly, quarterly, or custom reports
2. **Customize Content**: Select which metrics and data to include
3. **Multiple Formats**: Export as PDF, Excel, or CSV
4. **Save Templates**: Save report configurations for future use

## 📄 License

This project is licensed under the MIT License:

MIT License

Copyright (c) 2023 Your Name or Organization

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Built for improving call center operations and customer satisfaction.

