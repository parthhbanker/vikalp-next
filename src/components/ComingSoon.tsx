'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowLeft, Clock } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
}

function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand/5 via-white to-brand/10">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-24 h-24 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Clock className="w-12 h-12 text-brand" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          {title}
        </h1>
        
        <p className="text-lg sm:text-xl text-muted mb-8 max-w-xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg" trackingName="coming_soon_home">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" trackingName="coming_soon_contact">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default memo(ComingSoon);
