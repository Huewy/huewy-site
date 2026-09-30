import type { Metadata } from "next";
import GuideForm from "@/components/guide-form";

export const metadata: Metadata = {
  title: "The Google Review Removal Map — Huewy",
  description:
    "The four ways to challenge a Google review, what each one can and can't do, and the order that gives you the most attempts. Free 19-page guide.",
  openGraph: {
    title: "The Google Review Removal Map — Huewy",
    description:
      "The four ways to challenge a Google review, what each one can and can't do, and the order that gives you the most attempts. Free 19-page guide.",
    url: "https://huewy.com/guide",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function GuidePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "48px 24px",
        background: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 560 }}>
        <div className="section-kicker" style={{ marginBottom: 14 }}>
          FREE GUIDE
        </div>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            marginBottom: 18,
          }}
        >
          The Google Review Removal Map
        </h1>
        <p
          style={{
            color: "var(--ink-2)",
            fontSize: 18,
            lineHeight: 1.5,
            marginBottom: 32,
          }}
        >
          The four ways to challenge a Google review, what each one can and
          can&apos;t do, and the order that gives you the most attempts.
        </p>
        <GuideForm />
      </div>
    </main>
  );
}
