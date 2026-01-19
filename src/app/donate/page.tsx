'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { Button } from '@/components/ui';
import { TreeDeciduous, Users, MapPin, Calendar, Shield, Heart, GraduationCap, Leaf, Check, CreditCard, Building2, Globe, Mail, ArrowRight, PieChart, FileText, TrendingUp, Copy } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';

function HeroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { value: 422924, suffix: '+', label: 'Trees Planted' },
    { value: 5000, suffix: '+', label: 'Women Farmers' },
    { value: 150, suffix: '+', label: 'Villages Impacted' },
    { value: 23, suffix: '+', label: 'Years of Service' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-brand/5 via-white to-brand/10 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
            Support Our <span className="text-brand">Mission</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
            Your contribution helps us plant more trees, empower communities, and create lasting environmental impact. Together, we can build a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button variant="primary" size="lg" onClick={() => {
              trackButtonClick('hero_donate_now');
              window.open('https://pages.razorpay.com/pl_LXR167LW8A3lBt/view', '_blank');
            }}>
              Donate Now
            </Button>
            <Link href="/impact">
              <Button variant="outline" size="lg" trackingName="hero_see_impact">
                See Our Impact
              </Button>
            </Link>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, suffix, label, isVisible, index }: { value: number; suffix: string; label: string; isVisible: boolean; index: number }) {
  const count = useCounterAnimation(value, 2000, isVisible);

  return (
    <div
      className={`text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-brand mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted">{label}</div>
    </div>
  );
}

function WhyDonateSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const reasons = [
    {
      icon: Shield,
      title: 'Environmental Protection',
      description: 'Your donation helps us plant native trees, restore degraded lands, and protect biodiversity hotspots across Gujarat.',
    },
    {
      icon: Users,
      title: 'Community Empowerment',
      description: 'We train farmers in sustainable practices, empower women through livelihood programs, and strengthen indigenous communities.',
    },
    {
      icon: GraduationCap,
      title: 'Climate Education',
      description: 'We educate youth and communities about climate change, sustainable living, and environmental conservation practices.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Your Donation Matters</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Every contribution, no matter the size, creates ripples of positive change in communities and ecosystems across Gujarat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`bg-gradient-to-br from-brand/5 to-brand/10 p-8 rounded-2xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mb-6">
                <reason.icon className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
              <p className="text-muted leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonationPackagesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const packages = [
    {
      amount: '₹500',
      title: 'Plant 10 Trees',
      description: 'Help us plant and nurture 10 native tree saplings that will grow for decades.',
      features: ['10 native tree saplings', 'Planting & care for 2 years', 'Community involvement'],
      popular: false,
    },
    {
      amount: '₹1,000',
      title: 'Farmer Training',
      description: 'Support comprehensive training for one farmer in sustainable agriculture practices.',
      features: ['3-day training workshop', 'Training materials', 'Follow-up support'],
      popular: true,
    },
    {
      amount: '₹5,000',
      title: 'Community Workshop',
      description: 'Organize a village-level workshop on climate resilience and sustainable practices.',
      features: ['Full-day workshop', 'Reach 50+ community members', 'Materials & refreshments'],
      popular: false,
    },
    {
      amount: '₹10,000',
      title: 'Program Sponsor',
      description: 'Become a program sponsor and make a major impact on our environmental initiatives.',
      features: ['Support entire program', 'Recognition in reports', 'Impact updates'],
      popular: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your Donation in Action</h2>
          <p className="text-lg text-muted">See the tangible impact your contribution makes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div
              key={pkg.title}
              className={`relative bg-white rounded-2xl p-6 border-2 ${
                pkg.popular ? 'border-brand shadow-2xl' : 'border-border shadow-lg'
              } hover:shadow-2xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand text-white text-sm font-semibold rounded-full">
                  Popular
                </div>
              )}
              <div className="text-3xl font-bold text-brand mb-2">{pkg.amount}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{pkg.title}</h3>
              <p className="text-muted mb-6">{pkg.description}</p>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="w-5 h-5 text-brand flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={pkg.popular ? 'primary' : 'outline'} size="md" className="w-full" onClick={() => {
                trackButtonClick(`donate_package_${pkg.amount}`);
                window.open('https://pages.razorpay.com/pl_LXR167LW8A3lBt/view', '_blank');
              }}>
                Donate {pkg.amount}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaymentMethodsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const methods = [
    {
      icon: CreditCard,
      title: 'Online Payment',
      subtitle: 'Quick & Secure',
      description: 'Make a secure online donation using Credit/Debit Card, UPI, or Net Banking through our payment partner.',
      features: ['All major credit/debit cards accepted', 'UPI (Google Pay, PhonePe, Paytm)', 'Net Banking from any bank', 'Instant 80G tax receipt'],
      buttonText: 'Donate Online',
      buttonSubtext: 'Powered by Razorpay - Safe & Secure',
    },
    {
      icon: Building2,
      title: 'Bank Transfer',
      subtitle: 'Direct Transfer',
      description: 'Transfer directly to our bank account. Please email us at info@vikalp.org with transfer details for your 80G receipt.',
      details: [
        { label: 'Account Name:', value: 'VIKALP' },
        { label: 'Account Number:', value: '1234567890' },
        { label: 'Bank Name:', value: 'State Bank of India' },
        { label: 'IFSC Code:', value: 'SBIN0123456' },
        { label: 'Branch:', value: 'Ahmedabad' },
      ],
    },
    {
      icon: Globe,
      title: 'International Donations',
      subtitle: 'From Outside India',
      description: 'We accept international donations via bank transfer. Please contact us for SWIFT code and international banking details.',
      features: ['SWIFT/Wire transfer accepted', 'FCRA registered organization', 'Tax benefits as per your country'],
      buttonText: 'Contact for Details',
    },
    {
      icon: Mail,
      title: 'Check / Draft',
      subtitle: 'By Post',
      description: "Send a check or demand draft payable to 'VIKALP' at the address below. Please include your contact details for the 80G receipt.",
      address: {
        title: 'Mail To:',
        lines: ['VIKALP', 'C-206 PNTC, TOI Press Road, Vejalpur, Ahmedabad', 'Gujarat - 380051', 'India'],
        note: 'Please make checks payable to: VIKALP',
      },
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ways to Donate</h2>
          <p className="text-lg text-muted">Choose the donation method that works best for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methods.map((method, index) => (
            <div
              key={method.title}
              className={`bg-white border-2 border-border rounded-2xl p-6 hover:border-brand/30 hover:shadow-lg transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <method.icon className="w-7 h-7 text-brand" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{method.title}</h3>
                  <p className="text-sm text-brand font-semibold">{method.subtitle}</p>
                </div>
              </div>
              <p className="text-muted mb-4">{method.description}</p>

              {method.features && (
                <ul className="space-y-2 mb-4">
                  {method.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="w-5 h-5 text-brand flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {method.details && (
                <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-lg p-4 mb-4 space-y-2">
                  {method.details.map((detail) => (
                    <div key={detail.label} className="flex justify-between items-center text-sm">
                      <span className="text-muted">{detail.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{detail.value}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(detail.value);
                            setCopiedField(detail.label);
                            setTimeout(() => setCopiedField(null), 2000);
                            trackButtonClick(`copy_${detail.label.toLowerCase().replace(/[:\s]+/g, '_')}`);
                          }}
                          className="p-1 hover:bg-brand/20 rounded transition-all"
                          title="Copy to clipboard"
                        >
                          {copiedField === detail.label ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-brand" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                  {copiedField && (
                    <p className="text-xs text-green-600 text-center mt-2">Copied to clipboard!</p>
                  )}
                </div>
              )}

              {method.address && (
                <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-foreground mb-2">{method.address.title}</p>
                  {method.address.lines.map((line, i) => (
                    <p key={i} className="text-sm text-muted">{line}</p>
                  ))}
                  <p className="text-sm text-muted mt-3 italic">{method.address.note}</p>
                </div>
              )}

              {method.buttonText && (
                <div>
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="w-full" 
                    onClick={() => {
                      trackButtonClick(`donate_method_${method.title.toLowerCase().replace(/\s+/g, '_')}`);
                      if (method.title === 'Online Payment') {
                        window.open('https://pages.razorpay.com/pl_LXR167LW8A3lBt/view', '_blank');
                      }
                    }}
                  >
                    {method.buttonText}
                  </Button>
                  {method.buttonSubtext && (
                    <p className="text-xs text-muted text-center mt-2">{method.buttonSubtext}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TaxBenefitsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">80G Tax Benefits</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Your donations to VIKALP are eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-brand/20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h3 className="text-2xl font-bold text-foreground mb-4">Tax Deduction</h3>
            <p className="text-muted mb-6">Get 50% tax deduction on your donation amount under Section 80G.</p>
            <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-lg p-6">
              <p className="text-sm text-muted mb-4">Example:</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground">Donation:</span>
                  <span className="font-bold text-foreground">₹10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Tax Deduction:</span>
                  <span className="font-bold text-brand">₹5,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-brand/20 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className="text-2xl font-bold text-foreground mb-4">Instant Receipt</h3>
            <p className="text-muted mb-6">Receive your 80G certificate instantly via email for online donations.</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <span className="text-muted">Valid PAN required</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <span className="text-muted">Emailed within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <span className="text-muted">Use for ITR filing</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`text-center mt-8 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-sm text-muted">
            80G Registration Number: <span className="font-semibold text-foreground">AAATV1234F</span> | 
            Valid from: <span className="font-semibold text-foreground">01/04/2023</span> | 
            Valid till: <span className="font-semibold text-foreground">Perpetual</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function TransparencySection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Commitment to Transparency</h2>
          <p className="text-lg text-muted">How We Use Your Donations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-2xl p-8">
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-foreground">Program Activities</span>
                    <span className="font-bold text-brand">75%</span>
                  </div>
                  <div className="h-3 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-brand" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-foreground">Administrative</span>
                    <span className="font-bold text-brand">15%</span>
                  </div>
                  <div className="h-3 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-brand/70" style={{ width: '15%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-foreground">Fundraising</span>
                    <span className="font-bold text-brand">10%</span>
                  </div>
                  <div className="h-3 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-brand/50" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Promise</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-brand flex-shrink-0" />
                <span className="text-muted">75% of donations directly fund programs</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-brand flex-shrink-0" />
                <span className="text-muted">Annual audited financial reports</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-brand flex-shrink-0" />
                <span className="text-muted">Regular impact updates to donors</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-brand flex-shrink-0" />
                <span className="text-muted">Full transparency and accountability</span>
              </li>
            </ul>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/legal">
                <Button variant="outline" size="md" className="w-full" trackingName="donate_view_reports">
                  <FileText size={18} className="mr-2" />
                  Annual Reports
                </Button>
              </Link>
              <Link href="/impact">
                <Button variant="outline" size="md" className="w-full" trackingName="donate_view_impact">
                  <TrendingUp size={18} className="mr-2" />
                  Impact Metrics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const actions = [
    {
      icon: Heart,
      title: 'Make a Donation',
      description: 'Support our programs with a one-time or recurring contribution',
      color: 'from-green-500 to-brand',
      action: 'Donate Now',
      onClick: () => {
        trackButtonClick('cta_make_donation');
        window.open('https://pages.razorpay.com/pl_LXR167LW8A3lBt/view', '_blank');
      },
    },
    {
      icon: Mail,
      title: 'Have Questions?',
      description: 'Get in touch with our team for any donation-related queries',
      color: 'from-brand to-green-600',
      action: 'Contact Us',
      href: '/contact',
    },
    {
      icon: FileText,
      title: 'View Impact Reports',
      description: 'See how your donations create real change in communities',
      color: 'from-green-600 to-green-700',
      action: 'View Reports',
      href: '/legal',
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
            Make a Difference Today
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            Every contribution, big or small, helps us create a greener, more sustainable future for Gujarat and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const content = (
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-brand/30 h-full">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand transition-colors">
                  {action.title}
                </h3>
                <p className="text-muted mb-6 leading-relaxed">
                  {action.description}
                </p>
                <div className="flex items-center gap-2 text-brand font-medium group-hover:gap-3 transition-all">
                  {action.action}
                  <ArrowRight size={18} />
                </div>
              </div>
            );

            if (action.href) {
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  onClick={() => trackButtonClick(`cta_${action.title.toLowerCase().replace(/\s+/g, '_')}`)}
                  className={`group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={action.title}
                className={`group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <button onClick={action.onClick} className="w-full text-left">
                  {content}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DonatePage() {
  return (
    <main>
      <HeroSection />
      <WhyDonateSection />
      <DonationPackagesSection />
      <PaymentMethodsSection />
      <TaxBenefitsSection />
      <TransparencySection />
      <CTASection />
    </main>
  );
}

export default memo(DonatePage);
