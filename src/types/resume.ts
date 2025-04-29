export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description?: string;
  location: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  location: string;
  technologies?: string[];
}

export interface ResumeData {
  education: Education[];
  experience: Experience[];
}