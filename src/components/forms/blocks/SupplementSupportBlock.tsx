import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Switch} from '@/components/ui/switch';
import {MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE} from '@/backend/constants/formConstants';

// ---------------------------------------------------------------------------
// PROPS
// ---------------------------------------------------------------------------

interface SupplementSupportBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
  showLeft?: boolean;
  showRight?: boolean;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

/**
 * SupplementSupportBlock - Supplement support (left/right)
 *
 * Renders per-side switch controls for supplement support and conditionally
 * shows medial/lateral type selectors when enabled.
 *
 * @example
 * ```tsx
 * <SupplementSupportBlock form={form} t={t} showLeft={true} showRight={true} />
 * ```
 */
export const SupplementSupportBlock: React.FC<SupplementSupportBlockProps> = ({
  form,
  t,
  showLeft = true,
  showRight = true,
}) => {
  const customInsoleShoringLeftEnabled = form.watch(
    'customInsoleShoringLeftEnabled',
  );
  const customInsoleShoringRightEnabled = form.watch(
    'customInsoleShoringRightEnabled',
  );

  const includeLeftSection = showLeft;
  const includeRightSection = showRight;

  return (
    <FormCard title={t('supplementSupport')}>
      <FormBlock columns={2} dividers={true} hoverEffect={false}>
        {includeLeftSection && (
          <FormItemWrapper label={t('left')} className="items-center">
            <div className="flex items-center p-3 space-x-2">
              <Switch
                id="supplementschoring-links-switch"
                checked={customInsoleShoringLeftEnabled}
                onCheckedChange={checked => {
                  form.setValue('customInsoleShoringLeftEnabled', !!checked);
                  if (!checked) {
                    form.setValue('customInsoleShoringLeftType', '');
                  }
                }}
              />
              <Label
                htmlFor="supplementschoring-links-switch"
                className="font-normal cursor-pointer"
              >
                {customInsoleShoringLeftEnabled ? t('yes') : t('no')}
              </Label>
            </div>
            {customInsoleShoringLeftEnabled && (
              <Select
                value={form.watch('customInsoleShoringLeftType')}
                onValueChange={v =>
                  form.setValue('customInsoleShoringLeftType', v)
                }
              >
                <SelectTrigger>
                  <SelectValue>
                    {t(
                      MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE.find(
                        opt =>
                          opt.value ===
                          form.watch('customInsoleShoringLeftType'),
                      )?.label || '',
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(opt.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormItemWrapper>
        )}
        {includeRightSection && (
          <FormItemWrapper label={t('right')} className="items-center">
            <div className="flex items-center p-3 space-x-2">
              <Switch
                id="supplementschoring-rechts-switch"
                checked={customInsoleShoringRightEnabled}
                onCheckedChange={checked => {
                  form.setValue('customInsoleShoringRightEnabled', !!checked);
                  if (!checked) {
                    form.setValue('customInsoleShoringRightType', '');
                  }
                }}
              />
              <Label
                htmlFor="supplementschoring-rechts-switch"
                className="font-normal cursor-pointer"
              >
                {customInsoleShoringRightEnabled ? t('yes') : t('no')}
              </Label>
            </div>
            {customInsoleShoringRightEnabled && (
              <Select
                value={form.watch('customInsoleShoringRightType')}
                onValueChange={v =>
                  form.setValue('customInsoleShoringRightType', v)
                }
              >
                <SelectTrigger>
                  <SelectValue>
                    {t(
                      MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE.find(
                        opt =>
                          opt.value ===
                          form.watch('customInsoleShoringRightType'),
                      )?.label || '',
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(opt.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormItemWrapper>
        )}
      </FormBlock>
    </FormCard>
  );
};

// ---------------------------------------------------------------------------
// ORIGINAL EXTRACTED CODE (reference snapshot from intake-vlos/index.tsx)
// ---------------------------------------------------------------------------

// {/* Supplement Support */}
// <FormCard title={t('supplementSupport')}>
//   <FormBlock columns={2} dividers={true} hoverEffect={false}>
//     {showLinks && (
//       <FormItemWrapper label={t('left')} className="items-center">
//         <div className="flex items-center p-3 space-x-2">
//           <Switch
//             id="supplementschoring-links-switch"
//             checked={customInsoleShoringLeftEnabled}
//             onCheckedChange={checked => {
//               form.setValue(
//                 'customInsoleShoringLeftEnabled',
//                 !!checked,
//               );
//               if (!checked) {
//                 form.setValue('customInsoleShoringLeftType', '');
//               }
//             }}
//           />
//           <Label
//             htmlFor="supplementschoring-links-switch"
//             className="font-normal cursor-pointer"
//           >
//             {customInsoleShoringLeftEnabled ? t('yes') : t('no')}
//           </Label>
//         </div>
//         {customInsoleShoringLeftEnabled && (
//           <Select
//             value={form.watch('customInsoleShoringLeftType')}
//             onValueChange={v =>
//               form.setValue('customInsoleShoringLeftType', v)
//             }
//           >
//             <SelectTrigger>
//               <SelectValue>
//                 {t(
//                   MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE.find(
//                     opt =>
//                       opt.value ===
//                       form.watch('customInsoleShoringLeftType'),
//                   )?.label || '',
//                 )}
//               </SelectValue>
//             </SelectTrigger>
//             <SelectContent>
//               {MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE.map(opt => (
//                 <SelectItem key={opt.value} value={opt.value}>
//                   {t(opt.label)}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         )}
//       </FormItemWrapper>
//     )}
//     {showRechts && (
//       <FormItemWrapper
//         label={t('right')}
//         className="items-center"
//       >
//         <div className="flex items-center p-3 space-x-2">
//           <Switch
//             id="supplementschoring-rechts-switch"
//             checked={customInsoleShoringRightEnabled}
//             onCheckedChange={checked => {
//               form.setValue(
//                 'customInsoleShoringRightEnabled',
//                 !!checked,
//               );
//               if (!checked) {
//                 form.setValue('customInsoleShoringRightType', '');
//               }
//             }}
//           />
//           <Label
//             htmlFor="supplementschoring-rechts-switch"
//             className="font-normal cursor-pointer"
//           >
//             {customInsoleShoringRightEnabled ? t('yes') : t('no')}
//           </Label>
//         </div>
//         {customInsoleShoringRightEnabled && (
//           <Select
//             value={form.watch('customInsoleShoringRightType')}
//             onValueChange={v =>
//               form.setValue('customInsoleShoringRightType', v)
//             }
//           >
//             <SelectTrigger>
//               <SelectValue>
//                 {t(
//                   MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE.find(
//                     opt =>
//                       opt.value ===
//                       form.watch('customInsoleShoringRightType'),
//                   )?.label || '',
//                 )}
//               </SelectValue>
//             </SelectTrigger>
//             <SelectContent>
//               {MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE.map(opt => (
//                 <SelectItem key={opt.value} value={opt.value}>
//                   {t(opt.label)}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         )}
//       </FormItemWrapper>
//     )}
//   </FormBlock>
// </FormCard>
