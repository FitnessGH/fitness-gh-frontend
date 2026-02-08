import { tokenStorage } from '../utils/token-storage';

// Base URL for API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const API_BASE_URL = `${BASE_URL}/api/v1`;

export type ProductCategory = 'SUPPLEMENTS' | 'EQUIPMENT' | 'ACCESSORIES' | 'APPAREL' | 'OTHER';
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'OUT_OF_STOCK' | 'DISCONTINUED';
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string | null;
  category: ProductCategory;
  price: number;
  currency: string;
  stock: number;
  sku: string | null;
  imageUrl: string | null;
  images: any;
  status: ProductStatus;
  isActive: boolean;
  rating: number | null;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  vendor?: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
  };
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
  product: Product;
}

export interface Order {
  id: string;
  customerId: string;
  orderNumber: string;
  total: number;
  currency: string;
  shippingAddress: any;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  items: OrderItem[];
  customer?: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
  };
}

export interface ProductFilters {
  category?: ProductCategory;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'createdAt';
}

export interface CreateProductData {
  name: string;
  description?: string;
  category: ProductCategory;
  price: number;
  currency?: string;
  stock: number;
  sku?: string;
  imageUrl?: string;
  images?: string[];
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  stock?: number;
  sku?: string;
  imageUrl?: string;
  images?: string[];
  status?: ProductStatus;
  isActive?: boolean;
}

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress?: {
    street: string;
    city: string;
    region: string;
    country: string;
    phone: string;
  };
}

class MarketplaceAPI {
  private static getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  private static getAuthHeaders(accessToken: string): HeadersInit {
    return {
      ...this.getHeaders(),
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  private static async parseResponse<T>(response: Response): Promise<T> {
    const result = await response.json();
    return (result?.data ?? result) as T;
  }

  /**
   * Get all products (public)
   * @param filters - Optional filters for products
   */
  static async getAllProducts(filters?: ProductFilters): Promise<Product[]> {
    const url = new URL(`${API_BASE_URL}/marketplace/products`);
    
    if (filters) {
      if (filters.category) url.searchParams.append('category', filters.category);
      if (filters.search) url.searchParams.append('search', filters.search);
      if (filters.minPrice !== undefined) url.searchParams.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) url.searchParams.append('maxPrice', filters.maxPrice.toString());
      if (filters.sortBy) url.searchParams.append('sortBy', filters.sortBy);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get products');
    }

    return this.parseResponse<Product[]>(response);
  }

  /**
   * Get product by ID (public)
   */
  static async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/marketplace/products/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get product');
    }

    return this.parseResponse<Product>(response);
  }

  /**
   * Create product (vendor only)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async createProduct(
    data: CreateProductData,
    accessToken?: string,
  ): Promise<Product> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/marketplace/products`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create product');
    }

    return this.parseResponse<Product>(response);
  }

  /**
   * Update product (vendor only)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async updateProduct(
    id: string,
    data: UpdateProductData,
    accessToken?: string,
  ): Promise<Product> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/marketplace/products/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update product');
    }

    return this.parseResponse<Product>(response);
  }

  /**
   * Delete product (vendor only)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async deleteProduct(id: string, accessToken?: string): Promise<void> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/marketplace/products/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete product');
    }
  }

  /**
   * Get vendor's products (vendor only)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async getMyProducts(accessToken?: string): Promise<Product[]> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/marketplace/products/my`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get products');
    }

    return this.parseResponse<Product[]>(response);
  }

  /**
   * Create order (customer only)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async createOrder(
    data: CreateOrderData,
    accessToken?: string,
  ): Promise<Order> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/marketplace/orders`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    return this.parseResponse<Order>(response);
  }

  /**
   * Get order by ID
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async getOrderById(id: string, accessToken?: string): Promise<Order> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/marketplace/orders/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get order');
    }

    return this.parseResponse<Order>(response);
  }

  /**
   * Get customer's orders (customer only)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async getMyOrders(accessToken?: string): Promise<Order[]> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/marketplace/orders/my`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get orders');
    }

    return this.parseResponse<Order[]>(response);
  }

  /**
   * Get vendor's orders (vendor only)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async getVendorOrders(accessToken?: string): Promise<Order[]> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/marketplace/orders/vendor/my`, {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get vendor orders');
    }

    return this.parseResponse<Order[]>(response);
  }

  /**
   * Update order status (vendor/admin only)
   * If accessToken is not provided, gets it from tokenStorage
   */
  static async updateOrderStatus(
    id: string,
    status: OrderStatus,
    accessToken?: string,
  ): Promise<Order> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}/marketplace/orders/${id}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update order status');
    }

    return this.parseResponse<Order>(response);
  }
}

export default MarketplaceAPI;
