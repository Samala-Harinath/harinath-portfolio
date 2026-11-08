export interface Experience {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}
