import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, User } from '../../../features/auth/logintypes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = '/api/auth';
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  /**
   * Login user with username and password
   * This is a dummy service - replace with actual HTTP call
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Dummy implementation - replace with actual HTTP call
    // Example: return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);

    // Dummy validation
    if (!credentials.username || !credentials.password) {
      return throwError(() => new Error('Username and password are required'));
    }

    // Simulate API call with delay
    const dummyResponse: LoginResponse = {
      token: 'dummy-jwt-token-' + Date.now(),
      user: {
        id: '1',
        username: credentials.username,
        email: credentials.username + '@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user'
      },
      expiresIn: 3600
    };

    return of(dummyResponse).pipe(
      delay(1000),
      tap((response) => {
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Get current authentication status
   */
  getAuthStatus(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
