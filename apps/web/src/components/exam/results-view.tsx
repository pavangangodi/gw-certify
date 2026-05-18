"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, RotateCcw, Target, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { demoResult } from "@/lib/mock-data";
import type { TestResult } from "@/lib/types";
import { formatSeconds } from "@/lib/utils";

export function ResultsView() {
  const [result, setResult] = React.useState<TestResult>(demoResult);

  React.useEffect(() => {
    const stored = window.localStorage.getItem("gw-certify-last-result");

    if (stored) {
      setResult(JSON.parse(stored) as TestResult);
    }
  }, []);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Results Page</CardTitle>
              <CardDescription>Certification attempt summary with topic-wise performance and weak areas.</CardDescription>
            </div>
            <Badge variant={result.accuracy >= 80 ? "success" : result.accuracy >= 65 ? "warning" : "destructive"}>
              {result.accuracy >= 80 ? "Ready trend" : result.accuracy >= 65 ? "Needs review" : "High risk"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5 p-5 md:grid-cols-4">
          <ResultMetric icon={Target} label="Score" value={`${result.score}/${result.total}`} />
          <ResultMetric icon={CheckCircle2} label="Accuracy" value={`${result.accuracy}%`} />
          <ResultMetric icon={Clock3} label="Time taken" value={formatSeconds(result.timeTakenSeconds)} />
          <ResultMetric icon={XCircle} label="Wrong / skipped" value={`${result.wrongAnswers}/${result.unanswered}`} />
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Topic-wise Performance</CardTitle>
            <CardDescription>Accuracy by certification domain.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {result.topicBreakdown.map((topic) => (
              <div key={topic.domainId} className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{topic.domainName}</p>
                    <p className="text-xs text-muted-foreground">
                      {topic.correct} correct out of {topic.total}
                    </p>
                  </div>
                  <Badge variant={topic.accuracy >= 80 ? "success" : topic.accuracy >= 65 ? "warning" : "destructive"}>
                    {topic.accuracy}%
                  </Badge>
                </div>
                <Progress value={topic.accuracy} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weak Areas</CardTitle>
            <CardDescription>Use these topics to plan your next question bank.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {result.weakAreas.length ? (
              result.weakAreas.map((area) => (
                <div key={area} className="rounded-lg border border-border bg-background/55 p-4">
                  <p className="font-medium">{area}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Review concepts, then take a focused domain sprint.</p>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-border bg-background/55 p-4">
                <p className="font-medium">No weak areas detected</p>
                <p className="mt-1 text-sm text-muted-foreground">Your latest attempt is trending above the target threshold.</p>
              </div>
            )}

            <div className="grid gap-3 pt-2">
              <Button asChild>
                <Link href="/tests/practice">
                  <RotateCcw data-icon="inline-start" />
                  Retake test
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/upload">
                  Upload new bank
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ResultMetric({ icon: Icon, label, value }: { icon: typeof Target; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/55 p-4">
      <Icon className="mb-4 size-5 text-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
