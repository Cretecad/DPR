export type Consultation = {
  id: string;

  full_name: string;
  contact: string;

  consultation_type: string;
  budget: string | null;
  timeline: string | null;

  message: string | null;

  status: string;
  is_archived: boolean;

  created_at: string;
};