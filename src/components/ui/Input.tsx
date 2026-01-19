import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { type LucideIcon, Eye, EyeOff } from 'lucide-react';
import { trackFormInteraction } from '@/lib/analytics';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input label
   */
  label?: string;
  /**
   * Helper text displayed below input
   */
  helperText?: string;
  /**
   * Error message (overrides helperText when present)
   */
  error?: string;
  /**
   * Input size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Full width input
   */
  fullWidth?: boolean;
  /**
   * Icon to display before input text (React element or Lucide icon component)
   */
  iconBefore?: React.ReactNode;
  /**
   * Icon to display after input text (React element or Lucide icon component)
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
   * Show password toggle button (only for type="password")
   */
  showPasswordToggle?: boolean;
  /**
   * Optional wrapper class name
   */
  wrapperClassName?: string;
  /**
   * Analytics tracking field name (optional) - if provided, interactions will be automatically tracked
   */
  trackingName?: string;
  /**
   * Enable automatic tracking of form interactions (focus, blur, change)
   */
  enableTracking?: boolean;
}

/**
 * Input Component
 *
 * Accessible input component with labels, helper text, error states, and icons.
 * Follows WCAG 2.1 AA standards with proper labeling and error messaging.
 * Includes password toggle functionality for password inputs.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      iconBefore,
      iconAfter,
      icon,
      iconSize,
      showPasswordToggle = true,
      wrapperClassName = '',
      className = '',
      id,
      disabled,
      required,
      type = 'text',
      trackingName,
      enableTracking = false,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Generate field name for tracking
    const fieldName = trackingName || label || id || 'unknown_field';

    // Handle focus with optional tracking
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (enableTracking || trackingName) {
        trackFormInteraction(fieldName, 'focus');
      }
      onFocus?.(e);
    };

    // Handle blur with optional tracking
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (enableTracking || trackingName) {
        trackFormInteraction(fieldName, 'blur');
      }
      onBlur?.(e);
    };

    // Handle change with optional tracking
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (enableTracking || trackingName) {
        trackFormInteraction(fieldName, 'change', { value_length: e.target.value.length });
      }
      onChange?.(e);
    };

    // Determine actual input type (for password toggle)
    const isPasswordInput = type === 'password';
    const inputType = isPasswordInput && showPassword ? 'text' : type;

    // Generate IDs for accessibility
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    // Icon size based on input size
    const defaultIconSize = iconSize || (size === 'sm' ? 16 : size === 'lg' ? 20 : 18);

    // Render Lucide icon if provided
    const IconComponent = icon;
    const lucideIcon = IconComponent ? <IconComponent size={defaultIconSize} /> : null;

    // Determine if we have an icon before
    const hasIconBefore = !!(lucideIcon || iconBefore);

    // Determine if we have an icon after (considering password toggle)
    const hasPasswordToggle = isPasswordInput && showPasswordToggle;
    const hasIconAfter = !!(iconAfter || hasPasswordToggle);

    // Base input styles
    const baseStyles = `
      w-full rounded-lg border
      transition-all duration-150 ease-in-out
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-secondary
      placeholder:text-foreground-subtle
      touch-manipulation
    `;

    // State-based styles
    const stateStyles = error
      ? `
        border-error text-error
      `
      : `
        border-border text-foreground
        hover:border-border-strong
      `;

    // Size styles
    const sizeStyles = {
      sm: 'text-sm px-3 py-2 min-h-[36px]',
      md: 'text-base px-4 py-2.5 min-h-[44px]',
      lg: 'text-lg px-5 py-3 min-h-[52px]',
    };

    // Icon padding adjustments
    const iconPaddingStyles = {
      before: hasIconBefore
        ? size === 'sm'
          ? 'pl-10'
          : size === 'lg'
          ? 'pl-14'
          : 'pl-12'
        : '',
      after: hasIconAfter
        ? size === 'sm'
          ? 'pr-10'
          : size === 'lg'
          ? 'pr-14'
          : 'pr-12'
        : '',
    };

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    // Label styles
    const labelStyles = `
      block text-sm font-medium mb-1.5
      ${error ? 'text-error' : 'text-foreground'}
      ${disabled ? 'opacity-50' : ''}
    `;

    // Helper text styles
    const helperTextStyles = `
      text-xs mt-1.5
      ${error ? 'text-error' : 'text-foreground-muted'}
      transition-colors duration-200
    `;

    // Icon container styles
    const iconContainerStyles = (position: 'before' | 'after', isClickable = false) => `
      absolute ${position === 'before' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2
      ${size === 'sm' ? 'px-3' : size === 'lg' ? 'px-5' : 'px-4'}
      flex items-center justify-center
      ${isClickable ? 'cursor-pointer pointer-events-auto hover:text-foreground' : 'pointer-events-none'}
      ${error ? 'text-error' : isFocused ? 'text-brand' : 'text-foreground-muted'}
      transition-colors duration-200
      ${isClickable ? 'z-10' : ''}
    `;

    return (
      <div className={`${widthStyles} ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className={labelStyles}>
            {label}
            {required && (
              <span className="text-error ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Icon Before */}
          {hasIconBefore && (
            <div className={iconContainerStyles('before')}>
              {lucideIcon || iconBefore}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            required={required}
            className={`
              ${baseStyles}
              ${stateStyles}
              ${sizeStyles[size]}
              ${iconPaddingStyles.before}
              ${iconPaddingStyles.after}
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? errorId : helperText ? helperTextId : undefined
            }
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* Icon After / Password Toggle */}
          {hasIconAfter && (
            <>
              {hasPasswordToggle ? (
                <button
                  type="button"
                  className={iconContainerStyles('after', true)}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={disabled}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={defaultIconSize} />
                  ) : (
                    <Eye size={defaultIconSize} />
                  )}
                </button>
              ) : (
                <div className={iconContainerStyles('after')}>
                  {iconAfter}
                </div>
              )}
            </>
          )}
        </div>

        {/* Helper Text / Error Message */}
        {(error || helperText) && (
          <p
            id={error ? errorId : helperTextId}
            className={helperTextStyles}
            role={error ? 'alert' : undefined}
            aria-live={error ? 'polite' : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
