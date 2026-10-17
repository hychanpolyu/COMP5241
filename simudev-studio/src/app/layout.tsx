import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SimuDev Studio | AI-Empowered Role-Playing SE Simulator",
  description: "Virtual Agile Software House & Role-Playing SE Lab for Business Analysts, Developers, and Tech Leads (COMP5241)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav
          style={{
            borderBottom: "1px solid var(--border-color)",
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(8px)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "0.85rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link
                href="/"
                style={{
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    backgroundColor: "var(--accent-primary)",
                    color: "#0f172a",
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "0.85rem",
                  }}
                >
                  S
                </span>
                SimuDev Studio
              </Link>
              <span className="badge badge-blue">PolyTech Labs</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "0.9rem" }}>
              <Link href="/" style={{ color: "var(--text-secondary)" }}>
                Home
              </Link>
              <Link href="/prototypes/function-design" style={{ color: "var(--text-secondary)" }}>
                P1: Function Design (BA/SA)
              </Link>
              <Link href="/prototypes/git-knowledge" style={{ color: "var(--text-secondary)" }}>
                P2: Git Mastery (Dev)
              </Link>
              <Link href="/prototypes/pr-review" style={{ color: "var(--text-secondary)" }}>
                P3: PR Review (Tech Lead)
              </Link>
            </div>
          </div>
        </nav>

        <main style={{ minHeight: "calc(100vh - 140px)" }}>{children}</main>

        <footer
          style={{
            borderTop: "1px solid var(--border-color)",
            padding: "1.5rem",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          <p>COMP5241 Software Engineering Group Project &bull; SimuDev Studio Role-Playing Suite</p>
        </footer>
      </body>
    </html>
  );
}
