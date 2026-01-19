'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight, TreeDeciduous, Users, MapPin } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

interface StatProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
}

function StatCard({ icon, value, suffix, label, isVisible }: StatProps) {
  const count = useCounterAnimation(value, 2000, isVisible);
  
  return (
    <div className={`flex flex-col items-center gap-2 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-700 ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
    }`}>
      <div className="text-brand">{icon}</div>
      <div className="text-3xl md:text-4xl font-bold text-foreground">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted text-center">{label}</div>
    </div>
  );
}

function HeroSectionComponent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const stats = [
    {
      icon: <TreeDeciduous size={32} strokeWidth={2} />,
      value: 500,
      suffix: 'K+',
      label: 'Trees Planted',
    },
    {
      icon: <Users size={32} strokeWidth={2} />,
      value: 10,
      suffix: 'K+',
      label: 'Women Farmers',
    },
    {
      icon: <MapPin size={32} strokeWidth={2} />,
      value: 200,
      suffix: '+',
      label: 'Villages Impacted',
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-brand/5 via-white to-brand/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
            Creating Sustainable Futures{' '}
            <span className="text-brand">Together</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Empowering indigenous and deprived communities in Gujarat through climate action,
            agroforestry, and sustainable livelihoods since 2002.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <Link
              href="/donate"
              onClick={() => trackButtonClick('hero_donate_cta')}
            >
              <Button
                variant="primary"
                size="lg"
                trackingName="hero_donate_button"
              >
                Support Our Mission
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link
              href="/about"
              onClick={() => trackButtonClick('hero_learn_more')}
            >
              <Button
                variant="outline"
                size="lg"
                trackingName="hero_learn_more_button"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const HeroSection = memo(HeroSectionComponent);
