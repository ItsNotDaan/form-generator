import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Switch} from '@/components/ui/switch';
import {SIDE_OPTIONS} from '@/backend/constants/formConstants';

interface SideSelectionBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
  includeAmputation?: boolean;
  sideField?: string;
  amputationLeftField?: string;
  amputationRightField?: string;
}

/**
 * SideSelectionBlock - Side selection with optional amputation toggles
 *
 * This block handles side selection (left/right/both) and optionally
 * shows amputation toggles for left and right sides.
 *
 * @example
 * ```tsx
 * <SideSelectionBlock form={form} t={t} />
 * <SideSelectionBlock form={form} t={t} includeAmputation={true} />
 * ```
 */
export const SideSelectionBlock: React.FC<SideSelectionBlockProps> = ({
  form,
  t,
  includeAmputation = false,
  sideField = 'side',
  amputationLeftField = 'amputationLeftEnabled',
  amputationRightField = 'amputationRightEnabled',
}) => {
  // ---------------------------------------------------------------------------
  // HELPER / LOGIC VARIABLES
  // ---------------------------------------------------------------------------
  const showAmputation = includeAmputation;
  const cardTitle = showAmputation
    ? t('side') + ' & ' + t('amputation')
    : t('side');
  const cardDescription = showAmputation
    ? t('sideAmputationDescription')
    : undefined;

  return (
    <FormCard title={cardTitle} description={cardDescription}>
      <FormBlock
        columns={showAmputation ? 2 : 1}
        dividers={showAmputation}
        hoverEffect={false}
      >
        {/* Side Selection */}
        <FormItemWrapper label={t('side')}>
          <RadioGroup
            value={form.watch(sideField) || ''}
            onValueChange={value => form.setValue(sideField, value)}
          >
            <div className="flex items-center justify-center gap-6">
              {SIDE_OPTIONS.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`side-${option.value}`}
                  />
                  <Label htmlFor={`side-${option.value}`}>
                    {t(option.label)}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </FormItemWrapper>

        {/* Amputation Toggles */}
        {showAmputation && (
          <FormItemWrapper label={t('amputation')}>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="amp-left"
                  checked={Boolean(form.watch(amputationLeftField))}
                  onCheckedChange={checked =>
                    form.setValue(amputationLeftField, checked)
                  }
                />
                <Label
                  htmlFor="amp-left"
                  className="font-normal cursor-pointer"
                >
                  {t('left')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="amp-right"
                  checked={Boolean(form.watch(amputationRightField))}
                  onCheckedChange={checked =>
                    form.setValue(amputationRightField, checked)
                  }
                />
                <Label
                  htmlFor="amp-right"
                  className="font-normal cursor-pointer"
                >
                  {t('right')}
                </Label>
              </div>
            </div>
          </FormItemWrapper>
        )}
      </FormBlock>
    </FormCard>
  );
};

// ---------------------------------------------------------------------------
// ORIGINAL EXTRACTED CODE (reference snapshot from intake-osa/index.tsx)
// ---------------------------------------------------------------------------

// {/* Side & Amputation */}
//   <FormCard
//     title={t('side') + ' & ' + t('amputation')}
//     description={t('sideAmputationDescription')}
//   >
//     <FormBlock columns={2} dividers={true} hoverEffect={false}>
//       {/* Side Selection */}
//       <FormItemWrapper label={t('side')}>
//         <FormField
//           control={form.control}
//           name="side"
//           render={({field}) => (
//             <FormItem>
//               <FormControl>
//                 <RadioGroup
//                   onValueChange={field.onChange}
//                   value={field.value}
//                 >
//                   <div className="flex flex-wrap gap-6">
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="both" id="side-both" />
//                       <Label htmlFor="side-both">{t('both')}</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="left" id="side-left" />
//                       <Label htmlFor="side-left">{t('left')}</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem
//                         value="right"
//                         id="side-right"
//                       />
//                       <Label htmlFor="side-right">
//                         {t('right')}
//                       </Label>
//                     </div>
//                   </div>
//                 </RadioGroup>
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       </FormItemWrapper>

//       {/* Amputation */}
//       <FormItemWrapper label={t('amputation')}>
//         <div className="flex gap-6">
//           <div className="flex items-center space-x-2">
//             <Switch
//               id="amp-left"
//               checked={form.watch('amputationLeftEnabled')}
//               onCheckedChange={checked =>
//                 form.setValue('amputationLeftEnabled', !!checked)
//               }
//             />
//             <Label
//               htmlFor="amp-left"
//               className="font-normal cursor-pointer"
//             >
//               {t('left')}
//             </Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Switch
//               id="amp-right"
//               checked={form.watch('amputationRightEnabled')}
//               onCheckedChange={checked =>
//                 form.setValue('amputationRightEnabled', !!checked)
//               }
//             />
//             <Label
//               htmlFor="amp-right"
//               className="font-normal cursor-pointer"
//             >
//               {t('right')}
//             </Label>
//           </div>
//         </div>
//       </FormItemWrapper>
//     </FormBlock>
//   </FormCard>
