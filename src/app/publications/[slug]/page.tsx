'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Share2, Calendar, User, FileText, BookOpen, ExternalLink, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Globe } from 'lucide-react';

// Mock data - replace with real data
const publicationData: Record<string, any> = {
  'regenerative-agriculture-handbook': {
    title: 'Regenerative Agriculture: A Practical Handbook',
    category: 'Guide',
    language: 'English',
    year: 2023,
    authors: ['Dr. Priya Sharma', 'Rajesh Kumar'],
    pages: 156,
    downloads: 5420,
    publishedDate: 'March 15, 2023',
    description: 'A comprehensive guide to implementing regenerative agriculture practices in Indian farming communities.',
    abstract: 'This publication presents a detailed framework for transitioning from conventional to regenerative agricultural practices. Based on five years of field research across 150 villages, it provides practical strategies for farmers, NGOs, and policymakers to restore soil health, enhance biodiversity, and improve farmer livelihoods while addressing climate change.',
    keyFindings: [
      'Regenerative practices increased soil organic matter by 2-3% over 3 years',
      'Farmers reported 40% reduction in input costs after transition',
      'Crop yields remained stable or improved in 85% of participating farms',
      'Water retention capacity improved by 60% in treated soils',
      'Biodiversity indicators showed 3x increase in beneficial insects'
    ],
    tableOfContents: [
      'Introduction to Regenerative Agriculture',
      'Soil Health Assessment and Restoration',
      'Water Management Techniques',
      'Crop Diversity and Rotation',
      'Integrated Pest Management',
      'Community-Based Implementation',
      'Monitoring and Evaluation',
      'Case Studies from Rural India'
    ],
    relatedPublications: [
      { slug: 'soil-health-report-2023', title: 'Soil Health Assessment Report 2023', category: 'Report' },
      { slug: 'farmer-training-guide', title: 'Farmer Training Methodology', category: 'Guide' },
      { slug: 'biodiversity-case-study', title: 'Biodiversity Enhancement Case Study', category: 'Case Study' }
    ]
  }
};

export default function PublicationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [publication, setPublication] = useState<any>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    setPublication(publicationData[slug] || publicationData['regenerative-agriculture-handbook']);
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
