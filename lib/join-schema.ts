import { z } from "zod";
import { roleSlugs } from "@/content/audiences";

export const joinSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.email("Please enter a valid work email.").trim().toLowerCase().max(200),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s().-]{7,25}$/, "Please enter a valid phone number, including country code if outside the US.")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Please enter a valid phone number."),
  role: z.enum(roleSlugs, "Please choose your role."),
  organization: z.string().trim().min(2, "Please enter your school, district, or organization.").max(200),
  location: z.string().trim().min(2, "Please enter your city and state or country.").max(200),
  goals: z.string().trim().max(2000).optional(),
  consent: z.literal("on", "You must agree to the Privacy Policy to continue."),
});

export type JoinFieldErrors = Partial<Record<keyof z.infer<typeof joinSchema>, string>>;

export type JoinState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message?: string; fieldErrors?: JoinFieldErrors; values?: Record<string, string> };
