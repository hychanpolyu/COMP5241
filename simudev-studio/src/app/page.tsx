import Link from 'next/link';

export default function Home() {
  const prototypes = [
    {
      id: 'testing-lab',
      number: 'Featured',
      title: 'AI Test Automation & TDD Arena',
      badge: 'Testing Prototype',
      badgeClass: 'badge-rose',
      fluency: 'Diligence & Discernment',
      desc: 'Experience how AI coding agents support test-driven development, edge-case generation, and mutation testing to verify code correctness and guard against hallucinations.',
      href: '/prototypes/testing-lab',
      featured: true,
    },
    {
      id: 'agile-sprint',
      number: 'Prototype 1',
      title: 'Simulated Agile Sprint & Multi-Agent PR Review',
      badge: 'Simulation & Role-Play',
      badgeClass: 'badge-blue',
      fluency: 'Delegation & Description',
      desc: 'Submit PRs and negotiate design decisions with specialized AI bots (Security Sentinel, Performance Guru, Clean Code Lead) in a simulated agile workflow.',
      href: '/prototypes/agile-sprint',
    },
    {
      id: 'war-room',
      number: 'Prototype 2',
      title: 'Interactive System Architecture & Incident War Room',
      badge: 'Architecture Simulation',
      badgeClass: 'badge-amber',
      fluency: 'Architecture & Resilience',
      desc: 'Design distributed topologies, inject chaotic failures (traffic spikes, cache failures), and triage outages with an AI Incident Commander.',
      href: '/prototypes/war-room',
    },
    {
      id: 'codeventure',
      number: 'Prototype 3',
      title: 'CodeVenture: Universal Gamified Micro-Quest Generator',
      badge: 'Gamification & Universal',
      badgeClass: 'badge-green',
      fluency: 'Universal Generation',
      desc: 'RPG-style skill trees with procedural mini-quests generated on-demand for any engineering domain (Smart Contracts, Robotics, Bio-Python).',
      href: '/prototypes/codeventure',
    },
    {
      id: 'pair-programming',
      number: 'Prototype 4',
      title: 'Pair-Programming Sandbox with AI Mentor',
      badge: 'Live Online Coding',
      badgeClass: 'badge-blue',
      fluency: 'Description & Diligence',
      desc: 'An interactive browser IDE where an AI Mentor observes your code and offers pedagogical hints and invariants without simply giving away the answer.',
      href: '/prototypes/pair-programming',
    },
    {
      id: 'puzzle-rooms',
      number: 'Prototype 5',
      title: 'AI-Driven Prompt Engineering Puzzle Rooms',
      badge: 'Mini-Game Challenge',
      badgeClass: 'badge-amber',
      fluency: 'Description & Discernment',
      desc: 'Escape-room style coding challenges where you must fix vulnerable or broken code using a constrained prompt token budget.',
      href: '/prototypes/puzzle-rooms',
    },
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{ marginBottom: '2.5rem', textAlign: 'center', padding: '2rem 1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="badge badge-blue">COMP5241 Software Engineering</span>
          <span className="badge badge-green">PolyTech Labs Simulation</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
          SimuDev Studio
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto 1.5rem auto' }}>
          An AI-empowered virtual software house and testing sandbox where learners master the{' '}
          <strong style={{ color: 'var(--text-primary)' }}>4D AI Fluency Framework</strong> across real-world agile, architecture, and testing workflows.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link href="/prototypes/testing-lab" className="btn btn-primary">
            Launch Testing Arena ⚡
          </Link>
          <Link href="/prototypes/agile-sprint" className="btn btn-secondary">
            Explore Sprint Board 📋
          </Link>
        </div>
      </section>

      {/* Prototypes Grid */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Interactive Prototype Lab</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>6 Interactive Modules</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {prototypes.map((proto) => (
            <div
              key={proto.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: proto.featured ? '1px solid var(--accent-rose)' : undefined,
                background: proto.featured ? 'linear-gradient(180deg, rgba(244, 63, 94, 0.05) 0%, var(--bg-card) 100%)' : undefined,
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className={`badge ${proto.badgeClass}`}>{proto.number}: {proto.badge}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{proto.fluency}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {proto.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {proto.desc}
                </p>
              </div>

              <div>
                <Link
                  href={proto.href}
                  className={`btn ${proto.featured ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', fontSize: '0.85rem' }}
                >
                  Launch Module &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
