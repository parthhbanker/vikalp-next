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
    <div className={`flex flex-col items-center gap-2 p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-700 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-brand [&>svg]:w-7 [&>svg]:h-7 sm:[&>svg]:w-8 sm:[&>svg]:h-8">{icon}</div>
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
      value: 422924,
      suffix: '+',
      label: 'Trees Planted',
    },
    {
      icon: <Users size={32} strokeWidth={2} />,
      value: 5000,
      suffix: '+',
      label: 'Women Farmers',
    },
    {
      icon: <MapPin size={32} strokeWidth={2} />,
      value: 150,
      suffix: '+',
      label: 'Villages Impacted',
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-brand/5 via-white to-brand/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            Let's Grow<br />
            the Future <span className="text-brand">Together</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted mb-6 leading-relaxed max-w-3xl mx-auto">
            Empowering indigenous and deprived communities in Gujarat through climate action,
            agroforestry, and sustainable livelihoods since 2002 - 23+ years of service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
              href="/about-us"
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
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
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
