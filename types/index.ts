export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  created_at?: string;
  category_id: string
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