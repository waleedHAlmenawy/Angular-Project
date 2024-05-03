export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface IUpdateProduct {
  _id?: string;
  title?: string;
  description?: string;
  price?: number;
  discount?: number;
  stock?: number;
  brand?: string;
  category?: any;
  thumbnail?: string;
  images?: string[];
  rating?: number;
  reviews?: string[];
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}
