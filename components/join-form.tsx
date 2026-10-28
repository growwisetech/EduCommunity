"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitJoinRequest } from "@/app/(site)/join/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { audiences } from "@/content/audiences";
import type { JoinFieldErrors, JoinState } from "@/lib/join-schema";
import { cn } from "@/lib/utils";

const initialState: JoinState = { status: "idle" };

function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-navy">
        {label}
        {optional ? (
          <span className="font-normal text-muted-foreground">(optional)</span>
        ) : (
          <span aria-hidden className="text-destructive">*</span>
        )}
      </Label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, errors: JoinFieldErrors | undefined, hasHint = false) {
  const ids = [hasHint && `${id}-hint`, errors?.[id as keyof JoinFieldErrors] && `${id}-error`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function JoinForm({ defaultRole }: { defaultRole?: string }) {
  const [state, formAction, pending] = useActionState(submitJoinRequest, initialState);
  const statusRef = useRef<HTMLDivElement>(null);
  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const values = state.status === "error" ? state.values : undefined;

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-xl border border-teal/40 bg-accent p-8 text-navy focus:outline-none">
        <CheckCircle2 aria-hidden className="size-8 text-teal-dark" />
        <p className="mt-4 text-xl font-bold">
          Thanks. We review every request and will email your group invite link once approved.
        </p>
      </div>
    );
  }

  const inputClass = "h-11 text-base";

  return (
    <form action={formAction} noValidate className="grid gap-6 rounded-xl border border-border bg-white p-6 sm:p-8">
      {state.status === "error" && state.message && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 font-medium text-destructive focus:outline-none">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label="Full name" error={errors?.fullName}>
          <Input id="fullName" name="fullName" autoComplete="name" required defaultValue={values?.fullName}
            aria-invalid={!!errors?.fullName} aria-describedby={describedBy("fullName", errors)} className={inputClass} />
        </Field>
        <Field id="email" label="Work email" error={errors?.email}>
          <Input id="email" name="email" type="email" autoComplete="email" required defaultValue={values?.email}
            aria-invalid={!!errors?.email} aria-describedby={describedBy("email", errors)} className={inputClass} />
        </Field>
        <Field id="phone" label="Phone number" hint="Used only to add you to WhatsApp." error={errors?.phone}>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required defaultValue={values?.phone}
            aria-invalid={!!errors?.phone} aria-describedby={describedBy("phone", errors, true)} className={inputClass} />
        </Field>
        <Field id="role" label="Role" error={errors?.role}>
          <select
            id="role"
            name="role"
            required
            defaultValue={values?.role ?? defaultRole ?? ""}
            aria-invalid={!!errors?.role}
            aria-describedby={describedBy("role", errors)}
            className={cn(
              "h-11 w-full rounded-lg border border-input bg-white px-3 text-base text-foreground",
              "aria-invalid:border-destructive"
            )}
          >
            <option value="" disabled>
              Select your role
            </option>
            {audiences.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.role}
              </option>
            ))}
          </select>
        </Field>
        <Field id="organization" label="School / district / organization" error={errors?.organization}>
          <Input id="organization" name="organization" autoComplete="organization" required defaultValue={values?.organization}
            aria-invalid={!!errors?.organization} aria-describedby={describedBy("organization", errors)} className={inputClass} />
        </Field>
        <Field id="location" label="Location" hint="City and state, or country." error={errors?.location}>
          <Input id="location" name="location" autoComplete="address-level2" required defaultValue={values?.location}
            aria-invalid={!!errors?.location} aria-describedby={describedBy("location", errors, true)} className={inputClass} />
        </Field>
      </div>

      <Field id="goals" label="What do you hope to get from the community?" optional error={errors?.goals}>
        <Textarea id="goals" name="goals" rows={4} defaultValue={values?.goals} className="text-base"
          aria-describedby={describedBy("goals", errors)} />
      </Field>

      <div aria-hidden inert className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            defaultChecked={values?.consent === "on"}
            aria-invalid={!!errors?.consent}
            aria-describedby={describedBy("consent", errors)}
            className="mt-1 size-5 shrink-0 accent-navy"
          />
          <label htmlFor="consent" className="text-sm leading-6">
            I agree to the{" "}
            <Link href="/legal/privacy" className="font-semibold text-teal-dark underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            and understand how my phone number is used.
            <span aria-hidden className="text-destructive"> *</span>
          </label>
        </div>
        {errors?.consent && (
          <p id="consent-error" className="text-sm font-medium text-destructive">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="marketingConsent"
          name="marketingConsent"
          type="checkbox"
          defaultChecked={values?.marketingConsent === "on"}
          className="mt-1 size-5 shrink-0 accent-navy"
        />
        <label htmlFor="marketingConsent" className="text-sm leading-6">
          Email me community news and updates (optional). You can unsubscribe at any time.
        </label>
      </div>

      <Button type="submit" variant="brand" size="xl" disabled={pending} className="justify-self-start">
        {pending ? "Submitting…" : "Request to Join"}
      </Button>
    </form>
  );
}
