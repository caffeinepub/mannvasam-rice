import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { CartItem, Product } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface CartContextValue {
  cartItems: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: bigint) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { actor, isFetching } = useActor();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!actor || isFetching) return;
    try {
      const items = await actor.getCart();
      setCartItems(items);
    } catch {
      // ignore
    }
  }, [actor, isFetching]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(
    async (product: Product) => {
      setIsLoading(true);
      // Optimistic update
      setCartItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + BigInt(1) }
              : i,
          );
        }
        return [...prev, { product, quantity: BigInt(1) }];
      });
      try {
        if (actor) {
          await actor.addToCart(product.id, BigInt(1));
        }
      } catch {
        await fetchCart();
      } finally {
        setIsLoading(false);
      }
    },
    [actor, fetchCart],
  );

  const removeFromCart = useCallback(
    async (productId: bigint) => {
      setIsLoading(true);
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
      try {
        if (actor) {
          await actor.removeFromCart(productId);
        }
      } catch {
        await fetchCart();
      } finally {
        setIsLoading(false);
      }
    },
    [actor, fetchCart],
  );

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    setCartItems([]);
    try {
      if (actor) {
        await actor.clearCart();
      }
    } catch {
      await fetchCart();
    } finally {
      setIsLoading(false);
    }
  }, [actor, fetchCart]);

  const cartCount = cartItems.reduce((sum, i) => sum + Number(i.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        removeFromCart,
        clearCart,
        isLoading,
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
