import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// Not linked from navigation: Huewy is Google-only at launch. The route is
// kept (noindex) so existing links don't break.
const GOOGLE_STEPS = [
  'Huewy scans your Google reviews and flags ones that may breach Google’s policies.',
  'You request a report in one tap, with 24 hours to cancel.',
  'A Huewy team member checks it and, if there’s a genuine policy breach, files it through Google’s official process.',
  'You track the result. Google makes the final decision.',
]

const platformData: Record<string, { name: string; logo: string; intro: string; steps: string[] }> = {
  google: { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg', intro: 'Huewy asks every customer for a review, and reports Google reviews that appear to break Google’s rules, like fake and abusive ones.', steps: GOOGLE_STEPS },
  yelp: { name: 'Yelp', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/yelp/default.svg', intro: 'Huewy is launching with Google reviews only. Yelp isn’t supported yet.', steps: [] },
  trustpilot: { name: 'Trustpilot', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/trustpilot/default.svg', intro: 'Huewy is launching with Google reviews only. Trustpilot isn’t supported yet.', steps: [] },
  glassdoor: { name: 'Glassdoor', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/glassdoor/default.svg', intro: 'Huewy is launching with Google reviews only. Glassdoor isn’t supported yet.', steps: [] },
  facebook: { name: 'Facebook', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/facebook/default.svg', intro: 'Huewy is launching with Google reviews only. Facebook isn’t supported yet.', steps: [] },
}

export default async function PlatformPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const platform = platformData[slug] ?? platformData.google
  return <main className="platform-page"><div className="platform-page-inner"><Link href="/" className="back-link"><ArrowLeft /> Back to Huewy</Link><div className="platform-page-logo"><img src={platform.logo} alt={`${platform.name} logo`} /></div><div className="section-kicker">Huewy + {platform.name} · Launching soon</div><h1>Reviews that break the rules,<br /><em>reported properly.</em></h1><p className="platform-page-lead">{platform.intro}</p>{platform.steps.length > 0 && <div className="platform-steps">{platform.steps.map((step, index) => <div className="platform-step" key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div>}<Link href="/#waitlist" className="button primary">Join the waitlist <ArrowRight /></Link><p className="platform-note">Removal is never guaranteed — Google decides. We only report reviews that appear to break Google’s rules.</p></div></main>
}

export function generateStaticParams() { return Object.keys(platformData).map(slug => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const platform = platformData[slug] ?? platformData.google; return { title: `${platform.name} reviews | Huewy`, description: `Huewy is launching with Google reviews. ${platform.intro}`, robots: { index: false, follow: false } } }
