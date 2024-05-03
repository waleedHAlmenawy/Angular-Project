import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-up',
  templateUrl: './up.component.html',
  styleUrl: './up.component.css'
})
export class UpComponent {

  scrollToTop(): void {
    
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

}
