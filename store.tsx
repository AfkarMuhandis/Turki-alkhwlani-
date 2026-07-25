// Global State Management
import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  read: boolean;
  createdAt: string;
}

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  expiresAt: string;
  active: boolean;
}

interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

interface AppState {
  cart: CartItem[];
  notifications: Notification[];
  coupons: Coupon[];
  comments: Comment[];
  wishlist: string[];
}

type Action =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'read' | 'createdAt'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'APPLY_COUPON'; payload: string }
  | { type: 'ADD_COMMENT'; payload: Omit<Comment, 'id' | 'createdAt' | 'approved'> }
  | { type: 'APPROVE_COMMENT'; payload: string }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string };

const initialState: AppState = {
  cart: [],
  notifications: [],
  coupons: [
    { code: 'WELCOME20', discount: 20, type: 'percentage', minOrder: 100, expiresAt: '2025-12-31', active: true },
    { code: 'ENGINEER50', discount: 50, type: 'fixed', minOrder: 200, expiresAt: '2025-12-31', active: true },
    { code: 'BIM30', discount: 30, type: 'percentage', minOrder: 300, expiresAt: '2025-06-30', active: true },
  ],
  comments: [],
  wishlist: [],
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          {
            ...action.payload,
            id: Date.now().toString(),
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...state.notifications,
        ],
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [
          {
            ...action.payload,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            approved: false,
          },
          ...state.comments,
        ],
      };
    case 'APPROVE_COMMENT':
      return {
        ...state,
        comments: state.comments.map(c =>
          c.id === action.payload ? { ...c, approved: true } : c
        ),
      };
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.includes(action.payload)) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter(id => id !== action.payload) };
    default:
      return state;
  }
}

interface StoreContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  applyCoupon: (code: string) => { valid: boolean; discount: number; message: string };
  addNotification: (type: Notification['type'], message: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('app_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.cart) dispatch({ type: 'CLEAR_CART' });
      } catch (e) {}
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('app_state', JSON.stringify(state));
  }, [state]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    addNotification('success', `Added ${item.name} to cart`);
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const applyCoupon = (code: string): { valid: boolean; discount: number; message: string } => {
    const coupon = state.coupons.find(c => c.code === code && c.active);
    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid coupon code' };
    }
    if (new Date(coupon.expiresAt) < new Date()) {
      return { valid: false, discount: 0, message: 'Coupon has expired' };
    }
    const total = getCartTotal();
    if (total < coupon.minOrder) {
      return { valid: false, discount: 0, message: `Minimum order is $${coupon.minOrder}` };
    }
    const discount = coupon.type === 'percentage' 
      ? (total * coupon.discount) / 100 
      : coupon.discount;
    return { valid: true, discount, message: `Coupon applied! You saved $${discount.toFixed(2)}` };
  };

  const addNotification = (type: Notification['type'], message: string) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { type, message } });
  };

  return (
    <StoreContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      applyCoupon,
      addNotification,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
