import React from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
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
  YES_NO_OPTIONS,
  PAIR_TYPE_OPTIONS,
  LAST_HEIGHT_OPTIONS,
  MTP1_DEEP_OPTIONS,
  Side,
} from '@/domain/form/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {setIntakeOSAData, setClientData} from '@/domain/store/slices/formData';

import {ChevronRight} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form} from '@/components/ui/form';
import {scrollToFirstError} from '@/utils/formHelpers';
import {useFormPersistence} from '@/hooks/useFormPersistence';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {
  FunctieonderzoekBlock,
  PairAndIndicationBlock,
  ShaftHeightBlock,
  SideSelectionBlock,
  SpecialNotesBlock,
} from '@/components/forms/blocks';

// ---------------------------------------------------------------------------
// SCHEMA DEFINITION
// ---------------------------------------------------------------------------
const FormIntakeOSAPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    // Basic info
    whichPair: z.string(),
    medicalIndication: z.string().optional(),

    // General fields
    side: z.enum(['left', 'right', 'both'] as const),
    shaftHeightLeft: z.string().optional(),
    shaftHeightRight: z.string().optional(),
    amputationLeftEnabled: z.boolean(),
    amputationRightEnabled: z.boolean(),
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

    // Digitaal fields
    digitalEnabled: z.boolean(),
    heelLiftLeft: z.string().optional(),
    heelLiftRight: z.string().optional(),
    lastHeight: z.string().optional(),
    mtp1DeepLeft: z.string().optional(),
    mtp1DeepRight: z.string().optional(),
    clawToesEnabled: z.boolean(),
    scannedWithFoil: z.boolean(),
    digitalInstructions: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  // ---------------------------------------------------------------------------
  // FORM SETUP
  // ---------------------------------------------------------------------------
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      whichPair: PAIR_TYPE_OPTIONS[0]?.value || '',
      side: 'both',
      medicalIndication: '',
      shaftHeightLeft: '12.5',
      shaftHeightRight: '12.5',
      amputationLeftEnabled: false,
      amputationRightEnabled: false,
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
      // Digitaal defaults
      digitalEnabled: false,
      heelLiftLeft: '1.5',
      heelLiftRight: '1.5',
      lastHeight: LAST_HEIGHT_OPTIONS[0]?.value || '',
      mtp1DeepLeft: MTP1_DEEP_OPTIONS[0]?.value || '',
      mtp1DeepRight: MTP1_DEEP_OPTIONS[0]?.value || '',
      clawToesEnabled: false,
      scannedWithFoil: false,
      digitalInstructions: '',
    },
  });

  const {clearStorage} = useFormPersistence(
    'intakeOsa',
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
  // Removed watchers for moved sections
  const digitalEnabled = form.watch('digitalEnabled');

  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

  // Helper functions
  const boolToString = (value: boolean): string => (value ? 'yes' : 'no');
  const stringToBool = (value: string): boolean => value === 'yes';

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'OSA'}));
    }

    dispatch(
      setIntakeOSAData({
        whichPair: data.whichPair,
        medicalIndication: data.medicalIndication || '',
        side: data.side,
        shaftHeightLeft: data.shaftHeightLeft || '',
        shaftHeightRight: data.shaftHeightRight || '',
        amputationLeftEnabled: data.amputationLeftEnabled,
        amputationRightEnabled: data.amputationRightEnabled,
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
        // Digitaal fields
        digitalEnabled: data.digitalEnabled,
        heelLiftLeft: data.heelLiftLeft || '',
        heelLiftRight: data.heelLiftRight || '',
        lastHeight: data.lastHeight || '',
        mtp1DeepLeft: data.mtp1DeepLeft || '',
        mtp1DeepRight: data.mtp1DeepRight || '',
        clawToesEnabled: data.clawToesEnabled,
        scannedWithFoil: data.scannedWithFoil,
        digitalInstructions: data.digitalInstructions || '',
      }),
    );

    clearStorage();

    void router.push(Routes.form_results);
  };

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------
  return (
    <BaseLayout title={t('intakeOsa')} currentStep={3}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('intakeOsa')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('vlosDescription')}
          </p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-4"
            >
              {/* Paartype & indicatie */}
              <PairAndIndicationBlock form={form} t={t} />

              {/* Side & Amputation */}
              <SideSelectionBlock
                form={form}
                t={t}
                includeAmputation={true}
                amputationLeftField="amputationLeftEnabled"
                amputationRightField="amputationRightEnabled"
              />

              {/* Functieonderzoek*/}
              <FunctieonderzoekBlock form={form} t={t} />

              {/* Shaft Height*/}
              <ShaftHeightBlock
                form={form}
                t={t}
                showLeft={showLinks}
                showRight={showRechts}
              />

              {/* DIGITAAL SECTION */}
              <FormCard
                title={t('digital')}
                description={t('digitalDescription')}
                toggleAble={true}
                toggleLabel={t('digital')}
                toggleId="digital-toggle"
                defaultOpen={digitalEnabled}
                onToggleChange={isOpen => {
                  form.setValue('digitalEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('heelLiftLeft', '');
                    form.setValue('heelLiftRight', '');
                    form.setValue('lastHeight', '');
                    form.setValue('mtp1DeepLeft', '');
                    form.setValue('mtp1DeepRight', '');
                    form.setValue('clawToesEnabled', false);
                    form.setValue('scannedWithFoil', false);
                    form.setValue('digitalInstructions', '');
                  }
                }}
                contentClassName="space-y-4"
              >
                {/* Hielheffing L/R */}
                <FormBlock
                  title={t('heelLift')}
                  columns={2}
                  dividers={true}
                  centerTitle={true}
                >
                  {showLinks && (
                    <FormItemWrapper>
                      <Label htmlFor="heel-lift-left">{t('left')} (mm)</Label>
                      <Input
                        id="heel-lift-left"
                        type="number"
                        placeholder="mm"
                        value={form.watch('heelLiftLeft')}
                        onChange={e =>
                          form.setValue('heelLiftLeft', e.target.value)
                        }
                        className="w-2/3"
                      />
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper>
                      <Label htmlFor="heel-lift-right">{t('right')} (mm)</Label>
                      <Input
                        id="heel-lift-right"
                        type="number"
                        placeholder="mm"
                        value={form.watch('heelLiftRight')}
                        onChange={e =>
                          form.setValue('heelLiftRight', e.target.value)
                        }
                        className="w-2/3"
                      />
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* 3-koloms Radio Groups */}
                <FormBlock
                  columns={3}
                  dividers={true}
                  className="justify-center"
                >
                  <FormItemWrapper className="flex flex-col items-center">
                    <Label className="text-base font-semibold">
                      {t('lastHeight')}
                    </Label>
                    <RadioGroup
                      value={form.watch('lastHeight')}
                      onValueChange={v => form.setValue('lastHeight', v)}
                    >
                      <div className="flex flex-wrap gap-3 pt-2 justify-center">
                        {LAST_HEIGHT_OPTIONS.map(opt => (
                          <div
                            key={opt.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`reading-height-${opt.value}`}
                            />
                            <Label
                              htmlFor={`reading-height-${opt.value}`}
                              className="font-normal cursor-pointer"
                            >
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>

                  <FormItemWrapper className="flex flex-col items-center">
                    <Label className="text-base font-semibold">
                      {t('clawToes')}
                    </Label>
                    <RadioGroup
                      value={boolToString(form.watch('clawToesEnabled'))}
                      onValueChange={v =>
                        form.setValue('clawToesEnabled', stringToBool(v))
                      }
                    >
                      <div className="flex flex-wrap gap-3 pt-2 justify-center">
                        {YES_NO_OPTIONS.map(opt => (
                          <div
                            key={opt.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`claw-toes-${opt.value}`}
                            />
                            <Label
                              htmlFor={`claw-toes-${opt.value}`}
                              className="font-normal cursor-pointer"
                            >
                              {t(opt.label)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>

                  <FormItemWrapper className="flex flex-col items-center">
                    <Label className="text-base font-semibold">
                      {t('scannedWithFoil')}
                    </Label>
                    <RadioGroup
                      value={boolToString(form.watch('scannedWithFoil'))}
                      onValueChange={v =>
                        form.setValue('scannedWithFoil', stringToBool(v))
                      }
                    >
                      <div className="flex flex-wrap gap-3 pt-2 justify-center">
                        {YES_NO_OPTIONS.map(opt => (
                          <div
                            key={opt.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`scanned-foil-${opt.value}`}
                            />
                            <Label
                              htmlFor={`scanned-foil-${opt.value}`}
                              className="font-normal cursor-pointer"
                            >
                              {t(opt.label)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>
                </FormBlock>

                {/* MTP1 diep L/R */}
                <FormBlock
                  title={t('mtp1Deep')}
                  columns={2}
                  dividers={true}
                  centerTitle={true}
                >
                  {showLinks && (
                    <FormItemWrapper className="flex flex-col items-center">
                      <Label htmlFor="mtp1-left">{t('leftMm')}</Label>
                      <Select
                        value={form.watch('mtp1DeepLeft')}
                        onValueChange={v => form.setValue('mtp1DeepLeft', v)}
                      >
                        <SelectTrigger id="mtp1-left" className="w-2/3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {MTP1_DEEP_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper className="flex flex-col items-center">
                      <Label htmlFor="mtp1-right">{t('rightMm')}</Label>
                      <Select
                        value={form.watch('mtp1DeepRight')}
                        onValueChange={v => form.setValue('mtp1DeepRight', v)}
                      >
                        <SelectTrigger id="mtp1-right" className="w-2/3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {MTP1_DEEP_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Instructies */}
                <FormBlock
                  title={t('instructions')}
                  columns={1}
                  dividers={false}
                  hoverEffect={false}
                >
                  <Textarea
                    id="digital-instructions"
                    placeholder={t('instructionsPlaceholder')}
                    value={form.watch('digitalInstructions')}
                    onChange={e =>
                      form.setValue('digitalInstructions', e.target.value)
                    }
                    rows={3}
                    className="resize-none"
                  />
                </FormBlock>
              </FormCard>

              {/* Special Notes */}
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

export default FormIntakeOSAPage;
