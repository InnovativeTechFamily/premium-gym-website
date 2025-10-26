"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const memberships = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for beginners",
    features: ["Gym access", "Basic equipment", "Email support", "1 free class/week"],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$59",
    period: "/month",
    description: "Most popular choice",
    features: [
      "Unlimited gym access",
      "All equipment",
      "Priority support",
      "Unlimited classes",
      "Personal trainer consultation",
    ],
    highlighted: true,
  },
  {
    name: "Elite",
    price: "$99",
    period: "/month",
    description: "For serious athletes",
    features: [
      "VIP gym access",
      "All equipment",
      "24/7 support",
      "Unlimited classes",
      "Personal trainer (2x/week)",
      "Nutrition planning",
    ],
    highlighted: false,
  },
]

export function MembershipSection() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Membership Plans</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your fitness goals
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {memberships.map((plan, index) => (
          <Card
            key={index}
            className={`p-8 transition-all duration-300 ${
              plan.highlighted
                ? "border-primary/50 shadow-lg scale-105 bg-gradient-to-br from-primary/5 to-accent/5"
                : "hover:shadow-md"
            }`}
          >
            {plan.highlighted && (
              <div className="inline-block mb-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-muted-foreground mb-4">{plan.description}</p>

            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>

            <Button asChild className="w-full mb-6" variant={plan.highlighted ? "default" : "outline"}>
              <Link href="/signup">Get Started</Link>
            </Button>

            <ul className="space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  )
}
