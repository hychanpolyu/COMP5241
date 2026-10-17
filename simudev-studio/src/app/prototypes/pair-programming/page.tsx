'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PairProgrammingPage() {
  const [userCode, setUserCode] = useState(
`// Live Coding Exercise: Implement a safe bank withdrawal function
function withdraw(account, amount) {
  // TODO: Add balance check and concurrency lock
  account.balance -= amount;
  return account.balance;
}`
  );

  const [mentorState, setMentorState] = useState<{
    status: 'observing' | 'typing' | 'hint';
    message: string;
    hintLevel: number;
  }>({
    status: 'observing',
    message: "I'm watching your code live. I won't write it for you, but I'll guide you if you hit an architectural or security pitfall.",
    hintLevel: 1,
  });

  const analyzeCode = () => {
    setMentorState({ status: 'typing', message: 'Analyzing syntax, edge cases, and safety invariants...', hintLevel: mentorState.hintLevel });

    setTimeout(() => {
      if (userCode.includes('account.balance < amount') || userCode.includes('amount > account.balance')) {
        setMentorState({
          status: 'hint',
          message: "Great job checking for overdraft! Next, think about what happens if two async withdrawal requests arrive simultaneously for the same account. How would you prevent a race condition?",
          hintLevel: 2,
        });
      } else if (!userCode.includes('if')) {
        setMentorState({
          status: 'hint',
          message: "💡 Hint: Notice what happens if amount is greater than account.balance or if amount is negative. A safe software engineering pattern always guards inputs first before mutating state.",
          hintLevel: 1,
        });
      } else {
        setMentorState({
          status: 'hint',
          message: "Good progress! Make sure to also check whether the `amount` input is positive to avoid deposit exploits via negative withdrawal.",
          hintLevel: 1,
        });
      }
    }, 600);
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
            <span className="badge badge-blue">Prototype 4</span>
            <span className="badge badge-green">4D Fluency: Description</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Pair-Programming Sandbox with AI Mentor</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            A collaborative browser IDE where the AI acts as an attentive senior mentor rather than an autocomplete bot.
          </p>
        </div>

        <button onClick={analyzeCode} className="btn btn-primary">
          Ask Mentor for Review 🧠
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }}>
        {/* Editor Area */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Interactive Editor</h3>
            <span className="badge badge-amber">JavaScript</span>
          </div>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            rows={14}
            style={{
              width: '100%',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              backgroundColor: '#090d16',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1rem',
              color: 'var(--accent-primary)',
              resize: 'vertical',
            }}
          />
        </div>

        {/* AI Mentor Observer Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                }}
              >
                🦉
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Senior Mentor AI</h3>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                  Live Observer Mode
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#090d16',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
              }}
            >
              {mentorState.message}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.05)',
              border: '1px dashed var(--accent-primary)',
              borderRadius: '8px',
              padding: '0.75rem',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
            }}
          >
            <strong>Pedagogical Goal:</strong> Unlike tools that auto-generate code and bypass learning, this mentor prompts critical thinking about concurrency, boundary safety, and data flow.
          </div>
        </div>
      </div>
    </div>
  );
}
