import React from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import {
  OMSLUITING_OPTIES,
  OmsluitingOptie,
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

const FormCheckFoliepasPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    readingCorrectionAfterFoilFit: z.string().optional(),
    readingCorrectionAfterLiningShoe: z.string().optional(),
    omsluitingLinks: z.record(z.boolean()),
    omsluitingRechts: z.record(z.boolean()),
    omsluitingLinksMm: z.record(z.string()),
    omsluitingRechtsMm: z.record(z.string()),
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
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(
      setCheckFoliepasData({
        readingCorrectionAfterFoilFit: data.readingCorrectionAfterFoilFit || '',
        readingCorrectionAfterLiningShoe: data.readingCorrectionAfterLiningShoe || '',
        omsluitingLinks: data.omsluitingLinks,
        omsluitingRechts: data.omsluitingRechts,
        omsluitingLinksMm: data.omsluitingLinksMm,
        omsluitingRechtsMm: data.omsluitingRechtsMm,
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
                  <Input
                    id="reading-correction-foil-fit"
                    type="text"
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
                  <Input
                    id="reading-correction-lining-shoe"
                    type="text"
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
                              checked={form.watch("omsluitingLinks")[optie.fullKeyLinks] || false}
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
                          {optie.needsMm && form.watch("omsluitingLinks")[optie.fullKeyLinks] && (
                            <Input
                              type="number"
                              placeholder="mm"
                              value={form.watch("omsluitingLinksMm")[optie.mmKeyLinks] || ''}
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
                          {optie.needsMm && form.watch("omsluitingRechts")[optie.fullKeyRechts] && (
                            <Input
                              type="number"
                              placeholder="mm"
                              value={form.watch("omsluitingRechtsMm")[optie.mmKeyRechts] || ''}
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
