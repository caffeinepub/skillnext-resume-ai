import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Loader2,
  Minus,
  Plus,
  Printer,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { OrderItem } from "../backend.d";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/useQueries";

const GST_RATE = 18;

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    gstAmount,
    grandTotal,
  } = useCart();
  const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate();
  const placeOrder = usePlaceOrder();

  useEffect(() => {
    document.title = "Cart — Chai & Biscuit Co.";
  }, []);

  const handlePlaceOrder = async () => {
    if (!customerName.trim()) {
      toast.error("Please enter your name to place the order.");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: BigInt(item.quantity),
      unitPrice: item.product.price,
    }));

    try {
      const orderId = await placeOrder.mutateAsync({
        customerName: customerName.trim(),
        items: orderItems,
      });
      toast.success("Order placed successfully!");
      clearCart();
      void navigate({
        to: "/order-confirmation/$orderId",
        params: { orderId: orderId.toString() },
      });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (items.length === 0) {
    return (
      <div className="page-enter">
        <Navigation />
        <main className="container mx-auto px-4 lg:px-8 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <div data-ocid="cart.cart.empty_state" className="max-w-md mx-auto">
            <div className="text-8xl mb-6 animate-float">🛒</div>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Looks like you haven&apos;t added anything yet. Explore our menu
              to find something delicious!
            </p>
            <Button
              asChild
              size="lg"
              data-ocid="cart.menu.primary_button"
              className="bg-primary text-primary-foreground font-display font-semibold px-8 py-5 rounded-full hover:scale-105 transition-all gap-2"
            >
              <Link to="/menu">
                <ShoppingBag className="h-5 w-5" />
                Browse Menu
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-enter">
      <Navigation />

      {/* Print-only receipt */}
      <div className="print-only print-receipt">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">Chai &amp; Biscuit Co.</h1>
          <p className="text-sm">42, Chai Street, Mumbai – 400001</p>
          <p className="text-sm">Tel: +91 98765 43210</p>
          <p className="text-sm">GST: 27AABCU9603R1ZX</p>
          <div className="border-t border-dashed border-black my-3" />
          <p className="font-bold">TAX INVOICE</p>
          <p className="text-sm">
            Date: {new Date().toLocaleDateString("en-IN")}
          </p>
          {customerName && <p className="text-sm">Customer: {customerName}</p>}
        </div>
        <div className="border-t border-dashed border-black mb-3" />
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product.id.toString()}>
                <td>{item.product.name}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-right">₹{item.product.price.toFixed(2)}</td>
                <td className="text-right">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-dashed border-black my-3" />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{gstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>TOTAL</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t border-dashed border-black my-3" />
        <p className="text-center text-sm">Thank you for visiting!</p>
        <p className="text-center text-xs">Come again soon 🍵</p>
      </div>

      {/* Screen content */}
      <div className="no-print">
        {/* Header */}
        <section className="pt-28 pb-10 bg-warm-deep text-warm-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="font-serif text-5xl font-bold">Your Cart</h1>
            <p className="text-warm-cream/60 mt-2">
              {items.length} item{items.length !== 1 ? "s" : ""} in your order
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, idx) => (
                <div
                  key={item.product.id.toString()}
                  data-ocid={`cart.item.${idx + 1}`}
                  className="bg-card rounded-2xl border border-border p-5 flex gap-4 items-start"
                >
                  {/* Product image / emoji */}
                  <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 text-3xl overflow-hidden">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span>
                        {item.product.category === "tea"
                          ? "🍵"
                          : item.product.category === "coffee"
                            ? "☕"
                            : item.product.category === "snacks"
                              ? "🥨"
                              : "🍪"}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-foreground text-lg leading-tight mb-1 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 capitalize">
                      {item.product.category}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-3">
                      {/* Quantity stepper */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-lg border-border"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          data-ocid={`cart.quantity_minus.button.${idx + 1}`}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center font-display font-bold text-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-lg border-border"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          data-ocid={`cart.quantity_plus.button.${idx + 1}`}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-serif font-bold text-foreground text-lg">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
                          onClick={() => {
                            removeItem(item.product.id);
                            toast.success(
                              `${item.product.name} removed from cart`,
                            );
                          }}
                          data-ocid={`cart.item.delete_button.${idx + 1}`}
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24 space-y-5">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Order Summary
                </h2>

                <Separator />

                {/* Price breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-display">
                      Subtotal ({items.reduce((s, i) => s + i.quantity, 0)}{" "}
                      items)
                    </span>
                    <span className="font-medium text-foreground">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-display">
                      GST ({GST_RATE}%)
                    </span>
                    <span className="font-medium text-foreground">
                      ₹{gstAmount.toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-display font-bold text-foreground">
                      Grand Total
                    </span>
                    <span className="font-serif font-bold text-2xl text-foreground">
                      ₹{grandTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    * Inclusive of all taxes
                  </p>
                </div>

                <Separator />

                {/* Customer Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="customer-name"
                    className="font-display font-medium text-sm"
                  >
                    Your Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="customer-name"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    data-ocid="cart.customer_name.input"
                    className="bg-muted/50 border-border"
                  />
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-primary text-primary-foreground font-display font-bold py-5 rounded-xl hover:bg-primary/90 hover:scale-[1.01] transition-all gap-2"
                    onClick={handlePlaceOrder}
                    disabled={placeOrder.isPending}
                    data-ocid="cart.place_order.primary_button"
                  >
                    {placeOrder.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Placing Order…
                      </>
                    ) : (
                      <>
                        Place Order
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full font-display font-semibold border-border hover:bg-muted gap-2"
                    onClick={handlePrint}
                    data-ocid="cart.print_bill.secondary_button"
                  >
                    <Printer className="h-4 w-4" />
                    Print Bill
                  </Button>

                  {placeOrder.isError && (
                    <p
                      data-ocid="cart.order.error_state"
                      className="text-destructive text-sm text-center"
                    >
                      Failed to place order. Please try again.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
