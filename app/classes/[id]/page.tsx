"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase/client"

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function ClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [classData, setClassData] = useState<any>(null)
  const [schedules, setSchedules] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = getSupabaseClient()

      // Get current user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)

      // Fetch class details
      const { data: classData } = await supabase.from("classes").select("*").eq("id", params.id).single()

      setClassData(classData)

      // Fetch schedules
      if (classData) {
        const { data: schedulesData } = await supabase.from("class_schedules").select("*").eq("class_id", classData.id)

        setSchedules(schedulesData || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [params.id])

  const handleBookClass = async (scheduleId: string) => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!selectedDate) {
      alert("Please select a date")
      return
    }

    const supabase = getSupabaseClient()
    const { error } = await supabase.from("class_bookings").insert({
      user_id: user.id,
      class_schedule_id: scheduleId,
      booking_date: selectedDate.toISOString().split("T")[0],
    })

    if (error) {
      if (error.message.includes("duplicate")) {
        alert("You already have a booking for this class on this date")
      } else {
        alert("Failed to book class")
      }
    } else {
      alert("Class booked successfully!")
      router.push("/my-bookings")
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>
  }

  if (!classData) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Class not found</div>
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          ← Back
        </Button>

        <Card className="p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">{classData.name}</h1>
          <p className="text-lg text-muted-foreground mb-6">{classData.description}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Class Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-sm">Instructor</p>
                  <p className="text-lg font-semibold">{classData.instructor_name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Duration</p>
                  <p className="text-lg font-semibold">{classData.duration_minutes} minutes</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Difficulty Level</p>
                  <p className="text-lg font-semibold capitalize">{classData.difficulty_level}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Class Capacity</p>
                  <p className="text-lg font-semibold">{classData.capacity} people</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Select Date</h3>
              <input
                type="date"
                value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              />
              {selectedDate && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedDate.toLocaleDateString()} ({DAYS[selectedDate.getDay()]})
                </p>
              )}
            </div>
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-6">Weekly Schedule</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {schedules.map((schedule) => (
              <Card key={schedule.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{DAYS[schedule.day_of_week]}</h3>
                    <p className="text-muted-foreground">
                      {schedule.start_time} - {schedule.end_time}
                    </p>
                  </div>
                </div>
                <Button onClick={() => handleBookClass(schedule.id)} disabled={!selectedDate} className="w-full">
                  {selectedDate ? "Book This Class" : "Select a Date First"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
