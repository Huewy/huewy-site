'use client';

/**
 * Huewy — "How it Works" sticky-scroll section (v5)
 * ------------------------------------------------------------
 * v5 replaces v4's brand-mark SVGs with letter-mark placeholders.
 *
 * WHY: reproducing brand logos in code is a trademark exposure on you,
 * not on the code. Each platform has its own usage terms. Before you
 * ship the marketing site, download official brand assets from each
 * platform's press kit and swap them into the LogoTile call sites:
 *
 *   - Google Brand Resource Centre: about.google/brand-resource-center/
 *   - Yelp Press: yelp-press.com/logos
 *   - Trustpilot: business.trustpilot.com/brand-assets
 *   - Glassdoor: glassdoor.com/about/brand-guidelines
 *   - Facebook: about.meta.com/brand/resources/facebookapp/logo/ (brand guidelines)
 *
 * Everything else in v5 is identical to v4:
 *   - Discrete step state (0, 1, 2) via useState + scroll subscription
 *   - Only ONE panel + visual renders at a time (no overlap possible)
 *   - Thresholds per Marcus's spec: 0-30%, 30-66%, 66-100%
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HowHuewyWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v < 0.30) setStep(0);
      else if (v < 0.66) setStep(1);
      else setStep(2);
    });
    return unsub;
  }, [scrollYProgress]);

  const dotY = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative bg-[#F7F4EE]" aria-label="How Huewy works">
      <div className="relative h-[240vh] md:h-[270vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#4A31C7]/70 mb-10 text-center md:text-left">
              How Huewy works
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-6 md:gap-20 items-start">
              {/* LEFT: text column */}
              <div className="relative order-1 md:order-none md:pl-8">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-[#14121F]/10 hidden md:block" aria-hidden>
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#7B61FF] shadow-[0_0_0_4px_rgba(123,97,255,0.15)]"
                    style={{ top: dotY }}
                  />
                </div>

                <div className="relative h-auto min-h-0 md:h-[440px] md:min-h-0">
                  {step === 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#7B61FF] mb-5 font-medium">01 · Analyse</p>
                      <h2 className="font-nunito font-extrabold text-[#14121F] text-[40px] md:text-[52px] leading-[1.05] tracking-tight max-w-[520px]">
                        Understand which reviews are <span className="text-[#7B61FF]">hurting your business.</span>
                      </h2>
                      <p className="mt-6 text-[17px] leading-[1.55] text-[#14121F]/70 max-w-[480px]">
                        Huewy serves you an in-depth analysis summarising your business's rating and how each review is affecting it.
                      </p>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#7B61FF] mb-5 font-medium">02 · File</p>
                      <h2 className="font-nunito font-extrabold text-[#14121F] text-[40px] md:text-[52px] leading-[1.05] tracking-tight max-w-[520px]">
                        Unleash the power of Huewy with <span className="text-[#7B61FF]">one-click.</span>
                      </h2>
                      <p className="mt-6 text-[17px] leading-[1.55] text-[#14121F]/70 max-w-[480px]">
                        Let Huewy take the wheel. Analyse reviews, build cases, and file with one click.
                      </p>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#7B61FF] mb-5 font-medium">03 · Track</p>
                      <h2 className="font-nunito font-extrabold text-[#14121F] text-[40px] md:text-[52px] leading-[1.05] tracking-tight max-w-[520px]">
                        All your reviews in <span className="text-[#7B61FF]">one place.</span>
                      </h2>
                      <p className="mt-6 text-[17px] leading-[1.55] text-[#14121F]/70 max-w-[480px]">
                        Huewy tracks all your listings across Google, Yelp, Trustpilot, Glassdoor, and Facebook. Don't see a platform? Let us know which ones you want us to cover.
                      </p>
                      <p className="mt-4 text-[12px] text-[#14121F]/45 max-w-[480px]">
                        Google available today. Additional platforms rolling out through 2026.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: visual column */}
              <div className="relative order-2 h-[240px] md:order-none md:h-[440px] mt-0 md:mt-0">
                {step === 0 && <VisualAnalyse />}
                {step === 1 && <VisualArgue />}
                {step === 2 && <VisualTrack />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================== */
/* VISUAL 1 — Stacked review cards                                            */
/* ======================================================================== */

function VisualAnalyse() {
  return (
    <div className="relative w-full h-full">
      <ReviewCardStacked
        name="M. Okafor" initial="MO" reviewCount="14 July 2026"
        tags={[{ label: 'Neutral', tone: 'amber' }, { label: 'Unactioned', tone: 'blue' }]}
        impact="−0.008" daysAgo="" text="Closed when Google said you were open. Wasted trip. Coffee was good the time I did get in."
        stars={3} scale={0.92} offset={0} z={30} cardTone="amber"
      />
      <ReviewCardStacked
        name="D. Patel" initial="DP" reviewCount="23 July 2026 · tapped 3 hours before posting"
        tags={[{ label: 'Neutral', tone: 'amber' }, { label: 'Unactioned', tone: 'blue' }]}
        impact="−0.013" daysAgo="" text="Coffee&apos;s fine but $6 for a flat white is a joke."
        stars={2} scale={0.86} offset={165} z={20} cardTone="amber"
      />
      <ReviewCardStacked
        name="K. Nguyen" initial="KN" reviewCount="27 July 2026"
        tags={[{ label: 'Negative', tone: 'red' }, { label: 'Personal information', tone: 'blue' }]}
        impact="−0.018" daysAgo="" text="Waited 25 minutes for two coffees on a Tuesday morning when there were maybe six people in the place."
        stars={1} scale={0.8} offset={285} z={10}
      />
    </div>
  );
}

function ReviewCardStacked({
  name, initial, reviewCount, tags, impact, daysAgo, text, stars = 1, scale = 1, offset = 0, z = 10, cardTone = 'red',
}: {
  name: string; initial: string; reviewCount: string;
  tags: { label: string; tone: 'red' | 'blue' | 'amber' }[];
  impact: string; daysAgo: string; text: string;
  stars?: number; scale?: number; offset?: number; z?: number; cardTone?: 'red' | 'amber';
}) {
  const toneClasses: Record<string, string> = {
    red: 'bg-[#FEE2E2] text-[#B91C1C]',
    blue: 'bg-[#DBEAFE] text-[#1D4ED8]',
    amber: 'bg-[#FEF3C7] text-[#B45309]',
  };
  return (
    <div
      className={`absolute left-0 right-0 rounded-2xl border p-5 shadow-[0_20px_50px_-15px_rgba(20,18,31,0.20)] ${cardTone === 'amber' ? 'border-[#F59E0B]/35 bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/70' : 'border-[#F87171]/25 bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2]/60'}`}
      style={{ top: `${offset}px`, transform: `scale(${scale})`, transformOrigin: 'top center', zIndex: z }}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold text-sm shrink-0 ${cardTone === 'amber' ? 'bg-[#F59E0B]' : 'bg-[#DC2626]'}`}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#14121F] text-sm">{name}</span>
            <div className="flex gap-1.5 ml-auto items-center">
              {tags.map((t) => (
                <span key={t.label} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${toneClasses[t.tone]}`}>
                  {t.label}
                </span>
              ))}
              <span className={`text-[11px] font-semibold tabular-nums ml-1 ${cardTone === 'amber' ? 'text-[#B45309]' : 'text-[#DC2626]'}`}>{impact}★</span>
            </div>
          </div>
          <div className="text-[11px] text-[#14121F]/50 mt-0.5">{reviewCount}</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-[#F59E0B] text-xs">
              {'★'.repeat(stars)}
              <span className="text-[#14121F]/20">{'★'.repeat(5 - stars)}</span>
            </div>
            <span className="text-[11px] text-[#14121F]/50">{daysAgo}</span>
          </div>
          <p className="text-[12.5px] text-[#14121F]/80 mt-2 leading-[1.5] line-clamp-3">{text}</p>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* VISUAL 2 — File with Huewy (one-click)                                     */
/* ======================================================================== */

function VisualArgue() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="w-full max-w-[440px] rounded-2xl border border-[#F87171]/25 bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2]/60 p-4 shadow-[0_20px_50px_-15px_rgba(20,18,31,0.15)]">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-semibold text-sm shrink-0">KN</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-[#14121F] text-sm">K. Nguyen</span>
              <div className="flex gap-1.5 ml-auto items-center">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#FEE2E2] text-[#B91C1C]">Negative</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#DBEAFE] text-[#1D4ED8]">Defamatory</span>
                <span className="text-[11px] font-semibold text-[#DC2626] tabular-nums ml-1">−0.019★</span>
              </div>
            </div>
            <p className="text-[12px] text-[#14121F]/70 mt-2 leading-[1.4] line-clamp-2">
              Waited 25 minutes for two coffees on a Tuesday morning when there were maybe six people in the place…
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="absolute w-24 h-24 rounded-full bg-[#7B61FF]/10 animate-ping" style={{ animationDuration: '2.5s' }} />
          <span className="absolute w-16 h-16 rounded-full bg-[#7B61FF]/15 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
        </div>
        <button className="relative z-10 bg-[#7B61FF] hover:bg-[#4A31C7] text-white font-semibold text-[15px] px-8 py-3.5 rounded-full shadow-[0_10px_30px_-10px_rgba(123,97,255,0.6)] transition-colors">
          File with Huewy →
        </button>
        <svg className="absolute -bottom-6 -right-2 w-6 h-6 z-20 drop-shadow-md" viewBox="0 0 24 24" fill="#14121F">
          <path d="M4 2 L4 20 L9 15 L12 22 L15 20.5 L12 14 L20 14 Z" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="flex items-center gap-2 text-xs text-[#14121F]/60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7B61FF]" />
        <span>Case filed to Google in 4 seconds</span>
      </div>
    </div>
  );
}

/* ======================================================================== */
/* VISUAL 3 — Platform tiles on dark grid                                     */
/*                                                                            */
/* Kinso-style layout. Tiles are LETTER-MARK PLACEHOLDERS.                     */
/* Swap for official brand SVGs from each platform's press kit before ship.   */
/* ======================================================================== */

function VisualTrack() {
  return (
    <div className="platform-visual relative w-full max-w-full h-full rounded-2xl overflow-hidden bg-[#F7F4EE]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(20,18,31,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,18,31,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(123,97,255,0.08) 0%, transparent 65%)' }}
        aria-hidden
      />
<PlatformTile brandName="Google" logo="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg" x="14%" y="16%" size={82} glow="#4285F4" bg="#FFFFFF" />
  <PlatformTile brandName="Yelp" logo="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/yelp/default.svg" x="68%" y="12%" size={70} glow="#D32323" bg="#FFFFFF" />
  <PlatformTile brandName="Trustpilot" logo="star" x="42%" y="42%" size={90} glow="#00B67A" bg="#FFFFFF" />
  <PlatformTile brandName="Glassdoor" logo="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/glassdoor/default.svg" x="14%" y="62%" size={72} glow="#0CAA41" bg="#FFFFFF" />
  <PlatformTile brandName="Facebook" logo="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/facebook/default.svg" x="70%" y="60%" size={78} glow="#1877F2" bg="#FFFFFF" />
      <div className="mobile-platform-grid" aria-label="Platforms Huewy supports">
        <PlatformTile brandName="Google" logo="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg" x="" y="" size={56} glow="#4285F4" bg="#FFFFFF" />
        <PlatformTile brandName="Yelp" logo="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/yelp/default.svg" x="" y="" size={56} glow="#D32323" bg="#FFFFFF" />
        <PlatformTile brandName="Trustpilot" logo="star" x="" y="" size={56} glow="#00B67A" bg="#FFFFFF" />
        <PlatformTile brandName="Glassdoor" logo="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/glassdoor/default.svg" x="" y="" size={56} glow="#0CAA41" bg="#FFFFFF" />
        <PlatformTile brandName="Facebook" logo="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/facebook/default.svg" x="" y="" size={56} glow="#1877F2" bg="#FFFFFF" />
        <PlatformTile brandName="More platforms" logo="plus" x="" y="" size={56} glow="#7B61FF" bg="#FFFFFF" />
      </div>
    </div>
  );
}

function PlatformTile({
  brandName,
  logo,
  x,
  y,
  size,
  glow,
  bg,
  }: {
  brandName: string;
  logo: string;
  x: string;
  y: string;
  size: number;
  glow: string;
  bg: string;
  }) {
  return (
    <div
      className="platform-tile absolute rounded-2xl flex items-center justify-center"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: bg,
        boxShadow: `0 0 45px ${glow}66, inset 0 0 0 1px rgba(255,255,255,0.06)`,
      }}
      aria-label={brandName}
      title={brandName}
    >
      {logo === 'star' ? <span aria-hidden="true" style={{ color: '#00B67A', fontSize: size * 0.42, lineHeight: 1 }}>★</span> : logo === 'plus' ? <span aria-hidden="true" style={{ color: '#7B61FF', fontSize: size * 0.42, fontWeight: 600, lineHeight: 1 }}>+</span> : <img src={logo} alt="" style={{ width: size * 0.42, height: size * 0.42, objectFit: 'contain' }} />}
    </div>
  );
}
