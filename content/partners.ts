export const partnerBenefits = [
  {
    title: "Listen and learn",
    body: "Join the Education Partners group to hear directly from leaders about what they need, in a space built for partners.",
  },
  {
    title: "Sponsor events",
    body: "Support virtual sessions and the annual summit with clear, disclosed sponsorship.",
  },
  {
    title: "Contribute resources",
    body: "Co-create genuinely useful, non-promotional resources for the library.",
  },
  {
    title: "Partner showcase",
    body: "Be listed in the partner showcase so members can find you when they are looking.",
  },
];

export type Partner = { name: string; category: string; description: string };

/** Placeholder partner listings. Replace with approved partners. */
export const partners: Partner[] = [
  { name: "Partner Organization A", category: "Edtech", description: "Placeholder description of an edtech partner." },
  { name: "Partner Organization B", category: "Publisher", description: "Placeholder description of a publishing partner." },
  { name: "Partner Organization C", category: "Nonprofit", description: "Placeholder description of a nonprofit partner." },
];
