export const applicationStatuses = ['Applied', 'In Progress', 'Interview', 'Rejected', 'Accepted'] as const;
export type ApplicationStatus = typeof applicationStatuses[number];

// Separate array for dropdown options (excluding Applied)
export const dropdownStatuses = ['In Progress', 'Interview', 'Rejected', 'Accepted'] as const;
export type DropdownStatus = typeof dropdownStatuses[number];

export const statusColors: Record<ApplicationStatus, string> = {
  'Applied': '#3f51b5',
  'In Progress': '#ff9800',
  'Interview': '#2196f3',
  'Rejected': '#f44336',
  'Accepted': '#4caf50'
};

export interface Application {
  _id: string;
  companyName: string;
  jobTitle: string;
  jobType: string;
  location: string;
  dateApplied: string;
  status: ApplicationStatus;
  applicationUrl?: string;
  meetingUrls?: string[];
  notes?: string;
}

export interface ApplicationStats {
  _id: ApplicationStatus;
  count: number;
} 