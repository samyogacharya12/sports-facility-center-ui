import { Component } from '@angular/core';
import { FacilityService } from '../../services/facility.service';
import { Facility } from '../../models/facility.model';
import { Booking } from '../../models/booking.model';
import { Router } from '@angular/router';
import { TimeSlot } from '../../models/time-slot.model'
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
@Component({
 selector: 'app-facilities',
 templateUrl: './facilities.component.html',
 styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent {
facilities: Facility[] = [];
timeSlots?:TimeSlot[];
isLoggoedIn = false;
userName?: string;
userDto?:any;
userId?:number;
selectedDate: string = ''; // holds the selected date
bookingDto?:Booking =new Booking();

 constructor(private authService:AuthService, 
             private userAuthService:AuthService, 
            private facilityService: FacilityService, 
            private bookingService:BookingService,
            private router: Router) {}


 book(slotType?:string, facilityId?:number, startTime?:string, endTime?:string):void {
    if (!this.selectedDate) {
    this.selectedDate = new Date().toISOString().split('T')[0]; // Default to today
  }
  this.bookingDto!.bookingDate = this.selectedDate;
  this.bookingDto!.bookingStatus=slotType;
  this.bookingDto!.facilityId=facilityId;
  this.bookingDto!.startTime=startTime;
  this.bookingDto!.endTime=endTime;
  this.bookingDto!.userId=this.userId;

  console.log("Booking DTO:", this.bookingDto);

  this.bookingService.bookFacility(this.bookingDto!).subscribe({
    next: (response: any) => {
      alert('Booking successful!');
      console.log('Booking response:', response);
      // Optionally, refresh facilities to reflect new booking
      this.ngOnInit();
    }
    ,
    error: (error: any) => {
      alert('Booking failed. Please try again.');
      console.error('Booking error:', error);
    }
  });
  
}

 ngOnInit(): void {

  this.isLoggoedIn = this.authService.isLoggedIn();
  console.log("Is Logged In:", this.isLoggoedIn);
    if(this.isLoggoedIn){
      this.userName = this.authService.getUsername();
      this.authService.findByUsername({userName: this.userName}).subscribe({
        next: (user :any) => {
          this.userId = user?.detail?.id;
          console.log("Fetched user ID:", this.userId);},
        error: (err) => {
          console.error('Error fetching user by username:', err);
        }
      });
    }
  this.facilityService.getAllFacilities().subscribe({
    next: (data: any) => {
      this.facilities = data.detail || [];

      this.facilities.forEach(facility => {
        // convert time slots
        facility.timeSlots = facility.timeSlots?.map(slot =>
          this.convertTo12Hour(slot.start, slot.end)
        );

        // clean image URL
        facility.imageUrl = this.cleanAssetPath(facility.imageUrl || '');
        console.log(`Cleaned image URL for facility ${facility.imageUrl}`);

        // log each time slot
        facility.timeSlots?.forEach(slot => {
          slot.slotType='BOOKED';
        });
      });
    },
    error: (err: any) => console.error('Error fetching facilities:', err)
  });
   console.log(localStorage.getItem('reload'));
   if (localStorage.getItem('reload') === "true") {
    console.log("reloading");
     localStorage.setItem('reload', "false");
     window.location.reload();
   }  else {
        console.log("stopping reload");
       localStorage.removeItem('reload');
   }  
 }

fetchFacilitiesByDate(): void {
  if (!this.selectedDate) {
    console.warn('No date selected. Skipping facility fetch.');
    return;
  }

  // Attach selected date to booking DTO
  if (this.bookingDto) {
    this.bookingDto.bookingDate = this.selectedDate;
  } else {
    this.bookingDto = { bookingDate: this.selectedDate };
  }

  // Fetch facilities from API
  this.facilityService.getFacilitiesByDate(this.bookingDto).subscribe({
    next: (response: any) => {
      // Assign fetched facilities
      this.facilities = response.detail || [];

      // Convert time slots to 12-hour format and clean image URLs
      this.facilities.forEach(facility => {
        if (facility.timeSlots?.length) {
          facility.timeSlots = facility.timeSlots.map((slot: any) =>
            this.convertTo12Hour(slot.start, slot.end)
          );
        }

        // Clean image URL if needed
        facility.imageUrl = this.cleanAssetPath(facility.imageUrl || '');
      });

      console.log(` Facilities fetched for ${this.selectedDate}:`, this.facilities);
    },
    error: (error: any) => {
      console.error(' Error fetching facilities:', error);
    }
  });
}


 cleanAssetPath(url: string): string {
 if (!url) return 'assets/default-facility.jpg';


 // Remove the localhost:4200 part if it exists
 const localPattern = /^(http:\/\/localhost:4200\/)/;
 return url.replace(localPattern, '');
}

convertTo12Hour(start: string, end: string) {
  const formatTime = (time: string) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return {
    start: formatTime(start),
    end: formatTime(end)
  };
}
}
