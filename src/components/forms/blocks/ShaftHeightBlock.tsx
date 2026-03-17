import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Input} from '@/components/ui/input';

interface ShaftHeightBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
  showLeft?: boolean;
  showRight?: boolean;
  embeddedMode?: boolean;
}

/**
 * ShaftHeightBlock - Shaft height fields (left/right)
 *
 * Supports standalone card mode and embedded mode for composition inside
 * larger cards (for example in check-foliepas).
 */
export const ShaftHeightBlock: React.FC<ShaftHeightBlockProps> = ({
  form,
  t,
  showLeft = true,
  showRight = true,
  embeddedMode = false,
}) => {
  // ---------------------------------------------------------------------------
  // HELPER / LOGIC VARIABLES
  // ---------------------------------------------------------------------------
  const includeLeft = showLeft;
  const includeRight = showRight;
  const includeEmbeddedMode = embeddedMode;
  const blockTitle = includeEmbeddedMode ? t('shaftHeightCm') : undefined;

  // ---------------------------------------------------------------------------
  // RENDER SECTION
  // ---------------------------------------------------------------------------
  const content = (
    <FormBlock
      columns={2}
      dividers={true}
      hoverEffect={false}
      title={blockTitle}
    >
      {includeLeft && (
        <FormItemWrapper label={t('leftCm')} className="items-center">
          <Input
            id="shaft-left"
            type="number"
            placeholder={t('cmPlaceholder')}
            value={form.watch('shaftHeightLeft')}
            onChange={e => form.setValue('shaftHeightLeft', e.target.value)}
            className="w-2/3 text-center"
          />
        </FormItemWrapper>
      )}

      {includeRight && (
        <FormItemWrapper label={t('rightCm')} className="items-center">
          <Input
            id="shaft-right"
            type="number"
            placeholder={t('cmPlaceholder')}
            value={form.watch('shaftHeightRight')}
            onChange={e => form.setValue('shaftHeightRight', e.target.value)}
            className="w-2/3 text-center"
          />
        </FormItemWrapper>
      )}
    </FormBlock>
  );

  if (includeEmbeddedMode) {
    return <>{content}</>;
  }

  return <FormCard title={t('shaftHeight')}>{content}</FormCard>;
};

// ---------------------------------------------------------------------------
// ORIGINAL EXTRACTED CODE (reference snapshot from intake-vlos/index.tsx)
// ---------------------------------------------------------------------------

// {/* Shaft Height */}
// <FormCard title={t('shaftHeight')}>
//   <FormBlock columns={2} dividers={true} hoverEffect={false}>
//     {showLinks && (
//       <FormItemWrapper
//         label={t('leftCm')}
//         className="items-center"
//       >
//         <Input
//           id="shaft-left"
//           type="number"
//           placeholder={t('cmPlaceholder')}
//           value={form.watch('shaftHeightLeft')}
//           onChange={e =>
//             form.setValue('shaftHeightLeft', e.target.value)
//           }
//           className="w-2/3 text-center"
//         />
//       </FormItemWrapper>
//     )}
//     {showRechts && (
//       <FormItemWrapper
//         className="items-center"
//         label={t('rightCm')}
//       >
//         <Input
//           id="shaft-right"
//           type="number"
//           placeholder={t('cmPlaceholder')}
//           value={form.watch('shaftHeightRight')}
//           onChange={e =>
//             form.setValue('shaftHeightRight', e.target.value)
//           }
//           className="w-2/3 text-center"
//         />
//       </FormItemWrapper>
//     )}
//   </FormBlock>
// </FormCard>
