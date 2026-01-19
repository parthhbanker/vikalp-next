'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui';
import { Logo } from './Logo';
import { trackButtonClick } from '@/lib/analytics';

/**
 * Navigation Menu Items
 */
export const menuItems = [
  { name: 'About Us', href: '/about', hasDropdown: false },
  { name: 'Programs', href: '/programs', hasDropdown: false },
  { name: 'Publications', href: '/publications', hasDropdown: false },
  { name: 'Our Team', href: '/team', hasDropdown: false },
  { name: 'Gallery', href: '/gallery', hasDropdown: false },
  { name: 'Contact', href: '/contact', hasDropdown: false },
];

/**
 * Navbar Component
 *
 * Main navigation bar with logo, menu items, and CTA
 * Fully responsive with mobile menu support
 * Includes accessibility features and SEO optimizations
 */
function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMenuClick = useCallback((itemName: string) => {
    trackButtonClick(`navbar_menu_${itemName.toLowerCase().replace(/\s/g, '_')}`);
  }, []);

  const handleDonateClick = useCallback(() => {
    trackButtonClick('navbar_donate_cta');
  }, []);

  const handleLogoClick = useCallback(() => {
    trackButtonClick('navbar_logo');
  }, []);

  const isActiveLink = useCallback((href: string) => {
    return pathname === href;
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${isScrolled ? 'shadow-md' : 'border-b border-border'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-lg p-1"
              onClick={handleLogoClick}
              aria-label="Vikalp - Home"
            >
              <Logo size="lg" className="lg:hidden" />
              <Logo size="xl" className="hidden lg:block" />
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-brand transition-colors duration-200">VIKALP</span>
                <span className="text-xs text-muted group-hover:text-brand transition-colors duration-200">Since 2002</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:gap-1 xl:gap-2">
            <ul className="flex items-center gap-1 xl:gap-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => handleMenuClick(item.name)}
                    className={`
                      relative flex items-center gap-1 px-3 xl:px-4 py-2 text-base font-medium
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-sm
                      after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5
                      after:transition-all after:duration-200
                      ${isActiveLink(item.href)
                        ? 'text-brand after:bg-brand after:scale-x-100'
                        : 'text-foreground hover:text-brand after:bg-brand after:scale-x-0 hover:after:scale-x-100'
                      }
                    `}
                    aria-current={isActiveLink(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown size={16} className="ml-1" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Donate Button */}
          <div className="hidden lg:flex lg:items-center">
            <Link href="/donate" onClick={handleDonateClick}>
              <Button variant="primary" size="md" trackingName="navbar_donate_button">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 transition-colors duration-200"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              trackButtonClick('navbar_mobile_menu_toggle', { action: !isMobileMenuOpen ? 'open' : 'close' });
            }}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden fixed inset-0 top-16 bg-white z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 py-6 space-y-1">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => handleMenuClick(item.name)}
                      className={`
                        flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium
                        transition-all duration-200
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
                        ${isActiveLink(item.href)
                          ? 'text-brand bg-brand/5 border-l-4 border-brand'
                          : 'text-foreground hover:bg-surface-secondary'
                        }
                      `}
                      aria-current={isActiveLink(item.href) ? 'page' : undefined}
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown size={18} aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Donate Button */}
              <div className="pt-4 mt-4 border-t border-border">
                <Link href="/donate" onClick={handleDonateClick} className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    trackingName="navbar_donate_button_mobile"
                  >
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export const Navbar = memo(NavbarComponent);
