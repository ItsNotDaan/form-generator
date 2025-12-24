import React, { useEffect, useState } from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch'; // Added Switch
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormCard, FormBlock, FormItemWrapper } from '@/components/ui/form-block';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import {
  setIntakeSteunzolenData,
  setClientData,
} from '@/domain/store/slices/formData';
import {
  PAARTYPE_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
  CORRECTIE_MIDDENVOET_OPTIES,
  CORRECTIE_VOORVOET_OPTIES,
  PELLOTE_OPTIES,
  STEUNZOLEN_PRIJS_OPTIES,
} from '@/lib/constants/formConstants';
import { ChevronRight } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// ---------------------------------------------------------------------------
// SCHEMA DEFINITION
// ---------------------------------------------------------------------------
const formSchema = z.object({
  welkPaar: z.string(),
  medischeIndicatie: z.string().optional(),
  schoenmaat: z.string(),

  // Steunzool fields
  steunzoolTypeGeneral: z.string().optional(),
  steunzoolAndersText: z.string().optional(),

  // Corrections (Optional when Talonette is active)
  steunzoolCorrectieMiddenvoet: z.string().optional(),
  steunzoolCorrectieVoorvoet: z.string().optional(),
  steunzoolVvPellote: z.string().optional(),

  steunzoolHakVerhogingLinks: z.string().optional(),
  steunzoolHakVerhogingRechts: z.string().optional(),
  steunzoolPrijs: z.number().optional(),
  steunzoolPrijsNaam: z.string().optional(),
  bijzonderheden: z.string().optional(),

  // New field for state tracking (not necessarily sent to backend, but good for form logic)
  isTalonette: z.boolean(),
}).refine(
  data => {
    // Validation logic
    // If NOT Talonette, Type is required
    if (!data.isTalonette && !data.steunzoolTypeGeneral) {
      return false;
    }
    // If Type is 'Anders', text is required
    if (data.steunzoolTypeGeneral === 'Anders' && !data.steunzoolAndersText) {
      return false;
    }
    // If Talonette is active, we expect at least one heel raise? (Optional logic)
    if (data.isTalonette && !data.steunzoolHakVerhogingLinks && !data.steunzoolHakVerhogingRechts) {
      // Uncomment if you want to enforce heel raise for talonette
      // return false; 
    }
    return true;
  },
  {
    message: 'Please fill in all required fields',
    path: ['steunzoolTypeGeneral'],
  }
);

type FormData = z.infer<typeof formSchema>;

const FormIntakeSteunzolenPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // ---------------------------------------------------------------------------
  // FORM SETUP
  // ---------------------------------------------------------------------------
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      welkPaar: 'Eerste paar',
      medischeIndicatie: '',
      schoenmaat: '',
      steunzoolTypeGeneral: '',
      steunzoolAndersText: '',
      steunzoolCorrectieMiddenvoet: '',
      steunzoolCorrectieVoorvoet: '',
      steunzoolVvPellote: '',
      steunzoolHakVerhogingLinks: '',
      steunzoolHakVerhogingRechts: '',
      steunzoolPrijs: STEUNZOLEN_PRIJS_OPTIES[0]?.value || undefined,
      steunzoolPrijsNaam: '',
      bijzonderheden: '',
      isTalonette: false,
    },
  });

  const { clearStorage } = useFormPersistence('intakeSteunzolen', form.watch, form.setValue);

  // Watch values for logic
  const isTalonetteActive = form.watch('isTalonette');
  const steunzoolTypeGeneral = form.watch('steunzoolTypeGeneral');

  // ---------------------------------------------------------------------------
  // TALONETTE LOGIC
  // ---------------------------------------------------------------------------

  const handleTalonetteToggle = (checked: boolean) => {
    form.setValue('isTalonette', checked);

    if (checked) {
      // 1. Clear Corrections
      form.setValue('steunzoolCorrectieMiddenvoet', '');
      form.setValue('steunzoolCorrectieVoorvoet', '');
      form.setValue('steunzoolVvPellote', '');

      // 2. Set Price to Last Option (Talonette Price)
      const lastPriceOption = STEUNZOLEN_PRIJS_OPTIES[STEUNZOLEN_PRIJS_OPTIES.length - 1];
      if (lastPriceOption) {
        form.setValue('steunzoolPrijs', lastPriceOption.value);
      }
    } else {
      const lastPriceOption = STEUNZOLEN_PRIJS_OPTIES[0];
      if (lastPriceOption) {
        form.setValue('steunzoolPrijs', lastPriceOption.value);
      }
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'Steunzolen' }));
    }

    dispatch(
      setIntakeSteunzolenData({
        welkPaar: data.welkPaar,
        medischeIndicatie: data.medischeIndicatie || '',
        schoenmaat: data.schoenmaat,
        steunzoolTypeGeneral: data.steunzoolTypeGeneral || '',
        steunzoolAndersText: data.steunzoolAndersText || '',
        steunzoolCorrectieMiddenvoet: data.steunzoolCorrectieMiddenvoet || '',
        steunzoolCorrectieVoorvoet: data.steunzoolCorrectieVoorvoet || '',
        steunzoolVvPellote: data.steunzoolVvPellote || '',
        steunzoolHakVerhogingLinks: data.steunzoolHakVerhogingLinks || '',
        steunzoolHakVerhogingRechts: data.steunzoolHakVerhogingRechts || '',
        steunzoolPrijs: data.steunzoolPrijs,
        steunzoolPrijsNaam: data.steunzoolPrijsNaam || '',
        bijzonderheden: data.bijzonderheden || '',
        isTalonette: data.isTalonette,
      }),
    );

    router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeInsoles')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('intakeInsoles')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('insolesDescription')}
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

              {/* Shoe Size */}
              <FormCard title={t('shoeSize')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormField
                    control={form.control}
                    name="schoenmaat"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={t('shoeSizePlaceholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormBlock>
              </FormCard>

              {/* ==========================================================
                  Steunzolen / Talonette Section 
                 ========================================================== */}
              <FormCard
                title={t('insolesSection')}
                description={t('insolesDescription')}
              >

                {/* ROW 1: Type Selection + Talonette Toggle */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  alignItems="start"
                >
                  {/* Left Column: Type Selection */}
                  <FormItemWrapper label={t('insoleType')}>
                    <Select
                      value={form.watch('steunzoolTypeGeneral') || undefined}
                      onValueChange={val => form.setValue('steunzoolTypeGeneral', val)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('insoleType')} />
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

                  {/* Right Column: Talonette Toggle */}
                  <FormItemWrapper
                    label="Talonette"
                    className="h-full justify-start pt-1" // Align toggle with label visually
                  >
                    <div className="flex items-center gap-3 pt-2">
                      <Switch
                        id="talonette-switch"
                        checked={isTalonetteActive}
                        onCheckedChange={handleTalonetteToggle}
                      />
                      <Label htmlFor="talonette-switch" className="cursor-pointer">
                        {t('activateTalonette') || 'Activate Talonette'}
                      </Label>
                    </div>
                  </FormItemWrapper>

                  {/* Conditional "Other" Textarea (Spans full width if visible) */}
                  {steunzoolTypeGeneral === 'Anders' && (
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

                {/* ROW 2: Corrections (HIDDEN if Talonette is Active) */}
                {!isTalonetteActive && (
                  <FormBlock
                    columns={3}
                    dividers={true}
                    title={t('insoleCorrections')}
                  >
                    <FormItemWrapper label={t('midfootCorrection')}>
                      <Select
                        value={form.watch('steunzoolCorrectieMiddenvoet') || undefined}
                        onValueChange={val => form.setValue('steunzoolCorrectieMiddenvoet', val)}
                      >
                        <SelectTrigger>
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
                        <SelectTrigger>
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
                        <SelectTrigger>
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
                )}

                {/* ROW 3: Heel Raise & Price */}
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

                {/* Price Section */}
                <FormBlock columns={1} dividers={false}>
                  <FormItemWrapper label={t('insolePrice')}>
                    <div className="flex gap-4 items-center">
                      <Select
                        value={form.watch('steunzoolPrijs') ? String(form.watch('steunzoolPrijs')) : undefined}
                        onValueChange={val => {
                          const numVal = val ? parseFloat(val) : undefined;
                          form.setValue('steunzoolPrijs', numVal);

                          // Optional: If user manually changes price to something else, should Talonette toggle off?
                          // Logic left to you, currently it stays enabled.
                        }}
                      >
                        <SelectTrigger className="w-1/3">
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

              {/* Special Notes */}
              <FormCard title={t('specialNotes')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormField
                    control={form.control}
                    name="bijzonderheden"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder={t('specialNotesPlaceholder')}
                            rows={5}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormBlock>
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
      </div>
    </BaseLayout>
  );
};

export default FormIntakeSteunzolenPage;
