'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PRQuestion {
  id: number;
  prNumber: number;
  title: string;
  author: string;
  branch: string;
  codeSnippet: string;
  explanation: string;
  options: {
    label: string;
    decision: 'Approve' | 'Reject';
    text: string;
    isCorrect: boolean;
    reason: string;
  }[];
}

const ALL_PR_QUESTIONS: PRQuestion[] = [
  {
    id: 1,
    prNumber: 101,
    title: 'Add third-party weather API integration',
    author: 'alex-junior-dev',
    branch: 'feat/weather-widget',
    codeSnippet: `// src/services/weatherService.ts
export async function getLiveWeather(city: string) {
  // Hardcoded production API key for OpenWeather
  const API_KEY = "sk_live_994829103847192847192847";
  const url = \`https://api.weather.com/v1?city=\${city}&token=\${API_KEY}\`;
  const res = await fetch(url);
  return res.json();
}`,
    explanation: 'Production API keys must never be committed to source control or exposed in frontend client bundles. They must be stored in server-side environment variables (`process.env.WEATHER_API_KEY`).',
    options: [
      {
        label: 'A',
        decision: 'Reject',
        text: 'NO: Reject PR because the secret API token is hardcoded in source code, causing a credential leak.',
        isCorrect: true,
        reason: 'Correct! Hardcoded API keys in source control can be indexed by bots, cloned by unauthorized parties, and leaked into client bundles.',
      },
      {
        label: 'B',
        decision: 'Approve',
        text: 'YES: Approve PR because fetch() is standard in modern JavaScript and the URL interpolation is valid.',
        isCorrect: false,
        reason: 'Dangerous! Functional syntax does not excuse a severe security credential exposure.',
      },
      {
        label: 'C',
        decision: 'Reject',
        text: 'NO: Reject PR because weather services must only be implemented in Python, not TypeScript.',
        isCorrect: false,
        reason: 'False! TypeScript is fully capable of fetching REST APIs; the language choice is not a defect.',
      },
      {
        label: 'D',
        decision: 'Approve',
        text: 'YES: Approve PR because Alex can delete the commit later after deploying to production.',
        isCorrect: false,
        reason: 'Fatal misconception! Git history is immutable and commits pushed to remote repositories preserve leaked secrets forever until rotated.',
      },
    ],
  },
  {
    id: 2,
    prNumber: 102,
    title: 'User login database query',
    author: 'sam-backend',
    branch: 'fix/auth-query',
    codeSnippet: `// src/controllers/authController.ts
export async function loginUser(req, res) {
  const { email, password } = req.body;
  // Direct string concatenation into SQL query
  const query = \`SELECT * FROM users WHERE email = '\${email}' AND password = '\${password}'\`;
  const user = await db.rawQuery(query);
  return res.json(user);
}`,
    explanation: 'Direct string concatenation in SQL queries allows catastrophic SQL Injection (e.g. entering "\' OR \'1\'=\'1"). Must use parameterized queries or an ORM.',
    options: [
      {
        label: 'A',
        decision: 'Reject',
        text: 'NO: Reject PR due to severe SQL Injection vulnerability and plaintext password matching.',
        isCorrect: true,
        reason: 'Correct! Unsanitized string interpolation in SQL queries allows attackers to bypass authentication entirely or drop tables.',
      },
      {
        label: 'B',
        decision: 'Approve',
        text: 'YES: Approve PR because raw SQL queries run faster than ORMs and solve the issue quickly.',
        isCorrect: false,
        reason: 'Irresponsible! Speed must never come at the expense of total database compromise.',
      },
      {
        label: 'C',
        decision: 'Reject',
        text: 'NO: Reject PR because variable names must be in snake_case, not camelCase.',
        isCorrect: false,
        reason: 'Trivial! While naming conventions matter, naming style is not the critical reason this PR fails.',
      },
      {
        label: 'D',
        decision: 'Approve',
        text: 'YES: Approve PR because the query is inside a POST route which encrypts the SQL statement.',
        isCorrect: false,
        reason: 'Factually wrong! HTTP POST payloads do not sanitize SQL syntax inside backend handlers.',
      },
    ],
  },
  {
    id: 3,
    prNumber: 103,
    title: 'Parallel async processing for student grade notifications',
    author: 'clara-dev',
    branch: 'perf/async-grades',
    codeSnippet: `// src/services/notificationService.ts
export async function notifyStudents(studentIds: string[]) {
  // Efficient parallel dispatch with Promise.allSettled
  const promises = studentIds.map(id => sendEmailNotification(id));
  const results = await Promise.allSettled(promises);
  const failures = results.filter(r => r.status === 'rejected');
  if (failures.length > 0) {
    logger.warn(\`Failed to send \${failures.length} notifications\`);
  }
  return results;
}`,
    explanation: 'Clean, idiomatic async code. Using `Promise.allSettled` ensures that one failed notification does not crash the entire batch, and errors are safely logged.',
    options: [
      {
        label: 'A',
        decision: 'Approve',
        text: 'YES: Approve PR because Promise.allSettled handles concurrency gracefully without dropping uncaught rejections.',
        isCorrect: true,
        reason: 'Correct! This is a resilient implementation that prevents single-point failure across bulk email dispatches.',
      },
      {
        label: 'B',
        decision: 'Reject',
        text: 'NO: Reject PR because async/await cannot be used with promises in TypeScript.',
        isCorrect: false,
        reason: 'False! `await Promise.allSettled` is a standard, first-class asynchronous pattern in TypeScript.',
      },
      {
        label: 'C',
        decision: 'Reject',
        text: 'NO: Reject PR because student emails must be sent using a synchronous for-loop with sleep(1000).',
        isCorrect: false,
        reason: 'Antipattern! Synchronous sleeping blocks the single-threaded Node.js event loop, freezing the entire server.',
      },
      {
        label: 'D',
        decision: 'Reject',
        text: 'NO: Reject PR because logger.warn() is deprecated in web standards.',
        isCorrect: false,
        reason: 'False! Structured logging with `logger.warn` or Winston/Pino is standard industry practice.',
      },
    ],
  },
  {
    id: 4,
    prNumber: 104,
    title: 'Infinite polling loop in React state hook',
    author: 'jordan-frontend',
    branch: 'feat/live-sync',
    codeSnippet: `// src/components/DashboardWidget.tsx
export function DashboardWidget() {
  const [data, setData] = useState(null);

  // Missing dependency array in useEffect
  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(json => setData(json));
  });

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}`,
    explanation: 'Calling `setData` inside `useEffect` without a dependency array triggers a continuous re-render loop on every frame, generating thousands of API calls and crashing browser and backend.',
    options: [
      {
        label: 'A',
        decision: 'Reject',
        text: 'NO: Reject PR because useEffect lacks a dependency array, triggering an infinite fetch re-render loop.',
        isCorrect: true,
        reason: 'Correct! Without `[]`, every `setData` triggers a component re-render, which immediately invokes `useEffect` again in an infinite loop.',
      },
      {
        label: 'B',
        decision: 'Approve',
        text: 'YES: Approve PR because React automatically pauses useEffect when network requests are pending.',
        isCorrect: false,
        reason: 'Factually wrong! React does not throttle or pause unconstrained `useEffect` hooks.',
      },
      {
        label: 'C',
        decision: 'Approve',
        text: 'YES: Approve PR because JSON.stringify is the most performant rendering method in React 19.',
        isCorrect: false,
        reason: 'Irrelevant and incorrect! The critical defect is the uncontrolled infinite network loop.',
      },
      {
        label: 'D',
        decision: 'Reject',
        text: 'NO: Reject PR because React components must never use useState.',
        isCorrect: false,
        reason: 'Absurd! `useState` is the fundamental state management hook in React.',
      },
    ],
  },
  {
    id: 5,
    prNumber: 105,
    title: 'Silent catch block swallowing database connection failures',
    author: 'taylor-backend',
    branch: 'fix/db-wrapper',
    codeSnippet: `// src/db/client.ts
export async function executeTransaction(callback: Function) {
  try {
    return await callback();
  } catch (err) {
    // Silently suppress error so app doesn't crash
    return null;
  }
}`,
    explanation: 'Swallowing errors silently with an empty catch block masks severe data corruption, deadlocks, and connection drops, making debugging in production impossible.',
    options: [
      {
        label: 'A',
        decision: 'Reject',
        text: 'NO: Reject PR because swallowing exceptions silently masks transaction failures and corrupts data integrity.',
        isCorrect: true,
        reason: 'Correct! Transactions must either rollback and rethrow or log structured diagnostics. Returning null hides catastrophic DB outages.',
      },
      {
        label: 'B',
        decision: 'Approve',
        text: 'YES: Approve PR because production apps should never crash or show error logs to users.',
        isCorrect: false,
        reason: 'Misleading! Graceful degradation does not mean hiding database failure states from engineering logs.',
      },
      {
        label: 'C',
        decision: 'Approve',
        text: 'YES: Approve PR because `try/catch` is faster when the catch block is empty.',
        isCorrect: false,
        reason: 'Nonsense! Micro-benchmarking empty catch blocks is meaningless when system correctness is compromised.',
      },
      {
        label: 'D',
        decision: 'Reject',
        text: 'NO: Reject PR because callbacks are illegal in modern TypeScript.',
        isCorrect: false,
        reason: 'False! Passing higher-order functions or transaction callbacks is a standard design pattern in Prisma/TypeORM.',
      },
    ],
  },
  {
    id: 6,
    prNumber: 106,
    title: 'Input validation using Zod schema for course creation',
    author: 'nina-fullstack',
    branch: 'feat/course-schema',
    codeSnippet: `// src/schemas/courseSchema.ts
import { z } from 'zod';

export const CourseCreateSchema = z.object({
  title: z.string().min(5).max(100),
  credits: z.number().int().positive().max(6),
  syllabus: z.string().min(20),
  instructorEmail: z.string().email(),
});

export type CourseCreateInput = z.infer<typeof CourseCreateSchema>;`,
    explanation: 'Exemplary defensive engineering. Enforces strict type boundaries, email validation, integer credit limits, and generates synchronized TypeScript types.',
    options: [
      {
        label: 'A',
        decision: 'Approve',
        text: 'YES: Approve PR because Zod schema guarantees runtime validation with synchronized TypeScript types.',
        isCorrect: true,
        reason: 'Correct! Validating request inputs before business logic is the gold standard of secure API design.',
      },
      {
        label: 'B',
        decision: 'Reject',
        text: 'NO: Reject PR because input validation should only happen on the client browser, not on the server.',
        isCorrect: false,
        reason: 'Dangerous! Client-side validation is trivial to bypass with Postman/cURL. Server-side validation is mandatory.',
      },
      {
        label: 'C',
        decision: 'Reject',
        text: 'NO: Reject PR because credits should allow negative numbers for course drops.',
        isCorrect: false,
        reason: 'Illogical! Course credit hours can never be negative.',
      },
      {
        label: 'D',
        decision: 'Reject',
        text: 'NO: Reject PR because TypeScript does not support library schemas.',
        isCorrect: false,
        reason: 'False! Zod is one of the most widely adopted TypeScript runtime validation libraries.',
      },
    ],
  },
  {
    id: 7,
    prNumber: 107,
    title: 'Sensitive student records exported via unprotected GET route',
    author: 'chris-junior',
    branch: 'feat/export-csv',
    codeSnippet: `// src/app/api/export-students/route.ts
export async function GET(req: Request) {
  // Publicly exposed without authentication or role verification!
  const allStudents = await prisma.student.findMany({
    include: { gpa: true, nationalId: true, homeAddress: true }
  });
  return Response.json(allStudents);
}`,
    explanation: 'Severe privacy and legal violation (GDPR/FERPA). Confidential PII (GPA, national ID, home address) is exposed to the public internet without an auth guard.',
    options: [
      {
        label: 'A',
        decision: 'Reject',
        text: 'NO: Reject PR due to critical PII exposure and lack of session authentication/RBAC middleware.',
        isCorrect: true,
        reason: 'Correct! Endpoints returning student PII must enforce strict role-based access control (Admin/Registrar only).',
      },
      {
        label: 'B',
        decision: 'Approve',
        text: 'YES: Approve PR because GET requests cannot modify database records.',
        isCorrect: false,
        reason: 'Irrelevant! Read-only leaks of sensitive personal information are severe security and legal disasters.',
      },
      {
        label: 'C',
        decision: 'Approve',
        text: 'YES: Approve PR because Prisma automatically hides nationalId from JSON.',
        isCorrect: false,
        reason: 'False! Prisma returns all queried fields included in the selection unless explicitly omitted.',
      },
      {
        label: 'D',
        decision: 'Reject',
        text: 'NO: Reject PR because CSV exports should only return XML format.',
        isCorrect: false,
        reason: 'Nonsensical! Output format preference does not address the catastrophic data breach.',
      },
    ],
  },
  {
    id: 8,
    prNumber: 108,
    title: 'Cache-Aside pattern implementation using Redis TTL',
    author: 'maya-backend',
    branch: 'perf/cache-aside',
    codeSnippet: `// src/services/courseCache.ts
export async function getCourseWithCache(courseId: string) {
  const cacheKey = \`course:\${courseId}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (course) {
    // Store with 300 second (5 min) expiration to prevent stale cache
    await redis.set(cacheKey, JSON.stringify(course), 'EX', 300);
  }
  return course;
}`,
    explanation: 'Standard cache-aside implementation with Time-To-Live (TTL) to avoid permanent cache inconsistency and offload primary database reads.',
    options: [
      {
        label: 'A',
        decision: 'Approve',
        text: 'YES: Approve PR because it correctly implements the Cache-Aside pattern with a safe 300s TTL.',
        isCorrect: true,
        reason: 'Correct! This offloads database read load while mitigating stale data via explicit TTL expiration.',
      },
      {
        label: 'B',
        decision: 'Reject',
        text: 'NO: Reject PR because caching should only be done by web browser cookies.',
        isCorrect: false,
        reason: 'False! Server-side caching using Redis is standard practice for high-throughput distributed systems.',
      },
      {
        label: 'C',
        decision: 'Reject',
        text: 'NO: Reject PR because redis.get is a synchronous blocking call.',
        isCorrect: false,
        reason: 'False! `await redis.get` is non-blocking and fully asynchronous in ioredis/node-redis.',
      },
      {
        label: 'D',
        decision: 'Reject',
        text: 'NO: Reject PR because JSON.parse is forbidden in Node.js backend services.',
        isCorrect: false,
        reason: 'False! `JSON.parse` is standard JavaScript runtime functionality.',
      },
    ],
  },
  {
    id: 9,
    prNumber: 109,
    title: 'Disabling ESLint and TypeScript checks in production build',
    author: 'liam-dev',
    branch: 'chore/fix-build',
    codeSnippet: `// next.config.mjs
const nextConfig = {
  typescript: {
    // Ignore type errors so the CI build doesn't fail
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning suppression
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;`,
    explanation: 'Suppressing build-time type checking and linting to "pass CI" hides syntax errors, undefined references, and security antipatterns from being caught.',
    options: [
      {
        label: 'A',
        decision: 'Reject',
        text: 'NO: Reject PR because suppressing TypeScript and ESLint build checks bypasses compile safety and invites runtime crashes.',
        isCorrect: true,
        reason: 'Correct! Disabling compiler safety checks in `next.config` allows broken code to slip undetected into production deployments.',
      },
      {
        label: 'B',
        decision: 'Approve',
        text: 'YES: Approve PR because shipping to production fast is more important than compiler warnings.',
        isCorrect: false,
        reason: 'Dangerous culture! Bypassing quality gates leads to high defect rates and frequent outages in production.',
      },
      {
        label: 'C',
        decision: 'Approve',
        text: 'YES: Approve PR because Next.js recommends setting ignoreBuildErrors to true in production.',
        isCorrect: false,
        reason: 'False! Next.js official documentation strictly advises against this except as a temporary debugging measure.',
      },
      {
        label: 'D',
        decision: 'Reject',
        text: 'NO: Reject PR because config files must be written in Rust.',
        isCorrect: false,
        reason: 'False! Next.js configuration is written in JavaScript (`.js`/`.mjs`) or TypeScript (`.ts`).',
      },
    ],
  },
  {
    id: 10,
    prNumber: 110,
    title: 'Database connection leak inside HTTP handler loop',
    author: 'derek-backend',
    branch: 'perf/bulk-users',
    codeSnippet: `// src/services/userService.ts
export async function insertBatchUsers(users: any[]) {
  for (const user of users) {
    // Creating a new connection pool client on every single iteration!
    const client = new pg.Client(process.env.DB_URL);
    await client.connect();
    await client.query("INSERT INTO users(name) VALUES($1)", [user.name]);
    // Notice: client.end() is omitted!
  }
}`,
    explanation: 'Instantiating a new database client per iteration and never closing it exhausts PostgreSQL server connection limits within seconds, causing a full outage.',
    options: [
      {
        label: 'A',
        decision: 'Reject',
        text: 'NO: Reject PR because creating unclosed DB clients per loop iteration causes immediate connection exhaustion.',
        isCorrect: true,
        reason: 'Correct! Database connections must use a shared connection pool (`pg.Pool`) or bulk insertion queries with proper release mechanics.',
      },
      {
        label: 'B',
        decision: 'Approve',
        text: 'YES: Approve PR because Postgres automatically terminates client connections after 1 millisecond.',
        isCorrect: false,
        reason: 'False! Postgres maintains open connections until idle timeout or connection limit is exceeded.',
      },
      {
        label: 'C',
        decision: 'Approve',
        text: 'YES: Approve PR because single queries in loops are the cleanest architectural pattern.',
        isCorrect: false,
        reason: 'Antipattern! N+1 queries in loops create extreme network latency overhead compared to batch inserts.',
      },
      {
        label: 'D',
        decision: 'Reject',
        text: 'NO: Reject PR because user.name must always be capitalized.',
        isCorrect: false,
        reason: 'Trivial! Capitalization has nothing to do with the severe database connection leak.',
      },
    ],
  },
];

export default function PRReviewPage() {
  const [selectedQuestions, setSelectedQuestions] = useState<PRQuestion[]>([]);
  const [userChoices, setUserChoices] = useState<Record<number, string>>({});
  const [prStatuses, setPrStatuses] = useState<Record<number, 'pending' | 'approved' | 'changes_requested'>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'reviews' | 'kanban'>('reviews');

  // Randomly pick 4 questions from the 10 available
  const resetAndPickQuestions = () => {
    const shuffled = [...ALL_PR_QUESTIONS].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, 4);
    setSelectedQuestions(picked);
    setUserChoices({});
    const initialStatus: Record<number, 'pending' | 'approved' | 'changes_requested'> = {};
    picked.forEach((q) => {
      initialStatus[q.id] = 'pending';
    });
    setPrStatuses(initialStatus);
    setSubmitted(false);
  };

  useEffect(() => {
    resetAndPickQuestions();
  }, []);

  const handleSelectChoice = (questionId: number, label: string) => {
    if (submitted) return;
    setUserChoices((prev) => ({ ...prev, [questionId]: label }));
  };

  const handleSubmitAllReviews = () => {
    const updatedStatus: Record<number, 'pending' | 'approved' | 'changes_requested'> = {};
    selectedQuestions.forEach((q) => {
      const chosenLabel = userChoices[q.id];
      const chosenOpt = q.options.find((o) => o.label === chosenLabel);
      if (chosenOpt?.decision === 'Approve') {
        updatedStatus[q.id] = 'approved';
      } else {
        updatedStatus[q.id] = 'changes_requested';
      }
    });
    setPrStatuses(updatedStatus);
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    selectedQuestions.forEach((q) => {
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (userChoices[q.id] === correctOpt?.label) {
        score++;
      }
    });
    return score;
  };

  // Kanban status partition
  const inReviewPRs = selectedQuestions.filter((q) => prStatuses[q.id] === 'pending');
  const changesRequestedPRs = selectedQuestions.filter((q) => prStatuses[q.id] === 'changes_requested');
  const approvedPRs = selectedQuestions.filter((q) => prStatuses[q.id] === 'approved');

  return (
    <div className="container">
      {/* Top Header & Reset Button */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              &larr; Prototypes
            </Link>
            <span style={{ color: 'var(--border-color)' }}>/</span>
            <span className="badge badge-rose">Prototype 3</span>
            <span className="badge badge-blue">Role: Senior Engineer / Tech Lead</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>PR Code Review & Approval Gate</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Evaluate real code diffs, identify security vulnerabilities and anti-patterns, and approve or reject Pull Requests with rigorous justifications.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setActiveTab(activeTab === 'reviews' ? 'kanban' : 'reviews')}
            className="btn btn-secondary"
          >
            {activeTab === 'reviews' ? '📊 View Sprint Kanban' : '📝 Back to PR Reviews'}
          </button>
          <button onClick={resetAndPickQuestions} className="btn btn-primary">
            🔄 Reset & Pick 4 New PRs
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {activeTab === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--accent-amber)' }}>UNDER PR REVIEW</h3>
              <span className="badge badge-amber">{inReviewPRs.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {inReviewPRs.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
                  All selected PRs have been reviewed!
                </div>
              ) : (
                inReviewPRs.map((q) => (
                  <div key={q.id} className="card" style={{ padding: '0.75rem', backgroundColor: '#090d16' }}>
                    <span className="badge badge-blue" style={{ marginBottom: '0.35rem' }}>PR #{q.prNumber}</span>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{q.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Author: {q.author}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--accent-rose)' }}>CHANGES REQUESTED</h3>
              <span className="badge badge-rose">{changesRequestedPRs.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {changesRequestedPRs.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
                  No PRs blocked.
                </div>
              ) : (
                changesRequestedPRs.map((q) => (
                  <div key={q.id} className="card" style={{ padding: '0.75rem', backgroundColor: '#090d16', borderColor: 'var(--accent-rose)' }}>
                    <span className="badge badge-rose" style={{ marginBottom: '0.35rem' }}>BLOCKED: PR #{q.prNumber}</span>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{q.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Returned to {q.author} for revision</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--accent-green)' }}>APPROVED & MERGED</h3>
              <span className="badge badge-green">{approvedPRs.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {approvedPRs.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem 0' }}>
                  No PRs merged yet.
                </div>
              ) : (
                approvedPRs.map((q) => (
                  <div key={q.id} className="card" style={{ padding: '0.75rem', backgroundColor: '#090d16', borderColor: 'var(--accent-green)' }}>
                    <span className="badge badge-green" style={{ marginBottom: '0.35rem' }}>MERGED: PR #{q.prNumber}</span>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{q.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Merged into main branch ✅</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        /* PR Review Workspace View */
        <div>
          {/* Progress Banner */}
          <div
            className="card"
            style={{
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#090d16',
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>TECH LEAD GATE</span>
              <div style={{ fontSize: '1rem', fontWeight: 700 }}>
                {Object.keys(userChoices).length} of {selectedQuestions.length} PR decisions submitted
              </div>
            </div>

            <div>
              {!submitted ? (
                <button
                  onClick={handleSubmitAllReviews}
                  disabled={Object.keys(userChoices).length === 0}
                  className="btn btn-primary"
                >
                  Submit All 4 PR Decisions 🛡️
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    Review Score: {calculateScore()} / {selectedQuestions.length}
                  </div>
                  <button onClick={resetAndPickQuestions} className="btn btn-secondary">
                    Review Next 4 PRs 🔄
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* PR Scenarios List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {selectedQuestions.map((q, idx) => {
              const userSelected = userChoices[q.id];
              const correctOpt = q.options.find((o) => o.isCorrect);
              const isCorrect = submitted && userSelected === correctOpt?.label;

              return (
                <div
                  key={q.id}
                  className="card"
                  style={{
                    borderLeft: submitted
                      ? `4px solid ${isCorrect ? 'var(--accent-green)' : 'var(--accent-rose)'}`
                      : '4px solid var(--accent-primary)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-blue">PR #{q.prNumber}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Branch: <code>{q.branch}</code> &bull; Author: @{q.author}
                      </span>
                    </div>

                    {submitted && (
                      <span className={`badge ${isCorrect ? 'badge-green' : 'badge-rose'}`}>
                        {isCorrect ? 'TECH LEAD DECISION CORRECT' : 'INCORRECT REVIEW DECISION'}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    {idx + 1}. {q.title}
                  </h3>

                  {/* Code Snippet Under Review */}
                  <div className="code-block" style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap', color: '#38bdf8' }}>
                    {q.codeSnippet}
                  </div>

                  {/* Multiple Choice Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {q.options.map((opt) => {
                      const isSelected = userSelected === opt.label;
                      let borderColor = 'var(--border-color)';
                      let bg = '#090d16';

                      if (isSelected && !submitted) {
                        borderColor = 'var(--accent-primary)';
                        bg = 'rgba(56, 189, 248, 0.1)';
                      } else if (submitted) {
                        if (opt.isCorrect) {
                          borderColor = 'var(--accent-green)';
                          bg = 'rgba(74, 222, 128, 0.1)';
                        } else if (isSelected && !opt.isCorrect) {
                          borderColor = 'var(--accent-rose)';
                          bg = 'rgba(244, 63, 94, 0.1)';
                        }
                      }

                      return (
                        <div
                          key={opt.label}
                          onClick={() => handleSelectChoice(q.id, opt.label)}
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '6px',
                            border: `1px solid ${borderColor}`,
                            backgroundColor: bg,
                            cursor: submitted ? 'default' : 'pointer',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <span
                              style={{
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                                color: isSelected ? '#0f172a' : 'var(--text-primary)',
                                flexShrink: 0,
                                marginTop: '0.1rem',
                              }}
                            >
                              {opt.label}
                            </span>
                            <div style={{ fontSize: '0.88rem', lineHeight: 1.4 }}>
                              <strong style={{ color: opt.decision === 'Approve' ? 'var(--accent-green)' : 'var(--accent-rose)', marginRight: '0.4rem' }}>
                                [{opt.decision.toUpperCase()}]
                              </strong>
                              {opt.text}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Analysis After Submission */}
                  {submitted && (
                    <div
                      style={{
                        marginTop: '1.25rem',
                        padding: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#090d16',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <div style={{ marginBottom: '0.75rem' }}>
                        <strong style={{ color: 'var(--accent-green)', fontSize: '0.9rem' }}>
                          Architectural Verdict: Option {correctOpt?.label} ({correctOpt?.decision})
                        </strong>
                        <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                          {q.explanation}
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem' }}>
                        {q.options.map((opt) => (
                          <div key={opt.label} style={{ color: opt.isCorrect ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                            <span style={{ fontWeight: 700, color: opt.isCorrect ? 'var(--accent-green)' : 'var(--accent-rose)' }}>
                              Option {opt.label}:
                            </span>{' '}
                            {opt.reason}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
