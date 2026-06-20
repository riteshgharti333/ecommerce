import { Link } from "react-router-dom";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  //   Facebook,
  //   Instagram,
  //   Twitter,
  //   Youtube,
  ArrowRight,
  Shield,
  Truck,
  Leaf,
  Heart,
} from "lucide-react";
import { paymentLists } from "../assets/data/paymentIcon";

const Footer = () => {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      {/* Newsletter Section */}
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Get 10% off your first order and be the first to know about new
                products and exclusive offers.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1 max-w-md">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3.5 bg-[var(--background)] border border-[var(--border)] rounded-full text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                />
              </div>
              <button className="px-6 py-3.5 bg-[var(--primary)] text-white text-sm font-medium rounded-full hover:bg-[var(--primary-hover)] transition-all flex items-center gap-2 shadow-lg">
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-wide text-[var(--text)]">
                  NURA
                </h2>
                <p className="text-[8px] tracking-[0.2em] text-[var(--accent)] uppercase">
                  Skin Care
                </p>
              </div>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Premium skincare crafted with natural ingredients for your daily
              glow.
            </p>
            {/* <div className="flex gap-2">
              {[
                { icon: <Facebook size={18} />, href: '#' },
                { icon: <Instagram size={18} />, href: '#' },
                { icon: <Twitter size={18} />, href: '#' },
                { icon: <Youtube size={18} />, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {[
                "All Products",
                "Best Sellers",
                "New Arrivals",
                "Collections",
                "Gift Sets",
                "Sale",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider mb-4">
              Help
            </h3>
            <ul className="space-y-2.5">
              {[
                "Contact Us",
                "FAQs",
                "Shipping & Returns",
                "Track Order",
                "Size Guide",
                "Store Locator",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(" & ", "-").replace(" ", "-")}`}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2.5">
              {[
                "Our Story",
                "Ingredients",
                "Sustainability",
                "Blog",
                "Press",
                "Careers",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="text-sm font-semibold text-[var(--text)] uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@nuraskin.com"
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  <Mail size={14} />
                  hello@nuraskin.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  <Phone size={14} />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  123 Beauty Lane, Suite 100
                  <br />
                  Los Angeles, CA 90001
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid  grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Truck size={20} />, text: "Free Shipping $50+" },
              { icon: <Shield size={20} />, text: "Secure Payment" },
              { icon: <Leaf size={20} />, text: "Natural Ingredients" },
              { icon: <Heart size={20} />, text: "Cruelty Free" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
              >
                <span className="text-[var(--primary)]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className=" pb-15 lg:pb-0 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} Nura Skin. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              {paymentLists.map((icon, index) => (
                <div
                  key={index}
                  className="w-10 h-6 rounded flex items-center justify-center"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
