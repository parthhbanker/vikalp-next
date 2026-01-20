'use client';

import { memo, useState, useMemo } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FileText, Download, ExternalLink, Shield, Award, FileCheck, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'policies', label: 'Policies', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'accreditations', label: 'Accreditations', icon: Award },
    { id: 'certifications', label: 'UN Certifications', icon: Award },
    { id: 'reports', label: 'Annual Reports', icon: FileCheck },
    { id: 'other', label: 'Other Documents', icon: FileText },
  ];

  const allDocs = useMemo(() => [
    { title: 'Prevention of Sexual Harassment Policy', category: 'policies', file: '/legal/policies/Prevention of Sexual Harassment Policy.pdf', type: 'PDF' },
    { title: 'Child Protection Policy', category: 'policies', file: '/legal/policies/Child Protection Policy Followed by VIKALP.pdf', type: 'PDF' },
    { title: 'Internal Control System Policy', category: 'policies', file: '/legal/policies/Internal Control System Policy.pdf', type: 'PDF' },
    { title: 'Procurement Policy', category: 'policies', file: '/legal/policies/Procurement Policy.pdf', type: 'PDF' },
    { title: 'Trust Registration Certificate', category: 'documents', file: '/legal/documents/Trust Registration Certificate VIKALP.pdf', type: 'PDF' },
    { title: '12A Registration', category: 'documents', file: '/legal/documents/12A VIKALP.pdf', type: 'PDF' },
    { title: '80G Registration', category: 'documents', file: '/legal/documents/80 G VIKALP.pdf', type: 'PDF' },
    { title: 'FCRA Registration', category: 'documents', file: '/legal/documents/FCRA Registration VIKALP.pdf', type: 'PDF' },
    { title: 'CSR Registration', category: 'documents', file: '/legal/documents/CSR Registration VIKALP.pdf', type: 'PDF' },
    { title: 'PAN Card', category: 'documents', file: '/legal/documents/Pan Card VIKALP with letter.pdf', type: 'PDF' },
    { title: 'UNFCCC', category: 'certifications', file: '/legal/un/UNFCCC.pdf', type: 'PDF' },
    { title: 'UNCCD', category: 'certifications', file: '/legal/un/UNCCD.pdf', type: 'PDF' },
    { title: 'CSC Certificate 2016', category: 'other', file: '/legal/others/CSC Certificate VIKALP 2016.pdf', type: 'PDF' },
    { title: 'DARPAN Registration', category: 'other', file: '/legal/others/DARPAN Registsration VIKALP.pdf', type: 'PDF' },
    { title: 'TAN Registration', category: 'other', file: '/legal/others/TAN Registration VIKALP.pdf', type: 'PDF' },
    { title: 'Trust Deed (English - Certified)', category: 'other', file: '/legal/others/Trust Deed VIKALP Eng Certified.pdf', type: 'PDF' },
    { title: 'Trust Deed (Gujarati)', category: 'other', file: '/legal/others/Trust Deed VIKALP Gujarati.pdf', type: 'PDF' },
    { title: 'MoU with GoG 2015 - Agriculture', category: 'other', file: '/legal/others/MoU with GoG 2015 VIKALP Agri.pdf', type: 'PDF' },
    { title: 'MoU with GoG 2015 - Health', category: 'other', file: '/legal/others/MoU with GoG 2015 VIKALP Health.pdf', type: 'PDF' },
    { title: 'List of Trustees 2025', category: 'other', file: '/legal/others/List of Trustee VIKALP 2025.docx', type: 'DOCX' },
    { title: 'PAN Card (Image)', category: 'other', file: '/legal/others/Pan Card VIKALP.jpg', type: 'JPG' },
  ], []);

  const globalFiltered = useMemo(() => {
    if (!searchQuery) return null;
    const q = searchQuery.toLowerCase();
    return allDocs.filter(d => d.title.toLowerCase().includes(q));
  }, [searchQuery, allDocs]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search all documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl focus:border-brand focus:outline-none transition-colors"
              />
            </div>
          </div>

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

          {globalFiltered ? (
            <GlobalSearchResults results={globalFiltered} searchQuery={searchQuery} />
          ) : (
            <>
              {activeTab === 'policies' && <PoliciesContent searchQuery={searchQuery} />}
              {activeTab === 'documents' && <DocumentsContent searchQuery={searchQuery} />}
              {activeTab === 'accreditations' && <AccreditationsContent searchQuery={searchQuery} />}
              {activeTab === 'certifications' && <CertificationsContent searchQuery={searchQuery} />}
              {activeTab === 'reports' && <ReportsContent searchQuery={searchQuery} />}
              {activeTab === 'other' && <OtherDocumentsContent searchQuery={searchQuery} />}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function PoliciesContent({ searchQuery }: { searchQuery: string }) {
  const policies = [
    {
      title: 'Prevention of Sexual Harassment Policy',
      description: 'POSH Policy - Safe workplace for all employees and stakeholders',
      type: 'PDF Download',
      action: 'Download PDF',
      href: '/legal/policies/Prevention of Sexual Harassment Policy.pdf',
    },
    {
      title: 'Child Protection Policy',
      description: 'Comprehensive policy for child safety and protection',
      type: 'PDF Download',
      action: 'Download PDF',
      href: '/legal/policies/Child Protection Policy Followed by VIKALP.pdf',
    },
    {
      title: 'Internal Control System Policy',
      description: 'Framework for organizational governance and controls',
      type: 'PDF Download',
      action: 'Download PDF',
      href: '/legal/policies/Internal Control System Policy.pdf',
    },
    {
      title: 'Procurement Policy',
      description: 'Guidelines for transparent and ethical procurement processes',
      type: 'PDF Download',
      action: 'Download PDF',
      href: '/legal/policies/Procurement Policy.pdf',
    },
  ];

  const filtered = useMemo(() => {
    if (!searchQuery) return policies;
    const q = searchQuery.toLowerCase();
    return policies.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filtered.length === 0 ? (
        <div className="col-span-2 text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-muted">No documents found matching "{searchQuery}"</p>
        </div>
      ) : (
        filtered.map((policy) => (
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
                  <a href={policy.href} target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClick(`policy_${policy.title.toLowerCase().replace(/\s+/g, '_')}`)}>
                    <Button variant="outline" size="sm">
                      {policy.action}
                  {policy.type.includes('PDF') ? <Download size={16} className="ml-2" /> : <ExternalLink size={16} className="ml-2" />}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function DocumentsContent({ searchQuery }: { searchQuery: string }) {
  const documents = [
    {
      title: 'Trust Registration Certificate',
      subtitle: 'Public Trust Act, India',
      number: 'E/15763/Ahmedabad',
      year: '2002',
      description: 'Official registration under the Public Trust Act, Government of India',
      file: '/legal/documents/Trust Registration Certificate VIKALP.pdf',
    },
    {
      title: '12A Registration',
      subtitle: 'Tax Exemption Certificate',
      number: 'Active Status',
      description: 'Certificate of registration under Section 12A of the Income Tax Act',
      file: '/legal/documents/12A VIKALP.pdf',
    },
    {
      title: '80G Registration',
      subtitle: 'Tax Deduction Certificate',
      number: 'Active Status',
      description: 'Certificate for tax deduction under Section 80G of the Income Tax Act',
      file: '/legal/documents/80 G VIKALP.pdf',
    },
    {
      title: 'FCRA Registration',
      subtitle: 'Foreign Contribution Regulation',
      number: 'Active Status',
      description: 'Registration for receiving foreign contributions',
      file: '/legal/documents/FCRA Registration VIKALP.pdf',
    },
    {
      title: 'CSR Registration',
      subtitle: 'Corporate Social Responsibility',
      number: 'Active Status',
      description: 'Registration for CSR activities',
      file: '/legal/documents/CSR Registration VIKALP.pdf',
    },
    {
      title: 'PAN Card',
      subtitle: 'Tax Identification',
      number: 'Active',
      description: 'Permanent Account Number for tax purposes',
      file: '/legal/documents/Pan Card VIKALP with letter.pdf',
    },
  ];

  const filtered = useMemo(() => {
    if (!searchQuery) return documents;
    const q = searchQuery.toLowerCase();
    return documents.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.subtitle.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">Official Documents & Certificates</h3>
      <p className="text-muted mb-8">Legal registrations and tax certificates demonstrating our credibility</p>
      
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-muted">No documents found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((doc) => (
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
                <Button variant="primary" size="md" onClick={() => {
                  trackButtonClick(`document_${doc.title.toLowerCase().replace(/\s+/g, '_')}`);
                  window.open(doc.file, '_blank');
                }}>
                  <Download size={18} className="mr-2" />
                  Download Certificate
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CertificationsContent({ searchQuery }: { searchQuery: string }) {
  const certifications = [
    {
      title: 'UNFCCC',
      subtitle: 'UN Framework Convention on Climate Change',
      status: 'Observer Organization Status',
      focus: 'Climate Action & Advocacy',
      year: '2009',
      file: '/legal/un/UNFCCC.pdf',
    },
    {
      title: 'UNCCD',
      subtitle: 'UN Convention to Combat Desertification',
      status: 'Observer Organization Status',
      focus: 'Land Degradation & Restoration',
      year: '2011',
      file: '/legal/un/UNCCD.pdf',
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

  const filtered = useMemo(() => {
    if (!searchQuery) return certifications;
    const q = searchQuery.toLowerCase();
    return certifications.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.subtitle.toLowerCase().includes(q) ||
      c.focus.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">United Nations Accreditations</h3>
      <p className="text-muted mb-8">Official accreditation with UN bodies demonstrating our global recognition</p>
      
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-muted">No certifications found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((cert) => (
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
              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                trackButtonClick(`certification_${cert.title.toLowerCase().replace(/\s+/g, '_')}`);
                if (cert.file) {
                  window.open(cert.file, '_blank');
                }
              }} disabled={!cert.file}>
                <Download size={16} className="mr-2" />
                {cert.file ? 'Download Certificate' : 'Coming Soon'}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AccreditationsContent({ searchQuery }: { searchQuery: string }) {
  const accreditations: Array<{ title: string; file: string; type: string }> = [
    // Add accreditation files here when available
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">Other Accreditations</h3>
      <p className="text-muted mb-8">Additional certifications and accreditations</p>
      
      {accreditations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Award className="w-16 h-16 text-muted mx-auto mb-4" />
          <p className="text-muted">No accreditations available at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accreditations.map((acc) => (
            <div key={acc.title} className="bg-white border-2 border-border rounded-xl p-6 hover:border-brand/30 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-brand" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground mb-4">{acc.title}</h4>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => {
                    trackButtonClick(`accreditation_${acc.title.toLowerCase().replace(/\s+/g, '_')}`);
                    window.open(acc.file, '_blank');
                  }}>
                    <Download size={16} className="mr-2" />
                    Download {acc.type}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReportsContent({ searchQuery }: { searchQuery: string }) {
  const reports = [
    // Add report files here when available
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">Annual Reports</h3>
      <p className="text-muted mb-8">Comprehensive annual reports and financial statements demonstrating our impact</p>
      
      {reports.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <FileCheck className="w-16 h-16 text-muted mx-auto mb-4" />
          <p className="text-muted">No reports available at the moment</p>
        </div>
      ) : (
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
                <Button variant="primary" size="md" onClick={() => {
                  trackButtonClick(`report_${report.year}`);
                  window.open(report.file, '_blank');
                }}>
                  <Download size={18} className="mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OtherDocumentsContent({ searchQuery }: { searchQuery: string }) {
  const otherDocs = [
    { title: 'CSC Certificate 2016', file: '/legal/others/CSC Certificate VIKALP 2016.pdf', type: 'PDF' },
    { title: 'DARPAN Registration', file: '/legal/others/DARPAN Registsration VIKALP.pdf', type: 'PDF' },
    { title: 'TAN Registration', file: '/legal/others/TAN Registration VIKALP.pdf', type: 'PDF' },
    { title: 'Trust Deed (English - Certified)', file: '/legal/others/Trust Deed VIKALP Eng Certified.pdf', type: 'PDF' },
    { title: 'Trust Deed (Gujarati)', file: '/legal/others/Trust Deed VIKALP Gujarati.pdf', type: 'PDF' },
    { title: 'MoU with GoG 2015 - Agriculture', file: '/legal/others/MoU with GoG 2015 VIKALP Agri.pdf', type: 'PDF' },
    { title: 'MoU with GoG 2015 - Health', file: '/legal/others/MoU with GoG 2015 VIKALP Health.pdf', type: 'PDF' },
    { title: 'List of Trustees 2025', file: '/legal/others/List of Trustee VIKALP 2025.docx', type: 'DOCX' },
    { title: 'PAN Card (Image)', file: '/legal/others/Pan Card VIKALP.jpg', type: 'JPG' },
  ];

  const filtered = useMemo(() => {
    if (!searchQuery) return otherDocs;
    const q = searchQuery.toLowerCase();
    return otherDocs.filter(d => d.title.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">Other Documents</h3>
      <p className="text-muted mb-8">Additional financial statements and audit reports</p>
      
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-muted">No documents found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((doc) => (
            <div key={doc.title} className="bg-white border-2 border-border rounded-xl p-6 hover:border-brand/30 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-brand" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground mb-4">{doc.title}</h4>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => {
                    trackButtonClick(`other_doc_${doc.title.toLowerCase().replace(/\s+/g, '_')}`);
                    window.open(doc.file, '_blank');
                  }}>
                    <Download size={16} className="mr-2" />
                    Download {doc.type}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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

function GlobalSearchResults({ results, searchQuery }: { results: any[], searchQuery: string }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-foreground mb-6">Search Results</h3>
      <p className="text-muted mb-8">Found {results.length} document(s) matching "{searchQuery}"</p>
      
      {results.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-muted">No documents found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((doc) => (
            <div key={doc.file} className="bg-white border-2 border-border rounded-xl p-6 hover:border-brand/30 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-brand" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground mb-4">{doc.title}</h4>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => {
                    trackButtonClick(`search_${doc.title.toLowerCase().replace(/\s+/g, '_')}`);
                    window.open(doc.file, '_blank');
                  }}>
                    <Download size={16} className="mr-2" />
                    Download {doc.type}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
