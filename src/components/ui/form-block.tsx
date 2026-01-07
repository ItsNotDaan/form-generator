import React, {ReactNode, useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {cn} from '@/lib/utils';

// ============================================================================
// FormCard - De wrapper om hele secties (zoals "Digitaal")
// ============================================================================
interface FormCardProps {
  title: string;
  description?: string;
  children?: ReactNode;

  // Toggle/Slider voor de hele card
  toggleAble?: boolean;
  toggleLabel?: string;
  toggleId?: string;
  defaultOpen?: boolean;
  onToggleChange?: (isOpen: boolean) => void;

  // Center title option
  centerTitle?: boolean;

  // Content class
  contentClassName?: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  title,
  description,
  children,
  toggleAble = false,
  toggleLabel,
  toggleId = 'toggle',
  defaultOpen = false,
  onToggleChange,
  centerTitle,
  contentClassName,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const handleToggleChange = (checked: boolean) => {
    setIsOpen(checked);
    onToggleChange?.(checked);
  };

  // Als toggleAble=false, staat hij altijd open
  const showContent = !toggleAble || isOpen;

  // centerTitle is false by default when toggleAble is true, otherwise true (unless explicitly set)
  const effectiveCenterTitle =
    centerTitle !== undefined ? centerTitle : !toggleAble;

  return (
    <Card>
      <CardHeader
        className={cn(
          'flex flex-row items-center justify-between',
          effectiveCenterTitle && 'justify-center',
        )}
      >
        <div
          className={cn(
            'flex flex-col gap-2',
            effectiveCenterTitle && 'items-center text-center',
          )}
        >
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {toggleAble && toggleLabel && (
          <div className="flex items-center gap-3">
            <Label htmlFor={toggleId} className="text-sm text-muted-foreground">
              {toggleLabel}
            </Label>
            <Switch
              id={toggleId}
              checked={isOpen}
              onCheckedChange={handleToggleChange}
            />
          </div>
        )}
      </CardHeader>
      {showContent && (
        <CardContent className={cn('space-y-4', contentClassName)}>
          {children}
        </CardContent>
      )}
    </Card>
  );
};

// ============================================================================
// FormBlock - De grid layout (Hielheffing, Radio groups, etc.)
// ============================================================================
interface FormBlockProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;

  // Layout Controls
  columns?: 1 | 2 | 3 | 4;
  responsive?: boolean;

  // Styling Controls
  dividers?: boolean;
  hoverEffect?: boolean;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';

  // Center title option
  centerTitle?: boolean;

  className?: string;
  contentClassName?: string;
}

export const FormBlock = ({
  children,
  title,
  subtitle,
  action,
  columns = 1,
  responsive = true,
  dividers = false,
  hoverEffect = true,
  alignItems = 'center',
  centerTitle = true,
  className,
  contentClassName,
}: FormBlockProps) => {
  // FIX voor de TypeScript error: Record<number, string>
  const gridCols: Record<number, string> = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  };

  const dividerClasses = dividers
    ? cn(
        'divide-y-2 divide-primary! lg:divide-y-0',
        columns > 1 && 'lg:divide-x-2',
      )
    : '';

  return (
    <div
      className={cn(
        'flex flex-col justify-items-stretch border rounded-lg p-2 bg-secondary/2 shadow-sm',
        hoverEffect && 'hover:border-primary!',
        columns === 1 && 'items-center',
        className,
      )}
    >
      {(title || action) && (
        <div
          className={cn(
            'flex items-center mb-2 px-2',
            // Als action bestaat, gebruik justify-between, anders justify-center of start op basis van centerTitle
            action
              ? 'justify-between'
              : centerTitle
                ? 'justify-center'
                : 'justify-start',
          )}
        >
          {/* Titel Container */}
          <div className={cn(centerTitle && !action && 'text-center')}>
            {title && (
              <Label
                className={cn('text-base font-semibold', !subtitle && 'mb-0')}
              >
                {title}
              </Label>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Action Container (altijd rechts) */}
          {action && <div className="flex items-center gap-3">{action}</div>}
        </div>
      )}

      <div
        className={cn(
          'grid w-full',
          dividers ? '*:py-4 lg:*:py-0 *:px-0 lg:*:px-4' : 'gap-3',
          dividers && 'gap-0', // Geen gap als dividers aan staan
          responsive ? 'grid-cols-1' : '',
          gridCols[columns], // <--- Werkt nu correct
          dividerClasses,
          alignItems === 'center' && 'items-center',
          alignItems === 'start' && 'items-start',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// FormItemWrapper - Wrapper voor individuele inputs
// ============================================================================
interface FormItemWrapperProps {
  children: ReactNode;
  className?: string;
  centerTitle?: boolean;
  centerItems?: boolean;
  label?: React.ReactNode;
  requiredLabel?: boolean;
}

export const FormItemWrapper = ({
  children,
  className,
  centerTitle = true,
  centerItems = true,
  label,
  requiredLabel = false,
}: FormItemWrapperProps) => (
  <div
    className={cn(
      'flex flex-col gap-2 h-full',
      centerItems ? 'items-center' : 'items-start',
      className,
    )}
  >
    {label && (
      <Label
        className={cn(
          'text-sm font-semibold',
          centerTitle ? 'text-center w-full' : 'text-left w-full',
        )}
      >
        {label}
        {requiredLabel && <span className="text-destructive"> *</span>}
      </Label>
    )}
    {children}
  </div>
);
