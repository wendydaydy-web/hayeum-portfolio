import Head from 'next/head';
import { ProjectNav, ProjectHero, ProjectFooter } from '../../components/project';
import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'story', label: 'Story' },
  { id: 'concept', label: 'Concept' },
  { id: 'mandarin', label: 'Gallery' },
  { id: 'locations', label: 'Locations' },
  { id: 'press', label: 'Press' },
];

const HERO_META = [
  { label: 'Project', value: 'TOFU G · Gelato' },
  { label: 'Category', value: 'F&B / Gelato' },
  { label: 'Year', value: '2025' },
  { label: 'Scope', value: 'Spatial Design / Branding' },
  { label: 'Location', value: 'Singapore · Kuala Lumpur' },
];

const I = (name) => `/images/tofug/${name}`;

function FadeIn({ children, className = '', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`fade-in ${className}`} style={style}>{children}</div>;
}

export default function TofuG() {
  return (
    <>
      <Head>
        <title>TOFU · G — Spatial Design</title>
      </Head>

      <ProjectNav sections={SECTIONS} accentColor="#a68b6b" />

      <ProjectHero
        title="TOFU · G"
        label="Space Concept · Spatial Design · Branding"
        image="https://framerusercontent.com/images/vForpcAJWD1kBVHipRHJhWa6eM.jpg"
        subtitleKo="한국 전통 두부 제조의 정성을 담은 프리미엄 젤라또 브랜드. 멧돌과 한국의 전통 주방에서 영감을 받은 공간디자인."
        subtitleEn="A premium gelato brand inspired by the craft of traditional Korean tofu-making. Spatial design drawn from millstones and the traditional Korean kitchen."
        meta={HERO_META}
      />

      {/* ── 01 BRAND STORY ── */}
      <section className="brand-story" id="story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">01 — Brand Story</p>
            <h2 className="section-title" data-ko>따뜻한 정성을<br />한 입의 젤라또에</h2>
            <h2 className="section-title" data-en>Warmth In<br />Every Scoop</h2>
            <p className="section-desc" data-ko>TOFU G는 따뜻한 집밥처럼, 한 입의 젤라또에 정성을 담습니다.<br /><br />한국의 전통 주방, 그곳은 하루의 온기가 시작되는 공간이었습니다. 두부는 그 안에서 시간과 정성을 들여 천천히 만들어졌습니다. 콩을 고르고, 불리고, 갈고, 끓이고, 고요하게 기다려 굳혀내는 그 모든 과정 속엔 음식을 향한 마음과 손끝의 애정이 고스란히 담겨 있습니다. 그렇게 탄생한 두부 한 모는 밥상 위에서 온기와 마음을 전하는 존재가 되었습니다.<br /><br />따뜻한 집밥은 언제나 정성 깃든 주방에서 시작됩니다. 누군가를 위해 밥상을 차린다는 건, 그 사람을 향한 마음을 시간과 손끝으로 표현하는 일이니까요.<br /><br />TOFU G는 그런 한국의 전통 주방에서 영감을 받아, 두부 한 모에 담긴 정성을 한 입의 젤라또에 담아 전합니다.</p>
            <p className="section-desc" data-en>TOFU G brings home-cooked warmth to every scoop of gelato.<br /><br />The traditional Korean kitchen was a place where the warmth of each day began. Tofu was made there slowly, with time and care — selecting the beans, soaking, grinding, boiling, and waiting in stillness until they set. Every step carried a deep affection for food, expressed through hands and heart. A single block of tofu, born from that process, became a vessel of warmth and care on the dining table.<br /><br />A warm home-cooked meal always begins in a kitchen filled with devotion. To prepare a meal for someone is to express love through time and the touch of one&apos;s hands.<br /><br />TOFU G draws inspiration from that traditional Korean kitchen, delivering the same care once found in a block of tofu — now in every scoop of gelato.</p>
          </FadeIn>
          <div className="story-grid">
            <FadeIn className="story-text">
              <div className="story-keywords">
                <span className="keyword">Tofu-Based</span>
                <span className="keyword">Live Churning</span>
                <span className="keyword">Vegan-Friendly</span>
              </div>
            </FadeIn>
            <FadeIn className="story-visual">
              <img src={I('은서-수정-tofug.png')} alt="TOFU G Gelato" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── VIDEO BREAK ── */}
      <div className="video-section">
        <video src="https://framerusercontent.com/assets/Cruq74mosNcGXhgtjz7fQtTsOo.mp4" autoPlay muted loop playsInline style={{ aspectRatio: 'auto', objectFit: 'contain' }} />
      </div>
      <div className="video-section" style={{ marginTop: 40 }}>
        <video src="https://framerusercontent.com/assets/Mrpr4s2lB7Aaio6hkDjjOi1ZU.mp4" autoPlay muted loop playsInline />
      </div>

      {/* ── 02 DESIGN INSPIRATION ── */}
      <section id="concept">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">02 — Design Inspiration</p>
            <h2 className="section-title">Heritage Elements</h2>
            <p className="section-desc" data-ko>한국 전통 두부 제조 과정에서 사용되는 세 가지 핵심 요소에서 공간과 브랜딩의 모티프를 도출했습니다. 원재료의 순수함과 장인의 정성을 공간으로 연결합니다.</p>
            <p className="section-desc" data-en>Three core elements from the traditional Korean tofu-making process inspired the spatial and branding motifs — connecting the purity of raw ingredients with artisan craftsmanship.</p>
          </FadeIn>
          <div className="inspiration-grid">
            <FadeIn className="inspiration-card">
              <img src={I('inspiration-kitchenware.png')} alt="Traditional kitchenware" />
              <span className="caption" data-ko>전통 집기</span>
              <span className="caption" data-en>Traditional Kitchenware</span>
            </FadeIn>
            <FadeIn className="inspiration-card">
              <img src={I('inspiration-cotton.png')} alt="Unbleached cotton" />
              <span className="caption" data-ko>헝겊</span>
              <span className="caption" data-en>Unbleached Cotton</span>
            </FadeIn>
            <FadeIn className="inspiration-card">
              <img src={I('inspiration-millstone.jpg')} alt="Millstone" />
              <span className="caption" data-ko>멧돌</span>
              <span className="caption" data-en>Millstone</span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 03 SPATIAL CONCEPT ── */}
      <section className="brand-story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">03 — Spatial Concept</p>
            <h2 className="section-title">Korean Atelier</h2>
          </FadeIn>

          {/* Concept 1 */}
          <FadeIn className="concept-block">
            <div className="concept-text">
              <h3 data-ko>전통 주방에서 영감받은 공간</h3>
              <h3 data-en>Traditional Kitchen-Inspired Space</h3>
              <p data-ko>전통 음식은 그 나라의 문화를 닮습니다. 그리고 그 음식이 만들어지는 주방은, 한중일 전통 가옥 중에서도 문화의 결이 가장 선명하게 배어나는 공간입니다. 린넨, 무표백 면, 원목 마감재로 오차드 로드의 럭셔리 리테일 환경 속에 고요한 한국의 주방을 구현했습니다.</p>
              <p data-en>Traditional food mirrors its country&apos;s culture. And the kitchen where that food is made is the space where cultural texture is most vividly felt — even among the traditional houses of Korea, China, and Japan. With linen, unbleached cotton, and wood finishes, a serene Korean kitchen was brought to life within Orchard Road&apos;s luxury retail environment.</p>
            </div>
            <div className="concept-img">
              <img src={I('concept-interior.png')} alt="TOFU G Interior" />
            </div>
          </FadeIn>

          {/* Concept 2 — reverse */}
          <FadeIn className="concept-block reverse" style={{ marginTop: 80 }}>
            <div className="concept-text">
              <h3 data-ko>멧돌 — 디자인 모티프</h3>
              <h3 data-en>Millstone — Design Motif</h3>
              <p data-ko>전통적으로 콩을 갈아 두부를 만들던 멧돌의 형상을 공간과 브랜딩의 핵심 모티프로 활용했습니다. 로고, 조명, 컵 디자인에 이르기까지 멧돌의 원형 패턴이 일관되게 적용됩니다.</p>
              <p data-en>The millstone — once used to grind soybeans into tofu — serves as the core motif across space and branding. From the logo and lighting to cup design, the circular millstone pattern is applied consistently throughout.</p>
            </div>
            <div className="concept-img">
              <img src={I('concept-millstone-soybeans.jpg')} alt="Millstone with soybeans" />
            </div>
          </FadeIn>

          {/* Concept 3 — Test Zone */}
          <FadeIn className="concept-block" style={{ marginTop: 80 }}>
            <div className="concept-text">
              <h3 data-ko>체험존 — Test Zone</h3>
              <h3 data-en>Experience Zone — Test Zone</h3>
              <p data-ko>인절미, 쑥, 말차 가루를 직접 체험할 수 있는 Test Zone을 제안했습니다. Tea House에서 티향을 테스트하는 감각적 체험으로, 외국인들에게 생소할 수 있는 한국의 전통 향을 간접적으로 알릴 수 있는 공간입니다.</p>
              <p data-en>Proposed a Test Zone where visitors can experience injeolmi, mugwort, and matcha powders firsthand. A sensory experience inspired by tea house tastings — an opportunity to introduce the traditional Korean aromas that may be unfamiliar to international visitors.</p>
            </div>
            <div className="concept-img">
              <img src={I('IMG_3399_jpg-1-scaled.jpg')} alt="Test Zone — Traditional Display" loading="lazy" />
            </div>
          </FadeIn>

          {/* Concept 4 — VMD (reverse) */}
          <FadeIn className="concept-block reverse" style={{ marginTop: 80 }}>
            <div className="concept-text">
              <h3 data-ko>VMD — 천과 멧돌의 재해석</h3>
              <h3 data-en>VMD — Reinterpreting Cloth &amp; Millstone</h3>
              <p data-ko>맷돌에서 콩이 갈리는 모습을 얇은 천으로 표현하는 VMD 디자인을 제안했습니다. 전통 맷돌을 현대적 디스플레이 테이블로 재해석한 3D 모델링(SketchUp)을 통해 공간 내 핵심 오브제로 구현했습니다.</p>
              <p data-en>Proposed a VMD design expressing the grinding of soybeans in a millstone through delicate fabric draping. Reinterpreted the traditional millstone as a modern display table via 3D modeling (SketchUp), creating a central spatial object.</p>
            </div>
            <div className="concept-img">
              <img src={I('tofu-g-10.jpg')} alt="VMD — Fabric & Millstone Display" loading="lazy" />
            </div>
          </FadeIn>

          {/* Gallery grid within section 03 */}
          <div className="gallery-grid" style={{ marginTop: 40 }}>
            <div className="gallery-item"><img src={I('tofuggelato8.jpg')} alt="VMD — Fabric Backdrop" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('tofu-g-6.jpg')} alt="VMD — Millstone Display Table" loading="lazy" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('tofuggelato3.jpg')} alt="Millstone & Gelato" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('tofu-g-2.webp')} alt="Millstone Table & Interior" loading="lazy" /></div>
            <div className="gallery-item"><img src={I('tofuggelato7.jpg')} alt="Fabric Lantern VMD" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* ── 04 MANDARIN GALLERY ── */}
      <section className="gallery-section" id="mandarin">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">04 — Singapore</p>
            <h2 className="section-title">Mandarin Gallery</h2>
            <p className="section-desc" data-ko>싱가포르 오차드 로드 만다린 갤러리 #03-30. 싱가포르 최초의 프레시 처닝 프리미엄 두부 젤라또. 1호점의 공간 브랜드 컨셉 기획부터 디자인, 시공까지 전 과정을 담당했습니다.</p>
            <p className="section-desc" data-en>333A Orchard Rd, #03-30 Mandarin Gallery. Singapore&apos;s first fresh-churned premium tofu gelato. Led the entire process from spatial brand concept to design and construction.</p>
          </FadeIn>
          <div style={{ margin: '48px auto' }}>
            <video src="https://framerusercontent.com/assets/wyZ1uDexYFoC0GcYvhAq84wp4s.mp4" autoPlay muted loop playsInline style={{ width: '100%', borderRadius: 4 }} />
          </div>
          <div className="gallery-grid">
            <div className="gallery-item wide"><img src={I('c75c6d_484e34ff6c744b8f9fbc8c867893796e~mv2.webp')} alt="Mandarin Gallery Interior" /></div>
            <div className="gallery-item"><img src={I('c75c6d_957f8cd6bd774dffa90e87d1492e389b~mv2.webp')} alt="Store Overview" /></div>
            <div className="gallery-item"><img src={I('c75c6d_08e8c91f01c5464b8308cd9f45f2c13c~mv2.webp')} alt="Gelato Display" /></div>
            <div className="gallery-item"><img src={I('mandarin-logo-wall.jpg')} alt="Logo Wall" /></div>
            <div className="gallery-item"><img src={I('c75c6d_b3828d36e34f480ca0d49fb5b4b477da~mv2.jpg')} alt="Spatial Details" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('mandarin-soybeans.jpg')} alt="Soybeans" /></div>
            <div className="gallery-item"><img src={I('mandarin-teapot.jpg')} alt="Korean teapot" /></div>
            <div className="gallery-item"><img src={I('mandarin-menu.jpg')} alt="Menu board" /></div>
          </div>
        </div>
      </section>

      {/* ── DESIGN PROCESS FILM ── */}
      <FadeIn className="process-video-wrap">
        <p className="process-label">Spatial Design Process</p>
        <h3 className="process-title" data-ko>1호점 공간 디자인 Full Process</h3>
        <h3 className="process-title" data-en>Flagship Store Design Process</h3>
        <p className="process-desc" data-ko>컨셉 스케치부터 3D 모델링, 마감재 선정, 최종 시공까지 —<br />브랜드 공간 가이드라인을 확립한 전체 디자인 과정을 담은 영상입니다.</p>
        <p className="process-desc" data-en>From concept sketches to 3D modeling, material selection, and final construction —<br />the complete design process that established the brand&apos;s spatial guideline.</p>
        <video src="https://framerusercontent.com/assets/aVYOmv4OpeHjgcDD1ZLrdcKk.mp4" autoPlay muted loop playsInline />
        <div className="process-footer">
          <div><div className="process-stat-num">10h+</div><div className="process-stat-label">Design Hours</div></div>
          <div><div className="process-stat-num">1st</div><div className="process-stat-label">Brand Spatial Guide</div></div>
          <div><div className="process-stat-num">4</div><div className="process-stat-label">Stores Applied</div></div>
        </div>
      </FadeIn>

      {/* ── 05 TAKASHIMAYA ── */}
      <section>
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">05 — Singapore</p>
            <h2 className="section-title">Takashimaya</h2>
            <p className="section-desc" data-ko>391 Orchard Rd, Takashimaya #B1-29. 한국 아틀리에 컨셉의 공간 — 오차드 럭셔리 허브 내 유일한 한국 디저트 컨셉.</p>
            <p className="section-desc" data-en>391 Orchard Rd, Takashimaya #B1-29. Korean atelier-inspired design — the only Korean dessert concept in Orchard&apos;s luxury hub.</p>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 60 }}>
            <div className="gallery-item"><img src={I('c75c6d_d0bf8769185e4e7f87bb9545925c75aa~mv2.jpg')} alt="Takashimaya 1" /></div>
            <div className="gallery-item"><img src={I('c75c6d_2c0234f4b585438fbe1db11224446371~mv2.jpg')} alt="Takashimaya 2" /></div>
            <div className="gallery-item"><img src={I('c75c6d_b5a53dd11256403eabcf16fbd83d43ee~mv2.jpg')} alt="Takashimaya 3" /></div>
            <div className="gallery-item"><img src={I('c75c6d_f6c8ce3c0dc64f8a93fdcf631be405b5~mv2.jpg')} alt="Takashimaya 4" /></div>
          </div>
        </div>
      </section>

      {/* ── 06 MODU TRX ── */}
      <section>
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">06 — Kuala Lumpur</p>
            <h2 className="section-title">MODU TRX</h2>
            <p className="section-desc" data-ko>말레이시아 TRX 몰 내 한식 다이닝 &amp; 젤라또 컨셉의 해외 확장 매장.</p>
            <p className="section-desc" data-en>International expansion — Korean dining &amp; gelato concept in Malaysia&apos;s landmark TRX Mall.</p>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 60 }}>
            <div className="gallery-item"><img src={I('tofuft.jpg')} alt="MODU TRX Storefront" /></div>
            <div className="gallery-item"><img src={I('20251119_TOFUGtrx_IMG015.jpg')} alt="TOFU G TRX" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('tofu-g-1.jpg')} alt="TRX 1" /></div>
            <div className="gallery-item"><img src={I('tofu-g-2.jpg')} alt="TRX 2" /></div>
            <div className="gallery-item"><img src={I('tofu-g-3.jpg')} alt="TRX 3" /></div>
          </div>
        </div>
      </section>

      {/* ── 07 AiFOKATO ── */}
      <section className="brand-story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">07 — Singapore</p>
            <h2 className="section-title">AiFOKATO</h2>
          </FadeIn>
          <FadeIn className="concept-block">
            <div className="concept-text">
              <h3 data-ko>&ldquo;A Single Perfect Moment&rdquo;</h3>
              <h3 data-en>&ldquo;A Single Perfect Moment&rdquo;</h3>
              <p data-ko>도시의 빠른 리듬 속에서, 한 잔의 아포가토로 잠시 멈추는 완벽한 순간을 제공하는 서브 브랜드. ONE CUP. ONE PERFECT MOMENT. 결정 피로를 최소화하면서 커스터마이제이션을 제공하는 아포가토 전문 컨셉입니다.</p>
              <p data-en>A sub-brand born to offer a sense of calm through a single cup of affogato. ONE CUP. ONE PERFECT MOMENT. Concentrating on one core product minimizes decision fatigue while offering customization within choices.</p>
            </div>
            <div className="concept-img">
              <img src={I('c75c6d_1b7878e6e65c4282a03469eae2a24294~mv2.webp')} alt="AiFOKATO Facade" />
            </div>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 40 }}>
            <div className="gallery-item"><img src={I('c75c6d_ec9b9373d90247cca5566236ac9c6ea4~mv2.webp')} alt="AiFOKATO Facade 2" /></div>
            <div className="gallery-item"><img src={I('c75c6d_57942d49647e47569b5c09de875bcc52~mv2.jpg')} alt="AiFOKATO Interior" /></div>
          </div>
        </div>
      </section>

      {/* ── 08 TECHNICAL DRAWINGS ── */}
      <section className="brand-story">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">08 — Technical</p>
            <h2 className="section-title">Floor Plan · Elevation</h2>
          </FadeIn>
          <div className="drawings-grid">
            <FadeIn className="drawing-card"><img src={I('drawing-floorplan.jpg')} alt="Floor Plan" /></FadeIn>
            <FadeIn className="drawing-card"><img src={I('drawing-elevation.jpg')} alt="Elevation" /></FadeIn>
          </div>
        </div>
      </section>

      {/* ── 09 LOCATIONS ── */}
      <section id="locations">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">09 — Locations</p>
            <h2 className="section-title">All Stores</h2>
          </FadeIn>
          <div className="locations-grid">
            <FadeIn className="location-card">
              <h4>Mandarin Gallery</h4>
              <p className="loc-sub">Pop-up · #03-30</p>
              <p data-ko>333A Orchard Rd, Singapore 238867<br />싱가포르 최초의 프리미엄 두부 젤라또.</p>
              <p data-en>333A Orchard Rd, Singapore 238867<br />Singapore&apos;s first premium tofu gelato.</p>
            </FadeIn>
            <FadeIn className="location-card">
              <h4>Takashimaya</h4>
              <p className="loc-sub">Takashimaya · #B1-29</p>
              <p data-ko>391 Orchard Rd, Singapore 238873<br />한국 아틀리에 컨셉의 리테일 매장.</p>
              <p data-en>391 Orchard Rd, Singapore 238873<br />Korean atelier-inspired retail store.</p>
            </FadeIn>
            <FadeIn className="location-card">
              <h4>AiFOKATO</h4>
              <p className="loc-sub">Telok Ayer · Flagship</p>
              <p data-ko>111 Telok Ayer St, Singapore 068582<br />아포가토 전문 서브 브랜드.</p>
              <p data-en>111 Telok Ayer St, Singapore 068582<br />Affogato-focused sub-brand.</p>
            </FadeIn>
            <FadeIn className="location-card">
              <h4>MODU TRX</h4>
              <p className="loc-sub">Kuala Lumpur · Malaysia</p>
              <p data-ko>The Exchange TRX, Kuala Lumpur<br />한식 다이닝 &amp; 젤라또 해외 확장.</p>
              <p data-en>The Exchange TRX, Kuala Lumpur<br />Korean dining &amp; gelato expansion.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="impact">
        <div className="section-inner">
          <div className="impact-grid">
            <FadeIn><div className="impact-num">4.8</div><div className="impact-label">Google Rating</div></FadeIn>
            <FadeIn><div className="impact-num">1,400+</div><div className="impact-label">Reviews</div></FadeIn>
            <FadeIn><div className="impact-num">4</div><div className="impact-label">Locations</div></FadeIn>
          </div>
        </div>
      </section>

      {/* ── 10 PRESS ── */}
      <section id="press">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">10 — Press</p>
            <h2 className="section-title">Media Coverage</h2>
          </FadeIn>
          <div className="press-strip">
            <div className="press-card"><p className="press-pub">Time Out · Aug 2025</p><h4 className="press-headline">We Tried the Viral Korean Tofu Gelato — Worth the Hype</h4><p className="press-snippet">$8 per scoop — entirely worth the dollar. Dairy-free without compromising creaminess.</p></div>
            <div className="press-card"><p className="press-pub">Eatbook · Jun 2025</p><h4 className="press-headline">Tofu G Gelato — Korean Tofu Gelato in Orchard</h4><p className="press-snippet">Dense, creamy goodness with earthy, nutty soy notes. Rustic wood &amp; Korean-inspired decor.</p></div>
            <div className="press-card"><p className="press-pub">DanielFood · Aug 2025</p><h4 className="press-headline">Singapore&apos;s First Tofu Gelato Shop</h4><p className="press-snippet">Weekday afternoon — shop constantly full. Black sesame had roasted depth.</p></div>
            <div className="press-card"><p className="press-pub">MiddleClass · Jan 2026</p><h4 className="press-headline">Korean Tofu Gelato Pop-Up in Orchard</h4><p className="press-snippet">Pop-up space reminiscent of Seongsu with Korean aesthetics and wood decor.</p></div>
            <div className="press-card"><p className="press-pub">GreatNewPlaces · Jan 2026</p><h4 className="press-headline">TOFU G @ Takashimaya — Viral Success</h4><p className="press-snippet">Korean atelier-inspired design. The only Korean dessert concept in Orchard luxury hub.</p></div>
            <div className="press-card"><p className="press-pub">Confirm Good · Jul 2025</p><h4 className="press-headline">Vegan, Dairy-Free Tofu Gelato</h4><p className="press-snippet">Modern hanok interior with warm lighting. Freshly churned in front of you.</p></div>
            <div className="press-card"><p className="press-pub">Little Day Out · Mar 2026</p><h4 className="press-headline">How Good Can Tofu Gelato Be?</h4><p className="press-snippet">1,400+ Google reviews, 4.8 stars. As enjoyable as the most popular gelato shops.</p></div>
          </div>
        </div>
      </section>

      {/* ── 11 REVIEWS & MEDIA ── */}
      <section className="reviews">
        <div className="section-inner">
          <FadeIn>
            <p className="section-label">11 — As Seen In</p>
            <h2 className="section-title">Reviews &amp; Media</h2>
          </FadeIn>
          <div className="gallery-grid" style={{ marginTop: 60 }}>
            <div className="gallery-item"><img src={I('tofu-g-gelato-storefront.jpg')} alt="Storefront" /></div>
            <div className="gallery-item"><img src={I('tofu-g-gelato-flavours.jpg')} alt="Flavours" /></div>
            <div className="gallery-item"><img src={I('tofu-g-gelato-whirl.jpg')} alt="Gelato whirl" /></div>
            <div className="gallery-item"><img src={I('tofu-g-gelato-tofu.jpg')} alt="Tofu gelato" /></div>
          </div>
          <div className="gallery-3col" style={{ marginTop: 20 }}>
            <div className="gallery-item"><img src={I('tofu-g-gelato-blacksesame.jpg')} alt="Black Sesame" /></div>
            <div className="gallery-item"><img src={I('tofu-g-gelato-pistachio.jpg')} alt="Pistachio" /></div>
            <div className="gallery-item"><img src={I('review-gelato-cup.jpg')} alt="Gelato Cup" /></div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <ProjectFooter
        prevProject={{ name: 'SOLDAM MARKET', href: '/projects/soldam' }}
        nextProject={{ name: 'BENSON', href: '/projects/benson' }}
      />

      <style jsx>{`
        /* ===== TOFUG THEME OVERRIDES ===== */
        :global(:root) {
          --warm: #a68b6b;
          --warm-dark: #8a7259;
          --dark: #1a1a1a;
          --gray: #888;
          --max-width: 1400px;
          --page-bg: #fff;
          --page-fg: #1a1a1a;
          --section-bg: #f8f6f3;
          --text-mid: #555;
          --text-light: #666;
          --border-light: rgba(0,0,0,0.08);
          --border-subtle: rgba(0,0,0,0.05);
          --nav-scrolled-bg: rgba(255,255,255,0.9);
          --keyword-border: #1a1a1a;
          --keyword-color: #1a1a1a;
        }
        @media (prefers-color-scheme: dark) {
          :global(:root) {
            --page-bg: #0f0e0e;
            --page-fg: #f0efeb;
            --section-bg: #1a1a1a;
            --text-mid: #aaa;
            --text-light: #999;
            --gray: #999;
            --border-light: rgba(255,255,255,0.08);
            --border-subtle: rgba(255,255,255,0.05);
            --nav-scrolled-bg: rgba(15,14,14,0.9);
            --keyword-border: #f0efeb;
            --keyword-color: #f0efeb;
          }
        }
        :global(body) {
          background: var(--page-bg);
          color: var(--page-fg);
        }

        /* ===== SECTION COMMON ===== */
        section { padding: 120px 60px; }
        .section-inner { max-width: var(--max-width); margin: 0 auto; }
        .section-label {
          font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--warm); margin-bottom: 16px; font-weight: 600;
        }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 4vw, 42px); line-height: 1.1;
          margin-bottom: 24px; letter-spacing: 1px;
        }
        .section-desc {
          font-size: 15px; line-height: 1.9; color: var(--text-mid);
          max-width: 680px; font-weight: 300;
        }

        /* ===== BRAND STORY ===== */
        .brand-story { background: var(--section-bg); }
        .story-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          align-items: stretch; margin-top: 60px;
        }
        .story-grid :global(.story-text) {
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .story-grid :global(.story-visual) {
          position: relative; border-radius: 4px; overflow: hidden;
        }
        .story-grid :global(.story-visual) img { width: 100%; height: 100%; object-fit: cover; }
        .story-keywords { display: flex; gap: 16px; margin-top: 40px; flex-wrap: wrap; }
        .keyword {
          padding: 10px 24px; border: 1px solid var(--keyword-border);
          border-radius: 50px; font-size: 12px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase; color: var(--keyword-color);
        }

        /* ===== INSPIRATION ===== */
        .inspiration-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 30px; margin-top: 60px;
        }
        :global(.inspiration-card) {
          position: relative; overflow: hidden; border-radius: 4px;
          aspect-ratio: 1; background: var(--section-bg);
        }
        :global(.inspiration-card) img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
        }
        :global(.inspiration-card:hover) img { transform: scale(1.05); }
        :global(.inspiration-card) .caption {
          position: absolute; bottom: 20px; left: 20px; color: #fff;
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          font-weight: 500; background: rgba(0,0,0,0.4); padding: 8px 16px;
          border-radius: 2px; backdrop-filter: blur(4px);
        }

        /* ===== CONCEPT BLOCKS ===== */
        :global(.concept-block) {
          display: grid; grid-template-columns: 1fr 1.2fr;
          gap: 60px; align-items: center; margin-top: 60px;
        }
        :global(.concept-block.reverse) { grid-template-columns: 1.2fr 1fr; }
        :global(.concept-block.reverse) .concept-text { order: 1; }
        :global(.concept-block.reverse) .concept-img { order: 0; }
        .concept-img { border-radius: 4px; overflow: hidden; }
        .concept-img img { width: 100%; display: block; transition: transform 0.6s ease; }
        .concept-img:hover img { transform: scale(1.03); }
        .concept-text h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px; letter-spacing: 3px; margin-bottom: 16px;
        }
        .concept-text p {
          font-size: 14px; line-height: 1.9; color: var(--text-mid); font-weight: 300;
        }

        /* ===== VIDEO ===== */
        .video-section { max-width: 900px; margin: 0 auto; padding: 0 40px; }
        .video-section video {
          width: 100%; aspect-ratio: 16/9; height: auto;
          display: block; border-radius: 4px; object-fit: cover;
        }
        :global(.process-video-wrap) {
          max-width: 900px; margin: 0 auto; padding: 80px 40px; text-align: center;
        }
        .process-label {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--warm); margin-bottom: 12px;
        }
        .process-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px;
          letter-spacing: 2px; margin-bottom: 12px;
        }
        .process-desc {
          font-size: 13px; line-height: 1.8; color: var(--gray);
          font-weight: 300; max-width: 520px; margin: 0 auto 32px;
        }
        :global(.process-video-wrap) video {
          width: 100%; aspect-ratio: 16/9; height: auto;
          display: block; border-radius: 4px; object-fit: cover;
        }
        .process-footer {
          display: flex; justify-content: center; gap: 40px; margin-top: 24px;
        }
        .process-stat-num {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px;
          letter-spacing: 1px; color: var(--page-fg);
        }
        .process-stat-label {
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--gray); margin-top: 4px;
        }

        /* ===== GALLERY ===== */
        .gallery-section { background: var(--dark); color: #fff; }
        .gallery-section .section-label { color: var(--warm); }
        .gallery-section .section-title { color: #fff; }
        .gallery-section .section-desc { color: rgba(255,255,255,0.5); }
        .gallery-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 20px; margin-top: 60px;
        }
        .gallery-item { overflow: hidden; border-radius: 4px; }
        .gallery-item img {
          width: 100%; height: auto; display: block;
          transition: transform 0.6s ease;
        }
        .gallery-item:hover img { transform: scale(1.05); }
        .gallery-item.wide { grid-column: span 2; }
        .gallery-3col {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-top: 20px;
        }
        .gallery-3col .gallery-item { aspect-ratio: 1; }
        .gallery-3col .gallery-item img { height: 100%; object-fit: cover; }

        /* ===== DRAWINGS ===== */
        .drawings-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 30px; margin-top: 60px;
        }
        :global(.drawing-card) {
          background: var(--page-bg); border-radius: 4px; overflow: hidden;
        }
        :global(.drawing-card) img { width: 100%; display: block; }

        /* ===== LOCATIONS ===== */
        .locations-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; margin-top: 60px;
        }
        :global(.location-card) {
          border: 1px solid var(--border-light); border-radius: 4px;
          padding: 32px; transition: border-color 0.3s;
        }
        :global(.location-card:hover) { border-color: var(--warm); }
        :global(.location-card) h4 {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px;
          letter-spacing: 2px; margin-bottom: 6px;
        }
        .loc-sub {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: var(--gray); letter-spacing: 1px; margin-bottom: 16px;
        }
        :global(.location-card) p {
          font-size: 13px; line-height: 1.7; color: var(--text-light); font-weight: 300;
        }

        /* ===== IMPACT ===== */
        .impact { background: var(--dark); color: #fff; text-align: center; }
        .impact-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 40px; margin-top: 60px;
        }
        .impact-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 6vw, 72px); letter-spacing: 2px;
        }
        .impact-label {
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.4); margin-top: 8px;
        }

        /* ===== PRESS ===== */
        .press-strip {
          display: flex; gap: 24px; overflow-x: auto;
          margin-top: 60px; padding-bottom: 16px;
          scrollbar-width: none;
        }
        .press-strip::-webkit-scrollbar { display: none; }
        .press-card {
          flex-shrink: 0; width: 300px; border: 1px solid var(--border-light);
          border-radius: 4px; padding: 28px; transition: border-color 0.3s;
        }
        .press-card:hover { border-color: var(--warm); }
        .press-pub {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--gray); margin-bottom: 12px;
        }
        .press-headline {
          font-size: 14px; font-weight: 500; line-height: 1.5; margin-bottom: 12px;
        }
        .press-snippet { font-size: 12px; line-height: 1.6; color: var(--gray); }

        /* ===== REVIEWS ===== */
        .reviews { background: var(--section-bg); }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          section { padding: 80px 40px; }
          .story-grid,
          :global(.concept-block),
          :global(.concept-block.reverse) { grid-template-columns: 1fr; }
          :global(.concept-block.reverse) .concept-text { order: 0; }
          :global(.concept-block.reverse) .concept-img { order: 1; }
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-item.wide { grid-column: span 1; aspect-ratio: 16/10; }
          .gallery-item.wide img { height: 100%; object-fit: cover; }
          .gallery-3col { grid-template-columns: 1fr 1fr; }
          .drawings-grid { grid-template-columns: 1fr; }
          .locations-grid { grid-template-columns: 1fr 1fr; }
          .inspiration-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          section { padding: 60px 24px; }
          .locations-grid { grid-template-columns: 1fr; }
          .impact-grid { grid-template-columns: 1fr; gap: 32px; }
          .gallery-3col { grid-template-columns: 1fr; }
          .press-card { width: 260px; }
          :global(.process-video-wrap) { padding: 60px 24px; }
          .process-footer { gap: 24px; }
        }
      `}</style>
    </>
  );
}
