'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface GitQuestion {
  id: number;
  question: string;
  scenario: string;
  commandSnippet?: string;
  options: {
    label: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const ALL_GIT_QUESTIONS: GitQuestion[] = [
  {
    id: 1,
    question: 'How do you safely synchronize local commits with a remote branch that has new commits from teammates?',
    scenario: 'You are working on `feat/auth`. A teammate merged commits to `origin/feat/auth`. You have 2 local unpushed commits.',
    options: [
      {
        label: 'A',
        text: 'git pull --rebase origin feat/auth',
        isCorrect: true,
        explanation: 'Correct! `git pull --rebase` fetches the upstream commits and replays your local unpushed commits on top, creating a clean linear Git history without redundant merge commits.',
      },
      {
        label: 'B',
        text: 'git push --force origin feat/auth',
        isCorrect: false,
        explanation: 'Dangerous! Force-pushing will overwrite and destroy your teammate’s remote commits on the server.',
      },
      {
        label: 'C',
        text: 'git reset --hard origin/main',
        isCorrect: false,
        explanation: 'Incorrect! This will discard all your local work and uncommitted changes, switching your state to main.',
      },
      {
        label: 'D',
        text: 'git checkout -b new-branch',
        isCorrect: false,
        explanation: 'Incorrect! This only creates a new branch locally from your current HEAD; it does not pull or synchronize remote commits.',
      },
    ],
  },
  {
    id: 2,
    question: 'Which command creates a new feature branch and immediately switches to it?',
    scenario: 'You need to start work on a new user notification ticket `feat/notifications`.',
    options: [
      {
        label: 'A',
        text: 'git branch feat/notifications',
        isCorrect: false,
        explanation: 'Incomplete: `git branch <name>` only creates the branch but leaves you on your current branch.',
      },
      {
        label: 'B',
        text: 'git checkout -b feat/notifications (or git switch -c feat/notifications)',
        isCorrect: true,
        explanation: 'Correct! Both `git checkout -b` and the modern `git switch -c` create the new branch and immediately switch your working directory to it.',
      },
      {
        label: 'C',
        text: 'git merge feat/notifications',
        isCorrect: false,
        explanation: 'Incorrect! Merging combines another branch into the current one; it does not create a new branch.',
      },
      {
        label: 'D',
        text: 'git fetch origin feat/notifications',
        isCorrect: false,
        explanation: 'Incorrect! Fetch downloads refs and objects from the remote repository; it cannot create a new local branch from scratch.',
      },
    ],
  },
  {
    id: 3,
    question: 'You made temporary uncommitted changes, but need to urgently pull and fix a production hotfix. How do you save your work without committing?',
    scenario: 'Your working directory has half-finished edits in 4 files that are not ready for a commit.',
    options: [
      {
        label: 'A',
        text: 'git stash push -m "wip: unfinished work"',
        isCorrect: true,
        explanation: 'Correct! `git stash` safely records the modified tracked files to a temporary stack and reverts your working tree to match HEAD. You can restore it later with `git stash pop`.',
      },
      {
        label: 'B',
        text: 'git clean -fd',
        isCorrect: false,
        explanation: 'Destructive! `git clean -fd` permanently deletes all untracked files and directories from your workspace.',
      },
      {
        label: 'C',
        text: 'git commit -m "temp" --no-verify && git push --force',
        isCorrect: false,
        explanation: 'Bad practice! Pushing broken temporary code with bypassed pre-commit hooks pollutes the remote repository and breaks CI/CD builds.',
      },
      {
        label: 'D',
        text: 'git revert HEAD',
        isCorrect: false,
        explanation: 'Incorrect! `git revert` is used to create a new commit that undoes an existing committed commit; it does not stash uncommitted working tree changes.',
      },
    ],
  },
  {
    id: 4,
    question: 'What is the correct way to tag a production release version with an annotated message?',
    scenario: 'The team has verified all tests on `main` and is deploying version `v1.0.0` to production.',
    options: [
      {
        label: 'A',
        text: 'git tag -a v1.0.0 -m "Release v1.0.0: Initial production release" && git push origin v1.0.0',
        isCorrect: true,
        explanation: 'Correct! Annotated tags (`-a`) store metadata (tagger name, email, date, message, GPG signature) and pushing with `git push origin <tag>` publishes it to GitHub/remote for release tracking.',
      },
      {
        label: 'B',
        text: 'git commit -m "tag v1.0.0"',
        isCorrect: false,
        explanation: 'Incorrect! This creates a regular commit, not an immutable release Git tag ref.',
      },
      {
        label: 'C',
        text: 'git branch release/v1.0.0',
        isCorrect: false,
        explanation: 'Incorrect! A branch is a mutable pointer that moves with future commits, whereas a release tag must point permanently to a specific commit snapshot.',
      },
      {
        label: 'D',
        text: 'git rebase -i HEAD~1',
        isCorrect: false,
        explanation: 'Incorrect! Interactive rebase is for rewriting local commit history, not for tagging production releases.',
      },
    ],
  },
  {
    id: 5,
    question: 'You committed your code with a typo in the commit message before pushing. How do you fix it without creating a new commit?',
    scenario: 'You just ran `git commit -m "fix: typoo in login"` and have not pushed to remote yet.',
    options: [
      {
        label: 'A',
        text: 'git commit --amend -m "fix: typo in login"',
        isCorrect: true,
        explanation: 'Correct! `git commit --amend` updates the most recent commit message or adds staged changes to it directly, replacing the faulty commit.',
      },
      {
        label: 'B',
        text: 'git push origin main --delete',
        isCorrect: false,
        explanation: 'Dangerous! This deletes the remote main branch on GitHub.',
      },
      {
        label: 'C',
        text: 'git revert HEAD',
        isCorrect: false,
        explanation: 'Redundant! Revert creates an inverse commit, adding clutter to the Git history when you simply wanted to fix the text.',
      },
      {
        label: 'D',
        text: 'git restore --staged .',
        isCorrect: false,
        explanation: 'Ineffective! Restoring staged files only unstages changes for the next commit; it does not modify the already committed HEAD commit.',
      },
    ],
  },
  {
    id: 6,
    question: 'What is the primary difference between `git merge` and `git rebase` when incorporating upstream changes?',
    scenario: 'Your feature branch has diverged from `main` by 3 commits.',
    options: [
      {
        label: 'A',
        text: 'Merge preserves exact historical branching with a merge commit; rebase rewrites commits linearly on top of main',
        isCorrect: true,
        explanation: 'Correct! Merge creates a non-destructive diamond/join commit preserving timestamps, while rebase rewrites the commit hashes to place your changes sequentially at the tip of the target branch.',
      },
      {
        label: 'B',
        text: 'Rebase deletes your commits, while merge uploads them to the server',
        isCorrect: false,
        explanation: 'False! Rebase does not delete your commits; it replays them on top of the target base commit.',
      },
      {
        label: 'C',
        text: 'Merge is only used for GitHub Pull Requests, while rebase is only used locally for deleting files',
        isCorrect: false,
        explanation: 'False! Both are standard Git commands usable locally or in CI/CD pipeline automation.',
      },
      {
        label: 'D',
        text: 'There is no difference; they are exact aliases',
        isCorrect: false,
        explanation: 'False! They produce fundamentally different repository graphs and commit hash trees.',
      },
    ],
  },
  {
    id: 7,
    question: 'How do you discard all uncommitted changes in tracked files and restore them to the last commit?',
    scenario: 'You experimented with a refactoring that broke multiple modules and want to return to a clean working state.',
    options: [
      {
        label: 'A',
        text: 'git restore . (or git checkout -- . in older Git)',
        isCorrect: true,
        explanation: 'Correct! `git restore .` discards all uncommitted modifications in tracked working tree files, returning them cleanly to HEAD.',
      },
      {
        label: 'B',
        text: 'git branch -D main',
        isCorrect: false,
        explanation: 'Catastrophic! Force-deletes your local main branch.',
      },
      {
        label: 'C',
        text: 'git push --set-upstream origin',
        isCorrect: false,
        explanation: 'Irrelevant: This configures the default remote tracking branch for pushes.',
      },
      {
        label: 'D',
        text: 'git log -p',
        isCorrect: false,
        explanation: 'Irrelevant: This only displays the commit log and patch diffs.',
      },
    ],
  },
  {
    id: 8,
    question: 'How do you view a graphical, compact one-line log of branch history and commit merges?',
    scenario: 'You want to quickly understand the merge topology of your team repository from the terminal.',
    options: [
      {
        label: 'A',
        text: 'git log --oneline --graph --decorate --all',
        isCorrect: true,
        explanation: 'Correct! This canonical command renders an ASCII graph visualization showing all branch pointers, tags, and merge joins in a concise single-line format.',
      },
      {
        label: 'B',
        text: 'git status -s',
        isCorrect: false,
        explanation: 'Incorrect! `git status -s` displays short status of modified/untracked files in the current working directory, not commit history.',
      },
      {
        label: 'C',
        text: 'git diff HEAD~5',
        isCorrect: false,
        explanation: 'Incorrect! This shows the raw code diff between current HEAD and 5 commits ago, not the commit graph.',
      },
      {
        label: 'D',
        text: 'git remote show origin',
        isCorrect: false,
        explanation: 'Incorrect! This displays information about remote URLs and tracked branches.',
      },
    ],
  },
  {
    id: 9,
    question: 'A specific commit on `develop` contains a critical bugfix that you need immediately on your `release` branch. How do you apply only that single commit?',
    scenario: 'Commit `a1b2c3d` has the bugfix. You do NOT want to merge the other 20 unverified commits on `develop`.',
    options: [
      {
        label: 'A',
        text: 'git cherry-pick a1b2c3d',
        isCorrect: true,
        explanation: 'Correct! `git cherry-pick <commit-hash>` applies the exact changes introduced by that single commit onto your current HEAD branch without merging unrelated changes.',
      },
      {
        label: 'B',
        text: 'git merge develop --squash',
        isCorrect: false,
        explanation: 'Incorrect! Squash merge combines ALL 20 commits into one; it does not isolate only the single bugfix commit.',
      },
      {
        label: 'C',
        text: 'git clone develop',
        isCorrect: false,
        explanation: 'Invalid command! `git clone` clones an entire repository from a URL or directory, not a branch.',
      },
      {
        label: 'D',
        text: 'git commit -C a1b2c3d',
        isCorrect: false,
        explanation: 'Incomplete: `-C` reuses commit message metadata but does not copy the file patch changes onto your branch.',
      },
    ],
  },
  {
    id: 10,
    question: 'You accidentally staged a confidential `.env` file containing database passwords. How do you unstage it before committing?',
    scenario: 'You ran `git add .` and `git status` shows `.env` in &quot;Changes to be committed&quot;.',
    options: [
      {
        label: 'A',
        text: 'git restore --staged .env (and ensure .env is added to .gitignore)',
        isCorrect: true,
        explanation: 'Correct! `git restore --staged <file>` removes the file from the index (staging area) without deleting the local file, allowing you to add it to `.gitignore` so secrets are never pushed.',
      },
      {
        label: 'B',
        text: 'git rm -rf /',
        isCorrect: false,
        explanation: 'Catastrophic! Deletes your system files.',
      },
      {
        label: 'C',
        text: 'git push --tags',
        isCorrect: false,
        explanation: 'Irrelevant: This pushes tags to the remote repository and does nothing to unstage files.',
      },
      {
        label: 'D',
        text: 'git commit -m "ignore env" && git push',
        isCorrect: false,
        explanation: 'Fatal mistake! This commits the secret into the Git history permanently. Even if deleted in the next commit, Git history retains the credential.',
      },
    ],
  },
];

export default function GitKnowledgePage() {
  const [selectedQuestions, setSelectedQuestions] = useState<GitQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Helper to randomly pick 5 questions from the 10 available
  const pickRandomQuestions = () => {
    const shuffled = [...ALL_GIT_QUESTIONS].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 5));
    setUserAnswers({});
    setSubmitted(false);
  };

  useEffect(() => {
    pickRandomQuestions();
  }, []);

  const handleSelectOption = (questionId: number, label: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: label }));
  };

  const calculateScore = () => {
    let score = 0;
    selectedQuestions.forEach((q) => {
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (userAnswers[q.id] === correctOpt?.label) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="container">
      {/* Header and Reset Button */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              &larr; Prototypes
            </Link>
            <span style={{ color: 'var(--border-color)' }}>/</span>
            <span className="badge badge-amber">Prototype 2</span>
            <span className="badge badge-blue">Role: Software Developer</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Git Mastery & Workflow Competency Simulator</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            5 randomized scenarios from our 10-question bank covering branching, rebasing, stashing, tagging, and safety invariants.
          </p>
        </div>

        <button onClick={pickRandomQuestions} className="btn btn-secondary">
          🔄 Reset & Re-roll 5 Questions
        </button>
      </div>

      {/* Progress & Submit Bar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🐙</span>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>CURRENT ROUND</div>
            <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
              {Object.keys(userAnswers).length} of {selectedQuestions.length} answered
            </strong>
          </div>
        </div>

        <div>
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(userAnswers).length === 0}
              className="btn btn-primary"
            >
              Submit Git Assessment 🚀
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                Score: {calculateScore()} / {selectedQuestions.length}
              </div>
              <button onClick={pickRandomQuestions} className="btn btn-secondary">
                Next 5 Questions 🔄
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {selectedQuestions.map((q, idx) => {
          const selectedLabel = userAnswers[q.id];
          const correctOption = q.options.find((o) => o.isCorrect);
          const isUserCorrect = submitted && selectedLabel === correctOption?.label;

          return (
            <div
              key={q.id}
              className="card"
              style={{
                borderLeft: submitted
                  ? `4px solid ${isUserCorrect ? 'var(--accent-green)' : 'var(--accent-rose)'}`
                  : '4px solid var(--accent-primary)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-blue">Question {idx + 1} of {selectedQuestions.length}</span>
                {submitted && (
                  <span className={`badge ${isUserCorrect ? 'badge-green' : 'badge-rose'}`}>
                    {isUserCorrect ? 'CORRECT' : 'INCORRECT'}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                {q.question}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic' }}>
                Scenario: {q.scenario}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {q.options.map((opt) => {
                  const isSelected = selectedLabel === opt.label;
                  let optBorder = 'var(--border-color)';
                  let optBg = '#090d16';

                  if (isSelected && !submitted) {
                    optBorder = 'var(--accent-primary)';
                    optBg = 'rgba(56, 189, 248, 0.1)';
                  } else if (submitted) {
                    if (opt.isCorrect) {
                      optBorder = 'var(--accent-green)';
                      optBg = 'rgba(74, 222, 128, 0.1)';
                    } else if (isSelected && !opt.isCorrect) {
                      optBorder = 'var(--accent-rose)';
                      optBg = 'rgba(244, 63, 94, 0.1)';
                    }
                  }

                  return (
                    <div
                      key={opt.label}
                      onClick={() => handleSelectOption(q.id, opt.label)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        border: `1px solid ${optBorder}`,
                        backgroundColor: optBg,
                        cursor: submitted ? 'default' : 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                          }}
                        >
                          {opt.label}
                        </span>
                        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>
                          {opt.text}
                        </code>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Comprehensive Explanations after submission */}
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
                      Correct Answer: Option {correctOption?.label}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                    {q.options.map((opt) => (
                      <div key={opt.label} style={{ color: opt.isCorrect ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        <span style={{ fontWeight: 700, color: opt.isCorrect ? 'var(--accent-green)' : 'var(--accent-rose)' }}>
                          Option {opt.label}:
                        </span>{' '}
                        {opt.explanation}
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
  );
}
