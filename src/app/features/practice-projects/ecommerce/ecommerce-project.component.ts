import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-ecommerce-project',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="project-container">
      <header class="project-header">
        <a routerLink="/" class="back-link">← Back to Home</a>
        <h1>🛒 E-commerce Product List - Practice Project</h1>
        <p>Learn routing, forms, and component communication</p>
        <div class="concepts">
          <span class="concept">Routing</span>
          <span class="concept">Component Communication</span>
          <span class="concept">State Management</span>
          <span class="concept">Computed Signals</span>
        </div>
      </header>

      <div class="app-container">
        <div class="shop-layout">
          <aside class="sidebar">
            <h3>Categories</h3>
            <button [class.active]="selectedCategory() === 'all'" (click)="selectedCategory.set('all')">
              All Products
            </button>
            @for (cat of categories; track cat) {
              <button [class.active]="selectedCategory() === cat" (click)="selectedCategory.set(cat)">
                {{ cat }}
              </button>
            }
          </aside>

          <main class="products">
            <div class="products-header">
              <h2>{{ filteredProducts().length }} Products</h2>
              <select [(ngModel)]="sortBy" (change)="sortProducts()">
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div class="products-grid">
              @for (product of filteredProducts(); track product.id) {
                <div class="product-card" [class.out-of-stock]="!product.inStock">
                  <div class="product-image">{{ product.image }}</div>
                  <div class="product-info">
                    <span class="product-category">{{ product.category }}</span>
                    <h3>{{ product.name }}</h3>
                    <div class="product-rating">
                      @for (star of [1,2,3,4,5]; track star) {
                        <span [class.filled]="star <= product.rating">★</span>
                      }
                      <span class="rating-value">({{ product.rating }})</span>
                    </div>
                    <div class="product-price">
                      <span class="price">\${{ product.price.toFixed(2) }}</span>
                      @if (!product.inStock) {
                        <span class="stock-status">Out of Stock</span>
                      }
                    </div>
                    <button
                      class="add-to-cart-btn"
                      (click)="addToCart(product)"
                      [disabled]="!product.inStock">
                      {{ product.inStock ? 'Add to Cart' : 'Unavailable' }}
                    </button>
                  </div>
                </div>
              }
            </div>
          </main>
        </div>

        @if (cart().length > 0) {
          <div class="cart-section">
            <h2>🛒 Shopping Cart ({{ cart().length }} items)</h2>
            <div class="cart-items">
              @for (item of cart(); track item.product.id) {
                <div class="cart-item">
                  <span class="cart-item-image">{{ item.product.image }}</span>
                  <div class="cart-item-details">
                    <span class="cart-item-name">{{ item.product.name }}</span>
                    <span class="cart-item-price">\${{ item.product.price.toFixed(2) }}</span>
                  </div>
                  <div class="cart-item-quantity">
                    <button (click)="updateQuantity(item.product.id, -1)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button (click)="updateQuantity(item.product.id, 1)">+</button>
                  </div>
                  <button class="remove-btn" (click)="removeFromCart(item.product.id)">×</button>
                </div>
              }
            </div>
            <div class="cart-total">
              <span>Total:</span>
              <span class="total-amount">\${{ totalAmount().toFixed(2) }}</span>
            </div>
          </div>
        }

        <section class="code-explanation">
          <h2>How This App Works</h2>
          <div class="code-block">
            <h3>1. Product Service with Signals</h3>
            <pre><code>{{ codeExample1 }}</code></pre>
          </div>
          <div class="code-block">
            <h3>2. Cart State Management</h3>
            <pre><code>{{ codeExample2 }}</code></pre>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .project-container { max-width: 1200px; margin: 0 auto; padding: 24px; }
    .back-link { display: inline-block; margin-bottom: 16px; color: #2196f3; text-decoration: none; }
    .project-header { text-align: center; margin-bottom: 40px; }
    .project-header h1 { margin: 0 0 8px; color: #1a1a1a; }
    .project-header p { color: #666; margin: 0 0 16px; }
    .concepts { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
    .concept { background: #e3f2fd; color: #1565c0; padding: 6px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; }
    .app-container { background: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 24px; margin-bottom: 40px; }
    .shop-layout { display: flex; gap: 24px; }
    .sidebar { width: 200px; flex-shrink: 0; }
    .sidebar h3 { margin: 0 0 12px; color: #333; }
    .sidebar button {
      display: block; width: 100%; text-align: left; padding: 12px;
      background: transparent; border: none; cursor: pointer; border-radius: 8px;
      margin-bottom: 4px; color: #555;
    }
    .sidebar button:hover { background: #f5f5f5; }
    .sidebar button.active { background: #2196f3; color: white; }
    .products { flex: 1; }
    .products-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .products-header h2 { margin: 0; color: #333; }
    .products-header select { padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; }
    .products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .product-card {
      background: #f9f9f9; border-radius: 12px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;
    }
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
    .product-card.out-of-stock { opacity: 0.6; }
    .product-image { font-size: 80px; text-align: center; padding: 32px; background: #eee; }
    .product-info { padding: 16px; }
    .product-category { font-size: 12px; color: #888; text-transform: uppercase; }
    .product-info h3 { margin: 8px 0; color: #1a1a1a; }
    .product-rating { margin-bottom: 8px; }
    .product-rating span { color: #ddd; }
    .product-rating span.filled { color: #ffc107; }
    .rating-value { color: #888; font-size: 14px; }
    .product-price { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .price { font-size: 24px; font-weight: 700; color: #2196f3; }
    .stock-status { color: #f44336; font-size: 14px; }
    .add-to-cart-btn {
      width: 100%; padding: 12px; background: #2196f3; color: white;
      border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
    }
    .add-to-cart-btn:disabled { background: #ccc; cursor: not-allowed; }
    .cart-section {
      background: #f5f5f5; border-radius: 12px; padding: 24px; margin-top: 24px;
    }
    .cart-section h2 { margin: 0 0 16px; }
    .cart-item {
      display: flex; align-items: center; gap: 16px; padding: 12px;
      background: white; border-radius: 8px; margin-bottom: 8px;
    }
    .cart-item-image { font-size: 32px; }
    .cart-item-details { flex: 1; }
    .cart-item-name { font-weight: 600; display: block; }
    .cart-item-price { color: #666; }
    .cart-item-quantity { display: flex; align-items: center; gap: 12px; }
    .cart-item-quantity button {
      width: 28px; height: 28px; border: 1px solid #ddd; border-radius: 4px;
      background: white; cursor: pointer;
    }
    .remove-btn {
      width: 28px; height: 28px; background: #ff5252; color: white;
      border: none; border-radius: 50%; cursor: pointer;
    }
    .cart-total {
      display: flex; justify-content: space-between; padding: 16px;
      background: white; border-radius: 8px; margin-top: 16px;
    }
    .total-amount { font-size: 24px; font-weight: 700; color: #2196f3; }
    .code-explanation { margin-top: 40px; }
    .code-explanation h2 { margin-bottom: 24px; color: #1a1a1a; }
    .code-block { background: #1e1e1e; border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
    .code-block h3 { margin: 0; padding: 16px 20px; background: #2d2d2d; color: #fff; font-size: 14px; }
    .code-block pre { margin: 0; padding: 20px; overflow-x: auto; }
    .code-block code { color: #d4d4d4; font-family: 'Consolas', monospace; font-size: 14px; line-height: 1.6; }
  `]
})
export class EcommerceProjectComponent {
  categories = ['Electronics', 'Clothing', 'Books', 'Home'];
  selectedCategory = signal('all');
  sortBy = 'name';
  cart = signal<CartItem[]>([]);

  products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 149.99, image: '🎧', category: 'Electronics', rating: 4, inStock: true },
    { id: 2, name: 'Smart Watch', price: 299.99, image: '⌚', category: 'Electronics', rating: 5, inStock: true },
    { id: 3, name: 'Laptop Stand', price: 49.99, image: '💻', category: 'Electronics', rating: 4, inStock: false },
    { id: 4, name: 'T-Shirt', price: 29.99, image: '👕', category: 'Clothing', rating: 3, inStock: true },
    { id: 5, name: 'Jeans', price: 79.99, image: '👖', category: 'Clothing', rating: 4, inStock: true },
    { id: 6, name: 'Angular Guide', price: 39.99, image: '📚', category: 'Books', rating: 5, inStock: true },
    { id: 7, name: 'Desk Lamp', price: 34.99, image: '💡', category: 'Home', rating: 4, inStock: true },
    { id: 8, name: 'Coffee Mug', price: 14.99, image: '☕', category: 'Home', rating: 3, inStock: true },
  ];

  filteredProducts = computed(() => {
    let filtered = this.products;
    const cat = this.selectedCategory();
    if (cat !== 'all') {
      filtered = filtered.filter(p => p.category === cat);
    }
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  });

  totalAmount = computed(() =>
    this.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  sortProducts(): void {
    // Sorting handled by computed signal
  }

  addToCart(product: Product): void {
    this.cart.update(cart => {
      const existing = cart.find(item => item.product.id === product.id);
      if (existing) {
        return cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...cart, { product, quantity: 1 }];
    });
  }

  updateQuantity(productId: number, change: number): void {
    this.cart.update(cart =>
      cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }

  removeFromCart(productId: number): void {
    this.cart.update(cart => cart.filter(item => item.product.id !== productId));
  }

  codeExample1 = `@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = signal<Product[]>([
    { id: 1, name: 'Wireless Headphones', price: 149.99, category: 'Electronics' },
    { id: 2, name: 'Smart Watch', price: 299.99, category: 'Electronics' },
    // ...more products
  ]);

  getProducts() {
    return this.products.asReadonly();
  }

  filterByCategory(category: string) {
    return computed(() => 
      this.products().filter(p => 
        category === 'all' || p.category === category
      )
    );
  }
}`;

  codeExample2 = `@Component({...})
export class ProductListComponent {
  private productService = inject(ProductService);
  
  selectedCategory = signal('all');
  cart = signal<CartItem[]>([]);
  
  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    return this.productService.getProducts()()
      .filter(p => category === 'all' || p.category === category);
  });
  
  totalAmount = computed(() =>
    this.cart().reduce((sum, item) => 
      sum + item.product.price * item.quantity, 0
    )
  );
  
  addToCart(product: Product) {
    this.cart.update(cart => {
      const existing = cart.find(i => i.product.id === product.id);
      if (existing) {
        return cart.map(i => 
          i.product.id === product.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...cart, { product, quantity: 1 }];
    });
  }
}`;
}
