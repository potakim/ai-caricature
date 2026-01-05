# Project Overview

- Framework: Next.js 16 (App Router) with React 19.
- Styling: Tailwind CSS v4 with CSS variables defined in `src/app/globals.css`.
- UI: shadcn/ui-style components wrapping Radix primitives.
- Analytics: @vercel/analytics injected in the root layout.

# Directory Layout

- `src/app/`
  - `layout.tsx`: root layout, metadata, fonts, analytics, global CSS import.
  - `page.tsx`: main page (client component) for the caricature UI.
  - `globals.css`: Tailwind v4 setup and theme tokens.
  - `favicon.ico`: app icon.
- `src/components/ui/`
  - `button.tsx`: Button component with `cva` variants/sizes.
  - `card.tsx`: Card layout components (header/content/footer/etc.).
  - `label.tsx`: Radix Label wrapper.
  - `select.tsx`: Radix Select wrapper components.
- `src/lib/utils.ts`: `cn()` helper combining `clsx` and `tailwind-merge`.
- `public/`: static SVG assets.
- Root config: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json`.

# Routing and Page Behavior

- `/` is served by `src/app/page.tsx`.
- The page is a client component that:
  - Handles image upload (file input + drag/drop) and preview.
  - Lets users pick a style, expression, and background.
  - Simulates generation with a timeout and returns a placeholder image.
  - Offers download, reset, and re-upload actions.
- No API routes or backend integration exist yet.

# Styling and Theme

- Tailwind v4 is configured via CSS imports in `src/app/globals.css`.
- Theme tokens are defined as CSS variables under `:root` and `.dark`.
- `components.json` indicates shadcn style `new-york`, `baseColor` slate, and CSS variables enabled.

# Component Usage Summary

- `Button`: UI actions (primary, outline, destructive, sizes).
- `Card`: layout containers for sections, loading, and results.
- `Label` + `Select`: form controls for expression/background options.

# Aliases

- `@/*` -> `src/*` (from `tsconfig.json`).
- `components.json` also defines `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.

# Notes / Pitfalls

- Korean copy in `src/app/layout.tsx` and `src/app/page.tsx` is UTF-8; keep UTF-8 when editing.
- Avoid creating a root-level `app/` directory; keep the App Router under `src/app/`.

# 프로젝트 개요

- 프레임워크: Next.js 16 (App Router) + React 19.
- 스타일링: Tailwind CSS v4, `src/app/globals.css`에 CSS 변수 테마 정의.
- UI: shadcn/ui 스타일 컴포넌트(Radix 프리미티브 래퍼).
- 분석: 루트 레이아웃에 @vercel/analytics 삽입.

# 디렉터리 구조

- `src/app/`
  - `layout.tsx`: 루트 레이아웃, 메타데이터/폰트/애널리틱스, 글로벌 CSS import.
  - `page.tsx`: 캐리커처 UI 메인 페이지(클라이언트 컴포넌트).
  - `globals.css`: Tailwind v4 설정과 테마 토큰.
  - `favicon.ico`: 앱 아이콘.
- `src/components/ui/`
  - `button.tsx`: `cva` 기반 버튼 variants/sizes.
  - `card.tsx`: 카드 레이아웃 컴포넌트(헤더/콘텐츠/푸터 등).
  - `label.tsx`: Radix Label 래퍼.
  - `select.tsx`: Radix Select 래퍼.
- `src/lib/utils.ts`: `clsx` + `tailwind-merge` 결합 `cn()` 헬퍼.
- `public/`: 정적 SVG 에셋.
- 루트 설정: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json`.

# 라우팅 및 페이지 동작

- `/`는 `src/app/page.tsx`가 처리.
- 페이지 동작:
  - 이미지 업로드(파일 입력 + 드래그/드롭) 및 미리보기.
  - 스타일/표정/배경 옵션 선택.
  - 타임아웃으로 생성 시뮬레이션 후 플레이스홀더 이미지 표시.
  - 다운로드/리셋/재업로드 액션 제공.
- API 라우트/백엔드 연동은 아직 없음.

# 스타일링 및 테마

- Tailwind v4는 `src/app/globals.css`에서 CSS import로 구성.
- `:root`와 `.dark`에 CSS 변수로 테마 토큰 정의.
- `components.json`: shadcn 스타일 `new-york`, `baseColor`는 slate, CSS 변수 사용.

# 컴포넌트 사용 요약

- `Button`: 주요 액션 버튼(variant/size).
- `Card`: 섹션/로딩/결과 레이아웃.
- `Label` + `Select`: 폼 컨트롤.

# 경로 별칭

- `@/*` -> `src/*` (`tsconfig.json`).
- `components.json`에 `@/components`, `@/components/ui`, `@/lib`, `@/hooks` 정의.

# 주의사항

- `src/app/layout.tsx`, `src/app/page.tsx`의 한글은 UTF-8 기준으로 작성됨. 편집 시 인코딩 유지.
- 루트에 `app/` 폴더를 만들지 말고 App Router는 `src/app/`만 사용.
