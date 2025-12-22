import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseLayout, FormFooter, FormSection } from '@/components/layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Routes } from '@/lib/routes';
import {
  OVAC_OMSCHRIJVING_ITEMS,
  PAARTYPE_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
} from '@/lib/constants/formConstants';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setClientData, setIntakeOVACData } from '@/domain/store/slices/formData';
import { scrollToFirstError } from '@/utils/formHelpers';

const OVAC_ITEM_TRANSLATIONS: Record<string, string> = {
  supplementIndividueel: 'supplementIndividual',
  eenvoudigeAfwikkelrol: 'simpleRockerSole',
  gecompliceerdeAfwikkelrol: 'complicatedRockerSole',
  hakAanpassing2cm: 'heelAdjustmentUpTo2cm',
  hakZoolVerhoging3cm: 'heelSoleRaiseUpTo3cm',
  hakZoolVerhoging7cm: 'heelSoleRaiseUpTo7cm',
  aangepastehakken: 'customHeels',
  zoolverstijving: 'soleStiffeningOsb',
  nieuweWreefsluiting: 'newInstepClosure',
};

const formSchema = z.object({
  welkPaar: z.string(),
  medischeIndicatie: z.string().optional(),
  // Omschrijving items (9 × L/R)
  supplementIndividueelLinks: z.boolean().optional(),
  supplementIndividueelRechts: z.boolean().optional(),
  eenvoudigeAfwikkelrolLinks: z.boolean().optional(),
  eenvoudigeAfwikkelrolRechts: z.boolean().optional(),
  gecompliceerdeAfwikkelrolLinks: z.boolean().optional(),
  gecompliceerdeAfwikkelrolRechts: z.boolean().optional(),
  hakAanpassing2cmLinks: z.boolean().optional(),
  hakAanpassing2cmRechts: z.boolean().optional(),
  hakZoolVerhoging3cmLinks: z.boolean().optional(),
  hakZoolVerhoging3cmRechts: z.boolean().optional(),
  hakZoolVerhoging7cmLinks: z.boolean().optional(),
  hakZoolVerhoging7cmRechts: z.boolean().optional(),
  aangepastehakkenLinks: z.boolean().optional(),
  aangepastehakkenRechts: z.boolean().optional(),
  zoolverstijvingLinks: z.boolean().optional(),
  zoolverstijvingRechts: z.boolean().optional(),
  nieuweWreefsluitingLinks: z.boolean().optional(),
  nieuweWreefsluitingRechts: z.boolean().optional(),

  // Verkorting
  verkortingLinks: z.boolean().optional(),
  verkortingRechts: z.boolean().optional(),
  voorvoetCm: z.string().optional(),
  hielCm: z.string().optional(),

  // Optional steunzolen
  steunzoolEnabled: z.boolean().optional(),
  steunzoolTypeGeneral: z.string().optional(),
  steunzoolAndersText: z.string().optional(),
  steunzoolCorrectieMiddenvoet: z.string().optional(),
  steunzoolCorrectieVoorvoet: z.string().optional(),
  steunzoolVvPellote: z.string().optional(),
  steunzoolHakVerhogingLinks: z.string().optional(),
  steunzoolHakVerhogingRechts: z.string().optional(),
  steunzoolPrijs: z.number().optional(),
  steunzoolPrijsNaam: z.string().optional(),

  bijzonderheden: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const FormIntakeOVACPage = () => {
  const { t } = useTranslation('form');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      welkPaar: PAARTYPE_OPTIES[0]?.value || 'Eerste paar',
      medischeIndicatie: '',
      voorvoetCm: '',
      hielCm: '',
      steunzoolEnabled: false,
      steunzoolTypeGeneral: '',
      steunzoolAndersText: '',
      steunzoolCorrectieMiddenvoet: '',
      steunzoolCorrectieVoorvoet: '',
      steunzoolVvPellote: '',
      steunzoolHakVerhogingLinks: '',
      steunzoolHakVerhogingRechts: '',
      steunzoolPrijs: undefined,
      steunzoolPrijsNaam: '',
      bijzonderheden: '',
    },
  });

  const showSteunzolen = form.watch('steunzoolEnabled');

  const omschrijvingItems = useMemo(() => OVAC_OMSCHRIJVING_ITEMS, []);

  const renderOmschrijvingRow = (key: string, label: string, postNr: string) => {
    const leftField = `${key}Links` as keyof FormData;
    const rightField = `${key}Rechts` as keyof FormData;

    return (
      <div
        key={key}
        className="rounded-lg border bg-muted/50 p-4 space-y-3"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-foreground">{label}</p>
          <span className="text-xs text-muted-foreground">Post {postNr}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${key}-links`}
              checked={!!form.watch(leftField)}
              onCheckedChange={checked => form.setValue(leftField, !!checked)}
            />
            <Label htmlFor={`${key}-links`} className="font-normal cursor-pointer">
              {t('left')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${key}-rechts`}
              checked={!!form.watch(rightField)}
              onCheckedChange={checked => form.setValue(rightField, !!checked)}
            />
            <Label htmlFor={`${key}-rechts`} className="font-normal cursor-pointer">
              {t('right')}
            </Label>
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'OVAC' }));
    }

    const steunzoolEnabled = !!data.steunzoolEnabled;

    dispatch(
      setIntakeOVACData({
        welkPaar: data.welkPaar,
        medischeIndicatie: data.medischeIndicatie || '',
        supplementIndividueelLinks: !!data.supplementIndividueelLinks,
        supplementIndividueelRechts: !!data.supplementIndividueelRechts,
        eenvoudigeAfwikkelrolLinks: !!data.eenvoudigeAfwikkelrolLinks,
        eenvoudigeAfwikkelrolRechts: !!data.eenvoudigeAfwikkelrolRechts,
        gecompliceerdeAfwikkelrolLinks: !!data.gecompliceerdeAfwikkelrolLinks,
        gecompliceerdeAfwikkelrolRechts: !!data.gecompliceerdeAfwikkelrolRechts,
        hakAanpassing2cmLinks: !!data.hakAanpassing2cmLinks,
        hakAanpassing2cmRechts: !!data.hakAanpassing2cmRechts,
        hakZoolVerhoging3cmLinks: !!data.hakZoolVerhoging3cmLinks,
        hakZoolVerhoging3cmRechts: !!data.hakZoolVerhoging3cmRechts,
        hakZoolVerhoging7cmLinks: !!data.hakZoolVerhoging7cmLinks,
        hakZoolVerhoging7cmRechts: !!data.hakZoolVerhoging7cmRechts,
        aangepastehakkenLinks: !!data.aangepastehakkenLinks,
        aangepastehakkenRechts: !!data.aangepastehakkenRechts,
        zoolverstijvingLinks: !!data.zoolverstijvingLinks,
        zoolverstijvingRechts: !!data.zoolverstijvingRechts,
        nieuweWreefsluitingLinks: !!data.nieuweWreefsluitingLinks,
        nieuweWreefsluitingRechts: !!data.nieuweWreefsluitingRechts,
        verkortingLinks: !!data.verkortingLinks,
        verkortingRechts: !!data.verkortingRechts,
        voorvoetCm: data.voorvoetCm || '',
        hielCm: data.hielCm || '',
        steunzoolTypeGeneral: steunzoolEnabled ? data.steunzoolTypeGeneral || '' : '',
        steunzoolAndersText: steunzoolEnabled ? data.steunzoolAndersText || '' : '',
        steunzoolCorrectieMiddenvoet: steunzoolEnabled
          ? data.steunzoolCorrectieMiddenvoet || ''
          : '',
        steunzoolCorrectieVoorvoet: steunzoolEnabled
          ? data.steunzoolCorrectieVoorvoet || ''
          : '',
        steunzoolVvPellote: steunzoolEnabled ? data.steunzoolVvPellote || '' : '',
        steunzoolHakVerhogingLinks: steunzoolEnabled
          ? data.steunzoolHakVerhogingLinks || ''
          : '',
        steunzoolHakVerhogingRechts: steunzoolEnabled
          ? data.steunzoolHakVerhogingRechts || ''
          : '',
        steunzoolPrijs: steunzoolEnabled ? data.steunzoolPrijs : undefined,
        steunzoolPrijsNaam: steunzoolEnabled ? data.steunzoolPrijsNaam || '' : '',
        bijzonderheden: data.bijzonderheden || '',
      }),
    );

    router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeOvac')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('intakeOvac')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('intakeOvacDescription')}
          </p>
        </div>

        <FormSection className="max-w-6xl mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* Paartype & indicatie */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('description')}</CardTitle>
                  <CardDescription>{t('whichPair')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">
                        {t('whichPair')}
                      </Label>
                      <RadioGroup
                        value={form.watch('welkPaar')}
                        onValueChange={val => form.setValue('welkPaar', val)}
                      >
                        <div className="grid gap-3">
                          {PAARTYPE_OPTIES.map(option => (
                            <label
                              key={option.value}
                              className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 cursor-pointer"
                              htmlFor={`ov-${option.value}`}
                            >
                              <RadioGroupItem
                                id={`ov-${option.value}`}
                                value={option.value}
                              />
                              <span className="text-sm text-foreground">
                                {t(option.label)}
                              </span>
                            </label>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medische-indicatie">
                        {t('medicalIndication')}
                      </Label>
                      <Textarea
                        id="medische-indicatie"
                        placeholder={t('medicalIndicationPlaceholder')}
                        value={form.watch('medischeIndicatie')}
                        onChange={e =>
                          form.setValue('medischeIndicatie', e.target.value)
                        }
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Omschrijving items */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('description')}</CardTitle>
                  <CardDescription>
                    {t('modules')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {omschrijvingItems.map(item =>
                    renderOmschrijvingRow(
                      item.key,
                      t(OVAC_ITEM_TRANSLATIONS[item.key] || item.label),
                      item.postNr,
                    ),
                  )}
                </CardContent>
              </Card>

              {/* Verkorting */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('verkorting')}</CardTitle>
                  <CardDescription>
                    {t('specialNotesPlaceholder')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 cursor-pointer" htmlFor="verkorting-links">
                      <Checkbox
                        id="verkorting-links"
                        checked={!!form.watch('verkortingLinks')}
                        onCheckedChange={checked =>
                          form.setValue('verkortingLinks', !!checked)
                        }
                      />
                      <span className="text-sm text-foreground">{t('left')}</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 cursor-pointer" htmlFor="verkorting-rechts">
                      <Checkbox
                        id="verkorting-rechts"
                        checked={!!form.watch('verkortingRechts')}
                        onCheckedChange={checked =>
                          form.setValue('verkortingRechts', !!checked)
                        }
                      />
                      <span className="text-sm text-foreground">{t('right')}</span>
                    </label>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="voorvoet-cm">{t('voorvoetCm')}</Label>
                      <Input
                        id="voorvoet-cm"
                        type="number"
                        step="0.1"
                        placeholder={t('voorvoetCm')}
                        value={form.watch('voorvoetCm')}
                        onChange={e => form.setValue('voorvoetCm', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hiel-cm">{t('hielCm')}</Label>
                      <Input
                        id="hiel-cm"
                        type="number"
                        step="0.1"
                        placeholder={t('hielCm')}
                        value={form.watch('hielCm')}
                        onChange={e => form.setValue('hielCm', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Steunzolen (optional) */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{t('insolesSection')}</CardTitle>
                    <CardDescription>{t('insolesDescription')}</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {t('enableInsoles')}
                    </span>
                    <Switch
                      checked={showSteunzolen}
                      onCheckedChange={checked =>
                        form.setValue('steunzoolEnabled', !!checked)
                      }
                    />
                  </div>
                </CardHeader>
                {showSteunzolen && (
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>{t('insoleType')}</Label>
                      <RadioGroup
                        value={form.watch('steunzoolTypeGeneral') || ''}
                        onValueChange={val =>
                          form.setValue('steunzoolTypeGeneral', val)
                        }
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                      >
                        {STEUNZOOL_TYPE_OPTIES.map(option => (
                          <label
                            key={option.value}
                            htmlFor={`steunzool-${option.value}`}
                            className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 cursor-pointer"
                          >
                            <RadioGroupItem
                              id={`steunzool-${option.value}`}
                              value={option.value}
                            />
                            <span className="text-sm text-foreground">{option.label}</span>
                          </label>
                        ))}
                      </RadioGroup>
                    </div>

                    {form.watch('steunzoolTypeGeneral') === 'Anders' && (
                      <div className="space-y-2">
                        <Label htmlFor="steunzool-anders">
                          {t('specifyOther')}
                        </Label>
                        <Textarea
                          id="steunzool-anders"
                          placeholder={t('specifyPlaceholder')}
                          value={form.watch('steunzoolAndersText')}
                          onChange={e =>
                            form.setValue('steunzoolAndersText', e.target.value)
                          }
                          rows={2}
                          className="resize-none"
                        />
                      </div>
                    )}

                    <Separator />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="correctie-middenvoet">
                          {t('midfootCorrection')}
                        </Label>
                        <Input
                          id="correctie-middenvoet"
                          placeholder={t('midfootCorrection')}
                          value={form.watch('steunzoolCorrectieMiddenvoet')}
                          onChange={e =>
                            form.setValue('steunzoolCorrectieMiddenvoet', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="correctie-voorvoet">
                          {t('forefootCorrection')}
                        </Label>
                        <Input
                          id="correctie-voorvoet"
                          placeholder={t('forefootCorrection')}
                          value={form.watch('steunzoolCorrectieVoorvoet')}
                          onChange={e =>
                            form.setValue('steunzoolCorrectieVoorvoet', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vv-pellote">{t('forefootPad')}</Label>
                      <Input
                        id="vv-pellote"
                        placeholder={t('forefootPad')}
                        value={form.watch('steunzoolVvPellote')}
                        onChange={e =>
                          form.setValue('steunzoolVvPellote', e.target.value)
                        }
                      />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hak-verhoging-links">
                          {t('insoleHeelRaiseLeft')}
                        </Label>
                        <Input
                          id="hak-verhoging-links"
                          type="number"
                          step="0.1"
                          placeholder={t('heelRaisePlaceholder')}
                          value={form.watch('steunzoolHakVerhogingLinks')}
                          onChange={e =>
                            form.setValue('steunzoolHakVerhogingLinks', e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hak-verhoging-rechts">
                          {t('insoleHeelRaiseRight')}
                        </Label>
                        <Input
                          id="hak-verhoging-rechts"
                          type="number"
                          step="0.1"
                          placeholder={t('heelRaisePlaceholder')}
                          value={form.watch('steunzoolHakVerhogingRechts')}
                          onChange={e =>
                            form.setValue('steunzoolHakVerhogingRechts', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="steunzool-prijs">{t('insolePrice')}</Label>
                        <Input
                          id="steunzool-prijs"
                          type="number"
                          step="0.01"
                          placeholder={t('insolePrice')}
                          value={form.watch('steunzoolPrijs') || ''}
                          onChange={e => {
                            const value = e.target.value
                              ? parseFloat(e.target.value)
                              : undefined;
                            form.setValue(
                              'steunzoolPrijs',
                              value !== undefined && !isNaN(value) ? value : undefined,
                            );
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="steunzool-prijs-naam">
                          {t('insolePriceName')}
                        </Label>
                        <Input
                          id="steunzool-prijs-naam"
                          placeholder={t('insolePriceName')}
                          value={form.watch('steunzoolPrijsNaam')}
                          onChange={e =>
                            form.setValue('steunzoolPrijsNaam', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Bijzonderheden */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('specialNotes')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={t('specialNotesPlaceholder')}
                    value={form.watch('bijzonderheden')}
                    onChange={e => form.setValue('bijzonderheden', e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

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

export default FormIntakeOVACPage;
