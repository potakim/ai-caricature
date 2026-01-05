# Design Document: Agents Initialization & Project Analysis

## 1. Objective
To initialize the `.agents/context` directory with project-specific rules and context, and to create a `project_caret.md` file that summarizes the project structure for future reference.

## 2. Analysis of Current State
- **Project Name**: ai-caricature (implied from directory), `my-v0-project` in package.json. Will use "AI Caricature" as the descriptive name.
- **Architecture**: Next.js 16 App Router, Tailwind CSS v4, Radix/shadcn-ui.
- **Key Directories**:
  - `src/app/`: Core application logic and routing.
  - `src/components/ui/`: Reusable UI components.
  - `src/lib/`: Shared utilities.

## 3. Implementation Plan

### Step 1: Initialize `.agents/context`
We will create the following files in `.agents/context/`:
1.  **`caret-rules.json`**:
    -   **Identity**: Name: "AI Caricature", Symbol: "🎨", Nature: "Next.js 16 Web Application".
    -   **Architecture Rules**:
        -   `src/app`: L3_direct (Core logic, requires care).
        -   `src/components/ui`: L2_conditional (Reusable components).
        -   `src/lib`: L2_conditional (Utilities).
    -   **AI Workflow**: Standard minimal-change principle.
    -   **Workflows**: Reference `ai-work-index.yaml`.

2.  **`caret-rules.md`** (Human-readable):
    -   Explain the Next.js App Router structure.
    -   Explain the Tailwind v4 + shadcn/ui styling approach.
    -   Notes on file encoding (UTF-8) for Korean support.

3.  **`ai-work-index.yaml`**:
    -   Define categories: `feature` (Feature dev), `refactor` (Code improvement), `fix` (Bug fix).

### Step 2: Create `project_caret.md`
This file will serve as a developer guide.
-   **Structure Overview**: Visual tree of the project.
-   **Component Analysis**: breakdown of `src/components/ui`.
-   **Routing**: Explanation of `src/app` routing.
-   **Tech Stack**: Version details (Next.js 16, React 19, etc.).
-   **Conventions**: `@/` alias usage, CSS variables for theming.

## 4. Verification
-   Check if files exist and contain correct content.
-   Confirm with the user.
