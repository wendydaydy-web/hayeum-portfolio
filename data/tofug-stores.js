// ─────────────────────────────────────────────────────────────
// TOFU·G 매장 데이터 (단일 소스 of truth)
//
// ★ 매장 추가/수정 방법 ★
//   아래 `stores` 배열에 객체 한 줄을 추가/수정하면 페이지의 매장 목록과
//   스탯(매장 수)이 자동으로 반영됩니다. 다른 곳은 손대지 않아도 됩니다.
//
// ★ 필드 설명 ★
//   no        : 표시용 번호(정렬 기준). byMe 매장은 1,2,3,4…
//   name      : 매장명
//   city      : 도시
//   country   : 국가
//   openDate  : 오픈 시점 문자열 (예: '2025', '2025.11', 'Coming soon')
//   status    : 'open'  = 오픈함  |  'upcoming' = 오픈 전(진행 중)
//   byMe      : true  = 서은(공간하음)이 직접 디자인·시공한 실적 매장
//               false = 이 SI 가이드라인을 바탕으로 브랜드가 확장한 사례(본인 작업 아님)
//   address   : (선택) 상세 주소/유닛
//   descKo    : (선택) 카드 설명 (한글)
//   descEn    : (선택) 카드 설명 (영문)
//   video     : (선택) 영상 URL
//   images    : (선택) 이미지 경로 배열
//
// ★ 크레딧 원칙 ★
//   - byMe:true  → "내 실적 매장"으로 또렷이 노출되고 스탯 매장 수에 자동 카운트됨.
//   - byMe:false → "브랜드 확장(SI 적용)"으로 분리 노출되며 실적 카운트에서 제외됨.
//   - status:'upcoming' → "Coming soon / 진행 중"으로만 표시(오픈 전, 카운트 제외).
// ─────────────────────────────────────────────────────────────

export const stores = [
  // ── 서은(공간하음) 직접 디자인·시공 실적 : 싱가폴 ──
  {
    no: 1,
    name: 'Mandarin Gallery',
    city: 'Singapore',
    country: 'Singapore',
    openDate: '2025',
    status: 'open',
    byMe: true,
    address: '333A Orchard Rd, #03-30, Singapore 238867',
    descKo: '싱가포르 최초의 프리미엄 두부 젤라또 — 1호점 플래그십. 공간 컨셉·디자인·시공 전 과정 담당.',
    descEn: "Singapore's first premium tofu gelato — the flagship first store. Led concept, design and construction end-to-end.",
  },
  {
    no: 2,
    name: 'Takashimaya',
    city: 'Singapore',
    country: 'Singapore',
    openDate: '2025',
    status: 'open',
    byMe: true,
    address: '391 Orchard Rd, #B1-29, Singapore 238873',
    descKo: '한국 아틀리에 컨셉의 리테일 매장. SI 가이드라인을 적용해 직접 디자인·시공.',
    descEn: 'Korean atelier-inspired retail store — designed and built directly on the SI guideline.',
  },
  {
    no: 3,
    name: 'AiFOKATO · Telok Ayer',
    city: 'Singapore',
    country: 'Singapore',
    openDate: '2025',
    status: 'open',
    byMe: true,
    address: '111 Telok Ayer St, Singapore 068582',
    descKo: '아포가토 전문 서브 브랜드 플래그십. ONE CUP. ONE PERFECT MOMENT.',
    descEn: 'Affogato-focused sub-brand flagship. ONE CUP. ONE PERFECT MOMENT.',
  },

  // ── 4번째 싱가폴 매장 : 정보 받는 대로 아래 주석을 해제하고 채워주세요 (byMe:true) ──
  // 채우면 스탯 매장 수가 자동으로 '4'가 되고, 실적 그리드에 카드가 추가됩니다.
  // {
  //   no: 4,
  //   name: '',                 // 매장명
  //   city: 'Singapore',
  //   country: 'Singapore',
  //   openDate: '',             // 예: '2026'
  //   status: 'open',
  //   byMe: true,
  //   address: '',
  //   descKo: '',
  //   descEn: '',
  // },

  // ── 브랜드 확장 (SI 가이드라인 적용, 서은 직접 작업 아님) ──
  {
    no: 101,
    name: 'MODU · TRX',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    openDate: '2025',
    status: 'open',
    byMe: false,
    address: 'The Exchange TRX, Kuala Lumpur',
    descKo: '싱가폴에서 확립한 SI 가이드라인을 바탕으로 브랜드가 말레이시아로 확장한 사례.',
    descEn: 'The brand’s expansion into Malaysia, built on the SI guideline established in Singapore.',
  },
  {
    no: 102,
    name: 'Indonesia',
    city: 'Jakarta',
    country: 'Indonesia',
    openDate: 'Coming soon',
    status: 'upcoming',
    byMe: false,
    descKo: '동일한 SI 가이드라인을 바탕으로 브랜드가 인도네시아로 확장 진행 중 (오픈 전).',
    descEn: 'Brand expansion into Indonesia in progress on the same SI guideline (not yet open).',
  },
];

// ── 파생 값 (렌더/카운트에서 사용) ──
export const byMeStores = stores.filter((s) => s.byMe);                 // 내 실적(싱가폴)
export const expansionStores = stores.filter((s) => !s.byMe);          // 브랜드 확장(MY·ID)
export const byMeCount = byMeStores.length;                            // 내 실적 매장 수(스탯: 싱가폴)

// ── 시스템 footprint(히어로 스탯 밴드) ──
export const openStores = stores.filter((s) => s.status === 'open');   // 실제 오픈한 매장
export const openStoreCount = openStores.length;                       // 스탯: STORES (오픈 매장 총계)
export const allCountries = [...new Set(stores.map((s) => s.country))]; // 시스템이 닿은 국가(진행 중 포함)
export const countryCount = allCountries.length;                       // 스탯: COUNTRIES
export const expansionCountries = [...new Set(expansionStores.map((s) => s.country))];
