"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase/client"

export function DashboardContent({ user }: any) {
  const [membershipTiers, setMembershipTiers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(false)

  useEffect(() => {
    const fetchMemberships = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("membership_tiers").select("*").order("price", { ascending: true })
      setMembershipTiers(data || [])
      setLoading(false)
    }
    fetchMemberships()
  }, [])

  const handleUpgrade = async (tierId: string) => {
    setUpgrading(true)
    const supabase = getSupabaseClient()

    const { data: tier } = await supabase.from("membership_tiers").select("*").eq("id", tierId).single()

    if (tier) {
      const startDate = new Date()
      const endDate = new Date(startDate.getTime() + tier.duration_days * 24 * 60 * 60 * 1000)

      const { error } = await supabase
        .from("users")
        .update({
          membership_tier: tier.name.toLowerCase(),
          membership_start_date: startDate.toISOString(),
          membership_end_date: endDate.toISOString(),
        })
        .eq("id", user.id)

      if (!error) {
        window.location.reload()
      }
    }
    setUpgrading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.full_name || "Member"}</h1>
          <p className="text-muted-foreground">Manage your membership and fitness journey</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/api/auth/logout">Logout</Link>
        </Button>
      </div>

      {/* Current Membership */}
      <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <h2 className="text-2xl font-bold mb-4">Current Membership</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Tier</p>
            <p className="text-3xl font-bold capitalize">{user?.membership_tier || "Free"}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Start Date</p>
            <p className="text-lg font-semibold">
              {user?.membership_start_date ? new Date(user.membership_start_date).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Expires</p>
            <p className="text-lg font-semibold">
              {user?.membership_end_date ? new Date(user.membership_end_date).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
      </Card>

      {/* Upgrade Options */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Upgrade Your Membership</h2>
        {loading ? (
          <div className="text-center py-8">Loading membership options...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {membershipTiers.map((tier) => (
              <Card key={tier.id} className="p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold mb-2 capitalize">{tier.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground">/{tier.duration_days} days</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features?.map((feature: string, i: number) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleUpgrade(tier.id)}
                  disabled={upgrading || user?.membership_tier === tier.name.toLowerCase()}
                  className="w-full"
                >
                  {user?.membership_tier === tier.name.toLowerCase() ? "Current Plan" : "Upgrade"}
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
          <h3 className="text-lg font-bold mb-2">Book Classes</h3>
          <p className="text-muted-foreground mb-4">Browse and book your favorite fitness classes</p>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/classes">View Classes</Link>
          </Button>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
          <h3 className="text-lg font-bold mb-2">My Profile</h3>
          <p className="text-muted-foreground mb-4">Update your personal information and preferences</p>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/profile">Edit Profile</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
