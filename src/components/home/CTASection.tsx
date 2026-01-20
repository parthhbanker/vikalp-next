'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Heart, HandHeart, Users, ArrowRight } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  trackingName: string;
  variant?: 'primary' | 'outline';
}

function ActionCard({
  icon,
  title,
  description,
  buttonText,
  buttonHref,
  trackingName,
  variant = 'outline',
}: ActionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-border hover:border-brand/30">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand/10 flex items-center justify-center mb-4 text-brand [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted mb-6 leading-relaxed">{description}</p>
        <Link
          href={buttonHref}
          onClick={() => trackButtonClick(trackingName)}
          className="w-full"
        >
          <Button variant={variant} size="lg" fullWidth trackingName={trackingName}>
            {buttonText}
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function CTASectionComponent() {
  const actions: ActionCardProps[] = [
    {
      icon: <Heart size={32} strokeWidth={2} />,
      title: 'Donate',
      description:
        'Your contribution directly supports climate action, women empowerment, and sustainable livelihoods for indigenous communities.',
      buttonText: 'Make a Donation',
      buttonHref: '/donate',
      trackingName: 'cta_donate',
      variant: 'primary',
    },
    {
      icon: <HandHeart size={32} strokeWidth={2} />,
      title: 'Volunteer',
      description:
        'Join our mission on the ground. Share your skills and time to make a meaningful difference in rural Gujarat.',
      buttonText: 'Become a Volunteer',
      buttonHref: '/volunteer',
      trackingName: 'cta_volunteer',
    },
    {
      icon: <Users size={32} strokeWidth={2} />,
      title: 'Partner',
      description:
        'Collaborate with us to scale impact. We welcome partnerships with organizations, institutions, and corporates.',
      buttonText: 'Partner With Us',
      buttonHref: '/contact',
      trackingName: 'cta_partner',
    },
  ];

  return (
    <section id="get-involved" className="py-16 md:py-24 bg-gradient-to-br from-brand/5 via-white to-brand/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get Involved
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Together, we can create lasting change. Choose how you'd like to support our mission
            and empower communities across Gujarat.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {actions.map((action) => (
            <ActionCard key={action.title} {...action} />
          ))}
        </div>

        {/* Additional Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted mb-4">Have questions or want to learn more?</p>
          <Link href="/contact" onClick={() => trackButtonClick('cta_contact')}>
            <Button variant="ghost" size="md" trackingName="cta_contact_button">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export const CTASection = memo(CTASectionComponent);
