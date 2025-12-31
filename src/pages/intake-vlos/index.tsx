import React from 'react';
import { getAssetPath } from '@/utils/assetPath';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormCard, FormBlock, FormItemWrapper } from '@/components/ui/form-block';
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
  Zijde,
  ZIEKTEBEELDEN_OPTIES,
  LOOPAFSTAND_OPTIES,
  INSPECTIE_VOETEN_OPTIES,
} from '@/lib/constants/formConstants';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setIntakeVLOSData, setClientData } from '@/domain/store/slices/formData';

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
import { Switch } from '@/components/ui/switch';

const FormIntakeVLOSPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    welkPaar: z.string(),
    medischeIndicatie: z.string().optional(),
    side: z.enum(['left', 'right', 'both'] as const),

    schachthoogteLinks: z.string().optional(),
    schachthoogteRechts: z.string().optional(),
    omsluitingLinks: z.record(z.string(), z.boolean()),
    omsluitingRechts: z.record(z.string(), z.boolean()),
    omsluitingLinksMm: z.record(z.string(), z.string()),
    omsluitingRechtsMm: z.record(z.string(), z.string()),
    supplementschoringLinksEnabled: z.boolean(),
    supplementschoringRechtsEnabled: z.boolean(),
    supplementschoringLinksType: z.string().optional(),
    supplementschoringRechtsType: z.string().optional(),
    zoolverstijvingEnabled: z.boolean(),
    zoolverstijvingLinks: z.boolean().optional(),
    zoolverstijvingRechts: z.boolean().optional(),
    sluitingType: z.string().optional(),
    inschotpunt: z.string().optional(),
    openstandSchacht: z.string().optional(),
    tongpolsterEnabled: z.boolean(),
    tongVaststikkenEnabled: z.boolean(),
    haksoortLinks: z.string().optional(),
    haksoortRechts: z.string().optional(),
    hakhoogteLinks: z.string().optional(),
    hakhoogteRechts: z.string().optional(),
    hakschoringLinksEnabled: z.boolean(),
    hakschoringRechtsEnabled: z.boolean(),
    hakschoringLinksType: z.string().optional(),
    hakschoringRechtsType: z.string().optional(),
    ezelsoorLinksEnabled: z.boolean(),
    ezelsoorRechtsEnabled: z.boolean(),
    ezelsoorLinksType: z.string().optional(),
    ezelsoorRechtsType: z.string().optional(),
    amputatieLinksEnabled: z.boolean(),
    amputatieRechtsEnabled: z.boolean(),
    hakafrondingLinksEnabled: z.boolean(),
    hakafrondingRechtsEnabled: z.boolean(),
    hakafrondingLinksHoogte: z.string().optional(),
    hakafrondingLinksLengte: z.string().optional(),
    hakafrondingRechtsHoogte: z.string().optional(),
    hakafrondingRechtsLengte: z.string().optional(),
    loopzoolType: z.string().optional(),

    bijzonderheden: z.string().optional(),

    // Functieonderzoek fields
    ziektebeelden: z.record(z.string(), z.boolean()),
    loopafstandAids: z.record(z.string(), z.boolean()),
    painPerception: z.string().optional(),
    footInspection: z.record(z.string(), z.boolean()),

  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      welkPaar: 'Eerste paar',
      medischeIndicatie: '',
      side: 'both',
      schachthoogteLinks: '14',
      schachthoogteRechts: '14',
      omsluitingLinks: { omsluitingLinksMultivorm: true },
      omsluitingRechts: { omsluitingRechtsMultivorm: true },
      omsluitingLinksMm: { omsluitingMmLinksMultivorm: '3' },
      omsluitingRechtsMm: { omsluitingMmRechtsMultivorm: '3' },
      supplementschoringLinksEnabled: false,
      supplementschoringRechtsEnabled: false,
      supplementschoringLinksType: HAKSCHORING_TYPE_OPTIES[0]?.value || '',
      supplementschoringRechtsType: HAKSCHORING_TYPE_OPTIES[0]?.value || '',
      zoolverstijvingEnabled: false,
      zoolverstijvingLinks: false,
      zoolverstijvingRechts: false,
      sluitingType: SLUITING_OPTIES[0]?.value || '',
      inschotpunt: '',
      openstandSchacht: OPENSTAND_OPTIES[2]?.value || '',
      tongpolsterEnabled: false,
      tongVaststikkenEnabled: false,
      haksoortLinks: HAKSOORT_OPTIES[0]?.value || '',
      haksoortRechts: HAKSOORT_OPTIES[0]?.value || '',
      hakhoogteLinks: '2',
      hakhoogteRechts: '2',
      hakschoringLinksEnabled: false,
      hakschoringRechtsEnabled: false,
      hakschoringLinksType: HAKSCHORING_TYPE_OPTIES[0]?.value || '',
      hakschoringRechtsType: HAKSCHORING_TYPE_OPTIES[0]?.value || '',
      ezelsoorLinksEnabled: false,
      ezelsoorRechtsEnabled: false,
      ezelsoorLinksType: HAKSCHORING_TYPE_OPTIES[0]?.value || '',
      ezelsoorRechtsType: HAKSCHORING_TYPE_OPTIES[0]?.value || '',
      amputatieLinksEnabled: false,
      amputatieRechtsEnabled: false,
      hakafrondingLinksEnabled: true,
      hakafrondingRechtsEnabled: true,
      hakafrondingLinksHoogte: '10',
      hakafrondingLinksLengte: '50',
      hakafrondingRechtsHoogte: '10',
      hakafrondingRechtsLengte: '50',
      loopzoolType: LOOPZOOL_OPTIES[0]?.value || '',
      bijzonderheden: '',

      // Functieonderzoek defaults
      ziektebeelden: {},
      loopafstandAids: {},
      painPerception: '0',
      footInspection: {},
    },
  });

  const { clearStorage } = useFormPersistence('intakeVLOS', form.watch, form.setValue);

  const side = form.watch('side');
  const zoolverstijvingEnabled = form.watch('zoolverstijvingEnabled');
  const supplementschoringLinksEnabled = form.watch(
    'supplementschoringLinksEnabled',
  );
  const supplementschoringRechtsEnabled = form.watch(
    'supplementschoringRechtsEnabled',
  );
  const hakschoringLinksEnabled = form.watch('hakschoringLinksEnabled');
  const hakschoringRechtsEnabled = form.watch('hakschoringRechtsEnabled');
  const ezelsoorLinksEnabled = form.watch('ezelsoorLinksEnabled');
  const ezelsoorRechtsEnabled = form.watch('ezelsoorRechtsEnabled');
  const hakafrondingLinksEnabled = form.watch('hakafrondingLinksEnabled');
  const hakafrondingRechtsEnabled = form.watch('hakafrondingRechtsEnabled');
  const omsluitingLinks = form.watch('omsluitingLinks');
  const omsluitingRechts = form.watch('omsluitingRechts');

  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

  // Helper functions
  const boolToString = (value: boolean): string => (value ? 'ja' : 'nee');
  const stringToBool = (value: string): boolean => value === 'ja';

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'VLOS' }));
    }

    dispatch(
      setIntakeVLOSData({
        welkPaar: data.welkPaar,
        medischeIndicatie: data.medischeIndicatie || '',
        side: data.side,
        schachthoogteLinks: data.schachthoogteLinks || '',
        schachthoogteRechts: data.schachthoogteRechts || '',
        omsluitingLinks: data.omsluitingLinks as Record<string, boolean>,
        omsluitingRechts: data.omsluitingRechts as Record<string, boolean>,
        omsluitingLinksMm: data.omsluitingLinksMm as Record<string, string>,
        omsluitingRechtsMm: data.omsluitingRechtsMm as Record<string, string>,
        supplementschoringLinksEnabled: data.supplementschoringLinksEnabled,
        supplementschoringRechtsEnabled: data.supplementschoringRechtsEnabled,
        supplementschoringLinksType: data.supplementschoringLinksType || '',
        supplementschoringRechtsType: data.supplementschoringRechtsType || '',
        zoolverstijvingEnabled: data.zoolverstijvingEnabled,
        zoolverstijvingLinks: data.zoolverstijvingLinks,
        zoolverstijvingRechts: data.zoolverstijvingRechts,
        sluitingType: data.sluitingType || '',
        inschotpunt: data.inschotpunt || '',
        openstandSchacht: data.openstandSchacht || '',
        tongpolsterEnabled: data.tongpolsterEnabled,
        tongVaststikkenEnabled: data.tongVaststikkenEnabled,
        haksoortLinks: data.haksoortLinks || '',
        haksoortRechts: data.haksoortRechts || '',
        hakhoogteLinks: data.hakhoogteLinks || '',
        hakhoogteRechts: data.hakhoogteRechts || '',
        hakschoringLinksEnabled: data.hakschoringLinksEnabled,
        hakschoringRechtsEnabled: data.hakschoringRechtsEnabled,
        hakschoringLinksType: data.hakschoringLinksType || '',
        hakschoringRechtsType: data.hakschoringRechtsType || '',
        ezelsoorLinksEnabled: data.ezelsoorLinksEnabled,
        ezelsoorRechtsEnabled: data.ezelsoorRechtsEnabled,
        ezelsoorLinksType: data.ezelsoorLinksType || '',
        ezelsoorRechtsType: data.ezelsoorRechtsType || '',
        amputatieLinksEnabled: data.amputatieLinksEnabled,
        amputatieRechtsEnabled: data.amputatieRechtsEnabled,
        hakafrondingLinksEnabled: data.hakafrondingLinksEnabled,
        hakafrondingRechtsEnabled: data.hakafrondingRechtsEnabled,
        hakafrondingLinksHoogte: data.hakafrondingLinksHoogte || '',
        hakafrondingLinksLengte: data.hakafrondingLinksLengte || '',
        hakafrondingRechtsHoogte: data.hakafrondingRechtsHoogte || '',
        hakafrondingRechtsLengte: data.hakafrondingRechtsLengte || '',
        loopzoolType: data.loopzoolType || '',
        bijzonderheden: data.bijzonderheden || '',

        // Functieonderzoek fields
        ziektebeelden: data.ziektebeelden as Record<string, boolean>,
        loopafstandAids: data.loopafstandAids as Record<string, boolean>,
        painPerception: data.painPerception || '',
        footInspection: data.footInspection as Record<string, boolean>,

      }),
    );

    router.push(Routes.form_results);
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
              <FormCard
                title={t('description')}
                description={t('whichPair')}
              >
                <FormBlock
                  columns={2}
                  dividers={true}
                  alignItems="start"
                >
                  {/* Which Pair (Radio Group) */}
                  <FormItemWrapper label={t('whichPair')}>
                    <RadioGroup
                      value={form.watch('welkPaar')}
                      onValueChange={val => form.setValue('welkPaar', val)}
                      className="w-2/3"
                    >
                      <div className="flex flex-col gap-3">
                        {PAARTYPE_OPTIES.map(option => (
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
                      value={form.watch('medischeIndicatie')}
                      onChange={e => form.setValue('medischeIndicatie', e.target.value)}
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
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                >
                  {/* Side Selection */}
                  <FormItemWrapper
                    label={t('side')}
                  >
                    <FormField
                      control={form.control}
                      name="side"
                      render={({ field }) => (
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
                                  <RadioGroupItem value="right" id="side-right" />
                                  <Label htmlFor="side-right">{t('right')}</Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>

                  {/* Amputation */}
                  <FormItemWrapper
                    label={t('amputation')}
                  >
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="amp-left"
                          checked={form.watch('amputatieLinksEnabled')}
                          onCheckedChange={checked =>
                            form.setValue('amputatieLinksEnabled', !!checked)
                          }
                        />
                        <Label htmlFor="amp-left" className="font-normal cursor-pointer">
                          {t('left')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="amp-right"
                          checked={form.watch('amputatieRechtsEnabled')}
                          onCheckedChange={checked =>
                            form.setValue('amputatieRechtsEnabled', !!checked)
                          }
                        />
                        <Label htmlFor="amp-right" className="font-normal cursor-pointer">
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
                  {ZIEKTEBEELDEN_OPTIES.map(optie => (
                    <Label
                      key={optie.key}
                      className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
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
                        className=""
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t(optie.translationKey)}
                        </p>
                      </div>
                    </Label>
                  ))}
                </FormBlock>

                {/* Loopafstand hulpmiddelen */}
                <FormBlock title={t('walkingDistanceAids')}
                  columns={3}
                  dividers={false}
                  centerTitle={true}
                >
                  {LOOPAFSTAND_OPTIES.map(optie => (
                    <Label
                      key={optie.key}
                      className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
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
                        className=""
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t(optie.translationKey)}
                        </p>
                      </div>
                    </Label>
                  ))}
                </FormBlock>

                {/* Pijnbeleving */}
                <FormBlock
                  title={t('painPerception')}
                  centerTitle={true}
                >
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
                  {INSPECTIE_VOETEN_OPTIES.map(optie => (
                    <Label
                      className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
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
                        className=""
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t(optie.translationKey)}
                        </p>
                      </div>
                    </Label>
                  ))}
                </FormBlock>
              </FormCard>

              {/* Shaft Height */}
              <FormCard
                title={t('shaftHeight')}
              >
                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                >
                  {showLinks && (
                    <FormItemWrapper
                      label={t('leftCm')}
                      className="items-center">
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
                    <FormItemWrapper
                      className="items-center"
                      label={t('rightCm')}
                    >
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

              {/* Shaft Opening */}
              <FormCard title={t('shaftOpening')}>
                <FormBlock
                  columns={1}
                  dividers={false}
                  hoverEffect={false}
                >
                  <RadioGroup
                    value={form.watch('openstandSchacht')}
                    onValueChange={v => form.setValue('openstandSchacht', v)}
                    className="justify-center"
                  >
                    <div className="flex flex-wrap center-items gap-4">
                      {OPENSTAND_OPTIES.map(opt => (
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
                    <FormItemWrapper
                      label={t('left')}
                    >
                      <div className="space-y-3 w-full lg:w-3/4"> {/* Full on mobile, 3/4 on desktop */}
                        {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                          <Label
                            key={optie.key}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 sm:p-2 cursor-pointer transition-colors hover:bg-accent/30 has-aria-checked:bg-accent/50"
                          >
                            <Switch
                              id={`encl-left-${optie.key}`}
                              checked={
                                (form.watch('omsluitingLinks')[
                                  optie.fullKeyLinks
                                ] as boolean) || false
                              }
                              onCheckedChange={checked => {
                                if (window.navigator?.vibrate) {
                                  window.navigator.vibrate(10);
                                }

                                form.setValue('omsluitingLinks', {
                                  ...form.getValues('omsluitingLinks'),
                                  [optie.fullKeyLinks]: !!checked,
                                });
                                if (checked && optie.needsMm && optie.defaultMm) {
                                  form.setValue('omsluitingLinksMm', {
                                    ...form.getValues('omsluitingLinksMm'),
                                    [optie.mmKeyLinks]: optie.defaultMm,
                                  });
                                } else if (!checked) {
                                  const next = {
                                    ...form.getValues('omsluitingLinksMm'),
                                  };
                                  delete next[optie.mmKeyLinks];
                                  form.setValue('omsluitingLinksMm', next);
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="font-normal text-base sm:text-sm leading-tight flex-1">
                              {optie.label}
                            </span>
                            {optie.needsMm &&
                              (form.watch('omsluitingLinks')[
                                optie.fullKeyLinks
                              ] as boolean) && (
                                <Input
                                  type="number"
                                  inputMode={optie.key === 'hoge' ? 'decimal' : 'numeric'}
                                  pattern="[0-9]*"
                                  placeholder={optie.key === 'hoge' ? 'cm' : 'mm'}
                                  value={
                                    (form.watch('omsluitingLinksMm')[
                                      optie.mmKeyLinks
                                    ] as string) || ''
                                  }
                                  onChange={e =>
                                    form.setValue('omsluitingLinksMm', {
                                      ...form.getValues('omsluitingLinksMm'),
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
                    <FormItemWrapper
                      label={t('right')}
                    >
                      <div className="space-y-3 w-full lg:w-3/4">
                        {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                          <Label
                            key={optie.key}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border bg-background p-3 sm:p-2 cursor-pointer transition-colors hover:bg-accent/30 has-aria-checked:bg-accent/50"
                          >
                            <Switch
                              id={`encl-right-${optie.key}`}
                              checked={
                                (form.watch('omsluitingRechts')[
                                  optie.fullKeyRechts
                                ] as boolean) || false
                              }
                              onCheckedChange={checked => {
                                if (window.navigator?.vibrate) {
                                  window.navigator.vibrate(10);
                                }

                                form.setValue('omsluitingRechts', {
                                  ...form.getValues('omsluitingRechts'),
                                  [optie.fullKeyRechts]: !!checked,
                                });
                                if (checked && optie.needsMm && optie.defaultMm) {
                                  form.setValue('omsluitingRechtsMm', {
                                    ...form.getValues('omsluitingRechtsMm'),
                                    [optie.mmKeyRechts]: optie.defaultMm,
                                  });
                                } else if (!checked) {
                                  const next = {
                                    ...form.getValues('omsluitingRechtsMm'),
                                  };
                                  delete next[optie.mmKeyRechts];
                                  form.setValue('omsluitingRechtsMm', next);
                                }
                              }}
                              className="mr-2"
                            />
                            <span className="font-normal text-base sm:text-sm leading-tight flex-1">
                              {optie.label}
                            </span>
                            {optie.needsMm &&
                              (form.watch('omsluitingRechts')[
                                optie.fullKeyRechts
                              ] as boolean) && (
                                <Input
                                  type="number"
                                  inputMode={optie.key === 'hoge' ? 'decimal' : 'numeric'}
                                  pattern="[0-9]*"
                                  placeholder={optie.key === 'hoge' ? 'cm' : 'mm'}
                                  value={
                                    (form.watch('omsluitingRechtsMm')[
                                      optie.mmKeyRechts
                                    ] as string) || ''
                                  }
                                  onChange={e =>
                                    form.setValue('omsluitingRechtsMm', {
                                      ...form.getValues('omsluitingRechtsMm'),
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
                    <FormItemWrapper
                      label={t('left')}
                      className="items-center"
                    >
                      <div className="flex items-center p-3 space-x-2">
                        <Switch
                          id="supplementschoring-links-switch"
                          checked={supplementschoringLinksEnabled}
                          onCheckedChange={checked =>
                            form.setValue('supplementschoringLinksEnabled', !!checked)
                          }
                        />
                        <Label htmlFor="supplementschoring-links-switch" className="font-normal cursor-pointer">
                          {supplementschoringLinksEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {supplementschoringLinksEnabled && (
                        <Select
                          value={form.watch('supplementschoringLinksType')}
                          onValueChange={v =>
                            form.setValue('supplementschoringLinksType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                SUPPLEMENT_TYPE_OPTIES.find(
                                  opt => opt.value === form.watch('supplementschoringLinksType')
                                )?.label || ''
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {SUPPLEMENT_TYPE_OPTIES.map(opt => (
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
                          checked={supplementschoringRechtsEnabled}
                          onCheckedChange={checked =>
                            form.setValue('supplementschoringRechtsEnabled', !!checked)
                          }
                        />
                        <Label htmlFor="supplementschoring-rechts-switch" className="font-normal cursor-pointer">
                          {supplementschoringRechtsEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {supplementschoringRechtsEnabled && (
                        <Select
                          value={form.watch('supplementschoringRechtsType')}
                          onValueChange={v =>
                            form.setValue('supplementschoringRechtsType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                SUPPLEMENT_TYPE_OPTIES.find(
                                  opt => opt.value === form.watch('supplementschoringRechtsType')
                                )?.label || ''
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {SUPPLEMENT_TYPE_OPTIES.map(opt => (
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
                        checked={zoolverstijvingEnabled}
                        onCheckedChange={checked =>
                          form.setValue('zoolverstijvingEnabled', !!checked)
                        }
                      />
                      <Label htmlFor="zoolverstijving-switch" className="font-normal cursor-pointer">
                        {zoolverstijvingEnabled ? t('yes') : t('no')}
                      </Label>
                    </div>
                  </FormItemWrapper>

                  {zoolverstijvingEnabled && (
                    <FormItemWrapper
                      label={t('side')}
                    >
                      <div className="flex gap-6 pt-2">
                        {showLinks && (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="stiff-left"
                              checked={form.watch('zoolverstijvingLinks')}
                              onCheckedChange={checked =>
                                form.setValue(
                                  'zoolverstijvingLinks',
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
                              checked={form.watch('zoolverstijvingRechts')}
                              onCheckedChange={checked =>
                                form.setValue(
                                  'zoolverstijvingRechts',
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
              <FormCard title={t('closure') + ' & ' + t('tongueOptions') + ' & ' + t('insertPoint')}>
                <FormBlock columns={3} dividers={true} hoverEffect={false}>
                  <FormItemWrapper label={t('closureType')}>
                    <RadioGroup
                      value={form.watch('sluitingType')}
                      onValueChange={v => form.setValue('sluitingType', v)}
                    >
                      <div className="flex flex-row gap-4">
                        {SLUITING_OPTIES.map(opt => (
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
                        checked={form.watch('tongpolsterEnabled')}
                        onCheckedChange={checked =>
                          form.setValue('tongpolsterEnabled', !!checked)
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
                        checked={form.watch('tongVaststikkenEnabled')}
                        onCheckedChange={checked =>
                          form.setValue('tongVaststikkenEnabled', !!checked)
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

                <FormBlock
                  columns={2}
                  dividers={true}
                  hoverEffect={false}
                  title={t('insertPoint')}
                >
                  <FormItemWrapper
                    label={t('insertPoint')}
                    className='justify-center'
                  >
                    <Input
                      id="insert-point"
                      value={form.watch('inschotpunt')}
                      onChange={e =>
                        form.setValue('inschotpunt', e.target.value)
                      }
                      placeholder={t('insertPointPlaceholder')}
                      className='w-2/3'
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
              <FormCard title={t('heelType') + ' & ' + t('heelHeight') + ' & ' + t('heelSlant')}>
                {/* Heel Type */}
                <FormBlock columns={2} dividers={true} hoverEffect={false} title={t('heelType')}>
                  {showLinks && (
                    <FormItemWrapper
                      label={t('left')}
                    >
                      <Select
                        value={form.watch('haksoortLinks')}
                        onValueChange={v => form.setValue('haksoortLinks', v)}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {t(
                              HAKSOORT_OPTIES.find(
                                opt => opt.value === form.watch('haksoortLinks')
                              )?.label || ''
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {HAKSOORT_OPTIES.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {t(opt.label)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper
                      label={t('right')}
                    >
                      <Select
                        value={form.watch('haksoortRechts')}
                        onValueChange={v => form.setValue('haksoortRechts', v)}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {t(
                              HAKSOORT_OPTIES.find(
                                opt => opt.value === form.watch('haksoortRechts')
                              )?.label || ''
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {HAKSOORT_OPTIES.map(opt => (
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
                    <FormItemWrapper
                      label={t('left')}
                    >
                      <div className="flex flex-col text-center">
                        <Input
                          id="heel-height-left"
                          type="number"
                          value={form.watch('hakhoogteLinks')}
                          onChange={e =>
                            form.setValue('hakhoogteLinks', e.target.value)
                          }
                          placeholder="cm"
                        />
                      </div>
                    </FormItemWrapper>
                  )}
                  {showRechts && (
                    <FormItemWrapper
                      label={t('right')}
                    >
                      <div className="flex flex-col text-center">
                        <Input
                          id="heel-height-right"
                          type="number"
                          value={form.watch('hakhoogteRechts')}
                          onChange={e =>
                            form.setValue('hakhoogteRechts', e.target.value)
                          }
                          placeholder="cm"
                        />
                      </div>
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Heel Slant */}
                <FormBlock columns={2} dividers={true} hoverEffect={false} title={t('heelSlant')}>
                  {showLinks && (
                    <FormItemWrapper label={t('left')}>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="hakschoring-links-switch"
                          checked={hakschoringLinksEnabled}
                          onCheckedChange={checked =>
                            form.setValue('hakschoringLinksEnabled', !!checked)
                          }
                        />
                        <Label htmlFor="hakschoring-links-switch" className="font-normal cursor-pointer">
                          {hakschoringLinksEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {hakschoringLinksEnabled && (
                        <Select
                          value={form.watch('hakschoringLinksType')}
                          onValueChange={v =>
                            form.setValue('hakschoringLinksType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                HAKSCHORING_TYPE_OPTIES.find(
                                  opt => opt.value === form.watch('hakschoringLinksType')
                                )?.label || ''
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {HAKSCHORING_TYPE_OPTIES.map(opt => (
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
                          checked={hakschoringRechtsEnabled}
                          onCheckedChange={checked =>
                            form.setValue('hakschoringRechtsEnabled', !!checked)
                          }
                        />
                        <Label htmlFor="hakschoring-rechts-switch" className="font-normal cursor-pointer">
                          {hakschoringRechtsEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {hakschoringRechtsEnabled && (
                        <Select
                          value={form.watch('hakschoringRechtsType')}
                          onValueChange={v =>
                            form.setValue('hakschoringRechtsType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                HAKSCHORING_TYPE_OPTIES.find(
                                  opt => opt.value === form.watch('hakschoringRechtsType')
                                )?.label || ''
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {HAKSCHORING_TYPE_OPTIES.map(opt => (
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
                          checked={ezelsoorLinksEnabled}
                          onCheckedChange={checked =>
                            form.setValue('ezelsoorLinksEnabled', !!checked)
                          }
                        />
                        <Label htmlFor="ezelsoor-links-switch" className="font-normal cursor-pointer">
                          {ezelsoorLinksEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {ezelsoorLinksEnabled && (
                        <Select
                          value={form.watch('ezelsoorLinksType')}
                          onValueChange={v =>
                            form.setValue('ezelsoorLinksType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                EZELSOOR_TYPE_OPTIES.find(
                                  opt => opt.value === form.watch('ezelsoorLinksType')
                                )?.label || ''
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {EZELSOOR_TYPE_OPTIES.map(opt => (
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
                          checked={ezelsoorRechtsEnabled}
                          onCheckedChange={checked =>
                            form.setValue('ezelsoorRechtsEnabled', !!checked)
                          }
                        />
                        <Label htmlFor="ezelsoor-rechts-switch" className="font-normal cursor-pointer">
                          {ezelsoorRechtsEnabled ? t('yes') : t('no')}
                        </Label>
                      </div>
                      {ezelsoorRechtsEnabled && (
                        <Select
                          value={form.watch('ezelsoorRechtsType')}
                          onValueChange={v =>
                            form.setValue('ezelsoorRechtsType', v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {t(
                                EZELSOOR_TYPE_OPTIES.find(
                                  opt => opt.value === form.watch('ezelsoorRechtsType')
                                )?.label || ''
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {EZELSOOR_TYPE_OPTIES.map(opt => (
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
                  alignItems='start'
                >
                  <FormItemWrapper label={t('left')}>
                    {showLinks && (
                      <>
                        <div className="flex items-center space-x-2 mb-2">
                          <Switch
                            id="round-left"
                            checked={form.watch('hakafrondingLinksEnabled')}
                            onCheckedChange={checked =>
                              form.setValue(
                                'hakafrondingLinksEnabled',
                                !!checked,
                              )
                            }
                          />
                          <Label
                            htmlFor="round-left"
                            className="font-normal cursor-pointer"
                          >
                            {hakafrondingLinksEnabled ? t('yes') : t('no')}
                          </Label>
                        </div>
                        {hakafrondingLinksEnabled && (
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
                                value={form.watch('hakafrondingLinksHoogte')}
                                onChange={e =>
                                  form.setValue(
                                    'hakafrondingLinksHoogte',
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
                                value={form.watch('hakafrondingLinksLengte')}
                                onChange={e =>
                                  form.setValue(
                                    'hakafrondingLinksLengte',
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
                            checked={form.watch('hakafrondingRechtsEnabled')}
                            onCheckedChange={checked =>
                              form.setValue(
                                'hakafrondingRechtsEnabled',
                                !!checked,
                              )
                            }
                          />
                          <Label
                            htmlFor="round-right"
                            className="font-normal cursor-pointer"
                          >
                            {hakafrondingRechtsEnabled ? t('yes') : t('no')}
                          </Label>
                        </div>
                        {hakafrondingRechtsEnabled && (
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
                                value={form.watch('hakafrondingRechtsHoogte')}
                                onChange={e =>
                                  form.setValue(
                                    'hakafrondingRechtsHoogte',
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
                                value={form.watch('hakafrondingRechtsLengte')}
                                onChange={e =>
                                  form.setValue(
                                    'hakafrondingRechtsLengte',
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
                      value={form.watch('loopzoolType')}
                      onValueChange={v => form.setValue('loopzoolType', v)}
                    >
                      <SelectTrigger className="w-2/3">
                        <SelectValue>
                          {t(
                            LOOPZOOL_OPTIES.find(
                              opt => opt.value === form.watch('loopzoolType')
                            )?.label || ''
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {LOOPZOOL_OPTIES.map(opt => (
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
              <FormCard
                title={t('specialNotes')}
              >
                <Textarea
                  placeholder={t('specialNotesPlaceholder')}
                  value={form.watch('bijzonderheden')}
                  onChange={e =>
                    form.setValue('bijzonderheden', e.target.value)
                  }
                  rows={5}
                />
              </FormCard>

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
      </div >
    </BaseLayout >
  );
};

export default FormIntakeVLOSPage;
