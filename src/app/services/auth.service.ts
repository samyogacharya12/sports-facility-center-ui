import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8090/users'; // your Spring Boot API base
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}



  findByUsername(data: {userName: string}): Observable<User> {
         const token = localStorage.getItem('token'); // or wherever you store it
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          });
    return this.http.post<User>(`${this.baseUrl}/fetch/username`, data, { headers } );
  }
   


  login(credentials: { userName: string; password: string }): Observable<any> {
      localStorage.setItem('username', credentials.userName);
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.detail.token);
        localStorage.setItem('reload', "true");

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
    return this.http.post(`${this.baseUrl}/save`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
