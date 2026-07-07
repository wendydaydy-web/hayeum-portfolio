// ─────────────────────────────────────────────────────────────
// TOFU·G 매장 데이터 — 단일 소스 of truth (모든 숫자는 여기서 자동 계산)
//
// ★ 데이터 소스 우선순위 ★
//   1) data/tofug-stores.generated.json  (구글 시트 → GitHub Actions 가 하루 1회 동기화)
//   2) 위 파일이 비어 있으면 → 아래 rawStores 폴백 데이터
//   ⇒ 시트만 연결하면, 코드 수정 없이 "시트에 줄 추가 = 사이트 자동 반영" 됩니다.
//     (연결 방법은 data/tofug-config.js 및 scripts/sync-tofug.mjs 참고)
//
// ★ 시트 컬럼(헤더) ★  (대소문자 그대로)
//   name, city, country, openDate, status, byMe, mainImage, gallery, placeId, url
//   (선택) no, address, descKo, descEn, video
//     · status  : open | soon   (soon = 오픈 예정)
//     · byMe    : TRUE | FALSE   (TRUE = 서은/공간하음 직접 작업 — 전부 싱가폴)
//     · gallery : 파일명을 쉼표로 구분  (예: a.jpg, b.jpg, c.jpg)
//     · mainImage/gallery 가 비면 → "구글 플레이스 정보 카드"로 자동 대체(사진 대신 정보)
//
// ★ 표시 로직(사진 유무로 자동 분기) ★
//   byMe=TRUE  + 사진 O → SPACE 큰 갤러리 (1호점 플래그십 + 2~4호점 그리드)
//   byMe=FALSE + 사진 O → EXPANSION 사진 카드
//   사진 X (soon/미래) → EXPANSION "구글 플레이스 정보 카드"(이름·평점·위치·상태). 구글 사진은 가져오지 않음.
//
// ★ 크레딧 원칙 ★
//   내 작업(고정) = 싱가폴 byMe 매장 수(byMeCount). 브랜드 전체(증가) = brandTotalCount.
// ─────────────────────────────────────────────────────────────

import generatedRows from './tofug-stores.generated.json';

// ── 폴백 데이터 (시트 미연결 시 사용) ──
const rawStores = [
  // ── 내 작업 · 싱가폴 (byMe:true) ──
  {
    no: 1, name: 'Mandarin Gallery', city: 'Singapore', country: 'Singapore',
    openDate: '2025', status: 'open', byMe: true,
    address: '333A Orchard Rd, #03-30, Singapore 238867',
    descKo: '싱가포르 최초의 프리미엄 두부 젤라또 — 1호점 플래그십. 공간 컨셉·디자인·시공 전 과정 담당.',
    descEn: "Singapore's first premium tofu gelato — the flagship first store. Led concept, design and construction end-to-end.",
    // 1호점 타임랩스 (구 Design Process 영상). 비우면 검정 placeholder.
    video: 'https://framerusercontent.com/assets/aVYOmv4OpeHjgcDD1ZLrdcKk.mp4',
    mainImage: 'c75c6d_484e34ff6c744b8f9fbc8c867893796e~mv2.webp',
    gallery: [
      'c75c6d_484e34ff6c744b8f9fbc8c867893796e~mv2.webp',
      'c75c6d_957f8cd6bd774dffa90e87d1492e389b~mv2.webp',
      'c75c6d_08e8c91f01c5464b8308cd9f45f2c13c~mv2.webp',
      'mandarin-soybeans.jpg', 'mandarin-teapot.jpg', 'mandarin-menu.jpg',
    ].join(', '),
    placeId: '', url: '',
  },
  {
    no: 2, name: 'Takashimaya (Ngee Ann City)', city: 'Singapore', country: 'Singapore',
    openDate: '2025', status: 'open', byMe: true,
    address: 'Ngee Ann City, 391 Orchard Rd, Takashimaya S.C., Singapore 238872',
    descKo: '오차드로드의 상징적인 다카시마야 쇼핑센터 내에 위치해, 상쾌하고 건강한 디저트를 찾는 쇼핑객이 쉽게 들를 수 있는 2호점.',
    descEn: "Our Takashimaya outlet is situated within Orchard Road's iconic Takashimaya Shopping Centre, making it easily accessible for shoppers seeking a refreshing, healthy dessert option.",
    video: '', mainImage: '', gallery: '', placeId: '', url: '',
  },
  {
    no: 3, name: 'UE Square', city: 'Singapore', country: 'Singapore',
    openDate: '2025', status: 'open', byMe: true,
    address: 'UE Square, 81 Clemenceau Ave, Singapore 239917',
    descKo: '싱가포르강을 따라 자리한 UE Square 3호점. 오피스 인파와 방문객 모두에게 상쾌한 한 끼가 되어주는 아늑한 공간.',
    descEn: "Located at UE Square along the Singapore River, this outlet offers a cozy spot for Tofu G's Korean-style tofu gelato — perfect for a refreshing treat for both office crowds and visitors.",
    video: '', mainImage: '', gallery: '', placeId: '', url: '',
  },
  {
    no: 4, name: '97 Amoy Street', city: 'Singapore', country: 'Singapore',
    openDate: '2025', status: 'open', byMe: true,
    address: '97 Amoy St, Singapore 069917',
    descKo: 'CBD 중심 97 암오이 스트리트에 위치해, 오피스 인파와 인근 방문객에게 안성맞춤인 프리미엄 두부 젤라또 4호점.',
    descEn: 'Located at 97 Amoy Street in the CBD, our outlet offers a cozy spot for premium tofu-based gelato, ideal for office crowds and nearby visitors.',
    mainImage: '', gallery: '', placeId: '', url: '',
  },

  // ── 브랜드 확장 (byMe:false) ──
  {
    no: 101, name: 'MODU · TRX', city: 'Kuala Lumpur', country: 'Malaysia',
    openDate: '2025.11', status: 'open', byMe: false,
    address: 'The Exchange TRX, Kuala Lumpur',
    descKo: '싱가폴에서 확립한 SI 가이드라인을 바탕으로 브랜드가 말레이시아로 확장한 사례.',
    descEn: 'The brand’s expansion into Malaysia, built on the SI guideline established in Singapore.',
    mainImage: '', gallery: '',   // 고화질 이미지 재삽입 예정 → 사진 넣으면 자동으로 사진 카드
    placeId: '', url: '',
  },
  {
    no: 102, name: 'Indonesia', city: 'Jakarta', country: 'Indonesia',
    openDate: 'Coming soon', status: 'soon', byMe: false, address: '',
    descKo: '동일한 SI 가이드라인을 바탕으로 브랜드가 인도네시아로 확장 진행 중 (오픈 전).',
    descEn: 'Brand expansion into Indonesia in progress on the same SI guideline (not yet open).',
    mainImage: '', gallery: '', placeId: '', url: '',
  },

  // ── 브랜드 확장 · 싱가폴 곧 오픈 (byMe:false, soon) — 내 작업 아님. 카운트/‘soon’ 표기만 ──
  {
    no: 103, name: 'Great World', city: 'Singapore', country: 'Singapore',
    openDate: 'Coming soon', status: 'soon', byMe: false,
    address: 'Great World MRT, Singapore',
    descKo: '그레이트월드역 — 오픈 예정 (브랜드 확장).',
    descEn: 'Great World MRT — coming soon (brand expansion).',
    mainImage: '', gallery: '', placeId: '', url: '',
  },
  {
    no: 104, name: 'HarbourFront', city: 'Singapore', country: 'Singapore',
    openDate: 'Coming soon', status: 'soon', byMe: false,
    address: 'HarbourFront MRT, Singapore',
    descKo: '하버프론트역 — 오픈 예정 (브랜드 확장).',
    descEn: 'HarbourFront MRT — coming soon (brand expansion).',
    mainImage: '', gallery: '', placeId: '', url: '',
  },
  {
    no: 105, name: 'Raffles City', city: 'Singapore', country: 'Singapore',
    openDate: 'Coming soon', status: 'soon', byMe: false,
    address: 'Raffles City / City Hall MRT, Singapore',
    descKo: '래플즈시티 — 오픈 예정 (브랜드 확장).',
    descEn: 'Raffles City — coming soon (brand expansion).',
    mainImage: '', gallery: '', placeId: '', url: '',
  },
];

// ── 정규화 헬퍼 (시트 셀 값도 안전하게 처리) ──
const toBool = (v) => v === true || String(v).trim().toUpperCase() === 'TRUE';
const normStatus = (v) => {
  const s = String(v || '').trim().toLowerCase();
  return (s === 'soon' || s === 'upcoming' || s === 'coming soon') ? 'upcoming' : 'open';
};
const splitList = (v) => (Array.isArray(v)
  ? v.filter(Boolean)
  : String(v || '').split(',').map((x) => x.trim()).filter(Boolean));
const str = (v) => (v == null ? '' : String(v).trim());

function normalizeRow(row) {
  const s = {
    name: str(row.name),
    city: str(row.city),
    country: str(row.country),
    openDate: str(row.openDate),
    status: normStatus(row.status),
    byMe: toBool(row.byMe),
    address: str(row.address),
    descKo: str(row.descKo),
    descEn: str(row.descEn),
    mainImage: str(row.mainImage),
    gallery: splitList(row.gallery),
    placeId: str(row.placeId),
    url: str(row.url),
  };
  // video: 있으면 URL, 명시적 빈 값('')이면 타임랩스 placeholder 용으로 유지, 없으면 필드 자체 생략
  if (row.video !== undefined && row.video !== null) s.video = str(row.video);
  if (row.no !== undefined && row.no !== null && String(row.no).trim() !== '') s.no = Number(row.no);
  return s;
}

// no 가 없으면 byMe 는 1,2,3…, 확장은 101,102… 로 자동 부여 (호점 라벨/정렬용)
function buildStores(rows) {
  let byMeN = 0;
  let expN = 0;
  return rows.map((raw) => {
    const s = normalizeRow(raw);
    if (s.byMe) { byMeN += 1; if (s.no == null || Number.isNaN(s.no)) s.no = byMeN; }
    else { expN += 1; if (s.no == null || Number.isNaN(s.no)) s.no = 100 + expN; }
    return s;
  });
}

// ─────────────────────────────────────────────────────────────
// 데이터 접근부 (Data Access Layer)
//   시트 동기화 결과(generated.json)가 있으면 그걸, 없으면 폴백을 사용.
// ─────────────────────────────────────────────────────────────
export function getStores() {
  const rows = (Array.isArray(generatedRows) && generatedRows.length > 0) ? generatedRows : rawStores;
  return buildStores(rows);
}

export const stores = getStores();

// 사진 유무 판정 (표시 분기의 핵심)
export const hasPhotos = (s) => Boolean(s && (s.mainImage || (Array.isArray(s.gallery) && s.gallery.length > 0)));

// ── 내 작업(고정): 싱가폴 byMe ──
export const byMeStores = stores.filter((s) => s.byMe);
export const expansionStores = stores.filter((s) => !s.byMe);
export const byMeCount = byMeStores.length;                 // 내 작업 매장 수(싱가폴) — 유지

// 1호점 플래그십 / 2~n호점 그리드
export const flagshipStore = byMeStores[0] || null;
export const spaceGridStores = byMeStores.slice(1);        // 1호점 제외한 내 작업(2~4호점)

// 브랜드 확장 — 사진 유무로 분기 (카드 스타일)
export const expansionPhotoStores = expansionStores.filter(hasPhotos);      // 사진 카드
export const expansionInfoStores = expansionStores.filter((s) => !hasPhotos(s)); // 플레이스 정보 카드

// ── EXPANSION 두 그룹 정리 (나라 혼란 방지) ──
//   그룹 B "곧 오픈 · 싱가폴": 싱가폴 soon 확장 매장 → compact 정보 칩
//   그룹 A "시스템 적용": 그 외 해외 확장 매장(말레이·인니 등) → 사진 있으면 사진 카드, 없으면 정보 카드
const isSgSoon = (s) => !s.byMe && s.status === 'upcoming' && s.country === 'Singapore';
export const expansionSoonStores = expansionStores.filter(isSgSoon);          // 그룹 B (칩)
export const expansionMainStores = expansionStores.filter((s) => !isSgSoon(s)); // 그룹 A (사진/정보 카드)

// ── 타임랩스: 내 작업 1~3호점 (각 매장 video 필드로 재생/placeholder) ──
export const timelapseStores = byMeStores.slice(0, 3);

// ── 운영/집계 ──
export const openStores = stores.filter((s) => s.status === 'open');
export const openStoreCount = openStores.length;
export const soonStores = stores.filter((s) => s.status === 'upcoming');
export const soonStoreCount = soonStores.length;
export const upcomingStores = soonStores;                  // (구 이름 호환)
export const brandTotalCount = stores.length;              // 브랜드 전체(계속 증가)

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
  return order.map((k) => {
    const c = map.get(k);
    return { ...c, mine: c.byMe > 0 };   // byMe 매장이 하나라도 있으면 "내 작업 국가"
  });
}

export const countries = countrySummary();
export const countryCount = countries.length;                                      // 진출 국가 수(인니 포함)

// ── EXPANSION "브랜드 여정" : 나라별(등장 순서) 대표 이미지 + 매장 수 + 예정/추가 칩 ──
export function countryJourney() {
  const order = [];
  const map = new Map();
  for (const s of stores) {
    if (!map.has(s.country)) { order.push(s.country); map.set(s.country, []); }
    map.get(s.country).push(s);
  }
  return order.map((country) => {
    const list = map.get(country);
    const open = list.filter((s) => s.status === 'open');
    const soon = list.filter((s) => s.status === 'upcoming');
    const byMe = list.filter((s) => s.byMe);
    const rep = list.find(hasPhotos) || open[0] || list[0];        // 대표 이미지용 매장 (사진 있는 매장 우선)
    const chips = list;                                           // 그 나라 매장 전부 칩으로 나열 (대표=1호점 포함)
    return {
      country,
      total: list.length,
      openCount: open.length,
      soonCount: soon.length,
      byMeCount: byMe.length,
      mine: byMe.length > 0,                                       // 내 작업 국가(싱가폴)
      repImage: rep && rep.mainImage ? rep.mainImage : '',         // 없으면 '' → placeholder
      repName: rep ? rep.name : country,
      openDate: (open[0] && open[0].openDate) || '',
      chips,
    };
  });
}
export const journey = countryJourney();
export const expansionCountryNames = countries.filter((c) => !c.mine).map((c) => c.country); // 확장 국가명(동적)
export const operatingCountryCount = countries.filter((c) => c.open > 0).length;   // 운영 중 국가 수
export const upcomingCountryCount = countries.filter((c) => c.open === 0 && c.upcoming > 0).length;

// ── As of (최신 오픈 월) : open 매장의 openDate 중 최대값 ──
export const asOf = openStores
  .map((s) => s.openDate)
  .filter(Boolean)
  .sort()
  .slice(-1)[0] || '';
