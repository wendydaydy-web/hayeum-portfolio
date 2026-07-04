// ─────────────────────────────────────────────────────────────
// TOFU·G 데이터 소스 설정 — 코드 없이 "구글 시트"로 매장 관리
//
// 사이트는 방문자 부하가 없도록, 시트를 직접 읽지 않습니다.
// 대신 GitHub Actions(무료)가 하루 1회 시트를 읽어
//   data/tofug-stores.generated.json  (매장 목록)
//   data/tofug-stats.generated.json   (구글 평점/리뷰)
// 를 만들어 커밋 → 배포에 자동 반영됩니다.
//
// 아래 값은 "로컬에서 직접 동기화(npm run sync:tofug)" 할 때 쓰는 폴백입니다.
// 실제 운영에서는 GitHub Actions 시크릿에 넣는 것을 권장합니다(아래 참고).
//   · TOFUG_SHEET_CSV_URL     : 시트 CSV 게시 URL
//   · GOOGLE_PLACES_API_KEY   : 구글 Places API 키(시크릿 — 절대 코드에 커밋 X)
//
// 시트/키가 없으면 → 사이트는 data/tofug-stores.js 의 폴백 데이터로 그대로 동작합니다.
// ─────────────────────────────────────────────────────────────

export const TOFUG_CONFIG = {
  // 구글 시트를 "파일 → 공유 → 웹에 게시 → CSV" 로 발행한 URL.
  //   예: https://docs.google.com/spreadsheets/d/e/2PACX-xxxx/pub?gid=0&single=true&output=csv
  //   (환경변수 TOFUG_SHEET_CSV_URL 이 있으면 그게 우선합니다.)
  sheetCsvUrl: '',

  // 대표 평점/리뷰(OVERVIEW 상단 숫자) 집계용 1호점 구글 Place ID.
  //   비우면 시트의 각 매장 placeId 중 대표값을 쓰거나, 갱신을 건너뜁니다.
  flagshipPlaceId: '',
};
