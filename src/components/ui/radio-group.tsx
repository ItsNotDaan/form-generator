import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import {Circle} from 'lucide-react';

import {cn} from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({className, ...props}, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        // Minimum width is w-2/3, but if content is larger, use w-max
        'min-w-3/4',
        'w-max',

        // Other existing classes
        'grid gap-2',

        className,
      )}
      data-field-name={props['data-field-name' as keyof typeof props]}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({className, ...props}, ref) => {
  // Always forward aria-invalid as a string and set aria-[invalid=true] for Tailwind
  let ariaInvalid = props['aria-invalid'];
  let rest = {...props};
  if (ariaInvalid !== undefined) {
    rest['aria-invalid'] = ariaInvalid ? 'true' : undefined;
  }
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        [
          'aspect-square h-4 w-4 rounded-full border border-solid border-input bg-background text-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer',
          // Error state classes (one per line for clarity)
          'aria-invalid:border-destructive!',
          'aria-invalid:ring-2',
          'aria-invalid:ring-destructive',
          'aria-invalid:ring-offset-0',
          'aria-invalid:ring-destructive',
          'dark:aria-invalid:ring-destructive',
        ],
        className,
      )}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export {RadioGroup, RadioGroupItem};
