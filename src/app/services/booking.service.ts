import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8090/api'; // change to your backend URL

  constructor(private http: HttpClient) {}


getUserBookings(username: string): Observable<any[]> {
  const token = localStorage.getItem('token'); // or wherever you store it
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const body = { username: username };

  return this.http.post<any[]>(`${this.baseUrl}/user/bookings`, body, { headers });
}


  bookFacility(bookingDto?:Booking): Observable<any> {
      const token = localStorage.getItem('token'); // or wherever you store it
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
    return this.http.post(`${this.baseUrl}/booking`, bookingDto, { headers });
  }

    cancelBooking(bookingDto?:Booking): Observable<any> {
      const token = localStorage.getItem('token'); // or wherever you store it
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
    return this.http.post(`${this.baseUrl}/cancel/booking`, bookingDto, { headers });
  }
}
