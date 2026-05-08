import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../../core/services/auth/loginservice';
import { LoginRequest } from '../logintypes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './login.component.component.html',
  styleUrls: ['./login.component.component.css']
})
export class LoginComponent {
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  /**
   * Handle login button click for SSO
   */
  onLogin(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const credentials: LoginRequest = {
      username: 'sso-user',
      password: 'sso-password'
    };

    this.loginService.login(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.message || 'SSO login failed. Please try again.';
        console.error('SSO login error:', error);
      }
    });
  }
}
