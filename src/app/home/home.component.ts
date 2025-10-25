import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggoedIn = false;
  username?: string;


   constructor(private authService:AuthService) {}
  

   ngOnInit(): void {
    this.isLoggoedIn = this.authService.isLoggedIn();
    if(this.isLoggoedIn){
      this.username = this.authService.getUsername();
    }
   }

}
