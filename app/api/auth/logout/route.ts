import { getSupabaseServer } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function GET() {
  const supabase = await getSupabaseServer()
  await supabase.auth.signOut()
  redirect("/")
}
