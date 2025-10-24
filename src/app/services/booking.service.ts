import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8090/api'; // change to your backend URL

  constructor(private http: HttpClient) {}


getUserBookings(username: string): Observable<any[]> {
  const token = localStorage.getItem('token'); // or wherever you store it
  const headers = new HttpHeaders({
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW15b2dhY2hhcnlhMTIiLCJpYXQiOjE3NjEzMjIyMzEsImV4cCI6MTc2MTMyNDAzMX0.OpiQ_K5xqrFVmTJ4aBRuoMsBvfvgizZb-5eRT5m6Rfo`,
    'Content-Type': 'application/json'
  });

  const body = { username: username };

  return this.http.post<any[]>(`${this.baseUrl}/user/bookings`, body, { headers });
}
}
