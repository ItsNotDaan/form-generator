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
    },
  });

  const side = form.watch('side');
  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

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
