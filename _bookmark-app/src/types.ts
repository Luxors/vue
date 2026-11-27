export interface LoginResponse {
  token: string;
}

export interface Profile {
  name: string;
}

export interface Category {
  id: number;
  name: string;
  alias: string;
}

export interface Bookmark {
  id: number;
  category_id?: number;
  url: string;
  title: string;
  image?: string;
  created_at?: Date;
}
