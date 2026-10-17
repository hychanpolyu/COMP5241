'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function WarRoomPage() {
  const [trafficLoad, setTrafficLoad] = useState<'normal' | 'surge' | 'ddos'>('normal');
  const [redisAlive, setRedisAlive] = useState(true);
  const [dbReplication, setDbReplication] = useState(false);
  const [incidentResolved, setIncidentResolved] = useState(false);

  // Compute simulated metrics
  const getMetrics = () => {
    let latency = 45;
    let errorRate = 0.01;
    let rps = 1200;

    if (trafficLoad === 'surge') {
      rps = 9500;
      latency += redisAlive ? 80 : 350;
      errorRate += redisAlive ? 0.02 : 0.15;
    } else if (trafficLoad === 'ddos') {
      rps = 24000;
      latency += redisAlive ? 220 : 850;
      errorRate += redisAlive ? 0.08 : 0.42;
    }

    if (!redisAlive) {
      latency += 180;
      errorRate += 0.09;
    }

    if (dbReplication) {
      latency = Math.max(30, latency - 90);
      errorRate = Math.max(0.01, errorRate - 0.12);
    }

    return { latency, errorRate: (errorRate * 100).toFixed(1), rps };
  };

  const metrics = getMetrics();
  const isHealthy = parseFloat(metrics.errorRate) < 5.0 && metrics.latency < 200;

  return (
    <div className="container">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              &larr; Prototypes
            </Link>
            <span style={{ color: 'var(--border-color)' }}>/</span>
            <span className="badge badge-amber">Prototype 2</span>
            <span className="badge badge-rose">Architecture & Incident Response</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>System Architecture & Incident War Room</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Stress-test distributed topologies, inject chaotic failures, and triage outages with AI Incident Commander.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setTrafficLoad(trafficLoad === 'normal' ? 'surge' : 'normal')}
            className="btn btn-secondary"
            style={{ borderColor: trafficLoad === 'surge' ? 'var(--accent-rose)' : 'var(--border-color)' }}
          >
            {trafficLoad === 'surge' ? '⚠️ End Traffic Spike' : '⚡ Simulate Traffic Surge (10k RPS)'}
          </button>
          <button
            onClick={() => setRedisAlive(!redisAlive)}
            className="btn btn-secondary"
            style={{ borderColor: !redisAlive ? 'var(--accent-rose)' : 'var(--border-color)' }}
          >
            {redisAlive ? '💥 Kill Redis Cache' : '🔄 Restart Redis Cache'}
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          textAlign: 'center',
          borderColor: isHealthy ? 'var(--accent-green)' : 'var(--accent-rose)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SYSTEM HEALTH</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isHealthy ? 'var(--accent-green)' : 'var(--accent-rose)', marginTop: '0.25rem' }}>
            {isHealthy ? 'HEALTHY (99.9%)' : 'DEGRADED / OUTAGE'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>P99 LATENCY</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: metrics.latency > 250 ? 'var(--accent-rose)' : 'var(--text-primary)', marginTop: '0.25rem' }}>
            {metrics.latency} ms
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ERROR RATE</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: parseFloat(metrics.errorRate) > 5 ? 'var(--accent-rose)' : 'var(--accent-green)', marginTop: '0.25rem' }}>
            {metrics.errorRate}%
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>INGRESS TRAFFIC</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>
            {metrics.rps.toLocaleString()} RPS
          </div>
        </div>
      </div>

      {/* Interactive Topology Visualizer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Active System Topology</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Live status of your microservices network. Click architecture components to toggle resilience features.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.85rem', backgroundColor: '#090d16', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Client Gateway & Cloudflare CDN</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DDoS Shield & SSL Termination</div>
              </div>
              <span className="badge badge-green">Operational</span>
            </div>

            <div style={{ padding: '0.85rem', backgroundColor: '#090d16', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Kong API Gateway & Load Balancer</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Round-robin proxy to backend clusters</div>
              </div>
              <span className="badge badge-green">Healthy</span>
            </div>

            <div
              style={{
                padding: '0.85rem',
                backgroundColor: '#090d16',
                borderRadius: '8px',
                border: `1px solid ${redisAlive ? 'var(--border-color)' : 'var(--accent-rose)'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>Redis Distributed Cache (L2)</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Session storage & query cache</div>
              </div>
              <span className={`badge ${redisAlive ? 'badge-green' : 'badge-rose'}`}>
                {redisAlive ? 'Hit Rate 88%' : 'OFFLINE / CONNECTION TIMEOUT'}
              </span>
            </div>

            <div
              style={{
                padding: '0.85rem',
                backgroundColor: '#090d16',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>PostgreSQL Primary DB</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {dbReplication ? 'Read Replicas Active (3 nodes)' : 'Single Node (Risk of write starvation)'}
                </div>
              </div>
              <button
                onClick={() => setDbReplication(!dbReplication)}
                className={`btn ${dbReplication ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
              >
                {dbReplication ? 'Disable Read Replicas' : 'Enable Read Replicas'}
              </button>
            </div>
          </div>
        </div>

        {/* AI Incident Commander */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🚨</span>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>AI Incident Commander</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automated Root-Cause Diagnosis</p>
            </div>
          </div>

          {!isHealthy ? (
            <div style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--accent-rose)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--accent-rose)', display: 'block', marginBottom: '0.5rem' }}>
                SEV-1 INCIDENT DETECTED
              </strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {!redisAlive
                  ? 'Root cause: Redis Cache went down during high load, leading to a cache stampede. All queries are cascading directly to PostgreSQL Primary.'
                  : 'High concurrency traffic surge is saturating connection pools.'}
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <strong>Recommended Actions:</strong>
                <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem' }}>
                  {!redisAlive && <li>Restart Redis Cache cluster or enable fallback memory cache.</li>}
                  {!dbReplication && <li>Enable PostgreSQL Read Replicas to offload SELECT queries.</li>}
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '1px solid var(--accent-green)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--accent-green)', display: 'block', marginBottom: '0.5rem' }}>
                ALL SYSTEMS NOMINAL
              </strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                System is resilient to current load. Latency SLA (&lt;200ms) and availability are meeting production standards.
              </p>
            </div>
          )}

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>
              Engineering Learning Takeaway
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              In real-world software engineering, writing code is only a fraction of the challenge. Understanding failure modes, cascading timeouts, and replication allows engineers to build resilient cloud architectures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
