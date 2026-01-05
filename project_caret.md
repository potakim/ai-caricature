# Project Analysis: AI Caricature

이 문서는 `ai-caricature` 프로젝트의 구조와 컴포넌트 분석 내용을 담고 있습니다.

## 1. 프로젝트 개요
- **이름**: AI Caricature
- **설명**: Next.js 16과 Tailwind CSS v4를 활용한 AI 캐리커처 생성 웹 애플리케이션
- **핵심 기술**:
  - **Framework**: Next.js 16 (App Router)
  - **Language**: TypeScript
  - **Styling**: Tailwind CSS v4
  - **UI Library**: shadcn/ui (Radix UI 기반)

## 2. 폴더 구조 (Directory Structure)

```
src/
├── app/                  # App Router 메인 디렉터리 (L3 - 직접 수정)
│   ├── favicon.ico       # 파비콘
│   ├── globals.css       # 전역 스타일 및 Tailwind v4 설정
│   ├── layout.tsx        # 루트 레이아웃 (HTML/Body, 메타데이터, 폰트)
│   └── page.tsx          # 메인 페이지 (Client Component)
├── components/           # 컴포넌트 디렉터리
│   └── ui/               # shadcn/ui 재사용 컴포넌트 (L2 - 조건부 수정)
│       ├── button.tsx    # 버튼 (Variants: default, destructive, outline 등)
│       ├── card.tsx      # 카드 레이아웃 (Header, Content, Footer)
│       ├── label.tsx     # 폼 라벨
│       └── select.tsx    # 셀렉트 박스 (Dropdown)
└── lib/                  # 유틸리티 (L2 - 조건부 수정)
    └── utils.ts          # clsx + tailwind-merge (cn 함수)
```

## 3. 주요 구성 요소 분석

### A. Routing (`src/app`)
- **`layout.tsx`**: 애플리케이션의 껍데기 역할을 하며, 폰트(`geist-sans`, `geist-mono`)와 메타데이터를 설정합니다.
- **`page.tsx`**: 실제 UI가 그려지는 곳으로, 이미지 업로드, 옵션 선택, 결과 표시 등의 로직을 포함합니다. `"use client"`가 선언되어 있어 브라우저 API(드래그앤드롭 등)를 사용합니다.

### B. UI Components (`src/components/ui`)
shadcn/ui 패턴을 따르며, 각 컴포넌트는 개별 파일로 관리됩니다.
- **Button**: `class-variance-authority` (cva)를 사용하여 스타일 변형을 관리합니다.
- **Card**: 정보를 그룹화하여 보여주는 컨테이너 역할을 합니다.
- **Label, Select**: 사용자 입력을 받는 폼 요소들로, Radix UI의 접근성을 상속받습니다.

### C. Styling (`src/app/globals.css`)
- Tailwind CSS v4의 `@theme` 기능을 사용하여 변수를 관리합니다.
- 다크 모드와 라이트 모드에 대응하는 색상 변수들이 정의되어 있습니다.

## 4. 개발 컨벤션
- **경로 별칭 (Alias)**: `@/*`는 `src/*`를 가리킵니다. (예: `import { Button } from "@/components/ui/button"`)
- **파일 인코딩**: 한글 깨짐 방지를 위해 모든 소스 파일은 **UTF-8**로 저장해야 합니다.
- **수정 원칙**:
  - `src/app`: 비즈니스 로직 변경 시 주로 작업하는 공간.
  - `src/components/ui`: 디자인 시스템 변경이 아니면 가급적 수정하지 않음.

이 문서는 프로젝트의 구조를 이해하고 개발 방향을 잡는 데 참고자료로 활용됩니다.
