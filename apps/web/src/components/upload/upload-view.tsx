"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, FileText, Loader2, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getDomains, uploadQuestionBank } from "@/lib/api";
import type { DomainCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";

const sampleFormat = `Q1. What is PolicyCenter?
Billing application
✔ Policy administration system
CRM tool
Database
Note: Choose 1 option

Q2. Story huddles typically include which roles?
✔ Developers
Product Owners
✔ Quality Analysts
✔ Business Analysts
Note: Choose 3 options`;

export function UploadView() {
  const { token } = useAuth();
  const [domainList, setDomainList] = React.useState<DomainCategory[]>([]);
  const [domainId, setDomainId] = React.useState("policycenter");
  const [file, setFile] = React.useState<File | null>(null);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<Awaited<ReturnType<typeof uploadQuestionBank>> | null>(null);

  React.useEffect(() => {
    if (!token) {
      return;
    }

    getDomains(token).then(setDomainList);
  }, [token]);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token || !file) {
      setError("Choose a PDF, DOCX, TXT, XLSX, XLSM, or CSV question bank first.");
      return;
    }

    const formData = new FormData();
    formData.append("domainId", domainId);
    formData.append("file", file);

    setPending(true);
    setError("");
    setResult(null);

    try {
      setResult(await uploadQuestionBank(token, formData));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg bg-accent text-primary">
              <UploadCloud className="size-5" />
            </div>
            <div>
              <CardTitle>Upload Questions</CardTitle>
              <CardDescription>PDF, DOCX, TXT, and Excel question banks are converted into structured MCQs.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5" onSubmit={handleUpload}>
            <div className="grid gap-2">
              <Label htmlFor="domain">Domain</Label>
              <select
                id="domain"
                value={domainId}
                onChange={(event) => setDomainId(event.target.value)}
                className="h-10 rounded-md border border-input bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {domainList.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </div>

            <label
              htmlFor="file"
              className={cn(
                "grid cursor-pointer gap-3 rounded-lg border border-dashed border-border bg-background/55 p-8 text-center transition-colors hover:border-primary",
                file && "border-primary bg-accent/45"
              )}
            >
              <FileText className="mx-auto size-10 text-primary" />
              <span className="text-base font-semibold">{file ? file.name : "Drop or select a question bank"}</span>
              <span className="text-sm text-muted-foreground">Supported formats: PDF, DOCX, TXT, XLSX, XLSM, CSV</span>
              <input
                id="file"
                type="file"
                accept=".pdf,.docx,.txt,.xlsx,.xlsm,.csv"
                className="sr-only"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
            </label>

            {error ? <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}

            <Button type="submit" disabled={pending}>
              {pending ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <UploadCloud data-icon="inline-start" />}
              Parse and store questions
            </Button>
          </form>

          {result ? (
            <div className="mt-5 grid gap-4 rounded-lg border border-success/40 bg-success/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-success">
                  <CheckCircle2 className="size-4" />
                  {result.storedQuestions} questions stored from {result.fileName}
                </div>
                <Button asChild size="sm">
                  <Link href={`/tests/practice?mode=upload&uploadId=${encodeURIComponent(result.uploadId)}`}>
                    <ClipboardList data-icon="inline-start" />
                    Start exam now
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-2 rounded-md border border-border bg-background/55 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-muted-foreground">Question bank</span>
                  <span className="font-medium">{result.upload.domainName ?? "Selected domain"}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-muted-foreground">Next step</span>
                  <span className="font-medium">Click Start exam now</span>
                </div>
              </div>
              <div className="grid gap-2">
                {result.preview.map((question) => (
                  <div key={question.id} className="rounded-md border border-border bg-background/60 p-3">
                    <p className="text-sm font-medium">{question.prompt}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{question.options.join(" / ")}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported MCQ Pattern</CardTitle>
          <CardDescription>The backend extracts text and detects this certification-style format.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Textarea value={sampleFormat} readOnly className="min-h-48 font-mono text-sm" />
          <div className="grid gap-3">
            <Badge variant="secondary">Parser: Q-number + checkmarked answers or Answer key</Badge>
            <Badge variant="outline">Answer-only Excel banks get randomized distractors from the same dump</Badge>
            <Badge variant="outline">AI-ready service boundary for future OpenAI enrichment</Badge>
            <Badge variant="outline">Admin banks and user uploads share the same parser</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
