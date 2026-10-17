'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface PRComment {
  id: string;
  author: string;
  role: string;
  badgeClass: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export default function AgileSprintPage() {
  const [activeTab, setActiveTab] = useState<'board' | 'pr'>('pr');
  const [prStatus, setPrStatus] = useState<'reviewing' | 'changes_requested' | 'approved' | 'merged'>('reviewing');
  const [userReply, setUserReply] = useState('');
  const [comments, setComments] = useState<PRComment[]>([
    {
      id: 'c1',
      author: 'Security Sentinel AI',
      role: 'Automated Security Scanner',
      badgeClass: 'badge-rose',
      avatar: '🛡️',
      text: '⚠️ Warning: Potential SQL Injection / Unsanitized parameter detected at line 42 in `userRepository.findByEmail(rawInput)`. Ensure parameterized queries or ORM sanitization is used before merging.',
      timestamp: '2 mins ago',
    },
    {
      id: 'c2',
      author: 'Performance Guru AI',
      role: 'Static Profiler Bot',
      badgeClass: 'badge-amber',
      avatar: '⚡',
      text: 'Notice: O(N²) nested loop detected in permission check array mapping. Recommended refactoring to a `Set` or `Map` lookup for O(1) performance.',
      timestamp: '4 mins ago',
    },
    {
      id: 'c3',
      author: 'Clean Code Lead AI',
      role: 'Architecture Bot',
      badgeClass: 'badge-blue',
      avatar: '📐',
      text: 'Good separation of concerns in `authController.ts`. Please ensure the new DTO types are exported from the shared types module.',
      timestamp: '5 mins ago',
    },
  ]);

  const handleSendReply = () => {
    if (!userReply.trim()) return;
    const newComment: PRComment = {
      id: `u-${Date.now()}`,
      author: 'You (Software Engineer)',
      role: 'Student / Developer',
      badgeClass: 'badge-green',
      avatar: '👨‍💻',
      text: userReply,
      timestamp: 'Just now',
    };
    setComments([...comments, newComment]);
    setUserReply('');

    // Simulate AI response after 1s
    setTimeout(() => {
      const aiResponse: PRComment = {
        id: `c-${Date.now()}`,
        author: 'Security Sentinel AI',
        role: 'Automated Security Scanner',
        badgeClass: 'badge-rose',
        avatar: '🛡️',
        text: 'Checked updated prompt/patch. Parameterized query has been verified! Security checks passing. ✅',
        timestamp: 'Just now',
      };
      setComments((prev) => [...prev, aiResponse]);
      setPrStatus('approved');
    }, 1200);
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              &larr; Prototypes
            </Link>
            <span style={{ color: 'var(--border-color)' }}>/</span>
            <span className="badge badge-blue">Prototype 1</span>
            <span className="badge badge-green">4D Fluency: Delegation</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Simulated Agile Sprint & Multi-Agent PR Review</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Collaborate across simulated sprints with autonomous AI agents (Security, Performance, and Architecture Reviewers).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('pr')}
            className={`btn ${activeTab === 'pr' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Pull Request #104
          </button>
          <button
            onClick={() => setActiveTab('board')}
            className={`btn ${activeTab === 'board' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Sprint Board (Kanban)
          </button>
        </div>
      </div>

      {activeTab === 'board' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div className="card" style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>TO DO (2)</h3>
            <div className="card" style={{ padding: '0.75rem', marginBottom: '0.75rem', backgroundColor: '#090d16' }}>
              <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>SEC-88</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Implement rate-limiting middleware</p>
            </div>
            <div className="card" style={{ padding: '0.75rem', backgroundColor: '#090d16' }}>
              <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>FEAT-92</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Add Stripe webhook signature validation</p>
            </div>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>IN PR REVIEW (1)</h3>
            <div
              className="card"
              onClick={() => setActiveTab('pr')}
              style={{ padding: '0.75rem', backgroundColor: '#090d16', cursor: 'pointer', borderColor: 'var(--accent-primary)' }}
            >
              <span className="badge badge-rose" style={{ marginBottom: '0.5rem' }}>PR-104</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Refactor User Auth Repository & Token Validation</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>3 AI review comments &bull; Click to open</p>
            </div>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--accent-green)' }}>DONE (3)</h3>
            <div className="card" style={{ padding: '0.75rem', backgroundColor: '#090d16' }}>
              <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>CORE-41</span>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Setup Next.js 16 App Directory Scaffold</p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          {/* PR Details and Code Diff */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>PR #104: Auth Repository Refactor</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Branch: feat/auth-orm &bull; Merging into main</p>
              </div>
              <span
                className={`badge ${
                  prStatus === 'approved'
                    ? 'badge-green'
                    : prStatus === 'changes_requested'
                    ? 'badge-rose'
                    : 'badge-amber'
                }`}
              >
                {prStatus.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="code-block" style={{ marginBottom: '1rem' }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>// src/repositories/userRepository.ts</div>
              <div style={{ color: '#f43f5e' }}>- const query = `SELECT * FROM users WHERE email = &apos;${'${rawInput}'}&apos;`;</div>
              <div style={{ color: '#4ade80' }}>+ const user = await prisma.user.findUnique(&#123; where: &#123; email: sanitizedEmail &#125; &#125;);</div>
              <div style={{ color: '#94a3b8' }}>  return user;</div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Reply to AI Reviewers</h4>
              <textarea
                value={userReply}
                onChange={(e) => setUserReply(e.target.value)}
                placeholder="Explain your architectural rationale or ask the AI reviewers to re-scan..."
                rows={3}
                style={{ width: '100%', marginBottom: '0.75rem', fontSize: '0.85rem' }}
              />
              <button onClick={handleSendReply} className="btn btn-primary">
                Post Response & Request AI Re-check
              </button>
            </div>
          </div>

          {/* AI Reviews Panel */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Autonomous Review Thread</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {comments.map((c) => (
                <div key={c.id} className="card" style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.2rem' }}>{c.avatar}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.author}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.role}</div>
                      </div>
                    </div>
                    <span className={`badge ${c.badgeClass}`}>{c.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
