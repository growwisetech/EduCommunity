export const resourceRoles = [
  "Superintendent",
  "Principal",
  "Private School Leader",
  "Teacher",
  "Tutoring Owner",
  "Partner",
] as const;

export const resourceTopics = [
  "Budgets & Funding",
  "Hiring & Retention",
  "School Culture",
  "Curriculum & Instruction",
  "AI & Technology",
  "Safety & Wellbeing",
  "Tutoring Business",
  "Partnerships",
] as const;

export const resourceTypes = ["Playbook", "Template", "Guide", "Case Study"] as const;

export type Resource = {
  slug: string;
  title: string;
  type: (typeof resourceTypes)[number];
  summary: string;
  roles: (typeof resourceRoles)[number][];
  topics: (typeof resourceTopics)[number][];
  url: string;
};

/** Placeholder resources. Edit this list to add, change, or remove library items. */
export const resources: Resource[] = [
  {
    slug: "budget-prioritization-playbook",
    title: "Budget Prioritization Playbook",
    type: "Playbook",
    summary: "A step-by-step process for ranking spending priorities with your leadership team.",
    roles: ["Superintendent", "Principal", "Private School Leader"],
    topics: ["Budgets & Funding"],
    url: "#",
  },
  {
    slug: "teacher-interview-template",
    title: "Teacher Interview Question Bank",
    type: "Template",
    summary: "Structured interview questions and a scoring rubric you can adapt.",
    roles: ["Principal", "Private School Leader"],
    topics: ["Hiring & Retention"],
    url: "#",
  },
  {
    slug: "ai-policy-starter",
    title: "AI Acceptable-Use Policy Starter",
    type: "Template",
    summary: "An editable starting draft for a school or district AI policy.",
    roles: ["Superintendent", "Principal", "Private School Leader", "Teacher"],
    topics: ["AI & Technology"],
    url: "#",
  },
  {
    slug: "first-90-days-guide",
    title: "A New Principal's First 90 Days",
    type: "Guide",
    summary: "What to listen for, who to meet, and what to leave alone in your first semester.",
    roles: ["Principal"],
    topics: ["School Culture"],
    url: "#",
  },
  {
    slug: "tutoring-pricing-guide",
    title: "Pricing Your Tutoring Services",
    type: "Guide",
    summary: "Ways to structure packages, sliding scales, and group rates.",
    roles: ["Tutoring Owner"],
    topics: ["Tutoring Business"],
    url: "#",
  },
  {
    slug: "school-tutoring-partnership-case",
    title: "Case Study: A School–Tutoring Partnership",
    type: "Case Study",
    summary: "A fictional example showing how a school and a local tutoring center set up a high-dosage program.",
    roles: ["Principal", "Tutoring Owner", "Partner"],
    topics: ["Partnerships", "Curriculum & Instruction"],
    url: "#",
  },
  {
    slug: "crisis-communication-template",
    title: "Crisis Communication Templates",
    type: "Template",
    summary: "Draft messages for families and staff during safety incidents.",
    roles: ["Superintendent", "Principal", "Private School Leader"],
    topics: ["Safety & Wellbeing"],
    url: "#",
  },
  {
    slug: "partner-engagement-guide",
    title: "Working With Schools the Right Way",
    type: "Guide",
    summary: "How partners can support educators without adding to their workload.",
    roles: ["Partner"],
    topics: ["Partnerships"],
    url: "#",
  },
];
