# Claude Code 프롬프트 — 드라이브 폴더 자동 연동 시스템

아래 내용을 Claude Code에 붙여넣으세요.
포트폴리오 프로젝트 폴더(Main)에서 실행하세요.

---

## 프롬프트 시작 ↓ (아래부터 전부 복사)

---

내 포트폴리오 사이트에 "드라이브 폴더 기반 자동 동기화" 시스템을 만들어줘.

## 목표
내 Google Drive의 포트폴리오 폴더에 이미지와 info.json만 넣으면,
`npm run sync` 한 번으로 웹사이트에 자동 반영되는 구조를 만들어.

## 내 환경
- Google Drive 데스크탑 앱 사용 중 (탐색기에서 접근 가능)
- 포트폴리오 프로젝트 폴더 경로: `C:\Users\ejes7\내 드라이브\portfolio`
- Next.js 프로젝트 경로: `C:\Users\ejes7\내 드라이브\portfolio\Main`
- Vercel 배포 중 (git push하면 자동 배포)

## 드라이브 폴더 구조 (이미 존재하는 폴더들)
```
C:\Users\ejes7\내 드라이브\portfolio\
├── Main/                          ← Next.js 프로젝트 (여기서 작업)
├── 2024.04-06 BENSON (NEW)/       ← 프로젝트 폴더
├── 2024.05-06 GAGGA (NEW)/
├── 2024.06-09 BODY GUARD (NEW, REBRANDING)/
├── 2024.07 3 1-2 FEET (NEW)/
├── 2024.08 Knickerbocker Bagel Pop-Up (POP UP)/
├── 2024.09 2024 한돈데이 "선진" Pop-up store (POP UP)/
├── 2024.09 RATATOU_LEE CAKE/
├── 2024.10 KALBI SOCIAL CLUB (DECO)/
├── 2024.10 New Balance Pop-up in Seongsu (POP UP)/
├── 2024.11 SQUID GAME2 (POP UP)/
├── 2024.12 SOLDAM MARKET (NEW)/
├── 2025.01 New Balance Pop-up in Seongsu (POP UP)/
├── 2025.01 PAULBASSETT (DECO)/
├── 2025.01 SHABU SANGHA (DECO)/
├── 2025.04 TOFUG (NEW)/
├── DAEHYE/
├── EUNSEOLEE/
├── HAUMM/
├── INITIA/
├── PRADA KOREA/
└── SWAROVSKI/
```

## 만들어야 할 것

### 1. sync-portfolio.js 스크립트

`scripts/sync-portfolio.js` 파일을 만들어줘. 이 스크립트가 하는 일:

1) 상위 폴더 (`../`) 를 스캔해서 `info.json`이 있는 프로젝트 폴더를 찾음
2) 각 폴더의 이미지 파일들(jpg, jpeg, png, webp, gif)을 `public/images/[slug]/`로 복사
3) 모든 info.json을 모아서 `data/projects-generated.js`를 자동 생성
4) 콘솔에 "✅ 3개 프로젝트 동기화 완료" 같은 로그 출력

```
실행: node scripts/sync-portfolio.js
또는: npm run sync
```

주의사항:
- 경로에 한글이 포함되어 있으므로 UTF-8 처리 필수
- 이미 있는 이미지는 수정 시간 비교해서 변경된 것만 복사 (속도 최적화)
- info.json이 없는 폴더는 스킵
- Main 폴더, .claude 폴더, EUNSEOLEE 폴더는 스킵

### 2. info.json 템플릿

각 프로젝트 폴더에 넣을 info.json 형식:

```json
{
  "name": "프로젝트명",
  "slug": "url-slug",
  "category": "new | popup | deco | brand",
  "year": "2024",
  "type_kr": "신규매장",
  "type_en": "New Store",
  "sub_kr": "부제 한글",
  "sub_en": "Subtitle English",
  "tagline_kr": "한 줄 설명 한글",
  "tagline_en": "One-line description English",
  "project_kr": "프로젝트 풀네임 한글",
  "project_en": "Project Full Name English",
  "category_label_kr": "카테고리 한글",
  "category_label_en": "Category English",
  "scope_kr": "작업 범위 한글",
  "scope_en": "Scope English",
  "location_kr": "",
  "location_en": "",
  "featured": false,
  "order": 10,
  "hero_image": "cover.jpg",
  "cover_image": "cover.jpg",
  "grid_image": "thumbnail.jpg",
  "hover_image": "",
  "sections": [
    {
      "number": "01",
      "title_kr": "섹션 제목",
      "title_en": "Section Title",
      "subtitle_kr": "부제목",
      "subtitle_en": "Subtitle",
      "body_kr": "본문 한글",
      "body_en": "Body English",
      "images": ["image1.jpg", "image2.jpg"]
    }
  ]
}
```

### 3. package.json에 sync 명령어 추가

```json
{
  "scripts": {
    "sync": "node scripts/sync-portfolio.js",
    "dev": "npm run sync && next dev",
    "build": "npm run sync && next build"
  }
}
```

이렇게 하면 dev 서버 실행할 때마다 자동으로 동기화되고,
Vercel 빌드할 때도 자동으로 실행됨.

### 4. 메인 페이지 수정

기존 메인 페이지에서 프로젝트 데이터를 `data/projects-generated.js`에서 import하도록 변경.

기존 "프로젝트 둘러보기" 섹션을 확장해서:
- 카테고리 필터 버튼: 전체 / 신규매장 / 팝업 / 데코 / 브랜드
- 필터 스타일: pill, border-radius 20px, 활성화 시 배경 #c4a882
- 전체 프로젝트를 리스트 형태로 표시 (연도 | 이름 | 카테고리 | 설명 | →)
- sections가 있는 프로젝트 → 클릭 시 상세 페이지로 이동
- sections가 없는 프로젝트 → opacity 0.4, 클릭 비활성

하단 그리드도 전체 프로젝트 썸네일로 확장.

### 5. 동적 프로젝트 상세 페이지

`pages/projects/[slug].js` 동적 라우트를 만들어줘.
info.json의 sections 데이터를 기반으로 기존 프로젝트 페이지(tofug, benson 등)와
동일한 스타일의 페이지를 자동 생성.

기존 tofug.js, benson.js 등의 페이지 구조를 참고해서:
- 상단: 커버 이미지 + 프로젝트명 + tagline
- 프로젝트 메타 (Project / Category / Year / Scope)
- 각 section을 번호 + 제목 + 본문 + 이미지로 렌더
- 하단: ← 이전 / Back to Top / 다음 → 네비게이션
- KR/EN 토글 지원

단, 기존에 이미 하드코딩된 프로젝트 페이지(tofug.js, benson.js, bodyguard.js, gagga.js, soldam.js)가 있으면 그걸 우선 사용하고, 없는 slug만 동적 페이지로 렌더.

## 디자인 토큰 (기존 사이트 값 — 반드시 이 값 사용)
- 배경: #0c0c0c
- 카드: #161616
- elevated: #1c1c1c
- 텍스트(white): #ede8e0
- 텍스트(dim): #7a756e
- 텍스트(muted): #4a4640
- 악센트(gold): #c4a882
- 악센트(dim): #a08660
- 보더: rgba(196,168,130,0.12)
- 보더(subtle): rgba(196,168,130,0.06)
- 세리프: 'Cormorant Garamond', 'Noto Serif KR', serif
- 산세리프: 'Noto Sans KR', sans-serif
- 최대폭: 1200px, 좌우 패딩: 40px (모바일 20px)

## 절대 하지 말 것
- 기존 하드코딩된 프로젝트 페이지 5개 (tofug, benson, bodyguard, gagga, soldam) 수정하지 마
- 히어로, About, 空間夏陰 철학 섹션, Contact, Footer 수정하지 마
- 기존 CSS 변수, 폰트, 컬러 변경하지 마
- 새로운 외부 라이브러리 추가하지 마

## 작업 흐름 요약

```
[내가 하는 것]
드라이브 폴더에 info.json + 이미지 넣기
    ↓
npm run sync (또는 npm run dev 하면 자동)
    ↓
git push
    ↓
Vercel 자동 배포 → 사이트 반영 완료
```

먼저 기존 프로젝트 구조(pages/, components/, styles/, public/)를 확인한 다음 작업 시작해줘.
