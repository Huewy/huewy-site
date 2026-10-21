import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <main className="nm-placeholder">
      <div>
        <div className="section-kicker">{title}</div>
        <h1>Coming soon</h1>
        <p>
          We&apos;ll publish this before Huewy launches. Questions in the
          meantime? Email{" "}
          <a href="mailto:hello@huewy.com" style={{ color: "var(--deep)", fontWeight: 700 }}>
            hello@huewy.com
          </a>
          .
        </p>
        <Link href="/" className="button primary">
          <ArrowLeft /> Back to Huewy
        </Link>
      </div>
    </main>
  );
}
