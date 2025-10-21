import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // ✅ Import path to AuthService
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ userName: this.userName, password: this.password }).subscribe({
      next: () => {
        alert('Login successful!');
        this.router.navigate(['/facilities']);
      },
      error: () => {
        alert('Invalid credentials.');
      }
    });
  }
}
