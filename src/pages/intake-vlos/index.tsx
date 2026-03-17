import React from 'react';
import {getAssetPath} from '@/utils/assetPath';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
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
  SHAFT_OPENING_OPTIONS,
  MEDIAL_LATERAL_OPTIONS,
  HEEL_TYPE_OPTIONS,
  WALKING_SOLE_OPTIONS,
  CLOSURE_OPTIONS,
  PATHOLOGIES_OPTIONS,
  WALKING_DISTANCE_AIDS_OPTIONS,
  FOOT_INSPECTION_OPTIONS,
  WALKING_DISTANCE_OPTIONS,
  PAIN_DURATION_OPTIONS,
  ANKLE_JOINT_OPTIONS,
  KNEES_OPTIONS,
  MIDFOOT_OPTIONS,
  TOE_AREA_OPTIONS,
} from '@/domain/form/constants/formConstants';
import {
  EnclosureBlock,
  FunctieonderzoekBlock,
  PairAndIndicationBlock,
  ShaftHeightBlock,
  SideSelectionBlock,
  SpecialNotesBlock,
} from '@/components/forms/blocks';
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

// ---------------------------------------------------------------------------
// SCHEMA DEFINITION
// ---------------------------------------------------------------------------
const FormIntakeVLOSPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    // Basic info
    whichPair: z.string(),
    medicalIndication: z.string().optional(),
    side: z.enum(['left', 'right', 'both'] as const),

    // Enclosure/shaft fields
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

    // Sole reinforcement
    soleReinforcementEnabled: z.boolean(),
    soleReinforcementLeft: z.boolean().optional(),
    soleReinforcementRight: z.boolean().optional(),

    // Closure/entry
    closureType: z.string().optional(),
    entryPoint: z.string().optional(),
    shaftOpeningWidth: z.string().optional(),
    tonguePaddingEnabled: z.boolean(),
    fixedTongueEnabled: z.boolean(),

    // Heel type
    heelTypeLeft: z.string().optional(),
    heelTypeRight: z.string().optional(),
    heelHeightLeft: z.string().optional(),
    heelHeightRight: z.string().optional(),

    // Heel wedge
    heelWedgeLeftEnabled: z.boolean(),
    heelWedgeRightEnabled: z.boolean(),
    heelWedgeLeftType: z.string().optional(),
    heelWedgeRightType: z.string().optional(),

    // Donkey ear
    donkeyEarLeftEnabled: z.boolean(),
    donkeyEarRightEnabled: z.boolean(),
    donkeyEarLeftType: z.string().optional(),
    donkeyEarRightType: z.string().optional(),

    // Amputation
    amputationLeftEnabled: z.boolean(),
    amputationRightEnabled: z.boolean(),

    // Heel rounding
    heelRoundingLeftEnabled: z.boolean(),
    heelRoundingRightEnabled: z.boolean(),
    heelRoundingLeftHeight: z.string().optional(),
    heelRoundingLeftLength: z.string().optional(),
    heelRoundingRightHeight: z.string().optional(),
    heelRoundingRightLength: z.string().optional(),

    // Rocker sole
    rockerSoleType: z.string().optional(),

    // Notes
    specialNotes: z.string().optional(),

    // Functieonderzoek fields
    pathologies: z.record(z.string(), z.boolean()),
    walkingDistanceAids: z.record(z.string(), z.boolean()),
    painPerception: z.string().optional(),
    footInspection: z.record(z.string(), z.boolean()),
    walkingDistance: z.record(z.string(), z.boolean()),
    painDuration: z.record(z.string(), z.boolean()),
    muscleStrengthDorsalFlexi: z.number().optional(),
    muscleStrengthPlantarFlexi: z.number().optional(),
    toeArea: z.record(z.string(), z.boolean()),
    midfoot: z.record(z.string(), z.boolean()),
    ankleJoint: z.record(z.string(), z.boolean()),
    knees: z.record(z.string(), z.boolean()),
  });

  type FormData = z.infer<typeof formSchema>;

  // ---------------------------------------------------------------------------
  // FORM SETUP
  // ---------------------------------------------------------------------------
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
      customInsoleShoringLeftType: MEDIAL_LATERAL_OPTIONS[0]?.value || '',
      customInsoleShoringRightType: MEDIAL_LATERAL_OPTIONS[0]?.value || '',
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
      heelWedgeLeftType: MEDIAL_LATERAL_OPTIONS[0]?.value || '',
      heelWedgeRightType: MEDIAL_LATERAL_OPTIONS[0]?.value || '',
      donkeyEarLeftEnabled: false,
      donkeyEarRightEnabled: false,
      donkeyEarLeftType: MEDIAL_LATERAL_OPTIONS[0]?.value || '',
      donkeyEarRightType: MEDIAL_LATERAL_OPTIONS[0]?.value || '',
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
      walkingDistance: {},
      painDuration: {},
      muscleStrengthDorsalFlexi: 3,
      muscleStrengthPlantarFlexi: 3,
      toeArea: {},
      midfoot: {},
      ankleJoint: {},
      knees: {},
    },
  });

  const {clearStorage} = useFormPersistence(
    'intakeVLOS',
    form.watch,
    form.setValue,
  );

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------
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
  const heelRoundingLeftEnabled = form.watch('heelRoundingLeftEnabled');
  const heelRoundingRightEnabled = form.watch('heelRoundingRightEnabled');

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
        walkingDistance: data.walkingDistance as Record<string, boolean>,
        painDuration: data.painDuration as Record<string, boolean>,
        muscleStrengthDorsalFlexi: data.muscleStrengthDorsalFlexi || 3,
        muscleStrengthPlantarFlexi: data.muscleStrengthPlantarFlexi || 3,
        toeArea: data.toeArea as Record<string, boolean>,
        midfoot: data.midfoot as Record<string, boolean>,
        ankleJoint: data.ankleJoint as Record<string, boolean>,
        knees: data.knees as Record<string, boolean>,
      }),
    );

    clearStorage();

    void router.push(Routes.form_results);
  };

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------
  return (
    <BaseLayout title={t('intakeVlos')} currentStep={3}>
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
              {/* PairAndIndicationBlock */}
              <PairAndIndicationBlock form={form} t={t} />

              {/* SideSelectionBlock */}
              <SideSelectionBlock form={form} t={t} includeAmputation={true} />

              {/* Functieonderzoek */}
              <FunctieonderzoekBlock form={form} t={t} />

              {/* Shaft Height */}
              <ShaftHeightBlock
                form={form}
                t={t}
                showLeft={showLinks}
                showRight={showRechts}
              />

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
              <EnclosureBlock
                form={form}
                t={t}
                showLeft={showLinks}
                showRight={showRechts}
                mode="vlos"
              />

              {/* Supplement Support */}
              <FormCard title={t('supplementSupport')}>
                <FormBlock columns={2} dividers={true} hoverEffect={false}>
                  {showLinks && (
                    <FormItemWrapper label={t('left')} className="items-center">
                      <div className="flex items-center p-3 space-x-2">
                        <Switch
                          id="supplementschoring-links-switch"
                          checked={customInsoleShoringLeftEnabled}
                          onCheckedChange={checked => {
                            form.setValue(
                              'customInsoleShoringLeftEnabled',
                              !!checked,
                            );
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
                                MEDIAL_LATERAL_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('customInsoleShoringLeftType'),
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
                          onCheckedChange={checked => {
                            form.setValue(
                              'customInsoleShoringRightEnabled',
                              !!checked,
                            );
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
                                MEDIAL_LATERAL_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('customInsoleShoringRightType'),
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
                        onCheckedChange={checked => {
                          form.setValue('soleReinforcementEnabled', !!checked);
                          if (!checked) {
                            form.setValue('soleReinforcementLeft', false);
                            form.setValue('soleReinforcementRight', false);
                          }
                        }}
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
                          onCheckedChange={checked => {
                            form.setValue('heelWedgeLeftEnabled', !!checked);
                            if (!checked) {
                              form.setValue('heelWedgeLeftType', '');
                            }
                          }}
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
                                MEDIAL_LATERAL_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('heelWedgeLeftType'),
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
                      )}
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper label={t('right')}>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="hakschoring-rechts-switch"
                          checked={heelWedgeRightEnabled}
                          onCheckedChange={checked => {
                            form.setValue('heelWedgeRightEnabled', !!checked);
                            if (!checked) {
                              form.setValue('heelWedgeRightType', '');
                            }
                          }}
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
                                MEDIAL_LATERAL_OPTIONS.find(
                                  opt =>
                                    opt.value ===
                                    form.watch('heelWedgeRightType'),
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
                            onCheckedChange={checked => {
                              form.setValue(
                                'heelRoundingLeftEnabled',
                                !!checked,
                              );
                              if (!checked) {
                                form.setValue('heelRoundingLeftHeight', '');
                                form.setValue('heelRoundingLeftLength', '');
                              }
                            }}
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
                            onCheckedChange={checked => {
                              form.setValue(
                                'heelRoundingRightEnabled',
                                !!checked,
                              );
                              if (!checked) {
                                form.setValue('heelRoundingRightHeight', '');
                                form.setValue('heelRoundingRightLength', '');
                              }
                            }}
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

              {/* SpecialNotesBlock */}
              <SpecialNotesBlock form={form} t={t} />

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
