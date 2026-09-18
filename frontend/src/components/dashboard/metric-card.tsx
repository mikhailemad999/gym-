'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

export function MetricCard({
  label,
  value,
  suffix,
  subtitle,
  icon: Icon,
  trend,
  className,
}: MetricCardProps) {
  return (
    <motion.div
      className={cn(
        'p-5 rounded-[14px] border transition-all duration-150',
        'hover:translate-y-[-4px]',
        className,
      )}
      style={{
        backgroundColor: 'var(--color-surface-card)',
        borderColor: 'var(--color-border-subtle)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[11px] font-semibold tracking-[0.06em] uppercase"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {label}
        </span>
        {Icon && (
          <Icon size={16} style={{ color: 'var(--color-text-muted)' }} />
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5">
        <span
          className="text-[36px] font-bold tracking-tight leading-none"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {value}
        </span>
        {suffix && (
          <span
            className="text-[14px] font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {suffix}
          </span>
        )}
      </div>

      {/* Subtitle / Trend */}
      {(subtitle || trend) && (
        <div className="mt-2 flex items-center gap-2">
          {trend && (
            <span
              className="text-[12px] font-semibold"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}{' '}
              {trend.value}
            </span>
          )}
          {subtitle && (
            <span
              className="text-[12px]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
