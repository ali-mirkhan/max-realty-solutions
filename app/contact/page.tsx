import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Max Realty Solutions Ltd., Brokerage. Located at 8220 Bayview Avenue, Unit 200, Thornhill, ON. Call 416-226-6008.",
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
                  <li className="flex gap-3">
                    <Phone size={18} className="text-burgundy shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-0.5">Phone</p>
                      <a href="tel:+14162266008" className="text-sm text-charcoal hover:text-burgundy transition-colors">
                        416-226-6008
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone size={18} className="text-burgundy shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-0.5">Fax</p>
                      <span className="text-sm text-charcoal">647-499-5895</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mail size={18} className="text-burgundy shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-0.5">Email</p>
                      <a href="mailto:info@maxrealtysolutions.com" className="text-sm text-charcoal hover:text-burgundy transition-colors">
                        info@maxrealtysolutions.com
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin size={18} className="text-burgundy shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-0.5">Office</p>
                      <p className="text-sm text-charcoal">
                        8220 Bayview Avenue, Unit 200<br />
                        Thornhill, ON L3T 2S2
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Clock size={18} className="text-burgundy shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-0.5">Office Hours</p>
                      <p className="text-sm text-charcoal">
                        Mon–Fri: 9:00 AM – 6:00 PM<br />
                        Sat: 10:00 AM – 4:00 PM<br />
                        Sun: By appointment
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map — 8220 Bayview Ave, Thornhill */}
              <div className="rounded-lg overflow-hidden border border-stone-border">
                <iframe
                  title="Max Realty Solutions — 8220 Bayview Ave, Thornhill"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.5!2d-79.4282!3d43.8165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2b8c9e1f1f1f%3A0x1234567890abcdef!2s8220+Bayview+Ave%2C+Thornhill%2C+ON+L3T+2S2!5e0!3m2!1sen!2sca!4v1"
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
