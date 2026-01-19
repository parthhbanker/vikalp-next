'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * UN Sustainable Development Goals Section
 *
 * Displays alignment with UN SDGs with banner and relevant goal icons
 */
function SDGSectionComponent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  // Relevant SDG goals for VIKALP's work
  const sdgGoals = [
    { number: 1, title: 'No Poverty', image: '/images/sdg/sdg-1.png' },
    { number: 2, title: 'Zero Hunger', image: '/images/sdg/sdg-2.png' },
    { number: 3, title: 'Good Health and Well-being', image: '/images/sdg/sdg-3.png' },
    { number: 5, title: 'Gender Equality', image: '/images/sdg/sdg-5.png' },
    { number: 8, title: 'Decent Work and Economic Growth', image: '/images/sdg/sdg-8.png' },
    { number: 10, title: 'Reduced Inequalities', image: '/images/sdg/sdg-10.png' },
    { number: 12, title: 'Responsible Consumption and Production', image: '/images/sdg/sdg-12.png' },
    { number: 13, title: 'Climate Action', image: '/images/sdg/sdg-13.png' },
    { number: 15, title: 'Life on Land', image: '/images/sdg/sdg-15.png' },
    { number: 17, title: 'Partnerships for the Goals', image: '/images/sdg/sdg-17.png' },
  ];

  return (
    <section id="sdgs" className="py-12 md:py-16 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-10 md:mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-4">
            UN Sustainable Development Goals
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Aligned with Global Goals
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Our work directly contributes to achieving the United Nations Sustainable Development Goals,
            creating lasting impact for communities and the planet.
          </p>
        </div>

        {/* SDG Goals Grid */}
        <div className="grid grid-cols-5 lg:grid-cols-10 gap-4 md:gap-6 max-w-6xl mx-auto">
          {sdgGoals.map((goal, index) => (
            <div
              key={goal.number}
              className={`group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
              role="img"
              aria-label={`UN Sustainable Development Goal ${goal.number}: ${goal.title}`}
            >
              <Image
                src={goal.image}
                alt={`SDG ${goal.number}: ${goal.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const SDGSection = memo(SDGSectionComponent);
