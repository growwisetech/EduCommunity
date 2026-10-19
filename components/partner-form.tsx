"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitPartnerRequest, type PartnerState } from "@/app/(site)/partners/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: PartnerState = { status: "idle" };

export function PartnerForm() {
  const [state, formAction, pending] = useActionState(submitPartnerRequest, initialState);
  const statusRef = useRef<HTMLDivElement>(null);
  const values = state.status === "error" ? state.values : undefined;

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-teal/40 bg-accent p-6 text-navy focus:outline-none"
      >
        <CheckCircle2 aria-hidden className="size-8 text-teal-dark" />
        <p className="mt-4 font-bold">Thanks — your partner application was sent. We&apos;ll follow up by email.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5 rounded-xl border border-border bg-white p-6">
      {state.status === "error" && state.message && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 font-medium text-destructive focus:outline-none"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="p-name">Full name</Label>
          <Input id="p-name" name="name" autoComplete="name" required defaultValue={values?.name} className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="p-email">Work email</Label>
          <Input
            id="p-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values?.email}
            className="h-11"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="p-org">Organization</Label>
          <Input
            id="p-org"
            name="organization"
            autoComplete="organization"
            required
            defaultValue={values?.organization}
            className="h-11"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="p-type">Organization type</Label>
          <select
            id="p-type"
            name="type"
            required
            defaultValue={values?.type ?? ""}
            className="h-11 rounded-lg border border-input bg-white px-3 text-base md:text-sm"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Edtech">Edtech</option>
            <option value="Publisher">Publisher</option>
            <option value="Nonprofit">Nonprofit</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="p-why">How would you like to support education leaders?</Label>
        <Textarea id="p-why" name="message" rows={4} defaultValue={values?.message} />
      </div>
      <Button type="submit" variant="brand" size="xl" disabled={pending} className="justify-self-start">
        {pending ? "Sending…" : "Apply as a Partner"}
      </Button>
    </form>
  );
}
