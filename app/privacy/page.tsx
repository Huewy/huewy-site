import type { Metadata } from "next";
import ComingSoonPage from "@/components/coming-soon-page";

export const metadata: Metadata = {
  title: "Privacy — Huewy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return <ComingSoonPage title="Privacy" />;
}
