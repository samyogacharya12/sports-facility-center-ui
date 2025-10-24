import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './services/auth.service'; // example path
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sports-facility-center-ui';
  username: string = '';
  isLoggedIn: boolean = false;

    constructor(private authService: AuthService, private router: Router) {}



  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('User logged in status:', this.isLoggedIn);
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
      console.log('Logged in username:', this.username);
    if (!localStorage.getItem('reloaded')) {
  localStorage.setItem('reloaded', 'true');
  window.location.reload();
} else {
  localStorage.removeItem('reloaded');
}
    }
  }

    logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }



}
