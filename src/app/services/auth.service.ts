// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Gränssnitt för de delar av JWT‐payloaden vi behöver
interface JwtPayload {
  exp: number; // Unix‐timestamp i sekunder
  unique_name?: string; // Standardclaim för användarnamn
  // lägg till andra claims du behöver här…
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';
  // private readonly apiUrl = 'https://localhost:7267/api/auth';
  private readonly apiUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  /**
   * Loggar in användaren mot backend och sparar JWT i localStorage.
   */
  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, dto)
      .pipe(tap((res) => localStorage.setItem(this.tokenKey, res.token)));
  }

  /**
   * Loggar ut användaren genom att ta bort sparad token.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Hämtar JWT från localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Returnerar true om en token finns och den ej har gått ut.
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  /**
   * Kontrollerar om token har gått ut (eller är ogiltig).
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      // jämför nuvarande tid mot exp (i sekunder)
      return Date.now() >= exp * 1000;
    } catch {
      // om decode misslyckas betraktar vi token som ogiltig
      return true;
    }
  }

  /**
   * Hämtar ut användarnamnet (unique_name) från JWT, eller null om ej inloggad.
   */
  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const { unique_name } = jwtDecode<JwtPayload>(token);
      return unique_name ?? null;
    } catch {
      return null;
    }
  }
}
