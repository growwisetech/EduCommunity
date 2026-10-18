"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="mt-6 grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={!!state.error}
          aria-describedby={state.error ? "password-error" : undefined}
          className="h-11"
        />
        {state.error && (
          <p id="password-error" role="alert" className="text-sm font-medium text-destructive">
            {state.error}
          </p>
        )}
      </div>
      <Button type="submit" variant="default" size="xl" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
