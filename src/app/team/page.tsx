'use client';

import { memo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Users, Briefcase, UserCog, Heart, Mail, Linkedin, ArrowRight, Phone, X, Facebook, Twitter, Instagram } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  education?: string[];
  experience?: string[];
  about?: string;
  expertise?: string[];
}

function TeamMemberModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (member.email) {
      navigator.clipboard.writeText(member.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      trackButtonClick(`team_modal_copy_email_${member.name.toLowerCase().replace(/\s+/g, '_')}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{member.name}</h2>
            <p className="text-brand font-semibold">{member.role}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-secondary rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-6">
            <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-brand/10 to-brand/5">
              <Image src={member.image} alt={member.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
              <p className="text-brand font-semibold mb-3">{member.role}</p>
              <div className="flex gap-2 flex-wrap">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="p-2 rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all">
                    <Mail size={18} />
                  </a>
                )}
                {member.phone && (
                  <a href={`tel:${member.phone}`} className="p-2 rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all">
                    <Phone size={18} />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all">
                    <Linkedin size={18} />
                  </a>
                )}
                {member.facebook && (
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all">
                    <Facebook size={18} />
                  </a>
                )}
                {member.twitter && (
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all">
                    <Twitter size={18} />
                  </a>
                )}
                {member.instagram && (
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-brand/10 text-brand hover:bg-brand hover:text-white transition-all">
                    <Instagram size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {member.about && (
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">About</h4>
              <p className="text-muted leading-relaxed">{member.about}</p>
            </div>
          )}

          {member.education && member.education.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">Education</h4>
              <ul className="list-disc list-inside space-y-1 text-muted">
                {member.education.map((edu, i) => <li key={i}>{edu}</li>)}
              </ul>
            </div>
          )}

          {member.experience && member.experience.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">Experience</h4>
              <ul className="list-disc list-inside space-y-1 text-muted">
                {member.experience.map((exp, i) => <li key={i}>{exp}</li>)}
              </ul>
            </div>
          )}

          {member.expertise && member.expertise.length > 0 && (
            <div>
              <h4 className="text-lg font-bold text-foreground mb-2">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((exp, i) => (
                  <span key={i} className="px-3 py-1 bg-brand/10 text-brand rounded-full text-sm font-medium">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {member.email && (
              <div className="flex-1">
                <Button variant="primary" size="md" className="w-full" onClick={handleCopyEmail} trackingName={`team_modal_copy_email_${member.name.toLowerCase().replace(/\s+/g, '_')}`}>
                  <Mail size={18} className="mr-2" />
                  {copiedEmail ? 'Email Copied!' : 'Copy Email'}
                </Button>
                {copiedEmail && (
                  <p className="text-xs text-green-600 text-center mt-2">Email copied to clipboard!</p>
                )}
              </div>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className="flex-1">
                <Button variant="outline" size="md" className="w-full" trackingName={`team_modal_call_${member.name.toLowerCase().replace(/\s+/g, '_')}`}>
                  <Phone size={18} className="mr-2" />
                  Call
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const stats = [
    { icon: <Users size={32} strokeWidth={2} />, value: '5', label: 'Board Members' },
    { icon: <Briefcase size={32} strokeWidth={2} />, value: '2', label: 'Management Team' },
    { icon: <UserCog size={32} strokeWidth={2} />, value: '16', label: 'Staff Members' },
    { icon: <Heart size={32} strokeWidth={2} />, value: '3', label: 'Volunteers' },
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
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
            Meet Our <span className="text-brand">Team</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Dedicated professionals working towards a sustainable future for communities and the environment.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-2 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-700 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <div className="text-brand">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm md:text-base text-muted text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoardSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const board: TeamMember[] = [
    {
      name: 'Himanshu Banker',
      role: 'Managing Trustee',
      description: 'Managing Trustee of VIKALP, overseeing all organizational operations.',
      image: 'https://ui-avatars.com/api/?name=Himanshu+Banker&size=400&background=22c55e&color=fff&bold=true',
      email: 'md@vikalp.org',
      phone: '+91 98243 85725',
      about: 'Himanshu Banker is the Managing Trustee of VIKALP with over 20 years of experience in sustainable development and community empowerment.',
      education: ['Environmental Management'],
      experience: ['20+ years in sustainable development sector', 'Leading climate action projects across Gujarat'],
      expertise: ['Climate Change', 'Community Development', 'Strategic Planning'],
    },
    {
      name: 'Falguni Joshi',
      role: 'Trustee',
      description: 'Trustee of VIKALP, contributing to governance and strategic oversight.',
      image: 'https://ui-avatars.com/api/?name=Falguni+Joshi&size=400&background=22c55e&color=fff&bold=true',
      about: 'Falguni Joshi brings expertise in organizational governance and community development.',
      education: ['Social Work'],
      experience: ['Experience in NGO governance', 'Community development initiatives'],
      expertise: ['Governance', 'Community Engagement'],
    },
    {
      name: 'Mahesh Pandya',
      role: 'Trustee',
      description: 'Trustee of VIKALP, contributing to governance and strategic oversight.',
      image: 'https://ui-avatars.com/api/?name=Mahesh+Pandya&size=400&background=22c55e&color=fff&bold=true',
      about: 'Mahesh Pandya brings extensive experience in environmental conservation and grassroots activism.',
      education: ['Environmental Science'],
      experience: ['30+ years in environmental activism', 'Conservation initiatives'],
      expertise: ['Biodiversity Conservation', 'Environmental Law'],
    },
    {
      name: 'Vikesh Chauhan',
      role: 'Trustee',
      description: 'Trustee of VIKALP, contributing to governance and strategic oversight.',
      image: 'https://ui-avatars.com/api/?name=Vikesh+Chauhan&size=400&background=22c55e&color=fff&bold=true',
      about: 'Vikesh Chauhan provides strategic guidance on rural development and agricultural initiatives.',
      education: ['Rural Development'],
      experience: ['Experience in rural development', 'Agricultural programs'],
      expertise: ['Rural Development', 'Agriculture'],
    },
    {
      name: 'Leelaben Chaudhari',
      role: 'Trustee',
      description: 'Trustee of VIKALP, contributing to governance and strategic oversight.',
      image: 'https://ui-avatars.com/api/?name=Leelaben+Chaudhari&size=400&background=22c55e&color=fff&bold=true',
      about: 'Leelaben Chaudhari is a social advocate with expertise in women empowerment and community development.',
      education: ['Social Work'],
      experience: ['Experience in women empowerment', 'Community development'],
      expertise: ['Women Empowerment', 'Community Development'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Board Members</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Leadership guiding our mission and strategic direction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {board.map((member, index) => (
            <div
              key={member.name}
              onClick={() => setSelectedMember(member)}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
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
                <p className="text-muted leading-relaxed mb-4">{member.description}</p>
                <div className="text-brand font-medium text-sm">Click to view profile →</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMember && <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </section>
  );
}

function ManagementSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const management: TeamMember[] = [
    {
      name: 'Hitesh Katad',
      role: 'Legal & Finance Manager',
      description: 'Managing legal and financial operations, compliance, and audits.',
      image: 'https://ui-avatars.com/api/?name=Hitesh+Katad&size=400&background=22c55e&color=fff&bold=true',
      email: 'finance@vikalp.org',
      about: 'Hitesh Katad manages all legal and financial operations at VIKALP, maintaining financial records, monitoring funds, verifying donations, and coordinating with external auditors for statutory compliance.',
      education: ['Bachelor of Arts (B.A.)'],
      experience: ['Nearly 20 years of experience working with NGOs since 2005', 'Worked with Pragati Prayas Kendra, SWATI, BAAG, Ashray Foundation', 'Expert in financial record-keeping, fund tracking, and audit coordination'],
      expertise: ['Financial Management', 'Legal Compliance', 'Audit Coordination', 'Fund Monitoring'],
    },
    {
      name: 'Parth Banker',
      role: 'Digital Operations Manager',
      description: 'Managing website, social media, and digital monitoring systems.',
      image: 'https://ui-avatars.com/api/?name=Parth+Banker&size=400&background=22c55e&color=fff&bold=true',
      email: 'parth@vikalp.org',
      about: 'Parth Banker manages digital operations at VIKALP, including website management, social media, project reporting, and digital monitoring of afforestation data.',
      education: ['B.Sc. IT (Software Development)'],
      experience: ['Working with NGOs since 2023', 'IT experience since 2021', 'Managing VIKALP website and social media', 'Digital data monitoring for afforestation projects'],
      expertise: ['Website Management', 'Social Media', 'Digital Monitoring', 'Project Reporting'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Management Team</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Experienced leaders driving organizational excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {management.map((member, index) => (
            <div
              key={member.name}
              onClick={() => setSelectedMember(member)}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
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
                <p className="text-muted leading-relaxed mb-4">{member.description}</p>
                <div className="text-brand font-medium text-sm">Click to view profile →</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMember && <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </section>
  );
}

function StaffSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [visibleCount, setVisibleCount] = useState(6);

  const staff = [
    { name: 'Jahersingh Gamit', role: 'Field Coordinator', description: 'Coordinating field operations and community programs.', image: 'https://ui-avatars.com/api/?name=Jahersingh+Gamit&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Sudina Valvi', role: 'Field Coordinator', description: 'Coordinating field operations and community programs.', image: 'https://ui-avatars.com/api/?name=Sudina+Valvi&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Sunanda Palva', role: 'Field Coordinator', description: 'Coordinating field operations and community programs.', image: 'https://ui-avatars.com/api/?name=Sunanda+Palva&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Ashwin Gamit', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Ashwin+Gamit&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Chhaya Vasave', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Chhaya+Vasave&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Jharana Chaudhari', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Jharana+Chaudhari&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Jyotsna Chaudhari', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Jyotsna+Chaudhari&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Krishna Bhil', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Krishna+Bhil&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Lila Rathod', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Lila+Rathod&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Manesh Padvi', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Manesh+Padvi&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Manoj Patel', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Manoj+Patel&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Rajendra Rathod', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Rajendra+Rathod&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Raju Vasava', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Raju+Vasava&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Sunil Konkani', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Sunil+Konkani&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Sunil Thorat', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Sunil+Thorat&size=400&background=22c55e&color=fff&bold=true' },
    { name: 'Yogita Gamit', role: 'Field Executive', description: 'Implementing field programs and community engagement.', image: 'https://ui-avatars.com/api/?name=Yogita+Gamit&size=400&background=22c55e&color=fff&bold=true' },
  ];

  const displayedStaff = staff.slice(0, visibleCount);
  const hasMore = visibleCount < staff.length;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Staff</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Dedicated team members implementing our programs on the ground
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedStaff.map((member, index) => (
            <div
              key={member.name}
              className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-brand/10 to-brand/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-brand font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-sm text-muted leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        {staff.length > 6 && (
          <div className="text-center flex gap-4 justify-center">
            {hasMore && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setVisibleCount(prev => prev + 6);
                  trackButtonClick('team_staff_load_more');
                }}
                trackingName="team_staff_load_more_button"
              >
                Load More
              </Button>
            )}
            {visibleCount > 6 && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setVisibleCount(6);
                  trackButtonClick('team_staff_show_less');
                }}
                trackingName="team_staff_show_less_button"
              >
                Show Less
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function VolunteersSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Volunteers</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Passionate individuals contributing their time and skills to our mission
          </p>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-3xl mx-auto">
            <div className="text-5xl md:text-6xl font-bold text-brand mb-4">3</div>
            <p className="text-xl text-foreground font-semibold mb-3">Active Volunteers</p>
            <p className="text-muted leading-relaxed mb-6">
              Our volunteers play a crucial role in program implementation, community outreach, and capacity building initiatives across Gujarat.
            </p>
            <Link href="/volunteer" onClick={() => trackButtonClick('team_page_volunteer')}>
              <Button variant="primary" size="lg" trackingName="team_page_volunteer_button">
                Become a Volunteer
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Our Team
          </h2>
          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
            Interested in working with us? We're always looking for passionate individuals to join our mission.
          </p>
          <Link href="/careers" onClick={() => trackButtonClick('team_page_careers')}>
            <Button variant="primary" size="lg" trackingName="team_page_careers_button">
              View Career Opportunities
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <main>
      <HeroSection />
      <BoardSection />
      <ManagementSection />
      <StaffSection />
      <VolunteersSection />
      <CTASection />
    </main>
  );
}

export default memo(TeamPage);
