"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/providers/auth-provider";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [pending, setPending] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      await register(name, email, password);
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "Registration failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-2 grid size-11 place-items-center rounded-lg bg-accent text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <CardTitle>Create GW Certify account</CardTitle>
          <CardDescription>Start saving test history, weak domains, and uploaded question banks.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            {error ? <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
            <Button type="submit" disabled={pending}>
              {pending ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <ArrowRight data-icon="inline-start" />}
              Register
            </Button>
          </form>
          <p className="mt-5 text-sm text-muted-foreground">
            Already registered?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
