// ─────────────────────────────────────────────────────────────
// TOFU·G 성과 지표 (구글 평점 · 리뷰 수 · 언론 보도)
//
// ★ 자동 갱신 구조 ★
//   평점(googleRating) · 리뷰 수(reviewCount) · 갱신일(asOf)은
//   추후 GitHub Actions(무료)가 매일 1회 구글 Places API를 호출해
//   이 파일의 값만 덮어쓰도록 만들 예정입니다. (API 키는 시크릿 분리)
//   → 사이트는 항상 이 저장값을 표시하므로 손으로 고칠 필요 없음.
//
//   getStats() 데이터 접근부만 교체하면(예: 시트/DB 연동) 나머지 코드는 그대로.
// ─────────────────────────────────────────────────────────────

const rawStats = {
  // ↓ GitHub Action이 매일 갱신할 값 (지금은 수동 초기값)
  googleRating: 4.8,          // 구글 평점
  reviewCount: 1400,          // 리뷰 수(원값) — 표시는 아래 reviewLabel
  reviewLabel: '1,400+',      // 표시용 라벨
  asOf: '2026.07',            // 갱신 시점 ("as of {asOf}")

  // 언론 보도 (수동 관리 — 매체 추가는 배열에 한 줄)
  //   url 채우면 카드 클릭 시 새 탭으로 원문 이동, 비우면 링크 비활성.
  press: [
    { outlet: 'Time Out',      date: 'Aug 2025', title: 'We Tried the Viral Korean Tofu Gelato', excerpt: '$8 per scoop — entirely worth it. Dairy-free without compromising creaminess.', url: '' },
    { outlet: 'Eatbook',       date: 'Jun 2025', title: 'Korean Tofu Gelato in Orchard',         excerpt: 'Dense, creamy goodness with earthy soy notes. Rustic wood & Korean decor.',        url: '' },
    { outlet: 'DanielFood',    date: 'Aug 2025', title: "Singapore's First Tofu Gelato Shop",     excerpt: 'Constantly full on a weekday afternoon. Black sesame had roasted depth.',           url: '' },
    { outlet: 'Little Day Out', date: 'Mar 2026', title: 'How Good Can Tofu Gelato Be?',           excerpt: '1,400+ Google reviews, 4.8 stars. As enjoyable as the most popular gelato shops.',   url: '' },
  ],
};

// ── 자동 갱신 결과 (GitHub Actions + 구글 Places API 가 하루 1회 덮어씀) ──
//   generated 가 비어 있으면 위 rawStats 로 폴백.
import generatedStats from './tofug-stats.generated.json';

// ── 데이터 접근부 ──
export function getStats() {
  const g = (generatedStats && typeof generatedStats === 'object') ? generatedStats : {};
  return {
    ...rawStats,
    ...(g.googleRating != null ? { googleRating: g.googleRating } : {}),
    ...(g.reviewCount != null ? { reviewCount: g.reviewCount } : {}),
    ...(g.reviewLabel ? { reviewLabel: g.reviewLabel } : {}),
    ...(g.asOf ? { asOf: g.asOf } : {}),
    press: rawStats.press,
    // placeId → { rating, reviews, name, status } (매장별 정보 카드용)
    places: (g.places && typeof g.places === 'object') ? g.places : {},
  };
}

export const stats = getStats();
export const pressCount = stats.press.length;

// 매장별 구글 평점 조회 (없으면 null) — PlaceInfoCard 에서 사용
export const placeRating = (placeId) => (placeId && stats.places[placeId]) || null;
