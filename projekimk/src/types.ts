export type Role = 'guest' | 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  role: Role;
  created_at: string;
}

export interface City {
  id: string;
  city_name: string;
}

export interface EducationLevel {
  id: string;
  name: string; // e.g. SD, SMP, SMA
}

export interface Subject {
  id: string;
  name: string; // e.g. Matematika
}

export interface TeacherProfile {
  id: string;
  user_id: string;
  full_name: string;
  photo_url?: string;
  phone: string;
  education: string;
  experience: string;
  description: string;
  hourly_rate: number;
  city_id: string;
  verified: boolean;
  created_at: string;
  
  // Relations
  city?: City;
  teacher_subjects?: { subject: Subject }[];
  teacher_levels?: { level: EducationLevel }[];
}
