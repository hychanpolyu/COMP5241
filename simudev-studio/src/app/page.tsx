import Link from 'next/link';

export default function Home() {
  const prototypes = [
    {
      id: 'function-design',
      number: 'Prototype 1',
      title: 'Functional Design & Requirement Scope Filter',
      role: 'Role: Business Analyst / System Analyst',
      badgeClass: 'badge-blue',
      fluency: '4D: Description & Problem Framing',
      desc: 'Analyze stakeholder meeting minutes, filter out banned anti-patterns and scope creep, and drag & drop valid requirement cards into the sprint scope.',
      href: '/prototypes/function-design',
      buttonText: 'Launch BA/SA Challenge 📋',
    },
    {
      id: 'git-knowledge',
      number: 'Prototype 2',
      title: 'Git Mastery & Workflow Competency Simulator',
      role: 'Role: Software Developer',
      badgeClass: 'badge-amber',
      fluency: '4D: Diligence & Branching Discipline',
      desc: 'Test real-world Git operations (rebase, stash, cherry-pick, release tags, and un-staging secrets) across 5 randomized scenarios per round with comprehensive explanations.',
      href: '/prototypes/git-knowledge',
      buttonText: 'Launch Developer Simulator 🐙',
    },
    {
      id: 'pr-review',
      number: 'Prototype 3',
      title: 'PR Code Review & Approval Gate (Kanban Integrated)',
      role: 'Role: Senior Engineer / Tech Lead',
      badgeClass: 'badge-rose',
      fluency: '4D: Discernment & Architectural Gatekeeping',
      desc: 'Inspect real code diffs (API leaks, SQL injection, async loops, Zod schemas), make Yes/No approval decisions with technical justifications, and advance the Sprint Kanban board.',
      href: '/prototypes/pr-review',
      buttonText: 'Launch Tech Lead Gate 🛡️',
    },
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{ marginBottom: '2.5rem', textAlign: 'center', padding: '2rem 1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span className="badge badge-blue">COMP5241 Software Engineering</span>
          <span className="badge badge-green">PolyTech Labs Virtual Software House</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
          SimuDev Studio
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
          An immersive, role-playing software engineering lab where learners step into the shoes of a{' '}
          <strong style={{ color: 'var(--accent-primary)' }}>Business Analyst (BA/SA)</strong>, a{' '}
          <strong style={{ color: 'var(--accent-amber)' }}>Software Developer</strong>, and a{' '}
          <strong style={{ color: 'var(--accent-rose)' }}>Senior Tech Lead</strong>.
        </p>
      </section>

      {/* 3 Core Prototypes Grid */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Role-Playing Prototype Suite</h2>
          <span className="badge badge-green">3 Interactive Experiences</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {prototypes.map((proto) => (
            <div
              key={proto.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className={`badge ${proto.badgeClass}`}>{proto.number}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{proto.fluency}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {proto.role}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {proto.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {proto.desc}
                </p>
              </div>

              <div>
                <Link
                  href={proto.href}
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '0.9rem' }}
                >
                  {proto.buttonText} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
