import { Injectable } from '@angular/core';
import { Facility } from '../models/facility.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  private baseUrl = 'http://localhost:8090/api/facilities'; // your Spring Boot endpoint

  constructor(private http: HttpClient) {}

  getAllFacilities(): Observable<Facility[]> {
    return this.http.get<Facility[]>(this.baseUrl);
  }

  getFacilityById(id: number): Observable<Facility> {
    return this.http.get<Facility>(`${this.baseUrl}/${id}`);
  }

  bookFacility(id: number, bookingData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/book`, bookingData);
  }}
