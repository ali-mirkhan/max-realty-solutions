import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Max Realty Solutions. We help buyers, sellers, investors, and agents across the Greater Toronto Area.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-white border-b border-stone-border">
        <div className="container py-12 lg:py-16">
          <p className="section-label">Get in Touch</p>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-charcoal mb-2">Contact Us</h1>
          <p className="text-charcoal/60 max-w-xl">
            Whether you&apos;re looking to buy, sell, invest, or join our brokerage — we&apos;d love to
            hear from you.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            <ContactForm />

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-stone-light rounded-lg p-6">
                <h3 className="font-serif text-lg font-semibold text-charcoal mb-4">Contact Information</h3>
                <ul className="space-y-4">
                  {[
                    { Icon: Phone, label: "Phone", content: <a href="tel:+19055551234" className="text-sm text-charcoal hover:text-burgundy transition-colors">(905) 555-1234</a> },
                    { Icon: Mail, label: "Email", content: <a href="mailto:info@maxrealtysolutions.ca" className="text-sm text-charcoal hover:text-burgundy transition-colors">info@maxrealtysolutions.ca</a> },
                    { Icon: MapPin, label: "Office", content: <p className="text-sm text-charcoal">Thornhill, Ontario<br />Vaughan, ON L4J 0A1</p> },
                    { Icon: Clock, label: "Hours", content: <p className="text-sm text-charcoal">Mon–Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 4:00 PM<br />Sun: By appointment</p> },
                  ].map(({ Icon, label, content }) => (
                    <li key={label} className="flex gap-3">
                      <Icon size={18} className="text-burgundy shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-0.5">{label}</p>
                        {content}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden border border-stone-border">
                <iframe
                  title="Office Location — Thornhill, Vaughan"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46061.33005592!2d-79.45!3d43.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2a4936291733%3A0x5201760ad6b142ed!2sThornhill%2C%20Vaughan%2C%20ON!5e0!3m2!1sen!2sca!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
