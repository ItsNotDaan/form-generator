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
  CORRECTIE_MIDDENVOET_OPTIES,
  CORRECTIE_VOORVOET_OPTIES,
  OVAC_OMSCHRIJVING_ITEMS,
  PAARTYPE_OPTIES,
  PELLOTE_OPTIES,
  STEUNZOLEN_PRIJS_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
} from '@/lib/constants/formConstants';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setClientData, setIntakeOVACData } from '@/domain/store/slices/formData';
import { scrollToFirstError } from '@/utils/formHelpers';
import { FormCard, FormBlock, FormItemWrapper } from '@/components/ui/form-block';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  voorvoetCmLinks: z.string().optional(),
  voorvoetCmRechts: z.string().optional(),
  hielCmLinks: z.string().optional(),
  hielCmRechts: z.string().optional(),

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
      verkortingLinks: false,
      verkortingRechts: false,
      voorvoetCmLinks: '',
      voorvoetCmRechts: '',
      hielCmLinks: '',
      hielCmRechts: '',
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
        voorvoetCmLinks: data.voorvoetCmLinks || '',
        voorvoetCmRechts: data.voorvoetCmRechts || '',
        hielCmLinks: data.hielCmLinks || '',
        hielCmRechts: data.hielCmRechts || '',
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

  // Determine which sides to show based on your form logic
  // For now, always show both sides
  const showLinks = true;
  const showRechts = true;
  const side = showLinks && showRechts ? 'both' : showLinks ? 'left' : 'right';

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

              {/* Omschrijving items */}
              <FormCard
                title={t('description')}
                description={t('modules')}
              >
                <FormBlock
                  columns={2}
                  // dividers={true} // We handle dividers internally for the lists
                  alignItems="center" // Ensure headers stay at top
                  contentClassName="space-x-4" // Extra gap between the huge Left/Right blocks
                >
                  <FormItemWrapper>
                    {/* LEFT SIDE LIST */}
                    {showLinks && (
                      <div className="flex flex-col p-3 w-full">
                        <div className="flex items-center justify-center pb-2 border-b">
                          <Label className="text-base font-bold">{t('left')}</Label>
                        </div>
                        {/* TIGHT LIST CONTAINER */}
                        < div className="flex flex-col divide-y border overflow-hidden">
                          {omschrijvingItems.map((item) => (
                            <ModuleSwitchRow
                              key={`left-${item.key}`}
                              item={item}
                              side="left"
                              form={form}
                              t={t}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </FormItemWrapper>

                  <FormItemWrapper>
                    {/* RIGHT SIDE LIST */}
                    {showRechts && (
                      <div className="flex flex-col p-3 w-full">
                        <div className="flex items-center justify-center pb-2 border-b">
                          <Label className="text-base font-bold">{t('right')}</Label>
                        </div>

                        {/* TIGHT LIST CONTAINER */}
                        <div className="flex flex-col divide-y border rounded-lg overflow-hidden">
                          {omschrijvingItems.map((item) => (
                            <ModuleSwitchRow
                              key={`right-${item.key}`}
                              item={item}
                              side="right"
                              form={form}
                              t={t}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Verkorting */}
              <FormCard
                title={t('verkorting')}
                description={t('specialNotesPlaceholder')}
              >
                <FormBlock
                  columns={2}
                  dividers={true}
                >
                  <FormItemWrapper >
                    <Label htmlFor="verkorting-links" className="text-sm font-medium cursor-pointer">
                      {t('left')}
                    </Label>
                    <Switch
                      id="verkorting-links"
                      checked={!!form.watch('verkortingLinks')}
                      onCheckedChange={checked => form.setValue('verkortingLinks', !!checked)}
                    />
                    {form.watch('verkortingLinks') && (
                      <div className="flex flex-row mt-2 space-x-4">
                        <FormItemWrapper label={t('voorvoetCm')}>
                          <Input
                            id="voorvoet-cm-links"
                            type="number"
                            step="0.5"
                            placeholder={t('voorvoetCm')}
                            value={form.watch('voorvoetCmLinks') || ''}
                            onChange={e => form.setValue('voorvoetCmLinks', e.target.value)}
                            className=""
                          />
                        </FormItemWrapper>
                        <FormItemWrapper label={t('hielCm')}>
                          <Input
                            id="hiel-cm-links"
                            type="number"
                            step="0.5"
                            placeholder={t('hielCm')}
                            value={form.watch('hielCmLinks') || ''}
                            onChange={e => form.setValue('hielCmLinks', e.target.value)}
                            className=""
                          />
                        </FormItemWrapper>
                      </div>
                    )}
                  </FormItemWrapper>

                  {/* Right Side */}
                  <FormItemWrapper >
                    <Label htmlFor="verkorting-rechts" className="text-sm font-medium cursor-pointer">
                      {t('right')}
                    </Label>
                    <Switch
                      id="verkorting-rechts"
                      checked={!!form.watch('verkortingRechts')}
                      onCheckedChange={checked => form.setValue('verkortingRechts', !!checked)}
                    />

                    {form.watch('verkortingRechts') && (
                      <div className="flex flex-row mt-2 space-x-4">
                        <FormItemWrapper label={t('voorvoetCm')}>
                          <Input
                            id="voorvoet-cm-rechts"
                            type="number"
                            step="0.5"
                            placeholder={t('voorvoetCm')}
                            value={form.watch('voorvoetCmRechts') || ''}
                            onChange={e => form.setValue('voorvoetCmRechts', e.target.value)}
                            className=""
                          />
                        </FormItemWrapper>
                        <FormItemWrapper label={t('hielCm')}>
                          <Input
                            id="hiel-cm-rechts"
                            type="number"
                            step="0.1"
                            placeholder={t('hielCm')}
                            value={form.watch('hielCmRechts') || ''}
                            onChange={e => form.setValue('hielCmRechts', e.target.value)}
                            className=""
                          />
                        </FormItemWrapper>
                      </div>
                    )}
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Steunzolen (optional) */}
              <FormCard
                title={t('insolesSection')}
                description={t('insolesDescription')}
                toggleAble={true}
                toggleLabel={t('enableInsoles')}
                toggleId="steunzolen-toggle"
                defaultOpen={form.watch('steunzoolEnabled')}
              >

                {/* Type Selection */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  title={t('insoleType')}
                  alignItems="start"
                >
                  {/* Radio Grid for Types */}
                  <FormItemWrapper className="col-span-2">
                    <Select
                      value={form.watch('steunzoolTypeGeneral') || undefined}
                      onValueChange={val => form.setValue('steunzoolTypeGeneral', val)}
                    >
                      <SelectTrigger className="w-2/3 mt-2">
                        <SelectValue
                          placeholder={t('insoleType')}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {STEUNZOOL_TYPE_OPTIES.map(option => (
                          <SelectItem
                            key={option.value}
                            value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Conditional "Other" Textarea */}
                  {form.watch('steunzoolTypeGeneral') === 'Anders' && (
                    <FormItemWrapper label={t('specifyOther')} className="col-span-2 pt-2">
                      <Textarea
                        id="steunzool-anders"
                        placeholder={t('specifyPlaceholder')}
                        value={form.watch('steunzoolAndersText')}
                        onChange={e => form.setValue('steunzoolAndersText', e.target.value)}
                        rows={2}
                        className="w-2/3 resize-none"
                      />
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* Corrections */}
                <FormBlock
                  columns={3}
                  dividers={true}
                  title={t('insoleCorrections')} // Optional: Add a title if translation exists, or leave blank
                >
                  <FormItemWrapper label={t('midfootCorrection')}>
                    <Select
                      value={form.watch('steunzoolCorrectieMiddenvoet') || undefined}
                      onValueChange={val => form.setValue('steunzoolCorrectieMiddenvoet', val)}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder={t('chooseOption')} />
                      </SelectTrigger>
                      <SelectContent>
                        {CORRECTIE_MIDDENVOET_OPTIES.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  <FormItemWrapper label={t('forefootCorrection')}>
                    <Select
                      value={form.watch('steunzoolCorrectieVoorvoet') || undefined}
                      onValueChange={val => form.setValue('steunzoolCorrectieVoorvoet', val)}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder={t('chooseOption')} />
                      </SelectTrigger>
                      <SelectContent>
                        {CORRECTIE_VOORVOET_OPTIES.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  <FormItemWrapper label={t('forefootPad')}>
                    <Select
                      value={form.watch('steunzoolVvPellote') || undefined}
                      onValueChange={val => form.setValue('steunzoolVvPellote', val)}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder={t('chooseOption')} />
                      </SelectTrigger>
                      <SelectContent>
                        {PELLOTE_OPTIES.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>
                </FormBlock>

                {/* Heel Raise & Price */}
                <FormBlock
                  columns={2}
                  dividers={true}
                >
                  <FormItemWrapper label={t('insoleHeelRaiseLeft')}>
                    <Input
                      id="hak-verhoging-links"
                      type="number"
                      step="0.1"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('steunzoolHakVerhogingLinks')}
                      onChange={e => form.setValue('steunzoolHakVerhogingLinks', e.target.value)}
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('insoleHeelRaiseRight')}>
                    <Input
                      id="hak-verhoging-rechts"
                      type="number"
                      step="0.1"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('steunzoolHakVerhogingRechts')}
                      onChange={e => form.setValue('steunzoolHakVerhogingRechts', e.target.value)}
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                </FormBlock>

                {/* Price Selection */}
                <FormBlock
                  columns={1}
                  dividers={false}
                >
                  <FormItemWrapper label={t('insolePrice')}>
                    <div className="flex gap-4 items-center">
                      <Select
                        value={form.watch('steunzoolPrijs') ? String(form.watch('steunzoolPrijs')) : undefined}
                        onValueChange={val => {
                          const numVal = val ? parseFloat(val) : undefined;
                          form.setValue('steunzoolPrijs', numVal);
                        }}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder={t('chooseOption')} />
                        </SelectTrigger>
                        <SelectContent>
                          {STEUNZOLEN_PRIJS_OPTIES.map(option => (
                            <SelectItem key={option.value} value={String(option.value)}>
                              {t(option.label)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="relative w-28">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">€</span>
                        <Input
                          id="steunzool-prijs-value"
                          type="number"
                          value={form.watch('steunzoolPrijs') || ''}
                          readOnly
                          className="pl-6 bg-muted text-center cursor-not-allowed"
                          tabIndex={-1}
                        />
                      </div>
                    </div>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

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
      </div >
    </BaseLayout >
  );
};

const ModuleSwitchRow = ({ item, side, form, t }: any) => {
  // Determine field path based on side (Matches your schema structure)
  // Assuming schema is: omsluitingLinks: { [key]: boolean }
  const fieldGroup = side === 'left' ? 'omsluitingLinks' : 'omsluitingRechts';
  const fullPath = `${fieldGroup}.${item.key}`;

  // Watch specific value
  const fieldValues = form.watch(fieldGroup) || {};
  const isChecked = !!fieldValues[item.key];

  return (
    <div className="flex items-center justify-between p-3 bg-card border-2 hover:border-primary! transition-colors">
      <div className="flex flex-col gap-0.5">
        <Label
          htmlFor={`${side}-${item.key}`}
          className="text-sm font-medium cursor-pointer"
        >
          {t(OVAC_ITEM_TRANSLATIONS[item.key] || item.label)}
        </Label>
        {item.postNr && (
          <span className="text-[10px] text-muted-foreground font-mono">
            #{item.postNr}
          </span>
        )}
      </div>

      <Switch
        id={`${side}-${item.key}`}
        checked={isChecked}
        onCheckedChange={(checked) => {
          // Update the specific record in the object
          const currentValues = form.getValues(fieldGroup) || {};
          form.setValue(fieldGroup, {
            ...currentValues,
            [item.key]: checked
          });
        }}
      />
    </div>
  );
};


export default FormIntakeOVACPage;

