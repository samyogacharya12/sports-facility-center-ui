import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  username!: string;
  bookings: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')!;
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
}
