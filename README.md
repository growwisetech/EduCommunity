# Education Leader Community

Website for an online community of K–12 education leaders: peer WhatsApp groups (gated by admin approval), events, resources, forums preview, partner program, and legal pages.

Built with Next.js (App Router), Tailwind CSS, shadcn/ui, Drizzle ORM + Neon Postgres, and Resend. Deploys to Vercel.

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values. On Vercel, adding the Neon integration from the Marketplace sets `DATABASE_URL` for you.
3. Create the database tables: `npm run db:migrate`
4. Load the WhatsApp invite links from your `WHATSAPP_LINK_*` variables: `npm run db:seed-links`. The command lists any groups that are still missing a link. You can run it again whenever the links change.
5. Start the dev server: `npm run dev`, then open http://localhost:3000

Without `RESEND_API_KEY`, emails are printed to the terminal in development instead of being sent. In production, a missing key is treated as an error.

The Join form has an optional, unchecked "Email me community news and updates" box. When an admin approves a request where that box was checked, the email is added to the Brevo list. Applicants who didn't opt in, and rejected applicants, are never added. Set `BREVO_API_KEY` to a Brevo API key and `BREVO_JOIN_LIST_ID` to the numeric ID of the destination list in `.env.local` and in the deployment environment. The API key must remain server-side and must never be committed to git. Without `BREVO_API_KEY`, the sync is printed to the terminal in development and logged as an error in production. A Brevo failure never blocks an approval.

Before deploying a change that adds a database migration, run `npm run db:migrate` against the production database. Otherwise Join submissions fail until it runs.

## How the gated WhatsApp flow works

1. A visitor submits the form on `/join`. The request is saved with status **pending**, and they get a "we received your request" email. If `ADMIN_NOTIFY_EMAIL` is set, an admin is notified too.
2. An admin signs in at `/admin` with `ADMIN_PASSWORD`.
3. For each pending request, the admin checks the group (it's preselected from the role the person picked, and can be changed), then clicks **Approve & email invite**. **Reject** can optionally send a polite decline. The approval email contains up to three links:
   - The main **Education Leaders Community** (sent to every member, if set)
   - The person's **role group** (required; approval is blocked until this link is set)
   - The **Podcast & Monthly Meeting** group (sent to every member, if set)
4. Invite links are stored in the database. They are never shown on the public site and never committed to git. Load them with `npm run db:seed-links` from the `WHATSAPP_LINK_*` variables in `.env.local`, or edit them at `/admin/settings`. If a link leaks, reset it in WhatsApp and update it there.

There are 7 role groups: Public School Leaders, Private / Independent School Leaders, Superintendents & District Leaders, Curriculum Chairs & Heads, Teachers & Teacher Leaders, Tutoring Business Owners, and Education Partners. Public and private school leaders currently share the same Principals group link.

Spam protection: a hidden honeypot field, plus a limit of 5 submissions per hour per network (IP addresses are stored only as salted hashes).

## Editing content (no database needed)

Content lives in typed files in `content/`. Edit the file, commit, and Vercel redeploys automatically.

| What | File |
| --- | --- |
| Audiences / roles (Join dropdown, home cards) | `content/audiences.ts` |
| WhatsApp groups, rules, community guidelines | `content/communities.ts` |
| Events | `content/events.ts` |
| Resource library | `content/resources.ts` |
| Forum boards and home-page thread preview | `content/forums.ts` |
| Partner benefits and showcase | `content/partners.ts` |
| Site name, mission, community lead ("Led by …"), contact email, social links, nav | `lib/site.ts` |

Events are sorted automatically into **Upcoming** and **Past** by date (pages refresh hourly). Use `YYYY-MM-DD` dates.

Legal pages are in `app/(site)/legal/`. They are placeholders and must be reviewed by counsel before launch.

## Brand and accessibility

- Navy `#002957` for headings, header, and footer. Teal `#008994` for accents, with a darker teal `#00747D` for link text (the original teal is 4.2:1 on white, below WCAG AA for body text).
- Orange `#F6802F` is used only as a button fill, with navy text (5.5:1). White text on that orange fails AA (2.6:1).
- Headings use Montserrat; body text uses Inter.
- Logos: `public/logo.png` (full lockup), `public/logo-icon.png` (mobile header and footer), and `app/icon.png` (favicon). These were cropped from a screenshot. Swap in the original transparent PNG or SVG files when you have them.

## Decisions taken for now

- Membership is free, and joining WhatsApp is gated by admin approval.
- Tutoring business owners get educator access to forums.
- Forums are a preview only. Discourse is the recommended platform for Phase 3.
- The partner application form is UI only. Submitting shows a "coming soon, email us" message.
- Regional groups are deferred to Phase 4.
- Analytics: Vercel Web Analytics and Speed Insights. Enable both in the Vercel dashboard.

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run lint`: ESLint
- `npm run db:generate`: generate a migration after editing `db/schema.ts`
- `npm run db:migrate`: apply migrations
- `npm run db:studio`: browse the database
