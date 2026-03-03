import { Award, Heart, Users } from "lucide-react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const VALUES = [
  {
    icon: <Heart className="h-7 w-7" />,
    title: "Made with Love",
    desc: "Every blend, every biscuit, every cup is crafted with genuine care and passion for quality.",
  },
  {
    icon: <Award className="h-7 w-7" />,
    title: "Uncompromising Quality",
    desc: "We source only the finest ingredients — from Darjeeling first flush teas to Belgian chocolate biscuits.",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Community First",
    desc: "We're not just a shop; we're a gathering place for neighbours, friends, and strangers becoming friends.",
  },
];

const GALLERY = [
  {
    src: "/assets/generated/about-shop.dim_800x500.jpg",
    alt: "Our shop interior",
    label: "The Shop",
  },
  {
    src: "/assets/generated/tea-collection.dim_600x400.jpg",
    alt: "Tea collection",
    label: "Tea Selection",
  },
  {
    src: "/assets/generated/biscuits-assorted.dim_600x400.jpg",
    alt: "Biscuit selection",
    label: "Freshly Baked",
  },
  {
    src: "/assets/generated/masala-chai.dim_600x400.jpg",
    alt: "Masala chai",
    label: "Masala Chai",
  },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us — Chai & Biscuit Co.";
  }, []);

  return (
    <div className="page-enter">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-20 min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/about-shop.dim_800x500.jpg"
            alt="Chai & Biscuit Co. shop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-deep via-warm-deep/70 to-warm-deep/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-16 pt-32">
          <p className="font-display text-xs tracking-[0.25em] uppercase text-warm-gold mb-3">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-warm-cream max-w-2xl leading-tight">
            Where Chai Becomes Community
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block font-display text-xs tracking-[0.25em] uppercase text-accent-foreground bg-accent/30 px-4 py-1.5 rounded-full mb-6">
                The Beginning
              </span>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6 leading-snug">
                From a Small Kettle to a Beloved Institution
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It began in 2018 with a single stainless steel kettle, a tin
                  of Darjeeling tea, and Priya Sharma&apos;s grandmother&apos;s
                  secret spice blend. What started as a humble cart outside
                  Marine Lines station has grown into one of Mumbai&apos;s most
                  beloved chai destinations.
                </p>
                <p>
                  We believe that a good cup of chai is more than a beverage —
                  it&apos;s a pause in the day, a warm greeting, an invitation
                  to slow down. That philosophy is baked into everything we do,
                  from our sourcing practices to the way we train our staff.
                </p>
                <p>
                  Today, Chai &amp; Biscuit Co. serves over 500 cups daily and
                  has become the Sunday morning ritual for thousands of
                  Mumbaikars who have made our little shop part of their story.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "6+", label: "Years of Service" },
                { number: "500+", label: "Cups Daily" },
                { number: "40+", label: "Varieties on Menu" },
                { number: "12K+", label: "Happy Customers" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-secondary rounded-2xl p-8 text-center hover:shadow-warm transition-shadow"
                >
                  <div className="font-serif text-4xl font-bold text-accent-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="font-display text-sm text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Owner */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-foreground">
              Meet the Founder
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-3xl overflow-hidden shadow-warm-lg flex flex-col md:flex-row">
              {/* Photo placeholder */}
              <div className="md:w-64 h-64 md:h-auto bg-gradient-to-br from-accent/40 to-secondary flex-shrink-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-warm-deep/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-5xl">👩‍🍳</span>
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1">
                <p className="font-display text-xs tracking-widest uppercase text-accent-foreground mb-2">
                  Founder &amp; Head Blender
                </p>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                  Priya Sharma
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  A third-generation tea enthusiast from Assam, Priya trained
                  under master blenders in Kolkata before bringing her craft to
                  Mumbai. Her masala chai recipe — unchanged since her
                  grandmother&apos;s kitchen — is the heartbeat of the shop.
                </p>
                <div className="flex items-center gap-2 text-sm text-accent-foreground font-display">
                  <span>🌿</span>
                  <span>Certified Tea Sommelier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-warm-deep text-warm-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block font-display text-xs tracking-[0.25em] uppercase text-warm-gold bg-warm-gold/10 px-4 py-1.5 rounded-full mb-4">
              What We Stand For
            </span>
            <h2 className="font-serif text-4xl font-bold">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="text-center p-8 rounded-2xl bg-warm-cream/5 hover:bg-warm-cream/10 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-warm-gold/20 text-warm-gold mb-5">
                  {val.icon}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-warm-cream">
                  {val.title}
                </h3>
                <p className="text-warm-cream/60 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-3">
              Moments &amp; Memories
            </h2>
            <p className="text-muted-foreground">
              A peek inside the Chai &amp; Biscuit Co. experience
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((img) => (
              <div
                key={img.alt}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-warm-deep/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="font-display font-semibold text-warm-cream text-sm">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
