"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function AdminMembersPage() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTier, setEditTier] = useState("")

  useEffect(() => {
    const fetchMembers = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("users").select("*").order("created_at", { ascending: false })
      setMembers(data || [])
      setLoading(false)
    }
    fetchMembers()
  }, [])

  const handleUpdateMembership = async (userId: string) => {
    const supabase = getSupabaseClient()
    const { error } = await supabase.from("users").update({ membership_tier: editTier }).eq("id", userId)

    if (!error) {
      setMembers(members.map((m) => (m.id === userId ? { ...m, membership_tier: editTier } : m)))
      setEditingId(null)
    }
  }

  if (loading) {
    return <div className="p-8">Loading members...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Members Management</h1>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Membership</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm">{member.full_name || "N/A"}</td>
                  <td className="px-6 py-4 text-sm">{member.email}</td>
                  <td className="px-6 py-4 text-sm">
                    {editingId === member.id ? (
                      <select
                        value={editTier}
                        onChange={(e) => setEditTier(e.target.value)}
                        className="px-2 py-1 border border-input rounded"
                      >
                        <option value="free">Free</option>
                        <option value="starter">Starter</option>
                        <option value="premium">Premium</option>
                        <option value="elite">Elite</option>
                      </select>
                    ) : (
                      <span className="capitalize font-semibold text-primary">{member.membership_tier}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(member.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    {editingId === member.id ? (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleUpdateMembership(member.id)} className="text-xs">
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="text-xs">
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(member.id)
                          setEditTier(member.membership_tier)
                        }}
                        className="text-xs"
                      >
                        Edit
                      </Button>
                    )}
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
