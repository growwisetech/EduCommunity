export type ForumBoard = {
  slug: string;
  name: string;
  description: string;
  /** Educator-only boards are hidden from Education Partners. Tutoring owners have educator access. */
  educatorsOnly: boolean;
};

export const forumBoards: ForumBoard[] = [
  { slug: "budgets-funding", name: "Budgets & Funding", description: "Budget planning, grants, ESSER sunset strategy, and making hard trade-offs.", educatorsOnly: true },
  { slug: "hiring-retention", name: "Hiring & Retention", description: "Recruiting, onboarding, staff retention, and building a pipeline.", educatorsOnly: true },
  { slug: "school-culture", name: "School Culture", description: "Climate, belonging, discipline approaches, and staff morale.", educatorsOnly: true },
  { slug: "curriculum-instruction", name: "Curriculum & Instruction", description: "Adoption decisions, instructional coaching, and assessment.", educatorsOnly: false },
  { slug: "ai-technology", name: "AI & Technology", description: "Policies, pilots, and practical uses of AI and classroom technology.", educatorsOnly: false },
  { slug: "safety-wellbeing", name: "Safety & Wellbeing", description: "Student and staff safety, mental health, and crisis response.", educatorsOnly: true },
  { slug: "new-leaders", name: "New Leaders", description: "A supportive space for first- and second-year leaders.", educatorsOnly: true },
  { slug: "tutoring-business", name: "Running a Tutoring Business", description: "Pricing, staffing, marketing, and operations for tutoring owners.", educatorsOnly: true },
  { slug: "school-tutoring-partnerships", name: "School–Tutoring Partnerships", description: "How schools and tutoring providers can work together well.", educatorsOnly: false },
];

export type ThreadPreview = {
  title: string;
  board: string;
  replies: number;
  lastActivity: string;
};

/** Placeholder threads for preview only. */
export const threadPreviews: ThreadPreview[] = [
  { title: "How are you structuring staff PD days next semester?", board: "School Culture", replies: 12, lastActivity: "2 hours ago" },
  { title: "Draft AI acceptable-use policy: feedback wanted", board: "AI & Technology", replies: 8, lastActivity: "Yesterday" },
  { title: "Pricing small-group vs. one-on-one sessions", board: "Running a Tutoring Business", replies: 15, lastActivity: "2 days ago" },
];
