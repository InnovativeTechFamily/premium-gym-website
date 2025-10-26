"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = getSupabaseClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        router.push("/login")
        return
      }

      const { data: userData } = await supabase.from("users").select("*").eq("id", authUser.id).single()

      if (userData) {
        setUser(userData)
        setFullName(userData.full_name || "")
        setPhone(userData.phone || "")
      }
      setLoading(false)
    }

    fetchUser()
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase
        .from("users")
        .update({
          full_name: fullName,
          phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) {
        setMessage("Error saving profile")
      } else {
        setMessage("Profile updated successfully!")
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (err) {
      setMessage("An error occurred")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          <form onSubmit={handleSave} className="space-y-6">
            {message && (
              <div
                className={`p-4 rounded-lg ${message.includes("successfully") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {message}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-2 border border-input rounded-lg bg-muted"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
