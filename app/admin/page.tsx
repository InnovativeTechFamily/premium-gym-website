"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalClasses: 0,
    totalBookings: 0,
    activeMembers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = getSupabaseClient()

      const [{ count: membersCount }, { count: classesCount }, { count: bookingsCount }, { data: activeData }] =
        await Promise.all([
          supabase.from("users").select("*", { count: "exact", head: true }),
          supabase.from("classes").select("*", { count: "exact", head: true }),
          supabase.from("class_bookings").select("*", { count: "exact", head: true }),
          supabase
            .from("users")
            .select("id")
            .not("membership_end_date", "is", null)
            .gte("membership_end_date", new Date().toISOString()),
        ])

      setStats({
        totalMembers: membersCount || 0,
        totalClasses: classesCount || 0,
        totalBookings: bookingsCount || 0,
        activeMembers: activeData?.length || 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <p className="text-muted-foreground text-sm mb-2">Total Members</p>
          <p className="text-4xl font-bold text-primary">{stats.totalMembers}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
          <p className="text-muted-foreground text-sm mb-2">Active Members</p>
          <p className="text-4xl font-bold text-accent">{stats.activeMembers}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <p className="text-muted-foreground text-sm mb-2">Total Classes</p>
          <p className="text-4xl font-bold text-primary">{stats.totalClasses}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
          <p className="text-muted-foreground text-sm mb-2">Total Bookings</p>
          <p className="text-4xl font-bold text-accent">{stats.totalBookings}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/admin/members" className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
            <p className="font-semibold mb-1">Manage Members</p>
            <p className="text-sm text-muted-foreground">View and manage member accounts</p>
          </a>
          <a href="/admin/classes" className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
            <p className="font-semibold mb-1">Manage Classes</p>
            <p className="text-sm text-muted-foreground">Create and edit fitness classes</p>
          </a>
          <a href="/admin/bookings" className="p-4 border border-border rounded-lg hover:bg-muted transition-colors">
            <p className="font-semibold mb-1">View Bookings</p>
            <p className="text-sm text-muted-foreground">Monitor class bookings</p>
          </a>
        </div>
      </Card>
    </div>
  )
}
