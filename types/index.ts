export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  created_at?: string;
  category_id: string;
  publisher: string | null;
  player_count_min: number | null;
  player_count_max: number | null;
  play_time_minutes: number | null;
  age_recommendation: number | null;
  expansion_of: string | null;
  category: { name: string } | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
};

export interface Order {
  id: string;
  full_name: string;
  total: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  products: { image_url: string | null } | null;
}