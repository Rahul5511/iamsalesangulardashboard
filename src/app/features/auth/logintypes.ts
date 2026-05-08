/**
 * Login request interface
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Login response interface
 */
export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}

/**
 * User interface
 */
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

/**
 * Login state interface
 */
export interface LoginState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
