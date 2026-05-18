"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/providers/auth-provider";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [pending, setPending] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      await login(email, password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden border-r border-border bg-background px-10 py-12 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-lg border border-primary/30 bg-primary/15 text-primary">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <p className="text-xl font-semibold">GW Certify</p>
            <p className="text-sm text-muted-foreground">Certification exam readiness</p>
          </div>
        </div>

        <div className="max-w-xl animate-fade-up">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.22em] text-primary">Associate Certification Console</p>
          <h1 className="text-5xl font-semibold leading-tight tracking-normal">
            Practice, upload, and review Guidewire exam readiness in one secure workspace.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            A focused dark portal for MCQ banks, timed exams, performance history, weak-domain analytics, and admin review.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            ["60", "Question palette"],
            ["1.5m", "Per question"],
            ["6", "Exam domains"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-border bg-card p-4">
              <p className="text-2xl font-semibold text-primary">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid place-items-center px-5 py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="mb-2 grid size-11 place-items-center rounded-lg bg-accent text-primary">
              <LockKeyhole className="size-5" />
            </div>
            <CardTitle>Login to GW Certify</CardTitle>
            <CardDescription>Use your certification workspace account to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {error ? <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
              <Button type="submit" disabled={pending}>
                {pending ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <ArrowRight data-icon="inline-start" />}
                Login
              </Button>
            </form>
            <p className="mt-5 text-sm text-muted-foreground">
              New user?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Create account
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
