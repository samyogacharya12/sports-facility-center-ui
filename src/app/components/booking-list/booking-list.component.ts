import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import {Booking} from '../../models/booking.model';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  username!: string;
  bookings: any[] = [];
  isLoggoedIn = false;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')!;
      this.isLoggoedIn = this.authService.isLoggedIn();
      console.log('Fetched username from route:', this.username);
      this.loadBookings();
    });
  }

  loadBookings(): void {
    this.bookingService.getUserBookings(this.username).subscribe({
      next: (data:any) => (this.bookings = data.detail),
      error: (err:any) => console.error('Error fetching bookings:', err)
    });
  }

  cancelBooking(bookingDto: Booking): void {
  if (confirm('Are you sure you want to cancel this booking?')) {
    this.bookingService.cancelBooking(bookingDto).subscribe({
      next: (response) => {
        alert('Your booking has been cancelled successfully.');
        // Refresh bookings list or update local status
        this.bookings = this.bookings.map(b =>
          b.id === bookingDto.id ? { ...b, bookingStatus: 'CANCELLED' } : b
        );
        window.location.reload();
      },
      error: (err) => {
        console.error('Error cancelling booking:', err);
        alert('Failed to cancel the booking. Please try again.');
      }
    });
  }
}
}
