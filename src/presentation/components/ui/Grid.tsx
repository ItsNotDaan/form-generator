import React from 'react';

interface SimpleGridProps {
  children: React.ReactNode;
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  spacing?: number;
  className?: string;
}

export const SimpleGrid = React.memo<SimpleGridProps>(
  ({children, columns = {base: 1}, spacing = 4, className = ''}) => {
    // Build responsive grid class string
    const gridCols: string[] = [];
    
    if (columns.base !== undefined) {
      gridCols.push(`grid-cols-${columns.base}`);
    }
    if (columns.sm !== undefined) {
      gridCols.push(`sm:grid-cols-${columns.sm}`);
    }
    if (columns.md !== undefined) {
      gridCols.push(`md:grid-cols-${columns.md}`);
    }
    if (columns.lg !== undefined) {
      gridCols.push(`lg:grid-cols-${columns.lg}`);
    }
    if (columns.xl !== undefined) {
      gridCols.push(`xl:grid-cols-${columns.xl}`);
    }

    const gapClass = `gap-${spacing}`;

    return (
      <div className={`grid ${gridCols.join(' ')} ${gapClass} ${className}`}>
        {children}
      </div>
    );
  }
);

SimpleGrid.displayName = 'SimpleGrid';
