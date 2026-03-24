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
  MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE,
} from '@/domain/form/constants/formConstants';

type FormSide = 'Left' | 'Right';

type SideFieldConfig = {
  enclosureField: 'enclosureLeft' | 'enclosureRight';
  enclosureMmField: 'enclosureLeftMm' | 'enclosureRightMm';
  donkeyEarEnabledField: 'donkeyEarLeftEnabled' | 'donkeyEarRightEnabled';
  donkeyEarTypeField: 'donkeyEarLeftType' | 'donkeyEarRightType';
  shaftHeightField: 'shaftHeightLeft' | 'shaftHeightRight';
};

const SIDE_CONFIG: Record<FormSide, SideFieldConfig> = {
  Left: {
    enclosureField: 'enclosureLeft',
    enclosureMmField: 'enclosureLeftMm',
    donkeyEarEnabledField: 'donkeyEarLeftEnabled',
    donkeyEarTypeField: 'donkeyEarLeftType',
    shaftHeightField: 'shaftHeightLeft',
  },
  Right: {
    enclosureField: 'enclosureRight',
    enclosureMmField: 'enclosureRightMm',
    donkeyEarEnabledField: 'donkeyEarRightEnabled',
    donkeyEarTypeField: 'donkeyEarRightType',
    shaftHeightField: 'shaftHeightRight',
  },
};

const HEIGHT_OPTION = ENCLOSURE_OPTIONS[0];
const NUMERIC_INPUT_CLASS =
  'w-full sm:w-20 h-12 sm:h-auto text-base sm:text-sm';
const TYPE_SELECT_CLASS = 'w-full sm:w-40 h-12 sm:h-auto text-base sm:text-sm';

// Options that should auto-enable "Hoogte van omsluiting (cm)".
// Business rule: exclude option 0 (height itself) and donkey ear.
const AUTO_HEIGHT_TRIGGER_OPTIONS = ENCLOSURE_OPTIONS.filter(
  (option, index) => index > 0 && option.key !== 'donkeyEar',
);

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
  // DISPLAY FLAGS
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
  // FIELD HELPERS
  // ---------------------------------------------------------------------------
  const vibrateIfSupported = () => {
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const getOptionKeysForSide = (side: FormSide, option: EnclosureOption) => {
    return {
      fullKey: side === 'Left' ? option.fullKeyLinks : option.fullKeyRechts,
      mmKey: side === 'Left' ? option.mmKeyLinks : option.mmKeyRechts,
    };
  };

  const updateObjectField = <T extends Record<string, unknown>>(
    fieldName: string,
    updateFn: (prev: T) => T,
  ) => {
    const current = (form.getValues(fieldName) as T) || ({} as T);
    form.setValue(fieldName, updateFn(current));
  };

  const readBooleanMap = (fieldName: string) => {
    return (form.watch(fieldName) as Record<string, boolean>) || {};
  };

  const readStringMap = (fieldName: string) => {
    return (form.watch(fieldName) as Record<string, string>) || {};
  };

  const parseAutoHeightValue = (rawShaftHeight: unknown): string => {
    const shaftHeight = Number.parseFloat(String(rawShaftHeight ?? ''));
    if (Number.isNaN(shaftHeight)) {
      return '';
    }

    return String(shaftHeight - 2);
  };

  const setEnclosureOptionChecked = (
    side: FormSide,
    option: EnclosureOption,
    checked: boolean,
  ) => {
    const {enclosureField} = SIDE_CONFIG[side];
    const {fullKey} = getOptionKeysForSide(side, option);

    updateObjectField<Record<string, boolean>>(enclosureField, prev => ({
      ...prev,
      [fullKey]: checked,
    }));
  };

  const setEnclosureOptionMmValue = (
    side: FormSide,
    option: EnclosureOption,
    value: string,
  ) => {
    const {enclosureMmField} = SIDE_CONFIG[side];
    const {mmKey} = getOptionKeysForSide(side, option);

    updateObjectField<Record<string, string>>(enclosureMmField, prev => ({
      ...prev,
      [mmKey]: value,
    }));
  };

  const clearEnclosureOptionMmValue = (
    side: FormSide,
    option: EnclosureOption,
  ) => {
    const {enclosureMmField} = SIDE_CONFIG[side];
    const {mmKey} = getOptionKeysForSide(side, option);

    updateObjectField<Record<string, string>>(enclosureMmField, prev => {
      const next = {...prev};
      delete next[mmKey];
      return next;
    });
  };

  const getDonkeyEarTypeLabel = (typeValue: string) => {
    const matchedType = MEDIAL_LATERAL_OPTIONS_WITHOUT_NONE.find(
      option => option.value === typeValue,
    );

    return t(matchedType?.label || '');
  };

  const setHeightFromShaft = (side: FormSide) => {
    const {shaftHeightField} = SIDE_CONFIG[side];
    const autoHeight = parseAutoHeightValue(form.getValues(shaftHeightField));

    // Auto-enable option 0 and set it from shaft height minus 2.
    setEnclosureOptionChecked(side, HEIGHT_OPTION, true);
    setEnclosureOptionMmValue(side, HEIGHT_OPTION, autoHeight);
  };

  const toggleDonkeyEar = (side: FormSide, checked: boolean) => {
    const {donkeyEarEnabledField, donkeyEarTypeField} = SIDE_CONFIG[side];

    form.setValue(donkeyEarEnabledField, checked);

    // In VLOS mode, clearing donkey ear also clears its type.
    if (!checked && isVlosMode) {
      form.setValue(donkeyEarTypeField, '');
    }
  };

  const toggleEnclosureOption = (
    side: FormSide,
    option: EnclosureOption,
    checked: boolean,
  ) => {
    setEnclosureOptionChecked(side, option, checked);

    if (!checked) {
      clearEnclosureOptionMmValue(side, option);
      return;
    }

    if (option.needsMm && option.defaultMm) {
      setEnclosureOptionMmValue(side, option, option.defaultMm);
    }

    // If any trigger option is enabled, auto-enable option 0 and sync it from shaft height.
    if (
      AUTO_HEIGHT_TRIGGER_OPTIONS.some(trigger => trigger.key === option.key)
    ) {
      setHeightFromShaft(side);
    }
  };

  const handleToggle = (
    side: FormSide,
    option: EnclosureOption,
    checked: boolean,
  ) => {
    vibrateIfSupported();

    if (option.key === 'donkeyEar') {
      toggleDonkeyEar(side, checked);
      return;
    }

    toggleEnclosureOption(side, option, checked);
  };

  // ---------------------------------------------------------------------------
  // AUTO-ACTIVATE HEIGHT ON MOUNT
  // ---------------------------------------------------------------------------
  // If any trigger option is already selected (e.g., from defaultValues),
  // auto-enable the height option and sync from shaft height.
  React.useEffect(() => {
    const checkAndActivateHeight = (side: FormSide) => {
      const {enclosureField} = SIDE_CONFIG[side];
      const selectedEnclosureOptions = form.getValues(enclosureField) || {};

      const hasActiveTrigger = AUTO_HEIGHT_TRIGGER_OPTIONS.some(trigger => {
        const fullKey =
          side === 'Left' ? trigger.fullKeyLinks : trigger.fullKeyRechts;
        return selectedEnclosureOptions[fullKey];
      });

      if (hasActiveTrigger) {
        const {shaftHeightField} = SIDE_CONFIG[side];
        const autoHeight = parseAutoHeightValue(
          form.getValues(shaftHeightField),
        );

        // Auto-enable option 0 and set it from shaft height minus 2.
        setEnclosureOptionChecked(side, HEIGHT_OPTION, true);
        setEnclosureOptionMmValue(side, HEIGHT_OPTION, autoHeight);
      }
    };

    if (includeLeft) {
      checkAndActivateHeight('Left');
    }
    if (includeRight) {
      checkAndActivateHeight('Right');
    }
  }, []); // Run once on mount

  // ---------------------------------------------------------------------------
  // RENDER HELPERS
  // ---------------------------------------------------------------------------
  const renderSideOptions = (side: FormSide) => {
    const sideLabel = side === 'Left' ? t('left') : t('right');
    const {enclosureField, enclosureMmField, donkeyEarTypeField} =
      SIDE_CONFIG[side];
    const donkeyEnabled =
      side === 'Left' ? donkeyEarLeftEnabled : donkeyEarRightEnabled;
    const selectedEnclosureOptions = readBooleanMap(enclosureField);
    const mmValuesByOption = readStringMap(enclosureMmField);
    const donkeyEarType = form.watch(donkeyEarTypeField) || '';

    return (
      <FormItemWrapper label={sideLabel}>
        <div className="space-y-3 w-full lg:w-3/4">
          {ENCLOSURE_OPTIONS.map((option: EnclosureOption) => {
            const {fullKey, mmKey} = getOptionKeysForSide(side, option);
            const enclosureChecked = !!selectedEnclosureOptions[fullKey];
            const checked =
              option.key === 'donkeyEar' ? donkeyEnabled : enclosureChecked;
            const shouldShowNumericInput = option.needsMm && enclosureChecked;
            const showTypeSelect = option.needsTypeSelect && donkeyEnabled;
            const numericInputPlaceholder = option.key === 'hoge' ? 'cm' : 'mm';
            const numericInputMode =
              option.key === 'hoge' ? 'decimal' : 'numeric';
            const numericValue = mmValuesByOption[mmKey] || '';

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

                {/*
                  Numeric input for enclosure thickness/height.
                  The value is stored in enclosureLeftMm/enclosureRightMm,
                  keyed per selected enclosure option.
                */}
                {shouldShowNumericInput && (
                  <Input
                    type="number"
                    inputMode={numericInputMode}
                    pattern="[0-9]*"
                    placeholder={numericInputPlaceholder}
                    value={numericValue}
                    onChange={e =>
                      setEnclosureOptionMmValue(side, option, e.target.value)
                    }
                    className={NUMERIC_INPUT_CLASS}
                    autoComplete="off"
                  />
                )}

                {showTypeSelect && (
                  <div className="shrink-0">
                    <Select
                      value={donkeyEarType}
                      onValueChange={value =>
                        form.setValue(donkeyEarTypeField, value)
                      }
                    >
                      <SelectTrigger className={TYPE_SELECT_CLASS}>
                        <SelectValue>
                          {getDonkeyEarTypeLabel(donkeyEarType)}
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
                  </div>
                )}
              </Label>
            );
          })}
        </div>
      </FormItemWrapper>
    );
  };

  const renderCarbonStiffeningSwitch = (side: FormSide) => {
    const isLeft = side === 'Left';
    const switchId = isLeft ? 'carbon-lining-left' : 'carbon-lining-right';
    const fieldName = isLeft
      ? 'carbonStiffeningLiningShoeLeft'
      : 'carbonStiffeningLiningShoeRight';
    const label = isLeft ? t('left') : t('right');

    return (
      <FormItemWrapper>
        <div className="flex items-center space-x-2">
          <Label htmlFor={switchId} className="font-normal cursor-pointer">
            {label}
          </Label>
          <Switch
            id={switchId}
            checked={form.watch(fieldName) || false}
            onCheckedChange={checked => form.setValue(fieldName, !!checked)}
          />
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
          {includeLeft && renderCarbonStiffeningSwitch('Left')}
          {includeRight && renderCarbonStiffeningSwitch('Right')}
        </FormBlock>
      )}
    </FormCard>
  );
};
