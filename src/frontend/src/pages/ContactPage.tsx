import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Us — Chai & Biscuit Co.";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you soon.", {
      description: `Thanks, ${name}! ☕`,
    });
    setName("");
    setMessage("");
    setSubmitting(false);
  };

  return (
    <div className="page-enter">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-12 bg-warm-deep text-warm-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 flex items-center justify-end pr-20">
          <span className="text-[18rem] leading-none font-serif select-none">
            📍
          </span>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <p className="font-display text-xs tracking-[0.25em] uppercase text-warm-gold mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-warm-cream">
            We&apos;d Love to Hear From You
          </h1>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
              Visit Us
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground mb-1">
                    Address
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    42, Chai Street, Beverages Lane,
                    <br />
                    Near Marine Lines Station,
                    <br />
                    Mumbai – 400001, Maharashtra
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-muted-foreground hover:text-accent-foreground transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:hello@chaibiscuit.co"
                    className="text-muted-foreground hover:text-accent-foreground transition-colors"
                  >
                    hello@chaibiscuit.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground mb-1">
                    Hours
                  </p>
                  <p className="text-muted-foreground">
                    Mon – Sat: 7:00 AM – 10:00 PM
                    <br />
                    Sunday: 8:00 AM – 9:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-warm border border-border">
              <iframe
                src="https://maps.google.com/maps?q=chai+biscuit+shop+mumbai&output=embed"
                title="Chai & Biscuit Co. Location"
                className="w-full h-64"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-ocid="contact.map_marker"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 shadow-warm border border-border space-y-6"
              data-ocid="contact.form.panel"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="contact-name"
                  className="font-display font-medium"
                >
                  Your Name
                </Label>
                <Input
                  id="contact-name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-ocid="contact.name.input"
                  className="bg-muted/50 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="contact-message"
                  className="font-display font-medium"
                >
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                  data-ocid="contact.message.textarea"
                  className="bg-muted/50 border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                data-ocid="contact.form.submit_button"
                className="w-full bg-primary text-primary-foreground font-display font-semibold py-5 rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.01] gap-2"
              >
                {submitting ? (
                  <>Sending…</>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We typically respond within 24 hours. ☕
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
