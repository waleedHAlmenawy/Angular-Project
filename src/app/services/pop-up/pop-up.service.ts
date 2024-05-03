import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../pages/order/pop-up/pop-up.component';

@Injectable({
  providedIn: 'root',
})
export class PopUpService {
  constructor(private dialog: MatDialog) {}

  openDialog(msg: string) {
    return this.dialog.open(PopUpComponent, {
      width: '390px',
      height: '180px',
      position: { left: '50%', top: '-40%' },
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }
}
