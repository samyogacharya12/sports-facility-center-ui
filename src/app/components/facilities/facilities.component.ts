import { Component } from '@angular/core';
import { FacilityService } from '../../services/facility.service';
import { Facility } from '../../models/facility.model';
import { Router } from '@angular/router';
@Component({
 selector: 'app-facilities',
 templateUrl: './facilities.component.html',
 styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent {
facilities: Facility[] = [];


 constructor(private facilityService: FacilityService, private router: Router) {}


 ngOnInit(): void {


      this.facilities = [
     {
       id: 1,
       facilityName: 'Indoor Badminton Court',
       description: 'Well-lit indoor badminton court with synthetic flooring and professional nets.',
       capacity: 4,
       imageUrl: '/home/samyog/samyog/sports-facility-center-ui/src/assets/badminton.png',
       openingTime: '08:00 AM',
       closingTime: '10:00 PM',
       timeSlots: [{
       start: '08:00',
       end: '09:00'
     },
       ]
     },
     {
       id: 2,
       facilityName: 'Swimming Pool',
       description: 'Olympic-sized pool with clean water and locker facilities. Lifeguard on duty.',
       imageUrl: '/home/samyog/samyog/sports-facility-center-ui/src/assets/pool.jpg',
       capacity: 20,
       openingTime: '08:00 AM',
       closingTime: '10:00 PM',
       timeSlots: [{
       start: '10:00',
       end: '11:00'
     },
       ]
     },
     {
       id: 4,
       facilityName: 'Tennis Court',
       description: 'Clay court maintained daily for high performance play.',
       imageUrl: '/home/samyog/samyog/sports-facility-center-ui/src/assets/tennis.jpeg',
       capacity: 2,
       openingTime: '08:00 AM',
       closingTime: '10:00 PM',
       timeSlots: [{
       start: '11:00',
       end: '12:00'
     },{
       start: '12:00',
       end: '13:00'
     },
       ]
     },
          {
       id: 4,
       facilityName: 'Basketball Court',
       description: 'Clay court maintained daily for high performance play.',
       imageUrl: '/home/samyog/samyog/sports-facility-center-ui/src/assets/tennis.jpeg',
       capacity: 2,
       openingTime: '08:00 AM',
       closingTime: '10:00 PM',
       timeSlots: [{
       start: '11:00',
       end: '12:00'
     },{
       start: '12:00',
       end: '13:00'
     },
     {
       start: '13:00',
       end: '14:00'
     },
      {
       start: '14:00',
       end: '15:00'
     },
      {
       start: '15:00',
       end: '16:00'
     },
      {
       start: '16:00',
       end: '17:00'
     },
      {
       start: '17:00',
       end: '18:00'
     }
       ]
     }
   ];


   this.facilities.forEach(facility => {
     facility.imageUrl = this.cleanAssetPath(facility.imageUrl || '');
     console.log(`Cleaned image URL for facility ${facility.imageUrl}`);
   });
    const hasReloaded = localStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      console.log('Reloading the page to load assets correctly.');
      localStorage.setItem('hasReloaded', 'true');
    } else {
            console.log('Reloading the else page to load assets correctly.');
      localStorage.removeItem('hasReloaded');
    }


   // this.loadFacilities();

 }


 cleanAssetPath(url: string): string {
 if (!url) return 'assets/default-facility.jpg';


 // Remove the localhost:4200 part if it exists
 const localPattern = /^(http:\/\/localhost:4200\/)/;
 return url.replace(localPattern, '');
}
}
