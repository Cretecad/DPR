export type PropertyInquiry = {
  id: string;
  property_id: string | null;
  property_title: string | null;
  property_code: string | null;
  full_name: string;
  contact: string;
  inquiry_type: string;
  message: string | null;
  status: string;
  is_archived: boolean;
  created_at: string;
};