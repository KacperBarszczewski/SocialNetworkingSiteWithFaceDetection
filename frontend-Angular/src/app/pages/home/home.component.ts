import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  name = this.authService.getFullCurrentUserData().user.name;

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }
}
