import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const navLinks = [
  { to: "/", label: "Home", ocid: "nav.home.link" },
  { to: "/menu", label: "Menu", ocid: "nav.menu.link" },
  { to: "/about", label: "About", ocid: "nav.about.link" },
  { to: "/contact", label: "Contact", ocid: "nav.contact.link" },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-warm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.home.link"
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl animate-float">🍵</span>
            <div className="leading-tight">
              <span className="font-serif text-lg md:text-xl font-bold text-foreground group-hover:text-accent-foreground transition-colors">
                Chai &amp; Biscuit
              </span>
              <span className="block font-display text-xs text-muted-foreground tracking-widest uppercase">
                Co.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                className={`font-display font-medium text-sm tracking-wide transition-colors hover:text-accent-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent-foreground after:transition-all after:duration-300 ${
                  currentPath === link.to
                    ? "text-foreground after:w-full"
                    : "text-muted-foreground after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/cart" data-ocid="nav.cart.link" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent/50"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {totalItems > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground rounded-full"
                    data-ocid="nav.cart.toggle"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-accent/50"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.mobile_menu.toggle"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card/98 backdrop-blur-md border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={link.ocid}
                className={`font-display font-medium text-base py-3 px-4 rounded-lg transition-colors ${
                  currentPath === link.to
                    ? "bg-accent/30 text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              data-ocid="nav.cart.link"
              className="font-display font-medium text-base py-3 px-4 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <Badge className="bg-primary text-primary-foreground text-xs ml-1">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
