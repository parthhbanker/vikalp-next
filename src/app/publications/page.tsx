'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { Button } from '@/components/ui';
import { Search, BookOpen, Download, Calendar, FileText, Globe, TrendingUp, Quote, Book, ClipboardList, Lightbulb } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand/5 via-white to-brand/10 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-6">
            <BookOpen size={16} />
            Research & Knowledge
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Our <span className="text-brand">Publications</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted leading-relaxed">
            Research, reports, and insights from our work in sustainable development
          </p>
        </div>
      </div>
    </section>
  );
}

function PublicationsListSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedFeatured, setSelectedFeatured] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'research': return Book;
      case 'report': return ClipboardList;
      case 'case-study': return Lightbulb;
      case 'guide': return BookOpen;
      default: return FileText;
    }
  };

  const categories = [
    { id: 'all', label: 'All Types' },
    { id: 'research', label: 'Analytical Reports' },
    { id: 'report', label: 'Annual Reports' },
    { id: 'guide', label: 'Guides' },
  ];

  const languages = [
    { id: 'all', label: 'All Languages' },
    { id: 'english', label: 'English' },
  ];

  const years = [
    { id: 'all', label: 'All Years' },
    { id: '2025', label: '2025' },
    { id: '2024', label: '2024' },
  ];

  const publications = [
    {
      id: 1,
      slug: 'vikalp-gcg-afforestation-annual-report-2025-26',
      title: 'VIKALP GCG Afforestation Program Annual Report 2025-26',
      category: 'report',
      language: 'english',
      year: 2025,
      pages: 45,
      downloads: 234,
      featured: true,
      description: 'Comprehensive annual report on the GCG Afforestation Program covering activities, achievements, and impact for the year 2025-26.',
      fileUrl: '/pubilcations/reports/VIKALP_GCG_Afforestation Program Annual Report_2025-26.pdf',
    },
    {
      id: 2,
      slug: 'vikalp-u2g-afforestation-annual-report-2025-26',
      title: 'VIKALP U2G Afforestation Program Annual Report 2025-26',
      category: 'report',
      language: 'english',
      year: 2025,
      pages: 42,
      downloads: 198,
      featured: true,
      description: 'Annual report documenting the U2G Afforestation Program implementation, outcomes, and community impact for 2025-26.',
      fileUrl: '/pubilcations/reports/VIKALP_U2G_Afforestation Program Annual Report_2025-26.pdf',
    },
    {
      id: 3,
      slug: 'vikalp-gcg-2025-analytical-report',
      title: 'VIKALP GCG 2025 Analytical Report',
      category: 'research',
      language: 'english',
      year: 2025,
      pages: 68,
      downloads: 312,
      description: 'In-depth analytical assessment of the GCG program performance, data analysis, and key insights for 2025.',
      fileUrl: '/pubilcations/reports/Annex-A_VIKALP_GCG 2025 ANALYTICAL REPORT.pdf',
    },
    {
      id: 4,
      slug: 'vikalp-u2g-2025-analytical-report',
      title: 'VIKALP U2G 2025 Analytical Report',
      category: 'research',
      language: 'english',
      year: 2025,
      pages: 64,
      downloads: 287,
      description: 'Detailed analytical study of the U2G program metrics, outcomes, and strategic recommendations for 2025.',
      fileUrl: '/pubilcations/reports/Annex-A_VIKALP_U2G 2025 ANALYTICAL REPORT.pdf',
    },
    {
      id: 5,
      slug: 'vikalp-gcg-2024-analytical-report',
      title: 'VIKALP GCG 2024 Analytical Report',
      category: 'research',
      language: 'english',
      year: 2024,
      pages: 62,
      downloads: 445,
      description: 'Comprehensive analytical review of the GCG program activities and impact assessment for 2024.',
      fileUrl: '/pubilcations/reports/Annex-B_VIKALP_GCG 2024 ANALYTICAL REPORT.pdf',
    },
    {
      id: 6,
      slug: 'vikalp-u2g-2024-analytical-report',
      title: 'VIKALP U2G 2024 Analytical Report',
      category: 'research',
      language: 'english',
      year: 2024,
      pages: 58,
      downloads: 421,
      description: 'Analytical evaluation of the U2G program implementation and results for the year 2024.',
      fileUrl: '/pubilcations/reports/Annex-B_VIKALP_U2G 2024 ANALYTICAL REPORT.pdf',
    },
    {
      id: 7,
      slug: 'rf-awareness-pamphlet-1',
      title: 'RF Awareness Pamphlet - Part 1',
      category: 'guide',
      language: 'english',
      year: 2025,
      pages: 2,
      downloads: 156,
      description: 'Educational pamphlet on rainforest awareness and conservation practices for community outreach.',
      fileUrl: '/pubilcations/awareness/RF Awareness Pamphlet-1.pdf',
    },
    {
      id: 8,
      slug: 'rf-awareness-pamphlet-2',
      title: 'RF Awareness Pamphlet - Part 2',
      category: 'guide',
      language: 'english',
      year: 2025,
      pages: 2,
      downloads: 143,
      description: 'Continuation of rainforest awareness materials with practical tips and community engagement strategies.',
      fileUrl: '/pubilcations/awareness/RF Awareness Pamphlet-2.pdf',
    },
    {
      id: 9,
      slug: 'plantation-form-2025',
      title: 'Plantation Form 2025',
      category: 'guide',
      language: 'english',
      year: 2025,
      pages: 4,
      downloads: 289,
      description: 'Official plantation registration and documentation form for tree planting initiatives in 2025.',
      fileUrl: '/pubilcations/awareness/Plantation Form 2025.pdf',
    },
    {
      id: 10,
      slug: 'vikalp-planner-april25-march26',
      title: 'VIKALP Planner April 2025 - March 2026',
      category: 'guide',
      language: 'english',
      year: 2025,
      pages: 12,
      downloads: 178,
      description: 'Annual planner outlining VIKALP activities, events, and milestones for the year April 2025 to March 2026.',
      fileUrl: '/pubilcations/awareness/Planner VIKALP April25-March26.pdf',
    },
  ];

  const filteredPublications = publications
    .filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pub.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || pub.category === selectedCategory;
      const matchesLanguage = selectedLanguage === 'all' || pub.language === selectedLanguage;
      const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
      const matchesFeatured = selectedFeatured === 'all' || 
                             (selectedFeatured === 'featured' && pub.featured) ||
                             (selectedFeatured === 'regular' && !pub.featured);
      return matchesSearch && matchesCategory && matchesLanguage && matchesYear && matchesFeatured;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'oldest') return a.year - b.year;
      if (sortBy === 'popular') return b.downloads - a.downloads;
      return 0;
    });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Browse Publications</h2>
          <p className="text-lg text-muted text-center max-w-3xl mx-auto mb-8">
            Access our research papers, reports, and knowledge resources
          </p>

          <div className="bg-surface-secondary/50 rounded-xl p-6">
            <div className="flex flex-col gap-4">
              <div className="relative w-full">
                <label htmlFor="search-publications" className="sr-only">Search publications</label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} aria-hidden="true" />
                <input
                  id="search-publications"
                  type="search"
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white"
                  aria-label="Search publications by title or description"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <label className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedFeatured === 'featured'}
                    onChange={(e) => setSelectedFeatured(e.target.checked ? 'featured' : 'all')}
                    className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-2 focus:ring-brand"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Only</span>
                </label>

                <label htmlFor="category-filter" className="sr-only">Filter by category</label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white"
                  aria-label="Filter publications by category"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>

                <label htmlFor="language-filter" className="sr-only">Filter by language</label>
                <select
                  id="language-filter"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white"
                  aria-label="Filter publications by language"
                >
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.label}</option>
                  ))}
                </select>

                <label htmlFor="year-filter" className="sr-only">Filter by year</label>
                <select
                  id="year-filter"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white"
                  aria-label="Filter publications by year"
                >
                  {years.map((year) => (
                    <option key={year.id} value={year.id}>{year.label}</option>
                  ))}
                </select>

                <label htmlFor="sort-by" className="sr-only">Sort publications</label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white"
                  aria-label="Sort publications by date or popularity"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Downloaded</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((pub, index) => {
            const CategoryIcon = getCategoryIcon(pub.category);
            return (
              <Link
                key={pub.id}
                href={`/publications/${pub.slug}`}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-700 group flex flex-col ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                  <CategoryIcon className="w-20 h-20 text-brand" />
                  {pub.featured && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-brand text-white rounded-full text-xs font-bold shadow-lg">
                      FEATURED
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-semibold rounded-full">
                      {categories.find(c => c.id === pub.category)?.label}
                    </span>
                    <span className="px-3 py-1 bg-surface-secondary text-muted text-xs font-semibold rounded-full">
                      {languages.find(l => l.id === pub.language)?.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand transition-colors">{pub.title}</h3>
                  <p className="text-muted mb-4 line-clamp-3 flex-1">{pub.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4 bg-brand/5 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{pub.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={14} />
                      <span>{pub.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-2 border-2 border-brand/20 text-brand rounded-lg group-hover:bg-brand group-hover:text-white transition-colors text-center font-semibold text-sm">
                      View Details
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        trackButtonClick(`download_publication_${pub.id}`);
                      }}
                      className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
                      aria-label="Download PDF"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No publications found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ImpactSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { value: 30, label: 'Publications', suffix: '+', description: 'Research & Reports' },
    { value: 15000, label: 'Downloads', suffix: '+', description: 'Global Reach' },
    { value: 50, label: 'Citations', suffix: '+', description: 'Academic Impact' },
    { value: 3, label: 'Languages', suffix: '+', description: 'Accessible Content' },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Publication Impact</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Our research and knowledge sharing reach
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, suffix, description, index, isVisible }: {
  value: number;
  label: string;
  suffix: string;
  description: string;
  index: number;
  isVisible: boolean;
}) {
  const count = useCounterAnimation(value, 2000, isVisible);

  return (
    <div
      className={`text-center p-4 sm:p-6 bg-gradient-to-br from-brand/5 to-brand/10 rounded-xl transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-brand mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-base md:text-lg font-semibold text-foreground mb-1">{label}</div>
      <div className="text-sm text-muted">{description}</div>
    </div>
  );
}

function PublicationsPage() {
  return (
    <main>
      <HeroSection />
      <PublicationsListSection />
      <ImpactSection />
    </main>
  );
}

export default memo(PublicationsPage);
