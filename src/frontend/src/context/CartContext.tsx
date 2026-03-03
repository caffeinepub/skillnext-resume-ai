import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Product } from "../backend.d";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: bigint) => void;
  updateQuantity: (productId: bigint, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "chai-biscuit-cart";
const GST_RATE = 0.18;

function serializeCart(items: CartItem[]): string {
  return JSON.stringify(
    items.map((item) => ({
      ...item,
      product: {
        ...item.product,
        id: item.product.id.toString(),
      },
    })),
  );
}

function deserializeCart(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw) as Array<{
      product: { id: string; [key: string]: unknown };
      quantity: number;
    }>;
    return parsed.map((item) => ({
      ...item,
      product: {
        ...item.product,
        id: BigInt(item.product.id as string),
      } as Product,
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? deserializeCart(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, serializeCart(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: bigint) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: bigint, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const gstAmount = subtotal * GST_RATE;
  const grandTotal = subtotal + gstAmount;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        gstAmount,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
