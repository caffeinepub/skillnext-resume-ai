import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Category } from "../backend.d";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/ProductSkeleton";
import { useProducts } from "../hooks/useQueries";

type FilterCategory = "all" | Category;

const CATEGORIES: { value: FilterCategory; label: string; emoji: string }[] = [
  { value: "all", label: "All", emoji: "✨" },
  { value: Category.tea, label: "Tea", emoji: "🍵" },
  { value: Category.coffee, label: "Coffee", emoji: "☕" },
  { value: Category.snacks, label: "Snacks", emoji: "🥨" },
  { value: Category.biscuits, label: "Biscuits", emoji: "🍪" },
];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const { data: products, isLoading, isError } = useProducts();

  useEffect(() => {
    document.title = "Menu — Chai & Biscuit Co.";
  }, []);

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <div className="page-enter">
      <Navigation />

      {/* Page Header */}
      <section className="pt-28 pb-12 bg-warm-deep text-warm-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 flex items-center justify-end pr-20">
          <span className="text-[20rem] leading-none font-serif select-none">
            🍵
          </span>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <p className="font-display text-xs tracking-[0.25em] uppercase text-warm-gold mb-3">
            Our Menu
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-warm-cream mb-4">
            Crafted with Care
          </h1>
          <p className="text-warm-cream/60 text-lg max-w-xl">
            From single-origin teas to fresh-baked biscuits — explore our full
            range of flavours.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-card/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-muted border-border font-sans"
                data-ocid="menu.search.search_input"
              />
            </div>

            {/* Category Tabs */}
            <Tabs
              value={activeCategory}
              onValueChange={(v) => setActiveCategory(v as FilterCategory)}
              className="flex-shrink-0"
            >
              <TabsList className="bg-muted h-auto p-1 gap-0.5 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <TabsTrigger
                    key={cat.value}
                    value={cat.value}
                    data-ocid="menu.category.tab"
                    className="font-display text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-3 py-1.5 gap-1"
                  >
                    <span>{cat.emoji}</span>
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Products */}
      <main className="container mx-auto px-4 lg:px-8 py-12 min-h-[50vh]">
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : isError ? (
          <div
            data-ocid="menu.products.error_state"
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-muted-foreground font-display">
              Failed to load products. Please try again.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="menu.products.empty_state"
            className="text-center py-24 flex flex-col items-center gap-4"
          >
            <div className="text-7xl">🔍</div>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              No products found
            </h3>
            <p className="text-muted-foreground max-w-xs">
              Try a different search term or category filter.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground font-display">
                Showing{" "}
                <span className="text-foreground font-semibold">
                  {filtered.length}
                </span>{" "}
                product{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i + 1}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
