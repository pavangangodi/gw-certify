"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2, Clock3, RotateCcw, Target, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { demoResult } from "@/lib/mock-data";
import type { TestResult } from "@/lib/types";
import { formatSeconds } from "@/lib/utils";

export function ResultsView() {
  const [result, setResult] = React.useState<TestResult>(demoResult);
  const reviewItems = result.questionReview ?? [];
  const missedItems = reviewItems.filter((item) => !item.isCorrect);

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

      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpenCheck className="size-5 text-primary" />
                Answer Review
              </CardTitle>
              <CardDescription>Review correct answers for incorrect or skipped questions after submission.</CardDescription>
            </div>
            <Badge variant={missedItems.length ? "warning" : "success"}>
              {missedItems.length ? `${missedItems.length} to review` : "All correct"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-5">
          {missedItems.length ? (
            missedItems.map((item, index) => (
              <div key={item.questionId} className="grid gap-4 rounded-lg border border-border bg-background/55 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Badge variant={item.isAnswered ? "destructive" : "warning"}>{item.isAnswered ? "Incorrect" : "Skipped"}</Badge>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Question {index + 1} / {item.domainName}
                    </p>
                    <p className="mt-2 text-base font-semibold leading-7">{item.prompt}</p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <AnswerBox
                    label="Your answer"
                    value={item.selectedOptions.length ? item.selectedOptions.join(", ") : "Not answered"}
                    state={item.isAnswered ? "wrong" : "skipped"}
                  />
                  <AnswerBox label="Correct answer" value={item.correctOptions.join(", ")} state="correct" />
                </div>

                <div className="grid gap-2">
                  {item.options.map((option, optionIndex) => {
                    const isCorrect = item.correctIndexes.includes(optionIndex);
                    const isSelected = item.selectedIndexes.includes(optionIndex);

                    return (
                      <div
                        key={`${item.questionId}-${optionIndex}`}
                        className={[
                          "grid grid-cols-[32px_1fr] items-center gap-3 rounded-md border border-border bg-card/60 p-3 text-sm",
                          isCorrect ? "border-success/60 bg-success/10" : "",
                          isSelected && !isCorrect ? "border-destructive/60 bg-destructive/10" : ""
                        ].join(" ")}
                      >
                        <span className="grid size-8 place-items-center rounded-md border border-border font-semibold">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        <span>{option}</span>
                      </div>
                    );
                  })}
                </div>

                {item.explanation ? (
                  <p className="rounded-md border border-border bg-card/60 p-3 text-sm leading-6 text-muted-foreground">
                    {item.explanation}
                  </p>
                ) : null}
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-success/40 bg-success/10 p-4">
              <p className="font-medium text-success">No incorrect answers to review.</p>
              <p className="mt-1 text-sm text-muted-foreground">Nice attempt. Every answered question matched the correct answer key.</p>
            </div>
          )}
        </CardContent>
      </Card>
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

function AnswerBox({ label, value, state }: { label: string; value: string; state: "correct" | "wrong" | "skipped" }) {
  return (
    <div className="rounded-lg border border-border bg-card/60 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        {state === "correct" ? <CheckCircle2 className="size-4 text-success" /> : <XCircle className="size-4 text-destructive" />}
        {label}
      </div>
      <p className="text-sm font-semibold leading-6">{value}</p>
    </div>
  );
}
