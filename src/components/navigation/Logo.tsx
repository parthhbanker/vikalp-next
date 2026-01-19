'use client';

import { memo, useState } from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

function LogoComponent({ className = '', size = 'md' }: LogoProps) {
  const [imageError, setImageError] = useState(false);
  const logoSrc = '/logo.png';

  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 56, height: 56 },
    xl: { width: 64, height: 64 },
  };

  const { width, height } = sizes[size];

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!imageError && (
        <Image
          src={logoSrc}
          alt="Vikalp Logo"
          width={width}
          height={height}
          priority
          className="object-contain"
          onError={() => {
            setImageError(true);
          }}
        />
      )}
      {/* Fallback element - only shown when image fails */}
      {imageError && (
        <div
          className="absolute inset-0 rounded-full bg-brand flex items-center justify-center text-white font-bold"
          style={{ fontSize: `${width * 0.5}px` }}
        >
          V
        </div>
      )}
    </div>
  );
}

export const Logo = memo(LogoComponent);
