"use client";

import * as React from "react";
import Link from "next/link";
import { BarChart3, FileUp, Plus, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminAnalytics } from "@/lib/api";
import { useAuth } from "@/components/providers/auth-provider";

type AdminAnalytics = Awaited<ReturnType<typeof getAdminAnalytics>>;

export function AdminView() {
  const { token, user } = useAuth();
  const [analytics, setAnalytics] = React.useState<AdminAnalytics | null>(null);

  React.useEffect(() => {
    if (!token) {
      return;
    }

    getAdminAnalytics(token).then(setAnalytics);
  }, [token]);

  if (!analytics) {
    return <Skeleton className="h-[620px]" />;
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Admin Panel</CardTitle>
              <CardDescription>Manage question banks, tests, users, and analytics.</CardDescription>
            </div>
            <Badge variant={user?.role === "ADMIN" ? "warning" : "secondary"}>
              {user?.role === "ADMIN" ? "Admin access" : "Preview mode"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 md:grid-cols-4">
          <AdminMetric icon={Users} label="Users" value={(analytics.users ?? 2).toString()} />
          <AdminMetric icon={ShieldCheck} label="Domains" value={analytics.domains.toString()} />
          <AdminMetric icon={FileUp} label="Questions" value={analytics.questions.toString()} />
          <AdminMetric icon={BarChart3} label="Completed tests" value={analytics.completedTests.toString()} />
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle>Create Tests</CardTitle>
            <CardDescription>Assemble certification practice sets from uploaded banks.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {["PolicyCenter Associate Practice", "BillingCenter Domain Sprint", "Playwright Automation Mixed"].map((test) => (
              <div key={test} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/55 p-4">
                <div>
                  <p className="font-medium">{test}</p>
                  <p className="text-sm text-muted-foreground">Active question pool</p>
                </div>
                <Badge variant="outline">Draft</Badge>
              </div>
            ))}
            <Button asChild className="mt-2">
              <Link href="/upload">
                <Plus data-icon="inline-start" />
                Upload question bank
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Question Mix</CardTitle>
            <CardDescription>Distribution by domain across the current bank.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {analytics.questionMix.map((item) => (
              <div key={item.domain} className="grid gap-2 rounded-lg border border-border bg-background/55 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{item.domain}</span>
                  <span className="text-sm text-muted-foreground">{item.questions} questions</span>
                </div>
                <div className="h-2 overflow-hidden rounded-md bg-secondary">
                  <div className="h-full rounded-md bg-primary" style={{ width: `${Math.min(100, item.questions * 12)}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
          <CardDescription>Role and activity snapshot for certification workspace members.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="border-b border-border px-4 py-3 font-medium">Name</th>
                <th className="border-b border-border px-4 py-3 font-medium">Email</th>
                <th className="border-b border-border px-4 py-3 font-medium">Role</th>
                <th className="border-b border-border px-4 py-3 font-medium">Tests</th>
                <th className="border-b border-border px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Pavan Learner", "student@gwcertify.local", "USER", "6"],
                ["GW Admin", "admin@gwcertify.local", "ADMIN", "3"]
              ].map(([name, email, role, tests]) => (
                <tr key={email}>
                  <td className="border-b border-border px-4 py-3 font-medium">{name}</td>
                  <td className="border-b border-border px-4 py-3 text-muted-foreground">{email}</td>
                  <td className="border-b border-border px-4 py-3">
                    <Badge variant={role === "ADMIN" ? "warning" : "secondary"}>{role}</Badge>
                  </td>
                  <td className="border-b border-border px-4 py-3">{tests}</td>
                  <td className="border-b border-border px-4 py-3">
                    <Badge variant="success">Active</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminMetric({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/55 p-4">
      <Icon className="mb-4 size-5 text-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
