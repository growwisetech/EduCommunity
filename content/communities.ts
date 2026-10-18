import type { RoleSlug } from "./audiences";

export type Community = {
  slug: RoleSlug;
  name: string;
  whoFor: string;
  rules: string[];
  featured: boolean;
  isPartnerGroup?: boolean;
};

export const communities: Community[] = [
  {
    slug: "public-school-leaders",
    name: "Public School Leaders",
    whoFor: "Principals and assistant principals at public and public charter schools.",
    rules: [
      "Current or recent public school administrators only",
      "Keep student and staff details anonymous",
      "No sales pitches or recruiting",
    ],
    featured: true,
  },
  {
    slug: "private-school-leaders",
    name: "Private / Independent School Leaders",
    whoFor: "Heads of school, division heads, and senior leaders at private and independent schools.",
    rules: [
      "School leadership roles only",
      "Share enrollment and finance data only in aggregate",
      "No sales pitches or recruiting",
    ],
    featured: true,
  },
  {
    slug: "superintendents",
    name: "Superintendents & District Leaders",
    whoFor: "Superintendents, assistant superintendents, and district cabinet members.",
    rules: [
      "District-level leadership roles only",
      "Conversations stay in the group (no screenshots)",
      "No sales pitches or recruiting",
    ],
    featured: true,
  },
  {
    slug: "teachers",
    name: "Teachers & Teacher Leaders",
    whoFor: "Classroom teachers, instructional coaches, department chairs, and aspiring leaders.",
    rules: [
      "Educators working in K–12 classrooms or coaching roles",
      "Protect student privacy at all times",
      "No sales pitches or recruiting",
    ],
    featured: false,
  },
  {
    slug: "tutoring-owners",
    name: "Tutoring Business Owners",
    whoFor: "Owners and directors of tutoring centers, learning centers, and independent tutoring practices.",
    rules: [
      "Owners and operators of tutoring businesses",
      "Share pricing and operations openly, but don't poach clients or staff",
      "No selling to other members",
    ],
    featured: false,
  },
  {
    slug: "partners",
    name: "Education Partners",
    whoFor: "Edtech founders, publishers, and nonprofit teams who serve K–12 schools.",
    rules: [
      "This is the only group where partners participate",
      "No selling in educator groups, ever",
      "Offers and announcements go through the partner program",
    ],
    featured: false,
    isPartnerGroup: true,
  },
];

export const communityGuidelines = [
  {
    title: "Be a peer, not a pitch",
    body: "Share experience and ask honest questions. Selling, recruiting, and self-promotion are not allowed in educator groups.",
  },
  {
    title: "Protect privacy",
    body: "Never share identifiable student, family, or staff information. Ask permission before sharing anything someone said in the group.",
  },
  {
    title: "Assume good intent",
    body: "Leaders work in very different contexts. Disagree with ideas, not people, and keep it constructive.",
  },
  {
    title: "Stay on topic",
    body: "Keep conversations relevant to the group. Use the forums for longer discussions and resources.",
  },
  {
    title: "Admins may remove members",
    body: "Moderators can remove posts or members who break these guidelines. See the full Code of Conduct.",
  },
];
