import HuewyLanding from '@/components/huewy-landing'
import { getWaitlistCount } from '@/lib/waitlist-count'

export default async function Page() {
  const waitlistCount = await getWaitlistCount()
  return <HuewyLanding waitlistCount={waitlistCount} />
}
