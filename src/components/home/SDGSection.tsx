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
    { number: 1, title: 'No Poverty', color: '#E5243B' },
    { number: 2, title: 'Zero Hunger', color: '#DDA63A' },
    { number: 5, title: 'Gender Equality', color: '#FF3A21' },
    { number: 8, title: 'Decent Work and Economic Growth', color: '#A21942' },
    { number: 10, title: 'Reduced Inequalities', color: '#DD1367' },
    { number: 13, title: 'Climate Action', color: '#3F7E44' },
    { number: 15, title: 'Life on Land', color: '#56C02B' },
    { number: 17, title: 'Partnerships for the Goals', color: '#19486A' },
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
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {sdgGoals.map((goal, index) => (
            <div
              key={goal.number}
              className={`group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ 
                backgroundColor: goal.color,
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
              role="img"
              aria-label={`UN Sustainable Development Goal ${goal.number}: ${goal.title}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
                <div className="text-2xl md:text-3xl font-bold mb-1" aria-hidden="true">
                  {goal.number}
                </div>
                <div className="text-xs md:text-sm font-medium text-center leading-tight">
                  {goal.title}
                </div>
              </div>

              {/* Hover overlay with more info */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                <p className="text-white text-xs text-center leading-relaxed">
                  Goal {goal.number}: {goal.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const SDGSection = memo(SDGSectionComponent);
