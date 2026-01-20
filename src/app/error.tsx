'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
          Something Went Wrong
        </h1>
        
        <p className="text-lg sm:text-xl text-muted mb-8 max-w-xl mx-auto">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" onClick={reset} trackingName="error_try_again">
            <RefreshCw size={20} className="mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg" trackingName="error_home">
              <Home size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
