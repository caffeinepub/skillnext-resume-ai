import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-warm-deep text-warm-cream">
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍵</span>
              <div>
                <p className="font-serif text-xl font-bold text-warm-cream">
                  Chai &amp; Biscuit Co.
                </p>
                <p className="text-xs text-warm-gold tracking-widest uppercase">
                  Est. 2018
                </p>
              </div>
            </div>
            <p className="text-sm text-warm-cream/70 leading-relaxed">
              Crafting the perfect cup of chai and pairing it with the finest
              biscuits, snacks &amp; confections since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-warm-gold mb-4 tracking-wide uppercase text-xs">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/menu", label: "Our Menu" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/cart", label: "Cart" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to as "/"}
                    className="text-sm text-warm-cream/70 hover:text-warm-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display font-semibold text-warm-gold mb-4 tracking-wide uppercase text-xs">
              Opening Hours
            </h3>
            <ul className="space-y-2 text-sm text-warm-cream/70">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-warm-gold shrink-0" />
                <div>
                  <p>Mon – Sat</p>
                  <p className="font-medium text-warm-cream">
                    7:00 AM – 10:00 PM
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-warm-gold shrink-0" />
                <div>
                  <p>Sunday</p>
                  <p className="font-medium text-warm-cream">
                    8:00 AM – 9:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-warm-gold mb-4 tracking-wide uppercase text-xs">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-warm-cream/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-warm-gold shrink-0" />
                <span>42, Chai Street, Beverages Lane, Mumbai – 400001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-warm-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-warm-gold shrink-0" />
                <span>hello@chaibiscuit.co</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-cream/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-warm-cream/50">
            © {year} Chai &amp; Biscuit Co. All rights reserved.
          </p>
          <p className="text-xs text-warm-cream/50">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
