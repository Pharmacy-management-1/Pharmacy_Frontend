export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  categoryId?: number;
}

export interface InventoryStatus {
  productId: number;
  available: number;
  reserved: number;
  threshold: number;
}
