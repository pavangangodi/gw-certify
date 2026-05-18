"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, ClipboardCheck, FileUp, Gauge, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboard, getDomains } from "@/lib/api";
import type { DashboardData, DomainCategory } from "@/lib/types";
import { useAuth } from "@/components/providers/auth-provider";

export function DashboardView() {
  const { token } = useAuth();
  const [dashboard, setDashboard] = React.useState<DashboardData | null>(null);
  const [domainList, setDomainList] = React.useState<DomainCategory[]>([]);

  React.useEffect(() => {
    if (!token) {
      return;
    }

    Promise.all([getDashboard(token), getDomains(token)]).then(([nextDashboard, nextDomains]) => {
      setDashboard(nextDashboard);
      setDomainList(nextDomains);
    });
  }, [token]);

  if (!dashboard) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border bg-card/70">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">Dashboard</CardTitle>
                <CardDescription>Track certification readiness and start a timed practice session.</CardDescription>
              </div>
              <Badge variant="outline" className="gap-2">
                <Gauge className="size-3.5" />
                Readiness {dashboard.readiness}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-5 p-5 md:grid-cols-3">
            <MetricCard icon={ClipboardCheck} label="Total tests taken" value={dashboard.totalTests.toString()} detail="+2 this week" />
            <MetricCard icon={Target} label="Accuracy" value={`${dashboard.accuracy}%`} detail="Certification trend" />
            <MetricCard icon={TrendingUp} label="Recent best" value={`${Math.max(...dashboard.recentScores.map((score) => score.accuracy))}%`} detail="Last 5 attempts" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Choose a built-in set or scan your own document.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild size="lg" className="justify-between">
              <Link href="/tests/practice">
                <span className="inline-flex items-center gap-2">
                  <ClipboardCheck data-icon="inline-start" />
                  Predefined MCQ test
                </span>
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="justify-between">
              <Link href="/upload">
                <span className="inline-flex items-center gap-2">
                  <FileUp data-icon="inline-start" />
                  Upload & take test
                </span>
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Weak Domains</CardTitle>
            <CardDescription>Lowest scoring domains from recent attempts.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {dashboard.weakDomains.map((domain) => (
              <div key={domain.domain} className="grid gap-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{domain.domain}</span>
                  <span className="text-muted-foreground">{domain.accuracy}% accuracy</span>
                </div>
                <Progress value={domain.accuracy} />
                <p className="text-xs text-muted-foreground">{domain.attempts} questions attempted</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Scores</CardTitle>
            <CardDescription>Stored user test history appears here after each submission.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {dashboard.recentScores.map((score) => (
              <div key={score.id} className="grid gap-3 rounded-lg border border-border bg-background/55 p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="font-medium">{score.testName}</p>
                  <p className="text-sm text-muted-foreground">{new Date(score.submittedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={score.accuracy >= 80 ? "success" : score.accuracy >= 65 ? "warning" : "destructive"}>
                    {score.accuracy}%
                  </Badge>
                  <span className="text-sm text-muted-foreground">Score {score.score}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {domainList.map((domain) => (
          <Card key={domain.id} className="bg-card/82">
            <CardHeader>
              <CardTitle className="text-base">{domain.name}</CardTitle>
              <CardDescription>{domain.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, detail }: { icon: typeof BarChart3; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/55 p-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="size-5 text-primary" />
      </div>
      <p className="text-3xl font-semibold tracking-normal">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-6">
      <Skeleton className="h-48" />
      <div className="grid gap-4 xl:grid-cols-2">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>
    </div>
  );
}
