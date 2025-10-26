"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = getSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkUser()
  }, [])

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline">FitPeak</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#classes" className="text-sm font-medium hover:text-primary transition-colors">
            Classes
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>

          {!loading && (
            <>
              {user ? (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/api/auth/logout">Logout</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
