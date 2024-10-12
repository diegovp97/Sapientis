import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // Registro de usuarios
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, userData, { headers });
  }

  // Inicio de sesión
  login(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, userData, { headers });
  }

  // Guarda el token después de iniciar sesión
  logout() {
    sessionStorage.removeItem('token');  // Cambia localStorage por sessionStorage
    sessionStorage.removeItem('username');
  }
  
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');  // Verifica si hay token en sessionStorage
  }
  
  saveToken(token: string): void {
    sessionStorage.setItem('token', token);  // Guarda el token en sessionStorage
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
