'use client';

import { memo, useState } from 'react';
import { Button, Input, Select, TextArea } from '@/components/ui';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { trackFormSubmit } from '@/lib/analytics';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function GetInTouchSectionComponent() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'volunteer', label: 'Volunteer Interest' },
    { value: 'donation', label: 'Donation Query' },
    { value: 'media', label: 'Media & Press' },
    { value: 'other', label: 'Other' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Track form submission
    trackFormSubmit('contact_form', {
      subject: formData.subject,
      has_phone: !!formData.phone,
    });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you! Your message has been sent. We will get back to you soon.');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="get-in-touch" className="py-16 md:py-24 bg-gradient-to-b from-white to-surface-secondary">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-4">
            Contact Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              <p className="text-muted leading-relaxed mb-8">
                Reach out to us for any inquiries about our programs, partnerships, or volunteer opportunities.
              </p>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center">
                <MapPin size={24} className="text-brand" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Address</h4>
                <p className="text-muted leading-relaxed">
                  C-206 PNTC, TOI Press Road,
                  <br />
                  Vejalpur, Ahmedabad,
                  <br />
                  Gujarat 380015, India
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center">
                <Phone size={24} className="text-brand" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                <a
                  href="tel:+919824385725"
                  className="text-muted hover:text-brand transition-colors duration-200"
                >
                  +91 98243 85725
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center">
                <Mail size={24} className="text-brand" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Email</h4>
                <a
                  href="mailto:info@vikalp.org"
                  className="text-muted hover:text-brand transition-colors duration-200"
                >
                  info@vikalp.org
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center">
                <Clock size={24} className="text-brand" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Hours</h4>
                <p className="text-muted">Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-white rounded-xl shadow-lg p-8 border border-border transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  error={errors.firstName}
                  trackingName="contact_form_first_name"
                  enableTracking
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  error={errors.lastName}
                  trackingName="contact_form_last_name"
                  enableTracking
                />
              </div>

              {/* Email */}
              <Input
                icon={Mail}
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
                error={errors.email}
                trackingName="contact_form_email"
                enableTracking
              />

              {/* Phone */}
              <Input
                icon={Phone}
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
                error={errors.phone}
                trackingName="contact_form_phone"
                enableTracking
              />

              {/* Subject */}
              <Select
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                options={subjectOptions}
                required
                error={errors.subject}
                trackingName="contact_form_subject"
                enableTracking
              />

              {/* Message */}
              <TextArea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your inquiry..."
                rows={5}
                required
                error={errors.message}
                trackingName="contact_form_message"
                enableTracking
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                trackingName="contact_form_submit"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export const GetInTouchSection = memo(GetInTouchSectionComponent);
