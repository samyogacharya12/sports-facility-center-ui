import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/users'; // your Spring Boot API base
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(credentials: { userName: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.loggedIn.next(true);
      })
    );
  }

  register(data: {  roles: string;
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;}): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
