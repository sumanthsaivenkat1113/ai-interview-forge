export const STEPS = [
  { id: 1, title: "Workspace Setup", subtitle: "Name your workspace" },
  { id: 2, title: "Interview Details", subtitle: "Select type & subject" },
  { id: 3, title: "AI Interview", subtitle: "Start your interview" },
  { id: 4, title: "Review", subtitle: "Get feedback & insights" },
] as const;

export const ROLE_SUGGESTIONS = [
  "SDE",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
];

export const TARGET_COMPANIES_SUGGESTIONS = [
  "Meta",
  "Apple",
  "Netflix",
  "Microsoft",
  "Google",
]

export const EXPERIENCE_OPTIONS = [
  { value: "fresher", label: "Fresher" },
  { value: "6m-1y", label: "6 Months - 1 Year" },
  { value: "1-2y", label: "1 - 2 Years" },
  { value: "2-5y", label: "2 - 5 Years" },
  { value: "5y+", label: "5+ Years" },
];

export const EXPERIENCE_CHIP_LABELS = [
  "Fresher",
  "6 Months - 1 Year",
  "1 - 2 Years",
  "2 - 5 Years",
  "5+ Years",
];

export const INTERVIEW_TYPES = [
  { value: "coding", label: "Coding Interview" },
  { value: "theory", label: "Theory Interview" },
] as const;

export const CODING_SUBJECTS = [
  "DSA",
  "Java",
  "Python",
  "C++",
  "JavaScript",
];

export const THEORY_SUBJECTS = [
  "HR",
  "Behavioural",
  "Java",
  "Python",
  "Operating Systems",
];
