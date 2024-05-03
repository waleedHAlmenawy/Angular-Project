import { Component, Input } from '@angular/core';
import { ICart } from '../../../../modles/cart.modle';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.css'
})
export class QuantityComponent {
  @Input() item: ICart;

  constructor(private cartService: CartService) {};

  onAdd() {
    if(this.item.quantity < this.item.product.stock)
    {
      this.item.quantity++;
      this.cartService.calculateTotal();
    }
  }

  onMinus() {
    if(this.item.quantity != 1)
    {
      this.item.quantity--;
      this.cartService.calculateTotal();
    }
  }
}
