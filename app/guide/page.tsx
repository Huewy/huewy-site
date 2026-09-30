"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LOOPS_FORM_URL =
  "https://app.loops.so/api/newsletter-form/cmucdscsa0zff0izrsbi29xuh";

const BULLETS = [
  "The eight grounds Google actually acts on — and the ninth you don't get as a business owner",
  "All four removal routes, and which two can carry an argument",
  "When the appeal really becomes available (it's earlier than you think)",
  "A worked appeal: the version that fails, and the version that has a chance",
  "How to tell whether you've won, when removal has no status",
];

export default function GuidePage() {
  return (
    <Suspense>
      <GuideForm />
    </Suspense>
  );
}

function GuideForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.set("email", email);
      body.set("formSource", "guide");
      // Forward UTM params so Loops can attribute
      const utm = searchParams.get("utm_source");
      if (utm) body.set("utm_source", utm);
      const res = await fetch(LOOPS_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      router.push("/guide/thanks");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 36px",
            display: "grid",
            gap: 12,
            color: "var(--ink-2)",
            fontSize: 15,
          }}
        >
          {BULLETS.map((b) => (
            <li key={b} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
              <span
                style={{
                  flex: "none",
                  width: 18,
                  height: 18,
                  display: "inline-grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  background: "var(--tint)",
                  color: "var(--violet)",
                  fontSize: 12,
                  lineHeight: 1,
                }}
              >
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>
        <form
          onSubmit={submit}
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          <input
            type="email"
            required
            placeholder="you@yourbusiness.com.au"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: "1 1 240px",
              height: 52,
              padding: "0 16px",
              border: "1px solid var(--line)",
              borderRadius: "999px",
              background: "#fff",
              color: "var(--ink)",
              fontSize: 15,
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            className="button"
            style={{
              height: 52,
              padding: "0 24px",
              background: "var(--violet)",
              color: "#fff",
              borderRadius: "999px",
              border: 0,
              fontSize: 15,
              fontWeight: 600,
              cursor: submitting ? "wait" : "pointer",
            }}
          >
            {submitting ? "Sending…" : "Send me the guide"}
          </button>
        </form>
        {error && (
          <p
            role="alert"
            style={{ color: "#c53030", fontSize: 13, marginTop: 10 }}
          >
            {error}
          </p>
        )}
        <p
          style={{
            marginTop: 14,
            color: "var(--ink-3)",
            fontSize: 13,
          }}
        >
          19 pages. No spam. Unsubscribe any time.
        </p>
      </div>
    </main>
  );
}
