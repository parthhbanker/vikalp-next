'use client';

import { memo, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { trackButtonClick } from '@/lib/analytics';
import { Leaf, Users, Target, Award, Heart, Lightbulb, BookOpen, Handshake, Scale, Shield, Globe, CheckCircle, MessageCircle, Sprout, Network, GraduationCap, BarChart3, Layers, UserPlus, DollarSign, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

function HeroSection() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <Image
        src="/about.png"
        alt="VIKALP - Growing the Future Together"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
          About VIKALP
        </h1>
        <p className="text-xl md:text-2xl animate-fade-in-up animation-delay-200">
          Creating Alternatives for Sustainable Communities
        </p>
      </div>
    </section>
  );
}

function StorySection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Our Story</h2>
          <div className="space-y-6 text-lg text-muted leading-relaxed">
            <p>
              <strong className="text-foreground">VIKALP</strong> (an alternative) is a voluntary organization working in Gujarat 380015, India with Indigenous and Deprived Communities on Sustainable Development Goals (SDGs), Climate Change, Agroforestry & Biodiversity, Natural Resource Management as well as Women Empowerment and Sustainable Livelihood.
            </p>
            <p>
              Registered in 2002 under Public Trust Act, India (Registration No. E/15763/Ahmedabad), VIKALP has been at the forefront of community-based sustainable development for over two decades.
            </p>
            <p>
              Our work focuses on empowering indigenous communities through regenerative agriculture, biodiversity conservation, and sustainable livelihood programs that create lasting positive impact on both people and the planet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className={`bg-white p-8 rounded-2xl shadow-lg transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-brand" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted leading-relaxed">
              To empower indigenous and marginalized communities through sustainable development initiatives, promoting environmental conservation, climate resilience, and social equity while preserving traditional knowledge and cultural heritage.
            </p>
          </div>

          <div className={`bg-white p-8 rounded-2xl shadow-lg transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8 text-brand" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-lg text-muted leading-relaxed">
              A world where communities live in harmony with nature, enjoying dignified livelihoods, food security, and environmental sustainability, while actively participating in global efforts to combat climate change and protect biodiversity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const values = [
    { icon: Users, title: 'Community-Centered', description: 'Putting communities first' },
    { icon: Leaf, title: 'Sustainability', description: 'For future generations' },
    { icon: Scale, title: 'Equity & Justice', description: 'Fair and inclusive' },
    { icon: Handshake, title: 'Collaboration', description: 'Working together' },
    { icon: Lightbulb, title: 'Innovation', description: 'Creative solutions' },
    { icon: Award, title: 'Integrity', description: 'Transparent & honest' },
    { icon: BookOpen, title: 'Knowledge', description: 'Traditional & modern' },
    { icon: Heart, title: 'Compassion', description: 'Care for all beings' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            The principles that guide our work and define our commitment to communities and nature.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <value.icon className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const approaches = [
    { icon: MessageCircle, title: 'Community Participation', description: 'Engaging communities in decision-making and implementation, ensuring ownership and sustainability of initiatives.' },
    { icon: Sprout, title: 'Traditional Knowledge', description: 'Integrating indigenous wisdom with modern science for culturally appropriate and effective solutions.' },
    { icon: Network, title: 'Collaborative Partnerships', description: 'Working with governments, NGOs, and international bodies to amplify our impact and reach.' },
    { icon: GraduationCap, title: 'Capacity Building', description: 'Providing training, resources, and support to strengthen local capabilities and leadership.' },
    { icon: BarChart3, title: 'Evidence-Based', description: 'Using research, monitoring, and evaluation to inform our strategies and demonstrate results.' },
    { icon: Layers, title: 'Holistic Solutions', description: 'Addressing environmental, social, and economic dimensions together for lasting change.' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Approach</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            How we create sustainable impact in communities and ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approaches.map((approach, index) => (
            <div
              key={approach.title}
              className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                <approach.icon className="w-7 h-7 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{approach.title}</h3>
              <p className="text-muted leading-relaxed">{approach.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { value: 422924, label: 'Trees Planted', suffix: '+', description: 'Fruit, Forestry & Native' },
    { value: 5000, label: 'Women Farmers', suffix: '+', description: 'Connected & Empowered' },
    { value: 150, label: 'Villages Impacted', suffix: '+', description: 'Across South Gujarat' },
    { value: 15, label: 'Traditional Varieties', suffix: '+', description: 'Revived' },
    { value: 20, label: 'Income Increase', suffix: '%+', description: 'For Farmers' },
    { value: 3, label: 'Biodiversity Sites', suffix: '+', description: '4,000+ trees each' },
    { value: 2, label: 'Miyawaki Forests', suffix: '+', description: '155+ species' },
    { value: 24, label: 'Years of Service', suffix: '+', description: 'Since 2002' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            23 years of dedicated service to the environment and communities
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
      className={`text-center p-6 bg-gradient-to-br from-brand/5 to-brand/10 rounded-xl transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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

function AccreditationsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const accreditations = [
    { icon: <Globe size={36} strokeWidth={2} />, title: 'UN ECOSOC', subtitle: 'Special Consultative Status', year: '2015' },
    { icon: <Shield size={36} strokeWidth={2} />, title: 'UNFCCC', subtitle: 'Official Accreditation', year: '2009' },
    { icon: <Award size={36} strokeWidth={2} />, title: 'UNCCD', subtitle: 'Observer Organization', year: '2011' },
    { icon: <Shield size={36} strokeWidth={2} />, title: 'CBD', subtitle: 'Biodiversity Convention', year: '2012' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-4">
            Recognized & Trusted
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            UN Accreditations
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Officially recognized by the United Nations for our commitment to sustainable development
            and impactful work with vulnerable communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {accreditations.map((acc, index) => (
            <div
              key={acc.title}
              className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 p-6 border-2 border-brand/20 hover:border-brand/50 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand to-brand/70 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">{acc.icon}</div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle size={16} className="text-white" fill="currentColor" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{acc.title}</h3>
                <p className="text-sm text-muted mb-2">{acc.subtitle}</p>
                <span className="inline-flex items-center px-3 py-1 bg-brand/10 text-brand text-xs font-semibold rounded-full">
                  Since {acc.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={`bg-gradient-to-r from-brand/5 to-brand/10 rounded-xl p-8 md:p-10 text-center border border-brand/20 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-brand mb-2">20+</div>
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

function TeamSection() {
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

  const team = [
    {
      name: 'Himanshu Banker',
      role: 'Managing Director',
      description: 'Managing Director of VIKALP, overseeing all organizational operations and strategic initiatives.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    },
    {
      name: 'Mahesh Pandya',
      role: 'Trustee',
      description: 'Trustee of VIKALP, contributing to governance and strategic oversight.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
    {
      name: 'Lila Chaudhari',
      role: 'Trustee',
      description: 'Trustee of VIKALP, contributing to governance and strategic oversight.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
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
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted max-w-2xl">
              Dedicated professionals working towards a sustainable future
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => {
                scroll('left');
                trackButtonClick('about_team_scroll_left');
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
                trackButtonClick('about_team_scroll_right');
              }}
              disabled={!canScrollRight}
              className="p-3 rounded-full bg-white border-2 border-border hover:border-brand hover:bg-brand hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-border disabled:hover:text-foreground"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

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
          {team.map((member) => (
            <div
              key={member.name}
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-brand/10 to-brand/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-brand font-semibold mb-3">{member.role}</p>
                <p className="text-muted leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/team" onClick={() => trackButtonClick('about_team_view_all')}>
            <Button variant="outline" size="lg" trackingName="about_team_view_all_button">
              Meet the Full Team
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const actions = [
    {
      icon: UserPlus,
      title: 'Volunteer With Us',
      description: 'Join our team and make a direct impact in communities',
      href: '/volunteer',
      color: 'from-green-500 to-brand',
    },
    {
      icon: DollarSign,
      title: 'Support Our Work',
      description: 'Help us expand our reach and deepen our impact',
      href: '/donate',
      color: 'from-brand to-green-600',
    },
    {
      icon: Target,
      title: 'View Our Programs',
      description: 'Explore our initiatives and find partnership opportunities',
      href: '/programs',
      color: 'from-green-600 to-green-700',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-surface-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(34,197,94,0.05),transparent_50%)]" />
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            Whether through volunteering, partnership, or support, there are many ways to contribute to our mission of building a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {actions.map((action, index) => (
            <Link
              key={action.title}
              href={action.href}
              onClick={() => trackButtonClick(`about_cta_${action.title.toLowerCase().replace(/\s+/g, '_')}`)}
              className={`group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-brand/30 h-full">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <action.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand transition-colors">
                  {action.title}
                </h3>
                <p className="text-muted mb-6 leading-relaxed">
                  {action.description}
                </p>
                <div className="flex items-center gap-2 text-brand font-medium group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <MissionVisionSection />
      <ValuesSection />
      <ApproachSection />
      <ImpactSection />
      <AccreditationsSection />
      <TeamSection />
      <CTASection />
    </main>
  );
}

export default memo(AboutPage);
