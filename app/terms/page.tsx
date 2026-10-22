import type { Metadata } from "next";
import ComingSoonPage from "@/components/coming-soon-page";

export const metadata: Metadata = {
  title: "Terms — Huewy",
  robots: { index: false },
};

export default function TermsPage() {
  return <ComingSoonPage title="Terms" />;
}
