import { boolean, index, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const requestStatus = pgEnum("request_status", ["pending", "approved", "rejected"]);

export const joinRequests = pgTable(
  "join_requests",
  {
    id: serial("id").primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    role: text("role").notNull(),
    organization: text("organization").notNull(),
    location: text("location").notNull(),
    goals: text("goals"),
    consent: boolean("consent").notNull(),
    marketingConsent: boolean("marketing_consent").notNull().default(false),
    status: requestStatus("status").notNull().default("pending"),
    groupSlug: text("group_slug").notNull(),
    ipHash: text("ip_hash"),
    adminNote: text("admin_note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  },
  (t) => [index("join_requests_status_idx").on(t.status), index("join_requests_ip_idx").on(t.ipHash, t.createdAt)]
);

export const groupInviteLinks = pgTable("group_invite_links", {
  groupSlug: text("group_slug").primaryKey(),
  inviteUrl: text("invite_url").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type JoinRequest = typeof joinRequests.$inferSelect;
