// ─────────────────────────────────────────────────────────────
// TOFU·G 매장 데이터 — 단일 소스 of truth (모든 숫자는 여기서 자동 계산)
//
// ★ 매장 추가/수정 ★
//   아래 `rawStores` 배열에 객체 한 줄을 추가/수정하면 히어로 스탯·스크롤 바·
//   Expansion 카운터의 모든 숫자와 국가 목록이 자동 반영됩니다.
//   (국가는 하드코딩하지 않습니다 — country 값 기준으로 목록/개수를 동적 생성)
//
// ★ 필드 ★
//   no       : 정렬용 번호 (byMe 매장 1,2,3,4… / 확장 매장 101,102…)
//   name     : 매장명
//   city     : 도시
//   country  : 국가 (이 값으로 국가별 집계가 자동 생성됨 — 호주·일본 등 무엇이든 OK)
//   openDate : 오픈 시점 문자열 'YYYY' 또는 'YYYY.MM' (예: '2025', '2025.11')
//   status   : 'open' = 운영중 | 'upcoming' = 오픈 예정(soon, 카운트에선 open과 구분)
//   byMe     : true  = 서은(공간하음) 직접 실적 (전부 싱가폴)
//              false = SI 가이드라인 기반 브랜드 확장 (말레이·인니 등, 본인 작업 아님)
//   address/descKo/descEn : (선택) 카드 상세
//
// ★ 크레딧 원칙 ★
//   내 실적(고정) = 싱가폴 byMe 매장 + SI, 9개월.
//   브랜드 현황(자동) = 나라별 open/upcoming 집계. "내가 한 것"과 "브랜드 확장"을 뭉뚱그리지 않음.
//   인도네시아는 status:'upcoming' → "soon/예정"으로만 표시(운영 국가 수에서 제외).
//
// ★ 오픈 시 ★  status를 'upcoming' → 'open'으로 바꾸면 모든 숫자·표시가 자동 갱신됩니다.
// ★ 구글시트 연동 ★  데이터 접근부(getStores)만 교체하면 되도록 아래에 분리해 두었습니다.
// ─────────────────────────────────────────────────────────────

const rawStores = [
  // ── 내 실적 · 싱가폴 (byMe:true, open) ──
  {
    no: 1, name: 'Mandarin Gallery', city: 'Singapore', country: 'Singapore',
    openDate: '2025', status: 'open', byMe: true,
    address: '333A Orchard Rd, #03-30, Singapore 238867',
    descKo: '싱가포르 최초의 프리미엄 두부 젤라또 — 1호점 플래그십. 공간 컨셉·디자인·시공 전 과정 담당.',
    descEn: "Singapore's first premium tofu gelato — the flagship first store. Led concept, design and construction end-to-end.",
  },
  {
    no: 2, name: 'Takashimaya', city: 'Singapore', country: 'Singapore',
    openDate: '2025', status: 'open', byMe: true,
    address: '391 Orchard Rd, #B1-29, Singapore 238873',
    descKo: '한국 아틀리에 컨셉의 리테일 매장. SI 가이드라인을 적용해 직접 디자인·시공.',
    descEn: 'Korean atelier-inspired retail store — designed and built directly on the SI guideline.',
  },
  {
    no: 3, name: 'AiFOKATO · Telok Ayer', city: 'Singapore', country: 'Singapore',
    openDate: '2025', status: 'open', byMe: true,
    address: '111 Telok Ayer St, Singapore 068582',
    descKo: '아포가토 전문 서브 브랜드 플래그십. ONE CUP. ONE PERFECT MOMENT.',
    descEn: 'Affogato-focused sub-brand flagship. ONE CUP. ONE PERFECT MOMENT.',
  },
  {
    // ★★ 4호점: 아래 name/openDate/desc를 실제 매장 정보로 교체해 주세요 (byMe:true, open) ★★
    no: 4, name: 'Singapore · 4호점', city: 'Singapore', country: 'Singapore',
    openDate: '2025', status: 'open', byMe: true,
    address: '',
    descKo: '네 번째 싱가폴 매장 — 실제 매장명·주소·설명으로 교체해 주세요.',
    descEn: 'Fourth Singapore store — replace with the real store name, address and description.',
  },

  // ── 브랜드 확장 (byMe:false) ──
  {
    no: 101, name: 'MODU · TRX', city: 'Kuala Lumpur', country: 'Malaysia',
    openDate: '2025.11', status: 'open', byMe: false,
    address: 'The Exchange TRX, Kuala Lumpur',
    descKo: '싱가폴에서 확립한 SI 가이드라인을 바탕으로 브랜드가 말레이시아로 확장한 사례.',
    descEn: 'The brand’s expansion into Malaysia, built on the SI guideline established in Singapore.',
  },
  {
    no: 102, name: 'Indonesia', city: 'Jakarta', country: 'Indonesia',
    openDate: 'Coming soon', status: 'upcoming', byMe: false,
    address: '',
    descKo: '동일한 SI 가이드라인을 바탕으로 브랜드가 인도네시아로 확장 진행 중 (오픈 전).',
    descEn: 'Brand expansion into Indonesia in progress on the same SI guideline (not yet open).',
  },
];

// ─────────────────────────────────────────────────────────────
// 데이터 접근부 (Data Access Layer)
//   지금은 위 배열을 그대로 반환. 추후 구글 시트 연동 시 이 함수만
//   시트 fetch 결과를 반환하도록 교체하면 나머지 코드는 손대지 않아도 됩니다.
// ─────────────────────────────────────────────────────────────
export function getStores() {
  return rawStores;
}

export const stores = getStores();

// ── 내 실적(고정): 싱가폴 byMe ──
export const byMeStores = stores.filter((s) => s.byMe);
export const expansionStores = stores.filter((s) => !s.byMe);
export const byMeCount = byMeStores.length;                 // 히어로 STORES (싱가폴 4)

// ── 운영/집계 ──
export const openStores = stores.filter((s) => s.status === 'open');
export const openStoreCount = openStores.length;
export const upcomingStores = stores.filter((s) => s.status === 'upcoming');

// ── 국가별 동적 집계 (하드코딩 없음 — country 값으로 자동 생성, 첫 등장 순서 유지) ──
export function countrySummary() {
  const order = [];
  const map = new Map();
  for (const s of stores) {
    if (!map.has(s.country)) {
      order.push(s.country);
      map.set(s.country, { country: s.country, total: 0, open: 0, upcoming: 0, byMe: 0 });
    }
    const c = map.get(s.country);
    c.total += 1;
    if (s.status === 'open') c.open += 1;
    else if (s.status === 'upcoming') c.upcoming += 1;
    if (s.byMe) c.byMe += 1;
  }
  // 국가가 "내 작업"인지 여부(byMe 매장이 하나라도 있으면 mine)
  return order.map((k) => {
    const c = map.get(k);
    return { ...c, mine: c.byMe > 0 };
  });
}

export const countries = countrySummary();
export const operatingCountryCount = countries.filter((c) => c.open > 0).length;   // 운영 중 국가 수
export const upcomingCountryCount = countries.filter((c) => c.open === 0 && c.upcoming > 0).length;

// ── As of (최신 오픈 월) : open 매장의 openDate 중 최대값 ──
export const asOf = openStores
  .map((s) => s.openDate)
  .filter(Boolean)
  .sort()
  .slice(-1)[0] || '';
