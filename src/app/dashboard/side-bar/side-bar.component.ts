import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  constructor(private router: Router){};

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['user', 'home']);
  }
}
