import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService, formatPrice } from '../../shared/services/cart.service';
import { OrderApiService } from '../../shared/services/order-api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ShellComponent, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  protected cart     = inject(CartService);
  private orderApi   = inject(OrderApiService);
  private router     = inject(Router);
  protected formatPrice = formatPrice;

  protected completed      = signal(false);
  protected orderCode      = signal('');
  protected submitting     = signal(false);
  protected errorMsg       = signal('');
  protected shippingMethod = signal<'pickup' | 'delivery'>('pickup');
  protected paymentMethod  = signal<'cod' | 'bank_transfer'>('cod');

  // form fields
  protected guestName    = signal(this.cart.currentUser()?.name  ?? '');
  protected guestPhone   = signal('');
  protected guestEmail   = signal(this.cart.currentUser()?.email ?? '');
  protected shippingAddr = signal('');

  handleSubmit(e: Event): void {
    e.preventDefault();

    if (this.cart.items().length === 0) {
      this.errorMsg.set('Giỏ hàng trống, vui lòng thêm sản phẩm trước.'); return;
    }
    if (!this.guestName() || !this.guestPhone() || !this.guestEmail()) {
      this.errorMsg.set('Vui lòng điền đầy đủ thông tin liên hệ.'); return;
    }
    if (this.shippingMethod() === 'delivery' && !this.shippingAddr()) {
      this.errorMsg.set('Vui lòng nhập địa chỉ giao hàng.'); return;
    }

    this.submitting.set(true);
    this.errorMsg.set('');

    // Build order payload — product field là MongoDB _id nếu có (từ API),
    // hoặc bỏ qua nếu là static data (slug string)
    const items = this.cart.items().map(i => {
      const prod = i.product as any;
      // _id có dạng 24-char hex (MongoDB ObjectId)
      const isObjectId = /^[a-f\d]{24}$/i.test(prod._id ?? '');
      return {
        ...(isObjectId ? { product: prod._id } : {}),
        productName:    i.product.name,
        productImage:   i.product.image,
        productPrice:   i.product.price,
        priceNumber:    i.product.priceNumber,
        quantity:       i.quantity,
        selectedOption: i.selectedOption ?? '',
      };
    });

    const payload = {
      guestName:       this.guestName(),
      guestEmail:      this.guestEmail(),
      guestPhone:      this.guestPhone(),
      items,
      subtotal:        this.cart.subtotal(),
      shippingFee:     0,
      total:           this.cart.subtotal(),
      shippingMethod:  this.shippingMethod(),
      shippingAddress: this.shippingAddr(),
      paymentMethod:   this.paymentMethod(),
    };

    this.orderApi.create(payload as any).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.orderCode.set(res.data.orderCode);
        this.completed.set(true);
        this.cart.clear();
      },
      error: (err) => {
        this.submitting.set(false);
        this.errorMsg.set(err.error?.message || 'Đặt hàng thất bại, vui lòng thử lại.');
      },
    });
  }
}
