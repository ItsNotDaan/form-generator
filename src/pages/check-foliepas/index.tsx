import React from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import {
  OMSLUITING_OPTIES,
  OmsluitingOptie,
  OPENSTAND_OPTIES,
  SUPPLEMENT_TYPE_OPTIES,
  JA_NEE_OPTIES,
  SLUITING_OPTIES,
  HAKSOORT_OPTIES,
  HAKSCHORING_TYPE_OPTIES,
  EZELSOOR_TYPE_OPTIES,
  LOOPZOOL_OPTIES,
} from '@/lib/constants/formConstants';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setCheckFoliepasData, setClientData } from '@/domain/store/slices/formData';

import { ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
} from '@/components/ui/form';
import { scrollToFirstError } from '@/utils/formHelpers';
import { Textarea } from '@/components/ui/textarea';

const FormCheckFoliepasPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    side: z.enum(['left', 'right', 'both'] as const),
    readingCorrectionAfterFoilFit: z.string().optional(),
    readingCorrectionAfterLiningShoe: z.string().optional(),
    omsluitingLinks: z.record(z.string(), z.boolean()),
    omsluitingRechts: z.record(z.string(), z.boolean()),
    omsluitingLinksMm: z.record(z.string(), z.string()),
    omsluitingRechtsMm: z.record(z.string(), z.string()),
    // Moved from OSA
    legLengthDifferenceLeft: z.string().optional(),
    legLengthDifferenceRight: z.string().optional(),
    openstandSchacht: z.string().optional(),
    supplementschoringLinksEnabled: z.boolean(),
    supplementschoringRechtsEnabled: z.boolean(),
    supplementschoringLinksType: z.string().optional(),
    supplementschoringRechtsType: z.string().optional(),
    zoolverstijvingEnabled: z.boolean(),
    zoolverstijvingLinks: z.boolean().optional(),
    zoolverstijvingRechts: z.boolean().optional(),
    sluitingType: z.string().optional(),
    inschotpunt: z.string().optional(),
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
    hakafrondingLinksEnabled: z.boolean(),
    hakafrondingRechtsEnabled: z.boolean(),
    hakafrondingLinksHoogte: z.string().optional(),
    hakafrondingLinksLengte: z.string().optional(),
    hakafrondingRechtsHoogte: z.string().optional(),
    hakafrondingRechtsLengte: z.string().optional(),
    loopzoolType: z.string().optional(),
    // New fields for Kleur en Model section
    showColorAndModel: z.boolean(),
    modelType: z.enum(['asPhoto', 'model'] as const).optional(),
    modelText: z.string().optional(),
    colorOptions: z.array(z.string()).optional(),
    // Tong polsteren en polsterkraag
    tonguePaddingMm: z.enum(['3', '5', ''] as const).optional(),
    paddingCollarMm: z.enum(['3', '5', ''] as const).optional(),
    // Sluiting
    closureType: z.enum(['velcro', 'ringsHooks'] as const).optional(),
    ringsNr: z.string().optional(),
    ringsAmount: z.string().optional(),
    hooksNr: z.string().optional(),
    hooksAmount: z.string().optional(),
    // Rits
    zipperType: z.enum(['none', 'functionalNylon', 'decorativeNylon'] as const).optional(),
    zipperMedial: z.boolean().optional(),
    zipperLateral: z.boolean().optional(),
    // Bijzonderheden
    specialMedialVelcro: z.boolean().optional(),
    specialLaceLoop: z.boolean().optional(),
    specialExtraLeather: z.boolean().optional(),
    specialOther: z.string().optional(),
    // Randtype
    edgeType: z.string().optional(),
    edgeColor: z.string().optional(),
    // Zooltype
    soleType: z.enum(['gumlite', 'leather', 'antiSlip'] as const).optional(),
    gumliteNumber: z.string().optional(),
    // Koolstofverstijving
    carbonStiffeningType: z.enum(['none', 'prefab', 'custom'] as const).optional(),
    carbonStiffeningLeft: z.boolean().optional(),
    carbonStiffeningRight: z.boolean().optional(),
    // Neusopties
    toeOptionsType: z.enum(['none', 'carbon', 'rubberCrawl'] as const).optional(),
    // Contrefort
    counterfortType: z.enum(['formo', 'other'] as const).optional(),
    counterfortOther: z.string().optional(),
    // Binnenzool
    insoleType: z.enum(['leather', 'other'] as const).optional(),
    insoleOther: z.string().optional(),
    // Zoolkantuitpoetsen
    soleEdgePolishType: z.enum(['none', 'black', 'brown', 'mahogany', 'ridges', 'other'] as const).optional(),
    soleEdgePolishOther: z.string().optional(),
    // Maakwijze
    constructionMethodType: z.enum(['glued', 'flexible', 'other'] as const).optional(),
    constructionMethodOther: z.string().optional(),
    // Hakmodel
    heelModelType: z.enum(['buildUp', 'wedge', 'block'] as const).optional(),
    heelBuildUpMaterial: z.enum(['poro', 'leather'] as const).optional(),
    heelWedgeType: z.enum(['hollow', 'flat'] as const).optional(),
    heelBlockCoreCoating: z.boolean().optional(),
    // Hakhoogte already exists but I'll keep for reference
    // Hakafronding already exists but I'll keep for reference
    // Schoring
    shoringLeftType: z.enum(['lateral', 'medial', ''] as const).optional(),
    shoringLeftMm: z.string().optional(),
    shoringRightType: z.enum(['lateral', 'medial', ''] as const).optional(),
    shoringRightMm: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      side: 'both',
      readingCorrectionAfterFoilFit: '',
      readingCorrectionAfterLiningShoe: '',
      omsluitingLinks: { omsluitingLinksMultivorm: true },
      omsluitingRechts: { omsluitingRechtsMultivorm: true },
      omsluitingLinksMm: { omsluitingMmLinksMultivorm: '3' },
      omsluitingRechtsMm: { omsluitingMmRechtsMultivorm: '3' },
      // Defaults for moved fields
      legLengthDifferenceLeft: '',
      legLengthDifferenceRight: '',
      openstandSchacht: OPENSTAND_OPTIES[2]?.value || '',
      supplementschoringLinksEnabled: false,
      supplementschoringRechtsEnabled: false,
      supplementschoringLinksType: 'Lateraal',
      supplementschoringRechtsType: 'Lateraal',
      zoolverstijvingEnabled: false,
      zoolverstijvingLinks: false,
      zoolverstijvingRechts: false,
      sluitingType: SLUITING_OPTIES[0]?.value || '',
      inschotpunt: '',
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
      hakafrondingLinksEnabled: true,
      hakafrondingRechtsEnabled: true,
      hakafrondingLinksHoogte: '10',
      hakafrondingLinksLengte: '50',
      hakafrondingRechtsHoogte: '10',
      hakafrondingRechtsLengte: '50',
      loopzoolType: LOOPZOOL_OPTIES[0]?.value || '',
      // New field defaults
      showColorAndModel: true,
      modelType: 'model',
      modelText: '',
      colorOptions: [''],
      tonguePaddingMm: '',
      paddingCollarMm: '',
      closureType: 'velcro',
      ringsNr: '',
      ringsAmount: '',
      hooksNr: '',
      hooksAmount: '',
      zipperType: 'none',
      zipperMedial: false,
      zipperLateral: false,
      specialMedialVelcro: false,
      specialLaceLoop: false,
      specialExtraLeather: false,
      specialOther: '',
      edgeType: '',
      edgeColor: '',
      soleType: 'gumlite',
      gumliteNumber: '2644',
      carbonStiffeningType: 'none',
      carbonStiffeningLeft: false,
      carbonStiffeningRight: false,
      toeOptionsType: 'none',
      counterfortType: 'formo',
      counterfortOther: '',
      insoleType: 'leather',
      insoleOther: '',
      soleEdgePolishType: 'none',
      soleEdgePolishOther: '',
      constructionMethodType: 'glued',
      constructionMethodOther: '',
      heelModelType: 'buildUp',
      heelBuildUpMaterial: 'poro',
      heelWedgeType: 'flat',
      heelBlockCoreCoating: false,
      shoringLeftType: '',
      shoringLeftMm: '',
      shoringRightType: '',
      shoringRightMm: '',
    },
  });

  const side = form.watch('side');
  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';
  
  // Watch for conditional visibility
  const showColorAndModel = form.watch('showColorAndModel');
  const modelType = form.watch('modelType');
  const colorOptions = form.watch('colorOptions') || [''];
  const closureType = form.watch('closureType');
  const zipperType = form.watch('zipperType');
  const soleType = form.watch('soleType');
  const carbonStiffeningType = form.watch('carbonStiffeningType');
  const counterfortType = form.watch('counterfortType');
  const insoleType = form.watch('insoleType');
  const soleEdgePolishType = form.watch('soleEdgePolishType');
  const constructionMethodType = form.watch('constructionMethodType');
  const heelModelType = form.watch('heelModelType');

  const onSubmit = (data: FormData) => {
    dispatch(
      setCheckFoliepasData({
        side: data.side,
        readingCorrectionAfterFoilFit: data.readingCorrectionAfterFoilFit || '',
        readingCorrectionAfterLiningShoe: data.readingCorrectionAfterLiningShoe || '',
        omsluitingLinks: data.omsluitingLinks as Record<string, boolean>,
        omsluitingRechts: data.omsluitingRechts as Record<string, boolean>,
        omsluitingLinksMm: data.omsluitingLinksMm as Record<string, string>,
        omsluitingRechtsMm: data.omsluitingRechtsMm as Record<string, string>,
        // Moved fields
        legLengthDifferenceLeft: data.legLengthDifferenceLeft || '',
        legLengthDifferenceRight: data.legLengthDifferenceRight || '',
        openstandSchacht: data.openstandSchacht || '',
        supplementschoringLinksEnabled: data.supplementschoringLinksEnabled,
        supplementschoringRechtsEnabled: data.supplementschoringRechtsEnabled,
        supplementschoringLinksType: data.supplementschoringLinksType || '',
        supplementschoringRechtsType: data.supplementschoringRechtsType || '',
        zoolverstijvingEnabled: data.zoolverstijvingEnabled,
        zoolverstijvingLinks: data.zoolverstijvingLinks,
        zoolverstijvingRechts: data.zoolverstijvingRechts,
        sluitingType: data.sluitingType || '',
        inschotpunt: data.inschotpunt || '',
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
        hakafrondingLinksEnabled: data.hakafrondingLinksEnabled,
        hakafrondingRechtsEnabled: data.hakafrondingRechtsEnabled,
        hakafrondingLinksHoogte: data.hakafrondingLinksHoogte || '',
        hakafrondingLinksLengte: data.hakafrondingLinksLengte || '',
        hakafrondingRechtsHoogte: data.hakafrondingRechtsHoogte || '',
        hakafrondingRechtsLengte: data.hakafrondingRechtsLengte || '',
        loopzoolType: data.loopzoolType || '',
        // New fields
        showColorAndModel: data.showColorAndModel,
        modelType: data.modelType || '',
        modelText: data.modelText || '',
        colorOptions: data.colorOptions || [],
        tonguePaddingMm: data.tonguePaddingMm || '',
        paddingCollarMm: data.paddingCollarMm || '',
        closureType: data.closureType || '',
        ringsNr: data.ringsNr || '',
        ringsAmount: data.ringsAmount || '',
        hooksNr: data.hooksNr || '',
        hooksAmount: data.hooksAmount || '',
        zipperType: data.zipperType || '',
        zipperMedial: data.zipperMedial || false,
        zipperLateral: data.zipperLateral || false,
        specialMedialVelcro: data.specialMedialVelcro || false,
        specialLaceLoop: data.specialLaceLoop || false,
        specialExtraLeather: data.specialExtraLeather || false,
        specialOther: data.specialOther || '',
        edgeType: data.edgeType || '',
        edgeColor: data.edgeColor || '',
        soleType: data.soleType || '',
        gumliteNumber: data.gumliteNumber || '',
        carbonStiffeningType: data.carbonStiffeningType || '',
        carbonStiffeningLeft: data.carbonStiffeningLeft || false,
        carbonStiffeningRight: data.carbonStiffeningRight || false,
        toeOptionsType: data.toeOptionsType || '',
        counterfortType: data.counterfortType || '',
        counterfortOther: data.counterfortOther || '',
        insoleType: data.insoleType || '',
        insoleOther: data.insoleOther || '',
        soleEdgePolishType: data.soleEdgePolishType || '',
        soleEdgePolishOther: data.soleEdgePolishOther || '',
        constructionMethodType: data.constructionMethodType || '',
        constructionMethodOther: data.constructionMethodOther || '',
        heelModelType: data.heelModelType || '',
        heelBuildUpMaterial: data.heelBuildUpMaterial || '',
        heelWedgeType: data.heelWedgeType || '',
        heelBlockCoreCoating: data.heelBlockCoreCoating || false,
        shoringLeftType: data.shoringLeftType || '',
        shoringLeftMm: data.shoringLeftMm || '',
        shoringRightType: data.shoringRightType || '',
        shoringRightMm: data.shoringRightMm || '',
      })
    );

    router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('checkFoliepas')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">{t('checkFoliepas')}</h1>
          <p className="text-lg text-muted-foreground">{t('checkFoliepasDescription')}</p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* Side Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('side')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={side} onValueChange={(v) => form.setValue("side", v as 'left' | 'right' | 'both')}>
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


              {/* Reading Corrections after Foil Fit */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('readingCorrectionAfterFoilFit')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    id="reading-correction-foil-fit"
                    rows={4}
                    placeholder={t('readingCorrectionAfterFoilFit')}
                    value={form.watch("readingCorrectionAfterFoilFit")}
                    onChange={(e) => form.setValue("readingCorrectionAfterFoilFit", e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Reading Correction After Lining Shoe */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('readingCorrectionAfterLiningShoe')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    id="reading-correction-lining-shoe"
                    rows={4}
                    placeholder={t('readingCorrectionAfterLiningShoe')}
                    value={form.watch("readingCorrectionAfterLiningShoe")}
                    onChange={(e) => form.setValue("readingCorrectionAfterLiningShoe", e.target.value)}
                  />
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
                      <div className='flex flex-col gap-2'>
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
                      <div className='flex flex-col gap-2'>
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

              {/* ----------------------------------------------- */}

              {/* Alles hieronder is een Card met de translated naam: Kleur en Model: 
              LAAT ALLE COMMENTS STAAN VOOR CONTROLE.
              Kleur/Model (Ja/Nee) (Radio) 
              Als ja laat hieronder alles zien
              als nee verberg alles hieronder.
              
              */}

              {/* Kleur en Model - Main toggle */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('colorAndModel')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={showColorAndModel ? 'ja' : 'nee'} 
                    onValueChange={(v) => form.setValue('showColorAndModel', v === 'ja')}
                  >
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ja" id="color-model-yes" />
                        <Label htmlFor="color-model-yes" className="font-normal cursor-pointer">{t('yes')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nee" id="color-model-no" />
                        <Label htmlFor="color-model-no" className="font-normal cursor-pointer">{t('no')}</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {showColorAndModel && (
                <>
                  {/* !Model (Verplicht)
                  Opties radio: (Radio) 
                  Als foto 
                  of 
                  Model -> (textarea) (Standaard)
                  
                  Output naar form-results in engels: finalModelShoe
                  Voorbeeld: Model: (textarea).
                  Als (Als foto) is gekozen, dan alleen dat tonen.
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('finalModel')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup 
                        value={modelType || 'model'} 
                        onValueChange={(v) => form.setValue('modelType', v as 'asPhoto' | 'model')}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="asPhoto" id="model-photo" />
                            <Label htmlFor="model-photo" className="font-normal cursor-pointer">{t('asPhoto')}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="model" id="model-text" />
                            <Label htmlFor="model-text" className="font-normal cursor-pointer">{t('model')}</Label>
                          </div>
                        </div>
                      </RadioGroup>
                      {modelType === 'model' && (
                        <Textarea
                          placeholder={t('modelPlaceholder')}
                          value={form.watch('modelText') || ''}
                          onChange={(e) => form.setValue('modelText', e.target.value)}
                          rows={3}
                        />
                      )}
                    </CardContent>
                  </Card>

                  {/* !Kleuren (Verplicht)
                  Optie 1: (Textarea)
                  Optie 2: (Textarea)
                  Optie 3: (Textarea)
                  Hier moet een plusje of minnetje komen om opties toe te voegen of te verwijderen.

                  Output naar form-results in engels: finalColorOptionsShoe
                  Voorbeeld: 1: (textarea1) + 2: (textarea2) + 3: (textarea3). 
                  Alleen de gekozen opties toevoegen met een + ertussen als er nog een optie is toegevoegd.
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('colors')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {colorOptions.map((color, index) => (
                        <div key={index} className="flex gap-2">
                          <Textarea
                            placeholder={`${t('colorOption')} ${index + 1}`}
                            value={color}
                            onChange={(e) => {
                              const colors = [...colorOptions];
                              colors[index] = e.target.value;
                              form.setValue('colorOptions', colors);
                            }}
                            rows={2}
                            className="flex-1"
                          />
                          {colorOptions.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const colors = [...colorOptions];
                                colors.splice(index, 1);
                                form.setValue('colorOptions', colors);
                              }}
                            >
                              {t('removeColorOption')}
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const colors = [...colorOptions, ''];
                          form.setValue('colorOptions', colors);
                        }}
                      >
                        + {t('addColorOption')}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* !Tong polsteren en polsterkraag:
                  Tong polsteren: 3 of 5 mm (Radio)
                  Polsterkraag: 3 of 5 mm (Radio) 
                  
                  Output naar form-results in engels: paddingTongueMmShoe, paddingCollarMmShoe
                  Voorbeeld: 3 mm, 5 mm

                  Deze zijn los van elkaar. Gewoon naaste elkaar tonen.
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('tonguePaddingAndCollar')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">{t('tonguePadding')}</Label>
                          <RadioGroup 
                            value={form.watch('tonguePaddingMm') || ''} 
                            onValueChange={(v) => form.setValue('tonguePaddingMm', v as '3' | '5' | '')}
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="3" id="tongue-3mm" />
                                <Label htmlFor="tongue-3mm" className="font-normal cursor-pointer">{t('mm3')}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="5" id="tongue-5mm" />
                                <Label htmlFor="tongue-5mm" className="font-normal cursor-pointer">{t('mm5')}</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">{t('paddingCollar')}</Label>
                          <RadioGroup 
                            value={form.watch('paddingCollarMm') || ''} 
                            onValueChange={(v) => form.setValue('paddingCollarMm', v as '3' | '5' | '')}
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="3" id="collar-3mm" />
                                <Label htmlFor="collar-3mm" className="font-normal cursor-pointer">{t('mm3')}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="5" id="collar-5mm" />
                                <Label htmlFor="collar-5mm" className="font-normal cursor-pointer">{t('mm5')}</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* !Sluiting: (Verplicht)
                    (Radio)
                   Klitteband met rolpassant (extra lang)
                   Of
                   Ringen nr: (Textarea) + Aantal: (Textarea)
                   Haken nr: (Textarea) + Aantal: (Textarea)

                   Output naar form-results in engels: closureTypeDetailsShoe
                   Voorbeeld: Klitteband met rolpassant (extra lang), Ringen nr: (textarea) Aantal: (textarea) + Haken nr: (textarea) Aantal: (textarea)
                   Alleen de gekozen opties toevoegen. het is of klitteband, of ringen/haken. Ringen/haken kunnen samen zijn. Als ze zijn ingevuld. moeten ze erbij met een + ertussen.
                   */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('closure')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup 
                        value={closureType || 'velcro'} 
                        onValueChange={(v) => form.setValue('closureType', v as 'velcro' | 'ringsHooks')}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="velcro" id="closure-velcro" />
                            <Label htmlFor="closure-velcro" className="font-normal cursor-pointer">
                              {t('velcroWithExtraLongRolPassant')}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ringsHooks" id="closure-rings" />
                            <Label htmlFor="closure-rings" className="font-normal cursor-pointer">
                              {t('ringsAndHooks')}
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                      {closureType === 'ringsHooks' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                          <div className="space-y-2">
                            <Label htmlFor="rings-nr">{t('ringsNr')}</Label>
                            <Input
                              id="rings-nr"
                              value={form.watch('ringsNr') || ''}
                              onChange={(e) => form.setValue('ringsNr', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rings-amount">{t('ringsAmount')}</Label>
                            <Input
                              id="rings-amount"
                              type="number"
                              value={form.watch('ringsAmount') || ''}
                              onChange={(e) => form.setValue('ringsAmount', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hooks-nr">{t('hooksNr')}</Label>
                            <Input
                              id="hooks-nr"
                              value={form.watch('hooksNr') || ''}
                              onChange={(e) => form.setValue('hooksNr', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hooks-amount">{t('hooksAmount')}</Label>
                            <Input
                              id="hooks-amount"
                              type="number"
                              value={form.watch('hooksAmount') || ''}
                              onChange={(e) => form.setValue('hooksAmount', e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* !Rits 
                    (Select component)
                    Geen Rits (Standaard)
                    Functioneel Nylon (Checkbox met Mediaal en/of Lateraal)
                    Decoratief Nylon (Checkbox met Mediaal en/of Lateraal)

                    Output naar form-results in engels: zipperDetailsShoe
                    Voorbeeld: Functioneel Nylon Mediaal + Lateraal, Decoratief Nylon Lateraal
                    Alleen de gekozen optie toevoegen.            
                   */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('zipper')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select 
                        value={zipperType || 'none'} 
                        onValueChange={(v) => form.setValue('zipperType', v as 'none' | 'functionalNylon' | 'decorativeNylon')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('zipper')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">{t('noZipper')}</SelectItem>
                          <SelectItem value="functionalNylon">{t('functionalNylon')}</SelectItem>
                          <SelectItem value="decorativeNylon">{t('decorativeNylon')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {zipperType && zipperType !== 'none' && (
                        <div className="flex gap-6 pt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="zipper-medial"
                              checked={form.watch('zipperMedial') || false}
                              onCheckedChange={(checked) => form.setValue('zipperMedial', !!checked)}
                            />
                            <Label htmlFor="zipper-medial" className="font-normal cursor-pointer">
                              {t('medial')}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="zipper-lateral"
                              checked={form.watch('zipperLateral') || false}
                              onCheckedChange={(checked) => form.setValue('zipperLateral', !!checked)}
                            />
                            <Label htmlFor="zipper-lateral" className="font-normal cursor-pointer">
                              {t('lateral')}
                            </Label>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* !Bijzonderheden:
                   (Checkbox) 
                    Mediaal klittenband tongen
                    Veterlus op de tong
                    Extra leer meeleveren i.v.m bekleden supplementen
                    Anders: (Textarea)

                    Output naar form-results in engels: specialDetailsShoe
                    Voorbeeld: Mediaal klittenband tongen + Veterlus op de tong, Veterlus op de tong
                    Alleen de gekozen opties toevoegen met een + ertussen als er meer dan 1 is.
                   */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('specialDetails')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="special-medial-velcro"
                          checked={form.watch('specialMedialVelcro') || false}
                          onCheckedChange={(checked) => form.setValue('specialMedialVelcro', !!checked)}
                        />
                        <Label htmlFor="special-medial-velcro" className="font-normal cursor-pointer">
                          {t('medialVelcroTongue')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="special-lace-loop"
                          checked={form.watch('specialLaceLoop') || false}
                          onCheckedChange={(checked) => form.setValue('specialLaceLoop', !!checked)}
                        />
                        <Label htmlFor="special-lace-loop" className="font-normal cursor-pointer">
                          {t('laceLoopOnTongue')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="special-extra-leather"
                          checked={form.watch('specialExtraLeather') || false}
                          onCheckedChange={(checked) => form.setValue('specialExtraLeather', !!checked)}
                        />
                        <Label htmlFor="special-extra-leather" className="font-normal cursor-pointer">
                          {t('extraLeatherForSupplements')}
                        </Label>
                      </div>
                      <div className="space-y-2 pt-2">
                        <Label htmlFor="special-other">{t('other')}</Label>
                        <Textarea
                          id="special-other"
                          placeholder={t('otherPlaceholder')}
                          value={form.watch('specialOther') || ''}
                          onChange={(e) => form.setValue('specialOther', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* !Randtype (Verplicht)
                    Rand type: (Textarea) en Kleur: (Textarea)
                   
                    Output naar form-results in engels: edgeTypeDetailsShoe
                    Voorbeeld: Rand type: (textarea) + Kleur: (textarea)
                   
                   */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('edgeType')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edge-type">{t('edgeTypeLabel')}</Label>
                          <Textarea
                            id="edge-type"
                            value={form.watch('edgeType') || ''}
                            onChange={(e) => form.setValue('edgeType', e.target.value)}
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edge-color">{t('edgeColor')}</Label>
                          <Textarea
                            id="edge-color"
                            value={form.watch('edgeColor') || ''}
                            onChange={(e) => form.setValue('edgeColor', e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* !Zooltype (Verplicht)
                   (Select component))
                   Gumlite: (Textarea) (Standaard met "2644")
                   Leer
                   Antislip

                    Output naar form-results in engels: soleTypeDetailsShoe
                    Voorbeeld: Gumlite: (textarea), Leer, Antislip
                    Alleen de gekozen opties toevoegen. Kan er maar 1 zijn.
                   */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('soleType')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select 
                        value={soleType || 'gumlite'} 
                        onValueChange={(v) => form.setValue('soleType', v as 'gumlite' | 'leather' | 'antiSlip')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('soleType')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gumlite">{t('gumlite')}</SelectItem>
                          <SelectItem value="leather">{t('leather')}</SelectItem>
                          <SelectItem value="antiSlip">{t('antiSlip')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {soleType === 'gumlite' && (
                        <div className="space-y-2">
                          <Label htmlFor="gumlite-number">{t('gumliteNumber')}</Label>
                          <Input
                            id="gumlite-number"
                            value={form.watch('gumliteNumber') || ''}
                            onChange={(e) => form.setValue('gumliteNumber', e.target.value)}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Koolstofverstijving: 
                   (Select component)
                    Nee (Standaard)
                    Prefab -> dan Links (Checkbox) Rechts (Checkbox)
                    Maatwerk -> dan Links (Checkbox) Rechts (Checkbox)

                    Output naar form-results in engels: carbonStiffeningDetailsShoe
                    Voorbeeld: Prefab Links + Rechts, Maatwerk Rechts
                    Alleen de gekozen opties toevoegen met een + ertussen als er meer dan 1 is.
                   
                   */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('carbonStiffening')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select 
                        value={carbonStiffeningType || 'none'} 
                        onValueChange={(v) => form.setValue('carbonStiffeningType', v as 'none' | 'prefab' | 'custom')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('carbonStiffening')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">{t('none')}</SelectItem>
                          <SelectItem value="prefab">{t('prefab')}</SelectItem>
                          <SelectItem value="custom">{t('custom')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {carbonStiffeningType && carbonStiffeningType !== 'none' && (
                        <div className="flex gap-6 pt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="carbon-left"
                              checked={form.watch('carbonStiffeningLeft') || false}
                              onCheckedChange={(checked) => form.setValue('carbonStiffeningLeft', !!checked)}
                            />
                            <Label htmlFor="carbon-left" className="font-normal cursor-pointer">
                              {t('left')}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="carbon-right"
                              checked={form.watch('carbonStiffeningRight') || false}
                              onCheckedChange={(checked) => form.setValue('carbonStiffeningRight', !!checked)}
                            />
                            <Label htmlFor="carbon-right" className="font-normal cursor-pointer">
                              {t('right')}
                            </Label>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Neusopties:
                   (Select component)
                   Nee (Standaard)
                   Koolstofneuzen
                   Rubberenkruipneuzen

                    Output naar form-results in engels: toeOptionsDetailsShoe
                    Voorbeeld: Koolstofneuzen, Rubberenkruipneuzen
                   
                   */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('toeOptions')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select 
                        value={form.watch('toeOptionsType') || 'none'} 
                        onValueChange={(v) => form.setValue('toeOptionsType', v as 'none' | 'carbon' | 'rubberCrawl')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('toeOptions')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">{t('none')}</SelectItem>
                          <SelectItem value="carbon">{t('carbonToes')}</SelectItem>
                          <SelectItem value="rubberCrawl">{t('rubberCrawlToes')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Contrefort:
                    (Select component)
                    Formo (Standaard)
                    Anders: (Textarea)

                    Output naar form-results in engels: counterfortDetailsShoe
                    Voorbeeld: Formo, (textarea)

                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('counterfort')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select 
                        value={counterfortType || 'formo'} 
                        onValueChange={(v) => form.setValue('counterfortType', v as 'formo' | 'other')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('counterfort')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formo">{t('formo')}</SelectItem>
                          <SelectItem value="other">{t('other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {counterfortType === 'other' && (
                        <Textarea
                          placeholder={t('otherPlaceholder')}
                          value={form.watch('counterfortOther') || ''}
                          onChange={(e) => form.setValue('counterfortOther', e.target.value)}
                          rows={2}
                        />
                      )}
                    </CardContent>
                  </Card>

                  {/* Binnenzool:
                  (Select component)
                  Leer (Standaard)
                  Anders: (Textarea)

                  Output naar form-results in engels: insoleDetailsShoe
                  Voorbeeld: Leer, (textarea)
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('insole')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select 
                        value={insoleType || 'leather'} 
                        onValueChange={(v) => form.setValue('insoleType', v as 'leather' | 'other')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('insole')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leather">{t('leather')}</SelectItem>
                          <SelectItem value="other">{t('other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {insoleType === 'other' && (
                        <Textarea
                          placeholder={t('otherPlaceholder')}
                          value={form.watch('insoleOther') || ''}
                          onChange={(e) => form.setValue('insoleOther', e.target.value)}
                          rows={2}
                        />
                      )}
                    </CardContent>
                  </Card>

                  {/* Zoolkantuitpoetsen:
                  (Select component)
                  Nee (Standaard)
                  Zwart
                  Bruin
                  Mahonie
                  Zoolkant ribbels frezen
                  Anders: (Textarea)

                  Output naar form-results in engels: soleEdgePolishDetailsShoe
                  Voorbeeld: Zwart, Bruin, Mahonie, Zoolkant ribbels frezen, (textarea)
                  Alleen de gekozen opties toevoegen.
                  
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('soleEdgePolish')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select 
                        value={soleEdgePolishType || 'none'} 
                        onValueChange={(v) => form.setValue('soleEdgePolishType', v as 'none' | 'black' | 'brown' | 'mahogany' | 'ridges' | 'other')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('soleEdgePolish')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">{t('none')}</SelectItem>
                          <SelectItem value="black">{t('black')}</SelectItem>
                          <SelectItem value="brown">{t('brown')}</SelectItem>
                          <SelectItem value="mahogany">{t('mahogany')}</SelectItem>
                          <SelectItem value="ridges">{t('soleEdgeRidgesMilling')}</SelectItem>
                          <SelectItem value="other">{t('other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {soleEdgePolishType === 'other' && (
                        <Textarea
                          placeholder={t('otherPlaceholder')}
                          value={form.watch('soleEdgePolishOther') || ''}
                          onChange={(e) => form.setValue('soleEdgePolishOther', e.target.value)}
                          rows={2}
                        />
                      )}
                    </CardContent>
                  </Card>

                  {/* Maakwijze 
                  (Select component)
                  Gelijmd (Standaard)
                  Flexibel
                  Anders: (Textarea)

                  Output naar form-results in engels: constructionMethodShoe
                  Voorbeeld: Gelijmd, Flexibel
                  Alleen de gekozen opties toevoegen.
                  
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('constructionMethod')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select 
                        value={constructionMethodType || 'glued'} 
                        onValueChange={(v) => form.setValue('constructionMethodType', v as 'glued' | 'flexible' | 'other')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('constructionMethod')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="glued">{t('glued')}</SelectItem>
                          <SelectItem value="flexible">{t('flexible')}</SelectItem>
                          <SelectItem value="other">{t('other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {constructionMethodType === 'other' && (
                        <Textarea
                          placeholder={t('otherPlaceholder')}
                          value={form.watch('constructionMethodOther') || ''}
                          onChange={(e) => form.setValue('constructionMethodOther', e.target.value)}
                          rows={2}
                        />
                      )}
                    </CardContent>
                  </Card>

                  {/*  Hakmodel: (verplicht)
                    (Select component)
                    Opbouwhak -> dan Poro of Leer (Radio) (Standaard)
                    Sleehak -> dan Uitholling of Vlak (Radio)
                    Blokhak -> dan Kernbekleding (Checkbox)

                    Output naar form-results in engels: heelModelDetailsShoe
                    Voorbeeld: Opbouwhak Poro, Sleehak Vlak, Blokhak Kernbekleding
                    Alleen de gekozen opties toevoegen.
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('heelModel')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select 
                        value={heelModelType || 'buildUp'} 
                        onValueChange={(v) => {
                          form.setValue('heelModelType', v as 'buildUp' | 'wedge' | 'block');
                          // Set default heights based on heel type
                          if (v === 'buildUp' || v === 'wedge') {
                            if (!form.watch('hakhoogteLinks')) form.setValue('hakhoogteLinks', '1.5');
                            if (!form.watch('hakhoogteRechts')) form.setValue('hakhoogteRechts', '1.5');
                          } else if (v === 'block') {
                            if (!form.watch('hakhoogteLinks')) form.setValue('hakhoogteLinks', '2');
                            if (!form.watch('hakhoogteRechts')) form.setValue('hakhoogteRechts', '2');
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('heelModel')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buildUp">{t('buildUpHeel')}</SelectItem>
                          <SelectItem value="wedge">{t('wedgeHeel')}</SelectItem>
                          <SelectItem value="block">{t('blockHeel')}</SelectItem>
                        </SelectContent>
                      </Select>

                      {heelModelType === 'buildUp' && (
                        <div className="pt-2">
                          <RadioGroup 
                            value={form.watch('heelBuildUpMaterial') || 'poro'} 
                            onValueChange={(v) => form.setValue('heelBuildUpMaterial', v as 'poro' | 'leather')}
                          >
                            <div className="flex gap-6">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="poro" id="heel-poro" />
                                <Label htmlFor="heel-poro" className="font-normal cursor-pointer">{t('poro')}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="leather" id="heel-leather" />
                                <Label htmlFor="heel-leather" className="font-normal cursor-pointer">{t('leather')}</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {heelModelType === 'wedge' && (
                        <div className="pt-2">
                          <RadioGroup 
                            value={form.watch('heelWedgeType') || 'flat'} 
                            onValueChange={(v) => form.setValue('heelWedgeType', v as 'hollow' | 'flat')}
                          >
                            <div className="flex gap-6">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hollow" id="wedge-hollow" />
                                <Label htmlFor="wedge-hollow" className="font-normal cursor-pointer">{t('hollow')}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="flat" id="wedge-flat" />
                                <Label htmlFor="wedge-flat" className="font-normal cursor-pointer">{t('flat')}</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {heelModelType === 'block' && (
                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox
                            id="heel-core-coating"
                            checked={form.watch('heelBlockCoreCoating') || false}
                            onCheckedChange={(checked) => form.setValue('heelBlockCoreCoating', !!checked)}
                          />
                          <Label htmlFor="heel-core-coating" className="font-normal cursor-pointer">
                            {t('coreCoating')}
                          </Label>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Hakhoogte: (verplicht) 
                    Links: (textarea) en Rechts: (textarea)

                    Output naar form-results in engels: heelHeightDetailsShoe
                    Voorbeeld: Links: (textarea) cm, Rechts: (textarea) cm

                    Bij hakmodel standaard het volgende invullen als er nog niets is ingevuld L en R:
                    Opbouwhak: 1,5 cm
                    Sleehak: 1,5 cm
                    Blokhak: 2 cm
                  
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('heelHeight')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="heel-height-left">{t('heelHeightLeft')} (cm)</Label>
                          <Input
                            id="heel-height-left"
                            type="number"
                            step="0.1"
                            value={form.watch('hakhoogteLinks') || ''}
                            onChange={(e) => form.setValue('hakhoogteLinks', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="heel-height-right">{t('heelHeightRight')} (cm)</Label>
                          <Input
                            id="heel-height-right"
                            type="number"
                            step="0.1"
                            value={form.watch('hakhoogteRechts') || ''}
                            onChange={(e) => form.setValue('hakhoogteRechts', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Hakafronding 
                    (Checkbox)
                    Links: (Checkbox)  
                    Rechts: (Checkbox)
                    
                    (Standaard beide aangevinkt)
                    Output naar form-results in engels: heelRoundingDetailsShoe
                    Voorbeeld: Links + Rechts, Links
                    Alleen de gekozen opties toevoegen met een + ertussen als er meer dan 1 is.
                  
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('heelRounding')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="heel-rounding-left"
                            checked={form.watch('hakafrondingLinksEnabled') || false}
                            onCheckedChange={(checked) => form.setValue('hakafrondingLinksEnabled', !!checked)}
                          />
                          <Label htmlFor="heel-rounding-left" className="font-normal cursor-pointer">
                            {t('left')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="heel-rounding-right"
                            checked={form.watch('hakafrondingRechtsEnabled') || false}
                            onCheckedChange={(checked) => form.setValue('hakafrondingRechtsEnabled', !!checked)}
                          />
                          <Label htmlFor="heel-rounding-right" className="font-normal cursor-pointer">
                            {t('right')}
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Schoring
                    Links: Select component (Lateraal, Mediaal) -> dan (Textarea) voor mm lat of mm med
                    Rechts: Select component (Lateraal, Mediaal) -> dan (Textarea) voor mm lat of mm med

                    Output naar form-results in engels: shoringDetailsShoe
                    Voorbeeld: L Lat (textarea) mm, R Med (textarea) mm, L Lat (textarea) mm + R Med (textarea) mm
                    Alleen de gekozen opties toevoegen met een + ertussen als er meer dan 1 is.
                  
                  */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('shoring')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">{t('shoringLeft')}</Label>
                          <Select 
                            value={form.watch('shoringLeftType') || ''} 
                            onValueChange={(v) => form.setValue('shoringLeftType', v as 'lateral' | 'medial' | '')}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('shoringType')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">{t('none')}</SelectItem>
                              <SelectItem value="lateral">{t('lateral')}</SelectItem>
                              <SelectItem value="medial">{t('medial')}</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.watch('shoringLeftType') && form.watch('shoringLeftType') !== '' && (
                            <div className="space-y-2">
                              <Label htmlFor="shoring-left-mm">{t('shoringMm')}</Label>
                              <Input
                                id="shoring-left-mm"
                                type="number"
                                value={form.watch('shoringLeftMm') || ''}
                                onChange={(e) => form.setValue('shoringLeftMm', e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">{t('shoringRight')}</Label>
                          <Select 
                            value={form.watch('shoringRightType') || ''} 
                            onValueChange={(v) => form.setValue('shoringRightType', v as 'lateral' | 'medial' | '')}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('shoringType')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">{t('none')}</SelectItem>
                              <SelectItem value="lateral">{t('lateral')}</SelectItem>
                              <SelectItem value="medial">{t('medial')}</SelectItem>
                            </SelectContent>
                          </Select>
                          {form.watch('shoringRightType') && form.watch('shoringRightType') !== '' && (
                            <div className="space-y-2">
                              <Label htmlFor="shoring-right-mm">{t('shoringMm')}</Label>
                              <Input
                                id="shoring-right-mm"
                                type="number"
                                value={form.watch('shoringRightMm') || ''}
                                onChange={(e) => form.setValue('shoringRightMm', e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* 1. Beenlengte verschil */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('legLengthDifference')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="leg-length-left">{t('leftCm')}</Label>
                      <Input
                        id="leg-length-left"
                        type="number"
                        placeholder="cm"
                        value={form.watch('legLengthDifferenceLeft')}
                        onChange={(e) => form.setValue('legLengthDifferenceLeft', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="leg-length-right">{t('rightCm')}</Label>
                      <Input
                        id="leg-length-right"
                        type="number"
                        placeholder="cm"
                        value={form.watch('legLengthDifferenceRight')}
                        onChange={(e) => form.setValue('legLengthDifferenceRight', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schachthoogte */}

              {/* 2. Openstand schacht */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('shaftOpening')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={form.watch('openstandSchacht') || ''} onValueChange={(v) => form.setValue('openstandSchacht', v)}>
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

              {/* !Model (Verplicht)
              Opties radio: (Radio) 
              Als foto 
              of 
              Model -> (textarea) (Standaard)
              
              Output naar form-results in engels: finalModelShoe
              Voorbeeld: Model: (textarea).
              Als (Als foto) is gekozen, dan alleen dat tonen.
              */}

              {/* !Kleuren (Verplicht)
              Optie 1: (Textarea)
              Optie 2: (Textarea)
              Optie 3: (Textarea)
              Hier moet een plusje of minnetje komen om opties toe te voegen of te verwijderen.

              Output naar form-results in engels: finalColorOptionsShoe
              Voorbeeld: 1: (textarea1) + 2: (textarea2) + 3: (textarea3). 
              Alleen de gekozen opties toevoegen met een + ertussen als er nog een optie is toegevoegd.
              */}

              {/* !Tong polsteren en polsterkraag:
              Tong polsteren: 3 of 5 mm (Radio)
              Polsterkraag: 3 of 5 mm (Radio) 
              
              Output naar form-results in engels: paddingTongueMmShoe, paddingCollarMmShoe
              Voorbeeld: 3 mm, 5 mm

              Deze zijn los van elkaar. Gewoon naaste elkaar tonen.
              */}

              {/* !Sluiting: (Verplicht)
                (Radio)
               Klitteband met rolpassant (extra lang)
               Of
               Ringen nr: (Textarea) + Aantal: (Textarea)
               Haken nr: (Textarea) + Aantal: (Textarea)

               Output naar form-results in engels: closureTypeDetailsShoe
               Voorbeeld: Klitteband met rolpassant (extra lang), Ringen nr: (textarea) Aantal: (textarea) + Haken nr: (textarea) Aantal: (textarea)
               Alleen de gekozen opties toevoegen. het is of klitteband, of ringen/haken. Ringen/haken kunnen samen zijn. Als ze zijn ingevuld. moeten ze erbij met een + ertussen.
               */}

              {/* !Rits 
                (Select component)
                Geen Rits (Standaard)
                Functioneel Nylon (Checkbox met Mediaal en/of Lateraal)
                Decoratief Nylon (Checkbox met Mediaal en/of Lateraal)

                Output naar form-results in engels: zipperDetailsShoe
                Voorbeeld: Functioneel Nylon Mediaal + Lateraal, Decoratief Nylon Lateraal
                Alleen de gekozen optie toevoegen.            
               */}

              {/* !Bijzonderheden:
               (Checkbox) 
                Mediaal klittenband tongen
                Veterlus op de tong
                Extra leer meeleveren i.v.m bekleden supplementen
                Anders: (Textarea)

                Output naar form-results in engels: specialDetailsShoe
                Voorbeeld: Mediaal klittenband tongen + Veterlus op de tong, Veterlus op de tong
                Alleen de gekozen opties toevoegen met een + ertussen als er meer dan 1 is.
               */}

              {/* !Randtype (Verplicht)
                Rand type: (Textarea) en Kleur: (Textarea)
               
                Output naar form-results in engels: edgeTypeDetailsShoe
                Voorbeeld: Rand type: (textarea) + Kleur: (textarea)
               
               */}

              {/* !Zooltype (Verplicht)
               (Select component))
               Gumlite: (Textarea) (Standaard met "2644")
               Leer
               Antislip

                Output naar form-results in engels: soleTypeDetailsShoe
                Voorbeeld: Gumlite: (textarea), Leer, Antislip
                Alleen de gekozen opties toevoegen. Kan er maar 1 zijn.
               */}

              {/* Koolstofverstijving: 
               (Select component)
                Nee (Standaard)
                Prefab -> dan Links (Checkbox) Rechts (Checkbox)
                Maatwerk -> dan Links (Checkbox) Rechts (Checkbox)

                Output naar form-results in engels: carbonStiffeningDetailsShoe
                Voorbeeld: Prefab Links + Rechts, Maatwerk Rechts
                Alleen de gekozen opties toevoegen met een + ertussen als er meer dan 1 is.
               
               */}

              {/* Neusopties:
               (Select component)
               Nee (Standaard)
               Koolstofneuzen
               Rubberenkruipneuzen

                Output naar form-results in engels: toeOptionsDetailsShoe
                Voorbeeld: Koolstofneuzen, Rubberenkruipneuzen
               
               */}

              {/* Contrefort:
                (Select component)
                Formo (Standaard)
                Anders: (Textarea)

                Output naar form-results in engels: counterfortDetailsShoe
                Voorbeeld: Formo, (textarea)

              */}

              {/* Binnenzool:
              (Select component)
              Leer (Standaard)
              Anders: (Textarea)

              Output naar form-results in engels: insoleDetailsShoe
              Voorbeeld: Leer, (textarea)
              */}

              {/* Zoolkantuitpoetsen:
              (Select component)
              Nee (Standaard)
              Zwart
              Bruin
              Mahonie
              Zoolkant ribbels frezen
              Anders: (Textarea)

              Output naar form-results in engels: soleEdgePolishDetailsShoe
              Voorbeeld: Zwart, Bruin, Mahonie, Zoolkant ribbels frezen, (textarea)
              Alleen de gekozen opties toevoegen.
              
              */}

              {/* Maakwijze 
              (Select component)
              Gelijmd (Standaard)
              Flexibel
              Anders: (Textarea)

              Output naar form-results in engels: constructionMethodShoe
              Voorbeeld: Gelijmd, Flexibel
              Alleen de gekozen opties toevoegen.
              
              */}

              {/*  Hakmodel: (verplicht)
                (Select component)
                Opbouwhak -> dan Poro of Leer (Radio) (Standaard)
                Sleehak -> dan Uitholling of Vlak (Radio)
                Blokhak -> dan Kernbekleding (Checkbox)

                Output naar form-results in engels: heelModelDetailsShoe
                Voorbeeld: Opbouwhak Poro, Sleehak Vlak, Blokhak Kernbekleding
                Alleen de gekozen opties toevoegen.
              */}

              {/* Hakhoogte: (verplicht) 
                Links: (textarea) en Rechts: (textarea)

                Output naar form-results in engels: heelHeightDetailsShoe
                Voorbeeld: Links: (textarea) cm, Rechts: (textarea) cm

                Bij hakmodel standaard het volgende invullen als er nog niets is ingevuld L en R:
                Opbouwhak: 1,5 cm
                Sleehak: 1,5 cm
                Blokhak: 2 cm
              
              */}

              {/* Hakafronding 
                (Checkbox)
                Links: (Checkbox)  
                Rechts: (Checkbox)
                
                (Standaard beide aangevinkt)
                Output naar form-results in engels: heelRoundingDetailsShoe
                Voorbeeld: Links + Rechts, Links
                Alleen de gekozen opties toevoegen met een + ertussen als er meer dan 1 is.
              
              */}

              {/* Schoring
                Links: Select component (Lateraal, Mediaal) -> dan (Textarea) voor mm lat of mm med
                Rechts: Select component (Lateraal, Mediaal) -> dan (Textarea) voor mm lat of mm med

                Output naar form-results in engels: shoringDetailsShoe
                Voorbeeld: L Lat (textarea) mm, R Med (textarea) mm, L Lat (textarea) mm + R Med (textarea) mm
                Alleen de gekozen opties toevoegen met een + ertussen als er meer dan 1 is.
              
              */}








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

export default FormCheckFoliepasPage;
