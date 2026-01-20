'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, Heart, Send } from 'lucide-react';
import { trackButtonClick, trackFormSubmit } from '@/lib/analytics';
import { Button, Input } from '@/components/ui';

function FooterComponent() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    trackFormSubmit('newsletter_footer', { email_provided: true });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }, 1500);
  };
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Publications', href: '/publications' },
    { name: 'Legal Documents', href: '/legal' },
    { name: 'Contact', href: '/contact' },
  ];

  const ourWork = [
    { name: 'Climate Action', href: '/programs#climate-action' },
    { name: 'Sustainable Agriculture', href: '/programs#sustainable-agriculture' },
    { name: 'Community Empowerment', href: '/programs#community-empowerment' },
    { name: 'Environmental Education', href: '/programs#environmental-education' },
  ];

  const support = [
    { name: 'Donate Now', href: '/donate' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Partner With Us', href: '/partner' },
    { name: 'Corporate Giving', href: '/corporate-giving' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Side - Heading */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Stay Connected with Nature</h3>
              <p className="text-gray-300">Get updates on our environmental initiatives</p>
            </div>

            {/* Newsletter */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <h3 className="text-lg font-bold mb-1">Subscribe to Newsletter</h3>
              <p className="text-gray-300 text-sm mb-3">Receive impact stories and updates directly to your inbox.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand hover:bg-brand-dark text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Subscribe
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-3 mb-6">
              <Logo size="xl" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold group-hover:text-brand transition-colors duration-200">VIKALP</span>
                <span className="text-sm text-gray-400 group-hover:text-brand transition-colors duration-200">Since 2002</span>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
              Creating sustainable futures through climate action, agroforestry, and community empowerment since 2002.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-brand" />
                <span>C-206 PNTC, TOI Press Road, Vejalpur, Ahmedabad, Gujarat 380015</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={18} className="flex-shrink-0 text-brand" />
                <a href="tel:+919824385725" className="text-gray-300 hover:text-brand transition-colors duration-200">
                  +91 98243 85725
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={18} className="flex-shrink-0 text-brand" />
                <a href="mailto:info@vikalp.org" className="text-gray-300 hover:text-brand transition-colors duration-200">
                  info@vikalp.org
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    onClick={() => trackButtonClick(`footer_social_${social.name.toLowerCase()}`)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => trackButtonClick(`footer_link_${link.name.toLowerCase().replace(/\s+/g, '_')}`)}
                    className="text-sm text-gray-300 hover:text-brand transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Work */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Work</h3>
            <ul className="space-y-2.5">
              {ourWork.map((work) => (
                <li key={work.name}>
                  <span className="text-sm text-gray-300 cursor-default">
                    {work.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Our Work */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support Our Work</h3>
            <ul className="space-y-2.5">
              {support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => trackButtonClick(`footer_support_${item.name.toLowerCase().replace(/\s+/g, '_')}`)}
                    className="text-sm text-gray-300 hover:text-brand transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-brand transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} VIKALP. All rights reserved. | Reg. No. E/15763/Ahmedabad
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/privacy"
                onClick={() => trackButtonClick('footer_privacy')}
                className="text-gray-400 hover:text-brand transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => trackButtonClick('footer_terms')}
                className="text-gray-400 hover:text-brand transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                onClick={() => trackButtonClick('footer_sitemap')}
                className="text-gray-400 hover:text-brand transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
