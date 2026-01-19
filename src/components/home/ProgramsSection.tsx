'use client';

import { memo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ProgramCardProps {
  image: string;
  tag: string;
  title: string;
  description: string;
  href: string;
}

function ProgramCard({ image, tag, title, description, href }: ProgramCardProps) {
  return (
    <div className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Tag */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-brand text-white text-sm font-semibold rounded-full shadow-md">
          {tag}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-muted mb-6 leading-relaxed line-clamp-3">
          {description}
        </p>
        <Link
          href={href}
          onClick={() => trackButtonClick(`program_card_${title.toLowerCase().replace(/\s+/g, '_')}`)}
          className="inline-flex items-center gap-2 text-brand font-medium hover:gap-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded"
        >
          Learn More
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

function ProgramsSectionComponent() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  const programs: ProgramCardProps[] = [
    {
      image: '/programs/bhoomi-collective.jpg',
      tag: 'Community Empowerment',
      title: "Bhoomi Producers' Collective",
      description:
        "Community Based Organization with 5000+ indigenous agroforest producers families for social and economic empowerment with Nature Conservation.",
      href: '/programs#bhoomi-collective',
    },
    {
      image: '/programs/regenerative-agriculture.jpg',
      tag: 'Sustainable Agriculture',
      title: 'Regenerative Sustainable Agriculture',
      description:
        'Traditional grains and millet farming with organic fertilizers, promoting organic millets and traditional food with seed bank support.',
      href: '/programs#regenerative-agriculture',
    },
    {
      image: '/programs/trees-biodiversity.jpg',
      tag: 'Biodiversity Conservation',
      title: 'TREES & Biodiversity Sites',
      description:
        'Thuti Rural Experimental and Exposure Site with 3 dedicated biodiversity sites (4,000+ trees each) for research, carbon credits.',
      href: '/programs#trees-biodiversity',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="programs" className="py-16 md:py-24 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-4">
              Our Programs
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Transforming Communities Through Action
            </h2>
            <p className="text-lg text-muted max-w-2xl">
              Explore our flagship programs creating lasting impact across Gujarat's indigenous
              communities.
            </p>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => {
                scroll('left');
                trackButtonClick('programs_scroll_left');
              }}
              disabled={!canScrollLeft}
              className="p-3 rounded-full bg-white border-2 border-border hover:border-brand hover:bg-brand hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-border disabled:hover:text-foreground"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => {
                scroll('right');
                trackButtonClick('programs_scroll_right');
              }}
              disabled={!canScrollRight}
              className="p-3 rounded-full bg-white border-2 border-border hover:border-brand hover:bg-brand hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-border disabled:hover:text-foreground"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Cards Slider */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth p-8 -m-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {programs.map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
        </div>

        {/* View All Programs CTA */}
        <div className="text-center mt-12">
          <Link href="/programs" onClick={() => trackButtonClick('programs_section_view_all')}>
            <Button variant="outline" size="lg" trackingName="programs_section_view_all_button">
              View All Programs
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export const ProgramsSection = memo(ProgramsSectionComponent);
