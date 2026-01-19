import { Metadata } from 'next';

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
    'sustainable agriculture',
    'rural development',
    'India NGO',
  ],
  authors: [{ name: 'VIKALP' }],
  creator: 'VIKALP',
  publisher: 'VIKALP',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vikalp.org',
    siteName: 'VIKALP',
    title: 'VIKALP - Sustainable Development for Indigenous Communities',
    description:
      'Empowering indigenous communities through climate action, agroforestry, and women empowerment since 2002. UN ECOSOC accredited organization.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VIKALP - Creating Sustainable Futures Together',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIKALP - Sustainable Development for Indigenous Communities',
    description:
      'Empowering indigenous communities through climate action, agroforestry, and women empowerment since 2002.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes as needed
  },
  alternates: {
    canonical: 'https://vikalp.org',
  },
};
