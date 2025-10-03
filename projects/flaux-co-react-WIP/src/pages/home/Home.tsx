import { HeroSection } from './hero-section/HeroSection'
import { FeaturesSection } from './features-section/FeaturesSection'
import { Features2Section } from './features2-section/Features2Section'
import { CtaSection } from './cta-section/CtaSection'
import './Home.scss'

export const Home: React.FC = () => {
  return (
    <div className="sections-wrapper">
      <HeroSection />
      <Features2Section />
      <FeaturesSection />
      <Features2Section />
      <CtaSection />
    </div>
  )
}