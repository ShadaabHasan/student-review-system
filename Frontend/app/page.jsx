import Link from "next/link"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { BookOpen, Users, BarChart3, MessageSquare, GraduationCap, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">EduFeedback</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Automated Educational
            <span className="text-blue-600"> Feedback System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline student feedback collection and analysis to improve teaching quality and educational outcomes, as
            recommended by UGC and AICTE guidelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Collecting Feedback
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Feedback Management</h2>
            <p className="text-xl text-gray-600">
              Everything you need to collect, analyze, and act on student feedback
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Student Portal</CardTitle>
                <CardDescription>
                  Easy-to-use interface for students to provide feedback on subjects and teachers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Select year and course</li>
                  <li>• Rate teaching quality</li>
                  <li>• Provide detailed feedback</li>
                  <li>• Anonymous submissions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Teacher Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive analytics and insights for educators to improve their teaching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Sentiment analysis charts</li>
                  <li>• Recent feedback comments</li>
                  <li>• Performance metrics</li>
                  <li>• Improvement suggestions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-purple-600 mb-4" />
                <CardTitle>AI-Powered Analytics</CardTitle>
                <CardDescription>Automated analysis and actionable insights from student feedback data</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Sentiment classification</li>
                  <li>• Trend analysis</li>
                  <li>• Personalized recommendations</li>
                  <li>• Performance tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle>Real-time Feedback</CardTitle>
                <CardDescription>Instant feedback collection and processing for timely improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Live feedback submission</li>
                  <li>• Instant notifications</li>
                  <li>• Quick response system</li>
                  <li>• Mobile-friendly interface</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>Performance Tracking</CardTitle>
                <CardDescription>Monitor teaching effectiveness and student satisfaction over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Historical data analysis</li>
                  <li>• Progress monitoring</li>
                  <li>• Comparative metrics</li>
                  <li>• Goal setting tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-indigo-600 mb-4" />
                <CardTitle>Compliance Ready</CardTitle>
                <CardDescription>Meets UGC and AICTE requirements for educational feedback systems</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Regulatory compliance</li>
                  <li>• Standardized reporting</li>
                  <li>• Data security</li>
                  <li>• Audit trails</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Educational Feedback Process?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators already using our platform to improve teaching quality
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-xl font-semibold">EduFeedback</span>
          </div>
          <p className="text-center text-gray-400 mt-4">
            Empowering educational institutions with automated feedback systems
          </p>
        </div>
      </footer>
    </div>
  )
}
