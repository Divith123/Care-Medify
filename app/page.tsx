import { HeroSection } from "@/components/hero-section"
import { SpecialtySection } from "@/components/specialty-section"
import { ChatbotButton } from "@/components/chatbot-button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <SpecialtySection />
      <ChatbotButton />
    </main>
  )
}

