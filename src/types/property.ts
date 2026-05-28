export type PropertyImage = {
  id: string;
  property_id: string;
  image_url: string;
  image_path: string;
  alt_text: string | null;
  sort_order: number;
  is_cover: boolean;
  created_at: string;
};

export type Property = {
  id: string;
  slug: string;
  code: string;
  title: string;
  type: string;
  location: string;
  price_label: string;
  status: string;
  purpose: string;
  summary: string;
  highlights: string[];
  image_url: string | null;
  image_path: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type PropertyWithImages = Property & {
  property_images?: PropertyImage[];
};