'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function AboutSectionComponent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className={`order-2 lg:order-1 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-6">
              About VIKALP
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Creating Alternatives for{' '}
              <span className="text-brand">Sustainable Communities</span>
            </h2>

            <div className="space-y-4 text-lg text-muted leading-relaxed mb-8">
              <p>
                <strong className="text-foreground">VIKALP</strong> (an alternative) is a
                voluntary organization working in Gujarat 380015, India with Indigenous and
                Deprived Communities on Sustainable Development Goals (SDGs), Climate Change,
                Agroforestry & Biodiversity, Natural Resource Management as well as Women
                Empowerment and Sustainable Livelihood.
              </p>

              <p>
                Registered in 2002 under Public Trust Act, India (Registration No.
                E/15763/Ahmedabad), VIKALP has official accreditation with UNFCCC, UNCCD & CBD,
                and is in Special Consultative Status with UN ECOSOC.
              </p>
            </div>

            {/* CTA */}
            <Link href="/about" onClick={() => trackButtonClick('about_section_learn_more')}>
              <Button variant="primary" size="lg" trackingName="about_section_learn_more_button">
                Learn More About Us
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/about.png"
                alt="VIKALP team working with indigenous communities in Gujarat"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority={false}
              />

              {/* Overlay gradient for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const AboutSection = memo(AboutSectionComponent);
