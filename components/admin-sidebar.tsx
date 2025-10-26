"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/members", label: "Members", icon: "👥" },
  { href: "/admin/classes", label: "Classes", icon: "🏋️" },
  { href: "/admin/bookings", label: "Bookings", icon: "📅" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen fixed left-0 top-0 pt-20">
      <nav className="p-6 space-y-2">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button variant={pathname === link.href ? "default" : "ghost"} className="w-full justify-start" asChild>
              <span>
                {link.icon} {link.label}
              </span>
            </Button>
          </Link>
        ))}
        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
            <Link href="/api/auth/logout">Logout</Link>
          </Button>
        </div>
      </nav>
    </aside>
  )
}
