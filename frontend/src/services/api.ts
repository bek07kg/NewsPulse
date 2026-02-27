import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: Category;
  image: string | null;
  image_url: string | null;
  priority: number;
  created_at: string;
  views: number;
}

export interface HomepageData {
  main: NewsItem | null;
  important: NewsItem[];
  latest: NewsItem[];
}

export const newsApi = {
  getAll: async () => {
    const response = await axios.get<NewsItem[]>(`${API_URL}/news/`);
    return response.data;
  },

  getOne: async (id: number) => {
    const response = await axios.get<NewsItem>(`${API_URL}/news/${id}/`);
    return response.data;
  },

  getHomepage: async () => {
    const response = await axios.get<HomepageData>(`${API_URL}/news/homepage/`);
    return response.data;
  },

  getByCategory: async (categorySlug: string) => {
    const response = await axios.get<NewsItem[]>(`${API_URL}/news/?category__slug=${categorySlug}`);
    return response.data;
  }
};

export const categoryApi = {
  getAll: async () => {
    const response = await axios.get<Category[]>(`${API_URL}/categories/`);
    return response.data;
  }
};
