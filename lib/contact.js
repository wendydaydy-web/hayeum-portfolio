/* ─────────────────────────────────────────────────────────────
 * 문의 폼 공통 설정 & 전송 로직 — 단일 소스(single source of truth).
 * BENSON · TOFU·G · (추후) 메인 페이지 문의 폼이 모두 여기서 가져다 씁니다.
 *
 * ▸ 전송 방식: Web3Forms (무가입·서버리스). 고정 API로 POST 하면
 *   access key 에 등록된 이메일로 문의 내용이 발송됩니다.
 *
 * ▸ 바꿔야 할 값은 access key 하나뿐입니다:
 *   · WEB3FORMS_ACCESS_KEY 에 발급받은 키를 넣거나
 *   · .env.local 에  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-...
 *     로 넣으면 그 값이 우선 적용됩니다(코드 수정 없이 교체 가능).
 *
 *   ※ 수신 주소(eunseo.haumm@gmail.com)는 Web3Forms 에서 key 를 발급할 때
 *     입력한 이메일로 고정됩니다. 아래 CONTACT_EMAIL 은 표시/폴백용입니다.
 *
 * ▸ 동작:
 *   · ACCESS KEY 있음 → Web3Forms 로 POST(실제 메일 발송).
 *   · 키 없음         → mailto 폴백(사용자 메일 클라이언트가 열림).
 * ───────────────────────────────────────────────────────────── */

// 모든 문의 수신처 (표시·mailto 폴백용 — Web3Forms 수신 주소와 동일하게 유지)
export const CONTACT_EMAIL = 'eunseo.haumm@gmail.com';

// Web3Forms access key — 발급받은 키를 여기 넣거나 .env.local 로 주입
export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''; // 예: '1a2b3c4d-5e6f-7890-abcd-ef1234567890'

// Web3Forms 고정 엔드포인트 (변경 불필요)
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/**
 * 문의 폼 전송 공통 처리.
 * @param {Object}  data        - { name, email, message, botcheck }
 * @param {Object}  opts
 * @param {string}  opts.brand  - 메일 제목 접두 브랜드명 (예: 'BENSON', 'TOFU·G')
 * @returns {Promise<'sent'|'error'>}  UI 상태값
 *
 *  · botcheck(허니팟)에 값이 있으면 봇으로 간주 → 조용히 성공 처리(전송 안 함).
 *    Web3Forms 도 botcheck 필드를 자체 스팸 필터에 사용.
 */
export async function submitInquiry(data, { brand = '' } = {}) {
  const name = (data.name || '').toString().trim();
  const email = (data.email || '').toString().trim();
  const message = (data.message || '').toString().trim();
  const botcheck = data.botcheck; // 채워졌으면 봇

  // 허니팟에 값이 있다 = 봇. 전송하지 않고 성공한 척.
  if (botcheck) return 'sent';

  // 1) Web3Forms 실제 전송
  if (WEB3FORMS_ACCESS_KEY) {
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[${brand || 'HAUMM'}] 프로젝트 문의 — ${name}`,
          from_name: `${brand || 'HAUMM'} 문의폼`,
          name,
          email,
          message,
          botcheck: '', // Web3Forms 허니팟(빈 값 = 사람)
        }),
      });
      const json = await res.json().catch(() => ({}));
      return res.ok && json.success ? 'sent' : 'error';
    } catch {
      return 'error';
    }
  }

  // 2) mailto 폴백 — access key 미설정 시
  if (CONTACT_EMAIL) {
    const subject = encodeURIComponent(`[${brand || 'HAUMM'}] 프로젝트 문의 — ${name}`);
    const body = encodeURIComponent(`이름: ${name}\n이메일: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    return 'sent';
  }

  return 'sent';
}

/** 실제 자동 전송(Web3Forms)이 연결되어 있는지 여부. */
export const INQUIRY_ENABLED = Boolean(WEB3FORMS_ACCESS_KEY);
