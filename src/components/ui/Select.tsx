import { SelectHTMLAttributes, forwardRef } from 'react';
import { type LucideIcon, ChevronDown } from 'lucide-react';
import { trackFormInteraction } from '@/lib/analytics';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Select label
   */
  label?: string;
  /**
   * Helper text displayed below select
   */
  helperText?: string;
  /**
   * Error message (overrides helperText when present)
   */
  error?: string;
  /**
   * Select size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Full width select
   */
  fullWidth?: boolean;
  /**
   * Lucide icon component to display before text
   */
  icon?: LucideIcon;
  /**
   * Size of Lucide icons
   */
  iconSize?: number;
  /**
   * Optional wrapper class name
   */
  wrapperClassName?: string;
  /**
   * Optional options array (alternative to children)
   */
  options?: Array<{ value: string; label: string }>;
  /**
   * Tracking name for analytics
   */
  trackingName?: string;
  /**
   * Enable analytics tracking
   */
  enableTracking?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      icon: Icon,
      iconSize,
      required,
      disabled,
      className = '',
      wrapperClassName = '',
      options,
      children,
      trackingName,
      enableTracking = false,
      onFocus,
      onBlur,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    // Determine icon size based on input size if not explicitly set
    const getIconSize = () => {
      if (iconSize) return iconSize;
      switch (size) {
        case 'sm':
          return 16;
        case 'lg':
          return 22;
        default:
          return 18;
      }
    };

    const effectiveIconSize = getIconSize();

    // Size classes for select
    const sizeClasses = {
      sm: 'text-sm h-9 py-1.5',
      md: 'text-base h-11 py-2.5',
      lg: 'text-lg h-13 py-3.5',
    };

    // Padding classes based on icon presence
    const paddingClasses = Icon
      ? {
          sm: 'pl-9 pr-10',
          md: 'pl-10 pr-11',
          lg: 'pl-12 pr-12',
        }
      : {
          sm: 'px-3 pr-10',
          md: 'px-4 pr-11',
          lg: 'px-5 pr-12',
        };

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      if (enableTracking && trackingName) {
        trackFormInteraction(trackingName, 'focus');
      }
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      if (enableTracking && trackingName) {
        trackFormInteraction(trackingName, 'blur');
      }
      onBlur?.(e);
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-foreground mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          {/* Icon Before */}
          {Icon && (
            <div
              className={`absolute left-0 top-0 h-full flex items-center pointer-events-none ${
                size === 'sm' ? 'pl-3' : size === 'lg' ? 'pl-4' : 'pl-3.5'
              }`}
            >
              <Icon
                size={effectiveIconSize}
                className={error ? 'text-red-500' : 'text-muted'}
              />
            </div>
          )}

          {/* Select */}
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-label={!label ? props.name || 'Select option' : undefined}
            className={`
              w-full rounded-lg border appearance-none cursor-pointer
              ${sizeClasses[size]}
              ${paddingClasses[size]}
              ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                  : 'border-border focus:border-brand focus:ring-brand/20'
              }
              ${
                disabled
                  ? 'bg-surface-secondary text-muted cursor-not-allowed'
                  : 'bg-white text-foreground'
              }
              focus:outline-none focus:ring-4
              transition-all duration-200
              ${className}
            `}
            {...props}
          >
            {options
              ? options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              : children}
          </select>

          {/* Chevron Icon */}
          <div
            className={`absolute right-0 top-0 h-full flex items-center pointer-events-none ${
              size === 'sm' ? 'pr-3' : size === 'lg' ? 'pr-4' : 'pr-3.5'
            }`}
          >
            <ChevronDown
              size={effectiveIconSize}
              className={error ? 'text-red-500' : 'text-muted'}
            />
          </div>
        </div>

        {/* Helper Text / Error */}
        {(helperText || error) && (
          <p
            className={`mt-1.5 text-sm ${
              error ? 'text-red-500' : 'text-muted'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
