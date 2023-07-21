export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  hasError: boolean;
  message?: string;
}
