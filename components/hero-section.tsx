"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-pulse" />

      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-sm font-semibold text-primary">Welcome to Premium Fitness</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Body & Mind</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Experience world-class fitness facilities, expert trainers, and a supportive community dedicated to your
            success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/signup">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div>
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Classes Weekly</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">20+</div>
            <div className="text-sm text-muted-foreground">Expert Trainers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
