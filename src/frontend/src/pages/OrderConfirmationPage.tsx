import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "@tanstack/react-router";
import { CheckCircle, Loader2, Printer, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useOrder } from "../hooks/useQueries";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / BigInt(1_000_000));
  return new Date(ms).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Order Placed",
  confirmed: "Confirmed",
  completed: "Completed",
};

export default function OrderConfirmationPage() {
  const { orderId } = useParams({ from: "/order-confirmation/$orderId" });
  const orderIdBig = orderId ? BigInt(orderId) : null;
  const { data: order, isLoading, isError } = useOrder(orderIdBig);

  useEffect(() => {
    document.title = "Order Confirmed — Chai & Biscuit Co.";
  }, []);

  if (isLoading) {
    return (
      <div className="page-enter">
        <Navigation />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div data-ocid="order.loading_state" className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground font-display">
              Loading your order…
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="page-enter">
        <Navigation />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div
            data-ocid="order.error_state"
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
              Order Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t load your order details. It may have been placed
              successfully — check your records.
            </p>
            <Button
              asChild
              data-ocid="order.menu.primary_button"
              className="bg-primary text-primary-foreground font-display font-semibold"
            >
              <Link to="/menu">Continue Shopping</Link>
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

      {/* Print receipt */}
      <div className="print-only print-receipt">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">Chai &amp; Biscuit Co.</h1>
          <p className="text-sm">42, Chai Street, Mumbai – 400001</p>
          <p className="text-sm">Tel: +91 98765 43210</p>
          <p className="text-sm">GST: 27AABCU9603R1ZX</p>
          <div className="border-t border-dashed border-black my-3" />
          <p className="font-bold">ORDER RECEIPT</p>
          <p className="text-sm">Order #: {order.id.toString()}</p>
          <p className="text-sm">Date: {formatDate(order.timestamp)}</p>
          <p className="text-sm">Customer: {order.customerName}</p>
          <p className="text-sm">
            Status: {STATUS_LABELS[order.status] ?? order.status}
          </p>
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
            {order.items.map((item) => (
              <tr key={`${item.productId.toString()}-print`}>
                <td>{item.productName}</td>
                <td className="text-center">{item.quantity.toString()}</td>
                <td className="text-right">₹{item.unitPrice.toFixed(2)}</td>
                <td className="text-right">
                  ₹{(item.unitPrice * Number(item.quantity)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-dashed border-black my-3" />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{order.gstAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>TOTAL</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t border-dashed border-black my-3" />
        <p className="text-center text-sm">Thank you for your order!</p>
        <p className="text-center text-xs">Chai &amp; Biscuit Co. 🍵</p>
      </div>

      {/* Screen content */}
      <div className="no-print">
        <main className="container mx-auto px-4 lg:px-8 py-24 max-w-2xl">
          {/* Success animation */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-green-100 mb-6 relative">
              <div
                className="absolute inset-0 rounded-full border-4 border-green-400 opacity-30"
                style={{ animation: "pulse-ring 1.5s ease-out infinite" }}
              />
              <CheckCircle
                className="h-14 w-14 text-green-500"
                strokeWidth={2}
              />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg">
              Thank you,{" "}
              <strong className="text-foreground">{order.customerName}</strong>!
              Your order is being prepared.
            </p>
          </div>

          {/* Order details card */}
          <div
            data-ocid="order.details.card"
            className="bg-card rounded-2xl border border-border shadow-warm p-6 mb-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
              <div>
                <p className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-1">
                  Order ID
                </p>
                <p className="font-serif text-2xl font-bold text-foreground">
                  #{order.id.toString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-1">
                  Status
                </p>
                <span className="inline-block bg-green-100 text-green-700 font-display font-semibold text-sm px-3 py-1 rounded-full">
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Placed: {formatDate(order.timestamp)}
            </p>

            <Separator className="mb-5" />

            {/* Items */}
            <h3 className="font-display font-semibold text-foreground mb-4">
              Items Ordered
            </h3>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div
                  key={`${item.productId.toString()}-${item.productName}`}
                  data-ocid={`order.item.${i + 1}`}
                  className="flex items-center justify-between text-sm py-2"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {item.productName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      ₹{item.unitPrice.toFixed(2)} × {item.quantity.toString()}
                    </p>
                  </div>
                  <span className="font-medium text-foreground">
                    ₹{(item.unitPrice * Number(item.quantity)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span>₹{order.gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span className="text-foreground">Total</span>
                <span className="font-serif text-xl text-foreground">
                  ₹{order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="flex-1 bg-primary text-primary-foreground font-display font-semibold rounded-xl hover:scale-105 transition-all gap-2"
              data-ocid="order.continue_shopping.primary_button"
            >
              <Link to="/menu">
                <ShoppingBag className="h-5 w-5" />
                Continue Shopping
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 font-display font-semibold border-border rounded-xl hover:bg-muted gap-2"
              onClick={() => window.print()}
              data-ocid="order.print_receipt.secondary_button"
            >
              <Printer className="h-5 w-5" />
              Print Receipt
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
