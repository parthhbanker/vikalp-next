'use client';

import { memo } from 'react';
import { Sprout, ArrowRight } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';

function AfforestationBannerComponent() {
  return (
    <div className="relative bg-gradient-to-r from-brand-dark via-brand to-brand-dark text-white overflow-hidden">
      {/* Subtle moving dot pattern, consistent with other section backdrops */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-2.5 sm:py-3 text-center">
          <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 shrink-0">
            <Sprout size={15} strokeWidth={2.25} aria-hidden="true" />
          </span>
          <p className="text-sm sm:text-base font-medium leading-snug">
            <span className="font-bold">2026 Afforestation Drive</span> begins{' '}
            <span className="font-bold">7th July</span> &mdash; help us gift 70,000 trees this season.
          </p>
          <a
            href="#afforestation-drive"
            onClick={() => trackButtonClick('afforestation_banner_cta')}
            className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-2 decoration-white/50 hover:decoration-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand rounded-sm"
          >
            Join the Drive
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

export const AfforestationBanner = memo(AfforestationBannerComponent);
