import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartSidebar() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, clearCart } =
    useCart();

  const total = cartItems.reduce(
    (sum, item) =>
      sum + (Number(item.product.price) / 100) * Number(item.quantity),
    0,
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent
        side="right"
        className="w-full max-w-md flex flex-col"
        data-ocid="cart.sheet"
      >
        <SheetHeader>
          <SheetTitle className="font-heading flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center text-center"
            data-ocid="cart.empty_state"
          >
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="font-heading text-lg font-semibold text-foreground mb-2">
              Your cart is empty
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Add some traditional grains to get started!
            </p>
            <Button
              className="mt-6 bg-secondary text-secondary-foreground"
              onClick={closeCart}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 mt-4">
              <div className="space-y-4 pr-4">
                {cartItems.map((item, i) => (
                  <div
                    key={String(item.product.id)}
                    className="flex gap-3"
                    data-ocid={`cart.item.${i + 1}`}
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={`/assets/generated/${item.product.name.toLowerCase().replace(/ /g, "-")}.dim_400x400.jpg`}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/generated/mappilla-samba.dim_400x400.jpg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-sm text-foreground truncate">
                        {item.product.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        Qty: {String(item.quantity)}
                      </p>
                      <p className="font-heading font-bold text-primary">
                        ₹{Number(item.product.price) / 100}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label={`Remove ${item.product.name}`}
                      data-ocid={`cart.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-4">
              <Separator className="mb-4" />
              <div className="flex justify-between font-heading font-bold text-lg mb-4">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                data-ocid="cart.submit_button"
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="ghost"
                className="w-full mt-2 text-muted-foreground"
                onClick={clearCart}
                data-ocid="cart.delete_button"
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
