'use client';

import { memo } from 'react';
import { Shield, Award, Globe, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AccreditationBadgeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  year?: string;
}

function AccreditationBadge({ icon, title, subtitle, year }: AccreditationBadgeProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-brand/20 hover:border-brand/50">
      {/* Badge Icon */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          {/* Circular badge background */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand to-brand/70 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div className="text-white">{icon}</div>
          </div>
          {/* Checkmark indicator */}
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <CheckCircle size={16} className="text-white" fill="currentColor" />
          </div>
        </div>

        {/* Badge Content */}
        <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted mb-2">{subtitle}</p>
        {year && (
          <span className="inline-flex items-center px-3 py-1 bg-brand/10 text-brand text-xs font-semibold rounded-full">
            Since {year}
          </span>
        )}
      </div>
    </div>
  );
}

function AccreditationsSectionComponent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const accreditations: AccreditationBadgeProps[] = [
    {
      icon: <Globe size={36} strokeWidth={2} />,
      title: 'UN ECOSOC',
      subtitle: 'Special Consultative Status',
      year: '2015',
    },
    {
      icon: <Shield size={36} strokeWidth={2} />,
      title: 'UNFCCC',
      subtitle: 'Official Accreditation',
      year: '2009',
    },
    {
      icon: <Award size={36} strokeWidth={2} />,
      title: 'UNCCD',
      subtitle: 'Observer Organization',
      year: '2011',
    },
    {
      icon: <Shield size={36} strokeWidth={2} />,
      title: 'CBD',
      subtitle: 'Biodiversity Convention',
      year: '2012',
    },
  ];

  return (
    <section id="accreditations" className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-4">
            Recognized & Trusted
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            UN Accreditations
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Officially recognized by the United Nations for our commitment to sustainable development
            and impactful work with vulnerable communities.
          </p>
        </div>

        {/* Accreditations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {accreditations.map((accreditation, index) => (
            <div
              key={accreditation.title}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
            >
              <AccreditationBadge {...accreditation} />
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className={`bg-gradient-to-r from-brand/5 to-brand/10 rounded-xl p-8 md:p-10 text-center border border-brand/20 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-brand mb-2">23+</div>
              <div className="text-sm text-muted">Years of Service</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-brand/30" />
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-brand mb-2">2002</div>
              <div className="text-sm text-muted">Registered Trust</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-brand/30" />
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-brand mb-2">Gujarat</div>
              <div className="text-sm text-muted">India - 380015</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const AccreditationsSection = memo(AccreditationsSectionComponent);
