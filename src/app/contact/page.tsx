'use client';

import { memo, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Input, TextArea, Button, Select } from '@/components/ui';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
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
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
            Get in <span className="text-brand">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'volunteer', label: 'Volunteer Interest' },
    { value: 'donation', label: 'Donation Query' },
    { value: 'media', label: 'Media & Press' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Send us a Message</h2>
            <p className="text-lg text-muted mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  required
                  trackingName="contact_form_first_name"
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  required
                  trackingName="contact_form_last_name"
                />
              </div>

              <Input
                icon={Mail}
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                required
                trackingName="contact_form_email"
              />

              <Input
                icon={Phone}
                label="Phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
                trackingName="contact_form_phone"
              />

              <Select
                label="Subject"
                options={subjectOptions}
                required
                trackingName="contact_form_subject"
              />

              <TextArea
                label="Message"
                placeholder="Tell us about your inquiry..."
                rows={5}
                required
                trackingName="contact_form_message"
              />

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => trackButtonClick('contact_form_submit')}
                trackingName="contact_form_submit_button"
              >
                Send Message
              </Button>
            </form>
          </div>

          <div className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Contact Information</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-muted">
                    C-206 PNTC, TOI Press Road,<br />
                    Vejalpur, Ahmedabad,<br />
                    Gujarat 380015, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <a href="tel:+919824385725" className="text-muted hover:text-brand transition-colors">
                    +91 98243 85725
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a href="mailto:info@vikalp.org" className="text-muted hover:text-brand transition-colors">
                    info@vikalp.org
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                  <p className="text-muted">
                    Mon - Fri: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-surface-secondary to-white">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Find Us</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Visit our office in Ahmedabad, Gujarat
          </p>
        </div>

        <div className={`rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.74842653308!2d72.41493025!3d23.020474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="VIKALP Office Location"
          />
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <main>
      <HeroSection />
      <ContactFormSection />
      <MapSection />
    </main>
  );
}

export default memo(ContactPage);
