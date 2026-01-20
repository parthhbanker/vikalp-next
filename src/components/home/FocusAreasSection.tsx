'use client';

import { memo } from 'react';
import {
  Leaf,
  CloudRain,
  Users,
  Trees,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FocusAreaProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

function FocusAreaCard({ icon, title, description, color }: Omit<FocusAreaProps, 'href'>) {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border hover:border-brand/30">
      {/* Colored accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
        style={{ backgroundColor: color }}
      />

      <div className="p-6 md:p-8">
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}15` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>

        {/* Content */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function FocusAreasSectionComponent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const focusAreas: FocusAreaProps[] = [
    {
      icon: <CloudRain size={28} strokeWidth={2} />,
      title: 'Climate Change & SDGs',
      description:
        'Leading climate action initiatives aligned with UN Sustainable Development Goals, building resilience in vulnerable communities.',
      color: '#3F7E44',
    },
    {
      icon: <Trees size={28} strokeWidth={2} />,
      title: 'Agroforestry & Biodiversity',
      description:
        'Promoting sustainable agricultural practices integrated with forestry, enhancing biodiversity and ecosystem services.',
      color: '#56C02B',
    },
    {
      icon: <Users size={28} strokeWidth={2} />,
      title: 'Women Empowerment',
      description:
        'Empowering women through skill development, leadership training, and economic opportunities for sustainable livelihoods.',
      color: '#FF3A21',
    },
    {
      icon: <Leaf size={28} strokeWidth={2} />,
      title: 'Natural Resource Management',
      description:
        'Sustainable management of land, water, and forest resources through traditional knowledge and modern practices.',
      color: '#00689D',
    },
  ];

  return (
    <section id="focus-areas" className="py-16 md:py-24 bg-gradient-to-b from-white to-surface-secondary">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Focus Areas
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            We work across multiple interconnected areas to create holistic, sustainable development
            for indigenous and deprived communities.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {focusAreas.map((area, index) => (
            <div
              key={area.title}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <FocusAreaCard {...area} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const FocusAreasSection = memo(FocusAreasSectionComponent);
