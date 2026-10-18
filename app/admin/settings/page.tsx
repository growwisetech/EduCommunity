import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDb, schema } from "@/db";
import { communities } from "@/content/communities";
import { requireAdmin } from "@/lib/auth";
import { AdminHeader, Flash } from "../admin-header";
import { saveInviteLinks } from "../actions";

export default async function AdminSettingsPage({ searchParams }: PageProps<"/admin/settings">) {
  await requireAdmin();
  const sp = await searchParams;
  const links = await getDb().select().from(schema.groupInviteLinks);
  const linkFor = (slug: string) => links.find((l) => l.groupSlug === slug)?.inviteUrl ?? "";

  return (
    <>
      <AdminHeader current="settings" />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-extrabold">WhatsApp invite links</h1>
        <p className="mt-2 text-muted-foreground">
          These links are emailed to approved members and never shown on the public site. If a link leaks, reset it
          in WhatsApp (Group info, then Invite via link, then Reset link) and paste the new one here.
        </p>
        <div className="mt-6">
          <Flash
            notice={typeof sp.notice === "string" ? sp.notice : undefined}
            error={typeof sp.error === "string" ? sp.error : undefined}
          />
        </div>
        <form action={saveInviteLinks} className="grid gap-5 rounded-xl border border-border bg-white p-6">
          {communities.map((c) => (
            <div key={c.slug} className="grid gap-2">
              <Label htmlFor={`link-${c.slug}`} className="text-navy">
                {c.name}
              </Label>
              <Input
                id={`link-${c.slug}`}
                name={c.slug}
                type="url"
                inputMode="url"
                placeholder="https://chat.whatsapp.com/..."
                defaultValue={linkFor(c.slug)}
                className="h-11"
              />
            </div>
          ))}
          <Button type="submit" variant="brand" size="xl" className="justify-self-start">
            Save links
          </Button>
        </form>
      </main>
    </>
  );
}
