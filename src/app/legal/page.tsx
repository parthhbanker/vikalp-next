'use client';

import { memo, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FileText, Download, ExternalLink, Shield, Award, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui';
import { trackButtonClick } from '@/lib/analytics';

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand/5 via-white to-brand/10 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
            Legal <span className="text-brand">Documents</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Comprehensive policies ensuring ethical governance, transparency, and accountability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-brand mb-2">6+</div>
            <div className="text-sm text-muted">Documents</div>
          </div>
          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-brand mb-2">4</div>
            <div className="text-sm text-muted">UN Accreditations</div>
          </div>
          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-brand mb-2">2002</div>
            <div className="text-sm text-muted">Established</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [activeTab, setActiveTab] = useState('policies');

  const tabs = [
    { id: 'policies', label: 'Policies', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'certifications', label: 'UN Certifications', icon: Award },
    { id: 'reports', label: 'Annual Reports', icon: FileCheck },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-wrap gap-4 mb-12 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  trackButtonClick(`legal_tab_${tab.id}`);
                }}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-brand border-brand'
                    : 'text-muted border-transparent hover:text-foreground'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'policies' && <PoliciesContent />}
          {activeTab === 'documents' && <DocumentsContent />}
          {activeTab === 'certifications' && <CertificationsContent />}
          {activeTab === 'reports' && <ReportsContent />}
        </div>
      </div>
    </section>
  );
}

function PoliciesContent() {
  const policies = [
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      type: 'HTML Page',
      action: 'View Policy',
      href: '/privacy-policy',
    },
    {
      title: 'POSH Policy',
      description: 'Prevention of Sexual Harassment - Safe workplace for all',
      type: 'PDF Download',
      action: 'Download PDF',
      href: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {policies.map((policy, index) => (
        <div
          key={policy.title}
          className="bg-white border-2 border-border rounded-xl p-6 hover:border-brand/30 hover:shadow-lg transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-brand" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">{policy.title}</h3>
              <p className="text-muted mb-4">{policy.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{policy.type}</span>
                <a href={policy.href} onClick={() => trackButtonClick(`policy_${policy.title.toLowerCase().replace(/\s+/g, '_')}`)}>
                  <Button variant="outline" size="sm">
                    {policy.action}
                    {policy.type.includes('HTML') ? <ExternalLink size={16} className="ml-2" /> : <Download size={16} className="ml-2" />}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DocumentsContent() {
  const documents = [
    {
      title: 'Registration Certificate',
      subtitle: 'Public Trust Act, India',
      number: 'E/15763/Ahmedabad',
      year: '2002',
      description: 'Official registration under the Public Trust Act, Government of India',
    },
    {
      title: '12A Registration',
      subtitle: 'Tax Exemption Certificate',
      number: 'Active Status',
      description: 'Certificate of registration under Section 12A of the Income Tax Act',
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">Official Documents & Certificates</h3>
      <p className="text-muted mb-8">Legal registrations and tax certificates demonstrating our credibility</p>
      
      <div className="space-y-6">
        {documents.map((doc) => (
          <div key={doc.title} className="bg-gradient-to-br from-brand/5 to-brand/10 border-2 border-brand/20 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-bold text-foreground">{doc.title}</h4>
                  <span className="px-3 py-1 bg-brand/20 text-brand text-xs font-semibold rounded-full">
                    {doc.subtitle}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-2xl font-bold text-brand">{doc.number}</span>
                  {doc.year && <span className="text-lg text-muted">{doc.year}</span>}
                </div>
                <p className="text-muted">{doc.description}</p>
              </div>
              <Button variant="primary" size="md" onClick={() => trackButtonClick(`document_${doc.title.toLowerCase().replace(/\s+/g, '_')}`)}>
                <Download size={18} className="mr-2" />
                Download Certificate
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsContent() {
  const certifications = [
    {
      title: 'UNFCCC',
      subtitle: 'UN Framework Convention on Climate Change',
      status: 'Observer Organization Status',
      focus: 'Climate Action & Advocacy',
      year: '2015',
    },
    {
      title: 'UNCCD',
      subtitle: 'UN Convention to Combat Desertification',
      status: 'Observer Organization Status',
      focus: 'Land Degradation & Restoration',
      year: '2011',
    },
    {
      title: 'CBD',
      subtitle: 'Convention on Biological Diversity',
      status: 'Observer Organization Status',
      focus: 'Biodiversity Conservation',
      year: '2012',
    },
    {
      title: 'UN ECOSOC',
      subtitle: 'UN Economic and Social Council',
      status: 'Special Consultative Status',
      focus: 'Sustainable Development',
      year: '2015',
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">United Nations Accreditations</h3>
      <p className="text-muted mb-8">Official accreditation with UN bodies demonstrating our global recognition</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div key={cert.title} className="bg-white border-2 border-border rounded-xl p-6 hover:border-brand/30 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand/70 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-foreground mb-1">{cert.title}</h4>
                <p className="text-sm text-muted mb-2">{cert.subtitle}</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  {cert.status}
                </span>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Focus Area:</span>
                <span className="font-semibold text-foreground">{cert.focus}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Accredited Since:</span>
                <span className="font-semibold text-brand">{cert.year}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={() => trackButtonClick(`certification_${cert.title.toLowerCase().replace(/\s+/g, '_')}`)}>
              <Download size={16} className="mr-2" />
              Download Certificate
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsContent() {
  const reports = [
    { year: '2023-24', title: 'Annual Report & Financial Statements' },
    { year: '2022-23', title: 'Annual Report & Financial Statements' },
    { year: '2021-22', title: 'Annual Report & Financial Statements' },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">Annual Reports</h3>
      <p className="text-muted mb-8">Comprehensive annual reports and financial statements demonstrating our impact</p>
      
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.year} className="bg-white border-2 border-border rounded-xl p-6 hover:border-brand/30 hover:shadow-lg transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-8 h-8 text-brand" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-1">{report.year}</h4>
                  <p className="text-muted">{report.title}</p>
                </div>
              </div>
              <Button variant="primary" size="md" onClick={() => trackButtonClick(`report_${report.year}`)}>
                <Download size={18} className="mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegalPage() {
  return (
    <main>
      <HeroSection />
      <TabsSection />
    </main>
  );
}

export default memo(LegalPage);
