// ─────────────────────────────────────────────────────────────
// TOFU·G 동기화 스크립트 — 하루 1회 실행 (GitHub Actions 또는 로컬)
//
//   구글 시트(CSV 게시)     → data/tofug-stores.generated.json
//   구글 Places API(선택)   → data/tofug-stats.generated.json
//
// 실행: node scripts/sync-tofug.mjs
//   필요 값(둘 다 선택 — 없으면 해당 단계 건너뜀, 사이트는 폴백으로 동작):
//     · TOFUG_SHEET_CSV_URL      (env 또는 data/tofug-config.js 의 sheetCsvUrl)
//     · GOOGLE_PLACES_API_KEY    (env 만 — 시크릿, 절대 커밋 금지)
//     · TOFUG_FLAGSHIP_PLACE_ID  (env 또는 config.flagshipPlaceId — 대표 평점 집계용)
//
// Node 18+ (전역 fetch 사용). 외부 의존성 없음.
// ─────────────────────────────────────────────────────────────

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { TOFUG_CONFIG } from '../data/tofug-config.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = join(HERE, '..', 'data');

const SHEET_CSV_URL = process.env.TOFUG_SHEET_CSV_URL || TOFUG_CONFIG.sheetCsvUrl || '';
const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const FLAGSHIP_PLACE_ID = process.env.TOFUG_FLAGSHIP_PLACE_ID || TOFUG_CONFIG.flagshipPlaceId || '';

// ── 작은 CSV 파서 (따옴표·쉼표·CRLF·"" 이스케이프 처리) ──
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 1; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field); field = '';
    } else if (ch === '\n') {
      row.push(field); field = ''; rows.push(row); row = [];
    } else if (ch === '\r') {
      // CRLF 의 \r 은 무시
    } else {
      field += ch;
    }
  }
  // 마지막 필드/행
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function rowsToObjects(matrix) {
  if (!matrix.length) return [];
  const header = matrix[0].map((h) => h.trim());
  return matrix.slice(1)
    .filter((r) => r.some((c) => String(c).trim() !== ''))   // 빈 줄 제거
    .map((r) => {
      const o = {};
      header.forEach((key, idx) => { if (key) o[key] = (r[idx] !== undefined ? r[idx].trim() : ''); });
      return o;
    })
    .filter((o) => o.name);   // name 없는 행 제외
}

async function syncStores() {
  if (!SHEET_CSV_URL) {
    console.log('· 시트 URL 없음 → 매장 동기화 건너뜀 (폴백 data/tofug-stores.js 유지)');
    return null;
  }
  const res = await fetch(SHEET_CSV_URL, { redirect: 'follow' });
  if (!res.ok) throw new Error(`시트 fetch 실패: HTTP ${res.status}`);
  const csv = await res.text();
  const objs = rowsToObjects(parseCSV(csv));
  writeFileSync(join(DATA, 'tofug-stores.generated.json'), JSON.stringify(objs, null, 2) + '\n');
  console.log(`· 매장 ${objs.length}행 → data/tofug-stores.generated.json`);
  return objs;
}

async function placeDetails(placeId) {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json'
    + `?place_id=${encodeURIComponent(placeId)}`
    + '&fields=name,rating,user_ratings_total,business_status'
    + `&key=${PLACES_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const j = await res.json();
  if (j.status !== 'OK' || !j.result) { console.log(`  (place ${placeId}: ${j.status})`); return null; }
  const r = j.result;
  return {
    name: r.name || '',
    rating: r.rating != null ? r.rating : null,
    reviews: r.user_ratings_total != null ? r.user_ratings_total : null,
    status: r.business_status || '',
  };
}

async function syncStats(storeObjs) {
  if (!PLACES_KEY) {
    console.log('· Places API 키 없음 → 평점 갱신 건너뜀 (폴백 data/tofug-stats.js 유지)');
    return;
  }
  // 시트가 없으면 storeObjs 가 null → flagship 만 조회
  const placeIds = new Set();
  if (FLAGSHIP_PLACE_ID) placeIds.add(FLAGSHIP_PLACE_ID);
  (storeObjs || []).forEach((s) => { if (s.placeId) placeIds.add(s.placeId.trim()); });

  const places = {};
  for (const id of placeIds) {
    const d = await placeDetails(id);
    if (d) places[id] = d;
  }

  const out = { places, asOf: new Date().toISOString().slice(0, 7).replace('-', '.') };
  const flagship = FLAGSHIP_PLACE_ID ? places[FLAGSHIP_PLACE_ID] : null;
  if (flagship && flagship.rating != null) {
    out.googleRating = flagship.rating;
    if (flagship.reviews != null) {
      out.reviewCount = flagship.reviews;
      out.reviewLabel = `${Number(flagship.reviews).toLocaleString('en-US')}+`;
    }
  }
  writeFileSync(join(DATA, 'tofug-stats.generated.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`· 구글 평점 ${Object.keys(places).length}곳 → data/tofug-stats.generated.json`);
}

(async () => {
  try {
    const storeObjs = await syncStores();
    await syncStats(storeObjs);
    console.log('완료.');
  } catch (err) {
    console.error('동기화 오류:', err.message);
    process.exit(1);
  }
})();
