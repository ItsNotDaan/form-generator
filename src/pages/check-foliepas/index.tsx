import React from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import {Switch} from '@/components/ui/switch';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {
  ENCLOSURE_OPTIONS,
  EnclosureOption,
  SHAFT_OPENING_OPTIONS,
  MEDIAL_LATERAL_OPTIONS,
  Side,
  SIDE_OPTIONS,
  LAST_CORRECTION_OPTIONS,
} from '@/domain/form/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {
  setCheckFoliepasData,
  setClientData,
} from '@/domain/store/slices/formData';

import {ChevronRight, Info} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form} from '@/components/ui/form';
import {scrollToFirstError} from '@/utils/formHelpers';
import {Textarea} from '@/components/ui/textarea';
import {useFormPersistence} from '@/hooks/useFormPersistence';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';

const FormCheckFoliepasPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    // Side Selection
    side: z.string().optional(),

    // Reading Corrections
    readingCorrectionAfterFoilFit: z.string().optional(),
    readingCorrectionAfterLiningShoe: z.string().optional(),

    // Foliepas Aanmerkingen - Shaft Heights
    shaftHeightLeft: z.string().optional(),
    shaftHeightRight: z.string().optional(),

    // Foliepas Aanmerkingen - Leg Length Difference
    legLengthDifferenceLeft: z.string().optional(),
    legLengthDifferenceRight: z.string().optional(),

    // Foliepas Aanmerkingen - Shaft Opening
    shaftOpeningWidth: z.string().optional(),

    // Voeringschoen Opties - Enclosure (Omsluiting)
    enclosureLeft: z.record(z.string(), z.boolean()),
    enclosureRight: z.record(z.string(), z.boolean()),
    enclosureLeftMm: z.record(z.string(), z.string()),
    enclosureRightMm: z.record(z.string(), z.string()),

    // Voeringschoen Opties - Donkey Ear (Ezelsoor)
    donkeyEarLeftEnabled: z.boolean(),
    donkeyEarRightEnabled: z.boolean(),
    donkeyEarLeftType: z.string().optional(),
    donkeyEarRightType: z.string().optional(),

    // Voeringschoen Opties - Carbon Stiffening Lining Shoe
    carbonStiffeningLiningShoeLeft: z.boolean().optional(),
    carbonStiffeningLiningShoeRight: z.boolean().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      // Side Selection
      side: SIDE_OPTIONS[0]?.value || '',

      // Reading Corrections
      readingCorrectionAfterFoilFit: '',
      readingCorrectionAfterLiningShoe: '',

      // Foliepas Aanmerkingen - Shaft Heights
      shaftHeightLeft: '12.5',
      shaftHeightRight: '12.5',

      // Foliepas Aanmerkingen - Leg Length Difference
      legLengthDifferenceLeft: '',
      legLengthDifferenceRight: '',

      // Foliepas Aanmerkingen - Shaft Opening
      shaftOpeningWidth: SHAFT_OPENING_OPTIONS[2]?.value || '',

      // Voeringschoen Opties - Enclosure (Omsluiting)
      enclosureLeft: {},
      enclosureRight: {},
      enclosureLeftMm: {},
      enclosureRightMm: {},

      // Voeringschoen Opties - Donkey Ear (Ezelsoor)
      donkeyEarLeftEnabled: false,
      donkeyEarRightEnabled: false,
      donkeyEarLeftType: MEDIAL_LATERAL_OPTIONS[0]?.value || '',
      donkeyEarRightType: MEDIAL_LATERAL_OPTIONS[0]?.value || '',

      // Voeringschoen Opties - Carbon Stiffening Lining Shoe
      carbonStiffeningLiningShoeLeft: false,
      carbonStiffeningLiningShoeRight: false,
    },
  });

  const {clearStorage} = useFormPersistence(
    'checkFoliepas',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  const side = form.watch('side');
  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

  // Watch for conditional visibility
  const carbonStiffeningLiningShoeLeft = form.watch(
    'carbonStiffeningLiningShoeLeft',
  );
  const carbonStiffeningLiningShoeRight = form.watch(
    'carbonStiffeningLiningShoeRight',
  );

  const onSubmit = (data: FormData) => {
    dispatch(setCheckFoliepasData({...data, side: data.side as Side}));
    void router.push(Routes.form_results);
  };

  const handleCreateShoeDesign = form.handleSubmit(data => {
    dispatch(setCheckFoliepasData({...data, side: data.side as Side}));
    void router.push(Routes.form_create_shoedesign);
  }, scrollToFirstError);

  return (
    <BaseLayout title={t('checkFoliepas')} currentStep={3}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('checkFoliepas')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('checkFoliepasDescription')}
          </p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* Side Selection */}
              <FormCard title={t('side')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormItemWrapper>
                    <RadioGroup
                      value={side}
                      onValueChange={v => form.setValue('side', v)}
                    >
                      <div className="flex flex-row justify-center gap-6">
                        {SIDE_OPTIONS.map(option => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={`side-${option.value}`}
                            />
                            <Label
                              htmlFor={`side-${option.value}`}
                              className="font-normal cursor-pointer"
                            >
                              {t(option.value)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Reading Corrections after Foil Fit */}
              <FormCard title={t('readingCorrectionAfterFoilFit')}>
                {/* Pressable Labels Section */}
                <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {LAST_CORRECTION_OPTIONS.map(optie => (
                    <Label
                      key={optie.value}
                      onClick={() => {
                        // Get current value
                        const currentText =
                          form.getValues('readingCorrectionAfterFoilFit') || '';

                        // Construct new line: "- Translation: Links: Rechts:"
                        const textToAdd = '- ' + t(optie.value);

                        // Append with newline if text exists
                        const newText = currentText
                          ? `${currentText}\n${textToAdd}`
                          : textToAdd;

                        // Update form
                        form.setValue(
                          'readingCorrectionAfterFoilFit',
                          newText,
                          {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          },
                        );
                        clearStorage();
                      }}
                      className="flex cursor-pointer items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 transition-colors hover:bg-accent/30"
                    >
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm font-medium leading-none">
                          {optie.label}
                        </p>
                      </div>
                    </Label>
                  ))}
                </div>

                {/* Textarea */}
                <Textarea
                  id="reading-correction-foil-fit"
                  placeholder={t('readingCorrectionAfterFoilFit')}
                  // Using watch/setValue pattern ensures the textarea updates when buttons are clicked
                  value={form.watch('readingCorrectionAfterFoilFit') || ''}
                  onChange={e =>
                    form.setValue(
                      'readingCorrectionAfterFoilFit',
                      e.target.value,
                      {
                        shouldDirty: true,
                        shouldTouch: true,
                      },
                    )
                  }
                />
              </FormCard>

              {/* Reading Corrections after Lining Shoe */}
              <FormCard title={t('readingCorrectionAfterLiningShoe')}>
                {/* Pressable Labels Section */}
                <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {LAST_CORRECTION_OPTIONS.map(optie => (
                    <Label
                      key={optie.value}
                      onClick={() => {
                        // Get current value
                        const currentText =
                          form.getValues('readingCorrectionAfterLiningShoe') ||
                          '';

                        // Construct new line: "- Translation: Links: Rechts:"
                        const textToAdd = '- ' + t(optie.value);

                        // Append with newline if text exists
                        const newText = currentText
                          ? `${currentText}\n${textToAdd}`
                          : textToAdd;

                        // Update form
                        form.setValue(
                          'readingCorrectionAfterLiningShoe',
                          newText,
                          {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          },
                        );
                      }}
                      className="flex cursor-pointer items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 transition-colors hover:bg-accent/30"
                    >
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm font-medium leading-none">
                          {optie.label}
                        </p>
                      </div>
                    </Label>
                  ))}
                </div>
                {/* Textarea */}
                <Textarea
                  id="reading-correction-lining-shoe"
                  placeholder={t('readingCorrectionAfterLiningShoe')}
                  value={form.watch('readingCorrectionAfterLiningShoe') || ''}
                  onChange={e =>
                    form.setValue(
                      'readingCorrectionAfterLiningShoe',
                      e.target.value,
                      {
                        shouldDirty: true,
                        shouldTouch: true,
                      },
                    )
                  }
                />
              </FormCard>

              {/* Enclosure + Beenlengte + Openstand */}
              <FormCard
                title="Foliepas aanmerkingen"
                description={`${t('shaftHeight')} • ${t('legLengthDifference')} • ${t('shaftOpening')}`}
              >
                {/* Shaft Height (Schacht Hoogte) */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('shaftHeightCm')}
                >
                  {showLinks && (
                    <FormItemWrapper
                      label={t('leftCm')}
                      className="items-center"
                    >
                      <Input
                        id="shaft-left"
                        type="number"
                        placeholder={t('cmPlaceholder')}
                        value={form.watch('shaftHeightLeft')}
                        onChange={e =>
                          form.setValue('shaftHeightLeft', e.target.value)
                        }
                        className="w-2/3 text-center"
                      />
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper
                      className="items-center"
                      label={t('rightCm')}
                    >
                      <Input
                        id="shaft-right"
                        type="number"
                        placeholder={t('cmPlaceholder')}
                        value={form.watch('shaftHeightRight')}
                        onChange={e =>
                          form.setValue('shaftHeightRight', e.target.value)
                        }
                        className="w-2/3 text-center"
                      />
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Beenlengte verschil */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('legLengthDifference')}
                >
                  <FormItemWrapper label={t('leftCm')}>
                    <Input
                      id="leg-length-left"
                      type="text"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('legLengthDifferenceLeft')}
                      onChange={e =>
                        form.setValue('legLengthDifferenceLeft', e.target.value)
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('rightCm')}>
                    <Input
                      id="leg-length-right"
                      type="text"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('legLengthDifferenceRight')}
                      onChange={e =>
                        form.setValue(
                          'legLengthDifferenceRight',
                          e.target.value,
                        )
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>

                {/* Openstand schacht */}
                <FormBlock
                  title={t('shaftOpening')}
                  columns={1}
                  dividers={false}
                  hoverEffect={false}
                >
                  <FormItemWrapper>
                    <RadioGroup
                      value={form.watch('shaftOpeningWidth') || ''}
                      onValueChange={v => form.setValue('shaftOpeningWidth', v)}
                      className="justify-center"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-2">
                        {SHAFT_OPENING_OPTIONS.map(opt => (
                          <Label
                            key={opt.value}
                            htmlFor={`opening-${opt.value}`}
                            className="flex justify-center items-center gap-2 rounded-md border bg-background px-3 py-2 cursor-pointer max-w-fit"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`opening-${opt.value}`}
                            />
                            <span className="text-sm text-foreground">
                              {opt.label.replace('.', ',')} cm
                            </span>
                          </Label>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Voeringsschoen: Omsluiting, Ezelsoor, Koolstofverstijving */}
              <FormCard
                title="Voeringschoen opties"
                description={`${t('enclosure')} • ${t('donkeyEar')} • ${t('carbonStiffeningLiningShoe')}`}
              >
                {/* Enclosure (Omsluiting) */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('enclosure')}
                >
                  {showLinks && (
                    <FormItemWrapper label={t('left')}>
                      <div className="space-y-3 w-full lg:w-3/4">
                        {' '}
                        {/* Full on mobile, 3/4 on desktop */}
                        {ENCLOSURE_OPTIONS.map((optie: EnclosureOption) => (
                          <Label
                            key={optie.key}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 sm:p-2 cursor-pointer transition-colors hover:bg-accent/30 has-aria-checked:bg-accent/50"
                          >
                            <Switch
                              id={`encl-left-${optie.key}`}
                              checked={
                                optie.key === 'donkeyEar'
                                  ? form.watch('donkeyEarLeftEnabled') || false
                                  : (form.watch('enclosureLeft')[
                                      optie.fullKeyLinks
                                    ] as boolean) || false
                              }
                              onCheckedChange={checked => {
                                if (window.navigator?.vibrate) {
                                  window.navigator.vibrate(10);
                                }

                                if (optie.key === 'donkeyEar') {
                                  form.setValue(
                                    'donkeyEarLeftEnabled',
                                    !!checked,
                                  );
                                } else {
                                  form.setValue('enclosureLeft', {
                                    ...form.getValues('enclosureLeft'),
                                    [optie.fullKeyLinks]: !!checked,
                                  });
                                  if (
                                    checked &&
                                    optie.needsMm &&
                                    optie.defaultMm
                                  ) {
                                    form.setValue('enclosureLeftMm', {
                                      ...form.getValues('enclosureLeftMm'),
                                      [optie.mmKeyLinks]: optie.defaultMm,
                                    });
                                  } else if (!checked) {
                                    const next = {
                                      ...form.getValues('enclosureLeftMm'),
                                    };
                                    delete next[optie.mmKeyLinks];
                                    form.setValue('enclosureLeftMm', next);
                                  }
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="font-normal text-base sm:text-sm leading-tight flex-1">
                              {optie.label}
                            </span>
                            {optie.needsMm &&
                              (form.watch('enclosureLeft')[
                                optie.fullKeyLinks
                              ] as boolean) && (
                                <Input
                                  type="number"
                                  inputMode={
                                    optie.key === 'hoge' ? 'decimal' : 'numeric'
                                  }
                                  pattern="[0-9]*"
                                  placeholder={
                                    optie.key === 'hoge' ? 'cm' : 'mm'
                                  }
                                  value={
                                    (form.watch('enclosureLeftMm')[
                                      optie.mmKeyLinks
                                    ] as string) || ''
                                  }
                                  onChange={e =>
                                    form.setValue('enclosureLeftMm', {
                                      ...form.getValues('enclosureLeftMm'),
                                      [optie.mmKeyLinks]: e.target.value,
                                    })
                                  }
                                  className="w-full sm:w-20 h-12 sm:h-auto text-base sm:text-sm"
                                  autoComplete="off"
                                />
                              )}
                            {optie.needsTypeSelect &&
                              (form.watch('donkeyEarLeftEnabled') || false) && (
                                <div className="shrink-0">
                                  <Select
                                    value={form.watch('donkeyEarLeftType')}
                                    onValueChange={v =>
                                      form.setValue('donkeyEarLeftType', v)
                                    }
                                  >
                                    <SelectTrigger className="w-full h-12 sm:h-auto text-base sm:text-sm">
                                      <SelectValue>
                                        {t(
                                          MEDIAL_LATERAL_OPTIONS.find(
                                            opt =>
                                              opt.value ===
                                              form.watch('donkeyEarLeftType'),
                                          )?.label || '',
                                        )}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {MEDIAL_LATERAL_OPTIONS.map(opt => (
                                        <SelectItem
                                          key={opt.value}
                                          value={opt.value}
                                        >
                                          {t(opt.label)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                          </Label>
                        ))}
                      </div>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper label={t('right')}>
                      <div className="space-y-3 w-full lg:w-3/4">
                        {ENCLOSURE_OPTIONS.map((optie: EnclosureOption) => (
                          <Label
                            key={optie.key}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 sm:p-2 cursor-pointer transition-colors hover:bg-accent/30 has-aria-checked:bg-accent/50"
                          >
                            <Switch
                              id={`encl-right-${optie.key}`}
                              checked={
                                optie.key === 'donkeyEar'
                                  ? form.watch('donkeyEarRightEnabled') || false
                                  : (form.watch('enclosureRight')[
                                      optie.fullKeyRechts
                                    ] as boolean) || false
                              }
                              onCheckedChange={checked => {
                                if (window.navigator?.vibrate) {
                                  window.navigator.vibrate(10);
                                }

                                if (optie.key === 'donkeyEar') {
                                  form.setValue(
                                    'donkeyEarRightEnabled',
                                    !!checked,
                                  );
                                } else {
                                  form.setValue('enclosureRight', {
                                    ...form.getValues('enclosureRight'),
                                    [optie.fullKeyRechts]: !!checked,
                                  });
                                  if (
                                    checked &&
                                    optie.needsMm &&
                                    optie.defaultMm
                                  ) {
                                    form.setValue('enclosureRightMm', {
                                      ...form.getValues('enclosureRightMm'),
                                      [optie.mmKeyRechts]: optie.defaultMm,
                                    });
                                  } else if (!checked) {
                                    const next = {
                                      ...form.getValues('enclosureRightMm'),
                                    };
                                    delete next[optie.mmKeyRechts];
                                    form.setValue('enclosureRightMm', next);
                                  }
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="font-normal text-base sm:text-sm leading-tight flex-1">
                              {optie.label}
                            </span>
                            {optie.needsMm &&
                              (form.watch('enclosureRight')[
                                optie.fullKeyRechts
                              ] as boolean) && (
                                <Input
                                  type="number"
                                  inputMode={
                                    optie.key === 'hoge' ? 'decimal' : 'numeric'
                                  }
                                  pattern="[0-9]*"
                                  placeholder={
                                    optie.key === 'hoge' ? 'cm' : 'mm'
                                  }
                                  value={
                                    (form.watch('enclosureRightMm')[
                                      optie.mmKeyRechts
                                    ] as string) || ''
                                  }
                                  onChange={e =>
                                    form.setValue('enclosureRightMm', {
                                      ...form.getValues('enclosureRightMm'),
                                      [optie.mmKeyRechts]: e.target.value,
                                    })
                                  }
                                  className="w-full sm:w-20 h-12 sm:h-auto text-base sm:text-sm"
                                  autoComplete="off"
                                />
                              )}
                            {optie.needsTypeSelect &&
                              (form.watch('donkeyEarRightEnabled') ||
                                false) && (
                                <div className="shrink-0">
                                  <Select
                                    value={form.watch('donkeyEarRightType')}
                                    onValueChange={v =>
                                      form.setValue('donkeyEarRightType', v)
                                    }
                                  >
                                    <SelectTrigger className="w-full h-12 sm:h-auto text-base sm:text-sm">
                                      <SelectValue>
                                        {t(
                                          MEDIAL_LATERAL_OPTIONS.find(
                                            opt =>
                                              opt.value ===
                                              form.watch('donkeyEarRightType'),
                                          )?.label || '',
                                        )}
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {MEDIAL_LATERAL_OPTIONS.map(opt => (
                                        <SelectItem
                                          key={opt.value}
                                          value={opt.value}
                                        >
                                          {t(opt.label)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                          </Label>
                        ))}
                      </div>
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Zoolverstijving Voeringschoen (Carbon Stiffening Lining Shoe) */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('carbonStiffeningLiningShoe')}
                >
                  {showLinks && (
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
                            form.watch('carbonStiffeningLiningShoeLeft') ||
                            false
                          }
                          onCheckedChange={checked =>
                            form.setValue(
                              'carbonStiffeningLiningShoeLeft',
                              !!checked,
                            )
                          }
                        />
                      </div>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
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
                            form.watch('carbonStiffeningLiningShoeRight') ||
                            false
                          }
                          onCheckedChange={checked =>
                            form.setValue(
                              'carbonStiffeningLiningShoeRight',
                              !!checked,
                            )
                          }
                        />
                      </div>
                    </FormItemWrapper>
                  )}
                </FormBlock>
              </FormCard>

              <FormCard
                title={t('createShoeDesign?')}
                contentClassName="justify-center items-center text-center"
              >
                <Button
                  type="button"
                  size="lg"
                  className="items-center w-2/3"
                  onClick={handleCreateShoeDesign}
                >
                  <span className="mr-2">{t('createShoeDesign')}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </FormCard>

              {/* Submit Section */}
              <FormFooter>
                {/* Reset inputs in page button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetDraft}
                >
                  {t('reset')}
                </Button>

                {/* Cancel button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  {t('cancel')}
                </Button>

                {/* Save and continue button */}
                <Button type="submit" size="lg" className="min-w-50">
                  <span className="mr-2">{t('saveAndContinue')}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </FormFooter>
            </form>
          </Form>
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default FormCheckFoliepasPage;
