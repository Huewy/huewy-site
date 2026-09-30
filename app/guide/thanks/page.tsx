export default function GuideThanks() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "48px 24px",
        background: "var(--paper)",
        color: "var(--ink)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            marginBottom: 18,
          }}
        >
          Your guide is ready
        </h1>
        <p
          style={{
            color: "var(--ink-2)",
            fontSize: 18,
            lineHeight: 1.5,
            marginBottom: 32,
          }}
        >
          We&apos;ve emailed it to you as well — check your inbox in a minute or
          two.
        </p>
        <a
          href="/g/google-review-removal-map.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            height: 52,
            padding: "0 28px",
            background: "var(--violet)",
            color: "#fff",
            borderRadius: "999px",
            border: 0,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Download the guide
        </a>
      </div>
    </main>
  );
}
