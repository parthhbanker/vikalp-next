'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Share2, Calendar, User, FileText, BookOpen, ExternalLink, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Globe } from 'lucide-react';

// Mock data - replace with real data
const publicationData: Record<string, any> = {
  'vikalp-gcg-afforestation-annual-report-2025-26': {
    title: 'VIKALP GCG Afforestation Program Annual Report 2025-26',
    category: 'Report',
    language: 'English',
    year: 2025,
    authors: ['VIKALP Team'],
    pages: 45,
    downloads: 234,
    publishedDate: 'January 2025',
    description: 'Comprehensive annual report on the GCG Afforestation Program.',
    abstract: 'This annual report presents a comprehensive overview of the GCG Afforestation Program activities, achievements, and impact for the year 2025-26. The report documents tree plantation initiatives, community engagement, biodiversity enhancement efforts, and the overall environmental and social impact of the program across various locations.',
    relatedPublications: [
      { slug: 'vikalp-u2g-afforestation-annual-report-2025-26', title: 'VIKALP U2G Afforestation Program Annual Report 2025-26', category: 'Report' },
      { slug: 'vikalp-gcg-2025-analytical-report', title: 'VIKALP GCG 2025 Analytical Report', category: 'Research' },
    ]
  },
  'vikalp-u2g-afforestation-annual-report-2025-26': {
    title: 'VIKALP U2G Afforestation Program Annual Report 2025-26',
    category: 'Report',
    language: 'English',
    year: 2025,
    authors: ['VIKALP Team'],
    pages: 42,
    downloads: 198,
    publishedDate: 'January 2025',
    description: 'Annual report documenting the U2G Afforestation Program implementation.',
    abstract: 'This report documents the implementation, outcomes, and community impact of the U2G Afforestation Program for 2025-26. It highlights the collaborative efforts with local communities, government partnerships, tree survival rates, and the socio-economic benefits generated through sustainable afforestation practices.',
    relatedPublications: [
      { slug: 'vikalp-gcg-afforestation-annual-report-2025-26', title: 'VIKALP GCG Afforestation Program Annual Report 2025-26', category: 'Report' },
      { slug: 'vikalp-u2g-2025-analytical-report', title: 'VIKALP U2G 2025 Analytical Report', category: 'Research' },
    ]
  },
  'vikalp-gcg-2025-analytical-report': {
    title: 'VIKALP GCG 2025 Analytical Report',
    category: 'Research',
    language: 'English',
    year: 2025,
    authors: ['VIKALP Research Team'],
    pages: 68,
    downloads: 312,
    publishedDate: 'February 2025',
    description: 'In-depth analytical assessment of the GCG program performance.',
    abstract: 'This analytical report provides an in-depth assessment of the GCG program performance, including detailed data analysis, impact metrics, environmental indicators, and strategic insights. The report evaluates the effectiveness of various interventions, identifies success factors, and provides evidence-based recommendations for program enhancement.',
    relatedPublications: [
      { slug: 'vikalp-gcg-afforestation-annual-report-2025-26', title: 'VIKALP GCG Afforestation Program Annual Report 2025-26', category: 'Report' },
      { slug: 'vikalp-gcg-2024-analytical-report', title: 'VIKALP GCG 2024 Analytical Report', category: 'Research' },
    ]
  },
  'vikalp-u2g-2025-analytical-report': {
    title: 'VIKALP U2G 2025 Analytical Report',
    category: 'Research',
    language: 'English',
    year: 2025,
    authors: ['VIKALP Research Team'],
    pages: 64,
    downloads: 287,
    publishedDate: 'February 2025',
    description: 'Detailed analytical study of the U2G program metrics and outcomes.',
    abstract: 'This detailed analytical study examines the U2G program metrics, outcomes, and strategic performance indicators for 2025. The report includes comprehensive data analysis, impact assessment, stakeholder feedback, and evidence-based recommendations for scaling and improving program effectiveness in future implementations.',
    relatedPublications: [
      { slug: 'vikalp-u2g-afforestation-annual-report-2025-26', title: 'VIKALP U2G Afforestation Program Annual Report 2025-26', category: 'Report' },
      { slug: 'vikalp-u2g-2024-analytical-report', title: 'VIKALP U2G 2024 Analytical Report', category: 'Research' },
    ]
  },
  'vikalp-gcg-2024-analytical-report': {
    title: 'VIKALP GCG 2024 Analytical Report',
    category: 'Research',
    language: 'English',
    year: 2024,
    authors: ['VIKALP Research Team'],
    pages: 62,
    downloads: 445,
    publishedDate: 'December 2024',
    description: 'Comprehensive analytical review of the GCG program activities.',
    abstract: 'This comprehensive analytical review examines the GCG program activities and impact assessment for 2024. The report provides detailed insights into program implementation, environmental outcomes, community participation, and lessons learned. It serves as a foundation for continuous improvement and strategic planning.',
    relatedPublications: [
      { slug: 'vikalp-gcg-2025-analytical-report', title: 'VIKALP GCG 2025 Analytical Report', category: 'Research' },
      { slug: 'vikalp-u2g-2024-analytical-report', title: 'VIKALP U2G 2024 Analytical Report', category: 'Research' },
    ]
  },
  'vikalp-u2g-2024-analytical-report': {
    title: 'VIKALP U2G 2024 Analytical Report',
    category: 'Research',
    language: 'English',
    year: 2024,
    authors: ['VIKALP Research Team'],
    pages: 58,
    downloads: 421,
    publishedDate: 'December 2024',
    description: 'Analytical evaluation of the U2G program implementation.',
    abstract: 'This analytical evaluation examines the U2G program implementation and results for the year 2024. The report includes quantitative and qualitative analysis of program outcomes, environmental impact indicators, community feedback, and strategic recommendations for enhancing program effectiveness and sustainability.',
    relatedPublications: [
      { slug: 'vikalp-u2g-2025-analytical-report', title: 'VIKALP U2G 2025 Analytical Report', category: 'Research' },
      { slug: 'vikalp-gcg-2024-analytical-report', title: 'VIKALP GCG 2024 Analytical Report', category: 'Research' },
    ]
  },
  'rf-awareness-pamphlet-1': {
    title: 'RF Awareness Pamphlet - Part 1',
    category: 'Guide',
    language: 'English',
    year: 2025,
    authors: ['VIKALP Outreach Team'],
    pages: 2,
    downloads: 156,
    publishedDate: 'March 2025',
    description: 'Educational pamphlet on rainforest awareness.',
    abstract: 'This educational pamphlet provides essential information on rainforest conservation, biodiversity importance, and community engagement strategies. Designed for grassroots awareness campaigns, it presents key concepts in an accessible format to inspire environmental stewardship and sustainable practices.',
    relatedPublications: [
      { slug: 'rf-awareness-pamphlet-2', title: 'RF Awareness Pamphlet - Part 2', category: 'Guide' },
      { slug: 'plantation-form-2025', title: 'Plantation Form 2025', category: 'Guide' },
    ]
  },
  'rf-awareness-pamphlet-2': {
    title: 'RF Awareness Pamphlet - Part 2',
    category: 'Guide',
    language: 'English',
    year: 2025,
    authors: ['VIKALP Outreach Team'],
    pages: 2,
    downloads: 143,
    publishedDate: 'March 2025',
    description: 'Continuation of rainforest awareness materials.',
    abstract: 'This pamphlet continues the rainforest awareness series with practical tips, community engagement strategies, and actionable steps for forest conservation. It emphasizes the role of local communities in protecting ecosystems and provides guidance on sustainable resource management.',
    relatedPublications: [
      { slug: 'rf-awareness-pamphlet-1', title: 'RF Awareness Pamphlet - Part 1', category: 'Guide' },
      { slug: 'vikalp-planner-april25-march26', title: 'VIKALP Planner April 2025 - March 2026', category: 'Guide' },
    ]
  },
  'plantation-form-2025': {
    title: 'Plantation Form 2025',
    category: 'Guide',
    language: 'English',
    year: 2025,
    authors: ['VIKALP Administration'],
    pages: 4,
    downloads: 289,
    publishedDate: 'January 2025',
    description: 'Official plantation registration form.',
    abstract: 'This official form facilitates the registration and documentation of tree planting initiatives for 2025. It captures essential data on plantation activities, species planted, locations, and community participation, enabling effective monitoring and evaluation of afforestation efforts.',
    relatedPublications: [
      { slug: 'vikalp-gcg-afforestation-annual-report-2025-26', title: 'VIKALP GCG Afforestation Program Annual Report 2025-26', category: 'Report' },
      { slug: 'vikalp-planner-april25-march26', title: 'VIKALP Planner April 2025 - March 2026', category: 'Guide' },
    ]
  },
  'vikalp-planner-april25-march26': {
    title: 'VIKALP Planner April 2025 - March 2026',
    category: 'Guide',
    language: 'English',
    year: 2025,
    authors: ['VIKALP Team'],
    pages: 12,
    downloads: 178,
    publishedDate: 'April 2025',
    description: 'Annual planner for VIKALP activities.',
    abstract: 'This comprehensive annual planner outlines VIKALP activities, events, milestones, and strategic priorities for the year April 2025 to March 2026. It serves as a roadmap for program implementation, stakeholder coordination, and organizational planning to achieve environmental and social impact goals.',
    relatedPublications: [
      { slug: 'vikalp-gcg-afforestation-annual-report-2025-26', title: 'VIKALP GCG Afforestation Program Annual Report 2025-26', category: 'Report' },
      { slug: 'plantation-form-2025', title: 'Plantation Form 2025', category: 'Guide' },
    ]
  },
};

export default function PublicationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [publication, setPublication] = useState<any>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    setPublication(publicationData[slug] || publicationData['vikalp-gcg-afforestation-annual-report-2025-26']);
  }, [slug]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = publication?.title || '';

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`,
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } else {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  if (!publication) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Copied Alert */}
      {showCopied && (
        <div className="fixed top-24 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <LinkIcon className="w-5 h-5" />
          <span className="font-semibold">Link copied to clipboard!</span>
        </div>
      )}

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <Link href="/publications" className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Publications
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {publication.category}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {publication.language}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {publication.year}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {publication.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{publication.authors.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{publication.publishedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              <span>{publication.downloads.toLocaleString()} downloads</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
              {showShareMenu && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border-2 border-gray-200 p-4 z-10 min-w-[200px]">
                  <button onClick={() => handleShare('facebook')} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span>Facebook</span>
                  </button>
                  <button onClick={() => handleShare('twitter')} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Twitter className="w-5 h-5 text-sky-500" />
                    <span>Twitter</span>
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <span>LinkedIn</span>
                  </button>
                  <button onClick={() => handleShare('email')} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span>Email</span>
                  </button>
                  <button onClick={() => handleShare('copy')} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <LinkIcon className="w-5 h-5 text-gray-600" />
                    <span>Copy Link</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Publication</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {publication.abstract}
          </p>
        </div>
      </section>

      {/* Related Publications */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Publications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {publication.relatedPublications.map((related: any) => (
              <Link
                key={related.slug}
                href={`/publications/${related.slug}`}
                className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-green-600 transition-colors group"
              >
                <BookOpen className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {related.title}
                </h3>
                <span className="text-sm text-gray-600">{related.category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Explore More Publications</h2>
          <p className="text-green-50 mb-6 max-w-2xl mx-auto">
            Discover our complete collection of research, reports, and guides on sustainable development
          </p>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
          >
            View All Publications
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
