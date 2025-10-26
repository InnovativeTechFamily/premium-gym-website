"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase/client"

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchBookings = async () => {
      const supabase = getSupabaseClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      const { data: bookingsData } = await supabase
        .from("class_bookings")
        .select(
          `
          id,
          booking_date,
          status,
          class_schedule_id,
          class_schedules (
            day_of_week,
            start_time,
            end_time,
            class_id,
            classes (
              name,
              instructor_name,
              duration_minutes
            )
          )
        `,
        )
        .eq("user_id", user.id)
        .order("booking_date", { ascending: true })

      setBookings(bookingsData || [])
      setLoading(false)
    }

    fetchBookings()
  }, [router])

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return

    const supabase = getSupabaseClient()
    const { error } = await supabase.from("class_bookings").delete().eq("id", bookingId)

    if (!error) {
      setBookings(bookings.filter((b) => b.id !== bookingId))
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Loading your bookings...</div>
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">My Class Bookings</h1>

        {bookings.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">You haven't booked any classes yet</p>
            <Button asChild>
              <a href="/classes">Browse Classes</a>
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const schedule = booking.class_schedules
              const classInfo = schedule?.classes

              return (
                <Card key={booking.id} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{classInfo?.name}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Instructor</p>
                          <p className="font-semibold">{classInfo?.instructor_name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-semibold">
                            {new Date(booking.booking_date).toLocaleDateString()} ({DAYS[schedule?.day_of_week]})
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time</p>
                          <p className="font-semibold">
                            {schedule?.start_time} - {schedule?.end_time}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-semibold capitalize text-primary">{booking.status}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="destructive" onClick={() => handleCancelBooking(booking.id)} className="ml-4">
                      Cancel
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
