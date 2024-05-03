import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-pop-up',
  templateUrl: './success-pop-up.component.html',
  styleUrl: './success-pop-up.component.css',
})
export class SuccessPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {}

  text = this.data.text;

  closePopUp() {
    this.dialogRef.close();
  }
}
