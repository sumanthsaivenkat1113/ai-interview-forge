
# ✨ AI InterviewForge

> **An AI-powered mock interview preparation platform that helps candidates practice technical interviews, solve coding problems, receive AI-driven evaluations, and understand their interview performance.**

![AI InterviewForge Landing Page](/public/images//landing-page.png)

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-Semantic%20Tokens-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk&logoColor=white)](https://clerk.com)
[![Groq](https://img.shields.io/badge/LLM-Groq-FF6B6B?logo=groq&logoColor=white)](https://groq.com)
[![Online Compiler](https://img.shields.io/badge/Execution-OnlineCompiler.io-20B2AA?logo=code&logoColor=white)](https://onlinecompiler.io)
[![License](https://img.shields.io/badge/License-MIT-informational)](#license)

---

# 🚀 Overview

Traditional interview preparation often relies on static question lists and generic coding problems.

**AI InterviewForge** creates a more structured mock interview experience by generating questions based on the candidate's interview configuration.

The interview configuration can include:

```text
Target Role
       +
Target Company
       +
Years of Experience
       +
Resume (Full Mock Interview only)
       OR
Subject Name (Subject-wise Interviews)
```

This information is used to generate interview questions appropriate for the selected interview type.

---

# 🏗️ InterviewForge Workflow

```text
                    User Authentication
                            │
                            ▼
                 Select Interview Type
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼

        Full Mock       Theory Mock    Coding Mock
        Interview        Interview      Interview

             │              │              │
             ▼              ▼              ▼

        Resume Upload    Subject Name    Subject Name
             │
             ▼
      Resume Processing
             │
             ▼
      Candidate Profile
             │
             └──────────────┐
                            │
                            ▼
                  AI Question Generation
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼

          Theory        Theory Only    Coding Only
         + Coding

             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                  Conduct Mock Interview
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼

        Theory Interview             Coding Interview

         TTS + STT                    Code Editor
                                             │
                                             ▼
                                      Code Execution
                                             │
              └─────────────┬───────────────┘
                            │
                            ▼
                     AI Evaluation
                            │
                            ▼
                Interview Performance
                         Report
```

---

# ✨ Key Features

## 🎯 Personalized Interview Preparation

Interview questions are generated using relevant candidate information.

Depending on the interview type, this may include:

### Full Mock Interview

```text
Resume
Target Role
Target Company
Years of Experience
```

### Subject-wise Interviews

```text
Subject Name
Target Role
Target Company
Years of Experience
```

The platform uses this information to generate relevant theory or coding interview questions.

---

# 🎤 Interview Types

AI InterviewForge provides three different mock interview experiences.

---

## 🥇 1. Full Mock Interview

The **Full Mock Interview** provides a complete technical interview experience.

It contains:

* 🧠 Theory Interview
* 💻 Coding Interview

### Upload Details

The candidate provides:

```text
Workspace Name
Resume
Target Role
Target Company
Years of Experience
```

### Resume Support

The resume is available **only in the Full Mock Interview**.

```text
Resume PDF
     │
     ▼
PDF to Text Conversion
     │
     ▼
LLM Resume Parsing
     │
     ▼
Extract Candidate Information
     │
     ▼
Store Structured Resume Data
     │
     ▼
Generate Personalized Questions
```

The AI can extract information such as:

* Education
* Work Experience
* Projects
* Technical Skills
* Programming Languages
* Technologies
* Certifications
* Other relevant candidate information

### Full Mock Interview Flow

```text
Create Workspace
        │
        ▼
Upload Resume
        │
        ▼
Resume PDF → Text
        │
        ▼
AI Resume Analysis
        │
        ▼
Extract Candidate Profile
        │
        ▼
Generate Theory Questions
        +
Generate Coding Questions
        │
        ▼
Conduct Theory Interview
        +
Conduct Coding Interview
        │
        ▼
Evaluate Performance
        │
        ▼
Final Interview Report
```

---

## 🧠 2. Subject-wise Mock Theory Interview

The **Subject-wise Mock Theory Interview** focuses exclusively on theoretical and conceptual knowledge.

### Upload Details

The candidate provides:

```text
Workspace Name
Subject Name
Target Role
Target Company
Years of Experience
```

> ⚠️ **No resume is uploaded or processed in this interview type.**

### Interview Generation

The AI generates theory questions based on:

* Subject Name
* Target Role
* Target Company
* Years of Experience

### Example

```text
Subject: JavaScript
Role: Frontend Developer
Experience: 2 Years

        ↓

AI Theory Interview

1. Explain closures in JavaScript.
2. What is the difference between var, let, and const?
3. How does the JavaScript event loop work?
4. Explain promises and async/await.
5. What are React hooks?
```

### Theory Interview Flow

```text
Create Workspace
        │
        ▼
Provide Subject Details
        │
        ▼
AI Question Generation
        │
        ▼
Theory Interview
        │
        ▼
TTS Reads Question
        │
        ▼
Candidate Answers
        │
        ▼
STT Converts Speech to Text
        │
        ▼
Store Candidate Answer
        │
        ▼
AI Evaluation
        │
        ▼
Performance Results
```

---

## 💻 3. Subject-wise Mock Coding Interview

The **Subject-wise Mock Coding Interview** focuses exclusively on programming and problem-solving.

### Upload Details

The candidate provides:

```text
Workspace Name
Subject Name
Target Role
Target Company
Years of Experience
```

> ⚠️ **No resume is uploaded or processed in this interview type.**

### Interview Generation

The AI generates coding questions based on:

* Subject Name
* Target Role
* Target Company
* Years of Experience

### Example

```text
Subject: Data Structures and Algorithms
Role: Software Engineer
Experience: 1 Year

        ↓

AI Coding Interview

1. Two Sum
2. Valid Parentheses
3. Merge Intervals
4. Longest Substring Without Repeating Characters
```

### Coding Interview Flow

```text
Create Workspace
        │
        ▼
Provide Subject Details
        │
        ▼
Generate Coding Questions
        │
        ▼
Candidate Writes Code
        │
        ▼
Submit Solution
        │
        ▼
Execute Code
        │
        ▼
Run Test Cases
        │
        ▼
Store Results
        │
        ▼
AI Coding Evaluation
        │
        ▼
Performance Results
```

---

# 📄 Resume-Aware Interview Generation

Resume-based personalization exists **only for the Full Mock Interview**.

The resume processing pipeline:

```text
Resume PDF
    │
    ▼
Extract Text
    │
    ▼
LLM Resume Parsing
    │
    ▼
Structured Resume Data
    │
    ├───────────────┐
    ▼               ▼

Skills          Experience
    │               │
    ▼               ▼

Projects        Education
    │               │
    └───────┬───────┘
            ▼

Candidate Profile
            │
            ▼

Interview Question Generation
```

The extracted information is stored in the database and can be used to generate personalized interview questions.

### Important

```text
Full Mock Interview
        │
        ├── Resume Upload        ✅
        ├── Resume Processing    ✅
        ├── Theory Questions     ✅
        └── Coding Questions     ✅


Theory Mock Interview
        │
        ├── Resume Upload        ❌
        ├── Resume Processing    ❌
        └── Theory Questions     ✅


Coding Mock Interview
        │
        ├── Resume Upload        ❌
        ├── Resume Processing    ❌
        └── Coding Questions     ✅
```

---

# 🧠 AI Question Generation

The platform uses Large Language Models to generate interview questions.

The question generation process depends on the selected interview type.

---

## Full Mock Interview

Input:

```text
Resume
Target Role
Target Company
Years of Experience
```

Output:

```text
Theory Questions
+
Coding Questions
```

---

## Theory Mock Interview

Input:

```text
Subject Name
Target Role
Target Company
Years of Experience
```

Output:

```text
Theory Questions
```

---

## Coding Mock Interview

Input:

```text
Subject Name
Target Role
Target Company
Years of Experience
```

Output:

```text
Coding Questions
```

---

# 🎤 Theory Interview System

The theory interview provides a voice-based mock interview experience.

```text
AI Interview Question
        │
        ▼
Text-to-Speech
        │
        ▼
Candidate Listens
        │
        ▼
Candidate Speaks
        │
        ▼
Speech-to-Text
        │
        ▼
Convert Answer to Text
        │
        ▼
Store Candidate Answer
        │
        ▼
AI Evaluation
```

---

# 🔊 Text-to-Speech

Theory interview questions can be spoken using:

* Web Speech API
* Node Edge TTS

The AI-generated interview question is converted into speech and presented to the candidate.

---

# 🎙️ Speech-to-Text

The candidate's spoken answer is converted into text using:

```text
Whisper Large V3 Turbo
        │
        ▼
Groq Provider API
```

The converted response is stored and later used for performance evaluation.

---

# 💻 Coding Interview System

The coding interview allows candidates to solve programming problems.

```text
Coding Question
       │
       ▼
Candidate Reads Problem
       │
       ▼
Write Solution
       │
       ▼
Submit Code
       │
       ▼
Code Execution
       │
       ▼
Test Results
       │
       ▼
AI Coding Evaluation
```

---

# ⚙️ Code Execution

Code execution is handled using:

**OnlineCompiler.io API**

The execution system provides information that can be used during coding evaluation.

Possible evaluation data includes:

```text
Submitted Code
Programming Language
Execution Result
Test Cases Passed
Test Cases Failed
Expected Output
Actual Output
```

---

# 🧩 AI Answer Evaluation

The platform evaluates the candidate's interview performance after the interview is completed.

The evaluation is different for:

* Theory Interviews
* Coding Interviews

---

# 🧠 Theory Interview Evaluation

Each theory question and answer pair is evaluated independently.

The evaluation system uses four dimensions.

| Dimension | Weight |
| --------- | -----: |
| Accuracy  |    40% |
| Depth     |    25% |
| Clarity   |    20% |
| Relevance |    15% |

Each dimension receives an integer score from:

```text
0 → 10
```

---

## 🎯 Theory Evaluation Criteria

### Accuracy — 40%

Measures factual correctness.

```text
Correct technical concepts
Correct explanations
No significant factual errors
```

---

### Depth — 25%

Measures how deeply the candidate understands the topic.

```text
Important concepts explained
Relevant technical details included
Strong conceptual understanding demonstrated
```

---

### Clarity — 20%

Measures how clearly the candidate explains the answer.

```text
Well-structured explanation
Clear communication
Understandable reasoning
```

---

### Relevance — 15%

Measures whether the candidate directly answers the question.

```text
Focused response
Relevant explanation
No unnecessary information
```

---

# 📊 Theory Evaluation Rules

The AI evaluator follows these principles:

```text
✓ Evaluate each Q&A independently.

✓ Do not assume knowledge that was not demonstrated.

✓ Do not penalize minor grammar mistakes.

✓ Do not penalize minor English mistakes.

✓ Factually incorrect claims reduce accuracy.

✓ Empty answers receive very low scores.

✓ Irrelevant answers receive very low scores.

✓ "I don't know" responses receive very low scores.

✓ Do not invent missing concepts that are
  not relevant to the question.
```

---

# 📋 Theory Evaluation Output

```json
{
  "per_question": [
    {
      "qno": 1,
      "accuracy": 0,
      "depth": 0,
      "clarity": 0,
      "relevance": 0,
      "missing": ["string"]
    }
  ]
}
```

---

# 💻 Coding Interview Evaluation

Coding performance is evaluated based on:

* Submitted problem
* Candidate solution
* Expected solution
* Problem constraints
* Examples
* Execution results
* Test results

The AI evaluates the actual submitted code.

---

# 📊 Coding Evaluation Categories

Each category receives a score from **0 to 10**.

```text
1. Algorithm & Problem Solving
2. Code Correctness
3. Time Complexity
4. Space Complexity
5. Edge Case Handling
6. Test Case Performance
7. Code Quality
8. Efficiency / Optimization
```

---

# 🎯 Coding Evaluation Principles

The coding evaluator follows these rules:

```text
✓ Evaluate the actual submitted code.

✓ Accept valid alternative solutions.

✓ Do not require the expected algorithm if
  another correct and efficient solution exists.

✓ Use execution results as the primary evidence
  of correctness when available.

✓ Consider problem constraints when evaluating
  efficiency.

✓ Identify bugs.

✓ Identify failed test cases.

✓ Identify inefficient operations.

✓ Identify missed edge cases.

✓ Evaluate complexity.

✓ Evaluate code quality.

✓ Do not evaluate communication skills.

✓ Do not evaluate interview behavior.
```

---

# 📈 Coding Evaluation Output

```json
{
  "overall_score": 0,
  "classification": "Excellent | Good | Average | Needs Improvement | Poor",
  "summary": "",
  "questions": [
    {
      "qno": 1,
      "scores": {
        "algorithm_problem_solving": 0,
        "code_correctness": 0,
        "time_complexity": 0,
        "space_complexity": 0,
        "edge_cases": 0,
        "test_performance": 0,
        "code_quality": 0,
        "efficiency": 0
      },
      "technical_analysis": {
        "expected_time_complexity": "",
        "expected_space_complexity": "",
        "candidate_time_complexity": "",
        "candidate_space_complexity": "",
        "is_correct": true,
        "tests_passed": 0,
        "tests_failed": 0
      },
      "strengths": [],
      "improvements": [],
      "critical_issues": []
    }
  ]
}
```

---

# 📊 Interview Performance Results

After completing an interview, AI InterviewForge generates a performance report.

The report can include:

```text
Overall Performance
        │
        ├── Theory Performance
        │
        ├── Coding Performance
        │
        ├── Per-Question Analysis
        │
        ├── Accuracy
        │
        ├── Conceptual Depth
        │
        ├── Code Correctness
        │
        ├── Complexity Analysis
        │
        ├── Test Case Performance
        │
        ├── Strengths
        │
        ├── Areas for Improvement
        │
        └── Critical Issues
```

---

# 🧪 Supported Interview Modes

| Feature             | Full Mock Interview | Theory Mock Interview | Coding Mock Interview |
| ------------------- | :-----------------: | :-------------------: | :-------------------: |
| Workspace           |          ✅          |           ✅           |           ✅           |
| Resume Upload       |          ✅          |           ❌           |           ❌           |
| Resume Processing   |          ✅          |           ❌           |           ❌           |
| Subject Name        |          ❌          |           ✅           |           ✅           |
| Target Role         |          ✅          |           ✅           |           ✅           |
| Target Company      |          ✅          |           ✅           |           ✅           |
| Years of Experience |          ✅          |           ✅           |           ✅           |
| Theory Questions    |          ✅          |           ✅           |           ❌           |
| Coding Questions    |          ✅          |           ❌           |           ✅           |
| Text-to-Speech      |          ✅          |           ✅           |           ❌           |
| Speech-to-Text      |          ✅          |           ✅           |           ❌           |
| Code Execution      |          ✅          |           ❌           |           ✅           |
| Theory Evaluation   |          ✅          |           ✅           |           ❌           |
| Coding Evaluation   |          ✅          |           ❌           |           ✅           |

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Next.js UI     │
                         │     Frontend        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Next.js Backend   │
                         │    API Layer        │
                         └──────────┬──────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼

     ┌───────────────┐       ┌───────────────┐       ┌───────────────┐
     │ Workspace     │       │ Interview AI  │       │ Authentication│
     │ Management    │       │ Engine        │       │ Clerk         │
     └───────────────┘       └───────┬───────┘       └───────────────┘
                                     │
                  ┌──────────────────┼──────────────────┐
                  │                  │                  │
                  ▼                  ▼                  ▼

           ┌─────────────┐     ┌─────────────┐    ┌─────────────┐
           │ Resume      │     │ Question    │    │ Evaluation  │
           │ Processing  │     │ Generation  │    │ Engine      │
           │ FMI Only    │     │             │    │             │
           └─────────────┘     └─────────────┘    └─────────────┘
                                      │                  │
                    ┌─────────────────┘                  │
                    │                                    │
                    ▼                                    ▼

            ┌──────────────┐                    ┌──────────────┐
            │ Theory       │                    │ Coding       │
            │ Interview    │                    │ Interview    │
            └──────┬───────┘                    └──────┬───────┘
                   │                                   │
                   ▼                                   ▼

           ┌───────────────┐                   ┌──────────────────┐
           │ TTS / STT     │                   │ Code Execution   │
           │               │                   │ OnlineCompiler   │
           └───────────────┘                   └──────────────────┘
                   │                                   │
                   └────────────────┬──────────────────┘
                                    │
                                    ▼

                         ┌─────────────────────┐
                         │ Performance Results │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ PostgreSQL Database │
                         │     Prisma ORM      │
                         └─────────────────────┘
```

---

# 🧰 Technology Stack

## 🌐 Frontend

* Next.js

---

## ⚙️ Backend

* Next.js

---

## 🗄️ Database

* PostgreSQL
* Prisma ORM

---

## 🔐 Authentication

* Clerk Authentication

---

## 🤖 AI / LLM

AI InterviewForge uses the Groq Provider API.

Supported models include:

```text
openai/gpt-oss-120b

qwen/qwen3.6-27b

openai/gpt-oss-20b
```

These models are used for:

* Resume information extraction
* Interview question generation
* Theory answer evaluation
* Coding solution evaluation
* Interview performance analysis

---

## 🔊 Text-to-Speech

```text
Web Speech API
        OR
Node Edge TTS
```

---

## 🎙️ Speech-to-Text

```text
Whisper Large V3 Turbo
        │
        ▼
Groq Provider API
```

---

## 💻 Code Execution

```text
OnlineCompiler.io API
```

---

## 📁 Project Structure

```text
ai-interview-forge/
│
├── .agents/                          # AI agent configuration
├── .claude/                          # Claude AI configuration
├── .windsurf/                        # Windsurf IDE configuration
│
├── app/                              # Next.js App Router
│   ├── api/                          # API routes
│   ├── coding/                       # Coding interview pages
│   ├── full-mock-interview/          # Full mock interview pages
│   ├── home/                         # Home pages
│   ├── mock-interview/               # Mock interview pages
│   ├── my-interviews/                # User interview history 
│   ├── reports/                      # Interview performance reports
│   ├── results/                      # Interview result pages
│   ├── workspace/                    # Interview workspace
│   ├── favicon.ico
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root application layout
│   └── page.tsx                      # Root page
│
├── client/                           # Frontend application logic
│   ├── api/                          # Client-side API functions
│   ├── components/                   # Reusable UI components
│   ├── constants/                    # Application constants
│   ├── fonts/                        # Custom fonts
│   ├── hooks/                        # Custom React hooks
│   ├── metadata/                     # Application metadata
│   ├── types/                        # TypeScript type definitions
│   └── utils/                        # Client-side utility functions
│
├── lib/                              # Shared libraries and utilities
│   ├── generated/                    # Generated files
│   ├── prisma.ts                     # Prisma client configuration
│   └── utils.ts                      # Shared utility functions
│
├── prisma/                           # Prisma database configuration
│   ├── migrations/                   # Database migrations
│   └── schema.prisma                 # Database schema
│
├── public/                           # Static assets
│
├── server/                           # Backend business logic
│   │
│   ├── config/                       # Server configuration
│   │
│   ├── modules/                      # Core application modules
│   │   ├── check/                    # checking Interview  logic
│   │   ├── code-execution/           # Code execution functionality
│   │   ├── interview/                # Interview management
│   │   ├── interview-evaluation/     # AI interview evaluation
│   │   ├── question-answers-result/  # Question and answer results
│   │   ├── resume/                   # Resume processing
│   │   ├── shared/                   # Shared server functionality
│   │   ├── stt/                      # Speech-to-Text functionality
│   │   ├── tts/                      # Text-to-Speech functionality
│   │   ├── user/                     # User management
│   │   └── workspace/                # Interview workspace logic
│   │
│   └── providers/                    # External service integrations
│       ├── groq/                     # Groq AI integration
│       └── online-compiler/          # Online code execution integration
│
├── uploads/                          # User-uploaded files
│
├── .env                              # Environment variables
├── .env.local                        # Local environment variables
├── .gitignore                        # Git ignored files
│
├── AGENTS.md                         # AI agent instructions
├── CLAUDE.md                         # Claude configuration
│
├── components.json                   # UI component configuration
├── eslint.config.mjs                 # ESLint configuration
├── next-env.d.ts                     # Next.js TypeScript definitions
├── next.config.ts                    # Next.js configuration
│
├── package.json                      # Project dependencies and scripts
├── package-lock.json                 # Locked dependency versions
│
├── postcss.config.mjs                # PostCSS configuration
├── prisma.config.ts                  # Prisma configuration
├── proxy.ts                          # Proxy configuration
│
├── skills-lock.json                  # Skills configuration lock file
├── tsconfig.json                     # TypeScript configuration
│
└── README.md                         # Project documentation
```


---

# 🔄 Complete Interview Workflow

## Full Mock Interview

```text
User Authentication
        │
        ▼
Create Workspace
        │
        ▼
Upload:

• Workspace Name
• Resume
• Target Role
• Target Company
• Years of Experience

        │
        ▼

Resume PDF Processing
        │
        ▼
Convert PDF to Text
        │
        ▼
LLM Resume Parsing
        │
        ▼
Extract Candidate Information
        │
        ▼
Store Resume Information
        │
        ▼
Generate Theory Questions
        +
Generate Coding Questions
        │
        ▼
Conduct Theory Interview
        +
Conduct Coding Interview
        │
        ▼
Store Answers & Solutions
        │
        ▼
AI Performance Evaluation
        │
        ▼
Final Interview Results
```

---

## Subject-wise Mock Theory Interview

```text
User Authentication
        │
        ▼
Create Workspace
        │
        ▼
Provide:

• Workspace Name
• Subject Name
• Target Role
• Target Company
• Years of Experience

        │
        ▼

Generate Theory Questions
        │
        ▼
Conduct Theory Interview
        │
        ▼
Text-to-Speech
        │
        ▼
Candidate Answer
        │
        ▼
Speech-to-Text
        │
        ▼
AI Theory Evaluation
        │
        ▼
Final Performance Results
```

> **No resume is uploaded or processed.**

---

## Subject-wise Mock Coding Interview

```text
User Authentication
        │
        ▼
Create Workspace
        │
        ▼
Provide:

• Workspace Name
• Subject Name
• Target Role
• Target Company
• Years of Experience

        │
        ▼

Generate Coding Questions
        │
        ▼
Candidate Writes Code
        │
        ▼
Execute Code
        │
        ▼
Run Test Cases
        │
        ▼
Store Execution Results
        │
        ▼
AI Coding Evaluation
        │
        ▼
Final Performance Results
```

> **No resume is uploaded or processed.**

---

# 📈 Interview Performance Analysis

The platform analyzes candidate performance differently based on the interview type.

## Theory Performance

```text
Accuracy
    +
Depth
    +
Clarity
    +
Relevance
    +
Missing Concepts
```

---

## Coding Performance

```text
Algorithm
    +
Correctness
    +
Time Complexity
    +
Space Complexity
    +
Edge Cases
    +
Test Performance
    +
Code Quality
    +
Efficiency
```

---

# 🎯 Evaluation Philosophy

AI InterviewForge follows a structured evaluation approach.

```text
Evaluate Demonstrated Knowledge
            │
            ▼
Do Not Assume Missing Knowledge
            │
            ▼
Use Structured Evaluation Rubrics
            │
            ▼
Evaluate Actual Submitted Code
            │
            ▼
Use Test Results When Available
            │
            ▼
Identify Strengths and Weaknesses
            │
            ▼
Generate Interview Performance Results
```

The goal is to provide a more structured evaluation instead of relying only on a generic AI response.

---

# 🔐 Environment Variables

Create a `.env` file in the project root.

```env
# Database
DATABASE_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Groq API
GROQ_API_KEY=

# Online Compiler
ONLINE_COMPILER_API_KEY=

# Application
NEXT_PUBLIC_APP_URL=
```

> Add additional environment variables if required by your deployment or third-party service configuration.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <repository-url>
```

---

## 2. Navigate to the Project

```bash
cd AI-InterviewForge
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file.

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

GROQ_API_KEY=

ONLINE_COMPILER_API_KEY=

NEXT_PUBLIC_APP_URL=
```

---

## 5. Generate Prisma Client

```bash
npx prisma generate
```

---

## 6. Run Database Migrations

```bash
npx prisma migrate dev
```

---

## 7. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---


# 🎯 Project Goals

AI InterviewForge aims to help candidates:

```text
✓ Practice technical interviews

✓ Improve theoretical knowledge

✓ Improve coding problem-solving skills

✓ Prepare for specific roles

✓ Prepare for specific companies

✓ Practice using realistic interview workflows

✓ Receive structured performance evaluations

✓ Identify technical strengths

✓ Identify areas requiring improvement
```

---

# 💡 Why AI InterviewForge?

A traditional interview preparation workflow often looks like:

```text
Question Bank
      │
      ▼
Candidate Reads Question
      │
      ▼
Candidate Answers
      │
      ▼
No Structured Evaluation
```

AI InterviewForge aims to provide:

```text
Candidate
    │
    ▼
Interview Configuration
    │
    ▼
Personalized Question Generation
    │
    ▼
Mock Interview
    │
    ▼
Candidate Answer / Code
    │
    ▼
AI Evaluation
    │
    ▼
Technical Analysis
    │
    ▼
Performance Results
```

---

# 🧠 Key Learning Areas

This project demonstrates practical experience with:

## AI Engineering

```text
✓ LLM Integration

✓ Prompt Engineering

✓ Structured LLM Outputs

✓ Resume Parsing

✓ AI Question Generation

✓ Theory Evaluation

✓ Coding Evaluation
```

---

## Full-Stack Development

```text
✓ Next.js

✓ PostgreSQL

✓ Prisma ORM

✓ API Development

✓ Authentication

✓ Database Design

✓ Third-Party API Integration
```

---

## AI-Powered Interview Systems

```text
✓ Text-to-Speech

✓ Speech-to-Text

✓ Resume Analysis

✓ Interview Question Generation

✓ Coding Evaluation

✓ Performance Analysis
```

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

```text
1. Fork the repository.

2. Create a new feature branch.

3. Make your changes.

4. Commit your changes.

5. Push the branch.

6. Create a Pull Request.
```

Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

### **Sumanth Gunji**



Passionate about building **clean, scalable, and intelligent applications** that combine modern web technologies with AI to create meaningful user experiences.



---



# ⭐ Final Project Statement

> **AI InterviewForge is an AI-powered mock interview preparation platform that supports resume-based Full Mock Interviews and subject-based Theory and Coding Mock Interviews. The platform combines AI question generation, voice-based theory interviews, real-time code execution, and structured AI evaluation to help candidates understand and improve their interview performance.**

---

<div align="center">

# 🚀 AI InterviewForge

### Practice. Perform. Improve.

**Prepare smarter with AI-powered mock interviews.**

⭐ If you find this project useful, consider giving it a star.

</div>
