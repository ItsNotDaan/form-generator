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

  const onSubmit = (data: FormData) => {
    dispatch(
      setCheckFoliepasData({
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
              {/* Reading Corrections */}
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

              {/* Enclosure (Omsluiting) - Reused from VLOS */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('enclosure')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">{t('left')}</Label>
                      {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                        <div key={optie.key} className="flex items-center gap-3">
                          <div className="flex items-center space-x-2 flex-1">
                            <Checkbox
                              id={`encl-left-${optie.key}`}
                              checked={(form.watch("omsluitingLinks")[optie.fullKeyLinks] as boolean) || false}
                              onCheckedChange={(checked) => {
                                form.setValue("omsluitingLinks", {
                                  ...form.getValues("omsluitingLinks"),
                                  [optie.fullKeyLinks]: !!checked
                                });
                                if (checked && optie.needsMm && optie.defaultMm) {
                                  form.setValue("omsluitingLinksMm", {
                                    ...form.getValues("omsluitingLinksMm"),
                                    [optie.mmKeyLinks]: optie.defaultMm,
                                  });
                                } else if (!checked) {
                                  const next = { ...form.getValues("omsluitingLinksMm") };
                                  delete next[optie.mmKeyLinks];
                                  form.setValue("omsluitingLinksMm", next);
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
                                  ...form.getValues("omsluitingLinksMm"),
                                  [optie.mmKeyLinks]: e.target.value,
                                })
                              }
                              className="w-20"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Right */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">{t('right')}</Label>
                      {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                        <div key={optie.key} className="flex items-center gap-3">
                          <div className="flex items-center space-x-2 flex-1">
                            <Checkbox
                              id={`encl-right-${optie.key}`}
                              checked={form.watch("omsluitingRechts")[optie.fullKeyRechts] || false}
                              onCheckedChange={(checked) => {
                                form.setValue("omsluitingRechts", {
                                  ...form.getValues("omsluitingRechts"),
                                  [optie.fullKeyRechts]: !!checked
                                });
                                if (checked && optie.needsMm && optie.defaultMm) {
                                  form.setValue("omsluitingRechtsMm", {
                                    ...form.getValues("omsluitingRechtsMm"),
                                    [optie.mmKeyRechts]: optie.defaultMm,
                                  });
                                } else if (!checked) {
                                  const next = { ...form.getValues("omsluitingRechtsMm") };
                                  delete next[optie.mmKeyRechts];
                                  form.setValue("omsluitingRechtsMm", next);
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
                                  ...form.getValues("omsluitingRechtsMm"),
                                  [optie.mmKeyRechts]: e.target.value,
                                })
                              }
                              className="w-20"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

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

              {/* 5. Supplement schoring */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('supplementSupport')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">{t('left')}</Label>
                      <RadioGroup
                        value={(form.watch('supplementschoringLinksEnabled') ? 'ja' : 'nee')}
                        onValueChange={(v) => form.setValue('supplementschoringLinksEnabled', v === 'ja')}
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
                      {form.watch('supplementschoringLinksEnabled') && (
                        <Select value={form.watch('supplementschoringLinksType')} onValueChange={(v) => form.setValue('supplementschoringLinksType', v)}>
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
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">{t('right')}</Label>
                      <RadioGroup
                        value={(form.watch('supplementschoringRechtsEnabled') ? 'ja' : 'nee')}
                        onValueChange={(v) => form.setValue('supplementschoringRechtsEnabled', v === 'ja')}
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
                      {form.watch('supplementschoringRechtsEnabled') && (
                        <Select value={form.watch('supplementschoringRechtsType')} onValueChange={(v) => form.setValue('supplementschoringRechtsType', v)}>
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
                  </div>
                </CardContent>
              </Card>

              {/* 4. Zoolverstijving */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('soleStiffening')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-2">
                      <RadioGroup
                        value={(form.watch('zoolverstijvingEnabled') ? 'ja' : 'nee')}
                        onValueChange={(v) => form.setValue('zoolverstijvingEnabled', v === 'ja')}
                      >
                        <div className="flex gap-4">
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
                    </div>

                    {form.watch('zoolverstijvingEnabled') && (
                      <div className="flex flex-col gap-2">
                        <Label>{t('side')}</Label>
                        <div className="flex gap-6">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="stiff-left"
                              checked={form.watch('zoolverstijvingLinks')}
                              onCheckedChange={(checked) => form.setValue('zoolverstijvingLinks', !!checked)}
                            />
                            <Label htmlFor="stiff-left" className="font-normal cursor-pointer">{t('left')}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="stiff-right"
                              checked={form.watch('zoolverstijvingRechts')}
                              onCheckedChange={(checked) => form.setValue('zoolverstijvingRechts', !!checked)}
                            />
                            <Label htmlFor="stiff-right" className="font-normal cursor-pointer">{t('right')}</Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 6. Sluiting en tong */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('closureAndTongue')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label>{t('closureType')}</Label>
                      <RadioGroup value={form.watch('sluitingType') || ''} onValueChange={(v) => form.setValue('sluitingType', v)}>
                        <div className="flex flex-col gap-2">
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

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="insert-point">{t('insertPoint')}</Label>
                      <Input
                        id="insert-point"
                        value={form.watch('inschotpunt') || ''}
                        onChange={(e) => form.setValue('inschotpunt', e.target.value)}
                        placeholder={t('insertPointPlaceholder')}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className="mb-1">{t('tonguePadding')}</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tongue-pad"
                          checked={form.watch('tongpolsterEnabled')}
                          onCheckedChange={(checked) => form.setValue('tongpolsterEnabled', !!checked)}
                        />
                        <Label htmlFor="tongue-pad" className="font-normal cursor-pointer">{t('tonguePadding')}</Label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label className="mb-1">{t('tongueStitching')}</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tongue-stitch"
                          checked={form.watch('tongVaststikkenEnabled')}
                          onCheckedChange={(checked) => form.setValue('tongVaststikkenEnabled', !!checked)}
                        />
                        <Label htmlFor="tongue-stitch" className="font-normal cursor-pointer">{t('tongueStitching')}</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 7. Haksoort en hoogte */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('heelTypeAndHeight')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">{t('left')}</Label>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm">{t('heelType')}</Label>
                        <RadioGroup value={form.watch('haksoortLinks') || ''} onValueChange={(v) => form.setValue('haksoortLinks', v)}>
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
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="heel-height-left" className="text-sm">{t('heelHeight')} (cm)</Label>
                        <Input
                          id="heel-height-left"
                          type="number"
                          value={form.watch('hakhoogteLinks') || ''}
                          onChange={(e) => form.setValue('hakhoogteLinks', e.target.value)}
                          placeholder="cm"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">{t('right')}</Label>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm">{t('heelType')}</Label>
                        <RadioGroup value={form.watch('haksoortRechts') || ''} onValueChange={(v) => form.setValue('haksoortRechts', v)}>
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
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="heel-height-right" className="text-sm">{t('heelHeight')} (cm)</Label>
                        <Input
                          id="heel-height-right"
                          type="number"
                          value={form.watch('hakhoogteRechts') || ''}
                          onChange={(e) => form.setValue('hakhoogteRechts', e.target.value)}
                          placeholder="cm"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 8. Hak aanpassingen (schoring) + 7. Ezelsoor */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('heelModifications')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">{t('heelSlant')}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm">{t('left')}</Label>
                        <RadioGroup
                          value={(form.watch('hakschoringLinksEnabled') ? 'ja' : 'nee')}
                          onValueChange={(v) => form.setValue('hakschoringLinksEnabled', v === 'ja')}
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
                        {form.watch('hakschoringLinksEnabled') && (
                          <Select value={form.watch('hakschoringLinksType')} onValueChange={(v) => form.setValue('hakschoringLinksType', v)}>
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
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm">{t('right')}</Label>
                        <RadioGroup
                          value={(form.watch('hakschoringRechtsEnabled') ? 'ja' : 'nee')}
                          onValueChange={(v) => form.setValue('hakschoringRechtsEnabled', v === 'ja')}
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
                        {form.watch('hakschoringRechtsEnabled') && (
                          <Select value={form.watch('hakschoringRechtsType')} onValueChange={(v) => form.setValue('hakschoringRechtsType', v)}>
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
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-semibold mb-3 block">{t('donkeyEar')}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm">{t('left')}</Label>
                        <RadioGroup
                          value={(form.watch('ezelsoorLinksEnabled') ? 'ja' : 'nee')}
                          onValueChange={(v) => form.setValue('ezelsoorLinksEnabled', v === 'ja')}
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
                        {form.watch('ezelsoorLinksEnabled') && (
                          <Select value={form.watch('ezelsoorLinksType')} onValueChange={(v) => form.setValue('ezelsoorLinksType', v)}>
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
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm">{t('right')}</Label>
                        <RadioGroup
                          value={(form.watch('ezelsoorRechtsEnabled') ? 'ja' : 'nee')}
                          onValueChange={(v) => form.setValue('ezelsoorRechtsEnabled', v === 'ja')}
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
                        {form.watch('ezelsoorRechtsEnabled') && (
                          <Select value={form.watch('ezelsoorRechtsType')} onValueChange={(v) => form.setValue('ezelsoorRechtsType', v)}>
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
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 9. Hakafrondingen */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('heelRounding')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="round-left"
                          checked={form.watch('hakafrondingLinksEnabled')}
                          onCheckedChange={(checked) => form.setValue('hakafrondingLinksEnabled', !!checked)}
                        />
                        <Label htmlFor="round-left" className="font-normal cursor-pointer">{t('left')}</Label>
                      </div>
                      {form.watch('hakafrondingLinksEnabled') && (
                        <div className="space-y-3">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="round-left-height" className="text-sm">{t('height')} (mm)</Label>
                            <Input
                              id="round-left-height"
                              type="number"
                              value={form.watch('hakafrondingLinksHoogte') || ''}
                              onChange={(e) => form.setValue('hakafrondingLinksHoogte', e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="round-left-length" className="text-sm">{t('length')} (mm)</Label>
                            <Input
                              id="round-left-length"
                              type="number"
                              value={form.watch('hakafrondingLinksLengte') || ''}
                              onChange={(e) => form.setValue('hakafrondingLinksLengte', e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="round-right"
                          checked={form.watch('hakafrondingRechtsEnabled')}
                          onCheckedChange={(checked) => form.setValue('hakafrondingRechtsEnabled', !!checked)}
                        />
                        <Label htmlFor="round-right" className="font-normal cursor-pointer">{t('right')}</Label>
                      </div>
                      {form.watch('hakafrondingRechtsEnabled') && (
                        <div className="space-y-3">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="round-right-height" className="text-sm">{t('height')} (mm)</Label>
                            <Input
                              id="round-right-height"
                              type="number"
                              value={form.watch('hakafrondingRechtsHoogte') || ''}
                              onChange={(e) => form.setValue('hakafrondingRechtsHoogte', e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="round-right-length" className="text-sm">{t('length')} (mm)</Label>
                            <Input
                              id="round-right-length"
                              type="number"
                              value={form.watch('hakafrondingRechtsLengte') || ''}
                              onChange={(e) => form.setValue('hakafrondingRechtsLengte', e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 10. Loopzool */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('walkingSole')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={form.watch('loopzoolType') || ''} onValueChange={(v) => form.setValue('loopzoolType', v)}>
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
