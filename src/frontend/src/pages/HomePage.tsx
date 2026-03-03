import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Star, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/ProductSkeleton";
import { useProducts } from "../hooks/useQueries";

function SteamAnimation() {
  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 flex items-end pointer-events-none pb-1"
      style={{ gap: "10px" }}
    >
      {/* Left wisp — tall, tapered */}
      <div
        className="steam-wisp steam-wisp-1 rounded-full"
        style={{
          width: "10px",
          height: "72px",
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, oklch(0.92 0.06 75 / 0.9) 0%, oklch(0.92 0.06 75 / 0.4) 50%, transparent 100%)",
          filter: "blur(4px)",
        }}
      />
      {/* Centre wisp — widest, tallest */}
      <div
        className="steam-wisp steam-wisp-2 rounded-full"
        style={{
          width: "14px",
          height: "88px",
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, oklch(0.95 0.04 78 / 0.95) 0%, oklch(0.90 0.06 74 / 0.45) 55%, transparent 100%)",
          filter: "blur(5px)",
        }}
      />
      {/* Right wisp — shorter, narrower */}
      <div
        className="steam-wisp steam-wisp-3 rounded-full"
        style={{
          width: "8px",
          height: "58px",
          background:
            "radial-gradient(ellipse 65% 100% at 50% 100%, oklch(0.90 0.07 72 / 0.85) 0%, oklch(0.88 0.05 70 / 0.35) 55%, transparent 100%)",
          filter: "blur(3.5px)",
        }}
      />
    </div>
  );
}

const FEATURES = [
  {
    icon: <Leaf className="h-7 w-7" />,
    title: "Fresh Daily",
    desc: "Every blend is freshly sourced and prepared each morning for the finest flavour.",
  },
  {
    icon: <Star className="h-7 w-7" />,
    title: "Premium Quality",
    desc: "Only the highest grade teas, artisanal coffee beans, and hand-selected biscuits.",
  },
  {
    icon: <Zap className="h-7 w-7" />,
    title: "Fast Service",
    desc: "Order in seconds, pay online, and enjoy your order with minimal wait time.",
  },
];

export default function HomePage() {
  const { data: products, isLoading } = useProducts();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Chai & Biscuit Co. — Premium Teas, Coffees & Snacks";
  }, []);

  const featuredProducts = products?.slice(0, 6) ?? [];

  return (
    <div className="page-enter">
      <Navigation />

      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        ref={heroRef}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-chai-banner.dim_1600x900.jpg"
            alt="Chai & Biscuit Co."
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-deep/80 via-warm-deep/60 to-warm-deep/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Steam cup illustration */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <SteamAnimation />
              <div
                className="text-8xl md:text-9xl animate-float select-none"
                style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))" }}
              >
                🍵
              </div>
            </div>
          </div>

          <p
            className="font-display tracking-[0.3em] text-warm-gold text-sm md:text-base uppercase mb-4 animate-fade-in-up"
            style={{
              animationDelay: "0.1s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Est. 2018 · Mumbai
          </p>

          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-warm-cream leading-tight mb-6 animate-fade-in-up"
            style={{
              animationDelay: "0.2s",
              opacity: 0,
              animationFillMode: "forwards",
              textShadow: "0 2px 24px oklch(0.12 0.05 45 / 0.6)",
            }}
          >
            Where Every Sip
            <br />
            <span
              className="italic hero-gold-text"
              style={{
                filter: "drop-shadow(0 0 20px oklch(0.72 0.15 65 / 0.5))",
              }}
            >
              Tells a Story
            </span>
          </h1>

          <p
            className="text-warm-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{
              animationDelay: "0.35s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Handcrafted teas, specialty coffees, artisan biscuits &amp; savory
            snacks — all under one warm roof. Come for the chai, stay for the
            stories.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{
              animationDelay: "0.5s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            {/* Primary — dominant gold, larger, with glow shadow */}
            <Button
              asChild
              size="lg"
              className="font-display font-bold text-base px-10 py-6 rounded-full hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.82 0.16 68) 0%, oklch(0.72 0.17 60) 100%)",
                color: "oklch(0.18 0.06 45)",
                boxShadow:
                  "0 6px 32px oklch(0.72 0.15 65 / 0.5), 0 2px 8px oklch(0.18 0.05 45 / 0.3)",
              }}
              data-ocid="home.menu.primary_button"
            >
              <Link to="/menu">
                View Menu <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {/* Secondary — glassmorphism treatment */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-display font-bold text-base px-10 py-6 rounded-full hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
              style={{
                background: "oklch(0.97 0.015 78 / 0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1.5px solid oklch(0.95 0.02 78 / 0.55)",
                color: "oklch(0.97 0.018 80)",
                boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.15)",
              }}
              data-ocid="home.order.secondary_button"
            >
              <Link to="/cart">Order Now</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-cream/50 animate-bounce">
          <span className="text-xs font-display tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-warm-cream/30" />
        </div>
      </section>

      {/* ── Welcome Section ── */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-20 text-9xl rotate-12 select-none">
            ☕
          </div>
          <div className="absolute bottom-10 left-20 text-9xl -rotate-12 select-none">
            🍪
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="inline-block font-display text-xs tracking-[0.25em] uppercase text-accent-foreground bg-accent/30 px-4 py-1.5 rounded-full mb-6">
            Welcome
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            A Cup of Warmth, <br />
            <span className="italic text-accent-foreground">
              A Moment of Peace
            </span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-accent-foreground/30" />
            <span className="text-2xl">🌿</span>
            <div className="h-px w-16 bg-accent-foreground/30" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Nestled in the heart of Mumbai, Chai &amp; Biscuit Co. is your daily
            ritual destination. We source single-origin teas from Darjeeling and
            Assam, roast specialty coffee in small batches, and bake our
            biscuits fresh every morning — because you deserve only the best.
          </p>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block font-display text-xs tracking-[0.25em] uppercase text-accent-foreground bg-accent/30 px-4 py-1.5 rounded-full mb-4">
              Our Favourites
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Picks
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Curated selections that our regulars can&apos;t get enough of.
            </p>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={6} />
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i + 1}
                />
              ))}
            </div>
          ) : (
            <div
              data-ocid="home.products.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <div className="text-6xl mb-4">🍵</div>
              <p className="text-lg font-display">
                Menu loading…check back soon!
              </p>
            </div>
          )}

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-display font-semibold border-2 border-primary/40 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-full px-8"
              data-ocid="home.view_all.secondary_button"
            >
              <Link to="/menu">
                See Full Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-warm-deep text-warm-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block font-display text-xs tracking-[0.25em] uppercase text-warm-gold bg-warm-gold/10 px-4 py-1.5 rounded-full mb-4">
              Why Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              The Chai &amp; Biscuit Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="text-center p-8 rounded-2xl bg-warm-cream/5 hover:bg-warm-cream/10 transition-colors group cursor-default"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-warm-gold/20 text-warm-gold mb-5 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-warm-cream">
                  {feat.title}
                </h3>
                <p className="text-warm-cream/60 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Strip ── */}
      <section className="py-20 bg-secondary overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-3">
              Taste the Experience
            </h2>
            <p className="text-muted-foreground">
              A glimpse into our world of flavours
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                src: "/assets/generated/masala-chai.dim_600x400.jpg",
                alt: "Masala Chai",
                label: "Masala Chai",
              },
              {
                src: "/assets/generated/cappuccino.dim_600x400.jpg",
                alt: "Cappuccino",
                label: "Cappuccino",
              },
              {
                src: "/assets/generated/snacks-platter.dim_600x400.jpg",
                alt: "Snacks",
                label: "Evening Snacks",
              },
              {
                src: "/assets/generated/biscuits-assorted.dim_600x400.jpg",
                alt: "Biscuits",
                label: "Artisan Biscuits",
              },
            ].map((item) => (
              <div
                key={item.alt}
                className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-warm-deep/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="font-display font-semibold text-warm-cream text-sm">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 text-center text-[20rem] leading-none font-serif text-accent-foreground select-none overflow-hidden">
          ☕
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent-foreground mb-5">
            Ready to Sip Something Special?
          </h2>
          <p className="text-accent-foreground/70 text-lg mb-8 max-w-lg mx-auto">
            Browse our full menu and add your favourites to your order. Fresh,
            warm, and ready when you are.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-warm-deep text-warm-cream font-display font-bold px-10 py-6 rounded-full hover:scale-105 transition-all shadow-warm-lg"
            data-ocid="home.cta.primary_button"
          >
            <Link to="/menu">
              Order Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
