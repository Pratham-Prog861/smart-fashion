import { HeroSection } from '@/components/HeroSection'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { Features } from '@/components/Features'
import { VoiceSearch } from '@/components/VoiceSearch'

export default function Home() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <VoiceSearch />
      <Features />
      <FeaturedProducts />
    </div>
  )
}
