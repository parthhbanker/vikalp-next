import { Metadata } from 'next';
import { FileText, AlertCircle, Scale, Ban, RefreshCw, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions | VIKALP',
  description: 'Terms and Conditions for using VIKALP website and services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/10 rounded-full mb-6">
            <FileText className="w-8 h-8 text-brand" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms and Conditions</h1>
          <p className="text-lg text-muted">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <Section icon={<AlertCircle />} title="Acceptance of Terms">
            <p>By accessing and using the VIKALP website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our Website.</p>
          </Section>

          <Section icon={<Scale />} title="Use of Website">
            <h3>Permitted Use</h3>
            <p>You may use our Website for lawful purposes only. You agree not to violate laws, infringe intellectual property, transmit harmful code, or interfere with the Website.</p>

            <h3>User Accounts</h3>
            <p>You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.</p>
          </Section>

          <Section title="Intellectual Property">
            <p>All content on this Website is the property of VIKALP and is protected by copyright laws. You may not reproduce, distribute, or modify content without our written permission.</p>
          </Section>

          <Section title="Donations">
            <h3>Tax Deductibility</h3>
            <p>Donations to VIKALP may be tax-deductible. We will provide receipts for all donations. Consult a tax professional for your specific situation.</p>

            <h3>Refund Policy</h3>
            <p>All donations are final and non-refundable unless required by law. Contact us at <a href="mailto:finance@vikalp.org" className="text-brand hover:underline">finance@vikalp.org</a> for donation errors.</p>

            <h3>Use of Donations</h3>
            <p>Donations support VIKALP's programs and operations. We reserve the right to allocate funds where most needed unless specified by the donor.</p>
          </Section>

          <Section icon={<Ban />} title="Disclaimer of Warranties">
            <p>The Website is provided "as is" without warranties. VIKALP does not warrant uninterrupted service, error-free operation, or accuracy of information.</p>
          </Section>

          <Section title="Limitation of Liability">
            <p>VIKALP shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Website.</p>
          </Section>

          <Section title="Privacy">
            <p>Your use is governed by our <a href="/privacy-policy" className="text-brand hover:underline">Privacy Policy</a>. Please review it to understand our practices.</p>
          </Section>

          <Section title="Governing Law">
            <p>These Terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Gujarat, India.</p>
          </Section>

          <Section icon={<RefreshCw />} title="Changes to Terms">
            <p>We reserve the right to modify these Terms at any time. Changes are effective immediately upon posting. Continued use constitutes acceptance.</p>
          </Section>

          <Section icon={<Mail />} title="Contact Information">
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
