import type { Metadata } from "next";
import { Suspense } from "react";
import { JoinForm } from "@/components/join-form";
import { PageHeader } from "@/components/page-header";
import { roleSlugs } from "@/content/audiences";

export const metadata: Metadata = {
  title: "Join",
  description: "Request to join the Education Leader Community. Membership is free and every request is reviewed.",
  openGraph: { url: "/join" },
};

async function JoinFormWithRole({ searchParams }: { searchParams: PageProps<"/join">["searchParams"] }) {
  const { role } = await searchParams;
  const defaultRole = typeof role === "string" && (roleSlugs as readonly string[]).includes(role) ? role : undefined;
  return <JoinForm defaultRole={defaultRole} />;
}

export default function JoinPage({ searchParams }: PageProps<"/join">) {
  return (
    <>
      <PageHeader
        eyebrow="Join"
        title="Request to join"
        intro="Membership is free. We review every request to keep groups focused on peers in the same role. Once you're approved, we'll email your WhatsApp group invite link."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Suspense fallback={<JoinForm />}>
          <JoinFormWithRole searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
