'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { Button } from '@/components/ui';
import { Search, TreeDeciduous, Users, MapPin, Sprout, Leaf, Droplets, GraduationCap, Heart, ArrowRight, Filter } from 'lucide-react';
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
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-6">
            <Leaf size={16} />
            Sustainable Development Initiatives
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Our <span className="text-brand">Programs</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted leading-relaxed mb-8">
            Transforming Communities Through Sustainable Action
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand rounded-full" />
              <span className="text-muted">6 Active Programs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand rounded-full" />
              <span className="text-muted">150+ Villages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand rounded-full" />
              <span className="text-muted">5,000+ Beneficiaries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsListSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'climate', label: 'Climate Action' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'community', label: 'Community' },
    { id: 'biodiversity', label: 'Biodiversity' },
  ];

  const programs = [
    {
      id: 1,
      slug: 'bhoomi-collective',
      title: "Bhoomi Producers' Collective",
      category: 'community',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop',
      description: 'Community Based Organization with 5000+ indigenous agroforest producers families for social and economic empowerment with Nature Conservation.',
      impact: '5,000+ families empowered',
    },
    {
      id: 2,
      slug: 'regenerative-agriculture',
      title: 'Regenerative Sustainable Agriculture',
      category: 'agriculture',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
      description: 'Traditional grains and millet farming with organic fertilizers, promoting organic millets and traditional food with seed bank support.',
      impact: '15+ traditional varieties revived',
    },
    {
      id: 3,
      slug: 'trees-biodiversity',
      title: 'TREES & Biodiversity Sites',
      category: 'biodiversity',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
      description: 'Thuti Rural Experimental and Exposure Site with 3 dedicated biodiversity sites (4,000+ trees each) for research and carbon credits.',
      impact: '12,000+ trees planted',
    },
    {
      id: 4,
      slug: 'miyawaki-forest',
      title: 'Miyawaki Forest',
      category: 'biodiversity',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
      description: 'Dense native forests using Miyawaki method with 155+ species, creating biodiversity hotspots and carbon sinks in urban and rural areas.',
      impact: '2+ forests established',
    },
    {
      id: 5,
      slug: 'green-entrepreneurship',
      title: 'Green Entrepreneurship',
      category: 'community',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop',
      description: 'Supporting eco-friendly businesses and sustainable livelihood opportunities for women and youth in rural communities.',
      impact: '5,000+ entrepreneurs supported',
    },
    {
      id: 6,
      slug: 'eco-innovation',
      title: 'Eco-Innovation',
      category: 'climate',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop',
      description: 'Innovative solutions for environmental challenges including renewable energy, waste management, and sustainable technologies.',
      impact: 'Multiple innovations deployed',
    },
  ];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Explore Our Programs</h2>
          <p className="text-lg text-muted text-center max-w-3xl mx-auto mb-8">
            Discover our comprehensive initiatives creating lasting impact across Gujarat
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-brand text-white'
                      : 'bg-surface-secondary text-foreground hover:bg-brand/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => (
            <div
              key={program.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-700 group flex flex-col ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-foreground mb-3">{program.title}</h3>
                <p className="text-muted mb-4 line-clamp-3 flex-1">{program.description}</p>
                <div className="flex items-center gap-2 text-sm text-brand font-semibold mb-4 bg-brand/5 px-3 py-2 rounded-lg">
                  <Heart size={16} />
                  {program.impact}
                </div>
                <Link href={`/our-programs/${program.slug}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => trackButtonClick(`program_learn_more_${program.id}`)}
                  >
                    Learn More
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No programs found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ImpactSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { value: 422924, label: 'Trees Planted', suffix: '+', description: 'Fruit, Forestry & Native' },
    { value: 150, label: 'Villages Impacted', suffix: '+', description: 'Across South Gujarat' },
    { value: 5000, label: 'Women Farmers', suffix: '+', description: 'Connected & Empowered' },
    { value: 15, label: 'Traditional Varieties', suffix: '+', description: 'Revived' },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Program Impact</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Measurable results from our dedicated efforts across Gujarat
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

function ApproachSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const approaches = [
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'Implementing eco-friendly methods that preserve natural resources for future generations.',
    },
    {
      icon: Users,
      title: 'Community-Led',
      description: 'Empowering local communities to lead their own development and conservation efforts.',
    },
    {
      icon: GraduationCap,
      title: 'Knowledge Transfer',
      description: 'Combining traditional wisdom with modern science for effective solutions.',
    },
    {
      icon: Droplets,
      title: 'Resource Management',
      description: 'Efficient use of water, soil, and biodiversity for sustainable livelihoods.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Approach</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            How we create sustainable and lasting impact in communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approaches.map((approach, index) => (
            <div
              key={approach.title}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <approach.icon className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{approach.title}</h3>
              <p className="text-muted">{approach.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand/5 via-white to-brand/10">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Be Part of the Change
          </h2>
          <p className="text-lg text-muted mb-8">
            Support our programs and help us create a sustainable future for communities across Gujarat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" onClick={() => trackButtonClick('programs_cta_donate')}>
              <Button variant="primary" size="lg">
                Support Our Programs
              </Button>
            </Link>
            <Link href="/volunteer" onClick={() => trackButtonClick('programs_cta_volunteer')}>
              <Button variant="outline" size="lg">
                Volunteer With Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsPage() {
  return (
    <main>
      <HeroSection />
      <ProgramsListSection />
      <ImpactSection />
      <ApproachSection />
      <CTASection />
    </main>
  );
}

export default memo(ProgramsPage);
