import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import { onlineOrderProducts } from '../../shared/data/xanh-la.data';
import { XanhLaProduct } from '../../shared/models/xanh-la.models';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [CommonModule, ShellComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css',
})
export class MenusComponent {
  protected cart = inject(CartService);
  protected route = inject(ActivatedRoute);

  protected sections = [
    { title: 'Sản Phẩm Tươi',    items: onlineOrderProducts.slice(0, 3) },
    { title: 'Rau Cải',          items: onlineOrderProducts.slice(3, 6) },
    { title: 'Thịt và Hải Sản',  items: onlineOrderProducts.slice(6, 9) },
  ];

  addToCart(prod: XanhLaProduct): void { this.cart.addItem(prod, 1); }
}
