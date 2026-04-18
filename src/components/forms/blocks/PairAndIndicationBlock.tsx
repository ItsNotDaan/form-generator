import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {PAIR_TYPE_OPTIONS} from '@/backend/constants/formConstants';

interface PairAndIndicationBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
}

/**
 * PairAndIndicationBlock - Pair selection and medical indication
 *
 * This block handles form description (which pair/shoe type) and medical indication.
 *
 * @example
 * ```tsx
 * <PairAndIndicationBlock form={form} t={t} />
 * ```
 */
export const PairAndIndicationBlock: React.FC<PairAndIndicationBlockProps> = ({
  form,
  t,
}) => {
  return (
    <FormCard title={t('description')} description={t('whichPair')}>
      <FormBlock columns={2} dividers={true} alignItems="start">
        {/* Which Pair (Radio Group) */}
        <FormItemWrapper label={t('whichPair')}>
          <RadioGroup
            value={form.watch('whichPair')}
            onValueChange={val => form.setValue('whichPair', val)}
            className="w-2/3"
          >
            <div className="flex flex-col gap-3">
              {PAIR_TYPE_OPTIONS.map(option => (
                <Label
                  key={option.value}
                  className="flex items-center gap-3 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors"
                  htmlFor={`ov-${option.value}`}
                >
                  <RadioGroupItem
                    id={`ov-${option.value}`}
                    value={option.value}
                  />
                  <span className="text-sm text-foreground">
                    {t(option.label)}
                  </span>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </FormItemWrapper>

        {/* Medical Indication (Textarea) */}
        <FormItemWrapper label={t('medicalIndication')}>
          <Textarea
            id="medische-indicatie"
            placeholder={t('medicalIndicationPlaceholder')}
            value={form.watch('medicalIndication')}
            onChange={e => form.setValue('medicalIndication', e.target.value)}
            rows={4}
            className="w-2/3"
          />
        </FormItemWrapper>
      </FormBlock>
    </FormCard>
  );
};

// ---------------------------------------------------------------------------
// ORIGINAL EXTRACTED CODE (reference snapshot from intake-osa/index.tsx)
// ---------------------------------------------------------------------------

// {/* Paartype & indicatie */}
// <FormCard title={t('description')} description={t('whichPair')}>
//   <FormBlock columns={2} dividers={true} alignItems="start">
//     {/* Which Pair (Radio Group) */}
//     <FormItemWrapper label={t('whichPair')}>
//       <RadioGroup
//         value={form.watch('whichPair')}
//         onValueChange={val => form.setValue('whichPair', val)}
//         className="w-2/3"
//       >
//         <div className="flex flex-col gap-3">
//           {PAIR_TYPE_OPTIONS.map(option => (
//             <Label
//               key={option.value}
//               className="flex items-center gap-3 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors"
//               htmlFor={`ov-${option.value}`}
//             >
//               <RadioGroupItem id={`ov-${option.value}`} value={option.value} />
//               <span className="text-sm text-foreground">{t(option.label)}</span>
//             </Label>
//           ))}
//         </div>
//       </RadioGroup>
//     </FormItemWrapper>

//     {/* Medical Indication (Textarea) */}
//     <FormItemWrapper label={t('medicalIndication')}>
//       <Textarea
//         id="medische-indicatie"
//         placeholder={t('medicalIndicationPlaceholder')}
//         value={form.watch('medicalIndication')}
//         onChange={e => form.setValue('medicalIndication', e.target.value)}
//         rows={4}
//         className="w-2/3"
//       />
//     </FormItemWrapper>
//   </FormBlock>
// </FormCard>
