'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface QuestNode {
  id: number;
  title: string;
  domain: string;
  xp: number;
  completed: boolean;
  concept: string;
  exercise: string;
}

export default function CodeVenturePage() {
  const [domainInput, setDomainInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [activeDomain, setActiveDomain] = useState('Distributed Systems');
  const [quests, setQuests] = useState<QuestNode[]>([
    {
      id: 1,
      title: 'The Gatekeeper of Concurrency',
      domain: 'Distributed Systems',
      xp: 150,
      completed: true,
      concept: 'Race Conditions and Mutex Locks in multi-threaded services.',
      exercise: 'Fix the shared balance ledger using an atomic compare-and-swap (CAS) operation.',
    },
    {
      id: 2,
      title: 'Labyrinth of Eventual Consistency',
      domain: 'Distributed Systems',
      xp: 250,
      completed: false,
      concept: 'Vector clocks and idempotency keys in event-driven message buses.',
      exercise: 'Ensure consumer queues process duplicate payment event IDs idempotently.',
    },
    {
      id: 3,
      title: 'Tower of Distributed Consensus (Raft)',
      domain: 'Distributed Systems',
      xp: 500,
      completed: false,
      concept: 'Leader election and log replication across quorum nodes.',
      exercise: 'Implement heartbeat timeout logic to trigger a candidate leader election.',
    },
  ]);

  const [selectedQuest, setSelectedQuest] = useState<QuestNode>(quests[1]);

  const handleGenerateDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    setGenerating(true);
    const domain = domainInput.trim();

    setTimeout(() => {
      const newQuests: QuestNode[] = [
        {
          id: 1,
          title: `Novice Trials: Fundamentals of ${domain}`,
          domain,
          xp: 100,
          completed: false,
          concept: `Core architectural patterns and baseline constraints in ${domain}.`,
          exercise: `Prompt an AI assistant to generate a boilerplate pipeline for ${domain} and verify its type safety.`,
        },
        {
          id: 2,
          title: `Adept Ascent: Security & Edge Cases in ${domain}`,
          domain,
          xp: 250,
          completed: false,
          concept: `Defensive programming, error handling, and latency optimizations in ${domain}.`,
          exercise: `Identify 3 potential failure modes in an AI-generated ${domain} handler.`,
        },
        {
          id: 3,
          title: `Mastery Dungeon: Production Resilience in ${domain}`,
          domain,
          xp: 500,
          completed: false,
          concept: `Monitoring, regression test suites, and scaling strategies for ${domain}.`,
          exercise: `Design an end-to-end automated test harness for ${domain} components.`,
        },
      ];

      setActiveDomain(domain);
      setQuests(newQuests);
      setSelectedQuest(newQuests[0]);
      setGenerating(false);
      setDomainInput('');
    }, 800);
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
            <span className="badge badge-green">Prototype 3</span>
            <span className="badge badge-blue">Universal Domain Generator</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>CodeVenture: Universal Gamified Micro-Quest Generator</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            RPG-style skill trees with procedural mini-quests generated on-demand for any domain.
          </p>
        </div>
      </div>

      {/* Universal Domain Generator Bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <form onSubmit={handleGenerateDomain} style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            placeholder="Type any subject or engineering topic (e.g. Smart Contracts, Game Physics, Bio-Python, LLM Agents)..."
            style={{ flex: 1, fontSize: '0.9rem' }}
          />
          <button type="submit" disabled={generating} className="btn btn-primary">
            {generating ? 'Generating Quest Tree...' : 'Generate On-Demand Quest Tree'}
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Quest Progression Tree */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              Skill Tree &bull; <span style={{ color: 'var(--accent-primary)' }}>{activeDomain}</span>
            </h3>
            <span className="badge badge-amber">Level 3 Adventurer</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {quests.map((q, idx) => (
              <div
                key={q.id}
                onClick={() => setSelectedQuest(q)}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: `2px solid ${
                    selectedQuest.id === q.id ? 'var(--accent-primary)' : 'var(--border-color)'
                  }`,
                  backgroundColor: selectedQuest.id === q.id ? '#1e293b' : '#090d16',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{q.completed ? '🏆' : '⚔️'}</span>
                    <strong style={{ fontSize: '0.95rem' }}>Stage {idx + 1}: {q.title}</strong>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{q.concept}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-amber">+{q.xp} XP</span>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.4rem', color: q.completed ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                    {q.completed ? 'COMPLETED' : 'IN PROGRESS'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Quest Details */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Active Quest Challenge</h3>
            <span className="badge badge-blue">Interactive Mission</span>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {selectedQuest.title}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {selectedQuest.concept}
            </p>
          </div>

          <div className="card" style={{ backgroundColor: '#090d16', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: 600, marginBottom: '0.25rem' }}>
              MISSION OBJECTIVE:
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              {selectedQuest.exercise}
            </p>
          </div>

          <button
            onClick={() => {
              setQuests((prev) =>
                prev.map((q) => (q.id === selectedQuest.id ? { ...q, completed: true } : q))
              );
              setSelectedQuest({ ...selectedQuest, completed: true });
            }}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {selectedQuest.completed ? 'Quest Already Conquered! ⚔️' : 'Complete Quest & Claim XP'}
          </button>
        </div>
      </div>
    </div>
  );
}
