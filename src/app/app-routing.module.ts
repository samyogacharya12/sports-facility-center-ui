import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './home/home.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
   {path: 'bookings/:username', component: BookingListComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'facilities', component: FacilitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}