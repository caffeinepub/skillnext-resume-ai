import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Category, Product } from "../backend.d";
import { useCart } from "../context/CartContext";

const CATEGORY_EMOJI: Record<Category, string> = {
  tea: "🍵",
  coffee: "☕",
  snacks: "🥨",
  biscuits: "🍪",
};

const CATEGORY_LABEL: Record<Category, string> = {
  tea: "Tea",
  coffee: "Coffee",
  snacks: "Snacks",
  biscuits: "Biscuits",
};

// Rich, category-tuned gradient backgrounds for placeholders
const CATEGORY_BG: Record<Category, string> = {
  tea: "linear-gradient(145deg, oklch(0.88 0.06 150) 0%, oklch(0.78 0.08 130) 50%, oklch(0.68 0.09 115) 100%)",
  coffee:
    "linear-gradient(145deg, oklch(0.42 0.07 55) 0%, oklch(0.32 0.08 45) 50%, oklch(0.26 0.06 40) 100%)",
  snacks:
    "linear-gradient(145deg, oklch(0.86 0.10 75) 0%, oklch(0.76 0.12 65) 50%, oklch(0.65 0.11 58) 100%)",
  biscuits:
    "linear-gradient(145deg, oklch(0.90 0.08 80) 0%, oklch(0.78 0.11 70) 50%, oklch(0.68 0.10 62) 100%)",
};

const CATEGORY_EMOJI_COLOR: Record<Category, string> = {
  tea: "oklch(0.95 0.02 150 / 0.9)",
  coffee: "oklch(0.95 0.02 75 / 0.9)",
  snacks: "oklch(0.22 0.06 55 / 0.8)",
  biscuits: "oklch(0.26 0.07 58 / 0.8)",
};

function ProductImagePlaceholder({ category }: { category: Category }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: CATEGORY_BG[category] }}
    >
      {/* Subtle radial highlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(1 0 0 / 0.12) 0%, transparent 70%)",
        }}
      />
      {/* Decorative ring */}
      <div
        className="absolute"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "2px solid oklch(1 0 0 / 0.12)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          border: "1px solid oklch(1 0 0 / 0.08)",
        }}
      />
      {/* Emoji at generous scale */}
      <span
        className="relative z-10 select-none"
        style={{
          fontSize: "3.5rem",
          lineHeight: 1,
          filter: `drop-shadow(0 4px 12px ${CATEGORY_EMOJI_COLOR[category]})`,
        }}
      >
        {CATEGORY_EMOJI[category]}
      </span>
      {/* Category label below emoji */}
      <span
        className="relative z-10 mt-2 font-display font-semibold tracking-widest uppercase text-xs"
        style={{ color: "oklch(1 0 0 / 0.55)", letterSpacing: "0.18em" }}
      >
        {CATEGORY_LABEL[category]}
      </span>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product.inStock) return;
    setIsAdding(true);
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      description: `₹${product.price.toFixed(2)}`,
    });
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <article
      data-ocid={`menu.product.item.${index}`}
      className="group bg-card rounded-2xl overflow-hidden flex flex-col"
      style={{
        boxShadow:
          "0 2px 8px oklch(0.32 0.09 50 / 0.08), 0 1px 2px oklch(0.32 0.09 50 / 0.06)",
        transition:
          "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease",
        border: "1px solid oklch(0.87 0.03 70 / 0.7)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 32px oklch(0.32 0.09 50 / 0.16), 0 4px 10px oklch(0.32 0.09 50 / 0.10)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 8px oklch(0.32 0.09 50 / 0.08), 0 1px 2px oklch(0.32 0.09 50 / 0.06)";
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {product.imageUrl && !imgError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-107"
            style={{
              transition:
                "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <ProductImagePlaceholder category={product.category} />
        )}

        {/* Gradient overlay at bottom for blending into card */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8"
          style={{
            background:
              "linear-gradient(to top, oklch(0.99 0.006 80) 0%, transparent 100%)",
          }}
        />

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center backdrop-blur-[3px]">
            <span
              className="font-display font-bold text-sm px-5 py-2 rounded-full"
              style={{
                background: "oklch(0.52 0.18 27)",
                color: "oklch(0.97 0.01 75)",
                letterSpacing: "0.05em",
              }}
            >
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4 flex flex-col flex-1">
        {/* Category chip — small, inline */}
        <span
          className="font-display font-semibold uppercase tracking-[0.14em] text-[10px] mb-1.5"
          style={{ color: "oklch(0.62 0.08 65)" }}
        >
          {CATEGORY_LABEL[product.category]}
        </span>

        <h3
          className="font-serif font-bold text-foreground text-lg leading-snug mb-1.5"
          style={{ transition: "color 0.2s ease" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color =
              "oklch(0.38 0.085 55)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "";
          }}
        >
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {/* Price — visually dominant */}
          <div className="flex flex-col">
            <span
              className="font-serif font-bold leading-none"
              style={{ fontSize: "1.5rem", color: "oklch(0.28 0.08 50)" }}
            >
              ₹{product.price.toFixed(0)}
            </span>
            {product.price % 1 !== 0 && (
              <span className="text-xs text-muted-foreground font-display">
                .
                {String(Math.round((product.price % 1) * 100)).padStart(2, "0")}
              </span>
            )}
          </div>

          <Button
            size="sm"
            disabled={!product.inStock || isAdding}
            onClick={handleAddToCart}
            data-ocid={`menu.product.add_button.${index}`}
            className="font-display font-semibold gap-1.5 rounded-xl px-4"
            style={
              product.inStock
                ? {
                    background: isAdding
                      ? "oklch(0.55 0.09 130)"
                      : "linear-gradient(135deg, oklch(0.42 0.088 55) 0%, oklch(0.35 0.082 50) 100%)",
                    color: "oklch(0.97 0.012 75)",
                    boxShadow: isAdding
                      ? "none"
                      : "0 3px 10px oklch(0.32 0.09 50 / 0.35)",
                    transform: isAdding ? "scale(0.96)" : "scale(1)",
                    transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }
                : { opacity: 0.45, cursor: "not-allowed" }
            }
          >
            {isAdding ? (
              <>
                <Plus
                  className="h-3.5 w-3.5"
                  style={{ animation: "spin 0.5s linear" }}
                />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
