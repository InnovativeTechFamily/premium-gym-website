import { getSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardContent } from "@/components/dashboard-content"

export default async function DashboardPage() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-background pt-20">
      <DashboardContent user={userData} />
    </div>
  )
}
