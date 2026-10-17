'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface TestCase {
  id: string;
  name: string;
  category: 'Unit' | 'Boundary' | 'Security' | 'AI Hallucination';
  code: string;
  status: 'pending' | 'passed' | 'failed';
  message?: string;
}

export default function TestingLabPage() {
  const defaultFunctionCode = `// Discount Calculation Engine under test
function calculateDiscount(price, role, coupon) {
  if (price < 0) return 0;
  let discount = 0;

  if (role === 'vip') {
    discount += 0.20; // 20% VIP discount
  } else if (role === 'member') {
    discount += 0.10; // 10% Member discount
  }

  if (coupon === 'POLYU2026') {
    discount += 0.15; // 15% coupon
  }

  // Cap maximum discount to 30%
  if (discount > 0.30) {
    discount = 0.30;
  }

  const finalPrice = price * (1 - discount);
  return Number(finalPrice.toFixed(2));
}`;

  const [code, setCode] = useState(defaultFunctionCode);
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 'tc-1',
      name: 'Standard VIP Discount Check',
      category: 'Unit',
      code: 'calculateDiscount(100, "vip", "") === 80.00',
      status: 'pending',
    },
    {
      id: 'tc-2',
      name: 'Combined VIP + Coupon Cap Enforcement (Max 30%)',
      category: 'Boundary',
      code: 'calculateDiscount(100, "vip", "POLYU2026") === 70.00',
      status: 'pending',
    },
    {
      id: 'tc-3',
      name: 'Negative Price Guard Rail',
      category: 'Security',
      code: 'calculateDiscount(-50, "regular", "") === 0',
      status: 'pending',
    },
  ]);

  const [aiGenerating, setAiGenerating] = useState(false);
  const [chaosInjected, setChaosInjected] = useState(false);
  const [testResults, setTestResults] = useState<{
    ran: boolean;
    passed: number;
    failed: number;
    diligenceScore: number;
  }>({
    ran: false,
    passed: 0,
    failed: 0,
    diligenceScore: 0,
  });

  // Run the test cases safely in-browser
  const runTests = () => {
    let passedCount = 0;
    let failedCount = 0;

    const updated = testCases.map((tc) => {
      try {
        // Execute the user's function code and evaluate the test expression
        const testRunner = new Function(`
          ${code}
          return (${tc.code});
        `);
        const result = testRunner();
        if (result === true) {
          passedCount++;
          return { ...tc, status: 'passed' as const, message: 'Assertion verified' };
        } else {
          failedCount++;
          return { ...tc, status: 'failed' as const, message: `Assertion failed: returned ${result}` };
        }
      } catch (err: unknown) {
        failedCount++;
        const errMsg = err instanceof Error ? err.message : String(err);
        return { ...tc, status: 'failed' as const, message: `Runtime error: ${errMsg}` };
      }
    });

    const total = updated.length;
    const score = total > 0 ? Math.round((passedCount / total) * 100) : 0;

    setTestCases(updated);
    setTestResults({
      ran: true,
      passed: passedCount,
      failed: failedCount,
      diligenceScore: score,
    });
  };

  // AI Test Generation Simulator (4D Fluency: Description & Diligence)
  const generateAiTests = () => {
    setAiGenerating(true);
    setTimeout(() => {
      const newTests: TestCase[] = [
        {
          id: 'tc-ai-1',
          name: 'Precision Rounding Defense: Floating Point Bug',
          category: 'AI Hallucination',
          code: 'calculateDiscount(19.99, "member", "POLYU2026") === 14.99',
          status: 'pending',
        },
        {
          id: 'tc-ai-2',
          name: 'Type Coercion & SQL/Injection Guard: Non-numeric price',
          category: 'Security',
          code: 'calculateDiscount(0, "regular", "") === 0',
          status: 'pending',
        },
        {
          id: 'tc-ai-3',
          name: 'Zero-Value Boundary: Free Item Discount',
          category: 'Boundary',
          code: 'calculateDiscount(0, "vip", "POLYU2026") === 0',
          status: 'pending',
        },
      ];

      setTestCases((prev) => [...prev, ...newTests]);
      setAiGenerating(false);
    }, 600);
  };

  // Chaos Bug Injector (Mutation Testing)
  const injectChaosBug = () => {
    if (!chaosInjected) {
      // Invert condition or remove cap to simulate AI bug
      const mutated = code.replace(
        'if (discount > 0.30) {\n    discount = 0.30;\n  }',
        '// [CHAOS MUTATION INJECTED]: Cap accidentally removed by hallucinated refactor!\n  // discount cap omitted'
      );
      setCode(mutated);
      setChaosInjected(true);
    } else {
      setCode(defaultFunctionCode);
      setChaosInjected(false);
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
            <span className="badge badge-rose">Testing Prototype</span>
            <span className="badge badge-blue">4D Fluency: Diligence & Discernment</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            AI Test Automation & TDD Arena
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Experience how AI coding agents support test-driven development, automated edge-case synthesis, and mutation testing.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={injectChaosBug}
            className="btn btn-secondary"
            style={{
              borderColor: chaosInjected ? 'var(--accent-rose)' : 'var(--border-color)',
              color: chaosInjected ? 'var(--accent-rose)' : 'var(--text-primary)',
            }}
          >
            {chaosInjected ? 'Reset Original Code' : 'Inject Chaos Bug (Mutation)'}
          </button>
          <button
            onClick={generateAiTests}
            disabled={aiGenerating}
            className="btn btn-secondary"
            style={{ borderColor: 'var(--accent-amber)', color: 'var(--accent-amber)' }}
          >
            {aiGenerating ? 'Synthesizing Edge Cases...' : '+ AI Agent Test Generator'}
          </button>
          <button onClick={runTests} className="btn btn-primary">
            Run Test Suite
          </button>
        </div>
      </div>

      {testResults.ran && (
        <div
          className="card"
          style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: testResults.failed > 0 ? 'rgba(244, 63, 94, 0.08)' : 'rgba(74, 222, 128, 0.08)',
            borderColor: testResults.failed > 0 ? 'var(--accent-rose)' : 'var(--accent-green)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Diligence Verification Score
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: testResults.failed > 0 ? 'var(--accent-rose)' : 'var(--accent-green)' }}>
              {testResults.diligenceScore}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Passed Tests</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-green)' }}>{testResults.passed}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Failed Tests</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-rose)' }}>{testResults.failed}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Test Suite</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{testCases.length}</div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Code Editor under Test */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Component Under Test</h3>
            <span className="badge badge-blue">JavaScript / ES6</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Edit the code below or trigger AI generation to see how tests guard against regressions.
          </p>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={16}
            style={{
              width: '100%',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              backgroundColor: '#090d16',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1rem',
              color: '#38bdf8',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Right Column: Dynamic Test Cases */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Automated Verification Suite</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{testCases.length} assertions</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {testCases.map((tc) => (
              <div
                key={tc.id}
                className="card"
                style={{
                  padding: '1rem',
                  borderLeft: `4px solid ${
                    tc.status === 'passed'
                      ? 'var(--accent-green)'
                      : tc.status === 'failed'
                      ? 'var(--accent-rose)'
                      : 'var(--border-color)'
                  }`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{tc.name}</span>
                  <span
                    className={`badge ${
                      tc.status === 'passed'
                        ? 'badge-green'
                        : tc.status === 'failed'
                        ? 'badge-rose'
                        : 'badge-amber'
                    }`}
                  >
                    {tc.status}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    backgroundColor: '#090d16',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.4rem',
                  }}
                >
                  assert({tc.code})
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Category: {tc.category}</span>
                  {tc.message && <span>{tc.message}</span>}
                </div>
              </div>
            ))}
          </div>

          <div
            className="card"
            style={{
              marginTop: '1.5rem',
              border: '1px dashed var(--accent-primary)',
              backgroundColor: 'rgba(56, 189, 248, 0.05)',
            }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>
              4D AI Fluency Reflection: Diligence
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              AI coding agents can generate lines of code in seconds, but without rigorous automated verification (unit tests, boundary fuzzing, and mutation tests), the team cannot take true accountability for the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
