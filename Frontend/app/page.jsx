import Link from "next/link"

export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <header style={{ backgroundColor: "var(--primary)", padding: "1rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-foreground)" }}>
            Educational Feedback System
          </h1>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <section style={{ backgroundColor: "var(--muted)", padding: "5rem 0" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "1.5rem", fontSize: "2.5rem", fontWeight: "bold" }}>
              Welcome to the Educational Feedback Platform
            </h2>
            <p
              style={{
                margin: "0 auto 2rem",
                maxWidth: "42rem",
                fontSize: "1.125rem",
                color: "var(--muted-foreground)",
              }}
            >
              A platform where students can provide valuable feedback to teachers, and teachers can gain insights to
              improve their teaching methods.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <Link href="/login" className="btn btn-primary btn-lg">
                Login
              </Link>
              <Link href="/signup" className="btn btn-outline btn-lg">
                Sign Up
              </Link>
            </div>
          </div>
        </section>

        <section style={{ padding: "4rem 0" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gap: "2rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              <div className="card">
                <div className="card-content">
                  <h3 style={{ marginBottom: "0.75rem", fontSize: "1.25rem", fontWeight: "bold" }}>For Students</h3>
                  <p style={{ marginBottom: "1rem", color: "var(--muted-foreground)" }}>
                    Select your courses, rate your teachers, and provide constructive feedback to help improve the
                    learning experience.
                  </p>
                  <Link href="/signup?role=student" className="btn btn-secondary">
                    Student Sign Up
                  </Link>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <h3 style={{ marginBottom: "0.75rem", fontSize: "1.25rem", fontWeight: "bold" }}>For Teachers</h3>
                  <p style={{ marginBottom: "1rem", color: "var(--muted-foreground)" }}>
                    Gain valuable insights from student feedback, view analytics, and receive suggestions for
                    improvement.
                  </p>
                  <Link href="/signup?role=teacher" className="btn btn-secondary">
                    Teacher Sign Up
                  </Link>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <h3 style={{ marginBottom: "0.75rem", fontSize: "1.25rem", fontWeight: "bold" }}>How It Works</h3>
                  <p style={{ marginBottom: "1rem", color: "var(--muted-foreground)" }}>
                    Our platform connects students and teachers through a transparent feedback system that benefits the
                    entire educational community.
                  </p>
                  <Link href="/about" className="btn btn-secondary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ backgroundColor: "var(--muted)", padding: "1.5rem 0" }}>
        <div
          className="container"
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
          }}
        >
          &copy; {new Date().getFullYear()} Educational Feedback System. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
