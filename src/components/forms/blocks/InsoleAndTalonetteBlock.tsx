import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  INSOLE_TYPE_OPTIONS,
  INSOLE_PRICE_OPTIONS,
  MIDFOOT_CORRECTION_OPTIONS,
  FOREFOOT_CORRECTION_OPTIONS,
  PELOTTE_OPTIONS,
} from '@/backend/constants/formConstants';

interface InsoleAndTalonetteBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
  mode?: 'split' | 'combined';
  resetFieldsOnToggleOff?: boolean;
  includePriceSelector?: boolean;
  showLeft?: boolean;
  showRight?: boolean;
}

/**
 * InsoleAndTalonetteBlock - Insole and talonette configuration
 *
 * Supports split mode (two cards as in intake-steunzolen) and combined mode
 * (single toggleable card as in intake-osb).
 */
export const InsoleAndTalonetteBlock: React.FC<
  InsoleAndTalonetteBlockProps
> = ({
  form,
  t,
  mode = 'split',
  resetFieldsOnToggleOff = false,
  includePriceSelector = true,
  showLeft = true,
  showRight = true,
}) => {
  // ---------------------------------------------------------------------------
  // HELPER / LOGIC VARIABLES
  // ---------------------------------------------------------------------------
  const useCombinedMode = mode === 'combined';
  const includeLeft = showLeft;
  const includeRight = showRight;
  const showOtherInsoleText = form.watch('insoleTypeGeneral') === 'Anders';

  const resetInsoleAndTalonetteFields = () => {
    form.setValue('heelRaiseLeft', '');
    form.setValue('heelRaiseRight', '');
    form.setValue('insoleTypeGeneral', '');
    form.setValue('insolePriceName', '');
    form.setValue('insolePrice', undefined);
    form.setValue('insoleOtherText', '');
    form.setValue('insoleMidfootCorrection', '');
    form.setValue('insoleForefootCorrection', '');
    form.setValue('insoleForefootPad', '');
  };

  // ---------------------------------------------------------------------------
  // SHARED RENDER HELPERS
  // ---------------------------------------------------------------------------
  const renderTalonetteFields = () => (
    <FormBlock columns={2} dividers={true} title={t('talonetteSection')}>
      {includeLeft && (
        <FormItemWrapper label={t('insoleHeelRaiseLeft')}>
          <Input
            id="hak-verhoging-links"
            type="number"
            step="0.1"
            placeholder={t('cmPlaceholder')}
            value={form.watch('heelRaiseLeft')}
            onChange={e => form.setValue('heelRaiseLeft', e.target.value)}
            className="w-2/3"
          />
        </FormItemWrapper>
      )}

      {includeRight && (
        <FormItemWrapper label={t('insoleHeelRaiseRight')}>
          <Input
            id="hak-verhoging-rechts"
            type="number"
            step="0.1"
            placeholder={t('cmPlaceholder')}
            value={form.watch('heelRaiseRight')}
            onChange={e => form.setValue('heelRaiseRight', e.target.value)}
            className="w-2/3"
          />
        </FormItemWrapper>
      )}
    </FormBlock>
  );

  const renderSplitTalonetteFields = () => (
    <FormBlock columns={2} dividers={true}>
      {includeLeft && (
        <FormItemWrapper label={t('insoleHeelRaiseLeft')}>
          <Input
            id="hak-verhoging-links"
            type="number"
            step="0.1"
            placeholder={t('cmPlaceholder')}
            value={form.watch('heelRaiseLeft')}
            onChange={e => form.setValue('heelRaiseLeft', e.target.value)}
            className="w-2/3"
          />
        </FormItemWrapper>
      )}

      {includeRight && (
        <FormItemWrapper label={t('insoleHeelRaiseRight')}>
          <Input
            id="hak-verhoging-rechts"
            type="number"
            step="0.1"
            placeholder={t('cmPlaceholder')}
            value={form.watch('heelRaiseRight')}
            onChange={e => form.setValue('heelRaiseRight', e.target.value)}
            className="w-2/3"
          />
        </FormItemWrapper>
      )}
    </FormBlock>
  );

  const renderInsoleTypeFields = () => (
    <FormBlock
      columns={useCombinedMode ? 2 : 1}
      dividers={true}
      title={t('insoleTypeGeneral')}
      alignItems="start"
    >
      <FormItemWrapper
        className={useCombinedMode ? 'col-span-2' : undefined}
        label={!useCombinedMode ? t('insoleTypeGeneral') : undefined}
      >
        <Select
          value={form.watch('insoleTypeGeneral') || undefined}
          onValueChange={value => {
            form.setValue('insoleTypeGeneral', value);
            if (value !== 'Anders') {
              form.setValue('insoleOtherText', '');
            }
          }}
        >
          <SelectTrigger className={useCombinedMode ? 'w-2/3 mt-2' : 'w-fit'}>
            <SelectValue
              placeholder={
                useCombinedMode ? t('insoleTypeGeneral') : t('insoleType')
              }
            />
          </SelectTrigger>
          <SelectContent>
            {INSOLE_TYPE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItemWrapper>

      {showOtherInsoleText && (
        <FormItemWrapper label={t('specifyOther')} className="col-span-2 pt-2">
          <Textarea
            id="steunzool-anders"
            placeholder={t('specifyPlaceholder')}
            value={form.watch('insoleOtherText')}
            onChange={e => form.setValue('insoleOtherText', e.target.value)}
            rows={2}
            className="w-2/3 resize-none"
          />
        </FormItemWrapper>
      )}
    </FormBlock>
  );

  const renderPriceSelector = () => {
    if (!includePriceSelector) {
      return null;
    }

    return (
      <FormBlock columns={1} dividers={true} alignItems="start">
        <FormItemWrapper label={t('insolePriceName')}>
          <Select
            value={
              form.watch('insolePrice')
                ? String(form.watch('insolePrice'))
                : undefined
            }
            onValueChange={value => {
              const numericValue = value ? parseFloat(value) : undefined;
              const selectedOption = INSOLE_PRICE_OPTIONS.find(
                option => option.value === numericValue,
              );

              form.setValue('insolePrice', numericValue);
              form.setValue('insolePriceName', selectedOption?.label || '');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('chooseOption')} />
            </SelectTrigger>
            <SelectContent>
              {INSOLE_PRICE_OPTIONS.map(option => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {t(option.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItemWrapper>
      </FormBlock>
    );
  };

  const renderCorrectionFields = () => (
    <FormBlock columns={3} dividers={true} title={t('insoleCorrections')}>
      <FormItemWrapper label={t('midfootCorrection')}>
        <Select
          value={form.watch('insoleMidfootCorrection') || undefined}
          onValueChange={value =>
            form.setValue('insoleMidfootCorrection', value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t('chooseOption')} />
          </SelectTrigger>
          <SelectContent>
            {MIDFOOT_CORRECTION_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItemWrapper>

      <FormItemWrapper label={t('forefootCorrection')}>
        <Select
          value={form.watch('insoleForefootCorrection') || undefined}
          onValueChange={value =>
            form.setValue('insoleForefootCorrection', value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t('chooseOption')} />
          </SelectTrigger>
          <SelectContent>
            {FOREFOOT_CORRECTION_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItemWrapper>

      <FormItemWrapper label={t('forefootPad')}>
        <Select
          value={form.watch('insoleForefootPad') || undefined}
          onValueChange={value => form.setValue('insoleForefootPad', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('chooseOption')} />
          </SelectTrigger>
          <SelectContent>
            {PELOTTE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItemWrapper>
    </FormBlock>
  );

  const renderSplitInsoleTypeRow = () => (
    <FormBlock columns={1} dividers={true} alignItems="start">
      <FormItemWrapper label={t('insoleTypeGeneral')}>
        <Select
          value={form.watch('insoleTypeGeneral') || undefined}
          onValueChange={value => {
            form.setValue('insoleTypeGeneral', value);
            if (value !== 'Anders') {
              form.setValue('insoleOtherText', '');
            }
          }}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder={t('insoleType')} />
          </SelectTrigger>
          <SelectContent>
            {INSOLE_TYPE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItemWrapper>

      {showOtherInsoleText && (
        <FormItemWrapper label={t('specifyOther')} className="col-span-2 pt-2">
          <Textarea
            id="steunzool-anders"
            placeholder={t('specifyPlaceholder')}
            value={form.watch('insoleOtherText')}
            onChange={e => form.setValue('insoleOtherText', e.target.value)}
            rows={2}
            className="w-2/3 resize-none"
          />
        </FormItemWrapper>
      )}
    </FormBlock>
  );

  // ---------------------------------------------------------------------------
  // RENDER SECTION
  // ---------------------------------------------------------------------------
  if (useCombinedMode) {
    return (
      <FormCard
        title={t('insolesAndTalonette')}
        description={t('insolesAndTalonetteDescription')}
        toggleAble={true}
        toggleLabel={t('addInsolesOrTalonette')}
        toggleId="steunzolen-talonette-toggle"
        defaultOpen={
          form.watch('insoleEnabled') || form.watch('heelRaiseEnabled')
        }
        onToggleChange={isOpen => {
          form.setValue('insoleEnabled', isOpen);
          form.setValue('heelRaiseEnabled', isOpen);

          if (!isOpen && resetFieldsOnToggleOff) {
            resetInsoleAndTalonetteFields();
          }
        }}
      >
        {renderTalonetteFields()}
        {renderInsoleTypeFields()}
        {renderPriceSelector()}
        {renderCorrectionFields()}
      </FormCard>
    );
  }

  return (
    <>
      <FormCard
        title={t('talonetteSection')}
        description={t('talonetteDescription')}
        toggleAble={true}
        toggleLabel={t('enableTalonette')}
        toggleId="talonette-toggle"
        defaultOpen={form.watch('heelRaiseEnabled')}
        onToggleChange={isOpen => {
          form.setValue('heelRaiseEnabled', isOpen, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      >
        {renderSplitTalonetteFields()}
      </FormCard>

      <FormCard
        title={t('insolesSection')}
        description={t('insolesDescription')}
        toggleAble={true}
        toggleLabel={t('enableInsoles')}
        toggleId="steunzolen-toggle"
        defaultOpen={form.watch('insoleEnabled')}
        onToggleChange={isOpen => {
          form.setValue('insoleEnabled', isOpen, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      >
        {/* ROW 1: Type Selection */}
        {renderSplitInsoleTypeRow()}

        {/* ROW 2: Corrections */}
        {renderCorrectionFields()}

        {/* ROW 3: Steunzool type selectie */}
        {renderPriceSelector()}
      </FormCard>
    </>
  );
};

// ---------------------------------------------------------------------------
// ORIGINAL EXTRACTED CODE (reference snapshot from intake-osb/index.tsx)
// ---------------------------------------------------------------------------

{
  /* ==========================================================
                  Talonette Section
 ========================================================== */
}
//   <FormCard
//     title={t('talonetteSection')}
//     description={t('talonetteDescription')}
//     toggleAble={true}
//     toggleLabel={t('enableTalonette')}
//     toggleId="talonette-toggle"
//     defaultOpen={form.watch('heelRaiseEnabled')}
//     onToggleChange={isOpen => {
//       form.setValue('heelRaiseEnabled', isOpen, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }}
//   >
//     {/* Heel Raise */}
//     <FormBlock columns={2} dividers={true}>
//       <FormItemWrapper label={t('insoleHeelRaiseLeft')}>
//         <Input
//           id="hak-verhoging-links"
//           type="number"
//           step="0.1"
//           placeholder={t('cmPlaceholder')}
//           value={form.watch('heelRaiseLeft')}
//           onChange={e =>
//             form.setValue('heelRaiseLeft', e.target.value)
//           }
//           className="w-2/3"
//         />
//       </FormItemWrapper>

//       <FormItemWrapper label={t('insoleHeelRaiseRight')}>
//         <Input
//           id="hak-verhoging-rechts"
//           type="number"
//           step="0.1"
//           placeholder={t('cmPlaceholder')}
//           value={form.watch('heelRaiseRight')}
//           onChange={e =>
//             form.setValue('heelRaiseRight', e.target.value)
//           }
//           className="w-2/3"
//         />
//       </FormItemWrapper>
//     </FormBlock>
//   </FormCard>

//   {/* ==========================================================
//       Steunzolen Section
//      ========================================================== */}
//   <FormCard
//     title={t('insolesSection')}
//     description={t('insolesDescription')}
//     toggleAble={true}
//     toggleLabel={t('enableInsoles')}
//     toggleId="steunzolen-toggle"
//     defaultOpen={form.watch('insoleEnabled')}
//     onToggleChange={isOpen => {
//       form.setValue('insoleEnabled', isOpen, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }}
//   >
//     {/* ROW 1: Type Selection */}
//     <FormBlock columns={1} dividers={true} alignItems="start">
//       {/* Type Selection */}
//       <FormItemWrapper label={t('insoleTypeGeneral')}>
//         <Select
//           value={form.watch('insoleTypeGeneral') || undefined}
//           onValueChange={val => {
//             form.setValue('insoleTypeGeneral', val);

//             // Clear the insoleOtherText if not selecting Anders
//             if (val !== 'Anders') {
//               form.setValue('insoleOtherText', '');
//             }
//           }}
//         >
//           <SelectTrigger className="w-fit">
//             <SelectValue placeholder={t('insoleType')} />
//           </SelectTrigger>
//           <SelectContent>
//             {INSOLE_TYPE_OPTIONS.map(option => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </FormItemWrapper>

//       {/* Conditional "Other" Textarea (Spans full width if visible) */}
//       {insoleTypeGeneral === 'Anders' && (
//         <FormItemWrapper
//           label={t('specifyOther')}
//           className="col-span-2 pt-2"
//         >
//           <Textarea
//             id="steunzool-anders"
//             placeholder={t('specifyPlaceholder')}
//             value={form.watch('insoleOtherText')}
//             onChange={e =>
//               form.setValue('insoleOtherText', e.target.value)
//             }
//             rows={2}
//             className="w-2/3 resize-none"
//           />
//         </FormItemWrapper>
//       )}
//     </FormBlock>

//     {/* ROW 2: Corrections */}
//     <FormBlock
//       columns={3}
//       dividers={true}
//       title={t('insoleCorrections')}
//     >
//       <FormItemWrapper label={t('midfootCorrection')}>
//         <Select
//           value={form.watch('insoleMidfootCorrection') || undefined}
//           onValueChange={val =>
//             form.setValue('insoleMidfootCorrection', val)
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder={t('chooseOption')} />
//           </SelectTrigger>
//           <SelectContent>
//             {MIDFOOT_CORRECTION_OPTIONS.map(option => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </FormItemWrapper>

//       <FormItemWrapper label={t('forefootCorrection')}>
//         <Select
//           value={
//             form.watch('insoleForefootCorrection') || undefined
//           }
//           onValueChange={val =>
//             form.setValue('insoleForefootCorrection', val)
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder={t('chooseOption')} />
//           </SelectTrigger>
//           <SelectContent>
//             {FOREFOOT_CORRECTION_OPTIONS.map(option => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </FormItemWrapper>

//       <FormItemWrapper label={t('forefootPad')}>
//         <Select
//           value={form.watch('insoleForefootPad') || undefined}
//           onValueChange={val =>
//             form.setValue('insoleForefootPad', val)
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder={t('chooseOption')} />
//           </SelectTrigger>
//           <SelectContent>
//             {PELOTTE_OPTIONS.map(option => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </FormItemWrapper>
//     </FormBlock>

//     {/* ROW 3: Steunzool type selectie */}
//     <FormBlock columns={1} dividers={true} alignItems="start">
//       <FormItemWrapper label={t('insolePriceName')}>
//         <Select
//           value={
//             form.watch('insolePrice')
//               ? String(form.watch('insolePrice'))
//               : undefined
//           }
//           onValueChange={val => {
//             const numVal = val ? parseFloat(val) : undefined;
//             // Find the corresponding label for this price value
//             const selectedOption = INSOLE_PRICE_OPTIONS.find(
//               option => option.value === numVal,
//             );
//             form.setValue('insolePrice', numVal);
//             form.setValue(
//               'insolePriceName',
//               selectedOption?.label || '',
//             );

//             // Optional: If user manually changes price to something else, should Talonette toggle off?
//             // Logic left to you, currently it stays enabled.
//           }}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder={t('chooseOption')} />
//           </SelectTrigger>
//           <SelectContent>
//             {INSOLE_PRICE_OPTIONS.map(option => (
//               <SelectItem
//                 key={option.value}
//                 value={String(option.value)}
//               >
//                 {t(option.label)}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </FormItemWrapper>
//     </FormBlock>
//   </FormCard>
