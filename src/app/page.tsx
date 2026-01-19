import type { Metadata } from 'next';
import {
  HeroSection,
  AboutSection,
  SDGSection,
  ProgramsSection,
  FocusAreasSection,
  AccreditationsSection,
  GetInTouchSection,
} from '@/components/home';

export const metadata: Metadata = {
  title: 'Vikalp - Sustainable Development for Indigenous Communities in Gujarat',
  description:
    'VIKALP works with indigenous and deprived communities in Gujarat on Climate Change, SDGs, Agroforestry, Women Empowerment & Sustainable Livelihoods. UN ECOSOC accredited since 2002.',
  keywords: [
    'VIKALP',
    'Gujarat NGO',
    'sustainable development',
    'climate change',
    'SDGs',
    'agroforestry',
    'women empowerment',
    'indigenous communities',
    'UNFCCC',
    'UN ECOSOC',
    'biodiversity',
    'natural resource management',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'VIKALP - Sustainable Development for Indigenous Communities',
    description:
      'Empowering indigenous communities through climate action, agroforestry, and women empowerment since 2002.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIKALP - Sustainable Development for Indigenous Communities',
  },
  alternates: {
    canonical: 'https://vikalp.org',
  },
};

export default function Home() {
  // Structured data for SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'VIKALP',
    alternateName: 'Vikalp - An Alternative',
    url: 'https://vikalp.org',
    logo: 'https://vikalp.org/logo.png',
    description:
      'VIKALP is a voluntary organization working with Indigenous and Deprived Communities on Sustainable Development Goals, Climate Change, Agroforestry & Biodiversity, Natural Resource Management, Women Empowerment and Sustainable Livelihood.',
    foundingDate: '2002',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380015',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'State',
      name: 'Gujarat, India',
    },
    sameAs: [
      // Add your social media URLs here
      // 'https://facebook.com/vikalp',
      // 'https://twitter.com/vikalp',
      // 'https://linkedin.com/company/vikalp',
    ],
    knowsAbout: [
      'Climate Change',
      'Sustainable Development Goals',
      'Agroforestry',
      'Biodiversity Conservation',
      'Women Empowerment',
      'Natural Resource Management',
      'Sustainable Agriculture',
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'United Nations Economic and Social Council',
        alternateName: 'UN ECOSOC',
      },
      {
        '@type': 'Organization',
        name: 'United Nations Framework Convention on Climate Change',
        alternateName: 'UNFCCC',
      },
      {
        '@type': 'Organization',
        name: 'United Nations Convention to Combat Desertification',
        alternateName: 'UNCCD',
      },
      {
        '@type': 'Organization',
        name: 'Convention on Biological Diversity',
        alternateName: 'CBD',
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main id="main-content" className="min-h-screen bg-background">
        <HeroSection />
        <AboutSection />
        <SDGSection />
        <ProgramsSection />
        <FocusAreasSection />
        <AccreditationsSection />
        <GetInTouchSection />
      </main>
    </>
  );
}
