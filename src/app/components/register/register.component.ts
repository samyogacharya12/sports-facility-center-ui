import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // ✅ Import path to AuthService
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userName = '';
  firstName='';
  lastName='';
  password='';
  email='';
  roles='ROLE_CUSTOMER';
  address='';
  phoneNumber='';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register({roles:this.roles,userName: this.userName, email: this.email, password: this.password,firstName:this.firstName, lastName: this.lastName,address:this.address, phoneNumber:this.phoneNumber})
    .subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration failed. Try again.');
      }
    });
  }
}
