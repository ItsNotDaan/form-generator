import React from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    legLengthDifferenceLeft: z.string().optional(),
    legLengthDifferenceRight: z.string().optional(),
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
      omsluitingLinks: { omsluitingLinksMultivorm: true },
      omsluitingRechts: { omsluitingRechtsMultivorm: true },
      omsluitingLinksMm: { omsluitingMmLinksMultivorm: '3' },
      omsluitingRechtsMm: { omsluitingMmRechtsMultivorm: '3' },
      supplementschoringLinksEnabled: false,
      supplementschoringRechtsEnabled: false,
      supplementschoringLinksType: 'Lateraal',
      supplementschoringRechtsType: 'Lateraal',
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
      hakschoringLinksType: 'Lateraal',
      hakschoringRechtsType: 'Lateraal',
      ezelsoorLinksEnabled: false,
      ezelsoorRechtsEnabled: false,
      ezelsoorLinksType: 'Lateraal',
      ezelsoorRechtsType: 'Lateraal',
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
      legLengthDifferenceLeft: '',
      legLengthDifferenceRight: '',
      // Digitaal defaults
      digitalEnabled: false,
      heelLiftLeft: '',
      heelLiftRight: '',
      readingHeight: LEESTHOOGTE_OPTIES[0]?.value || '',
      mtp1DeepLeft: MTP1_DIEP_OPTIES[0]?.value || '',
      mtp1DeepRight: MTP1_DIEP_OPTIES[0]?.value || '',
      clawToesEnabled: false,
      scannedWithFoil: false,
      digitalInstructions: '',
    },
  });

  const side = form.watch('side');
  const zoolverstijvingEnabled = form.watch('zoolverstijvingEnabled');
  const supplementschoringLinksEnabled = form.watch('supplementschoringLinksEnabled');
  const supplementschoringRechtsEnabled = form.watch('supplementschoringRechtsEnabled');
  const hakschoringLinksEnabled = form.watch('hakschoringLinksEnabled');
  const hakschoringRechtsEnabled = form.watch('hakschoringRechtsEnabled');
  const ezelsoorLinksEnabled = form.watch('ezelsoorLinksEnabled');
  const ezelsoorRechtsEnabled = form.watch('ezelsoorRechtsEnabled');
  const hakafrondingLinksEnabled = form.watch('hakafrondingLinksEnabled');
  const hakafrondingRechtsEnabled = form.watch('hakafrondingRechtsEnabled');
  const omsluitingLinks = form.watch('omsluitingLinks');
  const omsluitingRechts = form.watch('omsluitingRechts');
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
        legLengthDifferenceLeft: data.legLengthDifferenceLeft || '',
        legLengthDifferenceRight: data.legLengthDifferenceRight || '',
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
      })
    );

    router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeOsa')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">{t('intakeOsa')}</h1>
          <p className="text-lg text-muted-foreground">{t('vlosDescription')}</p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* Which Pair */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('whichPair')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={form.watch("welkPaar")} onValueChange={(v) => form.setValue("welkPaar", v)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PAARTYPE_OPTIES.map(option => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`paar-${option.value}`} />
                          <Label htmlFor={`paar-${option.value}`} className="font-normal cursor-pointer">
                            {t(option.label)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Side Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('side')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={side} onValueChange={(v) => form.setValue("side", v as Zijde)}>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="side-both" />
                        <Label htmlFor="side-both" className="font-normal cursor-pointer">{t('both')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="side-left" />
                        <Label htmlFor="side-left" className="font-normal cursor-pointer">{t('left')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="side-right" />
                        <Label htmlFor="side-right" className="font-normal cursor-pointer">{t('right')}</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Functieonderzoek - New Section */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('functionalResearch')}</CardTitle>
                  <CardDescription>{t('functionalResearchDescription')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Ziektebeelden */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t('medicalConditions')}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {ZIEKTEBEELDEN_OPTIES.map((optie) => (
                        <div key={optie.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={`ziektebeeld-${optie.key}`}
                            checked={(form.watch("ziektebeelden")[optie.key] as boolean) || false}
                            onCheckedChange={(checked) =>
                              form.setValue("ziektebeelden", {
                                ...form.getValues("ziektebeelden"),
                                [optie.key]: !!checked,
                              })
                            }
                          />
                          <Label htmlFor={`ziektebeeld-${optie.key}`} className="font-normal cursor-pointer">
                            {t(optie.translationKey)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Loopafstand hulpmiddelen */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t('walkingDistanceAids')}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {LOOPAFSTAND_OPTIES.map((optie) => (
                        <div key={optie.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={`loopafstand-${optie.key}`}
                            checked={(form.watch("loopafstandAids")[optie.key] as boolean) || false}
                            onCheckedChange={(checked) =>
                              form.setValue("loopafstandAids", {
                                ...form.getValues("loopafstandAids"),
                                [optie.key]: !!checked,
                              })
                            }
                          />
                          <Label htmlFor={`loopafstand-${optie.key}`} className="font-normal cursor-pointer">
                            {t(optie.translationKey)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Pijnbeleving */}
                  <div className="space-y-2">
                    <Label htmlFor="pain-perception" className="text-base font-semibold">{t('painPerception')}</Label>
                    <div className="space-y-2">
                      <div className="grid grid-cols-6 gap-4 items-center">
                        <div className="text-sm text-muted-foreground text-center">{t('noPain')} (0)</div>
                        <Input
                          id="pain-perception"
                          type="range"
                          min="0"
                          max="10"
                          step="1"
                          value={form.watch("painPerception") || '0'}
                          onChange={(e) => form.setValue("painPerception", e.target.value)}
                          className="col-span-4"
                        />
                        <div className="text-sm text-muted-foreground text-center">{t('maximumPain')} (10)</div>
                      </div>
                      <div className="text-center text-2xl font-bold">{form.watch("painPerception") || '0'}</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Inspectie voeten */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t('footInspection')}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {INSPECTIE_VOETEN_OPTIES.map((optie) => (
                        <div key={optie.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={`foot-inspection-${optie.key}`}
                            checked={(form.watch("footInspection")[optie.key] as boolean) || false}
                            onCheckedChange={(checked) =>
                              form.setValue("footInspection", {
                                ...form.getValues("footInspection"),
                                [optie.key]: !!checked,
                              })
                            }
                          />
                          <Label htmlFor={`foot-inspection-${optie.key}`} className="font-normal cursor-pointer">
                            {t(optie.translationKey)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Beenlengte verschil */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t('legLengthDifference')}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="leg-length-left">{t('leftCm')}</Label>
                        <Input
                          id="leg-length-left"
                          type="number"
                          placeholder="cm"
                          value={form.watch("legLengthDifferenceLeft")}
                          onChange={(e) => form.setValue("legLengthDifferenceLeft", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leg-length-right">{t('rightCm')}</Label>
                        <Input
                          id="leg-length-right"
                          type="number"
                          placeholder="cm"
                          value={form.watch("legLengthDifferenceRight")}
                          onChange={(e) => form.setValue("legLengthDifferenceRight", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shaft Height */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('shaftHeight')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {showLinks && (
                      <div className="space-y-2">
                        <Label htmlFor="shaft-left">{t('leftCm')}</Label>
                        <Input
                          id="shaft-left"
                          type="number"
                          placeholder="cm"
                          value={form.watch("schachthoogteLinks")}
                          onChange={(e) => form.setValue("schachthoogteLinks", e.target.value)}
                        />
                      </div>
                    )}
                    {showRechts && (
                      <div className="space-y-2">
                        <Label htmlFor="shaft-right">{t('rightCm')}</Label>
                        <Input
                          id="shaft-right"
                          type="number"
                          placeholder="cm"
                          value={form.watch("schachthoogteRechts")}
                          onChange={(e) => form.setValue("schachthoogteRechts", e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Shaft Opening */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('shaftOpening')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={form.watch("openstandSchacht")} onValueChange={(v) => form.setValue("openstandSchacht", v)}>
                    <div className="flex flex-wrap gap-4">
                      {OPENSTAND_OPTIES.map(opt => (
                        <div key={opt.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt.value} id={`opening-${opt.value}`} />
                          <Label htmlFor={`opening-${opt.value}`} className="font-normal cursor-pointer">
                            {opt.label.replace('.', ',')} cm
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Enclosure (Omsluiting) - Complex multi-select with mm values */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('enclosure')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {showLinks && (
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">{t('left')}</Label>
                        {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                          <div key={optie.key} className="flex items-center gap-3">
                            <div className="flex items-center space-x-2 flex-1">
                              <Checkbox
                                id={`encl-left-${optie.key}`}
                                checked={(form.watch("omsluitingLinks")[optie.fullKeyLinks] as boolean) || false}
                                onCheckedChange={(checked) => {
                                  form.setValue("omsluitingLinks", { ...form.getValues("omsluitingLinks"), [optie.fullKeyLinks]: !!checked });
                                  if (checked && optie.needsMm && optie.defaultMm) {
                                    form.setValue("omsluitingLinksMm", {
                                      ...form.getValues("omsluitingLinksMm"), [optie.mmKeyLinks]: optie.defaultMm,
                                    });
                                  } else if (!checked) {
                                    const next = { ...form.getValues("omsluitingLinksMm") }; delete next[optie.mmKeyLinks]; form.setValue("omsluitingLinksMm", next);
                                  }
                                }}
                              />
                              <Label htmlFor={`encl-left-${optie.key}`} className="font-normal cursor-pointer text-sm">
                                {optie.label}
                              </Label>
                            </div>
                            {optie.needsMm && (form.watch("omsluitingLinks")[optie.fullKeyLinks] as boolean) && (
                              <Input
                                type="number"
                                placeholder="mm"
                                value={(form.watch("omsluitingLinksMm")[optie.mmKeyLinks] as string) || ''}
                                onChange={(e) =>
                                  form.setValue("omsluitingLinksMm", {
                                    ...form.getValues("omsluitingLinksMm"), [optie.mmKeyLinks]: e.target.value,
                                  })
                                }
                                className="w-20"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {showRechts && (
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">{t('right')}</Label>
                        {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                          <div key={optie.key} className="flex items-center gap-3">
                            <div className="flex items-center space-x-2 flex-1">
                              <Checkbox
                                id={`encl-right-${optie.key}`}
                                checked={(form.watch("omsluitingRechts")[optie.fullKeyRechts] as boolean) || false}
                                onCheckedChange={(checked) => {
                                  form.setValue("omsluitingRechts", { ...form.getValues("omsluitingRechts"), [optie.fullKeyRechts]: !!checked });
                                  if (checked && optie.needsMm && optie.defaultMm) {
                                    form.setValue("omsluitingRechtsMm", {
                                      ...form.getValues("omsluitingRechtsMm"), [optie.mmKeyRechts]: optie.defaultMm,
                                    });
                                  } else if (!checked) {
                                    const next = { ...form.getValues("omsluitingRechtsMm") }; delete next[optie.mmKeyRechts]; form.setValue("omsluitingRechtsMm", next);
                                  }
                                }}
                              />
                              <Label htmlFor={`encl-right-${optie.key}`} className="font-normal cursor-pointer text-sm">
                                {optie.label}
                              </Label>
                            </div>
                            {optie.needsMm && (form.watch("omsluitingRechts")[optie.fullKeyRechts] as boolean) && (
                              <Input
                                type="number"
                                placeholder="mm"
                                value={(form.watch("omsluitingRechtsMm")[optie.mmKeyRechts] as string) || ''}
                                onChange={(e) =>
                                  form.setValue("omsluitingRechtsMm", {
                                    ...form.getValues("omsluitingRechtsMm"), [optie.mmKeyRechts]: e.target.value,
                                  })
                                }
                                className="w-20"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Supplement Support / Ezelsoor / Amputatie sections */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('supplementSupport')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {showLinks && (
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">{t('left')}</Label>
                        <RadioGroup
                          value={boolToString(supplementschoringLinksEnabled)}
                          onValueChange={(v) => form.setValue("supplementschoringLinksEnabled", stringToBool(v))}
                        >
                          <div className="flex gap-4 mb-3">
                            {JA_NEE_OPTIES.map(opt => (
                              <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`supp-left-${opt.value}`} />
                                <Label htmlFor={`supp-left-${opt.value}`} className="font-normal cursor-pointer">
                                  {t(opt.label)}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {supplementschoringLinksEnabled && (
                          <Select value={form.watch("supplementschoringLinksType")} onValueChange={(v) => form.setValue("supplementschoringLinksType", v)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {SUPPLEMENT_TYPE_OPTIES.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{t(opt.label)}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    )}
                    {showRechts && (
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">{t('right')}</Label>
                        <RadioGroup
                          value={boolToString(supplementschoringRechtsEnabled)}
                          onValueChange={(v) => form.setValue("supplementschoringRechtsEnabled", stringToBool(v))}
                        >
                          <div className="flex gap-4 mb-3">
                            {JA_NEE_OPTIES.map(opt => (
                              <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`supp-right-${opt.value}`} />
                                <Label htmlFor={`supp-right-${opt.value}`} className="font-normal cursor-pointer">
                                  {t(opt.label)}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        {supplementschoringRechtsEnabled && (
                          <Select value={form.watch("supplementschoringRechtsType")} onValueChange={(v) => form.setValue("supplementschoringRechtsType", v)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {SUPPLEMENT_TYPE_OPTIES.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{t(opt.label)}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Sole Stiffening */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('soleStiffening')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={boolToString(zoolverstijvingEnabled)}
                    onValueChange={(v) => form.setValue("zoolverstijvingEnabled", stringToBool(v))}
                  >
                    <div className="flex gap-6">
                      {JA_NEE_OPTIES.map(opt => (
                        <div key={opt.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt.value} id={`stiff-${opt.value}`} />
                          <Label htmlFor={`stiff-${opt.value}`} className="font-normal cursor-pointer">
                            {t(opt.label)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  {zoolverstijvingEnabled && (
                    <div className="flex gap-6">
                      {showLinks && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="stiff-left"
                            checked={form.watch("zoolverstijvingLinks")}
                            onCheckedChange={(checked) => form.setValue("zoolverstijvingLinks", !!checked)}
                          />
                          <Label htmlFor="stiff-left" className="font-normal cursor-pointer">{t('left')}</Label>
                        </div>
                      )}
                      {showRechts && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="stiff-right"
                            checked={form.watch("zoolverstijvingRechts")}
                            onCheckedChange={(checked) => form.setValue("zoolverstijvingRechts", !!checked)}
                          />
                          <Label htmlFor="stiff-right" className="font-normal cursor-pointer">{t('right')}</Label>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Closure Type, Insert Point, Tongue Padding, Tongue Stitching */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('closureAndTongue')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>{t('closureType')}</Label>
                    <RadioGroup value={form.watch("sluitingType")} onValueChange={(v) => form.setValue("sluitingType", v)}>
                      <div className="grid grid-cols-2 gap-3">
                        {SLUITING_OPTIES.map(opt => (
                          <div key={opt.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={opt.value} id={`closure-${opt.value}`} />
                            <Label htmlFor={`closure-${opt.value}`} className="font-normal cursor-pointer text-sm">
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="insert-point">{t('insertPoint')}</Label>
                    <Input
                      id="insert-point"
                      value={form.watch("inschotpunt")}
                      onChange={(e) => form.setValue("inschotpunt", e.target.value)}
                      placeholder={t('insertPointPlaceholder')}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tongue-pad"
                        checked={form.watch("tongpolsterEnabled")}
                        onCheckedChange={(checked) => form.setValue("tongpolsterEnabled", !!checked)}
                      />
                      <Label htmlFor="tongue-pad" className="font-normal cursor-pointer">{t('tonguePadding')}</Label>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tongue-stitch"
                        checked={form.watch("tongVaststikkenEnabled")}
                        onCheckedChange={(checked) => form.setValue("tongVaststikkenEnabled", !!checked)}
                      />
                      <Label htmlFor="tongue-stitch" className="font-normal cursor-pointer">{t('tongueStitching')}</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Heel Type and Height */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('heelTypeAndHeight')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {showLinks && (
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold">{t('left')}</Label>
                        <div className="space-y-2">
                          <Label className="text-sm">{t('heelType')}</Label>
                          <RadioGroup value={form.watch("haksoortLinks")} onValueChange={(v) => form.setValue("haksoortLinks", v)}>
                            <div className="space-y-2">
                              {HAKSOORT_OPTIES.map(opt => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={opt.value} id={`heel-type-left-${opt.value}`} />
                                  <Label htmlFor={`heel-type-left-${opt.value}`} className="font-normal cursor-pointer text-sm">
                                    {opt.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="heel-height-left" className="text-sm">{t('heelHeight')}</Label>
                          <Input
                            id="heel-height-left"
                            type="number"
                            value={form.watch("hakhoogteLinks")}
                            onChange={(e) => form.setValue("hakhoogteLinks", e.target.value)}
                            placeholder="cm"
                          />
                        </div>
                      </div>
                    )}
                    {showRechts && (
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold">{t('right')}</Label>
                        <div className="space-y-2">
                          <Label className="text-sm">{t('heelType')}</Label>
                          <RadioGroup value={form.watch("haksoortRechts")} onValueChange={(v) => form.setValue("haksoortRechts", v)}>
                            <div className="space-y-2">
                              {HAKSOORT_OPTIES.map(opt => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={opt.value} id={`heel-type-right-${opt.value}`} />
                                  <Label htmlFor={`heel-type-right-${opt.value}`} className="font-normal cursor-pointer text-sm">
                                    {opt.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="heel-height-right" className="text-sm">{t('heelHeight')}</Label>
                          <Input
                            id="heel-height-right"
                            type="number"
                            value={form.watch("hakhoogteRechts")}
                            onChange={(e) => form.setValue("hakhoogteRechts", e.target.value)}
                            placeholder="cm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Heel Slant, Donkey Ear, Amputation - Consolidated */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('heelModifications')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Heel Slant */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">{t('heelSlant')}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {showLinks && (
                        <div className="space-y-3">
                          <Label className="text-sm">{t('left')}</Label>
                          <RadioGroup
                            value={boolToString(hakschoringLinksEnabled)}
                            onValueChange={(v) => form.setValue("hakschoringLinksEnabled", stringToBool(v))}
                          >
                            <div className="flex gap-4 mb-3">
                              {JA_NEE_OPTIES.map(opt => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={opt.value} id={`slant-left-${opt.value}`} />
                                  <Label htmlFor={`slant-left-${opt.value}`} className="font-normal cursor-pointer">
                                    {t(opt.label)}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                          {hakschoringLinksEnabled && (
                            <Select value={form.watch("hakschoringLinksType")} onValueChange={(v) => form.setValue("hakschoringLinksType", v)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {HAKSCHORING_TYPE_OPTIES.map(opt => (
                                  <SelectItem key={opt.value} value={opt.value}>{t(opt.label)}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      )}
                      {showRechts && (
                        <div className="space-y-3">
                          <Label className="text-sm">{t('right')}</Label>
                          <RadioGroup
                            value={boolToString(hakschoringRechtsEnabled)}
                            onValueChange={(v) => form.setValue("hakschoringRechtsEnabled", stringToBool(v))}
                          >
                            <div className="flex gap-4">
                              {JA_NEE_OPTIES.map(opt => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={opt.value} id={`slant-right-${opt.value}`} />
                                  <Label htmlFor={`slant-right-${opt.value}`} className="font-normal cursor-pointer">
                                    {t(opt.label)}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                          {hakschoringRechtsEnabled && (
                            <Select value={form.watch("hakschoringRechtsType")} onValueChange={(v) => form.setValue("hakschoringRechtsType", v)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {HAKSCHORING_TYPE_OPTIES.map(opt => (
                                  <SelectItem key={opt.value} value={opt.value}>{t(opt.label)}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Donkey Ear */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">{t('donkeyEar')}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {showLinks && (
                        <div className="space-y-3">
                          <Label className="text-sm">{t('left')}</Label>
                          <RadioGroup
                            value={boolToString(ezelsoorLinksEnabled)}
                            onValueChange={(v) => form.setValue("ezelsoorLinksEnabled", stringToBool(v))}
                          >
                            <div className="flex gap-4">
                              {JA_NEE_OPTIES.map(opt => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={opt.value} id={`donkey-left-${opt.value}`} />
                                  <Label htmlFor={`donkey-left-${opt.value}`} className="font-normal cursor-pointer">
                                    {t(opt.label)}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                          {ezelsoorLinksEnabled && (
                            <Select value={form.watch("ezelsoorLinksType")} onValueChange={(v) => form.setValue("ezelsoorLinksType", v)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {EZELSOOR_TYPE_OPTIES.map(opt => (
                                  <SelectItem key={opt.value} value={opt.value}>{t(opt.label)}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      )}
                      {showRechts && (
                        <div className="space-y-3">
                          <Label className="text-sm">{t('right')}</Label>
                          <RadioGroup
                            value={boolToString(ezelsoorRechtsEnabled)}
                            onValueChange={(v) => form.setValue("ezelsoorRechtsEnabled", stringToBool(v))}
                          >
                            <div className="flex gap-4">
                              {JA_NEE_OPTIES.map(opt => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={opt.value} id={`donkey-right-${opt.value}`} />
                                  <Label htmlFor={`donkey-right-${opt.value}`} className="font-normal cursor-pointer">
                                    {t(opt.label)}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                          {ezelsoorRechtsEnabled && (
                            <Select value={form.watch("ezelsoorRechtsType")} onValueChange={(v) => form.setValue("ezelsoorRechtsType", v)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {EZELSOOR_TYPE_OPTIES.map(opt => (
                                  <SelectItem key={opt.value} value={opt.value}>{t(opt.label)}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Amputation */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">{t('amputation')}</Label>
                    <div className="flex gap-6">
                      {showLinks && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="amp-left"
                            checked={form.watch("amputatieLinksEnabled")}
                            onCheckedChange={(checked) => form.setValue("amputatieLinksEnabled", !!checked)}
                          />
                          <Label htmlFor="amp-left" className="font-normal cursor-pointer">{t('left')}</Label>
                        </div>
                      )}
                      {showRechts && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="amp-right"
                            checked={form.watch("amputatieRechtsEnabled")}
                            onCheckedChange={(checked) => form.setValue("amputatieRechtsEnabled", !!checked)}
                          />
                          <Label htmlFor="amp-right" className="font-normal cursor-pointer">{t('right')}</Label>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Heel Rounding */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('heelRounding')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {showLinks && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="round-left"
                            checked={form.watch("hakafrondingLinksEnabled")}
                            onCheckedChange={(checked) => form.setValue("hakafrondingLinksEnabled", !!checked)}
                          />
                          <Label htmlFor="round-left" className="font-normal cursor-pointer">{t('left')}</Label>
                        </div>
                        {hakafrondingLinksEnabled && (
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor="round-left-height" className="text-sm">{t('height')} (mm)</Label>
                              <Input
                                id="round-left-height"
                                type="number"
                                value={form.watch("hakafrondingLinksHoogte")}
                                onChange={(e) => form.setValue("hakafrondingLinksHoogte", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="round-left-length" className="text-sm">{t('length')} (mm)</Label>
                              <Input
                                id="round-left-length"
                                type="number"
                                value={form.watch("hakafrondingLinksLengte")}
                                onChange={(e) => form.setValue("hakafrondingLinksLengte", e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {showRechts && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="round-right"
                            checked={form.watch("hakafrondingRechtsEnabled")}
                            onCheckedChange={(checked) => form.setValue("hakafrondingRechtsEnabled", !!checked)}
                          />
                          <Label htmlFor="round-right" className="font-normal cursor-pointer">{t('right')}</Label>
                        </div>
                        {hakafrondingRechtsEnabled && (
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor="round-right-height" className="text-sm">{t('height')} (mm)</Label>
                              <Input
                                id="round-right-height"
                                type="number"
                                value={form.watch("hakafrondingRechtsHoogte")}
                                onChange={(e) => form.setValue("hakafrondingRechtsHoogte", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="round-right-length" className="text-sm">{t('length')} (mm)</Label>
                              <Input
                                id="round-right-length"
                                type="number"
                                value={form.watch("hakafrondingRechtsLengte")}
                                onChange={(e) => form.setValue("hakafrondingRechtsLengte", e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Walking Sole */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('walkingSole')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={form.watch("loopzoolType")} onValueChange={(v) => form.setValue("loopzoolType", v)}>
                    <div className="grid grid-cols-2 gap-3">
                      {LOOPZOOL_OPTIES.map(opt => (
                        <div key={opt.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={opt.value} id={`sole-${opt.value}`} />
                          <Label htmlFor={`sole-${opt.value}`} className="font-normal cursor-pointer text-sm">
                            {opt.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Digitaal Section - New */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('digital')}</CardTitle>
                  <CardDescription>{t('digitalDescription')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Digitaal Ja/Nee */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t('digital')}</Label>
                    <RadioGroup
                      value={boolToString(digitalEnabled)}
                      onValueChange={(v) => form.setValue("digitalEnabled", stringToBool(v))}
                    >
                      <div className="flex gap-6">
                        {JA_NEE_OPTIES.map(opt => (
                          <div key={opt.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={opt.value} id={`digital-${opt.value}`} />
                            <Label htmlFor={`digital-${opt.value}`} className="font-normal cursor-pointer">
                              {t(opt.label)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Conditional fields when Digital = Ja */}
                  {digitalEnabled && (
                    <>
                      <Separator />

                      {/* Hielheffing L/R */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{t('heelLift')}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {showLinks && (
                            <div className="space-y-2">
                              <Label htmlFor="heel-lift-left">{t('left')} (mm)</Label>
                              <Input
                                id="heel-lift-left"
                                type="number"
                                placeholder="mm"
                                value={form.watch("heelLiftLeft")}
                                onChange={(e) => form.setValue("heelLiftLeft", e.target.value)}
                              />
                            </div>
                          )}
                          {showRechts && (
                            <div className="space-y-2">
                              <Label htmlFor="heel-lift-right">{t('right')} (mm)</Label>
                              <Input
                                id="heel-lift-right"
                                type="number"
                                placeholder="mm"
                                value={form.watch("heelLiftRight")}
                                onChange={(e) => form.setValue("heelLiftRight", e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      {/* Leesthoogte */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{t('readingHeight')}</Label>
                        <RadioGroup
                          value={form.watch("readingHeight")}
                          onValueChange={(v) => form.setValue("readingHeight", v)}
                        >
                          <div className="flex flex-wrap gap-4">
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
                      </div>

                      <Separator />

                      {/* MTP1 diep? L/R */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{t('mtp1Deep')}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {showLinks && (
                            <div className="space-y-2">
                              <Label htmlFor="mtp1-left">{t('left')}</Label>
                              <Select
                                value={form.watch("mtp1DeepLeft")}
                                onValueChange={(v) => form.setValue("mtp1DeepLeft", v)}
                              >
                                <SelectTrigger id="mtp1-left">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {MTP1_DIEP_OPTIES.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          {showRechts && (
                            <div className="space-y-2">
                              <Label htmlFor="mtp1-right">{t('right')}</Label>
                              <Select
                                value={form.watch("mtp1DeepRight")}
                                onValueChange={(v) => form.setValue("mtp1DeepRight", v)}
                              >
                                <SelectTrigger id="mtp1-right">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {MTP1_DIEP_OPTIES.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      {/* Klauwtenen? Ja/Nee */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{t('clawToes')}</Label>
                        <RadioGroup
                          value={boolToString(form.watch("clawToesEnabled"))}
                          onValueChange={(v) => form.setValue("clawToesEnabled", stringToBool(v))}
                        >
                          <div className="flex gap-6">
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
                      </div>

                      <Separator />

                      {/* Gescand met folie? Ja/Nee */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">{t('scannedWithFoil')}</Label>
                        <RadioGroup
                          value={boolToString(form.watch("scannedWithFoil"))}
                          onValueChange={(v) => form.setValue("scannedWithFoil", stringToBool(v))}
                        >
                          <div className="flex gap-6">
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
                      </div>

                      <Separator />

                      {/* Instructies */}
                      <div className="space-y-2">
                        <Label htmlFor="digital-instructions" className="text-base font-semibold">{t('instructions')}</Label>
                        <Textarea
                          id="digital-instructions"
                          placeholder={t('instructionsPlaceholder')}
                          value={form.watch("digitalInstructions")}
                          onChange={(e) => form.setValue("digitalInstructions", e.target.value)}
                          rows={3}
                          className="resize-none"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Special Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('specialNotes')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={t('specialNotesPlaceholder')}
                    value={form.watch("bijzonderheden")}
                    onChange={(e) => form.setValue("bijzonderheden", e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              {/* Submit Section */}
              <FormFooter>
                <Button type="button" variant="outline" onClick={() => router.back()}>
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
