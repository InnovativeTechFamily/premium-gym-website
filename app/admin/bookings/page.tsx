"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { getSupabaseClient } from "@/lib/supabase/client"

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase
        .from("class_bookings")
        .select(
          `
          *,
          users (full_name, email),
          class_schedules (
            day_of_week,
            start_time,
            classes (name)
          )
        `,
        )
        .order("booking_date", { ascending: false })
        .limit(100)

      setBookings(data || [])
      setLoading(false)
    }
    fetchBookings()
  }, [])

  if (loading) {
    return <div className="p-8">Loading bookings...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Bookings Overview</h1>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Member</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Class</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <div>
                      <p className="font-semibold">{booking.users?.full_name}</p>
                      <p className="text-muted-foreground text-xs">{booking.users?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{booking.class_schedules?.classes?.name}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(booking.booking_date).toLocaleDateString()} ({DAYS[booking.class_schedules?.day_of_week]})
                  </td>
                  <td className="px-6 py-4 text-sm">{booking.class_schedules?.start_time}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="capitalize font-semibold text-primary">{booking.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
