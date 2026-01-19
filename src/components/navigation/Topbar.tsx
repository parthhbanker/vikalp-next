'use client';

import { memo, useCallback } from 'react';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';

/**
 * Topbar Component
 *
 * Displays contact information and social media links
 * Responsive design with accessibility features
 */
function TopbarComponent() {
  const contactInfo = {
    phone: '+91 98243 85725',
    email: 'info@vikalp.org',
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/vikalp', ariaLabel: 'Visit our Facebook page' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/vikalp', ariaLabel: 'Visit our Twitter profile' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/vikalp', ariaLabel: 'Visit our Instagram page' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/vikalp', ariaLabel: 'Visit our LinkedIn page' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@vikalp', ariaLabel: 'Visit our YouTube channel' },
  ];

  const handleSocialClick = useCallback((name: string, url: string) => {
    trackButtonClick(`topbar_social_${name.toLowerCase()}`, { url });
  }, []);

  const handleContactClick = useCallback((type: 'phone' | 'email', value: string) => {
    trackButtonClick(`topbar_contact_${type}`, { value });
  }, []);

  return (
    <div className="bg-gradient-to-r from-brand to-brand/90 text-white border-b border-brand-dark/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-2.5">
          {/* Contact Information */}
          <div className="flex items-center gap-3 sm:gap-6 text-sm">
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 sm:gap-2 hover:text-white/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand rounded-sm px-1"
              aria-label={`Call us at ${contactInfo.phone}`}
              onClick={() => handleContactClick('phone', contactInfo.phone)}
            >
              <Phone size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="hidden sm:inline text-xs sm:text-sm">{contactInfo.phone}</span>
            </a>

            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-1.5 sm:gap-2 hover:text-white/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand rounded-sm px-1"
              aria-label={`Email us at ${contactInfo.email}`}
              onClick={() => handleContactClick('email', contactInfo.email)}
            >
              <Mail size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
              <span className="hidden sm:inline text-xs sm:text-sm">{contactInfo.email}</span>
            </a>
          </div>

          {/* Social Links */}
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-1.5 sm:gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
                      aria-label={social.ariaLabel}
                      onClick={() => handleSocialClick(social.name, social.url)}
                    >
                      <Icon size={15} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export const Topbar = memo(TopbarComponent);
