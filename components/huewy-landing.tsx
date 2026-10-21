"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bell,
  Check,
  Flag,
  Mail,
  Menu,
  MessageSquareText,
  QrCode,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  UserCheck,
  X,
  ChartLine,
} from "lucide-react";
import { joinWaitlist } from "@/app/actions/waitlist";

const HUEWY_WORDMARK = "/brand/huewy-wordmark-large.png";
const HUEWY_ICON = "/brand/huewy-icon.png";
const CONTACT_EMAIL = "hello@huewy.com";

const platforms = [
  { name: "Google", slug: "google", live: true },
  { name: "Yelp", slug: "yelp", live: false },
  { name: "Trustpilot", slug: "trustpilot", live: false },
  { name: "Tripadvisor", slug: "tripadvisor", live: false },
  { name: "Airbnb", slug: "airbnb", live: false },
  { name: "Glassdoor", slug: "glassdoor", live: false },
];

const steps = [
  {
    icon: Search,
    title: "Scan",
    body: "Huewy checks your Google reviews and looks for ones that may break Google's policies.",
  },
  {
    icon: Bell,
    title: "Alert",
    body: "We tell you when a review is flagged, and which policy it may breach.",
  },
  {
    icon: Flag,
    title: "Request",
    body: "If you want it reported, request it in one tap. You have 24 hours to cancel.",
  },
  {
    icon: UserCheck,
    title: "A person checks and files",
    body: "A Huewy team member reviews it. If there's a genuine policy breach, they file it through Google's official process. If not, we decline it.",
  },
  {
    icon: ChartLine,
    title: "Track the result",
    body: "See where each report is up to. Google makes the final decision.",
  },
];

const whyItems = [
  {
    title: "White-hat only",
    body: "We only use Google's official reporting channels. No fake accounts, no mass flagging, no workarounds.",
  },
  {
    title: "A person checks every filing",
    body: "Nothing is filed automatically. A Huewy team member reviews every report before it goes to Google.",
  },
  {
    title: "We never ask for your password",
    body: "You won't be asked to hand over your Google login.",
  },
  {
    title: "We say no when we should",
    body: "If a review doesn't genuinely breach Google's policies, we won't report it, even if it hurts.",
  },
  {
    title: "Month to month",
    body: "No lock-in contracts. Cancel anytime.",
  },
];

const faqs: [string, string][] = [
  [
    "Can you guarantee removal?",
    "No, and nobody can. Google decides. We only report reviews that appear to break Google's rules, and you only pay for removals that happen.",
  ],
  [
    "How does filing work?",
    "When Huewy flags a review, you can request a report in one tap. You then have 24 hours to cancel. A Huewy team member checks the review against Google's policies. If it appears to breach them, they file a report through Google's official process. If it doesn't, we decline it and let you know. You can track each report in Huewy, and Google makes the final call.",
  ],
  [
    "What happens to genuine negative reviews?",
    "We won't report them. A genuine negative review, even a harsh one, doesn't break Google's rules. Instead, Huewy helps you write a calm, useful reply, and regular review requests mean more of your customers get to have their say.",
  ],
  [
    "Is this allowed?",
    "Yes. Huewy uses Google's own reporting process, the same one available to any business owner. Our review requests go to every customer, never only the happy ones, and we never offer incentives for reviews.",
  ],
  [
    "How much will it cost?",
    "There will be a Free plan for one location, and a Protection plan from A$199 per location per month. For older reviews, you only pay if the review is removed. Plans are month to month and you can cancel anytime. Huewy isn't live yet, so pricing is our planned launch pricing.",
  ],
  [
    "When can I use Huewy?",
    "Huewy is launching soon, starting with Google reviews. Join the waitlist and we'll let you know when early access opens.",
  ],
];

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Huewy home">
      <img className="logo-wordmark" src={HUEWY_WORDMARK} alt="Huewy" />
    </a>
  );
}

/** Illustrative product preview. All names are invented. */
function ProductPreview() {
  return (
    <div className="preview-wrap" aria-hidden="true">
      <div className="glow" />
      <div className="browser-window nm-preview">
        <div className="browser-bar">
          <i />
          <i />
          <i />
          <span>app.huewy.com · Wattlebrook Bakehouse</span>
        </div>
        <div className="nm-preview-body">
          <div className="nm-preview-head">
            <div>
              <small>Google reviews</small>
              <strong>Wattlebrook Bakehouse</strong>
            </div>
            <span className="nm-chip">Scanned today</span>
          </div>

          <div className="nm-review nm-review-flagged">
            <div className="nm-review-top">
              <span className="nm-avatar">Q</span>
              <div>
                <b>Quill Fernsby</b>
                <small>★☆☆☆☆ · 2 days ago</small>
              </div>
              <em>May breach policy</em>
            </div>
            <p>
              &ldquo;Never been here, but my mate who runs the café across the
              road says it&apos;s a rip-off. Go to his place instead.&rdquo;
            </p>
            <div className="nm-policy">
              <ShieldCheck />
              <span>Possible conflict of interest · reviewer says they haven&apos;t visited</span>
            </div>
            <div className="nm-review-actions">
              <small>A Huewy team member checks before anything is filed</small>
              <button type="button" tabIndex={-1}>
                Request report
              </button>
            </div>
          </div>

          <div className="nm-review">
            <div className="nm-review-top">
              <span className="nm-avatar nm-avatar-soft">T</span>
              <div>
                <b>Tamsin Oakridge</b>
                <small>★★☆☆☆ · 5 days ago</small>
              </div>
              <em className="nm-genuine">Genuine · reply</em>
            </div>
            <p>&ldquo;Sourdough was great but the queue took 20 minutes.&rdquo;</p>
          </div>
        </div>
      </div>
      <div className="floating-note note-one">
        <span className="note-dot green" />
        <div>
          <strong>Review request sent</strong>
          <small>SMS · after every visit</small>
        </div>
      </div>
      <div className="floating-note note-two">
        <span className="note-dot purple" />
        <div>
          <strong>24 hours to cancel</strong>
          <small>Then a person checks it</small>
        </div>
      </div>
    </div>
  );
}

export default function HuewyLanding({ waitlistCount }: { waitlistCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistSource, setWaitlistSource] = useState("site-waitlist");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistError, setWaitlistError] = useState<string | null>(null);
  const [waitlist, setWaitlist] = useState({ firstName: "", lastName: "", company: "", email: "", message: "" });
  const waitlistDialogRef = useRef<HTMLDivElement>(null);
  const waitlistCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!waitlistOpen) return;
    waitlistCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWaitlistOpen(false);
      if (event.key !== "Tab" || !waitlistDialogRef.current) return;
      const focusable = Array.from(waitlistDialogRef.current.querySelectorAll<HTMLElement>("button, input, textarea"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [waitlistOpen]);

  const LOOPS_FORM_URL = "https://app.loops.so/api/newsletter-form/cmucdscsa0zff0izrsbi29xuh";

  const openWaitlist = (source = "site-waitlist") => {
    setWaitlistSource(source);
    setWaitlistSubmitted(false);
    setWaitlistError(null);
    setWaitlistOpen(true);
  };
  const closeWaitlist = () => setWaitlistOpen(false);
  const submitWaitlist = async (event: React.FormEvent) => {
    event.preventDefault();
    if (waitlistSubmitting) return;
    setWaitlistError(null);
    setWaitlistSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.set("email", waitlist.email);
      if (waitlist.firstName) body.set("firstName", waitlist.firstName);
      if (waitlist.lastName) body.set("lastName", waitlist.lastName);
      if (waitlist.company) body.set("company", waitlist.company);
      if (waitlist.message) body.set("notes", waitlist.message);
      body.set("formSource", waitlistSource);
      const res = await fetch(LOOPS_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Signup failed (${res.status}). Please try again.`);
      try {
        const fd = new FormData();
        fd.set("email", waitlist.email);
        fd.set("source", waitlistSource);
        const result = await joinWaitlist(null, fd);
        if (result && !result.ok) console.error("[waitlist] Supabase insert failed:", result.error);
      } catch (supaErr) {
        console.error("[waitlist] Supabase insert threw:", supaErr);
      }
      setWaitlistSubmitted(true);
    } catch (err) {
      setWaitlistError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setWaitlistSubmitting(false);
    }
  };

  const isAgency = waitlistSource === "agency-waitlist";

  return (
    <main id="top">
      <header>
        <div className="container">
          <div className="nav-pill">
            <Logo />
            <span className="nav-brand-divider" aria-hidden="true" />
            <nav className={menuOpen ? "open" : ""}>
              <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
              <a href="#plans" onClick={() => setMenuOpen(false)}>Plans</a>
              <a href="#agencies" onClick={() => setMenuOpen(false)}>Agencies</a>
              <a href="#faq" onClick={() => setMenuOpen(false)}>FAQs</a>
              <span className="mobile-menu-divider" aria-hidden="true" />
              <button className="nav-cta" type="button" onClick={() => { setMenuOpen(false); openWaitlist(); }}>
                Join the waitlist <ArrowRight />
              </button>
            </nav>
            <button
              className="menu-button"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* 1. Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> Launching soon · Early access · Google reviews
            </div>
            <h1>
              More genuine reviews.
              <br />
              <em>Fewer fake and abusive ones.</em>
            </h1>
            <p className="lead nm-lead">
              Huewy asks every customer for a review, and reports the reviews
              that break Google&apos;s rules.
            </p>
            <p className="nm-guarantee" role="note">
              <ShieldCheck aria-hidden="true" />
              <span>Removal is never guaranteed — Google decides.</span>
            </p>
            <div className="hero-waitlist-row">
              <button className="button primary" type="button" onClick={() => openWaitlist()}>
                Join the waitlist for early access <ArrowRight />
              </button>
              <span>
                {waitlistCount >= 50 ? (
                  <>Join <span className="text-[#7B61FF]">{waitlistCount.toLocaleString("en-AU")}</span> business owners</>
                ) : (
                  <>Be one of the first to join</>
                )}
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <ProductPreview />
            <p className="nm-preview-caption">Illustrative preview. Names are made up. Huewy isn&apos;t live yet.</p>
            <div className="hero-platforms" role="list" aria-label="Review platforms">
              {platforms.map((platform) => (
                <span
                  role="listitem"
                  className={`hero-platform${platform.live ? "" : " is-soon"}`}
                  key={platform.slug}
                  title={platform.live ? `${platform.name}: available at launch` : `${platform.name}: coming soon`}
                >
                  <img src={`/platforms/${platform.slug}.svg`} alt={platform.name} />
                </span>
              ))}
            </div>
            <p className="nm-preview-caption">
              Google at launch. Yelp, Trustpilot, Tripadvisor, Airbnb and Glassdoor coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Two pillars */}
      <section className="nm-section nm-pillars-section" id="features">
        <div className="container">
          <div className="section-kicker nm-center">What Huewy does</div>
          <h2 className="nm-h2 nm-center">
            Two jobs, <span>done properly.</span>
          </h2>
          <div className="nm-pillars">
            <article className="nm-pillar">
              <div className="nm-pillar-icon"><Send /></div>
              <h3>Get more reviews</h3>
              <p>
                Huewy asks every customer for a review, automatically, so your
                rating reflects the people you actually serve.
              </p>
              <ul className="nm-list">
                <li><QrCode /> Review requests by link, QR code, SMS and email</li>
                <li><Smartphone /> Sent to every customer, not just the happy ones</li>
                <li><MessageSquareText /> AI-drafted replies you can edit before posting</li>
                <li><Check /> No incentives, ever. That&apos;s against Google&apos;s rules</li>
              </ul>
            </article>
            <article className="nm-pillar">
              <div className="nm-pillar-icon"><Flag /></div>
              <h3>Report the ones that break the rules</h3>
              <p>
                Huewy scans your Google reviews and flags the ones that may
                breach Google&apos;s policies, like fake or abusive reviews.
              </p>
              <ul className="nm-list">
                <li><Search /> Flags reviews that may breach Google&apos;s policies</li>
                <li><Flag /> Request a report in one tap, with 24 hours to cancel</li>
                <li><UserCheck /> A Huewy team member checks and files every report</li>
                <li><Check /> You pay only if it&apos;s removed, or it&apos;s included in your plan</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="nm-section nm-how" id="how">
        <div className="container">
          <div className="section-kicker nm-center">How it works</div>
          <h2 className="nm-h2 nm-center">
            Five steps, <span>with a person in the loop.</span>
          </h2>
          <ol className="nm-steps">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title}>
                  <div className="nm-step-top">
                    <span className="nm-step-num">0{i + 1}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              );
            })}
          </ol>
          <p className="nm-honest">
            <strong>Google decides.</strong> Huewy reports reviews that appear to
            break Google&apos;s rules. We can&apos;t make Google remove anything,
            and we don&apos;t report reviews just because they&apos;re negative.
          </p>
        </div>
      </section>

      {/* 4. Plans */}
      <section className="nm-section nm-plans-section" id="plans">
        <div className="container">
          <div className="section-kicker nm-center">Plans · Launching soon</div>
          <h2 className="nm-h2 nm-center">
            Simple plans, <span>month to month.</span>
          </h2>
          <div className="nm-plans">
            <article className="nm-plan">
              <div className="nm-plan-head">
                <h3>Free</h3>
                <span className="nm-chip">Early access</span>
              </div>
              <div className="nm-price">A$0</div>
              <p className="nm-plan-sub">For one location getting started.</p>
              <ul className="nm-list">
                <li><Check /> One location</li>
                <li><Check /> Google reviews only</li>
                <li><Check /> Weekly scan</li>
                <li><Check /> Policy check on new reviews</li>
                <li><Check /> Alerts</li>
              </ul>
              <p className="nm-plan-note">Filing a report needs an upgrade.</p>
              <button className="button nm-outline-button" type="button" onClick={() => openWaitlist("plan-free")}>
                Join the waitlist
              </button>
            </article>
            <article className="nm-plan nm-plan-featured">
              <div className="nm-plan-head">
                <h3>Protection</h3>
                <span className="nm-chip">Early access</span>
              </div>
              <div className="nm-price">
                <small>from</small> A$199
              </div>
              <p className="nm-plan-sub">per location per month</p>
              <ul className="nm-list">
                <li><Check /> Daily scans and instant alerts</li>
                <li><Check /> Reporting of new reviews that may breach policy, within a fair-use limit</li>
                <li><Check /> AI-drafted replies</li>
                <li><Check /> Review requests to every customer</li>
              </ul>
              <p className="nm-plan-note">Older reviews: pay only if removed.</p>
              <button className="button primary" type="button" onClick={() => openWaitlist("plan-protection")}>
                Join the waitlist <ArrowRight />
              </button>
            </article>
          </div>
          <p className="nm-plans-footnote">
            Month to month. Cancel anytime. Huewy isn&apos;t live yet. These are
            planned launch plans for early access.
          </p>
        </div>
      </section>

      {/* 5. Why Huewy */}
      <section className="why" id="why">
        <div className="container">
          <div className="section-kicker">Why Huewy</div>
          <h2>
            The careful way to
            <br />
            <span>look after your reviews.</span>
          </h2>
          <div className="nm-why-grid">
            {whyItems.map((item, i) => (
              <div key={item.title}>
                <b>0{i + 1}</b>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Agencies */}
      <section className="nm-section nm-agencies" id="agencies">
        <div className="container">
          <div className="nm-agency-box">
            <div>
              <div className="section-kicker">For agencies</div>
              <h2 className="nm-h2">
                Refer clients, <span>earn recurring commission.</span>
              </h2>
              <p>
                If you look after marketing or listings for local businesses,
                you can refer them to Huewy and earn a commission for as long as
                they stay. The partner program opens with early access.
              </p>
            </div>
            <div className="nm-agency-actions">
              <button className="button dark-button" type="button" onClick={() => openWaitlist("agency-waitlist")}>
                Join as an agency <ArrowRight />
              </button>
              <a className="nm-text-link" href={`mailto:${CONTACT_EMAIL}?subject=Huewy%20agency%20partners`}>
                <Mail aria-hidden="true" /> {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="section-kicker">FAQs</div>
          <h2>Questions, answered.</h2>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="waitlist">
        <div className="container cta-box">
          <img className="cta-logo-mark" src={HUEWY_ICON} alt="Huewy logo mark" />
          <div className="section-kicker">Launching soon</div>
          <h2>Get early access.</h2>
          <p>
            Huewy is opening early access to a small group of Australian
            businesses, starting with Google reviews.
          </p>
          <div className="waitlist-count">
            {waitlistCount >= 50 ? (
              <>Join <span className="text-[#7B61FF]">{waitlistCount.toLocaleString("en-AU")}</span> business owners on the waitlist</>
            ) : (
              <>Be one of the first businesses on the waitlist.</>
            )}
          </div>
          <button className="button dark-button waitlist-open-button" type="button" onClick={() => openWaitlist()}>
            Join the waitlist <ArrowRight />
          </button>
          <small>No spam. Just the launch note. Removal is never guaranteed.</small>
        </div>
      </section>

      {/* 8. Footer */}
      <footer>
        <div className="container footer-inner">
          <Logo />
          <span>© 2026 Huewy</span>
          <div>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
        <p className="container nm-trademarks">
          Google, Yelp, Trustpilot, Tripadvisor, Airbnb and Glassdoor are trademarks of their owners. Huewy is not affiliated with or endorsed by them.
        </p>
      </footer>

      {waitlistOpen && (
        <div className="waitlist-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeWaitlist(); }}>
          <div className="waitlist-modal" role="dialog" aria-modal="true" aria-labelledby="waitlist-title" ref={waitlistDialogRef}>
            <button className="waitlist-modal-close" type="button" aria-label="Close dialog" onClick={closeWaitlist} ref={waitlistCloseRef}><X /></button>
            {waitlistSubmitted ? (
              <div className="waitlist-success"><h2 id="waitlist-title">Thanks — you&apos;re on the list.</h2><p>We&apos;ll be in touch when early access opens.</p><button className="button dark-button" type="button" onClick={closeWaitlist}>Close</button></div>
            ) : (
              <form onSubmit={submitWaitlist}>
                <div className="section-kicker">{isAgency ? "Agency partners" : "Early access"}</div>
                <h2 id="waitlist-title">{isAgency ? "Join the agency waitlist" : "Join the Huewy waitlist"}</h2>
                <p>We&apos;ll let you know when early access opens.</p>
                <label>First Name <span>(optional)</span><input value={waitlist.firstName} onChange={(e) => setWaitlist({ ...waitlist, firstName: e.target.value })} /></label>
                <label>Last Name <span>(optional)</span><input value={waitlist.lastName} onChange={(e) => setWaitlist({ ...waitlist, lastName: e.target.value })} /></label>
                <label>{isAgency ? "Agency" : "Company"} <span>(optional)</span><input value={waitlist.company} onChange={(e) => setWaitlist({ ...waitlist, company: e.target.value })} /></label>
                <label>Business email <input required type="email" value={waitlist.email} onChange={(e) => setWaitlist({ ...waitlist, email: e.target.value })} /></label>
                <label>Feedback or questions <span>(optional)</span><textarea rows={4} value={waitlist.message} onChange={(e) => setWaitlist({ ...waitlist, message: e.target.value })} /></label>
                {waitlistError && <p role="alert" style={{ color: "#c53030", fontSize: 13, margin: "0 0 8px" }}>{waitlistError}</p>}
                <button className="button dark-button" type="submit" disabled={waitlistSubmitting}>{waitlistSubmitting ? "Joining…" : "Join the waitlist"}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
