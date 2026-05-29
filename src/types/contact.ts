export type ContactRequest = {
  id: string;

  full_name: string;
  contact: string;

  subject: string;
  message: string | null;

  status: string;
  is_archived: boolean;

  created_at: string;
};