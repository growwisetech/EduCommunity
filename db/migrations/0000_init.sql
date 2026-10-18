CREATE TYPE "public"."request_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "group_invite_links" (
	"group_slug" text PRIMARY KEY NOT NULL,
	"invite_url" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "join_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"role" text NOT NULL,
	"organization" text NOT NULL,
	"location" text NOT NULL,
	"goals" text,
	"consent" boolean NOT NULL,
	"status" "request_status" DEFAULT 'pending' NOT NULL,
	"group_slug" text NOT NULL,
	"ip_hash" text,
	"admin_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reviewed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX "join_requests_status_idx" ON "join_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "join_requests_ip_idx" ON "join_requests" USING btree ("ip_hash","created_at");