'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PuzzleRoomsPage() {
  const [tokenBudget, setTokenBudget] = useState(40);
  const [promptText, setPromptText] = useState('');
  const [roomSolved, setRoomSolved] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const bugSnippet = `// Broken Regex: Intended to match PolyU Master student emails ending in @connect.polyu.hk
const emailRegex = /^[a-zA-Z0-9]+@.*$/;

// Test Cases:
// "26123456g@connect.polyu.hk" -> MUST PASS
// "hacker@evil.com" -> MUST FAIL (Currently passes due to wild card .*!)`;

  const handleTestPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    // Check token budget: approximate 1 word = 1 token
    const words = promptText.trim().split(/\s+/).length;
    if (words > tokenBudget) {
      setFeedback(`❌ Budget exceeded! Your prompt used ${words} tokens, but you only have ${tokenBudget} tokens remaining in this room.`);
      return;
    }

    // Evaluate prompt quality (Discernment & Description)
    const lower = promptText.toLowerCase();
    const hasConstraint = lower.includes('connect.polyu.hk') || lower.includes('domain');
    const hasEscape = lower.includes('escape') || lower.includes('\\.') || lower.includes('exact');

    if (hasConstraint && hasEscape) {
      setRoomSolved(true);
      setTokenBudget(tokenBudget - words);
      setFeedback('🎉 Room Solved! Your prompt precisely specified both domain constraint and regex escaping without wasting tokens.');
    } else if (hasConstraint) {
      setFeedback('⚠️ Partial Success: The AI fixed the domain, but forgot to escape dots in regex. Test still vulnerable to "connectXpolyuYhk" matching! Refine your prompt.');
    } else {
      setFeedback('❌ Failed: Prompt was too vague. The AI generated a generic email regex that did not enforce PolyU domain restrictions.');
    }
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
            <span className="badge badge-amber">Prototype 5</span>
            <span className="badge badge-rose">4D Fluency: Description & Discernment</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>AI Prompt Engineering Puzzle Rooms</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Escape-room style coding challenges where you repair broken software using a limited prompt token budget.
          </p>
        </div>

        <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🪙</span>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOKEN BUDGET</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-amber)' }}>{tokenBudget} tokens</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Left: Problem Room & Broken Code */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Room 1: The Wildcard Leak</h3>
            <span className="badge badge-rose">Security Flaw</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            The regex below has an overly permissive wildcard allowing external emails to authenticate as university students.
          </p>

          <pre className="code-block" style={{ color: '#38bdf8', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
            {bugSnippet}
          </pre>

          {roomSolved && (
            <div style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '1px solid var(--accent-green)', padding: '0.85rem', borderRadius: '8px', color: 'var(--accent-green)', fontSize: '0.9rem' }}>
              <strong>AI Solution Generated:</strong>
              <div style={{ fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                const emailRegex = /^[a-zA-Z0-9._%+-]+@connect\.polyu\.hk$/;
              </div>
            </div>
          )}
        </div>

        {/* Right: Prompt Crafting Console */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Prompt Terminal</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Write a concise prompt instructing the AI agent how to repair the regex. Be explicit with constraints to save tokens!
          </p>

          <form onSubmit={handleTestPrompt}>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="e.g.: Fix regex to strictly match domain @connect.polyu.hk with escaped dots and standard alphanumeric prefix..."
              rows={4}
              style={{ width: '100%', marginBottom: '0.75rem', fontSize: '0.85rem' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Word count: {promptText.trim() ? promptText.trim().split(/\s+/).length : 0} tokens
              </span>
              <button type="submit" disabled={roomSolved} className="btn btn-primary">
                {roomSolved ? 'Room Clear! 🔓' : 'Execute Prompt Directive'}
              </button>
            </div>
          </form>

          {feedback && (
            <div
              style={{
                padding: '0.85rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                backgroundColor: roomSolved ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                border: `1px solid ${roomSolved ? 'var(--accent-green)' : 'var(--accent-amber)'}`,
                color: 'var(--text-primary)',
              }}
            >
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
