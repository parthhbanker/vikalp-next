import { Metadata } from 'next';
import { Map, Home, Info, Users, Heart, FileText, Briefcase } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap | VIKALP',
  description: 'Complete sitemap of VIKALP website - Find all pages and navigate easily.',
};

export default function SitemapPage() {
  const sections = [
    {
      icon: <Home />,
      title: 'Main Pages',
      links: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact Us' },
      ],
    },
    {
      icon: <Briefcase />,
      title: 'Our Work',
      links: [
        { href: '/programs', label: 'Programs' },
        { href: '/publications', label: 'Publications' },
        { href: '/gallery', label: 'Gallery' },
      ],
    },
    {
      icon: <Users />,
      title: 'People',
      links: [
        { href: '/team', label: 'Our Team' },
        { href: '/careers', label: 'Careers' },
        { href: '/volunteer', label: 'Volunteer' },
      ],
    },
    {
      icon: <Heart />,
      title: 'Get Involved',
      links: [
        { href: '/donate', label: 'Donate' },
        { href: '/partner', label: 'Partner With Us' },
        { href: '/corporate-giving', label: 'Corporate Giving' },
      ],
    },
    {
      icon: <FileText />,
      title: 'Legal & Documents',
      links: [
        { href: '/legal', label: 'Legal Documents' },
        { href: '/privacy-policy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms and Conditions' },
      ],
    },
    {
      icon: <Info />,
      title: 'Resources',
      links: [
        { href: '/sitemap', label: 'Sitemap' },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/10 rounded-full mb-6">
            <Map className="w-8 h-8 text-brand" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Sitemap</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Navigate through all pages of our website. Find what you're looking for quickly and easily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-brand transition-colors flex items-center gap-2 py-1"
                    >
                      <span className="w-1.5 h-1.5 bg-brand rounded-full" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-brand/5 rounded-xl p-8 text-center border border-brand/20">
          <h3 className="text-xl font-bold text-foreground mb-2">Can't find what you're looking for?</h3>
          <p className="text-muted mb-4">Feel free to reach out to us directly.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
