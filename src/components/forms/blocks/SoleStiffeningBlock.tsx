import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';

// ---------------------------------------------------------------------------
// PROPS
// ---------------------------------------------------------------------------

interface SoleStiffeningBlockProps {
  form: UseFormReturn<any>;
  t: (key: string) => string;
  showLeft?: boolean;
  showRight?: boolean;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

/**
 * SoleStiffeningBlock - Sole stiffening toggles (left/right)
 *
 * Uses direct per-side switches instead of a master toggle. The aggregate
 * `soleReinforcementEnabled` field is kept in sync for backward compatibility.
 */
export const SoleStiffeningBlock: React.FC<SoleStiffeningBlockProps> = ({
  form,
  t,
  showLeft = true,
  showRight = true,
}) => {
  const soleReinforcementLeft = !!form.watch('soleReinforcementLeft');
  const soleReinforcementRight = !!form.watch('soleReinforcementRight');

  React.useEffect(() => {
    form.setValue(
      'soleReinforcementEnabled',
      soleReinforcementLeft || soleReinforcementRight,
    );
  }, [form, soleReinforcementLeft, soleReinforcementRight]);

  return (
    <FormCard title={t('soleStiffening')}>
      <FormBlock columns={2} dividers={true} hoverEffect={false}>
        {showLeft && (
          <FormItemWrapper label={t('left')} className="items-center">
            <div className="flex items-center p-3 space-x-2">
              <Switch
                id="sole-stiffening-left-switch"
                checked={soleReinforcementLeft}
                onCheckedChange={checked => {
                  form.setValue('soleReinforcementLeft', !!checked);
                }}
              />
              <Label
                htmlFor="sole-stiffening-left-switch"
                className="font-normal cursor-pointer"
              >
                {soleReinforcementLeft ? t('yes') : t('no')}
              </Label>
            </div>
          </FormItemWrapper>
        )}

        {showRight && (
          <FormItemWrapper label={t('right')} className="items-center">
            <div className="flex items-center p-3 space-x-2">
              <Switch
                id="sole-stiffening-right-switch"
                checked={soleReinforcementRight}
                onCheckedChange={checked => {
                  form.setValue('soleReinforcementRight', !!checked);
                }}
              />
              <Label
                htmlFor="sole-stiffening-right-switch"
                className="font-normal cursor-pointer"
              >
                {soleReinforcementRight ? t('yes') : t('no')}
              </Label>
            </div>
          </FormItemWrapper>
        )}
      </FormBlock>
    </FormCard>
  );
};
