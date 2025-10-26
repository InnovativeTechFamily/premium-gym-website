import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ClassesPreview } from "@/components/classes-preview"
import { MembershipSection } from "@/components/membership-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ClassesPreview />
      <MembershipSection />
      <Footer />
    </main>
  )
}
