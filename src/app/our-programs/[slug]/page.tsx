'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { Button } from '@/components/ui';
import { ArrowLeft, Calendar, MapPin, Users, Target, CheckCircle, Heart, Leaf, TrendingUp } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';

function HeroSection({ program }: { program: any }) {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <Image
        src={program.image}
        alt={program.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link href="/our-programs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Programs
        </Link>
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/90 text-white rounded-full text-sm font-semibold mb-4">
            {program.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{program.title}</h1>
          <p className="text-xl text-white/90 mb-8">{program.tagline}</p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-white">
              <Calendar size={20} />
              <span>Since {program.startYear}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin size={20} />
              <span>{program.location}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Users size={20} />
              <span>{program.beneficiaries}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewSection({ program }: { program: any }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className={`lg:col-span-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Program Overview</h2>
            <div className="prose prose-lg max-w-none">
              {program.overview.map((paragraph: string, index: number) => (
                <p key={index} className="text-muted leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-2xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-foreground mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted mb-1">Status</div>
                  <div className="flex items-center gap-2 text-brand font-semibold">
                    <CheckCircle size={18} />
                    Active
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted mb-1">Duration</div>
                  <div className="font-semibold text-foreground">{program.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-muted mb-1">Focus Area</div>
                  <div className="font-semibold text-foreground">{program.focusArea}</div>
                </div>
                <div>
                  <div className="text-sm text-muted mb-1">Partners</div>
                  <div className="font-semibold text-foreground">{program.partners}</div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-brand/20">
                <Link href="/donate">
                  <Button variant="primary" size="lg" className="w-full" trackingName="program_detail_donate">
                    Support This Program
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ObjectivesSection({ objectives }: { objectives: string[] }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Program Objectives</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Key goals we aim to achieve through this initiative
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className={`flex gap-4 bg-white p-6 rounded-xl shadow-lg transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-brand" />
                </div>
              </div>
              <p className="text-muted leading-relaxed">{objective}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection({ impact }: { impact: any }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-20 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Impact & Results</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Measurable outcomes from this program
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impact.stats.map((stat: any, index: number) => (
            <StatCard key={index} {...stat} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, suffix, label, description, isVisible, index }: any) {
  const count = useCounterAnimation(value, 2000, isVisible);

  return (
    <div
      className={`text-center p-6 bg-gradient-to-br from-brand/5 to-brand/10 rounded-xl transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-brand mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-base font-semibold text-foreground mb-1">{label}</div>
      <div className="text-sm text-muted">{description}</div>
    </div>
  );
}

function ActivitiesSection({ activities }: { activities: any[] }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Key Activities</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            How we implement this program on the ground
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center mb-4">
                <activity.icon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{activity.title}</h3>
              <p className="text-muted leading-relaxed">{activity.description}</p>
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
    <section className="py-16 md:py-20 bg-white">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg text-muted mb-8">
            Your support can help us expand this program and reach more communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" onClick={() => trackButtonClick('program_detail_cta_donate')}>
              <Button variant="primary" size="lg">
                <Heart size={20} className="mr-2" />
                Support This Program
              </Button>
            </Link>
            <Link href="/volunteer" onClick={() => trackButtonClick('program_detail_cta_volunteer')}>
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

function ProgramDetailPage({ params }: { params: { slug: string } }) {
  // Mock data - replace with actual data fetching
  const program = {
    slug: params.slug,
    title: "Bhoomi Producers' Collective",
    tagline: "Empowering indigenous communities through sustainable agroforestry",
    category: "Community Empowerment",
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&h=800&fit=crop',
    startYear: '2015',
    location: 'South Gujarat',
    beneficiaries: '5,000+ Families',
    duration: 'Ongoing',
    focusArea: 'Agroforestry & Livelihoods',
    partners: 'Local Communities, NGOs',
    overview: [
      'The Bhoomi Producers Collective is a community-based organization that brings together over 5,000 indigenous agroforest producer families across South Gujarat. This initiative focuses on social and economic empowerment while promoting nature conservation and sustainable livelihoods.',
      'Through this program, we work directly with tribal and indigenous communities to strengthen their traditional knowledge systems, improve agricultural practices, and create sustainable income opportunities through agroforestry and forest produce.',
      'The collective operates on principles of participatory governance, ensuring that community members have a voice in decision-making processes and benefit equitably from the program outcomes.',
    ],
    objectives: [
      'Strengthen community-based organizations for collective action and sustainable resource management',
      'Enhance income opportunities through value addition of forest and agricultural produce',
      'Promote sustainable agroforestry practices that conserve biodiversity',
      'Build capacity of indigenous communities in leadership and entrepreneurship',
      'Create market linkages for organic and traditional products',
      'Preserve and promote traditional ecological knowledge',
    ],
    impact: {
      stats: [
        { value: 5000, suffix: '+', label: 'Families', description: 'Empowered' },
        { value: 150, suffix: '+', label: 'Villages', description: 'Covered' },
        { value: 30, suffix: '%', label: 'Income', description: 'Increase' },
        { value: 50000, suffix: '+', label: 'Trees', description: 'Planted' },
      ],
    },
    activities: [
      { icon: Leaf, title: 'Agroforestry Training', description: 'Capacity building on sustainable farming and tree integration techniques' },
      { icon: Users, title: 'Community Organizing', description: 'Strengthening producer groups and cooperative structures' },
      { icon: TrendingUp, title: 'Market Linkages', description: 'Connecting producers with fair trade and organic markets' },
      { icon: Target, title: 'Value Addition', description: 'Processing and packaging of forest and farm produce' },
      { icon: CheckCircle, title: 'Certification Support', description: 'Helping communities obtain organic and fair trade certifications' },
      { icon: Heart, title: 'Women Leadership', description: 'Special focus on empowering women in decision-making roles' },
    ],
  };

  return (
    <main>
      <HeroSection program={program} />
      <OverviewSection program={program} />
      <ObjectivesSection objectives={program.objectives} />
      <ImpactSection impact={program.impact} />
      <ActivitiesSection activities={program.activities} />
      <CTASection />
    </main>
  );
}

export default memo(ProgramDetailPage);
