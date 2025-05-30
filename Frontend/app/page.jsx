// import Link from "next/link"
// import { Button } from "../components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
// import { BookOpen, Users, BarChart3, MessageSquare, GraduationCap, TrendingUp } from "lucide-react"

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <BookOpen className="h-8 w-8 text-blue-600" />
//               <span className="ml-2 text-xl font-semibold">EduFeedback</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Link href="/login">
//                 <Button variant="ghost">Sign In</Button>
//               </Link>
//               <Link href="/signup">
//                 <Button>Get Started</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//             Automated Educational
//             <span className="text-blue-600"> Feedback System</span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//             Streamline student feedback collection and analysis to improve teaching quality and educational outcomes, as
//             recommended by UGC and AICTE guidelines.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/signup">
//               <Button size="lg" className="w-full sm:w-auto">
//                 Start Collecting Feedback
//               </Button>
//             </Link>
//             <Link href="/login">
//               <Button variant="outline" size="lg" className="w-full sm:w-auto">
//                 View Analytics
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Feedback Management</h2>
//             <p className="text-xl text-gray-600">
//               Everything you need to collect, analyze, and act on student feedback
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <Card>
//               <CardHeader>
//                 <GraduationCap className="h-10 w-10 text-blue-600 mb-4" />
//                 <CardTitle>Student Portal</CardTitle>
//                 <CardDescription>
//                   Easy-to-use interface for students to provide feedback on subjects and teachers
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• Select year and course</li>
//                   <li>• Rate teaching quality</li>
//                   <li>• Provide detailed feedback</li>
//                   <li>• Anonymous submissions</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <Users className="h-10 w-10 text-green-600 mb-4" />
//                 <CardTitle>Teacher Dashboard</CardTitle>
//                 <CardDescription>
//                   Comprehensive analytics and insights for educators to improve their teaching
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• Sentiment analysis charts</li>
//                   <li>• Recent feedback comments</li>
//                   <li>• Performance metrics</li>
//                   <li>• Improvement suggestions</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <BarChart3 className="h-10 w-10 text-purple-600 mb-4" />
//                 <CardTitle>AI-Powered Analytics</CardTitle>
//                 <CardDescription>Automated analysis and actionable insights from student feedback data</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• Sentiment classification</li>
//                   <li>• Trend analysis</li>
//                   <li>• Personalized recommendations</li>
//                   <li>• Performance tracking</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <MessageSquare className="h-10 w-10 text-orange-600 mb-4" />
//                 <CardTitle>Real-time Feedback</CardTitle>
//                 <CardDescription>Instant feedback collection and processing for timely improvements</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• Live feedback submission</li>
//                   <li>• Instant notifications</li>
//                   <li>• Quick response system</li>
//                   <li>• Mobile-friendly interface</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <TrendingUp className="h-10 w-10 text-red-600 mb-4" />
//                 <CardTitle>Performance Tracking</CardTitle>
//                 <CardDescription>Monitor teaching effectiveness and student satisfaction over time</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• Historical data analysis</li>
//                   <li>• Progress monitoring</li>
//                   <li>• Comparative metrics</li>
//                   <li>• Goal setting tools</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <BookOpen className="h-10 w-10 text-indigo-600 mb-4" />
//                 <CardTitle>Compliance Ready</CardTitle>
//                 <CardDescription>Meets UGC and AICTE requirements for educational feedback systems</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li>• Regulatory compliance</li>
//                   <li>• Standardized reporting</li>
//                   <li>• Data security</li>
//                   <li>• Audit trails</li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-blue-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Educational Feedback Process?</h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Join thousands of educators already using our platform to improve teaching quality
//           </p>
//           <Link href="/signup">
//             <Button size="lg" variant="secondary">
//               Get Started Today
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-center">
//             <BookOpen className="h-8 w-8 text-blue-400" />
//             <span className="ml-2 text-xl font-semibold">EduFeedback</span>
//           </div>
//           <p className="text-center text-gray-400 mt-4">
//             Empowering educational institutions with automated feedback systems
//           </p>
//         </div>
//       </footer>
//     </div>
//   )
// }


import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { BookOpen, Users, BarChart3, MessageSquare, GraduationCap, TrendingUp } from "lucide-react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #ebf4ff, #c3dafe)",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    backgroundColor: "white",
    boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
  },
  headerContainer: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 64,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 600,
  },
  headerIcons: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  heroSection: {
    paddingTop: 80,
    paddingBottom: 80,
    textAlign: "center",
    maxWidth: 1120,
    margin: "0 auto",
    paddingLeft: 16,
    paddingRight: 16,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 700,
    color: "#1a202c",
    marginBottom: 24,
  },
  heroTitleHighlight: {
    color: "#2563eb", // blue-600
  },
  heroText: {
    fontSize: 20,
    color: "#4a5568",
    maxWidth: 480,
    margin: "0 auto 32px auto",
  },
  heroButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    justifyContent: "center",
    maxWidth: 320,
    margin: "0 auto",
  },
  heroButtonsSm: {
    flexDirection: "row",
    gap: 16,
    maxWidth: "none",
    margin: 0,
  },
  featuresSection: {
    paddingTop: 80,
    paddingBottom: 80,
    backgroundColor: "white",
    maxWidth: 1120,
    margin: "0 auto",
    paddingLeft: 16,
    paddingRight: 16,
  },
  featuresHeader: {
    textAlign: "center",
    marginBottom: 64,
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "#1a202c",
    marginBottom: 16,
  },
  featuresText: {
    fontSize: 20,
    color: "#4a5568",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 32,
  },
  cardIcon: {
    marginBottom: 16,
  },
  ctaSection: {
    paddingTop: 80,
    paddingBottom: 80,
    backgroundColor: "#2563eb", // blue-600
    textAlign: "center",
    maxWidth: 1120,
    margin: "0 auto",
    paddingLeft: 16,
    paddingRight: 16,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: "white",
    marginBottom: 16,
  },
  ctaText: {
    fontSize: 20,
    color: "#bfdbfe", // blue-100
    marginBottom: 32,
  },
  footer: {
    backgroundColor: "#1a202c", // gray-900
    color: "white",
    paddingTop: 48,
    paddingBottom: 48,
    textAlign: "center",
  },
  footerContainer: {
    maxWidth: 1120,
    margin: "0 auto",
    paddingLeft: 16,
    paddingRight: 16,
  },
  footerLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    color: "#a0aec0", // gray-400
    marginTop: 16,
    fontSize: 14,
  },
};

export default function HomePage() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.headerLeft}>
            <BookOpen color="#2563eb" size={32} />
            <span style={styles.headerTitle}>EduFeedback</span>
          </div>
          <div style={styles.headerIcons}>
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>
          Automated Educational{" "}
          <span style={styles.heroTitleHighlight}>Feedback System</span>
        </h1>
        <p style={styles.heroText}>
          Streamline student feedback collection and analysis to improve teaching quality and educational outcomes, as
          recommended by UGC and AICTE guidelines.
        </p>
        <div
          style={{
            ...styles.heroButtons,
            ...(typeof window !== "undefined" && window.innerWidth >= 640
              ? styles.heroButtonsSm
              : {}),
          }}
        >
          <Link href="/signup">
            <Button size="lg" style={{ width: "100%", maxWidth: "auto" }}>
              Start Collecting Feedback
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              style={{ width: "100%", maxWidth: "auto" }}
            >
              View Analytics
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresHeader}>
          <h2 style={styles.featuresTitle}>Comprehensive Feedback Management</h2>
          <p style={styles.featuresText}>
            Everything you need to collect, analyze, and act on student feedback
          </p>
        </div>

        <div style={styles.featuresGrid}>
          <Card>
            <CardHeader>
              <GraduationCap
                size={40}
                color="#2563eb"
                style={styles.cardIcon}
              />
              <CardTitle>Student Portal</CardTitle>
              <CardDescription>
                Easy-to-use interface for students to provide feedback on subjects and teachers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul style={{ color: "#4a5568", fontSize: 14, lineHeight: 1.5 }}>
                <li>• Select year and course</li>
                <li>• Rate teaching quality</li>
                <li>• Provide detailed feedback</li>
                <li>• Anonymous submissions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users size={40} color="#16a34a" style={styles.cardIcon} />
              <CardTitle>Teacher Dashboard</CardTitle>
              <CardDescription>
                Comprehensive analytics and insights for educators to improve their teaching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul style={{ color: "#4a5568", fontSize: 14, lineHeight: 1.5 }}>
                <li>• Sentiment analysis charts</li>
                <li>• Recent feedback comments</li>
                <li>• Performance metrics</li>
                <li>• Improvement suggestions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 size={40} color="#7c3aed" style={styles.cardIcon} />
              <CardTitle>AI-Powered Analytics</CardTitle>
              <CardDescription>
                Automated analysis and actionable insights from student feedback data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul style={{ color: "#4a5568", fontSize: 14, lineHeight: 1.5 }}>
                <li>• Sentiment classification</li>
                <li>• Trend analysis</li>
                <li>• Personalized recommendations</li>
                <li>• Performance tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare size={40} color="#f97316" style={styles.cardIcon} />
              <CardTitle>Real-time Feedback</CardTitle>
              <CardDescription>
                Instant feedback collection and processing for timely improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul style={{ color: "#4a5568", fontSize: 14, lineHeight: 1.5 }}>
                <li>• Live feedback submission</li>
                <li>• Instant notifications</li>
                <li>• Quick response system</li>
                <li>• Mobile-friendly interface</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp size={40} color="#dc2626" style={styles.cardIcon} />
              <CardTitle>Performance Tracking</CardTitle>
              <CardDescription>
                Monitor teaching effectiveness and student satisfaction over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul style={{ color: "#4a5568", fontSize: 14, lineHeight: 1.5 }}>
                <li>• Historical data analysis</li>
                <li>• Progress monitoring</li>
                <li>• Comparative metrics</li>
                <li>• Goal setting tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen size={40} color="#4338ca" style={styles.cardIcon} />
              <CardTitle>Compliance Ready</CardTitle>
              <CardDescription>
                Meets UGC and AICTE requirements for educational feedback systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul style={{ color: "#4a5568", fontSize: 14, lineHeight: 1.5 }}>
                <li>• Regulatory compliance</li>
                <li>• Standardized reporting</li>
                <li>• Data security</li>
                <li>• Audit trails</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Educational Feedback Process?</h2>
          <p style={styles.ctaText}>
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
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerLogo}>
            <BookOpen size={32} color="#60a5fa" />
            <span style={{ fontSize: 20, fontWeight: 600 }}>EduFeedback</span>
          </div>
          <p style={styles.footerText}>
            Empowering educational institutions with automated feedback systems
          </p>
        </div>
      </footer>
    </div>
  );
}
