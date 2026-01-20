import { Metadata } from 'next';
import { Shield, Mail, Lock, Eye, Database, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | VIKALP',
  description: 'Privacy Policy for VIKALP - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/10 rounded-full mb-6">
            <Shield className="w-8 h-8 text-brand" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <Section icon={<Eye />} title="Introduction">
            <p>VIKALP is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.</p>
          </Section>

          <Section icon={<Database />} title="Information We Collect">
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide when you make a donation, subscribe to our newsletter, contact us, register for events, or apply for positions.</p>
            <p>This may include: name, email address, phone number, mailing address, and payment information.</p>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect: IP address, browser type, pages visited, and referring websites.</p>
          </Section>

          <Section icon={<Lock />} title="How We Use Your Information">
            <p>We use the information to process donations, send newsletters, respond to inquiries, improve our services, comply with legal obligations, and prevent fraud.</p>
          </Section>

          <Section icon={<UserCheck />} title="Information Sharing">
            <p>We do not sell your personal information. We may share information with service providers, when required by law, or with your consent.</p>
          </Section>

          <Section icon={<Shield />} title="Data Security">
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
          </Section>

          <Section icon={<Mail />} title="Your Rights">
            <p>You have the right to access, correct, delete your information, opt-out of marketing, and withdraw consent.</p>
            <p>Contact us at <a href="mailto:md@vikalp.org" className="text-brand hover:underline">md@vikalp.org</a></p>
          </Section>

          <Section title="Contact Us">
            <div className="bg-brand/5 p-6 rounded-lg mt-4">
              <p className="mb-2"><strong>VIKALP</strong></p>
              <p className="mb-2">Email: <a href="mailto:md@vikalp.org" className="text-brand hover:underline">md@vikalp.org</a></p>
              <p className="mb-2">Phone: +91 98243 85725</p>
              <p>Address: Gujarat - 380015, India</p>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-brand">{icon}</div>}
        <h2 className="text-2xl font-bold text-foreground m-0">{title}</h2>
      </div>
      <div className="text-muted">{children}</div>
    </section>
  );
}
