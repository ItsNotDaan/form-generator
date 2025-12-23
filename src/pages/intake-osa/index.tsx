import React from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import {
  OMSLUITING_OPTIES,
  OmsluitingKey,
  OmsluitingOptie,
  OPENSTAND_OPTIES,
  SUPPLEMENT_TYPE_OPTIES,
  HAKSOORT_OPTIES,
  LOOPZOOL_OPTIES,
  SLUITING_OPTIES,
  HAKSCHORING_TYPE_OPTIES,
  EZELSOOR_TYPE_OPTIES,
  JA_NEE_OPTIES,
  PAARTYPE_OPTIES,
  ZIEKTEBEELDEN_OPTIES,
  LOOPAFSTAND_OPTIES,
  INSPECTIE_VOETEN_OPTIES,
  LEESTHOOGTE_OPTIES,
  MTP1_DIEP_OPTIES,
  Zijde,
} from '@/lib/constants/formConstants';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setIntakeOSAData, setClientData } from '@/domain/store/slices/formData';

import { ChevronRight } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { scrollToFirstError } from '@/utils/formHelpers';
import { useFormPersistence } from '@/hooks/useFormPersistence';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FormCard, FormBlock, FormItemWrapper } from '@/components/ui/form-block';

const FormIntakeOSAPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    welkPaar: z.string(),
    side: z.enum(['left', 'right', 'both'] as const),
    schachthoogteLinks: z.string().optional(),
    schachthoogteRechts: z.string().optional(),
    // Removed from OSA UI: enclosure, openstand, supplementschoring, zoolverstijving,
    // sluiting/tong, haksoort/hoogte, hak aanpassingen, hakafronding, loopzool
    amputatieLinksEnabled: z.boolean(),
    amputatieRechtsEnabled: z.boolean(),
    bijzonderheden: z.string().optional(),
    // Functieonderzoek fields
    ziektebeelden: z.record(z.string(), z.boolean()),
    loopafstandAids: z.record(z.string(), z.boolean()),
    painPerception: z.string().optional(),
    footInspection: z.record(z.string(), z.boolean()),
    // Removed: leg length difference (moved to Foliepas)
    // Digitaal fields
    digitalEnabled: z.boolean(),
    heelLiftLeft: z.string().optional(),
    heelLiftRight: z.string().optional(),
    readingHeight: z.string().optional(),
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
      welkPaar: 'Eerste paar',
      side: 'both',
      schachthoogteLinks: '14',
      schachthoogteRechts: '14',
      amputatieLinksEnabled: false,
      amputatieRechtsEnabled: false,
      bijzonderheden: '',
      // Functieonderzoek defaults
      ziektebeelden: {},
      loopafstandAids: {},
      painPerception: '0',
      footInspection: {},
      // Digitaal defaults
      digitalEnabled: false,
      heelLiftLeft: '',
      heelLiftRight: '',
      readingHeight: LEESTHOOGTE_OPTIES[0]?.value || '',
      mtp1DeepLeft: 'No',
      mtp1DeepRight: 'No',
      clawToesEnabled: false,
      scannedWithFoil: false,
      digitalInstructions: '',
    },
  });

  const { clearStorage } = useFormPersistence('intakeOsa', form.watch, form.setValue);

  const side = form.watch('side');
  // Removed watchers for moved sections
  const digitalEnabled = form.watch('digitalEnabled');

  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

  // Helper functions
  const boolToString = (value: boolean): string => (value ? 'ja' : 'nee');
  const stringToBool = (value: string): boolean => value === 'ja';

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'OSA' }));
    }

    dispatch(
      setIntakeOSAData({
        welkPaar: data.welkPaar,
        side: data.side,
        schachthoogteLinks: data.schachthoogteLinks || '',
        schachthoogteRechts: data.schachthoogteRechts || '',
        // Neutral defaults for fields moved to Foliepas to satisfy typing
        omsluitingLinks: {},
        omsluitingRechts: {},
        omsluitingLinksMm: {},
        omsluitingRechtsMm: {},
        supplementschoringLinksEnabled: false,
        supplementschoringRechtsEnabled: false,
        supplementschoringLinksType: '',
        supplementschoringRechtsType: '',
        zoolverstijvingEnabled: false,
        zoolverstijvingLinks: false,
        zoolverstijvingRechts: false,
        sluitingType: '',
        inschotpunt: '',
        openstandSchacht: '',
        tongpolsterEnabled: false,
        tongVaststikkenEnabled: false,
        haksoortLinks: '',
        haksoortRechts: '',
        hakhoogteLinks: '',
        hakhoogteRechts: '',
        hakschoringLinksEnabled: false,
        hakschoringRechtsEnabled: false,
        hakschoringLinksType: '',
        hakschoringRechtsType: '',
        ezelsoorLinksEnabled: false,
        ezelsoorRechtsEnabled: false,
        ezelsoorLinksType: '',
        ezelsoorRechtsType: '',
        amputatieLinksEnabled: data.amputatieLinksEnabled,
        amputatieRechtsEnabled: data.amputatieRechtsEnabled,
        hakafrondingLinksEnabled: false,
        hakafrondingRechtsEnabled: false,
        hakafrondingLinksHoogte: '',
        hakafrondingLinksLengte: '',
        hakafrondingRechtsHoogte: '',
        hakafrondingRechtsLengte: '',
        loopzoolType: '',
        bijzonderheden: data.bijzonderheden || '',
        // Functieonderzoek fields
        ziektebeelden: data.ziektebeelden as Record<string, boolean>,
        loopafstandAids: data.loopafstandAids as Record<string, boolean>,
        painPerception: data.painPerception || '',
        footInspection: data.footInspection as Record<string, boolean>,
        // Leg length moved to Foliepas
        // Digitaal fields
        digitalEnabled: data.digitalEnabled,
        heelLiftLeft: data.heelLiftLeft || '',
        heelLiftRight: data.heelLiftRight || '',
        readingHeight: data.readingHeight || '',
        mtp1DeepLeft: data.mtp1DeepLeft || '',
        mtp1DeepRight: data.mtp1DeepRight || '',
        clawToesEnabled: data.clawToesEnabled,
        scannedWithFoil: data.scannedWithFoil,
        digitalInstructions: data.digitalInstructions || '',
      }),
    );

    router.push(Routes.form_results);
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
                <FormBlock
                  columns={1}
                  dividers={false}
                  hoverEffect={false}
                >
                  <RadioGroup
                    value={form.watch('welkPaar')}
                    onValueChange={v => form.setValue('welkPaar', v)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PAARTYPE_OPTIES.map(option => (
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
                <FormBlock
                  columns={1}
                  dividers={false}
                  hoverEffect={false}
                >
                  <RadioGroup
                    value={side}
                    onValueChange={v => form.setValue('side', v as Zijde)}
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
                <FormBlock
                  columns={1}
                  dividers={false}
                  hoverEffect={false}
                >
                  <div className="flex flex-wrap gap-6">
                    {showLinks && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="amp-left"
                          checked={form.watch('amputatieLinksEnabled')}
                          onCheckedChange={checked =>
                            form.setValue('amputatieLinksEnabled', !!checked)
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
                          checked={form.watch('amputatieRechtsEnabled')}
                          onCheckedChange={checked =>
                            form.setValue('amputatieRechtsEnabled', !!checked)
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
                  {ZIEKTEBEELDEN_OPTIES.map(optie => (
                    <div
                      key={optie.key}
                      className="flex items-center space-x-2 rounded-md border bg-muted/50 px-3 py-2"
                    >
                      <Checkbox
                        id={`ziektebeeld-${optie.key}`}
                        checked={
                          (form.watch('ziektebeelden')[
                            optie.key
                          ] as boolean) || false
                        }
                        onCheckedChange={checked =>
                          form.setValue('ziektebeelden', {
                            ...form.getValues('ziektebeelden'),
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
                <FormBlock title={t('walkingDistanceAids')}
                  columns={3}
                  dividers={false}
                  centerTitle={true}
                >
                  {LOOPAFSTAND_OPTIES.map(optie => (
                    <div
                      key={optie.key}
                      className="flex items-center space-x-2 rounded-md border bg-muted/50 px-3 py-2"
                    >
                      <Checkbox
                        id={`loopafstand-${optie.key}`}
                        checked={
                          (form.watch('loopafstandAids')[
                            optie.key
                          ] as boolean) || false
                        }
                        onCheckedChange={checked =>
                          form.setValue('loopafstandAids', {
                            ...form.getValues('loopafstandAids'),
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
                <FormBlock
                  title={t('painPerception')}
                  centerTitle={true}
                >
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
                  {INSPECTIE_VOETEN_OPTIES.map(optie => (
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
              <FormCard
                title={t('shaftHeight')}
              >
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                >
                  {showLinks && (
                    <FormItemWrapper className="items-center">
                      <Label htmlFor="shaft-left">{t('leftCm')}</Label>
                      <Input
                        id="shaft-left"
                        type="number"
                        placeholder="cm"
                        value={form.watch('schachthoogteLinks')}
                        onChange={e =>
                          form.setValue('schachthoogteLinks', e.target.value)
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
                        placeholder="cm"
                        value={form.watch('schachthoogteRechts')}
                        onChange={e =>
                          form.setValue('schachthoogteRechts', e.target.value)
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
                        onChange={e => form.setValue('heelLiftLeft', e.target.value)}
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
                        onChange={e => form.setValue('heelLiftRight', e.target.value)}
                        className="w-2/3"
                      />
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* 3-koloms Radio Groups */}
                <FormBlock
                  columns={3}
                  dividers={true}
                >
                  <FormItemWrapper                  >
                    <Label className="text-base font-semibold">{t('readingHeight')}</Label>
                    <RadioGroup value={form.watch('readingHeight')} onValueChange={v => form.setValue('readingHeight', v)}>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {LEESTHOOGTE_OPTIES.map(opt => (
                          <div key={opt.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={opt.value} id={`reading-height-${opt.value}`} />
                            <Label htmlFor={`reading-height-${opt.value}`} className="font-normal cursor-pointer">
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>

                  <FormItemWrapper>
                    <Label className="text-base font-semibold">{t('clawToes')}</Label>
                    <RadioGroup value={boolToString(form.watch('clawToesEnabled'))} onValueChange={v => form.setValue('clawToesEnabled', stringToBool(v))}>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {JA_NEE_OPTIES.map(opt => (
                          <div key={opt.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={opt.value} id={`claw-toes-${opt.value}`} />
                            <Label htmlFor={`claw-toes-${opt.value}`} className="font-normal cursor-pointer">
                              {t(opt.label)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>

                  <FormItemWrapper>
                    <Label className="text-base font-semibold">{t('scannedWithFoil')}</Label>
                    <RadioGroup value={boolToString(form.watch('scannedWithFoil'))} onValueChange={v => form.setValue('scannedWithFoil', stringToBool(v))}>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {JA_NEE_OPTIES.map(opt => (
                          <div key={opt.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={opt.value} id={`scanned-foil-${opt.value}`} />
                            <Label htmlFor={`scanned-foil-${opt.value}`} className="font-normal cursor-pointer">
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
                      <Select value={form.watch('mtp1DeepLeft')} onValueChange={v => form.setValue('mtp1DeepLeft', v)}>
                        <SelectTrigger id="mtp1-left" className="w-2/3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {MTP1_DIEP_OPTIES.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper className="items-center">
                      <Label htmlFor="mtp1-right">{t('rightCm')}</Label>
                      <Select value={form.watch('mtp1DeepRight')} onValueChange={v => form.setValue('mtp1DeepRight', v)}>
                        <SelectTrigger id="mtp1-right" className="w-2/3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {MTP1_DIEP_OPTIES.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
                    onChange={e => form.setValue('digitalInstructions', e.target.value)}
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
                    value={form.watch('bijzonderheden')}
                    onChange={e =>
                      form.setValue('bijzonderheden', e.target.value)
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
    </BaseLayout >
  );
};

export default FormIntakeOSAPage;
