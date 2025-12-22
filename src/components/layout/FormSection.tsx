import React, {ReactNode} from 'react';

interface FormSectionProps {
  children: ReactNode;
  /**
   * Optional className for additional customization
   * Default spacing is already applied (space-y-6)
   */
  className?: string;
}

/**
 * FormSection wraps form content with standardized spacing
 * Provides consistent vertical rhythm: space-y-6 between major form sections
 *
 * Usage:
 * <FormSection>
 *   <Card>...</Card>
 *   <Card>...</Card>
 * </FormSection>
 */
export const FormSection = ({children, className = ''}: FormSectionProps) => {
  return <div className={`space-y-6 ${className}`}>{children}</div>;
};

interface FormGridProps {
  children: ReactNode;
  /**
   * Number of columns: 1, 2, etc.
   * Default: 1 on mobile, 2 on md breakpoint
   */
  columns?: '1' | '2' | '3';
  className?: string;
}

/**
 * FormGrid provides responsive column layout for form groups
 * Handles left/right sections with consistent spacing
 *
 * Usage:
 * <FormGrid columns="2">
 *   <div>{left content}</div>
 *   <div>{right content}</div>
 * </FormGrid>
 */
export const FormGrid = ({
  children,
  columns = '2',
  className = '',
}: FormGridProps) => {
  const colMap = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid gap-6 ${colMap[columns]} ${className}`}>
      {children}
    </div>
  );
};

interface FormFooterProps {
  children: ReactNode;
  className?: string;
}

/**
 * FormFooter provides standardized styling for form action buttons
 * Handles alignment and spacing for submit/cancel buttons
 *
 * Usage:
 * <FormFooter>
 *   <Button>Cancel</Button>
 *   <Button type="submit">Submit</Button>
 * </FormFooter>
 */
export const FormFooter = ({children, className = ''}: FormFooterProps) => {
  return (
    <div
      className={`flex items-center justify-between pt-6 border-t gap-4 ${className}`}
    >
      {children}
    </div>
  );
};
