# Claude Code 프롬프트: 프로젝트 페이지 스타일 통일

## 1. 메인 프롬프트 (Claude Code에 복붙)

```
## 작업 목표
tofuG 프로젝트 페이지의 레이아웃/스타일을 기준 템플릿으로 삼아서, 
모든 프로젝트 페이지를 동일한 구조로 통일해.

## ⚠️ 절대 규칙 (가장 중요)
- 각 프로젝트 페이지에 이미 작성된 텍스트, 이미지, 설명, 섹션 콘텐츠는 
  **한 글자도 삭제하거나 변경하지 마.**
- 기존 콘텐츠를 tofuG 분량에 맞춰 줄이거나 생략하는 것도 금지.
- tofuG 페이지에 없는 섹션이라도, 다른 프로젝트에 있으면 그대로 유지해.
- "통일"의 의미 = 레이아웃 껍데기(네비바, 메타바, 그리드, 타이포, 간격)만 맞추는 것.
  콘텐츠 양이나 내용은 각 프로젝트마다 다를 수 있고, 그게 정상임.

## 통일할 요소

### A. 공통 네비게이션 바
- 좌측: 夏陰 로고 (한자)
- 중앙 메뉴: STORY · CONCEPT · GALLERY · LOCATIONS · PRESS
  (각 프로젝트 내부 섹션으로 앵커 스크롤)
- 우측: KR / EN 언어 토글 (pill 버튼, 선택된 쪽 배경 하이라이트)
- 스타일: 투명 배경, 스크롤 시 살짝 블러 배경 전환
- → 반드시 공통 컴포넌트(Navbar.jsx 또는 Navbar 섹션)로 분리

### B. 히어로 섹션 구조
- 풀스크린(100vh) 배경 이미지
- 이미지 위 반투명 다크 오버레이
- 텍스트 레이어 (좌하단 정렬):
  - 태그라인: "SPACE CONCEPT · SPATIAL DESIGN · BRANDING" (letter-spacing 넓게, 작은 사이즈)
  - 프로젝트명: 굵은 산세리프 대문자, 큰 사이즈
  - 한국어 설명: 본문 사이즈, 2~3줄
- 각 프로젝트의 기존 히어로 이미지/텍스트를 이 레이아웃에 맞춰 배치
- 기존 텍스트 내용은 절대 수정하지 않고 그대로 넣기

### C. 프로젝트 메타정보 바
- 히어로 하단, 가로 4컬럼 레이아웃:
  PROJECT | CATEGORY | YEAR | SCOPE
- 각 라벨은 작은 대문자, 값은 본문 사이즈
- 하단 구분선(thin border-top)

### D. 콘텐츠 영역 (각 프로젝트별 고유)
- 여기는 통일하지 않음! 각 프로젝트마다 이미 만들어진 섹션 그대로 유지.
- 단, 전체적인 max-width, padding, 폰트 사이즈 등 기본 간격만 맞추기:
  - max-width: 1200px (콘텐츠 영역)
  - section padding: 80px 0 (상하)
  - 본문 폰트: 16px, line-height 1.7
  - heading 폰트 사이즈 체계: h2(32px), h3(24px), h4(20px)

### E. 타이포그래피
- 영문: 기존 프로젝트에서 쓰던 폰트 유지 (없으면 Pretendard 또는 기존 설정)
- 한글: Pretendard 또는 Noto Sans KR
- 프로젝트명(히어로): font-weight 800~900, 대문자

### F. 공통 푸터 (있다면 통일)

## 작업 순서
1. 먼저 tofuG 프로젝트 페이지 파일 분석 → 구조/스타일 파악
2. 다른 프로젝트 페이지 파일 전부 리스트업
3. 각 프로젝트 페이지의 기존 콘텐츠를 빠짐없이 파악 (삭제 방지)
4. 공통 컴포넌트 분리 (Navbar, MetaBar, HeroSection, Footer)
5. 각 프로젝트 페이지에 공통 컴포넌트 적용
6. 기존 콘텐츠가 전부 살아있는지 최종 확인

## 프로젝트 데이터 구조
아래 projectData 파일을 만들어서 각 프로젝트 페이지에서 import해서 사용해.
히어로/메타바 영역에만 이 데이터를 쓰고, 본문 콘텐츠는 각 페이지 고유 코드 유지.
```

---

## 2. projectData.js (같이 만들어달라고 해)

```javascript
// src/data/projectData.js

const projects = {
  tofug: {
    id: 'tofug',
    name: 'TOFU · G',
    tagline: 'SPACE CONCEPT · SPATIAL DESIGN · BRANDING',
    description: '한국 전통 두부 제조의 정성을 담은 프리미엄 젤라또 브랜드.\n멧돌과 한국의 전통 주방에서 영감을 받은 공간디자인.',
    meta: {
      project: 'TOFU G · Gelato',
      category: 'F&B / Gelato',
      year: '2025',
      scope: 'Spatial Design / Branding',
    },
    heroImage: '/images/projects/tofug/hero.jpg',
    slug: '/projects/tofug',
  },

  benson: {
    id: 'benson',
    name: 'BENSON',
    tagline: 'SPACE CONCEPT · SPATIAL DESIGN · BRANDING',
    description: '', // ← 각 프로젝트 기존 텍스트 그대로 채워넣기
    meta: {
      project: 'BENSON',
      category: '', // 기존 값
      year: '',
      scope: '',
    },
    heroImage: '/images/projects/benson/hero.jpg',
    slug: '/projects/benson',
  },

  squidgame2: {
    id: 'squidgame2',
    name: 'SQUID GAME 2',
    tagline: 'SPACE CONCEPT · SPATIAL DESIGN · BRANDING',
    description: '',
    meta: {
      project: 'SQUID GAME 2',
      category: '',
      year: '',
      scope: '',
    },
    heroImage: '/images/projects/squidgame2/hero.jpg',
    slug: '/projects/squidgame2',
  },

  prada: {
    id: 'prada',
    name: 'PRADA',
    tagline: 'SPACE CONCEPT · SPATIAL DESIGN · BRANDING',
    description: '',
    meta: {
      project: 'PRADA',
      category: '',
      year: '',
      scope: '',
    },
    heroImage: '/images/projects/prada/hero.jpg',
    slug: '/projects/prada',
  },

  swarovski: {
    id: 'swarovski',
    name: 'SWAROVSKI',
    tagline: 'SPACE CONCEPT · SPATIAL DESIGN · BRANDING',
    description: '',
    meta: {
      project: 'SWAROVSKI',
      category: '',
      year: '',
      scope: '',
    },
    heroImage: '/images/projects/swarovski/hero.jpg',
    slug: '/projects/swarovski',
  },
};

export default projects;
```

---

## 3. CLAUDE.md에 추가할 내용

```markdown
## 프로젝트 페이지 통일 규칙

### 기준 템플릿: tofuG 프로젝트 페이지
- 네비바, 히어로, 메타바 구조를 전체 프로젝트에 동일 적용
- 공통 컴포넌트: Navbar, HeroSection, MetaBar, Footer

### 콘텐츠 보호 원칙 (절대 규칙)
- 기존 프로젝트 페이지의 텍스트/이미지/섹션을 삭제·축소·변경 금지
- tofuG에 없는 섹션이라도 해당 프로젝트에 있으면 유지
- "통일" = 껍데기(레이아웃)만 맞추는 것, 콘텐츠 양은 프로젝트마다 다름

### 프로젝트 데이터
- src/data/projectData.js에서 히어로/메타 데이터 관리
- 본문 콘텐츠는 각 프로젝트 페이지 파일에서 직접 관리
```

---

## 4. 사용 팁

| 상황 | 하면 좋은 것 |
|------|-------------|
| 작업 전 | `CLAUDE.md`에 섹션 3 내용 먼저 추가 |
| 작업 시작 | 섹션 1 프롬프트를 Claude Code에 통째로 전달 |
| 중간 체크 | "각 프로젝트 페이지 콘텐츠가 하나도 빠진 거 없는지 diff로 확인해줘" |
| 마무리 | "모든 프로젝트 페이지 로컬에서 열어서 네비바/메타바 동일한지 스크린샷 비교해줘" |
