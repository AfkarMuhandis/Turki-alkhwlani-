// Real Database with localStorage persistence

// Generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Database keys
const KEYS = {
  ARTICLES: 'ei_articles',
  SERVICES: 'ei_services',
  BOOKINGS: 'ei_bookings',
  PRODUCTS: 'ei_products',
  ORDERS: 'ei_orders',
  USERS: 'ei_users',
  COMMENTS: 'ei_comments',
  CONTACTS: 'ei_contacts',
  NOTIFICATIONS: 'ei_notifications',
};

// Helper functions
const get = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const set = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ==================== ARTICLES ====================
export interface Article {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  excerptAr: string;
  excerptEn: string;
  category: string;
  tags: string[];
  image: string;
  authorId: string;
  authorName: string;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export const ArticleDB = {
  getAll: () => get<Article>(KEYS.ARTICLES),
  
  getById: (id: string) => {
    const articles = get<Article>(KEYS.ARTICLES);
    return articles.find(a => a.id === id) || null;
  },
  
  getPublished: () => {
    return get<Article>(KEYS.ARTICLES).filter(a => a.published);
  },
  
  create: (data: Omit<Article, 'id' | 'views' | 'createdAt' | 'updatedAt'>) => {
    const articles = get<Article>(KEYS.ARTICLES);
    const article: Article = {
      ...data,
      id: generateId(),
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    articles.unshift(article);
    set(KEYS.ARTICLES, articles);
    return article;
  },
  
  update: (id: string, data: Partial<Article>) => {
    const articles = get<Article>(KEYS.ARTICLES);
    const index = articles.findIndex(a => a.id === id);
    if (index === -1) return null;
    articles[index] = { ...articles[index], ...data, updatedAt: new Date().toISOString() };
    set(KEYS.ARTICLES, articles);
    return articles[index];
  },
  
  delete: (id: string) => {
    const articles = get<Article>(KEYS.ARTICLES).filter(a => a.id !== id);
    set(KEYS.ARTICLES, articles);
    return true;
  },
  
  incrementViews: (id: string) => {
    const articles = get<Article>(KEYS.ARTICLES);
    const article = articles.find(a => a.id === id);
    if (article) {
      article.views++;
      set(KEYS.ARTICLES, articles);
    }
  },
};

// ==================== SERVICES ====================
export interface Service {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  price: number;
  duration: string;
  features: string[];
  image: string;
  rating: number;
  reviewCount: number;
  active: boolean;
  createdAt: string;
}

export const ServiceDB = {
  getAll: () => get<Service>(KEYS.SERVICES),
  
  getById: (id: string) => {
    return get<Service>(KEYS.SERVICES).find(s => s.id === id) || null;
  },
  
  getActive: () => get<Service>(KEYS.SERVICES).filter(s => s.active),
  
  create: (data: Omit<Service, 'id' | 'rating' | 'reviewCount' | 'createdAt'>) => {
    const services = get<Service>(KEYS.SERVICES);
    const service: Service = {
      ...data,
      id: generateId(),
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    };
    services.unshift(service);
    set(KEYS.SERVICES, services);
    return service;
  },
  
  update: (id: string, data: Partial<Service>) => {
    const services = get<Service>(KEYS.SERVICES);
    const index = services.findIndex(s => s.id === id);
    if (index === -1) return null;
    services[index] = { ...services[index], ...data };
    set(KEYS.SERVICES, services);
    return services[index];
  },
  
  delete: (id: string) => {
    const services = get<Service>(KEYS.SERVICES).filter(s => s.id !== id);
    set(KEYS.SERVICES, services);
    return true;
  },
};

// ==================== BOOKINGS ====================
export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  createdAt: string;
}

export const BookingDB = {
  getAll: () => get<Booking>(KEYS.BOOKINGS),
  
  getById: (id: string) => {
    return get<Booking>(KEYS.BOOKINGS).find(b => b.id === id) || null;
  },
  
  getByUser: (userId: string) => {
    return get<Booking>(KEYS.BOOKINGS).filter(b => b.userId === userId);
  },
  
  create: (data: Omit<Booking, 'id' | 'createdAt'>) => {
    const bookings = get<Booking>(KEYS.BOOKINGS);
    const booking: Booking = {
      ...data,
      id: `BK-${generateId()}`,
      createdAt: new Date().toISOString(),
    };
    bookings.unshift(booking);
    set(KEYS.BOOKINGS, bookings);
    return booking;
  },
  
  updateStatus: (id: string, status: Booking['status']) => {
    const bookings = get<Booking>(KEYS.BOOKINGS);
    const booking = bookings.find(b => b.id === id);
    if (booking) {
      booking.status = status;
      set(KEYS.BOOKINGS, bookings);
    }
    return booking;
  },
};

// ==================== PRODUCTS ====================
export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: 'books' | 'templates' | 'courses' | 'tools';
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  downloads: number;
  fileUrl?: string;
  active: boolean;
}

export const ProductDB = {
  getAll: () => get<Product>(KEYS.PRODUCTS),
  
  getById: (id: string) => {
    return get<Product>(KEYS.PRODUCTS).find(p => p.id === id) || null;
  },
  
  getActive: () => get<Product>(KEYS.PRODUCTS).filter(p => p.active),
  
  create: (data: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'downloads'>) => {
    const products = get<Product>(KEYS.PRODUCTS);
    const product: Product = {
      ...data,
      id: generateId(),
      rating: 0,
      reviewCount: 0,
      downloads: 0,
    };
    products.unshift(product);
    set(KEYS.PRODUCTS, products);
    return product;
  },
};

// ==================== ORDERS ====================
export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  paymentMethod: 'card' | 'paypal';
  createdAt: string;
}

export const OrderDB = {
  getAll: () => get<Order>(KEYS.ORDERS),
  
  getById: (id: string) => {
    return get<Order>(KEYS.ORDERS).find(o => o.id === id) || null;
  },
  
  getByUser: (userId: string) => {
    return get<Order>(KEYS.ORDERS).filter(o => o.userId === userId);
  },
  
  create: (data: Omit<Order, 'id' | 'createdAt'>) => {
    const orders = get<Order>(KEYS.ORDERS);
    const order: Order = {
      ...data,
      id: `ORD-${generateId()}`,
      createdAt: new Date().toISOString(),
    };
    orders.unshift(order);
    set(KEYS.ORDERS, orders);
    return order;
  },
  
  updateStatus: (id: string, status: Order['status']) => {
    const orders = get<Order>(KEYS.ORDERS);
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      set(KEYS.ORDERS, orders);
    }
    return order;
  },
};

// ==================== CONTACTS ====================
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export const ContactDB = {
  getAll: () => get<ContactMessage>(KEYS.CONTACTS),
  
  create: (data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const contacts = get<ContactMessage>(KEYS.CONTACTS);
    const contact: ContactMessage = {
      ...data,
      id: generateId(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    contacts.unshift(contact);
    set(KEYS.CONTACTS, contacts);
    return contact;
  },
  
  markAsRead: (id: string) => {
    const contacts = get<ContactMessage>(KEYS.CONTACTS);
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      contact.status = 'read';
      set(KEYS.CONTACTS, contacts);
    }
    return contact;
  },
};

// ==================== STATS ====================
export const StatsDB = {
  getDashboardStats: () => {
    const articles = get<Article>(KEYS.ARTICLES);
    const bookings = get<Booking>(KEYS.BOOKINGS);
    const orders = get<Order>(KEYS.ORDERS);
    const contacts = get<ContactMessage>(KEYS.CONTACTS);
    
    return {
      totalArticles: articles.length,
      publishedArticles: articles.filter(a => a.published).length,
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      totalRevenue: orders.filter(o => o.status === 'paid' || o.status === 'completed')
        .reduce((sum, o) => sum + o.total, 0),
      unreadMessages: contacts.filter(c => c.status === 'new').length,
    };
  },
};

// Initialize with sample data if empty
export const initializeDB = () => {
  // Check if already initialized
  if (localStorage.getItem('ei_initialized')) return;
  
  // Sample Products
  const sampleProducts: Product[] = [
    {
      id: 'p1',
      nameAr: 'دليل المهندس المدني الشامل',
      nameEn: 'Complete Civil Engineer Guide',
      descriptionAr: 'كتاب شامل يغطي جميع جوانب الهندسة المدنية',
      descriptionEn: 'Comprehensive book covering all aspects of civil engineering',
      category: 'books',
      price: 99,
      oldPrice: 149,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      rating: 4.9,
      reviewCount: 127,
      downloads: 0,
      active: true,
    },
    {
      id: 'p2',
      nameAr: 'قوالب AutoCAD احترافية',
      nameEn: 'Professional AutoCAD Templates',
      descriptionAr: 'مجموعة قوالب احترافية لتسريع عملك',
      descriptionEn: 'Professional templates to speed up your work',
      category: 'templates',
      price: 149,
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400',
      rating: 4.8,
      reviewCount: 89,
      downloads: 0,
      active: true,
    },
    {
      id: 'p3',
      nameAr: 'دورة BIM المتقدمة',
      nameEn: 'Advanced BIM Course',
      descriptionAr: 'دورة شاملة لتعلم BIM من الصفر للاحتراف',
      descriptionEn: 'Comprehensive course to learn BIM from scratch to pro',
      category: 'courses',
      price: 499,
      oldPrice: 799,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      rating: 5.0,
      reviewCount: 256,
      downloads: 0,
      active: true,
    },
  ];
  
  set(KEYS.PRODUCTS, sampleProducts);
  localStorage.setItem('ei_initialized', 'true');
};

// Call initialize
initializeDB();