# caret-rules.md

## 프로젝트 개요
**AI Caricature**는 Next.js 16 (App Router) 기반의 웹 애플리케이션으로, 사용자가 업로드한 이미지를 AI 캐리커처로 변환하는 기능을 제공합니다. Tailwind CSS v4와 shadcn/ui를 사용하여 빠르고 모던한 UI를 구축합니다.

## 핵심 규칙 (Core Rules)

### 1. 기술 스택 및 스타일
- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4
  - `src/app/globals.css`에 CSS 변수로 테마 정의
  - `:root` 및 `.dark` 클래스를 통한 다크 모드 지원
- **Components**: Radix UI Primitives 기반의 shadcn/ui 패턴 사용
- **Language**: TypeScript

### 2. 디렉터리 구조 및 수정 원칙
- **`src/app/`**: 페이지 라우팅 및 레이아웃 담당. (Level 3 - 직접 수정)
  - `page.tsx`: 클라이언트 컴포넌트 (`"use client"`) 위주로 구성됨.
  - `layout.tsx`: 루트 레이아웃, 메타데이터, 폰트 설정.
- **`src/components/ui/`**: 재사용 가능한 UI 컴포넌트. (Level 2 - 조건부 수정)
  - shadcn/ui 스타일을 따르며, 필요 시에만 수정.
- **`src/lib/`**: 유틸리티 함수. (Level 2 - 조건부 수정)
  - `utils.ts`: `clsx`와 `tailwind-merge`를 결합한 `cn()` 함수 포함.

### 3. 개발 주의사항
- **인코딩**: 한글 텍스트가 포함된 파일(`layout.tsx`, `page.tsx` 등)은 반드시 **UTF-8**로 저장하여 깨짐 현상을 방지해야 합니다.
- **경로 별칭**: `@/*`는 `src/*`를 가리킵니다.
- **클라이언트 컴포넌트**: 인터랙션이 많은 페이지는 최상단에 `"use client"` 지시어를 확인하세요.

## AI 워크플로우 가이드
1. 작업을 시작하기 전에 `caret-rules.json`을 먼저 확인합니다.
2. 기존 코드를 존중하며, 불필요한 재작성을 피합니다 (Minimal Change Principle).
3. 새로운 컴포넌트 추가 시 `src/components/ui` 패턴을 따릅니다.
