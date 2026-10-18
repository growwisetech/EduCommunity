// Loads WhatsApp invite links from environment variables into the database,
// so links never need to be committed to git. Run: npm run db:seed-links
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { inviteLinkGroups } from "../content/communities.ts";
import { groupInviteLinks } from "../db/schema.ts";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const db = drizzle(neon(url));
const envName = (slug: string) => `WHATSAPP_LINK_${slug.toUpperCase().replace(/-/g, "_")}`;
const missing: string[] = [];

for (const group of inviteLinkGroups) {
  const name = envName(group.slug);
  const inviteUrl = process.env[name]?.trim();
  if (!inviteUrl) {
    missing.push(`${group.name} (${name})`);
    continue;
  }
  if (!/^https:\/\/(chat\.whatsapp\.com|wa\.me)\//.test(inviteUrl)) {
    console.error(`Skipping ${name}: "${inviteUrl}" is not a WhatsApp invite link.`);
    missing.push(`${group.name} (${name})`);
    continue;
  }
  await db
    .insert(groupInviteLinks)
    .values({ groupSlug: group.slug, inviteUrl })
    .onConflictDoUpdate({ target: groupInviteLinks.groupSlug, set: { inviteUrl, updatedAt: new Date() } });
  console.log(`Saved ${group.name}`);
}

if (missing.length) {
  console.log(`\nStill missing a link:\n- ${missing.join("\n- ")}`);
}
