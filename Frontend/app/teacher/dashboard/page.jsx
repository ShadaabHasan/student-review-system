"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { User, LogOut, TrendingUp, MessageSquare, Lightbulb, ChevronDown, ChevronUp } from "lucide-react"

const feedbackData = [
  { name: "Positive", value: 65, color: "#22c55e" },
  { name: "Neutral", value: 20, color: "#f59e0b" },
  { name: "Negative", value: 15, color: "#ef4444" },
]

const recentComments = {
  positive: [
    {
      id: 1,
      comment: "Excellent teaching methodology and clear explanations",
      date: "2024-01-15",
      subject: "Data Structures",
    },
    { id: 2, comment: "Very engaging lectures with practical examples", date: "2024-01-14", subject: "Algorithms" },
    {
      id: 3,
      comment: "Great use of visual aids and interactive sessions",
      date: "2024-01-13",
      subject: "Data Structures",
    },
    { id: 4, comment: "Always available for doubt clarification", date: "2024-01-12", subject: "Algorithms" },
    { id: 5, comment: "Makes complex topics easy to understand", date: "2024-01-11", subject: "Data Structures" },
  ],
  neutral: [
    { id: 6, comment: "Good teaching but could use more examples", date: "2024-01-15", subject: "Data Structures" },
    { id: 7, comment: "Average pace, sometimes too fast", date: "2024-01-14", subject: "Algorithms" },
    {
      id: 8,
      comment: "Content is good but delivery could be improved",
      date: "2024-01-13",
      subject: "Data Structures",
    },
    { id: 9, comment: "Satisfactory teaching methods", date: "2024-01-12", subject: "Algorithms" },
    { id: 10, comment: "Decent explanations but room for improvement", date: "2024-01-11", subject: "Data Structures" },
  ],
  negative: [
    {
      id: 11,
      comment: "Lectures are too fast-paced and hard to follow",
      date: "2024-01-15",
      subject: "Data Structures",
    },
    { id: 12, comment: "Not enough practical examples provided", date: "2024-01-14", subject: "Algorithms" },
    { id: 13, comment: "Difficult to understand explanations", date: "2024-01-13", subject: "Data Structures" },
    { id: 14, comment: "Limited interaction with students", date: "2024-01-12", subject: "Algorithms" },
    { id: 15, comment: "Course material is not well organized", date: "2024-01-11", subject: "Data Structures" },
  ],
}

export default function TeacherDashboard() {
  const [expandedCategory, setExpandedCategory] = useState(null)

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const getSuggestions = () => {
    return [
      "Consider slowing down the pace of lectures based on student feedback",
      "Incorporate more practical examples and hands-on exercises",
      "Improve explanation clarity by using visual aids and diagrams",
      "Increase student interaction through Q&A sessions and discussions",
      "Better organize course materials and provide structured notes",
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Teacher Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">Dr. Smith</span>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Feedback Analytics</h1>
          <p className="mt-2 text-gray-600">Monitor student feedback and improve your teaching methods</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback Distribution</CardTitle>
              <CardDescription>Overall sentiment analysis of student feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  positive: { label: "Positive", color: "#22c55e" },
                  neutral: { label: "Neutral", color: "#f59e0b" },
                  negative: { label: "Negative", color: "#ef4444" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feedbackData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {feedbackData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center space-x-6 mt-4">
                {feedbackData.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                    <p className="text-3xl font-bold text-gray-900">127</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <p className="text-3xl font-bold text-gray-900">4.2/5</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Rate</p>
                    <p className="text-3xl font-bold text-gray-900">89%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Comments */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Feedback Comments</CardTitle>
            <CardDescription>Top 5 recent comments from each category</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="positive" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="positive" className="text-green-700">
                  Positive
                </TabsTrigger>
                <TabsTrigger value="neutral" className="text-yellow-700">
                  Neutral
                </TabsTrigger>
                <TabsTrigger value="negative" className="text-red-700">
                  Negative
                </TabsTrigger>
              </TabsList>

              {Object.entries(recentComments).map(([category, comments]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="space-y-4">
                    {comments.slice(0, 5).map((comment) => (
                      <div key={comment.id} className="p-4 border rounded-lg bg-gray-50">
                        <p className="text-gray-800 mb-2">"{comment.comment}"</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <Badge variant="outline">{comment.subject}</Badge>
                          <span>{comment.date}</span>
                        </div>
                      </div>
                    ))}

                    {comments.length > 5 && (
                      <Button variant="outline" onClick={() => toggleCategory(category)} className="w-full">
                        {expandedCategory === category ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-2" />
                            Show All {comments.length} Comments
                          </>
                        )}
                      </Button>
                    )}

                    {expandedCategory === category && (
                      <div className="space-y-4 mt-4">
                        {comments.slice(5).map((comment) => (
                          <div key={comment.id} className="p-4 border rounded-lg bg-gray-50">
                            <p className="text-gray-800 mb-2">"{comment.comment}"</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <Badge variant="outline">{comment.subject}</Badge>
                              <span>{comment.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI-Powered Improvement Suggestions
            </CardTitle>
            <CardDescription>
              Based on negative feedback analysis, here are personalized suggestions to enhance your teaching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getSuggestions().map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-gray-800">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
