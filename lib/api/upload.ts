import { tokenStorage } from '../utils/token-storage';

// Base URL for API
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const API_BASE_URL = `${BASE_URL}/api/v1`;

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}

class UploadAPI {
  private static getHeaders(accessToken?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/octet-stream', // Will be overridden by browser for file upload
    };

    const token = accessToken || tokenStorage.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private static async parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload file');
    }

    const result = await response.json();
    return (result?.data ?? result) as T;
  }

  /**
   * Upload a single image file to Vercel Blob Storage
   * Following Vercel's recommended pattern: upload file directly from frontend
   * @param file - The file to upload
   * @param accessToken - Optional access token (will use tokenStorage if not provided)
   */
  static async uploadImage(
    file: File,
    accessToken?: string,
  ): Promise<string> {
    const token = accessToken || tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    const response = await fetch(
      `${API_BASE_URL}/upload?filename=${encodeURIComponent(file.name)}`,
      {
        method: 'POST',
        headers: this.getHeaders(token),
        body: file, // Send file directly as body
      },
    );

    const result = await this.parseResponse<{ url: string }>(response);
    return result.url;
  }

  /**
   * Upload multiple image files
   * @param files - Array of files to upload
   * @param accessToken - Optional access token
   */
  static async uploadMultipleImages(
    files: File[],
    accessToken?: string,
  ): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, accessToken));
    return Promise.all(uploadPromises);
  }
}

export default UploadAPI;
