import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  name = this.authService.getFullCurrentUserData().user.name;

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }
}
