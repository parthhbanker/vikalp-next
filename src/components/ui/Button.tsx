import { ButtonHTMLAttributes, forwardRef } from 'react';
import { type LucideIcon } from 'lucide-react';
import { trackButtonClick } from '@/lib/analytics';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button visual variants
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /**
   * Button sizes
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Full width button
   */
  fullWidth?: boolean;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Icon to display before text (React element or Lucide icon component)
   */
  iconBefore?: React.ReactNode;
  /**
   * Icon to display after text (React element or Lucide icon component)
   */
  iconAfter?: React.ReactNode;
  /**
   * Lucide icon component to display before text
   */
  icon?: LucideIcon;
  /**
   * Size of Lucide icons
   */
  iconSize?: number;
  /**
   * Analytics tracking name (optional) - if provided, button clicks will be automatically tracked
   */
  trackingName?: string;
  /**
   * Additional data to send with the tracking event
   */
  trackingData?: Record<string, any>;
}

/**
 * Button Component
 *
 * Enterprise-grade button component with clean, professional styling.
 * Follows WCAG 2.1 AA standards with proper focus management and keyboard navigation.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      iconBefore,
      iconAfter,
      icon,
      iconSize,
      trackingName,
      trackingData,
      children,
      className = '',
      disabled,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    // Handle click with optional analytics tracking
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (trackingName) {
        trackButtonClick(trackingName, {
          variant,
          size,
          ...trackingData,
        });
      }
      onClick?.(e);
    };
    // Base styles - always applied
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-lg
      transition-all duration-150 ease-in-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      select-none
      touch-manipulation
    `;

    // Enterprise-grade variant styles - clean and professional
    const variantStyles = {
      primary: `
        bg-brand text-white
        hover:bg-brand-dark
        active:bg-brand-dark
        shadow-sm hover:shadow
        focus-visible:ring-brand
      `,
      secondary: `
        bg-white text-foreground
        border border-border
        hover:bg-surface-secondary hover:border-border-strong
        active:bg-surface-secondary
        shadow-sm
        focus-visible:ring-border-strong
      `,
      outline: `
        bg-transparent text-brand
        border border-brand
        hover:bg-brand/5 hover:border-brand-dark
        active:bg-brand/10
        focus-visible:ring-brand
      `,
      ghost: `
        bg-transparent text-foreground
        hover:bg-surface-secondary
        active:bg-border
        focus-visible:ring-border-strong
      `,
      danger: `
        bg-error text-white
        hover:bg-[hsl(0,70%,45%)]
        active:bg-[hsl(0,70%,40%)]
        shadow-sm hover:shadow
        focus-visible:ring-error
      `,
    };

    // Size styles
    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 min-h-[36px]',
      md: 'text-base px-4 py-2 min-h-[44px]',
      lg: 'text-base px-6 py-2.5 min-h-[48px]',
    };

    // Icon size based on button size
    const defaultIconSize = iconSize || (size === 'sm' ? 16 : size === 'lg' ? 20 : 18);

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    // Render Lucide icon if provided
    const IconComponent = icon;
    const lucideIcon = IconComponent ? <IconComponent size={defaultIconSize} strokeWidth={2} /> : null;

    // Loading spinner
    const LoadingSpinner = () => (
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={handleClick}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${widthStyles}
          ${className}
        `}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {(lucideIcon || iconBefore) && (
              <span className="shrink-0 flex items-center">{lucideIcon || iconBefore}</span>
            )}
            {children}
            {iconAfter && <span className="shrink-0 flex items-center">{iconAfter}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
