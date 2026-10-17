import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SimuDev Studio | AI-Empowered Software Engineering Platform",
  description: "Virtual Agile Software House, System Architecture Sandbox & AI Testing Arena for COMP5241",
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
              <Link href="/prototypes/testing-lab" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
                Testing Arena
              </Link>
              <Link href="/prototypes/agile-sprint" style={{ color: "var(--text-secondary)" }}>
                Agile Sprint
              </Link>
              <Link href="/prototypes/war-room" style={{ color: "var(--text-secondary)" }}>
                War Room
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
          <p>COMP5241 Software Engineering Group Project &bull; SimuDev Studio Prototype Suite</p>
        </footer>
      </body>
    </html>
  );
}
