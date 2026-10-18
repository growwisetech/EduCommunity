export const roleSlugs = [
  "superintendents",
  "public-school-leaders",
  "private-school-leaders",
  "teachers",
  "tutoring-owners",
  "partners",
] as const;

export type RoleSlug = (typeof roleSlugs)[number];

export type Audience = {
  slug: RoleSlug;
  /** Label used in forms and filters. */
  role: string;
  title: string;
  description: string;
  isEducator: boolean;
};

export const audiences: Audience[] = [
  {
    slug: "superintendents",
    role: "Superintendent / District Leader",
    title: "Superintendents & District Leaders",
    description:
      "Board relations, budgets, strategic planning, and leading systems at scale with peers who understand the role.",
    isEducator: true,
  },
  {
    slug: "public-school-leaders",
    role: "Public School Principal / Assistant Principal",
    title: "Public School Principals & APs",
    description:
      "Day-to-day building leadership: staffing, culture, instruction, family engagement, and accountability.",
    isEducator: true,
  },
  {
    slug: "private-school-leaders",
    role: "Private / Independent School Leader",
    title: "Private & Independent School Leaders",
    description:
      "Heads of school and leadership teams navigating enrollment, advancement, governance, and mission.",
    isEducator: true,
  },
  {
    slug: "teachers",
    role: "Teacher / Teacher Leader",
    title: "Teachers & Teacher Leaders",
    description:
      "Classroom practice, coaching, department leadership, and growing into new leadership roles.",
    isEducator: true,
  },
  {
    slug: "tutoring-owners",
    role: "Tutoring Business Owner",
    title: "Tutoring Business Owners",
    description:
      "Tutoring centers, learning centers, and independent tutors building quality programs and sustainable businesses.",
    isEducator: true,
  },
  {
    slug: "partners",
    role: "Education Partner (edtech, publisher, nonprofit)",
    title: "Education Partners",
    description:
      "Edtech founders, publishers, and nonprofits who want to learn from and support educators, without selling in educator spaces.",
    isEducator: false,
  },
];

export function getAudience(slug: string) {
  return audiences.find((a) => a.slug === slug);
}
