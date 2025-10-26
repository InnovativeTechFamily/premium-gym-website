"use client"

import { Card } from "@/components/ui/card"

const features = [
  {
    title: "State-of-the-Art Equipment",
    description: "Latest fitness technology and equipment for all training styles",
    icon: "⚙️",
  },
  {
    title: "Expert Trainers",
    description: "Certified professionals ready to guide your fitness journey",
    icon: "👨‍🏫",
  },
  {
    title: "Group Classes",
    description: "Diverse classes from yoga to HIIT with experienced instructors",
    icon: "👥",
  },
  {
    title: "Nutrition Guidance",
    description: "Personalized meal plans and nutritional counseling",
    icon: "🥗",
  },
  {
    title: "Recovery Services",
    description: "Sauna, steam room, and massage therapy facilities",
    icon: "🧖",
  },
  {
    title: "Community Events",
    description: "Regular challenges and social events to keep you motivated",
    icon: "🎉",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Choose FitPeak?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to achieve your fitness goals in one premium facility
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 group cursor-pointer"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
