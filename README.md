# COMP5241 - GenAI-Powered Software Engineering Learning Platform
## Project Brainstorming & Requirements Analysis

*Course: COMP5241 - Software Engineering (PolyU Master)*
*Topic: GenAI-Powered Interactive Learning Platform for Software Development & AI Fluency*

---

## 1. Project Requirements & Context Analysis

### 1.1 Background & Strategic Vision
The rapid evolution of Generative AI has fundamentally reshaped software development:
- **Democratization of Coding:** Coding is transitioning from a specialist syntax-memorization task into a commodity. Non-CS majors can rapidly turn ideas into functional software without mastering syntax and frameworks first.
- **Paradigm Shift for CS Graduates:** High-value skills are moving up the abstraction stack: **problem framing, requirement elicitation, system architecture, prompt engineering, agent orchestration, and rigorous output evaluation/verification**.
- **The Core Goal:** Build a **GenAI-powered learning platform** featuring interactive mini-courses and activities that make learning software engineering engaging, personalized, and effective for both non-CS learners and CS graduates.

### 1.2 Core Platform Capabilities
1. **Interactive Formats:**
   - Multi-modal learning contents: Text, visual architecture diagrams, AI-narrated animations/slides.
   - Interactive simulations (e.g., architectural failure modes, CI/CD pipelines, Git collaboration).
   - Interactive role-playing and mock interviews (e.g., client requirement elicitation, architecture reviews).
   - Gamification & mini-games (e.g., bug-hunting challenges, prompt debugging puzzles).
   - Live online coding & sandboxes.
2. **Personalization & Dual-Audience Adaptation:**
   - **Non-CS Majors:** Accessible, conceptual, product-driven; focusing on how to frame ideas and direct AI agents to build functional apps.
   - **CS Students:** Deep technical rigor; focusing on system design, verification, agentic workflows, testing, and clean architecture.
3. **Instructor Authoring & AI Studio:**
   - AI-assisted creation and manual customization of mini-courses, quizzes, and simulation scenarios.
   - Ability to import student rosters and track progress/analytics.
4. **On-Demand Universal Course Generator:**
   - Enables learners and instructors to input any topic/domain (within or outside SE) and dynamically generate a structured, interactive micro-course.
5. **The 4D AI Fluency Framework:**
   - **Delegation:** Deciding what tasks to assign to AI vs. what to handle humanly.
   - **Description:** Crafting clear, constrained, and process-aware specifications.
   - **Discernment:** Critically assessing AI reasoning, hallucination, edge cases, and code smells.
   - **Diligence:** Thoroughly testing, verifying, documenting, and taking accountability for outcomes.
6. **Project Scope & Team Collaboration:**
   - Team of 4 members with clear division of features.
   - Multiple iterative prototypes leading to one unified, robust, deployed application (e.g., on Vercel).

---

## 2. Project Proposal 1: "AgentCraft SE"
### *The Agentic Software Engineering Flight Simulator*

### 2.1 Concept Overview
**AgentCraft SE** is an interactive, GenAI-driven learning platform designed as a "flight simulator" for modern software engineers and product builders. Instead of traditional static coding exercises, AgentCraft SE places learners in the cockpit of modern agentic workflows where they orchestrate AI coding agents, conduct PR reviews, interrogate AI hallucinations, and negotiate client requirements.

- **Primary Persona A (Non-CS Innovator):** Learns how to turn a business concept into clear user stories, prompt AI agents to produce prototypes, and identify functional gaps.
- **Primary Persona B (CS Graduate):** Learns multi-agent orchestration, test-driven validation (TDD with AI), security auditing of generated code, and scalable architecture design.

### 2.2 Prototypes for Project 1

#### Prototype 1: "Hallucination Hunter & 4D Fluency Sandbox" (Simulation & Gamified Challenge)
- **Format:** Interactive Bug-Hunting & Code Review Game.
- **Core Focus:** *Discernment* and *Diligence* in the 4D Fluency framework.
- **User Experience:**
  - The system presents a realistic software scenario (e.g., an e-commerce payment webhook or an async data pipeline).
  - An AI coding agent generates an implementation that is seemingly working but contains subtle issues (e.g., concurrency race condition, missing input sanitization, subtle logic inversion, or API hallucination).
  - The learner acts as the Senior Reviewer / Tech Lead. They must:
    1. Highlight suspicious lines and explain the flaw.
    2. Write or adjust automated unit/integration tests to expose the defect.
    3. Issue a refined prompt (practicing *Description*) to guide the AI agent to produce a safe patch.
  - A real-time sandbox executes the tests, grades the learner on bug discovery rate, and provides AI-narrated explanations of the underlying engineering concepts.

#### Prototype 2: "Virtual Client Interview & PRD-to-Architecture Arena" (Role-Play & Mock Interview)
- **Format:** Conversational Voice/Text Role-Play with Dynamic AI Personas.
- **Core Focus:** *Problem Framing*, *Delegation*, and *Requirements Engineering*.
- **User Experience:**
  - The learner is tasked with gathering requirements for a new feature.
  - They conduct an interactive interview with an AI persona (e.g., an anxious clinic director wanting an appointment booking app, or a non-technical marketing lead).
  - The AI persona responds dynamically, demonstrating realistic stakeholder behaviors (vague expectations, conflicting priorities, technical misconceptions).
  - As the interview concludes, the platform's evaluator analyzes the learner's questioning strategy (clarity, completeness, empathy, constraint identification).
  - The tool transforms the session into a structured Product Requirement Document (PRD) and architecture specification, demonstrating how clear requirements drive successful AI agent delegation.

#### Prototype 3: "Dual-Track Generative Course Studio" (Instructor & Learner Authoring Engine)
- **Format:** Multimodal Generative Curriculum & Interactive Widget Generator.
- **Core Focus:** *Adaptive Learning* and *Personalized Self-Learning Paths*.
- **User Experience:**
  - **Instructor Mode:** An instructor uploads a lecture slide, markdown syllabus, or prompt topic (e.g., "Microservices Saga Pattern" or "Prompt Injection Defense"). The AI automatically generates a complete 3-stage mini-course containing:
    1. An interactive visual concept card (Mermaid.js diagram + audio narration).
    2. A dynamic multiple-choice / scenario diagnosis quiz.
    3. An interactive coding or prompt-crafting exercise.
  - **Learner Mode:** The learner selects their profile ("Non-CS Beginner" vs. "CS Senior"). The content dynamically shifts analogies and depth (e.g., explaining Git branches using a tree/timeline metaphor for non-CS vs. DAG commit hashes and rebase semantics for CS).

---

## 3. Project Proposal 2: "SimuDev Studio"
### *Virtual Agile Software House & Interactive Architecture Sandbox*

### 3.1 Concept Overview
**SimuDev Studio** turns software engineering education into an interactive, simulated workplace. Learners join a simulated tech startup called "PolyTech Labs" where they collaborate with synthetic team members (AI Product Manager, AI Senior Architect, AI QA Tester) across simulated sprint cycles. The platform emphasizes the socio-technical reality of modern engineering: writing code is only 20% of the job; the other 80% is coordination, testing, architecture choices, and code governance.

- **Primary Persona A (Non-CS Aspiring PM/Founder):** Learns how agile sprints work, how to manage sprint backlogs, and how technical debt impacts product timelines.
- **Primary Persona B (CS Graduate / Software Engineer):** Learns system design trade-offs, CI/CD pipeline diagnosis, merge conflict resolution, and architectural stress-testing.

### 3.2 Prototypes for Project 2: Role-Playing Software Engineering Lab

SimuDev Studio immerses students in three pivotal software engineering roles, simulating the full development lifecycle from business requirement analysis to developer version control and tech lead code review:

#### Prototype 1: "Functional Design & Requirement Scope Filter" (Role: Business Analyst / System Analyst)
- **Format:** Interactive Requirement Card Sorting & Drag-and-Drop Filter.
- **Core Focus:** *Problem Framing* and *Description* in the 4D Fluency framework.
- **User Experience:**
  - **Meeting Conclusion Brief:** Learners review stakeholder meeting minutes containing client feature requests alongside Business Analyst (BA) and System Analyst (SA) directives (approved vs. banned items).
  - **Interactive 2-Box Organizer:** Left box displays 10 candidate action cards. The learner drags/selects valid cards into the right box (Sprint Scope).
  - **Evaluation & Rationale:** 5 cards are valid architectural features (SSO auth, roster CSV import, analytics, deadline alerts, interactive sandbox), while 5 are dangerous anti-patterns or scope creep (plaintext passwords, raw client SQL execution, crypto payment gateways, rate-limit bypassing, unauthorized scraping).
  - Submitting gives an immediate score and exhaustive explanations for why each card was included or banned.

#### Prototype 2: "Git Mastery & Workflow Competency Simulator" (Role: Software Developer)
- **Format:** Randomized Technical Assessment with Interactive Explanations.
- **Core Focus:** *Diligence* and *Developer Version Control Invariants*.
- **User Experience:**
  - **10-Question Knowledge Pool:** Covers `git pull --rebase`, `checkout -b`, `git stash`, annotated release tagging (`git tag -a`), `commit --amend`, merge vs. rebase graph topology, `git restore`, `log --graph`, `cherry-pick`, and un-staging sensitive `.env` files (`restore --staged`).
  - **5 Randomized Questions Per Round:** Each attempt selects 5 scenarios randomly.
  - **Top-Right Reset Button:** Allows users to re-roll and practice a fresh set of questions at any time.
  - **Deep Feedback Engine:** Explains not only why the correct option succeeds, but specifically why each wrong option fails or causes repository disasters.

#### Prototype 3: "PR Code Review & Approval Gate (Kanban Integrated)" (Role: Senior Engineer / Tech Lead)
- **Format:** Interactive Code Diff Review & Dynamic Sprint Kanban Simulation.
- **Core Focus:** *Discernment* and *Delegation* (evaluating code safety, API hygiene, and AI hallucinations).
- **User Experience:**
  - **10-Scenario Code Diff Bank:** Features real production code snippets including hardcoded API secret leaks, SQL injection, async `Promise.allSettled` batching, infinite `useEffect` loops, silent error swallowing, Zod schema validation, student PII leaks, Redis TTL cache-aside, disabled TypeScript/ESLint checks, and DB connection leaks.
  - **4 Randomized PRs Per Round:** Each round tests 4 real-world Pull Requests.
  - **Multiple-Choice Architectural Verdicts:** Users select Yes/No decisions with technical reasoning (e.g., *"NO: Reject PR because the secret API token is hardcoded in source code"*).
  - **Exhaustive Rationale:** Explains the underlying architectural rule and why alternative choices are flawed.
  - **Dynamic Sprint Kanban Board:** Reviewing PRs directly updates the Sprint Kanban board (`UNDER PR REVIEW` -> `CHANGES REQUESTED` / `APPROVED & MERGED`), providing complete role-play immersion.
  - **Top-Right Reset Button:** Re-rolls 4 new PRs and resets review state.

---

### 3.3 Running the SimuDev Studio Prototype Codebase

The prototype implementation is housed in the `simudev-studio/` subdirectory:

```bash
# Navigate to the project directory
cd simudev-studio

# Install dependencies
npm install

# Run automated test suites (Vitest + React Testing Library)
npm test

# Run development server
npm run dev

# Build for production deployment
npm run build
```

---

## 4. Comparison & Strategic Alignment with COMP5241 Rubric

| Criteria | AgentCraft SE (Proposal 1) | SimuDev Studio (Proposal 2) |
| :--- | :--- | :--- |
| **Primary Theme** | AI Coding Flight Simulator (Agent Orchestration & Verification) | Virtual Agile Tech Startup & Architecture Sandbox |
| **Core Novelty** | Training the developer to be a discerning AI orchestrator | Simulating full socio-technical team lifecycle & live system incidents |
| **Interactive Formats** | • Bug-hunting game<br>• Stakeholder audio/text interview<br>• Adaptive interactive slides/quizzes | • Multi-agent PR review thread<br>• Drag-and-drop architecture war room<br>• RPG-style quest progression |
| **AI Fluency (4D)** | Strongest on **Discernment** & **Diligence** (testing AI code, catching hallucinations) | Strongest on **Delegation** & **Description** (PR workflows, managing AI team roles) |
| **Target Flexibility** | Clear dual-track for Non-CS (Product Builder) vs. CS (Agentic Architect) | Cross-functional roles (Product Manager, DevOps, QA, Lead Engineer) |
| **Universal Course Engine** | Upload slides/notes -> Generate interactive mini-course | Prompt any domain -> Generate RPG-style micro-quest skill tree |

---

## 5. Recommended 4-Member Team Work Breakdown

To ensure each of the 4 team members has an equal, substantial, and clearly demonstrable technical contribution:

| Member | Primary Focus Area | Key Deliverables & Modules |
| :--- | :--- | :--- |
| **Member 1 (Lead Frontend & UI/UX)** | Interactive Learning Experience & Canvas | Web application frontend (Next.js/React), interactive diagram/simulation canvas (React Flow / Canvas), code diff & PR review UI, responsive design. |
| **Member 2 (LLM Engine & Agentic Workflows)** | GenAI Pipeline & Role-Play Agent Orchestration | Multi-agent prompts, streaming LLM completions, persona simulation backend, evaluation and automated scoring rubrics, 4D Fluency metrics. |
| **Member 3 (Course Studio & Universal Generator)** | Course Authoring & Adaptive Content Engine | Instructor course generation pipeline, document parser (PDF/Slides/MD to structured syllabus), dual-track personalization engine, database persistence. |
| **Member 4 (Code Execution & Sandbox Backend)** | Execution Sandbox, Testing & Analytics | Web code runner/sandbox (WebContainers / Pyodide / isolated container execution), automated test runner, student progress analytics, authentication & deployment. |

---

## 6. Next Steps & Development Roadmap
1. **Week 3-4 (Validation & Team Consensus):** Select one of the two project directions (or hybridize high-impact elements from both).
2. **Week 5-7 (Prototype Iteration):** Develop the 3 prototype modules independently to test user engagement, LLM prompt latency, and interactive feasibility.
3. **Week 8-9 (Project Discussion Meeting):** Present prototype findings, division of work, and user feedback during the course review.
4. **Week 10-11 (Integration & Public Deployment):** Integrate prototypes into a unified web application deployed on Vercel/Render, and record demo video.
5. **Week 12-13 (Final Presentation & Reflection):** Deliver presentation showcasing 4D AI Fluency reflections, live demo, and development journey.
