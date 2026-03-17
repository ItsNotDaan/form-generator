import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ENCLOSURE_OPTIONS,
  EnclosureOption,
  MEDIAL_LATERAL_OPTIONS,
} from '@/domain/form/constants/formConstants';

interface EnclosureBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
  showLeft?: boolean;
  showRight?: boolean;
  includeCarbonStiffening?: boolean;
  mode?: 'vlos' | 'foliepas';
}

/**
 * EnclosureBlock - Enclosure (Omsluiting) + donkey ear options
 *
 * Supports a VLOS mode (basic enclosure card) and a foliepas mode
 * (same enclosure with optional carbon stiffening section).
 */
export const EnclosureBlock: React.FC<EnclosureBlockProps> = ({
  form,
  t,
  showLeft = true,
  showRight = true,
  includeCarbonStiffening = false,
  mode = 'vlos',
}) => {
  // ---------------------------------------------------------------------------
  // HELPER / LOGIC VARIABLES
  // ---------------------------------------------------------------------------
  const includeLeft = showLeft;
  const includeRight = showRight;
  const includeCarbonSection = includeCarbonStiffening;
  const isVlosMode = mode === 'vlos';
  const cardTitle =
    mode === 'foliepas' ? 'Voeringschoen opties' : t('enclosure');
  const cardDescription =
    mode === 'foliepas'
      ? `${t('enclosure')} • ${t('donkeyEar')} • ${t('carbonStiffeningLiningShoe')}`
      : undefined;
  const donkeyEarLeftEnabled = !!form.watch('donkeyEarLeftEnabled');
  const donkeyEarRightEnabled = !!form.watch('donkeyEarRightEnabled');

  // ---------------------------------------------------------------------------
  // HELPER FUNCTIONS
  // ---------------------------------------------------------------------------
  const vibrateIfSupported = () => {
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const handleToggle = (
    side: 'Left' | 'Right',
    option: EnclosureOption,
    checked: boolean,
  ) => {
    const enclosureField = side === 'Left' ? 'enclosureLeft' : 'enclosureRight';
    const enclosureMmField =
      side === 'Left' ? 'enclosureLeftMm' : 'enclosureRightMm';
    const donkeyEarEnabledField =
      side === 'Left' ? 'donkeyEarLeftEnabled' : 'donkeyEarRightEnabled';
    const donkeyEarTypeField =
      side === 'Left' ? 'donkeyEarLeftType' : 'donkeyEarRightType';
    const fullKey =
      side === 'Left' ? option.fullKeyLinks : option.fullKeyRechts;
    const mmKey = side === 'Left' ? option.mmKeyLinks : option.mmKeyRechts;

    vibrateIfSupported();

    if (option.key === 'donkeyEar') {
      form.setValue(donkeyEarEnabledField, !!checked);
      if (!checked && isVlosMode) {
        form.setValue(donkeyEarTypeField, '');
      }
      return;
    }

    form.setValue(enclosureField, {
      ...form.getValues(enclosureField),
      [fullKey]: !!checked,
    });

    if (checked && option.needsMm && option.defaultMm) {
      form.setValue(enclosureMmField, {
        ...form.getValues(enclosureMmField),
        [mmKey]: option.defaultMm,
      });
    } else if (!checked) {
      const next = {...form.getValues(enclosureMmField)};
      delete next[mmKey];
      form.setValue(enclosureMmField, next);
    }
  };

  const renderSideOptions = (side: 'Left' | 'Right') => {
    const sideLabel = side === 'Left' ? t('left') : t('right');
    const enclosureField = side === 'Left' ? 'enclosureLeft' : 'enclosureRight';
    const enclosureMmField =
      side === 'Left' ? 'enclosureLeftMm' : 'enclosureRightMm';
    const donkeyEarTypeField =
      side === 'Left' ? 'donkeyEarLeftType' : 'donkeyEarRightType';
    const donkeyEnabled =
      side === 'Left' ? donkeyEarLeftEnabled : donkeyEarRightEnabled;

    return (
      <FormItemWrapper label={sideLabel}>
        <div className="space-y-3 w-full lg:w-3/4">
          {ENCLOSURE_OPTIONS.map((option: EnclosureOption) => {
            const fullKey =
              side === 'Left' ? option.fullKeyLinks : option.fullKeyRechts;
            const mmKey =
              side === 'Left' ? option.mmKeyLinks : option.mmKeyRechts;
            const enclosureChecked =
              ((form.watch(enclosureField) as Record<string, boolean>)?.[
                fullKey
              ] as boolean | undefined) || false;
            const checked =
              option.key === 'donkeyEar' ? donkeyEnabled : enclosureChecked;
            const showMmInput = option.needsMm && enclosureChecked;
            const showTypeSelect = option.needsTypeSelect && donkeyEnabled;

            return (
              <Label
                key={option.key}
                className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 sm:p-2 cursor-pointer transition-colors hover:bg-accent/30 has-aria-checked:bg-accent/50"
              >
                <Switch
                  id={`encl-${side.toLowerCase()}-${option.key}`}
                  checked={checked}
                  onCheckedChange={isChecked =>
                    handleToggle(side, option, !!isChecked)
                  }
                  className="mr-2"
                />

                <span className="font-normal text-base sm:text-sm leading-tight flex-1">
                  {option.label}
                </span>

                {showMmInput && (
                  <Input
                    type="number"
                    inputMode={option.key === 'hoge' ? 'decimal' : 'numeric'}
                    pattern="[0-9]*"
                    placeholder={option.key === 'hoge' ? 'cm' : 'mm'}
                    value={
                      ((
                        form.watch(enclosureMmField) as Record<string, string>
                      )?.[mmKey] as string) || ''
                    }
                    onChange={e =>
                      form.setValue(enclosureMmField, {
                        ...form.getValues(enclosureMmField),
                        [mmKey]: e.target.value,
                      })
                    }
                    className="w-full sm:w-20 h-12 sm:h-auto text-base sm:text-sm"
                    autoComplete="off"
                  />
                )}

                {showTypeSelect && (
                  <div className="shrink-0">
                    <Select
                      value={form.watch(donkeyEarTypeField)}
                      onValueChange={value =>
                        form.setValue(donkeyEarTypeField, value)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-40 h-12 sm:h-auto text-base sm:text-sm">
                        <SelectValue>
                          {t(
                            MEDIAL_LATERAL_OPTIONS.find(
                              opt =>
                                opt.value === form.watch(donkeyEarTypeField),
                            )?.label || '',
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {MEDIAL_LATERAL_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {t(opt.label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </Label>
            );
          })}
        </div>
      </FormItemWrapper>
    );
  };

  return (
    <FormCard title={cardTitle} description={cardDescription}>
      {/* Enclosure + Donkey Ear */}
      <FormBlock
        columns={2}
        dividers={true}
        hoverEffect={false}
        title={t('enclosure')}
      >
        {includeLeft && renderSideOptions('Left')}
        {includeRight && renderSideOptions('Right')}
      </FormBlock>

      {/* Optional Carbon Stiffening */}
      {includeCarbonSection && (
        <FormBlock
          columns={2}
          dividers={true}
          hoverEffect={false}
          title={t('carbonStiffeningLiningShoe')}
        >
          {includeLeft && (
            <FormItemWrapper>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="carbon-lining-left"
                  className="font-normal cursor-pointer"
                >
                  {t('left')}
                </Label>
                <Switch
                  id="carbon-lining-left"
                  checked={
                    form.watch('carbonStiffeningLiningShoeLeft') || false
                  }
                  onCheckedChange={checked =>
                    form.setValue('carbonStiffeningLiningShoeLeft', !!checked)
                  }
                />
              </div>
            </FormItemWrapper>
          )}

          {includeRight && (
            <FormItemWrapper>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="carbon-lining-right"
                  className="font-normal cursor-pointer"
                >
                  {t('right')}
                </Label>
                <Switch
                  id="carbon-lining-right"
                  checked={
                    form.watch('carbonStiffeningLiningShoeRight') || false
                  }
                  onCheckedChange={checked =>
                    form.setValue('carbonStiffeningLiningShoeRight', !!checked)
                  }
                />
              </div>
            </FormItemWrapper>
          )}
        </FormBlock>
      )}
    </FormCard>
  );
};

// ---------------------------------------------------------------------------
// ORIGINAL EXTRACTED CODE (reference snapshot from intake-vlos/index.tsx)
// ---------------------------------------------------------------------------

{
  /* Enclosure (Omsluiting) */
}
// <FormBlock
//   columns={2}
//   dividers={true}
//   hoverEffect={false}
//   title={t('enclosure')}
// >
//   {showLinks && (
//     <FormItemWrapper label={t('left')}>
//       <div className="space-y-3 w-full lg:w-3/4">
//         {' '}
//         {/* Full on mobile, 3/4 on desktop */}
//         {ENCLOSURE_OPTIONS.map((optie: EnclosureOption) => (
//           <Label
//             key={optie.key}
//             className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 sm:p-2 cursor-pointer transition-colors hover:bg-accent/30 has-aria-checked:bg-accent/50"
//           >
//             <Switch
//               id={`encl-left-${optie.key}`}
//               checked={
//                 optie.key === 'donkeyEar'
//                   ? form.watch('donkeyEarLeftEnabled') || false
//                   : (form.watch('enclosureLeft')[
//                       optie.fullKeyLinks
//                     ] as boolean) || false
//               }
//               onCheckedChange={checked => {
//                 if (window.navigator?.vibrate) {
//                   window.navigator.vibrate(10);
//                 }

//                 if (optie.key === 'donkeyEar') {
//                   form.setValue(
//                     'donkeyEarLeftEnabled',
//                     !!checked,
//                   );
//                 } else {
//                   form.setValue('enclosureLeft', {
//                     ...form.getValues('enclosureLeft'),
//                     [optie.fullKeyLinks]: !!checked,
//                   });
//                   if (
//                     checked &&
//                     optie.needsMm &&
//                     optie.defaultMm
//                   ) {
//                     form.setValue('enclosureLeftMm', {
//                       ...form.getValues('enclosureLeftMm'),
//                       [optie.mmKeyLinks]: optie.defaultMm,
//                     });
//                   } else if (!checked) {
//                     const next = {
//                       ...form.getValues('enclosureLeftMm'),
//                     };
//                     delete next[optie.mmKeyLinks];
//                     form.setValue('enclosureLeftMm', next);
//                   }
//                 }
//               }}
//               className="mr-2"
//             />
//             <span className="font-normal text-base sm:text-sm leading-tight flex-1">
//               {optie.label}
//             </span>
//             {optie.needsMm &&
//               (form.watch('enclosureLeft')[
//                 optie.fullKeyLinks
//               ] as boolean) && (
//                 <Input
//                   type="number"
//                   inputMode={
//                     optie.key === 'hoge' ? 'decimal' : 'numeric'
//                   }
//                   pattern="[0-9]*"
//                   placeholder={
//                     optie.key === 'hoge' ? 'cm' : 'mm'
//                   }
//                   value={
//                     (form.watch('enclosureLeftMm')[
//                       optie.mmKeyLinks
//                     ] as string) || ''
//                   }
//                   onChange={e =>
//                     form.setValue('enclosureLeftMm', {
//                       ...form.getValues('enclosureLeftMm'),
//                       [optie.mmKeyLinks]: e.target.value,
//                     })
//                   }
//                   className="w-full sm:w-20 h-12 sm:h-auto text-base sm:text-sm"
//                   autoComplete="off"
//                 />
//               )}
//             {optie.needsTypeSelect &&
//               (form.watch('donkeyEarLeftEnabled') || false) && (
//                 <div className="shrink-0">
//                   <Select
//                     value={form.watch('donkeyEarLeftType')}
//                     onValueChange={v =>
//                       form.setValue('donkeyEarLeftType', v)
//                     }
//                   >
//                     <SelectTrigger className="w-full h-12 sm:h-auto text-base sm:text-sm">
//                       <SelectValue>
//                         {t(
//                           MEDIAL_LATERAL_OPTIONS.find(
//                             opt =>
//                               opt.value ===
//                               form.watch('donkeyEarLeftType'),
//                           )?.label || '',
//                         )}
//                       </SelectValue>
//                     </SelectTrigger>
//                     <SelectContent>
//                       {MEDIAL_LATERAL_OPTIONS.map(opt => (
//                         <SelectItem
//                           key={opt.value}
//                           value={opt.value}
//                         >
//                           {t(opt.label)}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}
//           </Label>
//         ))}
//       </div>
//     </FormItemWrapper>
//   )}
//   {showRechts && (
//     <FormItemWrapper label={t('right')}>
//       <div className="space-y-3 w-full lg:w-3/4">
//         {ENCLOSURE_OPTIONS.map((optie: EnclosureOption) => (
//           <Label
//             key={optie.key}
//             className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 sm:p-2 cursor-pointer transition-colors hover:bg-accent/30 has-aria-checked:bg-accent/50"
//           >
//             <Switch
//               id={`encl-right-${optie.key}`}
//               checked={
//                 optie.key === 'donkeyEar'
//                   ? form.watch('donkeyEarRightEnabled') || false
//                   : (form.watch('enclosureRight')[
//                       optie.fullKeyRechts
//                     ] as boolean) || false
//               }
//               onCheckedChange={checked => {
//                 if (window.navigator?.vibrate) {
//                   window.navigator.vibrate(10);
//                 }

//                 if (optie.key === 'donkeyEar') {
//                   form.setValue(
//                     'donkeyEarRightEnabled',
//                     !!checked,
//                   );
//                 } else {
//                   form.setValue('enclosureRight', {
//                     ...form.getValues('enclosureRight'),
//                     [optie.fullKeyRechts]: !!checked,
//                   });
//                   if (
//                     checked &&
//                     optie.needsMm &&
//                     optie.defaultMm
//                   ) {
//                     form.setValue('enclosureRightMm', {
//                       ...form.getValues('enclosureRightMm'),
//                       [optie.mmKeyRechts]: optie.defaultMm,
//                     });
//                   } else if (!checked) {
//                     const next = {
//                       ...form.getValues('enclosureRightMm'),
//                     };
//                     delete next[optie.mmKeyRechts];
//                     form.setValue('enclosureRightMm', next);
//                   }
//                 }
//               }}
//               className="mr-2"
//             />
//             <span className="font-normal text-base sm:text-sm leading-tight flex-1">
//               {optie.label}
//             </span>
//             {optie.needsMm &&
//               (form.watch('enclosureRight')[
//                 optie.fullKeyRechts
//               ] as boolean) && (
//                 <Input
//                   type="number"
//                   inputMode={
//                     optie.key === 'hoge' ? 'decimal' : 'numeric'
//                   }
//                   pattern="[0-9]*"
//                   placeholder={
//                     optie.key === 'hoge' ? 'cm' : 'mm'
//                   }
//                   value={
//                     (form.watch('enclosureRightMm')[
//                       optie.mmKeyRechts
//                     ] as string) || ''
//                   }
//                   onChange={e =>
//                     form.setValue('enclosureRightMm', {
//                       ...form.getValues('enclosureRightMm'),
//                       [optie.mmKeyRechts]: e.target.value,
//                     })
//                   }
//                   className="w-full sm:w-20 h-12 sm:h-auto text-base sm:text-sm"
//                   autoComplete="off"
//                 />
//               )}
//             {optie.needsTypeSelect &&
//               (form.watch('donkeyEarRightEnabled') ||
//                 false) && (
//                 <div className="shrink-0">
//                   <Select
//                     value={form.watch('donkeyEarRightType')}
//                     onValueChange={v =>
//                       form.setValue('donkeyEarRightType', v)
//                     }
//                   >
//                     <SelectTrigger className="w-full h-12 sm:h-auto text-base sm:text-sm">
//                       <SelectValue>
//                         {t(
//                           MEDIAL_LATERAL_OPTIONS.find(
//                             opt =>
//                               opt.value ===
//                               form.watch('donkeyEarRightType'),
//                           )?.label || '',
//                         )}
//                       </SelectValue>
//                     </SelectTrigger>
//                     <SelectContent>
//                       {MEDIAL_LATERAL_OPTIONS.map(opt => (
//                         <SelectItem
//                           key={opt.value}
//                           value={opt.value}
//                         >
//                           {t(opt.label)}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}
//           </Label>
//         ))}
//       </div>
//     </FormItemWrapper>
//   )}
// </FormBlock>
