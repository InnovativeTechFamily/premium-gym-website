import type React from "react"
import { getSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: userData } = await supabase.from("users").select("is_admin").eq("id", user.id).single()

  if (!userData?.is_admin) {
    redirect("/")
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 pt-20 bg-background min-h-screen">{children}</main>
    </div>
  )
}
