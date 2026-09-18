'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2',
      'font-semibold tracking-wide rounded-[10px]',
      'transition-all duration-150',
      'focus-visible:outline-none focus-visible:ring-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-[0.98]',
    );

    const variantStyles: Record<string, string> = {
      primary: '',
      secondary: '',
      ghost: '',
      outline: '',
      destructive: '',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'h-8 px-3 text-[12px]',
      md: 'h-10 px-5 text-[13px]',
      lg: 'h-12 px-7 text-[14px]',
      icon: 'h-10 w-10 text-[14px]',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || isLoading}
        style={{
          backgroundColor:
            variant === 'primary'
              ? 'var(--color-button-primary-bg)'
              : variant === 'secondary'
                ? 'var(--color-button-secondary-bg)'
                : variant === 'ghost'
                  ? 'transparent'
                  : variant === 'outline'
                    ? 'transparent'
                    : '#ef4444',
          color:
            variant === 'primary'
              ? 'var(--color-button-primary-text)'
              : variant === 'secondary'
                ? 'var(--color-button-secondary-text)'
                : variant === 'destructive'
                  ? '#ffffff'
                  : 'var(--color-text-primary)',
          border:
            variant === 'outline' || variant === 'secondary'
              ? '1px solid var(--color-border-medium)'
              : variant === 'ghost'
                ? 'none'
                : '1px solid transparent',
        }}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
