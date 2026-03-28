import { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/utilsCN';

/* ── Table Root ──────────────────────────────── */
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped' | 'bordered';
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ variant = 'default', className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          'w-full caption-bottom text-sm',
          'border-collapse',
          variant === 'bordered' && 'border border-(--color-border)',
          className
        )}
        data-variant={variant}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

/* ── Table Header ────────────────────────────── */
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-(--color-bg-secondary)',
      '[&_tr]:border-b [&_tr]:border-(--color-border)',
      className
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

/* ── Table Body ──────────────────────────────── */
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      '[&_tr:last-child]:border-0',
      '[&[data-variant="striped"]_tr:nth-child(even)]:bg-(--color-bg-secondary)',
      className
    )}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

/* ── Table Row ───────────────────────────────── */
export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-(--color-border)',
      'transition-colors duration-150',
      'hover:bg-(--color-surface-hover)',
      'data-[state=selected]:bg-(--color-brand-light)',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

/* ── Table Head Cell ─────────────────────────── */
export const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-4 text-left align-middle',
      'font-semibold text-(--color-text-secondary) text-xs uppercase tracking-wider',
      '[&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

/* ── Table Data Cell ─────────────────────────── */
export const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'px-4 py-3 align-middle',
      'text-(--color-text)',
      '[&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

/* ── Table Footer ────────────────────────────── */
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-(--color-border)',
      'bg-(--color-bg-secondary)',
      'font-medium',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';
