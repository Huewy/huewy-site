"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ChartNoAxesCombined,
  MessageSquareText,
} from "lucide-react";
import { HowHuewyWorks } from "./how-huewy-works";

const HUEWY_WORDMARK = "/brand/huewy-wordmark-large.png";
const HUEWY_ICON = "/brand/huewy-icon.png";

const platforms = [
  {
    name: "Google",
    slug: "google",
    logo: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg",
    description:
      "Build a clear, policy-backed case for Google review removals.",
  },
  {
    name: "Yelp",
    slug: "yelp",
    logo: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/yelp/default.svg",
    description:
      "Understand the right path when a Yelp review crosses the line.",
  },
  {
    name: "Trustpilot",
    slug: "trustpilot",
    logo: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/trustpilot/default.svg",
    description:
      "Prepare focused reports for reviews that breach Trustpilot rules.",
  },
  {
    name: "Glassdoor",
    slug: "glassdoor",
    logo: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/glassdoor/default.svg",
    description:
      "Keep workplace feedback fair, factual, and properly reviewed.",
  },
  {
    name: "Facebook",
    slug: "facebook",
    logo: "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/facebook/default.svg",
    description:
      "Make a grounded case when a Facebook review misrepresents a stay.",
  },
];

const faqs = [
  [
    "What is Huewy?",
    "Huewy doubles as a Chrome extension and online platform. It combines reviews from all your online listings, analyses and classifies them based on risk, and provides removal solutions to act on.",
  ],
  [
    "How is Huewy different from removal agencies?",
    "Most removal agencies take down reviews through black-hat and bribing methods. This puts your business's listing at jeopardy and risks review reinstatement, profile suspension, or total account bans. Huewy opts for the ethical and just approach, guiding users through the official reporting channels to ensure unfair content is removed fairly.",
  ],
  [
    "Is removal guaranteed?",
    "No, and anyone guaranteeing removals is lying. Huewy goes through official reporting channels to ensure compliant and ethical removals.",
  ],
  [
    "Who is Huewy for?",
    "Anyone looking to fight back on unfair reviews. Whether they are on Google, Yelp, Trustpilot, or somewhere in between, Huewy will handle the removal process for you.",
  ],
  [
    "What platforms does Huewy work on?",
    "Google, today. Which platform we build next depends on what the waitlist asks for, so tell us when you sign up.",
  ],
  [
    "Is my data private and secure?",
    "Yes. Your data never leaves your account without encryption. Huewy uses secure, enterprise-grade protocols and does not sell or share your information. AI models only process context to serve analysis and case building purposes, not to train external systems.",
  ],
];

function Logo() {
  return (
<a href="#top" className="logo" aria-label="Huewy home">
          <img className="logo-wordmark" src={HUEWY_WORDMARK} alt="Huewy" />
        </a>
  );
}

function ProductPreview() {
  return (
    <div className="preview-wrap">
      <div className="glow" />
      <div className="browser-window serp-browser">
        <div className="browser-bar">
          <i />
          <i />
          <i />
          <span>google.com/search?q=Joseph+David+Lawyers</span>
        </div>
        <div className="serp-mockup">
          <div className="serp-main">
            <div className="serp-google">
              <span className="g-blue">G</span>
              <span className="g-red">o</span>
              <span className="g-yellow">o</span>
              <span className="g-blue">g</span>
              <span className="g-green">l</span>
              <span className="g-red">e</span>
            </div>
            <div className="serp-search">
              Harborstone Legal Melbourne <span>⌕</span>
            </div>
            <div className="serp-tabs">
              <b>All</b>
              <span>Maps</span>
              <span>Reviews</span>
              <span>News</span>
              <span>Images</span>
            </div>
            <small className="serp-count">About 205 results</small>
            <article className="serp-result">
              <span className="serp-url">harborstonelegal.example</span>
              <h3>Harborstone Legal — Family &amp; Estate Law</h3>
              <p>
                Experienced Melbourne lawyers helping families with practical,
                clear legal advice.
              </p>
            </article>
            <div className="serp-reviews">
              <div className="serp-review">
                <b>
                  Sarah M. <small>· 1 day ago</small>
                </b>
                <span>★★★★★</span>
                <p>Helpful and professional from start to finish.</p>
              </div>
              <div className="serp-review">
                <b>
                  Tom R. <small>· 1 week ago</small>
                </b>
                <span>★★★★★</span>
                <p>Clear advice and a genuinely caring team.</p>
              </div>
              <div className="serp-review flagged-serp">
                <b>
                  Anonymous <small>· 2 days ago</small>
                </b>
                <span>★</span>
                <p>
                  The owner is a scammer. I&apos;ve never even been there but
                  everyone knows he rips people off.
                </p>
              </div>
            </div>
          </div>
          <aside className="serp-sidebar">
            <div className="serp-sidebar-top">
              <a href="#top" className="serp-wordmark">
                Huewy
              </a>
              <span>×</span>
            </div>
            <div className="serp-side-tabs">
              <b>Analyse</b>
              <span>Submit</span>
            </div>
            <small className="signals-found">3 signals found</small>
            <div className="sidebar-flagged">
              <span>
                <b>Anonymous</b> · 2 days ago
              </span>
              <em>Flagged</em>
              <strong>★</strong>
              <p>
                The owner is a scammer. I&apos;ve never even been there but
                everyone knows...
              </p>
            </div>
            <div className="policy-signal">
              <Check />
              <span>Reviewer hasn&apos;t visited</span>
              <b className="severity-high">High</b>
            </div>
            <div className="policy-signal">
              <Check />
              <span>Defamatory language</span>
              <b className="severity-medium">Medium</b>
            </div>
            <div className="policy-signal">
              <Check />
              <span>States fact without evidence</span>
              <b className="severity-medium">Medium</b>
            </div>
          </aside>
        </div>
      </div>
      <div className="floating-note note-one">
        <span className="note-dot green" />
        <div>
          <strong>Live on Google</strong>
          <small>Sidebar active</small>
        </div>
      </div>
      <div className="floating-note note-two">
        <span className="note-dot purple" />
        <div>
          <strong>3 policy issues</strong>
          <small>Ready to submit</small>
        </div>
      </div>
    </div>
  );
}

export default function HuewyLanding({ waitlistCount }: { waitlistCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
 const [waitlistOpen, setWaitlistOpen] = useState(false);
 const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
 const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
 const [waitlistError, setWaitlistError] = useState<string | null>(null);
 const [waitlist, setWaitlist] = useState({ firstName: "", lastName: "", company: "", email: "", message: "" });
 const waitlistDialogRef = useRef<HTMLDivElement>(null);
 const waitlistCloseRef = useRef<HTMLButtonElement>(null);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestFirstName, setRequestFirstName] = useState("");
  const [requestLastName, setRequestLastName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [platformRequest, setPlatformRequest] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
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

  const openWaitlist = () => { setWaitlistSubmitted(false); setWaitlistError(null); setWaitlistOpen(true); };
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
      body.set("formSource", "site-waitlist");
      const res = await fetch(LOOPS_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Signup failed (${res.status}). Please try again.`);
      setWaitlistSubmitted(true);
    } catch (err) {
      setWaitlistError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setWaitlistSubmitting(false);
    }
  };
  const submitPlatformRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestSubmitting) return;
    if (!platformRequest.trim()) return;
    setRequestError(null);
    setRequestSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.set("email", requestEmail);
      if (requestFirstName) body.set("firstName", requestFirstName);
      if (requestLastName) body.set("lastName", requestLastName);
      body.set("company", platformRequest);
      body.set("notes", `Platform request: ${platformRequest}`);
      body.set("formSource", "platform-request");
      const res = await fetch(LOOPS_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status}). Please try again.`);
      setRequestSent(true);
    } catch (err) {
      setRequestError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setRequestSubmitting(false);
    }
  };
  return (
    <>
      <style jsx global>{`
        .how-works {
          background: var(--paper);
          color: var(--ink);
        }
        .how-works-height {
          height: 300vh;
        }
        .how-works-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .how-works-overline {
          margin: 0 0 56px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          color: var(--deep);
        }
        .how-works-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 80px;
          align-items: start;
        }
        .how-works-copy {
          position: relative;
          min-height: 390px;
          padding-left: 32px;
        }
        .how-works-rail {
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: var(--line);
        }
        .how-works-rail i {
          position: absolute;
          left: 50%;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--violet);
          transform: translate(-50%);
          box-shadow: 0 0 0 4px var(--tint);
        }
        .how-works-panels,
        .how-works-text-panel {
          position: relative;
        }
        .how-works-text-panel {
          position: absolute;
          inset: 0;
        }
        .how-works-text-panel:first-child {
          position: relative;
        }
        .how-works-step {
          margin: 0 0 20px;
          color: var(--violet);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }
        .how-works-text-panel h2 {
          max-width: 520px;
          margin: 0;
          font-family: var(--font-nunito), Nunito, sans-serif;
          font-size: clamp(38px, 4vw, 52px);
          line-height: 1.05;
          letter-spacing: -0.04em;
        }
        .how-works-body {
          max-width: 480px;
          margin: 24px 0 0;
          color: var(--ink-2);
          font-size: 17px;
          line-height: 1.55;
        }
        .how-works-visual {
          position: relative;
          height: 500px;
        }
        .how-works-visual > div {
          position: absolute;
          inset: 0;
        }
        .how-works-card {
          height: 100%;
          padding: 32px;
          border: 1px solid var(--line);
          border-radius: 20px;
          background: var(--white);
          box-shadow: 0 30px 70px rgba(20, 18, 31, 0.12);
          display: flex;
          flex-direction: column;
        }
        .score-head {
          display: flex;
          justify-content: space-between;
        }
        .score-head small,
        .list-label {
          display: block;
          color: var(--ink-3);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .score-head strong {
          display: block;
          font-family: var(--font-nunito), Nunito, sans-serif;
          font-size: 64px;
          line-height: 1.1;
        }
        .score-head b {
          display: block;
          margin-top: 8px;
          font-size: 24px;
        }
        .signal-list,
        .listing-list {
          display: grid;
          gap: 8px;
          margin-top: 24px;
        }
        .how-signal,
        .listing {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px;
          border-radius: 9px;
          background: var(--paper);
        }
        .how-signal i,
        .listing i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--violet);
        }
        .how-signal span,
        .listing span {
          font-size: 14px;
        }
        .how-signal small,
        .listing small {
          margin-left: auto;
          color: var(--ink-3);
          font-size: 12px;
        }
        .policy-pill {
          padding: 7px 10px;
          border-radius: 999px;
          background: var(--tint);
          color: var(--deep);
          font-size: 11px;
        }
        .policy-pill small {
          float: right;
          color: var(--ink-3);
        }
        .review-quote,
        .argument-copy {
          margin-top: 18px;
          padding: 16px;
          border-radius: 9px;
          background: var(--paper);
          color: var(--ink-2);
          font-size: 14px;
          line-height: 1.55;
        }
        .argument-copy {
          flex: 1;
          border: 1px dashed var(--line);
          background: var(--white);
        }
        .argument-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        }
        .argument-footer small {
          color: var(--ink-3);
        }
        .argument-footer button {
          border: 0;
          border-radius: 999px;
          padding: 10px 16px;
          background: var(--ink);
          color: var(--white);
          font-size: 12px;
        }
        .listing {
          background: transparent;
          border: 1px dashed var(--line);
        }
        .listing.active {
          background: var(--paper);
          border: 0;
        }
        .listing.active i {
          background: var(--violet);
        }
        .missing-platform {
          margin-top: auto;
          padding: 12px;
          border: 1px solid var(--tint);
          border-radius: 9px;
          background: var(--tint);
          color: var(--ink-2);
          font-size: 12px;
        }
        .missing-platform b {
          color: var(--deep);
        }
        @media (max-width: 900px) {
          .how-works-height {
            height: auto;
          }
          .how-works-sticky {
            position: relative;
            height: auto;
            padding: 80px 0;
          }
          .how-works-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .how-works-copy {
            min-height: 520px;
            padding-left: 0;
          }
          .how-works-rail {
            display: none;
          }
          .how-works-visual {
            height: 380px;
          }
          .how-works-overline {
            margin-bottom: 32px;
          }
        }
      `}</style>
      <main id="top">
        <header>
          <div className="container">
            <div className="nav-pill">
  <Logo />
  <span className="nav-brand-divider" aria-hidden="true" />
  <nav className={menuOpen ? "open" : ""}>
                <a href="#features" onClick={() => setMenuOpen(false)}>
                  How it works
                </a>
  <a href="#features" onClick={() => setMenuOpen(false)}>
  Features
  </a>
                <a href="#faq" onClick={() => setMenuOpen(false)}>
                  FAQs
  </a>
  <span className="mobile-menu-divider" aria-hidden="true" />
  <button className="nav-cta" type="button" onClick={() => { setMenuOpen(false); openWaitlist(); }}>
                  Join the waitlist <ArrowRight />
  </button>
  </nav>
              <button
                className="menu-button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </header>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span /> Built for business owners who have had enough
              </div>
              <h1>
                Review removal,
                <br />
                <em>made simple.</em>
              </h1>
              <p className="lead">
                Most businesses flag an unfair review and hope it comes down.
                Huewy analyses the review, identifies the policy or legal
                violation, and submits a real case through the official
                processes.
  </p>
  <div className="hero-waitlist-row">
  <span>{waitlistCount >= 50 ? <>Join <span className="text-[#7B61FF]">{waitlistCount.toLocaleString("en-AU")}</span> business owners</> : <>Be one of the first to join</>}</span>
  <button className="button primary" type="button" onClick={openWaitlist}>
  Join the waitlist <ArrowRight />
  </button>
  </div>

            </div>
            <div className="hero-visual">
              <ProductPreview />
              <div
                className="hero-platforms"
                aria-label="Platforms Huewy supports"
              >
                {platforms.map((platform) => (
                  <a
                    className={`hero-platform ${platform.slug === "trustpilot" ? "trustpilot-mark" : ""}`}
                    href={`/platform/${platform.slug}`}
                    key={platform.slug}
                    aria-label={`Learn how Huewy works with ${platform.name}`}
                  >
                    {platform.slug === "trustpilot" ? (
                      <span aria-hidden="true">★</span>
                    ) : (
                      <img src={platform.logo} alt="" />
                    )}
                  </a>
                ))}
                <button
                  className="hero-platform hero-platform-add"
                  type="button"
                  onClick={() => {
                    setRequestOpen(true);
                    setRequestSent(false);
                  }}
                  aria-label="Suggest another platform"
                >
                  <span aria-hidden="true">+</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="trust-strip">
          <div className="container">
            <span>Built on a simple belief:</span>
            <strong>Your reputation deserves a fair hearing.</strong>
            <div className="trust-line" />
          </div>
        </section>
        <section
          className="platforms"
          hidden
          aria-labelledby="platforms-heading"
        >
          <div className="container">
            <div className="section-kicker">Where Huewy works</div>
            <div className="platforms-heading">
              <h2 id="platforms-heading">
                Every platform has
                <br />
                <span>its own rules.</span>
              </h2>
              <p>
                Huewy helps you meet each one where it is, with the right policy
                path and a case you can stand behind.
              </p>
            </div>
            <div className="platform-grid">
              {platforms.map((platform) => (
                <a
                  className="platform-card"
                  href={`/platform/${platform.slug}`}
                  key={platform.slug}
                >
                  <span className="platform-icon">
                    <img src={platform.logo} alt={`${platform.name} logo`} />
                  </span>
                  <strong>{platform.name}</strong>
                  <p>{platform.description}</p>
                  <span className="platform-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="feature-intro">
          <div className="container">
            <div className="section-kicker">
              Don&apos;t just report it. Argue it
            </div>
            <h2>
              Huewy builds you a case,
              <br />
              <span>then guides you through submission.</span>
            </h2>
            <p className="section-lead">
              No angry replies. No vague appeals. Just a clear, defensible path
              from “this is unfair” to “here&apos;s why.”
            </p>
          </div>
        </section>
        <section className="features container" id="features">
          <div className="feature-row">
            <video
              src="/videos/analyse.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/videos/analyse.jpg"
              className="w-full h-auto rounded-2xl shadow-[0_40px_80px_-20px_rgba(20,18,31,0.15)]"
              aria-label="Huewy identifying policy signals in a review"
            />
            <div className="feature-copy">
              <div className="number">01</div>
              <h3>Understand why a review is unfair.</h3>
              <p>
                Huewy reads the review, analyses it against platform policies
                and governing legislation, and provides you with the best
                possible angles for removal.
              </p>
              <ul>
                <li>Plain-English policy signals</li>
                <li>Evidence pulled from the review itself</li>
                <li>No guesswork or legal theatre</li>
              </ul>
            </div>
          </div>
          <div className="feature-row">
            <div className="feature-copy">
              <div className="number">02</div>
              <h3>Make the case from a position of strength.</h3>
              <p>
                Huewy turns the messy story in your head into a focused argument
                that gives moderation teams something they can act on.
              </p>
              <ul>
                <li>Drafted from your real context</li>
                <li>Always editable before sending</li>
                <li>You stay the final decision-maker</li>
              </ul>
            </div>
            <video
              src="/videos/argue.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/videos/argue.jpg"
              className="w-full h-auto rounded-2xl shadow-[0_40px_80px_-20px_rgba(20,18,31,0.15)]"
              aria-label="Huewy drafting a focused removal argument"
            />
          </div>
          <div className="feature-row">
            <video
              src="/videos/track.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/videos/track.jpg"
              className="w-full h-auto rounded-2xl shadow-[0_40px_80px_-20px_rgba(20,18,31,0.15)]"
              aria-label="Huewy guiding you through Google's removal path"
            />
            <div className="feature-copy">
              <div className="number">03</div>
              <h3>Navigate the complexities of removal processes.</h3>
              <p>
                Review platforms purposely overcomplicate their reporting
                methods. Huewy removes the guesswork and guides you through the
                correct path.
              </p>
              <ul>
                <li>Proven channels for removal</li>
                <li>One-click guidance</li>
                <li>Less work, better outcomes</li>
              </ul>
            </div>
          </div>
          <div className="feature-row">
            <div className="feature-copy">
              <div className="number">04</div>
              <h3>Stay in the loop.</h3>
              <p>
                Your case doesn&apos;t just disappear into the abyss after you
                click submit. Huewy tracks what happens and advises what to do
                next.
              </p>
              <ul>
                <li>Submission history in one place</li>
                <li>Simple follow-up reminders</li>
                <li>Learn what works over time</li>
              </ul>
            </div>
            <video
              src="/videos/loop.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/videos/loop.jpg"
              className="w-full h-auto rounded-2xl shadow-[0_40px_80px_-20px_rgba(20,18,31,0.15)]"
              aria-label="Huewy tracking a submitted case through Google's review"
            />
          </div>
        </section>
        <HowHuewyWorks />
        <section className="why" id="why">
          <div className="container">
            <div className="section-kicker">
              For the people behind the business
            </div>
            <h2>
              Reputation management,
              <br />
              <span>without the runaround.</span>
            </h2>
            <div className="benefits">
              <div>
                <b>01</b>
                <h3>It&apos;s fairer.</h3>
                <p>
                  You shouldn&apos;t need a lawyer to point out a review that
                  breaks the rules.
                </p>
              </div>
              <div>
                <b>02</b>
                <h3>It&apos;s calmer.</h3>
                <p>
                  Respond with evidence and clarity, not the heat of the moment.
                </p>
              </div>
              <div>
                <b>03</b>
                <h3>It&apos;s yours.</h3>
                <p>
                  Huewy helps you make the case. You decide what gets submitted.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="container">
  <div className="section-kicker">FAQs</div>
  <h2>FAQs</h2>
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
            <img
              className="cta-logo-mark"
src={HUEWY_ICON}
  alt="Huewy logo mark"
            />
            <div className="section-kicker">Coming soon</div>
            <h2>Be first in line.</h2>
            <p>
              Huewy is opening early access to a small group of business owners.
            </p>
            <div className="waitlist-count">{waitlistCount >= 50 ? <>Join <span className="text-[#7B61FF]">{waitlistCount.toLocaleString("en-AU")}</span> business owners on the waitlist</> : <>Be one of the first businesses on the waitlist.</>}</div>
            <button className="button dark-button waitlist-open-button" type="button" onClick={openWaitlist}>
              Join the waitlist <ArrowRight />
            </button>
            <small>No spam. No noise. Just the launch note.</small>
          </div>
        </section>
        <footer>
          <div className="container footer-inner">
            <Logo />
            <span>© 2026 Huewy. Built for fairer reviews.</span>
            <div>
              <a href="#faq">FAQs</a>
              <a href="#waitlist">Early access</a>
            </div>
          </div>
        </footer>
        {waitlistOpen && (
          <div className="waitlist-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeWaitlist(); }}>
            <div className="waitlist-modal" role="dialog" aria-modal="true" aria-labelledby="waitlist-title" ref={waitlistDialogRef}>
              <button className="waitlist-modal-close" type="button" aria-label="Close dialog" onClick={closeWaitlist} ref={waitlistCloseRef}><X /></button>
              {waitlistSubmitted ? (
                <div className="waitlist-success"><h2 id="waitlist-title">Thanks — you&apos;re on the list.</h2><p>We&apos;ll be in touch.</p><button className="button dark-button" type="button" onClick={closeWaitlist}>Close</button></div>
              ) : (
                <form onSubmit={submitWaitlist}>
                  <div className="section-kicker">Join the Huewy waitlist</div>
                  <h2 id="waitlist-title">Join the Huewy waitlist</h2>
                  <p>We&apos;ll let you know when early access opens.</p>
                  <label>First Name <span>(optional)</span><input value={waitlist.firstName} onChange={(e) => setWaitlist({ ...waitlist, firstName: e.target.value })} /></label>
                  <label>Last Name <span>(optional)</span><input value={waitlist.lastName} onChange={(e) => setWaitlist({ ...waitlist, lastName: e.target.value })} /></label>
                  <label>Company <span>(optional)</span><input value={waitlist.company} onChange={(e) => setWaitlist({ ...waitlist, company: e.target.value })} /></label>
                  <label>Business email <input required type="email" value={waitlist.email} onChange={(e) => setWaitlist({ ...waitlist, email: e.target.value })} /></label>
                  <label>Feedback or questions <span>(optional)</span><textarea rows={4} value={waitlist.message} onChange={(e) => setWaitlist({ ...waitlist, message: e.target.value })} /></label>
                  {waitlistError && <p role="alert" style={{ color: "#c53030", fontSize: 13, margin: "0 0 8px" }}>{waitlistError}</p>}
                  <button className="button dark-button" type="submit" disabled={waitlistSubmitting}>{waitlistSubmitting ? "Joining…" : "Join the waitlist"}</button>
                </form>
              )}
            </div>
          </div>
        )}
        {requestOpen && (
          <div
            className="request-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setRequestOpen(false);
            }}
          >
            <section
              className="request-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="request-platform-title"
            >
              <button
                className="request-close"
                type="button"
                onClick={() => setRequestOpen(false)}
                aria-label="Close platform request"
              >
                ×
              </button>
              {requestSent ? (
                <div className="request-success">
                  <Check />
                  <h2>Thanks for the suggestion.</h2>
                  <p>
                    We&apos;ll use the waitlist to decide what Huewy supports
                    next.
                  </p>
                  <button
                    className="button dark-button"
                    type="button"
                    onClick={() => setRequestOpen(false)}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={submitPlatformRequest}>
                  <div className="section-kicker">Shape what&apos;s next</div>
                  <h2 id="request-platform-title">
                    Which platform should Huewy support?
                  </h2>
                  <p>
                    Tell us where unfair reviews are holding you back.
                    We&apos;ll add the most requested platforms next.
                  </p>
                  <div className="request-name-fields">
                    <div>
                      <label htmlFor="request-first-name">First name</label>
                      <input
                        id="request-first-name"
                        type="text"
                        placeholder="First name"
                        value={requestFirstName}
                        onChange={(e) => setRequestFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="request-last-name">Last name</label>
                      <input
                        id="request-last-name"
                        type="text"
                        placeholder="Last name"
                        value={requestLastName}
                        onChange={(e) => setRequestLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <label htmlFor="request-email">Email</label>
                  <input
                    id="request-email"
                    type="email"
                    placeholder="you@yourbusiness.com"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="platform-request">Platform name</label>
                  <input
                    id="platform-request"
                    type="text"
                    placeholder="e.g. TripAdvisor"
                    value={platformRequest}
                    onChange={(e) => setPlatformRequest(e.target.value)}
                    required
                  />
                  {requestError && <p role="alert" style={{ color: "#c53030", fontSize: 13, margin: "0 0 8px" }}>{requestError}</p>}
                  <button className="button dark-button" type="submit" disabled={requestSubmitting}>
                    {requestSubmitting ? "Submitting…" : <>Submit suggestion <ArrowRight /></>}
                  </button>
                </form>
              )}
            </section>
          </div>
        )}
      </main>
    </>
  );
}
