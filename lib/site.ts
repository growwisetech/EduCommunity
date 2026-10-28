export const site = {
  name: "Education Leader Community",
  shortName: "ELC",
  podcastGuestFormUrl: "https://forms.gle/9hgsBu475vuQDUqb7",
  mission:
    "A peer community where K–12 education leaders find their people, share what works, and solve problems together.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  leader: { name: "Anshika Verma", title: "Community Lead" },
  contactEmail: "eduleaderscommunity@gmail.com",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/groups/40961278/" },
    { label: "YouTube", href: "https://www.youtube.com/@anshikavermaGW" },
  ],
};

export const ledBy = `Led by ${site.leader.name}`;

export const mainNav = [
  { href: "/communities", label: "Communities" },
  { href: "/forums", label: "Forums" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
] as const;

export const legalNav = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Use" },
  { href: "/legal/code-of-conduct", label: "Code of Conduct" },
] as const;
