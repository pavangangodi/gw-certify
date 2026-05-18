"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  Flag,
  Layers3,
  Loader2,
  Send,
  UploadCloud
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getDurationMinutesForQuestionCount, getPredefinedQuestionSets, startPracticeTest, submitPracticeTest } from "@/lib/api";
import type { ClientQuestion, PredefinedQuestionSet, TestSession } from "@/lib/types";
import { cn, formatSeconds } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";

const questionCountOptions = [10, 25, 50, 75, 100, 150, 200];
const uploadRoundSize = 25;

export function ExamEngine() {
  const { token } = useAuth();
  const router = useRouter();
  const [session, setSession] = React.useState<TestSession | null>(null);
  const [questions, setQuestions] = React.useState<ClientQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, number[]>>({});
  const [markedForReview, setMarkedForReview] = React.useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = React.useState(0);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [predefinedSets, setPredefinedSets] = React.useState<PredefinedQuestionSet[]>([]);
  const [selectedSetId, setSelectedSetId] = React.useState("");
  const [selectedQuestionCount, setSelectedQuestionCount] = React.useState(25);
  const [setsLoading, setSetsLoading] = React.useState(false);
  const [starting, setStarting] = React.useState(false);
  const [startError, setStartError] = React.useState("");
  const [directUploadId, setDirectUploadId] = React.useState("");
  const autoStartedUpload = React.useRef(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uploadId = params.get("uploadId");
    const setId = params.get("setId");

    if (uploadId) {
      setDirectUploadId(uploadId);
    }

    if (setId) {
      setSelectedSetId(setId);
    }
  }, []);

  React.useEffect(() => {
    if (!token) {
      return;
    }

    let mounted = true;
    setSetsLoading(true);

    getPredefinedQuestionSets(token)
      .then((sets) => {
        if (!mounted) {
          return;
        }

        setPredefinedSets(sets);
        setSelectedSetId((current) => (current && sets.some((set) => set.id === current) ? current : sets[0]?.id ?? ""));
      })
      .catch((error) => {
        if (mounted) {
          setStartError(error instanceof Error ? error.message : "Unable to load predefined sets.");
        }
      })
      .finally(() => {
        if (mounted) {
          setSetsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [token]);

  React.useEffect(() => {
    if (!token || !directUploadId || autoStartedUpload.current) {
      return;
    }

    autoStartedUpload.current = true;
    void startUploadedRound(directUploadId);
  }, [token, directUploadId]);

  React.useEffect(() => {
    if (!session || timeRemaining <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [session, timeRemaining]);

  React.useEffect(() => {
    if (session && timeRemaining === 0 && questions.length > 0 && !submitting) {
      void handleSubmit();
    }
  }, [timeRemaining]);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.values(answers).filter((answer) => answer.length > 0).length;
  const totalSeconds = (session?.durationMinutes ?? 45) * 60;
  const selectedSet = predefinedSets.find((set) => set.id === selectedSetId);
  const effectivePredefinedCount = Math.min(selectedQuestionCount, selectedSet?.questionCount ?? selectedQuestionCount);
  const selectedDurationMinutes = getDurationMinutesForQuestionCount(effectivePredefinedCount);
  const uploadDurationMinutes = getDurationMinutesForQuestionCount(uploadRoundSize);

  function resetRound(started: { session: TestSession; questions: ClientQuestion[] }) {
    setSession(started.session);
    setQuestions(started.questions);
    setCurrentIndex(0);
    setAnswers({});
    setMarkedForReview([]);
    setTimeRemaining(started.session.durationMinutes * 60);
  }

  async function startPredefinedRound() {
    if (!token || !selectedSet) {
      setStartError("Choose Set 1, Set 2, Set 3, or Set 4 first.");
      return;
    }

    setStarting(true);
    setStartError("");

    try {
      const started = await startPracticeTest(token, {
        predefinedSetId: selectedSet.id,
        questionCount: selectedQuestionCount,
        testName: selectedSet.name
      });
      resetRound(started);
    } catch (error) {
      setStartError(error instanceof Error ? error.message : "Unable to start predefined test.");
    } finally {
      setStarting(false);
    }
  }

  async function startUploadedRound(uploadId: string) {
    if (!token) {
      return;
    }

    setStarting(true);
    setStartError("");

    try {
      const started = await startPracticeTest(token, {
        uploadId,
        questionCount: uploadRoundSize,
        testName: "Uploaded Document Practice"
      });
      resetRound(started);
    } catch (error) {
      setStartError(error instanceof Error ? error.message : "Unable to start test from the uploaded document.");
    } finally {
      setStarting(false);
    }
  }

  function answerQuestion(optionIndex: number) {
    if (!currentQuestion) {
      return;
    }

    setAnswers((current) => {
      const currentAnswers = current[currentQuestion.id] ?? [];
      const answerCount = currentQuestion.answerCount ?? 1;
      const nextAnswers =
        answerCount > 1
          ? currentAnswers.includes(optionIndex)
            ? currentAnswers.filter((index) => index !== optionIndex)
            : [...currentAnswers, optionIndex].slice(0, answerCount)
          : [optionIndex];

      return {
        ...current,
        [currentQuestion.id]: nextAnswers.sort((a, b) => a - b)
      };
    });
  }

  function toggleReview() {
    if (!currentQuestion) {
      return;
    }

    setMarkedForReview((current) =>
      current.includes(currentQuestion.id)
        ? current.filter((id) => id !== currentQuestion.id)
        : [...current, currentQuestion.id]
    );
  }

  async function handleSubmit() {
    if (!token || !session) {
      return;
    }

    setSubmitting(true);
    const timeTakenSeconds = totalSeconds - timeRemaining;
    const result = await submitPracticeTest(token, session.id, answers, markedForReview, timeTakenSeconds);
    window.localStorage.setItem("gw-certify-last-result", JSON.stringify(result));
    setSubmitting(false);
    router.push("/results/demo");
  }

  if (!session && directUploadId) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border bg-card/70">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg bg-accent text-primary">
              {starting ? <Loader2 className="size-5 animate-spin" /> : <FileSpreadsheet className="size-5" />}
            </div>
            <div>
              <CardTitle>Preparing Uploaded Test</CardTitle>
              <CardDescription>GW Certify is starting a practice round directly from the document you just uploaded.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <Skeleton className="h-24" />
          {startError ? <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{startError}</p> : null}
          <Button asChild variant="outline" className="w-full md:w-fit">
            <Link href="/upload">
              <UploadCloud data-icon="inline-start" />
              Upload another file
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!session) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Badge variant="outline" className="w-fit gap-2">
            <Layers3 className="size-3.5" />
            Two exam modules
          </Badge>
          <h2 className="text-3xl font-semibold tracking-normal">Choose how you want to practice</h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            Use predefined Guidewire sets for built-in practice, or upload a new Excel/DOCX/TXT bank and start directly from that scanned file.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border bg-card/70">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="grid size-11 place-items-center rounded-lg bg-accent text-primary">
                    <BookOpenCheck className="size-5" />
                  </div>
                  <div>
                    <CardTitle>Predefined MCQ Test</CardTitle>
                    <CardDescription>Select Set 1, Set 2, Set 3, or Set 4. No upload required.</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">Built-in sets</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 p-6">
              {setsLoading ? (
                <div className="grid gap-3 md:grid-cols-2">
                  <Skeleton className="h-28" />
                  <Skeleton className="h-28" />
                  <Skeleton className="h-28" />
                  <Skeleton className="h-28" />
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {predefinedSets.map((set) => {
                    const selected = selectedSetId === set.id;

                    return (
                      <button
                        key={set.id}
                        type="button"
                        onClick={() => setSelectedSetId(set.id)}
                        className={cn(
                          "grid gap-3 rounded-lg border border-border bg-background/55 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-accent",
                          selected && "border-primary bg-accent text-accent-foreground shadow-certification"
                        )}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-lg font-semibold">{set.label}</span>
                          <Badge variant={selected ? "default" : "secondary"}>{set.questionCount} questions</Badge>
                        </span>
                        <span className="truncate text-sm text-muted-foreground">{set.sourceFile}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="grid gap-3">
                <p className="text-sm font-medium text-muted-foreground">Round size</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
                  {questionCountOptions.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setSelectedQuestionCount(count)}
                      className={cn(
                        "rounded-lg border border-border bg-background/55 px-4 py-4 text-center text-lg font-semibold transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-accent",
                        selectedQuestionCount === count && "border-primary bg-primary text-primary-foreground shadow-certification"
                      )}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 rounded-lg border border-border bg-background/50 p-5 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Selected set</p>
                  <p className="mt-1 text-2xl font-semibold">{selectedSet?.label ?? "None"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="mt-1 text-2xl font-semibold">{selectedSet?.questionCount ?? 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timer</p>
                  <p className="mt-1 text-2xl font-semibold">{selectedDurationMinutes} min</p>
                </div>
              </div>

              {selectedSet && selectedSet.questionCount < selectedQuestionCount ? (
                <p className="rounded-md border border-warning/40 bg-warning/10 p-3 text-sm text-muted-foreground">
                  {selectedSet.label} has {selectedSet.questionCount} questions, so this round will use all available questions from that set.
                </p>
              ) : null}

              {startError ? <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{startError}</p> : null}

              <Button size="lg" onClick={startPredefinedRound} disabled={starting || setsLoading || !selectedSetId} className="w-full md:w-fit">
                {starting ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <Send data-icon="inline-start" />}
                Start predefined test
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border bg-card/70">
              <div className="flex items-start gap-3">
                <div className="grid size-11 place-items-center rounded-lg bg-accent text-primary">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <CardTitle>Upload & Take Test</CardTitle>
                  <CardDescription>Upload Excel, DOCX, PDF, TXT, or CSV. After scan, the exam starts from that upload only.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-5 p-6">
              <div className="grid gap-3 rounded-lg border border-border bg-background/50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">Selection step</span>
                  <Badge variant="success">Skipped</Badge>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">Default round</span>
                  <span className="text-sm font-semibold">Up to {uploadRoundSize} questions</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">Timer</span>
                  <span className="text-sm font-semibold">{uploadDurationMinutes} minutes</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">Question source</span>
                  <span className="text-sm font-semibold">Uploaded file only</span>
                </div>
              </div>

              <Button asChild size="lg">
                <Link href="/upload">
                  <UploadCloud data-icon="inline-start" />
                  Open upload module
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!session || !currentQuestion) {
    return (
      <div className="grid gap-4 xl:grid-cols-[260px_1fr]">
        <Skeleton className="h-[680px]" />
        <Skeleton className="h-[680px]" />
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <Badge variant="outline">{session.testName}</Badge>
          <span className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold",
              timeRemaining < 300 ? "border-destructive text-destructive" : "border-border text-primary"
            )}
          >
            <Clock3 className="size-4" />
            {formatSeconds(timeRemaining)}
          </div>
          <Badge variant="secondary">
            {answeredCount}/{questions.length} answered
          </Badge>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[260px_1fr]">
        <QuestionPalette
          questions={questions}
          answers={answers}
          markedForReview={markedForReview}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
        />

        <Card className="min-h-[640px]">
          <CardHeader className="border-b border-border">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle>Question {currentIndex + 1}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">
                  {currentQuestion.tags.join(" / ")} - Choose {currentQuestion.answerCount ?? 1} option
                  {(currentQuestion.answerCount ?? 1) > 1 ? "s" : ""}
                </p>
              </div>
              <Button variant={markedForReview.includes(currentQuestion.id) ? "secondary" : "outline"} onClick={toggleReview}>
                <Flag data-icon="inline-start" />
                Mark for review
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8 p-6">
            <div className="rounded-lg border border-border bg-background/55 p-5">
              <p className="text-xl font-semibold leading-8">{currentQuestion.prompt}</p>
            </div>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, optionIndex) => {
                const selected = (answers[currentQuestion.id] ?? []).includes(optionIndex);

                return (
                  <button
                    key={`${option}-${optionIndex}`}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => answerQuestion(optionIndex)}
                    className={cn(
                      "grid grid-cols-[42px_1fr] items-center gap-4 rounded-lg border border-border bg-background/55 p-4 text-left transition-colors hover:border-primary/70 hover:bg-accent/60",
                      selected && "border-primary bg-accent text-accent-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-md border border-border text-sm font-semibold",
                        selected && "border-primary bg-primary text-primary-foreground"
                      )}
                    >
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span className="text-base leading-7">{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <Button variant="outline" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0}>
                <ArrowLeft data-icon="inline-start" />
                Previous
              </Button>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))}
                  disabled={currentIndex === questions.length - 1}
                >
                  Next
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
                  <Send data-icon="inline-start" />
                  Submit Test
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit test?</DialogTitle>
            <DialogDescription>
              You answered {answeredCount} of {questions.length} questions. Marked questions stay visible in the result summary.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 rounded-lg border border-border bg-background/55 p-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="size-4 text-success" />
                Answered
              </span>
              <span>{answeredCount}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="size-4 text-warning" />
                Marked for review
              </span>
              <span>{markedForReview.length}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={submitting}>
              Continue test
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <Send data-icon="inline-start" />}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function QuestionPalette({
  questions,
  answers,
  markedForReview,
  currentIndex,
  onSelect
}: {
  questions: ClientQuestion[];
  answers: Record<string, number[]>;
  markedForReview: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <Card className="h-fit xl:sticky xl:top-5">
      <CardHeader>
        <CardTitle>Question Palette</CardTitle>
        <div className="grid gap-2 text-xs text-muted-foreground">
          <Legend color="bg-success" label="Answered" />
          <Legend color="bg-destructive" label="Unanswered" />
          <Legend color="bg-warning" label="Marked for review" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 xl:grid-cols-4">
          {questions.map((question, index) => {
            const marked = markedForReview.includes(question.id);
            const answered = Boolean(answers[question.id]?.length);

            return (
              <button
                key={question.id}
                type="button"
                onClick={() => onSelect(index)}
                className={cn(
                  "grid size-10 place-items-center rounded-md border text-sm font-semibold transition-transform hover:scale-[1.03]",
                  answered ? "border-success bg-success text-success-foreground" : "border-destructive bg-destructive text-destructive-foreground",
                  marked && "border-warning bg-warning text-warning-foreground",
                  currentIndex === index && "ring-2 ring-ring ring-offset-2 ring-offset-background"
                )}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("size-2.5 rounded-sm", color)} />
      {label}
    </span>
  );
}
