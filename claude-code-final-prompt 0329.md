# Claude Code 프롬프트

아래 내용을 Claude Code에 붙여넣으세요.
먼저 프로젝트 폴더로 이동: cd "C:\Users\ejes7\내 드라이브\portfolio"
그리고 portfolio-merged.html 파일을 프로젝트 루트에 넣어두세요.

---

```
현재 Next.js Pages Router 포트폴리오 사이트를 업그레이드해야 해.
기존 디자인과 코드는 절대 건드리지 않고, 새로운 기능만 추가하는 방식이야.

## 참고 파일
프로젝트 루트에 있는 portfolio-merged.html을 참고해.
이 파일에 추가할 프로젝트 데이터 20개, "프로젝트 둘러보기" 섹션의 디자인, 카테고리 필터 UI가 다 들어있어.

## 작업 순서 (반드시 이 순서대로, 한 단계씩)

### Step 1: 현재 구조 파악
먼저 pages/index.js (또는 index.tsx)와 스타일 파일의 현재 구조를 읽고 보여줘.
어떤 섹션이 어떤 순서로 있는지, 프로젝트 데이터가 어디에 하드코딩 되어있는지 확인해.

### Step 2: data/projects.json 생성
portfolio-merged.html의 JavaScript에서 프로젝트 데이터(P 배열)를 추출해서 data/projects.json 파일로 만들어.
기존 5개 featured 프로젝트 + 새로운 15개 프로젝트 = 총 20개.
각 프로젝트 항목에는 다음 필드가 필요해:
- id, name, category (new/popup/deco/brand)
- year, subtitle_kr, subtitle_en
- type_kr, type_en, tag_kr, tag_en
- hasLink (boolean), isFeatured (boolean), isNew (boolean)
- image (기존 이미지 경로), hoverImage (있으면)
- thumbnail (하단 그리드용)

### Step 3: 기존 하드코딩된 데이터를 JSON에서 읽도록 변경
- 기존 SELECTED PROJECTS 그리드가 하드코딩되어 있다면 projects.json에서 isFeatured: true인 항목을 읽도록 변경
- 기존 하단 그리드 (.projects-overlay)도 projects.json에서 전체 20개를 읽도록 변경
- 기존 디자인, 스타일, 애니메이션은 절대 바꾸지 마

### Step 4: "프로젝트 둘러보기" 섹션 컴포넌트 추가
components/BrowseProjects.js (또는 .tsx) 컴포넌트를 새로 만들어.
portfolio-merged.html의 .browse 섹션을 참고해서:
- 제목: "프로젝트 둘러보기" (EN: "Browse All Projects")
- 카테고리 필터: 전체/신규매장/팝업/데코/브랜드 (각 버튼에 프로젝트 수 표시)
- 테이블형 프로젝트 리스트 (연도 | 프로젝트명 | 유형 | 설명 | 화살표)
- hasLink: true인 프로젝트는 클릭 가능 + hover 효과
- hasLink: false인 프로젝트는 opacity 0.45, 클릭 불가
- isNew: true인 항목에 "NEW" 배지 표시
- 기존 사이트의 KR/EN 언어 토글 state를 그대로 사용

이 컴포넌트를 pages/index.js에서:
scope 섹션 (.scope) 뒤, project-cards-section 앞에 배치해.

### Step 5: 스타일
portfolio-merged.html의 CSS를 참고하되, 기존 사이트의 디자인 시스템에 맞춰:
- 폰트: Inter (메인), DM Mono (라벨/날짜/카테고리/배지) — 기존 사이트에서 이미 사용 중
- 색상: 기존 사이트의 CSS 변수 사용
- 필터 버튼: pill 형태, 골드 액센트
- 리스트 행: grid 레이아웃, hover 시 배경 변화
- 모바일 반응형: 900px 이하에서 컬럼 축소
- 스크롤 시 fade-in 애니메이션 (기존 사이트의 reveal 클래스 방식 따라)

## 절대 하지 말 것
- 기존 컴포넌트의 코드나 스타일을 수정하지 마
- 기존 이미지를 삭제하거나 경로를 바꾸지 마
- 기존 5개 프로젝트 상세 페이지를 건드리지 마
- 한번에 모든 작업을 하지 말고, 각 Step 완료 후 결과를 보여주고 확인받아

## 확인 방법
각 Step 완료 후:
1. 변경된 파일 목록을 보여줘
2. 주요 변경 내용을 간단히 설명해줘
3. 내가 "다음" 하면 다음 Step 진행
```
