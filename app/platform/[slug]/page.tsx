import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const platformData: Record<string, { name: string; logo: string; intro: string; steps: string[] }> = {
  google: { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google/default.svg', intro: 'Huewy helps you turn an unfair Google review into a clear, policy-backed report.', steps: ['Open the review in Chrome or paste it into Huewy.', 'Review the policy signals and evidence Huewy finds.', 'Edit, sign, and submit your case through Google’s official reporting path.'] },
  yelp: { name: 'Yelp', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/yelp/default.svg', intro: 'When a Yelp review crosses the line, Huewy helps you make the strongest honest case.', steps: ['Share the review with Huewy.', 'Check the relevant content policy signals.', 'Submit a focused report through the official Yelp process.'] },
  trustpilot: { name: 'Trustpilot', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/trustpilot/default.svg', intro: 'Huewy keeps Trustpilot review disputes factual, focused, and grounded in platform rules.', steps: ['Bring the review into Huewy.', 'Add the context only you know.', 'Send the final argument through Trustpilot’s official channel.'] },
  glassdoor: { name: 'Glassdoor', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/glassdoor/default.svg', intro: 'Huewy helps businesses understand whether Glassdoor feedback may breach its content standards.', steps: ['Paste or open the review.', 'See the strongest signals and supporting context.', 'Review and submit your own compliant request.'] },
  facebook: { name: 'Facebook', logo: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/facebook/default.svg', intro: 'Huewy helps hosts and operators make a grounded case when an Facebook review misrepresents a stay.', steps: ['Add the review to your Huewy case.', 'Work through the policy and evidence check.', 'Submit through Facebook’s official review process.'] },
}

export default function PlatformPage({ params }: { params: Promise<{ slug: string }> }) {
  const platform = platformData[(params as unknown as { slug: string }).slug] ?? platformData.google
  return <main className="platform-page"><div className="platform-page-inner"><Link href="/" className="back-link"><ArrowLeft /> Back to Huewy</Link><div className="platform-page-logo"><img src={platform.logo} alt={`${platform.name} logo`} /></div><div className="section-kicker">Huewy + {platform.name}</div><h1>Make your case<br /><em>with clarity.</em></h1><p className="platform-page-lead">{platform.intro}</p><div className="platform-steps">{platform.steps.map((step, index) => <div className="platform-step" key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div><Link href="/#waitlist" className="button primary">Join the waitlist <ArrowRight /></Link><p className="platform-note">Huewy never guarantees removal. It helps you use the official process with a fair, defensible request.</p></div></main>
}

export function generateStaticParams() { return Object.keys(platformData).map(slug => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const platform = platformData[slug] ?? platformData.google; return { title: `${platform.name} review help | Huewy`, description: `See how Huewy helps you make a clear, policy-backed case about an unfair ${platform.name} review.` } }
