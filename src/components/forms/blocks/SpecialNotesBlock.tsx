import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock} from '@/components/ui/form-block';
import {Textarea} from '@/components/ui/textarea';

// ---------------------------------------------------------------------------
// PROPS
// ---------------------------------------------------------------------------

interface SpecialNotesBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

/**
 * SpecialNotesBlock - Special notes / remarks textarea
 *
 * Renders a Card containing a single free-text textarea for general remarks.
 * Used as the last section before the submit footer on intake forms.
 *
 * @example
 * ```tsx
 * <SpecialNotesBlock form={form} t={t} />
 * ```
 */
export const SpecialNotesBlock: React.FC<SpecialNotesBlockProps> = ({
  form,
  t,
}) => {
  return (
    <FormCard title={t('specialNotes')}>
      <FormBlock columns={1} hoverEffect={false}>
        <Textarea
          placeholder={t('specialNotesPlaceholder')}
          value={form.watch('specialNotes')}
          onChange={e => form.setValue('specialNotes', e.target.value)}
          rows={5}
          className="resize-none"
        />
      </FormBlock>
    </FormCard>
  );
};

// ---------------------------------------------------------------------------
// ORIGINAL EXTRACTED CODE (reference snapshot from intake-osa/index.tsx)
// ---------------------------------------------------------------------------

// {/* Special Notes */}
// <Card>
//   <CardHeader>
//     <CardTitle>{t('specialNotes')}</CardTitle>
//   </CardHeader>
//   <CardContent>
//     <Textarea
//       placeholder={t('specialNotesPlaceholder')}
//       value={form.watch('specialNotes')}
//       onChange={e =>
//         form.setValue('specialNotes', e.target.value)
//       }
//       rows={5}
//       className="resize-none"
//     />
//   </CardContent>
// </Card>
