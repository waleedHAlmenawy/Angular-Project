import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userProfileService.getWishlist();
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.authService.isAuthenticated();
    this.router.navigate(['user','home']);
  }
}
