'use client';

import { memo, useState } from 'react';
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
    { id: 'research', label: 'Research Papers' },
    { id: 'report', label: 'Annual Reports' },
    { id: 'case-study', label: 'Case Studies' },
    { id: 'guide', label: 'Guides' },
  ];

  const languages = [
    { id: 'all', label: 'All Languages' },
    { id: 'english', label: 'English' },
    { id: 'gujarati', label: 'Gujarati' },
    { id: 'hindi', label: 'Hindi' },
  ];

  const years = [
    { id: 'all', label: 'All Years' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' },
  ];

  const publications = [
    {
      id: 1,
      title: 'Agroforestry Impact Assessment 2023',
      category: 'research',
      language: 'english',
      year: 2023,
      pages: 45,
      downloads: 1250,
      description: 'Comprehensive study on the impact of agroforestry practices on farmer income and biodiversity in South Gujarat.',
      fileUrl: '#',
    },
    {
      id: 2,
      title: 'Annual Report 2022-23',
      category: 'report',
      language: 'english',
      year: 2023,
      pages: 68,
      downloads: 2100,
      description: 'Complete overview of our programs, achievements, and financial statements for the year 2022-23.',
      fileUrl: '#',
    },
    {
      id: 3,
      title: 'Women Empowerment Through Green Entrepreneurship',
      category: 'case-study',
      language: 'english',
      year: 2023,
      pages: 32,
      downloads: 890,
      description: 'Success stories and learnings from our women-led sustainable business initiatives.',
      fileUrl: '#',
    },
    {
      id: 4,
      title: 'Miyawaki Forest Implementation Guide',
      category: 'guide',
      language: 'gujarati',
      year: 2022,
      pages: 28,
      downloads: 1560,
      description: 'Step-by-step guide for implementing Miyawaki method forests in urban and rural areas.',
      fileUrl: '#',
    },
    {
      id: 5,
      title: 'Climate Resilience in Tribal Communities',
      category: 'research',
      language: 'english',
      year: 2022,
      pages: 52,
      downloads: 1340,
      description: 'Research on climate adaptation strategies adopted by indigenous communities in Gujarat.',
      fileUrl: '#',
    },
    {
      id: 6,
      title: 'Traditional Seed Conservation Manual',
      category: 'guide',
      language: 'hindi',
      year: 2022,
      pages: 24,
      downloads: 980,
      description: 'Practical guide for preserving and propagating traditional crop varieties.',
      fileUrl: '#',
    },
  ];

  const filteredPublications = publications
    .filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pub.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || pub.category === selectedCategory;
      const matchesLanguage = selectedLanguage === 'all' || pub.language === selectedLanguage;
      const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
      return matchesSearch && matchesCategory && matchesLanguage && matchesYear;
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
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
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

              <div className="flex flex-wrap gap-3">
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
              <div
                key={pub.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-700 group flex flex-col ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                  <CategoryIcon className="w-20 h-20 text-brand" />
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

                  <h3 className="text-xl font-bold text-foreground mb-3">{pub.title}</h3>
                  <p className="text-muted mb-4 line-clamp-3 flex-1">{pub.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4 bg-brand/5 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{pub.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText size={14} />
                      <span>{pub.pages}p</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={14} />
                      <span>{pub.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => trackButtonClick(`download_publication_${pub.id}`)}
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
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
