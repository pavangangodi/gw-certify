"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ClipboardList, LayoutDashboard, LogOut, Settings, ShieldCheck, UploadCloud, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRequireAuth } from "@/components/providers/auth-provider";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tests/practice", label: "Predefined Tests", icon: ClipboardList },
  { href: "/upload", label: "Upload Test", icon: UploadCloud },
  { href: "/admin", label: "Admin Panel", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, loading } = useRequireAuth();

  if (loading || !user) {
    return (
      <main className="grid min-h-screen place-items-center bg-background">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <ShieldCheck className="size-5 text-primary" />
          Loading secure workspace...
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-border bg-background/80 px-4 py-4 shadow-certification backdrop-blur-xl lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col gap-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg border border-primary/30 bg-primary/15 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold">GW Certify</span>
              <span className="text-xs text-muted-foreground">Associate exam portal</span>
            </div>
          </Link>

          <nav className="grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                    active && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto grid gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <UserCircle className="size-9 text-primary" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Badge variant={user.role === "ADMIN" ? "warning" : "secondary"}>{user.role}</Badge>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut data-icon="inline-start" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-background/70 px-5 py-4 shadow-certification backdrop-blur-xl xl:px-8">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Certification readiness workspace</p>
            <h1 className="truncate text-xl font-semibold">Guidewire Associate Certification Practice</h1>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Badge variant="outline" className="gap-2">
              <BarChart3 className="size-3.5" />
              Live mock mode ready
            </Badge>
          </div>
        </header>
        <div className="surface-line min-h-[calc(100vh-73px)] p-5 xl:p-8">{children}</div>
      </main>
    </div>
  );
}
