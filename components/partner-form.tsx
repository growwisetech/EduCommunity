"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

export function PartnerForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div role="status" className="rounded-xl border border-teal/40 bg-accent p-6 text-navy">
        <p className="font-bold">Partner applications open soon.</p>
        <p className="mt-2">
          Your details were not saved. In the meantime, email us at{" "}
          <a href={`mailto:${site.contactEmail}`} className="font-semibold text-teal-dark underline">
            {site.contactEmail}
          </a>{" "}
          and we&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5 rounded-xl border border-border bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="p-name">Full name</Label>
          <Input id="p-name" name="name" autoComplete="name" required className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="p-email">Work email</Label>
          <Input id="p-email" name="email" type="email" autoComplete="email" required className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="p-org">Organization</Label>
          <Input id="p-org" name="organization" autoComplete="organization" required className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="p-type">Organization type</Label>
          <select
            id="p-type"
            name="type"
            required
            defaultValue=""
            className="h-11 rounded-lg border border-input bg-white px-3 text-base md:text-sm"
          >
            <option value="" disabled>
              Select one
            </option>
            <option>Edtech</option>
            <option>Publisher</option>
            <option>Nonprofit</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="p-why">How would you like to support education leaders?</Label>
        <Textarea id="p-why" name="message" rows={4} />
      </div>
      <Button type="submit" variant="brand" size="xl" className="justify-self-start">
        Apply as a Partner
      </Button>
    </form>
  );
}
