import React from 'react';
import {getAssetPath} from '@/utils/assetPath';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Separator} from '@/components/ui/separator';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {
  ENCLOSURE_OPTIONS,
  OmsluitingKey,
  EnclosureOption,
  SHAFT_OPENING_OPTIONS,
  SUPPLEMENT_TYPE_OPTIONS,
  HEEL_TYPE_OPTIONS,
  WALKING_SOLE_OPTIONS,
  CLOSURE_OPTIONS,
  HEEL_WEDGE_TYPE_OPTIONS,
  DONKEY_EAR_TYPE_OPTIONS,
  YES_NO_OPTIONS,
  PAIR_TYPE_OPTIONS,
  Side,
  PATHOLOGIES_OPTIONS,
  WALKING_DISTANCE_AIDS_OPTIONS,
  FOOT_INSPECTION_OPTIONS,
} from '@/domain/form/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {setIntakeVLOSData, setClientData} from '@/domain/store/slices/formData';

import {ChevronRight} from 'lucide-react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {scrollToFirstError} from '@/utils/formHelpers';
import {useFormPersistence} from '@/hooks/useFormPersistence';
import {Switch} from '@/components/ui/switch';

const FormIntakeVLOSPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    whichPair: z.string(),
    medicalIndication: z.string().optional(),
    side: z.enum(['left', 'right', 'both'] as const),

    shaftHeightLeft: z.string().optional(),
    shaftHeightRight: z.string().optional(),
    enclosureLeft: z.record(z.string(), z.boolean()),
    enclosureRight: z.record(z.string(), z.boolean()),
    enclosureLeftMm: z.record(z.string(), z.string()),
    enclosureRightMm: z.record(z.string(), z.string()),
    customInsoleShoringLeftEnabled: z.boolean(),
    customInsoleShoringRightEnabled: z.boolean(),
    customInsoleShoringLeftType: z.string().optional(),
    customInsoleShoringRightType: z.string().optional(),
    soleReinforcementEnabled: z.boolean(),
    soleReinforcementLeft: z.boolean().optional(),
    soleReinforcementRight: z.boolean().optional(),
    closureType: z.string().optional(),
    entryPoint: z.string().optional(),
    shaftOpeningWidth: z.string().optional(),
    tonguePaddingEnabled: z.boolean(),
    fixedTongueEnabled: z.boolean(),
    heelTypeLeft: z.string().optional(),
    heelTypeRight: z.string().optional(),
    heelHeightLeft: z.string().optional(),
    heelHeightRight: z.string().optional(),
    heelWedgeLeftEnabled: z.boolean(),
    heelWedgeRightEnabled: z.boolean(),
    heelWedgeLeftType: z.string().optional(),
    heelWedgeRightType: z.string().optional(),
    donkeyEarLeftEnabled: z.boolean(),
    donkeyEarRightEnabled: z.boolean(),
    donkeyEarLeftType: z.string().optional(),
    donkeyEarRightType: z.string().optional(),
    amputationLeftEnabled: z.boolean(),
    amputationRightEnabled: z.boolean(),
    heelRoundingLeftEnabled: z.boolean(),
    heelRoundingRightEnabled: z.boolean(),
    heelRoundingLeftHeight: z.string().optional(),
    heelRoundingLeftLength: z.string().optional(),
    heelRoundingRightHeight: z.string().optional(),
    heelRoundingRightLength: z.string().optional(),
    rockerSoleType: z.string().optional(),

    specialNotes: z.string().optional(),

    // Functieonderzoek fields
    pathologies: z.record(z.string(), z.boolean()),
    walkingDistanceAids: z.record(z.string(), z.boolean()),
    painPerception: z.string().optional(),
    footInspection: z.record(z.string(), z.boolean()),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      whichPair: 'Eerste paar',
      medicalIndication: '',
      side: 'both',
      shaftHeightLeft: '14',
      shaftHeightRight: '14',
      enclosureLeft: {omsluitingLinksMultivorm: true},
      enclosureRight: {omsluitingRechtsMultivorm: true},
      enclosureLeftMm: {omsluitingMmLinksMultivorm: '3'},
      enclosureRightMm: {omsluitingMmRechtsMultivorm: '3'},
      customInsoleShoringLeftEnabled: false,
      customInsoleShoringRightEnabled: false,
      customInsoleShoringLeftType: HEEL_WEDGE_TYPE_OPTIONS[0]?.value || '',
      customInsoleShoringRightType: HEEL_WEDGE_TYPE_OPTIONS[0]?.value || '',
      soleReinforcementEnabled: false,
      soleReinforcementLeft: false,
      soleReinforcementRight: false,
      closureType: CLOSURE_OPTIONS[0]?.value || '',
      entryPoint: '',
      shaftOpeningWidth: SHAFT_OPENING_OPTIONS[2]?.value || '',
      tonguePaddingEnabled: false,
      fixedTongueEnabled: false,
      heelTypeLeft: HEEL_TYPE_OPTIONS[0]?.value || '',
      heelTypeRight: HEEL_TYPE_OPTIONS[0]?.value || '',
      heelHeightLeft: '2',
      heelHeightRight: '2',
      heelWedgeLeftEnabled: false,
      heelWedgeRightEnabled: false,
      heelWedgeLeftType: HEEL_WEDGE_TYPE_OPTIONS[0]?.value || '',
      heelWedgeRightType: HEEL_WEDGE_TYPE_OPTIONS[0]?.value || '',
      donkeyEarLeftEnabled: false,
      donkeyEarRightEnabled: false,
      donkeyEarLeftType: HEEL_WEDGE_TYPE_OPTIONS[0]?.value || '',
      donkeyEarRightType: HEEL_WEDGE_TYPE_OPTIONS[0]?.value || '',
      amputationLeftEnabled: false,
      amputationRightEnabled: false,
      heelRoundingLeftEnabled: true,
      heelRoundingRightEnabled: true,
      heelRoundingLeftHeight: '13',
      heelRoundingLeftLength: '50',
      heelRoundingRightHeight: '13',
      heelRoundingRightLength: '50',
      rockerSoleType: WALKING_SOLE_OPTIONS[0]?.value || '',
      specialNotes: '',

      // Functieonderzoek defaults
      pathologies: {},
      walkingDistanceAids: {},
      painPerception: '0',
      footInspection: {},
    },
  });

  const {clearStorage} = useFormPersistence(
    'intakeVLOS',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  const side = form.watch('side');
  const soleReinforcementEnabled = form.watch('soleReinforcementEnabled');
  const customInsoleShoringLeftEnabled = form.watch(
    'customInsoleShoringLeftEnabled',
  );
  const customInsoleShoringRightEnabled = form.watch(
    'customInsoleShoringRightEnabled',
  );
  const heelWedgeLeftEnabled = form.watch('heelWedgeLeftEnabled');
  const heelWedgeRightEnabled = form.watch('heelWedgeRightEnabled');
  const donkeyEarLeftEnabled = form.watch('donkeyEarLeftEnabled');
  const donkeyEarRightEnabled = form.watch('donkeyEarRightEnabled');
  const heelRoundingLeftEnabled = form.watch('heelRoundingLeftEnabled');
  const heelRoundingRightEnabled = form.watch('heelRoundingRightEnabled');
  const enclosureLeft = form.watch('enclosureLeft');
  const enclosureRight = form.watch('enclosureRight');

  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

  // Helper functions
  const boolToString = (value: boolean): string => (value ? 'ja' : 'nee');
  const stringToBool = (value: string): boolean => value === 'ja';

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'VLOS'}));
    }

    dispatch(
      setIntakeVLOSData({
        whichPair: data.whichPair,
        medicalIndication: data.medicalIndication || '',
        side: data.side,
        shaftHeightLeft: data.shaftHeightLeft || '',
        shaftHeightRight: data.shaftHeightRight || '',
        enclosureLeft: data.enclosureLeft as Record<string, boolean>,
        enclosureRight: data.enclosureRight as Record<string, boolean>,
        enclosureLeftMm: data.enclosureLeftMm as Record<string, string>,
        enclosureRightMm: data.enclosureRightMm as Record<string, string>,
        customInsoleShoringLeftEnabled: data.customInsoleShoringLeftEnabled,
        customInsoleShoringRightEnabled: data.customInsoleShoringRightEnabled,
        customInsoleShoringLeftType: data.customInsoleShoringLeftType || '',
        customInsoleShoringRightType: data.customInsoleShoringRightType || '',
        soleReinforcementEnabled: data.soleReinforcementEnabled,
        soleReinforcementLeft: data.soleReinforcementLeft,
        soleReinforcementRight: data.soleReinforcementRight,
        closureType: data.closureType || '',
        entryPoint: data.entryPoint || '',
        shaftOpeningWidth: data.shaftOpeningWidth || '',
        tonguePaddingEnabled: data.tonguePaddingEnabled,
        fixedTongueEnabled: data.fixedTongueEnabled,
        heelTypeLeft: data.heelTypeLeft || '',
        heelTypeRight: data.heelTypeRight || '',
        heelHeightLeft: data.heelHeightLeft || '',
        heelHeightRight: data.heelHeightRight || '',
        heelWedgeLeftEnabled: data.heelWedgeLeftEnabled,
        heelWedgeRightEnabled: data.heelWedgeRightEnabled,
        heelWedgeLeftType: data.heelWedgeLeftType || '',
        heelWedgeRightType: data.heelWedgeRightType || '',
        donkeyEarLeftEnabled: data.donkeyEarLeftEnabled,
        donkeyEarRightEnabled: data.donkeyEarRightEnabled,
        donkeyEarLeftType: data.donkeyEarLeftType || '',
        donkeyEarRightType: data.donkeyEarRightType || '',
        amputationLeftEnabled: data.amputationLeftEnabled,
        amputationRightEnabled: data.amputationRightEnabled,
        heelRoundingLeftEnabled: data.heelRoundingLeftEnabled,
        heelRoundingRightEnabled: data.heelRoundingRightEnabled,
        heelRoundingLeftHeight: data.heelRoundingLeftHeight || '',
        heelRoundingLeftLength: data.heelRoundingLeftLength || '',
        heelRoundingRightHeight: data.heelRoundingRightHeight || '',
        heelRoundingRightLength: data.heelRoundingRightLength || '',
        rockerSoleType: data.rockerSoleType || '',
        specialNotes: data.specialNotes || '',

        // Functieonderzoek fields
        pathologies: data.pathologies as Record<string, boolean>,
        walkingDistanceAids: data.walkingDistanceAids as Record<
          string,
          boolean
        >,
        painPerception: data.painPerception || '',
        footInspection: data.footInspection as Record<string, boolean>,
      }),
    );

    clearStorage();

    void router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeVlos')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('intakeVlos')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('vlosDescription')}
          </p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* Paartype & indicatie */}
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
                            className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors"
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
                      onChange={e =>
                        form.setValue('medicalIndication', e.target.value)
                      }
                      rows={4}
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Side & Amputation */}
              <FormCard
                title={t('side') + ' & ' + t('amputation')}
                description={t('sideAmputationDescription')}
              >
                <FormBlock columns={2} dividers={true} hoverEffect={false}>
                  {/* Side Selection */}
                  <FormItemWrapper label={t('side')}>
                    <FormField
                      control={form.control}
                      name="side"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <div className="flex flex-wrap gap-6">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="both" id="side-both" />
                                  <Label htmlFor="side-both">{t('both')}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="left" id="side-left" />
                                  <Label htmlFor="side-left">{t('left')}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="right"
                                    id="side-right"
                                  />
                                  <Label htmlFor="side-right">
                                    {t('right')}
                                  </Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>

                  {/* Amputation */}
                  <FormItemWrapper label={t('amputation')}>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="amp-left"
                          checked={form.watch('amputationLeftEnabled')}
                          onCheckedChange={checked =>
                            form.setValue('amputationLeftEnabled', !!checked)
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
                        <Checkbox
                          id="amp-right"
                          checked={form.watch('amputationRightEnabled')}
                          onCheckedChange={checked =>
                            form.setValue('amputationRightEnabled', !!checked)
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
                </FormBlock>
              </FormCard>

              {/* Functieonderzoek*/}
              <FormCard
                title={t('functionalResearch')}
                description={t('functionalResearchDescription')}
              >
                {/* Ziektebeelden */}
                <FormBlock
                  title={t('medicalConditions')}
                  columns={3}
                  dividers={false}
                  centerTitle={true}
                >
                  {PATHOLOGIES_OPTIONS.map(optie => (
                    <Label
                      key={optie.key}
                      className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
                    >
                      <Checkbox
                        id={`ziektebeeld-${optie.key}`}
                        checked={
                          (form.watch('pathologies')[optie.key] as boolean) ||
                          false
                        }
                        onCheckedChange={checked =>
                          form.setValue('pathologies', {
                            ...form.getValues('pathologies'),
                            [optie.key]: !!checked,
                          })
                        }
                        className=""
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t(optie.value)}
                        </p>
                      </div>
                    </Label>
                  ))}
                </FormBlock>

                {/* Loopafstand hulpmiddelen */}
                <FormBlock
                  title={t('walkingDistanceAids')}
                  columns={3}
                  dividers={false}
                  centerTitle={true}
                >
                  {WALKING_DISTANCE_AIDS_OPTIONS.map(optie => (
                    <Label
                      key={optie.key}
                      className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
                    >
                      <Checkbox
                        id={`loopafstand-${optie.key}`}
                        checked={
                          (form.watch('walkingDistanceAids')[
                            optie.key
                          ] as boolean) || false
                        }
                        onCheckedChange={checked =>
                          form.setValue('walkingDistanceAids', {
                            ...form.getValues('walkingDistanceAids'),
                            [optie.key]: !!checked,
                          })
                        }
                        className=""
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t(optie.value)}
                        </p>
                      </div>
                    </Label>
                  ))}
                </FormBlock>

                {/* Pijnbeleving */}
                <FormBlock title={t('painPerception')} centerTitle={true}>
                  <div className="space-y-2 pt-2">
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div className="text-sm leading-none font-medium text-center">
                        {t('noPain')} (0)
                      </div>
                      <Input
                        id="pain-perception"
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={form.watch('painPerception') || '0'}
                        onChange={e =>
                          form.setValue('painPerception', e.target.value)
                        }
                        className="col-span-4 accent-primary"
                      />
                      <div className="text-sm leading-none font-medium text-center">
                        {t('maximumPain')} (10)
                      </div>
                    </div>
                    <div className="text-center text-2xl font-bold">
                      {form.watch('painPerception') || '0'}
                    </div>
                  </div>
                </FormBlock>

                {/* Inspectie voeten */}
                <FormBlock
                  title={t('footInspection')}
                  centerTitle={true}
                  columns={3}
                  dividers={false}
                >
                  {FOOT_INSPECTION_OPTIONS.map(optie => (
                    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30">
                      <Checkbox
                        id={`foot-inspection-${optie.key}`}
                        checked={
                          (form.watch('footInspection')[
                            optie.key
                          ] as boolean) || false
                        }
                        onCheckedChange={checked =>
                          form.setValue('footInspection', {
                            ...form.getValues('footInspection'),
                            [optie.key]: !!checked,
                          })
                        }
                        className=""
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t(optie.value)}
                        </p>
                      </div>
                    </Label>
                  ))}
                </FormBlock>
              </FormCard>

              {/* Shaft Height */}
              <FormCard title={t('shaftHeight')}>
                <FormBlock columns={2} dividers={true} hoverEffect={false}>
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
              </FormCard>

              {/* Shaft Opening */}
              <FormCard title={t('shaftOpening')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormItemWrapper>
                    <RadioGroup
                      value={form.watch('shaftOpeningWidth')}
                      onValueChange={v => form.setValue('shaftOpeningWidth', v)}
                    >
                      <div className="flex flex-wrap justify-center gap-4">
                        {SHAFT_OPENING_OPTIONS.map(opt => (
                          <div
                            key={opt.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`opening-${opt.value}`}
                            />
                            <Label
                              htmlFor={`opening-${opt.value}`}
                              className="font-normal cursor-pointer"
                            >
                              {opt.label.replace('.', ',')} cm
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Enclosure (Omsluiting)*/}
              <FormCard title={t('enclosure')}>
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
                                (form.watch('enclosureLeft')[
                                  optie.fullKeyLinks
                                ] as boolean) || false
                              }
                              onCheckedChange={checked => {
                                if (window.navigator?.vibrate) {
                                  window.navigator.vibrate(10);
                                }

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
                                (form.watch('enclosureRight')[
                                  optie.fullKeyRechts
                                ] as boolean) || false
                              }
                              onCheckedChange={checked => {
                                if (window.navigator?.vibrate) {
                                  window.navigator.vibrate(10);
                                }

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
                          </Label>
                        ))}
                      </div>
                    </FormItemWrapper>
                  )}
                </FormBlock>
              </FormCard>

              {/* Supplement Support */}
              <FormCard title={t('supplementSupport')}>
                <FormBlock columns={2} dividers={true} hoverEffect={false}>
                  {showLinks && (
                    <FormItemWrapper label={t('left')} className="items-center">
                      <div className="flex items-center p-3 space-x-2">
                        <Switch
                          id="supplementschoring-links-switch"
                          checked={customInsoleShoringLeftEnabled}
                          onCheckedChange={checked =>
                            form.setValue(
                              'customInsoleShoringLeftEnabled',
                              !!checked,
                            )
                          }
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
                                SUPPLEMENT_TYPE_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('customInsoleShoringLeftType'),
                                )?.label || '',
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {SUPPLEMENT_TYPE_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {t(opt.label)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper
                      label={t('right')}
                      className="items-center"
                    >
                      <div className="flex items-center p-3 space-x-2">
                        <Switch
                          id="supplementschoring-rechts-switch"
                          checked={customInsoleShoringRightEnabled}
                          onCheckedChange={checked =>
                            form.setValue(
                              'customInsoleShoringRightEnabled',
                              !!checked,
                            )
                          }
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
                                SUPPLEMENT_TYPE_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('customInsoleShoringRightType'),
                                )?.label || '',
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {SUPPLEMENT_TYPE_OPTIONS.map(opt => (
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

              {/* Sole Stiffening */}
              <FormCard title={t('soleStiffening')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormItemWrapper
                    className="items-center"
                    label={t('soleStiffening')}
                  >
                    <div className="flex items-center p-3 space-x-2">
                      <Switch
                        id="zoolverstijving-switch"
                        checked={soleReinforcementEnabled}
                        onCheckedChange={checked =>
                          form.setValue('soleReinforcementEnabled', !!checked)
                        }
                      />
                      <Label
                        htmlFor="zoolverstijving-switch"
                        className="font-normal cursor-pointer"
                      >
                        {soleReinforcementEnabled ? t('yes') : t('no')}
                      </Label>
                    </div>
                  </FormItemWrapper>

                  {soleReinforcementEnabled && (
                    <FormItemWrapper label={t('side')}>
                      <div className="flex gap-6 pt-2">
                        {showLinks && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="stiff-left"
                              checked={form.watch('soleReinforcementLeft')}
                              onCheckedChange={checked =>
                                form.setValue(
                                  'soleReinforcementLeft',
                                  !!checked,
                                )
                              }
                            />
                            <Label
                              htmlFor="stiff-left"
                              className="font-normal cursor-pointer"
                            >
                              {t('left')}
                            </Label>
                          </div>
                        )}
                        {showRechts && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="stiff-right"
                              checked={form.watch('soleReinforcementRight')}
                              onCheckedChange={checked =>
                                form.setValue(
                                  'soleReinforcementRight',
                                  !!checked,
                                )
                              }
                            />
                            <Label
                              htmlFor="stiff-right"
                              className="font-normal cursor-pointer"
                            >
                              {t('right')}
                            </Label>
                          </div>
                        )}
                      </div>
                    </FormItemWrapper>
                  )}
                </FormBlock>
              </FormCard>

              {/* Closure Type, Insert Point, Tongue Padding, Tongue Stitching */}
              <FormCard
                title={
                  t('closure') +
                  ' & ' +
                  t('tongueOptions') +
                  ' & ' +
                  t('insertPoint')
                }
              >
                <FormBlock columns={3} dividers={true} hoverEffect={false}>
                  <FormItemWrapper label={t('closureType')}>
                    <RadioGroup
                      value={form.watch('closureType')}
                      onValueChange={v => form.setValue('closureType', v)}
                    >
                      <div className="flex flex-row gap-4">
                        {CLOSURE_OPTIONS.map(opt => (
                          <div
                            key={opt.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`closure-${opt.value}`}
                            />
                            <Label
                              htmlFor={`closure-${opt.value}`}
                              className="font-normal cursor-pointer text-sm"
                            >
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>
                  <FormItemWrapper label={t('tonguePadding')}>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="tongue-pad"
                        checked={form.watch('tonguePaddingEnabled')}
                        onCheckedChange={checked =>
                          form.setValue('tonguePaddingEnabled', !!checked)
                        }
                      />
                      <Label
                        htmlFor="tongue-pad"
                        className="font-normal cursor-pointer"
                      >
                        {t('tonguePadding')}
                      </Label>
                    </div>
                  </FormItemWrapper>
                  <FormItemWrapper label={t('tongueStitching')}>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="tongue-stitch"
                        checked={form.watch('fixedTongueEnabled')}
                        onCheckedChange={checked =>
                          form.setValue('fixedTongueEnabled', !!checked)
                        }
                      />
                      <Label
                        htmlFor="tongue-stitch"
                        className="font-normal cursor-pointer"
                      >
                        {t('tongueStitching')}
                      </Label>
                    </div>
                  </FormItemWrapper>
                </FormBlock>

                {/* Insert Point / Inschotpunt */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('insertPoint')}
                >
                  <FormItemWrapper
                    label={t('insertPoint')}
                    className="justify-center"
                  >
                    <Input
                      id="insert-point"
                      value={form.watch('entryPoint')}
                      onChange={e =>
                        form.setValue('entryPoint', e.target.value)
                      }
                      placeholder={t('insertPointPlaceholder')}
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper>
                    <img
                      src={getAssetPath('/images/intake-vlos/inschotpunt.png')}
                      alt={t('insertPoint')}
                      className="w-1/2 mb-2"
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Heel Type and Height */}
              <FormCard
                title={
                  t('heelType') +
                  ' & ' +
                  t('heelHeight') +
                  ' & ' +
                  t('heelSlant')
                }
              >
                {/* Heel Type */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('heelType')}
                >
                  {showLinks && (
                    <FormItemWrapper label={t('left')}>
                      <Select
                        value={form.watch('heelTypeLeft')}
                        onValueChange={v => form.setValue('heelTypeLeft', v)}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {t(
                              HEEL_TYPE_OPTIONS.find(
                                opt => opt.value === form.watch('heelTypeLeft'),
                              )?.label || '',
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {HEEL_TYPE_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {t(opt.label)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper label={t('right')}>
                      <Select
                        value={form.watch('heelTypeRight')}
                        onValueChange={v => form.setValue('heelTypeRight', v)}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {t(
                              HEEL_TYPE_OPTIONS.find(
                                opt =>
                                  opt.value === form.watch('heelTypeRight'),
                              )?.label || '',
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {HEEL_TYPE_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {t(opt.label)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Heel Height */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={`${t('heelHeight')} (cm)`}
                >
                  {showLinks && (
                    <FormItemWrapper label={t('left')}>
                      <div className="flex flex-col text-center">
                        <Input
                          id="heel-height-left"
                          type="number"
                          value={form.watch('heelHeightLeft')}
                          onChange={e =>
                            form.setValue('heelHeightLeft', e.target.value)
                          }
                          placeholder={t('cmPlaceholder')}
                        />
                      </div>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper label={t('right')}>
                      <div className="flex flex-col text-center">
                        <Input
                          id="heel-height-right"
                          type="number"
                          value={form.watch('heelHeightRight')}
                          onChange={e =>
                            form.setValue('heelHeightRight', e.target.value)
                          }
                          placeholder={t('cmPlaceholder')}
                        />
                      </div>
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Heel Slant */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('heelSlant')}
                >
                  {showLinks && (
                    <FormItemWrapper label={t('left')}>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="hakschoring-links-switch"
                          checked={heelWedgeLeftEnabled}
                          onCheckedChange={checked =>
                            form.setValue('heelWedgeLeftEnabled', !!checked)
                          }
                        />
                        <Label
                          htmlFor="hakschoring-links-switch"
                          className="font-normal cursor-pointer"
                        >
                          {heelWedgeLeftEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {heelWedgeLeftEnabled && (
                        <Select
                          value={form.watch('heelWedgeLeftType')}
                          onValueChange={v =>
                            form.setValue('heelWedgeLeftType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                HEEL_WEDGE_TYPE_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('heelWedgeLeftType'),
                                )?.label || '',
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {HEEL_WEDGE_TYPE_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {t(opt.label)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper label={t('right')}>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="hakschoring-rechts-switch"
                          checked={heelWedgeRightEnabled}
                          onCheckedChange={checked =>
                            form.setValue('heelWedgeRightEnabled', !!checked)
                          }
                        />
                        <Label
                          htmlFor="hakschoring-rechts-switch"
                          className="font-normal cursor-pointer"
                        >
                          {heelWedgeRightEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {heelWedgeRightEnabled && (
                        <Select
                          value={form.watch('heelWedgeRightType')}
                          onValueChange={v =>
                            form.setValue('heelWedgeRightType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                HEEL_WEDGE_TYPE_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('heelWedgeRightType'),
                                )?.label || '',
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {HEEL_WEDGE_TYPE_OPTIONS.map(opt => (
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

              {/* Donkey Ear */}
              <FormCard title={t('donkeyEar')}>
                <FormBlock columns={2} dividers={true} hoverEffect={false}>
                  {showLinks && (
                    <FormItemWrapper label={t('left')}>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ezelsoor-links-switch"
                          checked={donkeyEarLeftEnabled}
                          onCheckedChange={checked =>
                            form.setValue('donkeyEarLeftEnabled', !!checked)
                          }
                        />
                        <Label
                          htmlFor="ezelsoor-links-switch"
                          className="font-normal cursor-pointer"
                        >
                          {donkeyEarLeftEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {donkeyEarLeftEnabled && (
                        <Select
                          value={form.watch('donkeyEarLeftType')}
                          onValueChange={v =>
                            form.setValue('donkeyEarLeftType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                DONKEY_EAR_TYPE_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('donkeyEarLeftType'),
                                )?.label || '',
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {DONKEY_EAR_TYPE_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {t(opt.label)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper label={t('right')}>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ezelsoor-rechts-switch"
                          checked={donkeyEarRightEnabled}
                          onCheckedChange={checked =>
                            form.setValue('donkeyEarRightEnabled', !!checked)
                          }
                        />
                        <Label
                          htmlFor="ezelsoor-rechts-switch"
                          className="font-normal cursor-pointer"
                        >
                          {donkeyEarRightEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {donkeyEarRightEnabled && (
                        <Select
                          value={form.watch('donkeyEarRightType')}
                          onValueChange={v =>
                            form.setValue('donkeyEarRightType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                DONKEY_EAR_TYPE_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('donkeyEarRightType'),
                                )?.label || '',
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {DONKEY_EAR_TYPE_OPTIONS.map(opt => (
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

              {/* Heel Rounding */}
              <FormCard title={t('heelRounding')}>
                <FormBlock
                  columns={3}
                  dividers={true}
                  hoverEffect={false}
                  alignItems="start"
                >
                  <FormItemWrapper label={t('left')}>
                    {showLinks && (
                      <>
                        <div className="flex items-center space-x-2 mb-2">
                          <Switch
                            id="round-left"
                            checked={form.watch('heelRoundingLeftEnabled')}
                            onCheckedChange={checked =>
                              form.setValue(
                                'heelRoundingLeftEnabled',
                                !!checked,
                              )
                            }
                          />
                          <Label
                            htmlFor="round-left"
                            className="font-normal cursor-pointer"
                          >
                            {heelRoundingLeftEnabled ? t('yes') : t('no')}
                          </Label>
                        </div>
                        {heelRoundingLeftEnabled && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <Label
                                htmlFor="round-left-height"
                                className="text-sm"
                              >
                                {t('height')} (mm)
                              </Label>
                              <Input
                                id="round-left-height"
                                type="number"
                                value={form.watch('heelRoundingLeftHeight')}
                                onChange={e =>
                                  form.setValue(
                                    'heelRoundingLeftHeight',
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label
                                htmlFor="round-left-length"
                                className="text-sm"
                              >
                                {t('length')} (mm)
                              </Label>
                              <Input
                                id="round-left-length"
                                type="number"
                                value={form.watch('heelRoundingLeftLength')}
                                onChange={e =>
                                  form.setValue(
                                    'heelRoundingLeftLength',
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </FormItemWrapper>

                  {/* Heel rounding image */}
                  <FormItemWrapper className="">
                    <img
                      src={getAssetPath('/images/intake-vlos/hakafronding.png')}
                      alt={t('heelRounding')}
                      className="w-1/2"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('right')}>
                    {showRechts && (
                      <>
                        <div className="flex items-center space-x-2 mb-2">
                          <Switch
                            id="round-right"
                            checked={form.watch('heelRoundingRightEnabled')}
                            onCheckedChange={checked =>
                              form.setValue(
                                'heelRoundingRightEnabled',
                                !!checked,
                              )
                            }
                          />
                          <Label
                            htmlFor="round-right"
                            className="font-normal cursor-pointer"
                          >
                            {heelRoundingRightEnabled ? t('yes') : t('no')}
                          </Label>
                        </div>
                        {heelRoundingRightEnabled && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <Label
                                htmlFor="round-right-height"
                                className="text-sm"
                              >
                                {t('height')} (mm)
                              </Label>
                              <Input
                                id="round-right-height"
                                type="number"
                                value={form.watch('heelRoundingRightHeight')}
                                onChange={e =>
                                  form.setValue(
                                    'heelRoundingRightHeight',
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label
                                htmlFor="round-right-length"
                                className="text-sm"
                              >
                                {t('length')} (mm)
                              </Label>
                              <Input
                                id="round-right-length"
                                type="number"
                                value={form.watch('heelRoundingRightLength')}
                                onChange={e =>
                                  form.setValue(
                                    'heelRoundingRightLength',
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Walking Sole */}
              <FormCard title={t('walkingSole')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormItemWrapper>
                    <Select
                      value={form.watch('rockerSoleType')}
                      onValueChange={v => form.setValue('rockerSoleType', v)}
                    >
                      <SelectTrigger className="w-2/3">
                        <SelectValue>
                          {t(
                            WALKING_SOLE_OPTIONS.find(
                              opt => opt.value === form.watch('rockerSoleType'),
                            )?.label || '',
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {WALKING_SOLE_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {t(opt.label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Special Notes */}
              <FormCard title={t('specialNotes')}>
                <Textarea
                  placeholder={t('specialNotesPlaceholder')}
                  value={form.watch('specialNotes')}
                  onChange={e => form.setValue('specialNotes', e.target.value)}
                  rows={5}
                />
              </FormCard>

              {/* Submit Section */}
              <FormFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetDraft}
                >
                  {t('reset')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  {t('cancel')}
                </Button>
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

export default FormIntakeVLOSPage;
