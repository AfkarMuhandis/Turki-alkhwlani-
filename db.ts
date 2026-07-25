// Mock Database using localStorage

export interface Article {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  tags: string[];
  author: string;
  authorId: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  views: number;
}

export interface Service {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  features: string[];
  featuresEn: string[];
  rating: number;
  reviews: number;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  oldPrice?: number;
  category: 'books' | 'templates' | 'courses' | 'tools';
  image: string;
  rating: number;
  reviews: number;
  downloads: number;
  file?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  products: { productId: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
}

export interface Affiliate {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  url: string;
  logo: string;
  category: string;
  commission: number;
  clicks: number;
  earnings: number;
}

export interface UserDB {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  createdAt: string;
  lastLogin?: string;
}

class Database {
  private getKey(key: string): string {
    return `engineer_ideas_${key}`;
  }

  get<T>(key: string): T[] {
    const data = localStorage.getItem(this.getKey(key));
    return data ? JSON.parse(data) : [];
  }

  set<T>(key: string, data: T[]): void {
    localStorage.setItem(this.getKey(key), JSON.stringify(data));
  }

  // Articles
  getArticles(): Article[] {
    return this.get<Article>('articles');
  }

  addArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Article {
    const articles = this.getArticles();
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
    };
    articles.unshift(newArticle);
    this.set('articles', articles);
    return newArticle;
  }

  updateArticle(id: string, updates: Partial<Article>): Article | null {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index === -1) return null;
    articles[index] = { ...articles[index], ...updates, updatedAt: new Date().toISOString() };
    this.set('articles', articles);
    return articles[index];
  }

  deleteArticle(id: string): boolean {
    const articles = this.getArticles().filter(a => a.id !== id);
    this.set('articles', articles);
    return true;
  }

  // Bookings
  getBookings(): Booking[] {
    return this.get<Booking>('bookings');
  }

  addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const bookings = this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: `BK-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    bookings.unshift(newBooking);
    this.set('bookings', bookings);
    return newBooking;
  }

  updateBookingStatus(id: string, status: Booking['status']): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    bookings[index].status = status;
    this.set('bookings', bookings);
    return bookings[index];
  }

  // Products
  getProducts(): Product[] {
    return this.get<Product>('products');
  }

  // Orders
  getOrders(): Order[] {
    return this.get<Order>('orders');
  }

  addOrder(order: Omit<Order, 'id' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    this.set('orders', orders);
    return newOrder;
  }

  updateOrderStatus(id: string, status: Order['status']): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    orders[index].status = status;
    this.set('orders', orders);
    return orders[index];
  }

  // Affiliates
  getAffiliates(): Affiliate[] {
    return this.get<Affiliate>('affiliates');
  }

  addAffiliateClick(id: string): void {
    const affiliates = this.getAffiliates();
    const index = affiliates.findIndex(a => a.id === id);
    if (index !== -1) {
      affiliates[index].clicks++;
      this.set('affiliates', affiliates);
    }
  }

  // Users
  getUsers(): UserDB[] {
    return this.get<UserDB>('users');
  }

  // Stats
  getStats() {
    return {
      totalRevenue: this.getOrders().reduce((sum, o) => sum + o.total, 0),
      totalOrders: this.getOrders().length,
      totalBookings: this.getBookings().length,
      totalArticles: this.getArticles().length,
      totalUsers: this.getUsers().length,
      pendingOrders: this.getOrders().filter(o => o.status === 'pending').length,
      pendingBookings: this.getBookings().filter(b => b.status === 'pending').length,
    };
  }
}

export const db = new Database();
