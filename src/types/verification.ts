export type VerificationRequest = {
  id: string;

  full_name: string;
  contact: string;

  property_location: string | null;
  verification_type: string;
  document_type: string | null;
  message: string | null;

  status: string;
  is_archived: boolean;

  created_at: string;
};