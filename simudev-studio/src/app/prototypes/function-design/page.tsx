'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ActionCard {
  id: string;
  title: string;
  category: string;
  isCorrect: boolean;
  reason: string;
}

export default function FunctionDesignPage() {
  const initialCards: ActionCard[] = [
    {
      id: 'c1',
      title: 'Implement OAuth 2.0 & PolyU SSO Login',
      category: 'Authentication',
      isCorrect: true,
      reason: 'Agreed by BA/SA: University security policy mandates single sign-on (SSO) with MFA for all student and staff portals.',
    },
    {
      id: 'c2',
      title: 'Store User Passwords in Plaintext for Fast Recovery',
      category: 'Security Anti-Pattern',
      isCorrect: false,
      reason: 'Banned by SA: Extreme security vulnerability. Passwords must be hashed using bcrypt/argon2 with salt; plaintext storage violates privacy laws.',
    },
    {
      id: 'c3',
      title: 'Automated Course Roster CSV Import & Validation',
      category: 'Instructor Tools',
      isCorrect: true,
      reason: 'Agreed by BA/SA: Instructors require bulk student onboarding with schema validation to avoid manual data entry errors.',
    },
    {
      id: 'c4',
      title: 'Build Custom Cryptocurrency Payment Gateway for Course Fees',
      category: 'Scope Creep',
      isCorrect: false,
      reason: 'Banned by BA: The university system only accepts official campus billing and credit cards. Crypto integration was explicitly rejected as out of scope.',
    },
    {
      id: 'c5',
      title: 'Real-Time Quiz & Interactive Code Execution Sandbox',
      category: 'Core Learning Experience',
      isCorrect: true,
      reason: 'Agreed by BA/SA: Core educational requirement to provide immediate feedback on student coding and quiz submissions.',
    },
    {
      id: 'c6',
      title: 'Bypass API Rate Limiting to Speed Up Batch Uploads',
      category: 'System Reliability',
      isCorrect: false,
      reason: 'Banned by SA: Rate limiting protects microservices from DDoS attacks and resource exhaustion. Bypassing it would destabilize production.',
    },
    {
      id: 'c7',
      title: 'Student Learning Progress & 4D Fluency Analytics Dashboard',
      category: 'Reporting & Analytics',
      isCorrect: true,
      reason: 'Agreed by BA/SA: Essential requirement for course instructors to track Delegation, Description, Discernment, and Diligence metrics.',
    },
    {
      id: 'c8',
      title: 'Allow Direct Raw SQL Queries from Client Frontend',
      category: 'Architecture Flaw',
      isCorrect: false,
      reason: 'Banned by SA: Catastrophic architectural risk enabling SQL Injection and total database compromise. Must use backend API routes with ORM.',
    },
    {
      id: 'c9',
      title: 'Automatic Email & Notification Alerts for Assignment Deadlines',
      category: 'Notification Service',
      isCorrect: true,
      reason: 'Agreed by BA/SA: High priority UX requirement to reduce missed deadlines and keep students informed of course milestones.',
    },
    {
      id: 'c10',
      title: 'Scrape Third-Party Paywalled Textbook Websites Automatically',
      category: 'Copyright & Compliance',
      isCorrect: false,
      reason: 'Banned by BA/Legal: Copyright infringement risk. University policies strictly prohibit unauthorized automated content scraping.',
    },
  ];

  const [availableCards, setAvailableCards] = useState<ActionCard[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<ActionCard[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  // Move a card from available to selected
  const moveToSelected = (card: ActionCard) => {
    if (submitted) return;
    setAvailableCards((prev) => prev.filter((c) => c.id !== card.id));
    setSelectedCards((prev) => [...prev, card]);
  };

  // Move a card from selected back to available
  const moveToAvailable = (card: ActionCard) => {
    if (submitted) return;
    setSelectedCards((prev) => prev.filter((c) => c.id !== card.id));
    setAvailableCards((prev) => [...prev, card]);
  };

  // Drag and drop handlers
  const handleDragStart = (id: string) => {
    setDraggedCardId(id);
  };

  const handleDropToSelected = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedCardId || submitted) return;
    const card = availableCards.find((c) => c.id === draggedCardId);
    if (card) {
      moveToSelected(card);
    }
    setDraggedCardId(null);
  };

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedCardId || submitted) return;
    const card = selectedCards.find((c) => c.id === draggedCardId);
    if (card) {
      moveToAvailable(card);
    }
    setDraggedCardId(null);
  };

  const handleReset = () => {
    setAvailableCards(initialCards);
    setSelectedCards([]);
    setSubmitted(false);
  };

  // Calculation of results
  const correctSelections = selectedCards.filter((c) => c.isCorrect);
  const incorrectSelections = selectedCards.filter((c) => !c.isCorrect);
  const missedCards = initialCards.filter((c) => c.isCorrect && !selectedCards.some((s) => s.id === c.id));
  const score = Math.max(0, correctSelections.length - incorrectSelections.length);

  return (
    <div className="container">
      {/* Header & Breadcrumb */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              &larr; Prototypes
            </Link>
            <span style={{ color: 'var(--border-color)' }}>/</span>
            <span className="badge badge-blue">Prototype 1</span>
            <span className="badge badge-green">Role: Business Analyst / System Analyst</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Functional Design & Requirement Scope Filter</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Analyze stakeholder meeting notes, discard banned anti-patterns or scope creep, and select the verified sprint action cards.
          </p>
        </div>

        <button onClick={handleReset} className="btn btn-secondary">
          🔄 Reset Requirements
        </button>
      </div>

      {/* Stakeholder Meeting Conclusion Panel */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          backgroundColor: '#0b1329',
          borderColor: 'var(--accent-primary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.3rem' }}>📋</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
            Sprint Stakeholder Meeting Minutes & BA/SA Directives
          </h3>
        </div>
        <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Project Context:</strong> PolyTech Labs is delivering Phase 1 of the GenAI Software Engineering Learning Platform for university courses.
          </p>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li>
              <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>[BA Approved]:</span> Prioritize official campus authentication (SSO), roster bulk management, deadline alerts, interactive learning sandboxes, and student 4D Fluency analytics.
            </li>
            <li>
              <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>[SA Banned]:</span> Strictly reject any insecure client-side SQL execution, plaintext password caching, rate-limit bypassing, and experimental crypto payment gateways.
            </li>
            <li>
              <span style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>[Legal/Compliance]:</span> Prohibit unauthorized web scraping of paywalled external textbooks.
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive 2-Box Drag and Drop Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left Box: Candidate Action Cards */}
        <div
          className="card"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToAvailable}
          style={{ minHeight: '380px', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              📥 Candidate Action Cards ({availableCards.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Drag or click &rarr; to select</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
            {availableCards.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
                All action cards have been moved to sprint scope.
              </div>
            ) : (
              availableCards.map((card) => (
                <div
                  key={card.id}
                  draggable={!submitted}
                  onDragStart={() => handleDragStart(card.id)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: '#090d16',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: submitted ? 'default' : 'grab',
                  }}
                >
                  <div>
                    <span className="badge badge-blue" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                      {card.category}
                    </span>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{card.title}</div>
                  </div>
                  {!submitted && (
                    <button
                      onClick={() => moveToSelected(card)}
                      className="btn btn-secondary"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      title="Move to Sprint Scope"
                    >
                      Select &rarr;
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Box: Selected Action Cards for Sprint */}
        <div
          className="card"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToSelected}
          style={{
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            borderColor: selectedCards.length > 0 ? 'var(--accent-primary)' : 'var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
              🎯 Selected Sprint Scope ({selectedCards.length} cards)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: exactly 5 correct items</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
            {selectedCards.length === 0 ? (
              <div
                style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: '8px',
                  padding: '3rem 1rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Drag cards here or click &quot;Select &rarr;&quot; to commit to this sprint scope.
              </div>
            ) : (
              selectedCards.map((card) => (
                <div
                  key={card.id}
                  draggable={!submitted}
                  onDragStart={() => handleDragStart(card.id)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: submitted
                      ? card.isCorrect
                        ? 'rgba(74, 222, 128, 0.1)'
                        : 'rgba(244, 63, 94, 0.1)'
                      : '#1e293b',
                    borderRadius: '6px',
                    border: `1px solid ${
                      submitted
                        ? card.isCorrect
                          ? 'var(--accent-green)'
                          : 'var(--accent-rose)'
                        : 'var(--accent-primary)'
                    }`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: submitted ? 'default' : 'grab',
                  }}
                >
                  <div>
                    <span className="badge badge-amber" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                      {card.category}
                    </span>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{card.title}</div>
                  </div>
                  {!submitted && (
                    <button
                      onClick={() => moveToAvailable(card)}
                      className="btn btn-secondary"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: 'var(--accent-rose)' }}
                      title="Remove from Scope"
                    >
                      &larr; Remove
                    </button>
                  )}
                  {submitted && (
                    <span className={`badge ${card.isCorrect ? 'badge-green' : 'badge-rose'}`}>
                      {card.isCorrect ? 'VALID' : 'BANNED / INVALID'}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setSubmitted(true)}
              disabled={selectedCards.length === 0 || submitted}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              {submitted ? 'Scope Evaluation Completed ✅' : 'Submit Sprint Requirement Scope'}
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Feedback & Explanation Section */}
      {submitted && (
        <div className="card" style={{ marginTop: '1.5rem', borderColor: score === 5 ? 'var(--accent-green)' : 'var(--accent-amber)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                BA/SA Scope Evaluation Score: {score} / 5
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Correctly Selected: {correctSelections.length}/5 &bull; Incorrect/Banned Included: {incorrectSelections.length} &bull; Missed Valid Items: {missedCards.length}
              </p>
            </div>
            <button onClick={handleReset} className="btn btn-primary">
              Try Again 🔄
            </button>
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            Full Requirement Review & Architectural Explanations:
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
            {initialCards.map((card) => {
              const wasSelected = selectedCards.some((s) => s.id === card.id);
              let statusText = '';
              let badgeColor = '';

              if (card.isCorrect && wasSelected) {
                statusText = '✅ Correctly Included in Sprint';
                badgeColor = 'badge-green';
              } else if (card.isCorrect && !wasSelected) {
                statusText = '⚠️ Missed Required Feature';
                badgeColor = 'badge-amber';
              } else if (!card.isCorrect && wasSelected) {
                statusText = '❌ Incorrectly Included (Banned Item)';
                badgeColor = 'badge-rose';
              } else {
                statusText = '🛡️ Correctly Rejected from Sprint';
                badgeColor = 'badge-blue';
              }

              return (
                <div
                  key={card.id}
                  style={{
                    padding: '0.85rem',
                    backgroundColor: '#090d16',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <strong>{card.title}</strong>
                    <span className={`badge ${badgeColor}`}>{statusText}</span>
                  </div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)' }}>
                    <strong>Rationale:</strong> {card.reason}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
