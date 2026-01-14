import React from 'react';
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
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block'; // IMPORT DE NIEUWE COMPONENTS
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {
  PAIR_TYPE_OPTIONS,
  PATHOLOGIES_OPTIONS,
  WALKING_DISTANCE_AIDS_OPTIONS,
  FOOT_INSPECTION_OPTIONS,
  LAST_HEIGHT_OPTIONS,
  MTP1_DEEP_OPTIONS,
  YES_NO_OPTIONS,
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

const FormIntakeTestPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    whichPair: z.string(),
    side: z.enum(['left', 'right', 'both'] as const),
    shaftHeightLeft: z.string().optional(),
    shaftHeightRight: z.string().optional(),
    amputationLeftEnabled: z.boolean(),
    amputationRightEnabled: z.boolean(),
    specialNotes: z.string().optional(),
    pathologies: z.record(z.string(), z.boolean()),
    walkingDistanceAids: z.record(z.string(), z.boolean()),
    painPerception: z.string().optional(),
    footInspection: z.record(z.string(), z.boolean()),
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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      whichPair: 'Eerste paar',
      side: 'both',
      shaftHeightLeft: '14',
      shaftHeightRight: '14',
      amputationLeftEnabled: false,
      amputationRightEnabled: false,
      specialNotes: '',
      pathologies: {},
      walkingDistanceAids: {},
      painPerception: '0',
      footInspection: {},
      digitalEnabled: false,
      heelLiftLeft: '',
      heelLiftRight: '',
      lastHeight: LAST_HEIGHT_OPTIONS[0]?.value || '',
      mtp1DeepLeft: 'No',
      mtp1DeepRight: 'No',
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

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  const side = form.watch('side');
  const digitalEnabled = form.watch('digitalEnabled');

  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

  const boolToString = (value: boolean): string => (value ? 'ja' : 'nee');
  const stringToBool = (value: string): boolean => value === 'ja';

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'OSA'}));
    }

    dispatch(
      setIntakeOSAData({
        whichPair: data.whichPair,
        side: data.side,
        shaftHeightLeft: data.shaftHeightLeft || '',
        shaftHeightRight: data.shaftHeightRight || '',
        enclosureLeft: {},
        enclosureRight: {},
        enclosureLeftMm: {},
        enclosureRightMm: {},
        customInsoleShoringLeftEnabled: false,
        customInsoleShoringRightEnabled: false,
        customInsoleShoringLeftType: '',
        customInsoleShoringRightType: '',
        soleReinforcementEnabled: false,
        soleReinforcementLeft: false,
        soleReinforcementRight: false,
        closureType: '',
        entryPoint: '',
        shaftOpeningWidth: '',
        tonguePaddingEnabled: false,
        fixedTongueEnabled: false,
        heelTypeLeft: '',
        heelTypeRight: '',
        heelHeightLeft: '',
        heelHeightRight: '',
        heelWedgeLeftEnabled: false,
        heelWedgeRightEnabled: false,
        heelWedgeLeftType: '',
        heelWedgeRightType: '',
        donkeyEarLeftEnabled: false,
        donkeyEarRightEnabled: false,
        donkeyEarLeftType: '',
        donkeyEarRightType: '',
        amputationLeftEnabled: data.amputationLeftEnabled,
        amputationRightEnabled: data.amputationRightEnabled,
        heelRoundingLeftEnabled: false,
        heelRoundingRightEnabled: false,
        heelRoundingLeftHeight: '',
        heelRoundingLeftLength: '',
        heelRoundingRightHeight: '',
        heelRoundingRightLength: '',
        rockerSoleType: '',
        specialNotes: data.specialNotes || '',
        pathologies: data.pathologies as Record<string, boolean>,
        walkingDistanceAids: data.walkingDistanceAids as Record<
          string,
          boolean
        >,
        painPerception: data.painPerception || '',
        footInspection: data.footInspection as Record<string, boolean>,
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
    handleResetDraft();
    void router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeOsa')} currentStep={2}>
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
              {/* Which Pair */}
              <FormCard
                title={t('whichPair')}
                // description='Hallo'
              >
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <RadioGroup
                    value={form.watch('whichPair')}
                    onValueChange={v => form.setValue('whichPair', v)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PAIR_TYPE_OPTIONS.map(option => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`paar-${option.value}`}
                          />
                          <Label
                            htmlFor={`paar-${option.value}`}
                            className="font-normal cursor-pointer"
                          >
                            {t(option.label)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </FormBlock>
              </FormCard>

              {/* Side Selection */}
              <FormCard title={t('side')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <RadioGroup
                    value={side}
                    onValueChange={v => form.setValue('side', v as Side)}
                  >
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="side-both" />
                        <Label
                          htmlFor="side-both"
                          className="font-normal cursor-pointer"
                        >
                          {t('both')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="side-left" />
                        <Label
                          htmlFor="side-left"
                          className="font-normal cursor-pointer"
                        >
                          {t('left')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="side-right" />
                        <Label
                          htmlFor="side-right"
                          className="font-normal cursor-pointer"
                        >
                          {t('right')}
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormBlock>
              </FormCard>

              {/* Amputation */}
              <FormCard title={t('amputation')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <div className="flex flex-wrap gap-6">
                    {showLinks && (
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
                    )}
                    {showRechts && (
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
                    )}
                  </div>
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
                    <div
                      key={optie.key}
                      className="flex items-center space-x-2 rounded-md border bg-muted/50 px-3 py-2"
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
                      />
                      <Label
                        htmlFor={`ziektebeeld-${optie.key}`}
                        className="font-normal cursor-pointer"
                      >
                        {t(optie.translationKey)}
                      </Label>
                    </div>
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
                    <div
                      key={optie.key}
                      className="flex items-center space-x-2 rounded-md border bg-muted/50 px-3 py-2"
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
                      />
                      <Label
                        htmlFor={`loopafstand-${optie.key}`}
                        className="font-normal cursor-pointer"
                      >
                        {t(optie.translationKey)}
                      </Label>
                    </div>
                  ))}
                </FormBlock>

                {/* Pijnbeleving */}
                <FormBlock title={t('painPerception')} centerTitle={true}>
                  <div className="space-y-2 pt-2">
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div className="text-sm text-muted-foreground text-center">
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
                        className="col-span-4"
                      />
                      <div className="text-sm text-muted-foreground text-center">
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
                    <div
                      key={optie.key}
                      className="flex items-center space-x-2 rounded-md border bg-muted/50 px-3 py-2"
                    >
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
                      />
                      <Label
                        htmlFor={`foot-inspection-${optie.key}`}
                        className="font-normal cursor-pointer"
                      >
                        {t(optie.translationKey)}
                      </Label>
                    </div>
                  ))}
                </FormBlock>
              </FormCard>

              {/* Shaft Height*/}
              <FormCard title={t('shaftHeight')}>
                <FormBlock columns={2} dividers={true} hoverEffect={false}>
                  {showLinks && (
                    <FormItemWrapper className="items-center">
                      <Label htmlFor="shaft-left">{t('leftCm')}</Label>
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
                    <FormItemWrapper className="items-center">
                      <Label htmlFor="shaft-right">{t('rightCm')}</Label>
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

              {/*
                 DIGITAAL SECTION
              */}
              <FormCard
                title={t('digital')}
                description={t('digitalDescription')}
                toggleAble={true}
                toggleLabel={t('digital')}
                toggleId="digital-toggle"
                defaultOpen={digitalEnabled}
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
                <FormBlock columns={3} dividers={true}>
                  <FormItemWrapper>
                    <Label className="text-base font-semibold">
                      {t('lastHeight')}
                    </Label>
                    <RadioGroup
                      value={form.watch('lastHeight')}
                      onValueChange={v => form.setValue('lastHeight', v)}
                    >
                      <div className="flex flex-wrap gap-3 pt-2">
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

                  <FormItemWrapper>
                    <Label className="text-base font-semibold">
                      {t('clawToes')}
                    </Label>
                    <RadioGroup
                      value={boolToString(form.watch('clawToesEnabled'))}
                      onValueChange={v =>
                        form.setValue('clawToesEnabled', stringToBool(v))
                      }
                    >
                      <div className="flex flex-wrap gap-3 pt-2">
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

                  <FormItemWrapper>
                    <Label className="text-base font-semibold">
                      {t('scannedWithFoil')}
                    </Label>
                    <RadioGroup
                      value={boolToString(form.watch('scannedWithFoil'))}
                      onValueChange={v =>
                        form.setValue('scannedWithFoil', stringToBool(v))
                      }
                    >
                      <div className="flex flex-wrap gap-3 pt-2">
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
                      <Label htmlFor="mtp1-left">{t('leftCm')}</Label>
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
                    <FormItemWrapper className="items-center">
                      <Label htmlFor="mtp1-right">{t('rightCm')}</Label>
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
              <Card>
                <CardHeader>
                  <CardTitle>{t('specialNotes')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={t('specialNotesPlaceholder')}
                    value={form.watch('specialNotes')}
                    onChange={e =>
                      form.setValue('specialNotes', e.target.value)
                    }
                    rows={5}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

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

export default FormIntakeTestPage;
