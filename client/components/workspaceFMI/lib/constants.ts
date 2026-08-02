export const STEPS = [
  { id: 1, title: "Workspace Setup", subtitle: "Name your workspace" },
  { id: 2, title: "Upload Details", subtitle: "Add your resume, JD & more" },
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

export const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const ACCEPTED_JD_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export const MAX_RESUME_SIZE_MB = 10;
