import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {SHAFT_OPENING_OPTIONS} from '@/domain/form/constants/formConstants';

// ---------------------------------------------------------------------------
// PROPS
// ---------------------------------------------------------------------------

interface ShaftOpeningWidthBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

/**
 * ShaftOpeningWidthBlock - Shaft opening width radio selection
 *
 * Renders the VLOS shaft opening section with predefined width options.
 *
 * @example
 * ```tsx
 * <ShaftOpeningWidthBlock form={form} t={t} />
 * ```
 */
export const ShaftOpeningWidthBlock: React.FC<ShaftOpeningWidthBlockProps> = ({
  form,
  t,
}) => {
  return (
    <FormCard title={t('shaftOpening')}>
      <FormBlock columns={1} dividers={false} hoverEffect={false}>
        <FormItemWrapper>
          <RadioGroup
            value={form.watch('shaftOpeningWidth')}
            onValueChange={v => form.setValue('shaftOpeningWidth', v)}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {SHAFT_OPENING_OPTIONS.map(opt => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={opt.value}
                    id={`opening-${opt.value}`}
                  />
                  <Label
                    htmlFor={`opening-${opt.value}`}
                    className="font-normal cursor-pointer"
                  >
                    {opt.label.replace('.', ',')} cm
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </FormItemWrapper>
      </FormBlock>
    </FormCard>
  );
};

// ---------------------------------------------------------------------------
// ORIGINAL EXTRACTED CODE (reference snapshot from intake-vlos/index.tsx)
// ---------------------------------------------------------------------------

// {/* Shaft Opening */}
// <FormCard title={t('shaftOpening')}>
//   <FormBlock columns={1} dividers={false} hoverEffect={false}>
//     <FormItemWrapper>
//       <RadioGroup
//         value={form.watch('shaftOpeningWidth')}
//         onValueChange={v => form.setValue('shaftOpeningWidth', v)}
//       >
//         <div className="flex flex-wrap justify-center gap-4">
//           {SHAFT_OPENING_OPTIONS.map(opt => (
//             <div
//               key={opt.value}
//               className="flex items-center space-x-2"
//             >
//               <RadioGroupItem
//                 value={opt.value}
//                 id={`opening-${opt.value}`}
//               />
//               <Label
//                 htmlFor={`opening-${opt.value}`}
//                 className="font-normal cursor-pointer"
//               >
//                 {opt.label.replace('.', ',')} cm
//               </Label>
//             </div>
//           ))}
//         </div>
//       </RadioGroup>
//     </FormItemWrapper>
//   </FormBlock>
// </FormCard>
