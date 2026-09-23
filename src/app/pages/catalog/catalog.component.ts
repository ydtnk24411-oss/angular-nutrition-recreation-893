import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import { products, FILTER_FACETS } from '../../shared/data/xanh-la.data';
import { XanhLaProduct } from '../../shared/models/xanh-la.models';

type FacetKey = keyof Omit<typeof FILTER_FACETS, never>;

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, ShellComponent, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  protected cart = inject(CartService);
  private route = inject(ActivatedRoute);

  protected readonly facets = FILTER_FACETS;
  protected readonly facetKeys = Object.keys(FILTER_FACETS) as FacetKey[];

  protected category = signal<string | null>(null);
  protected sortBy = signal('recommended');
  protected maxPrice = signal(45);

  protected selectedFilters = signal<Record<string, string[]>>({
    categories: [], container: [], cutType: [], cutting: [],
    packSize: [], packaging: [], preparation: [], quantity: [],
    ripeness: [], sizeGroup: [], thickness: [], type: [], weight: [],
  });

  protected openAccordions = signal<Record<string, boolean>>({
    categories: true, price: true, container: false, cutType: false,
    cutting: false, packSize: false, packaging: false, preparation: false,
    quantity: false, ripeness: false, sizeGroup: false, thickness: false,
    type: false, weight: false,
  });

  protected filteredProducts = computed(() => {
    const f = this.selectedFilters();
    let list = products.filter(p => {
      if (f['categories'].length && !f['categories'].includes(p.category)) return false;
      if (p.priceNumber > this.maxPrice()) return false;
      if (f['container'].length && !f['container'].includes(p.container)) return false;
      if (f['cutType'].length && !f['cutType'].includes(p.cutType)) return false;
      if (f['cutting'].length && !f['cutting'].includes(p.cutting)) return false;
      if (f['packSize'].length && !f['packSize'].includes(p.packSize)) return false;
      if (f['packaging'].length && !f['packaging'].includes(p.packaging)) return false;
      if (f['preparation'].length && !f['preparation'].includes(p.preparation)) return false;
      if (f['quantity'].length && !f['quantity'].includes(p.quantity)) return false;
      if (f['ripeness'].length && !f['ripeness'].includes(p.ripeness)) return false;
      if (f['sizeGroup'].length && !f['sizeGroup'].includes(p.sizeGroup)) return false;
      if (f['thickness'].length && !f['thickness'].includes(p.thickness)) return false;
      if (f['type'].length && !f['type'].includes(p.type)) return false;
      if (f['weight'].length && !f['weight'].includes(p.weight)) return false;
      return true;
    });
    const s = this.sortBy();
    if (s === 'price-asc')  list = [...list].sort((a, b) => a.priceNumber - b.priceNumber);
    if (s === 'price-desc') list = [...list].sort((a, b) => b.priceNumber - a.priceNumber);
    if (s === 'name-asc')   list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (s === 'name-desc')  list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  });

  protected hasActiveFilters = computed(() => {
    const f = this.selectedFilters();
    return Object.values(f).some(arr => arr.length > 0) || this.maxPrice() < 45;
  });

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug && slug !== 'all-products') {
      this.category.set(slug);
      const cat = slug.charAt(0).toUpperCase() + slug.slice(1);
      this.selectedFilters.update(f => ({ ...f, categories: [cat] }));
    }
  }

  toggleAccordion(key: string): void {
    this.openAccordions.update(o => ({ ...o, [key]: !o[key] }));
  }

  toggleFilter(facet: string, val: string): void {
    this.selectedFilters.update(f => {
      const arr = f[facet] ?? [];
      return { ...f, [facet]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  }

  isChecked(facet: string, val: string): boolean {
    return (this.selectedFilters()[facet] ?? []).includes(val);
  }

  clearAll(): void {
    this.selectedFilters.set({ categories: [], container: [], cutType: [], cutting: [],
      packSize: [], packaging: [], preparation: [], quantity: [],
      ripeness: [], sizeGroup: [], thickness: [], type: [], weight: [] });
    this.maxPrice.set(45);
  }

  addToCart(prod: XanhLaProduct): void {
    this.cart.addItem(prod, 1);
  }

  facetLabel(key: string): string {
    const labels: Record<string, string> = {
      categories: 'Loại sản phẩm', container: 'Container', cutType: 'Cut Type',
      cutting: 'Cutting', packSize: 'Pack Size', packaging: 'Packaging',
      preparation: 'Preparation', quantity: 'Quantity', ripeness: 'Ripeness',
      sizeGroup: 'Size Group', thickness: 'Thickness', type: 'Type', weight: 'Weight',
    };
    return labels[key] ?? key;
  }
}
