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
              <a href={`mailto:${member.email}`} className="flex-1">
                <Button variant="primary" size="md" className="w-full">
                  <Mail size={18} className="mr-2" />
                  Email
                </Button>
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className="flex-1">
                <Button variant="outline" size="md" className="w-full">
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
    { icon: <Users size={32} strokeWidth={2} />, value: '3', label: 'Board Members' },
    { icon: <Briefcase size={32} strokeWidth={2} />, value: '3', label: 'Management Team' },
    { icon: <UserCog size={32} strokeWidth={2} />, value: '50+', label: 'Staff Members' },
    { icon: <Heart size={32} strokeWidth={2} />, value: '50+', label: 'Volunteers' },
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
      role: 'Managing Director',
      description: 'Managing Director of VIKALP, overseeing all organizational operations.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      email: 'himanshu@vikalp.org',
      phone: '+91 98765 43210',
      linkedin: '#',
      facebook: '#',
      twitter: '#',
      about: 'Himanshu Banker is the Managing Director of VIKALP with over 20 years of experience in sustainable development and community empowerment. He leads the organization\'s strategic vision and oversees all operations.',
      education: ['MBA in Sustainability Management, Yale University', 'B.Tech in Environmental Engineering, IIT Delhi'],
      experience: ['20+ years in sustainable development sector', 'Former consultant at UNDP and World Bank', 'Led multiple climate action projects across South Asia'],
      expertise: ['Climate Change', 'Community Development', 'Policy Advocacy', 'Strategic Planning'],
    },
    {
      name: 'Mahesh Pandya',
      role: 'Trustee',
      description: 'Trustee of VIKALP, contributing to governance and strategic oversight.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      email: 'mahesh@vikalp.org',
      phone: '+91 98765 43211',
      linkedin: '#',
      instagram: '#',
      about: 'Mahesh Pandya brings extensive experience in environmental conservation and grassroots activism. As a trustee, he provides strategic guidance on biodiversity and conservation initiatives.',
      education: ['M.Sc. in Environmental Science, Gujarat University', 'B.Sc. in Botany, M.S. University'],
      experience: ['30+ years in environmental activism', 'Founder of multiple conservation NGOs', 'Advisor to Gujarat State Biodiversity Board'],
      expertise: ['Biodiversity Conservation', 'Environmental Law', 'Grassroots Mobilization'],
    },
    {
      name: 'Lila Chaudhari',
      role: 'Trustee',
      description: 'Trustee of VIKALP, contributing to governance and strategic oversight.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      email: 'lila@vikalp.org',
      phone: '+91 98765 43212',
      linkedin: '#',
      facebook: '#',
      about: 'Lila Chaudhari is a social entrepreneur and women\'s rights advocate with deep expertise in rural development. She champions women\'s empowerment and sustainable livelihoods at VIKALP.',
      education: ['MA in Social Work, Tata Institute of Social Sciences', 'BA in Sociology, Delhi University'],
      experience: ['25+ years in rural development and women empowerment', 'Former director at women\'s cooperative federation', 'Recipient of Nari Shakti Puraskar'],
      expertise: ['Women Empowerment', 'Rural Development', 'Social Entrepreneurship', 'Microfinance'],
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
      name: 'Rajesh Kumar',
      role: 'Operations Manager',
      description: 'Managing day-to-day operations and organizational efficiency.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      email: 'rajesh@vikalp.org',
      phone: '+91 98765 43213',
      linkedin: '#',
      twitter: '#',
      about: 'Rajesh Kumar oversees all operational aspects of VIKALP, ensuring smooth execution of programs and efficient resource management across all field locations.',
      education: ['MBA in Operations Management, IIM Ahmedabad', 'B.E. in Mechanical Engineering, NIT Surat'],
      experience: ['15+ years in operations and project management', 'Former operations head at international NGO', 'Certified Project Management Professional (PMP)'],
      expertise: ['Operations Management', 'Project Planning', 'Resource Optimization', 'Team Leadership'],
    },
    {
      name: 'Priya Patel',
      role: 'Program Director',
      description: 'Overseeing program development and implementation strategies.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      email: 'priya@vikalp.org',
      phone: '+91 98765 43214',
      linkedin: '#',
      instagram: '#',
      about: 'Priya Patel leads program design and implementation at VIKALP, focusing on innovative approaches to sustainable agriculture and community development.',
      education: ['M.Sc. in Rural Development, IRMA', 'B.Sc. in Agriculture, Anand Agricultural University'],
      experience: ['12+ years in program management and rural development', 'Designed award-winning agroforestry programs', 'Expert in participatory development approaches'],
      expertise: ['Program Design', 'Sustainable Agriculture', 'Community Engagement', 'Impact Assessment'],
    },
    {
      name: 'Amit Shah',
      role: 'Finance Director',
      description: 'Leading financial planning, budgeting, and resource management.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      email: 'amit@vikalp.org',
      phone: '+91 98765 43215',
      linkedin: '#',
      facebook: '#',
      about: 'Amit Shah manages all financial operations at VIKALP, ensuring transparency, compliance, and optimal utilization of resources to maximize program impact.',
      education: ['CA (Chartered Accountant), ICAI', 'B.Com, Gujarat University'],
      experience: ['18+ years in financial management for NGOs', 'Former finance manager at international development organization', 'Expert in donor compliance and reporting'],
      expertise: ['Financial Management', 'Budgeting & Forecasting', 'Donor Compliance', 'Audit & Taxation'],
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
    { name: 'Sneha Desai', role: 'Field Coordinator', description: 'Coordinating field operations and community programs.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Kiran Mehta', role: 'Communications Officer', description: 'Managing communications and stakeholder engagement.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop' },
    { name: 'Ravi Sharma', role: 'Training Specialist', description: 'Conducting farmer training and capacity building.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
    { name: 'Anjali Joshi', role: 'Monitoring & Evaluation', description: 'Tracking program impact and data analysis.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { name: 'Vikram Patel', role: 'Agriculture Expert', description: 'Providing technical guidance on sustainable farming.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
    { name: 'Meera Singh', role: 'Community Mobilizer', description: 'Building community relationships and engagement.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
    { name: 'Rahul Verma', role: 'Project Coordinator', description: 'Managing project timelines and deliverables.', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop' },
    { name: 'Pooja Nair', role: 'Research Analyst', description: 'Conducting research and impact assessments.', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop' },
    { name: 'Suresh Kumar', role: 'Logistics Manager', description: 'Handling logistics and supply chain operations.', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop' },
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
            <div className="text-5xl md:text-6xl font-bold text-brand mb-4">50+</div>
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
