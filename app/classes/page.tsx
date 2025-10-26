"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("classes").select("*").order("name")
      setClasses(data || [])
      setLoading(false)
    }
    fetchClasses()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Loading classes...</div>
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Our Classes</h1>
          <p className="text-xl text-muted-foreground">Explore our diverse range of fitness classes</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Card key={cls.id} className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={cls.image_url || "/placeholder.svg"}
                  alt={cls.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{cls.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{cls.description}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instructor:</span>
                    <span className="font-semibold">{cls.instructor_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-semibold">{cls.duration_minutes} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="font-semibold capitalize">{cls.difficulty_level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-semibold">{cls.capacity} people</span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/classes/${cls.id}`}>View Schedule</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
