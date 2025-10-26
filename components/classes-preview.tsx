"use client"

import { Card } from "@/components/ui/card"

const classes = [
  {
    name: "HIIT Training",
    instructor: "Alex Johnson",
    time: "Mon, Wed, Fri - 6:00 AM",
    level: "Advanced",
    image: "/hiit-training-class.jpg",
  },
  {
    name: "Yoga Flow",
    instructor: "Sarah Chen",
    time: "Tue, Thu - 5:30 PM",
    level: "Beginner",
    image: "/diverse-yoga-class.png",
  },
  {
    name: "Strength & Power",
    instructor: "Mike Rodriguez",
    time: "Mon, Wed, Fri - 7:00 PM",
    level: "Intermediate",
    image: "/strength-training-diverse-group.png",
  },
  {
    name: "Spin Cycle",
    instructor: "Emma Wilson",
    time: "Tue, Thu, Sat - 8:00 AM",
    level: "All Levels",
    image: "/spin-class.png",
  },
]

export function ClassesPreview() {
  return (
    <section id="classes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Popular Classes</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join our diverse range of fitness classes led by expert instructors
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classes.map((cls, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="relative h-40 overflow-hidden bg-muted">
              <img
                src={cls.image || "/placeholder.svg"}
                alt={cls.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{cls.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{cls.instructor}</p>
              <p className="text-xs text-muted-foreground mb-2">{cls.time}</p>
              <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                {cls.level}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
