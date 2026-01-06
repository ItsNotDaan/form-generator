import React, {useEffect, useState} from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Switch} from '@/components/ui/switch'; // Added Switch
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
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
  TALONETTE_PRIJS_OPTIES,
} from '@/lib/constants/formConstants';
import {ChevronRight} from 'lucide-react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {z} from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {scrollToFirstError} from '@/utils/formHelpers';
import {useFormPersistence} from '@/hooks/useFormPersistence';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ---------------------------------------------------------------------------
// SCHEMA DEFINITION
// ---------------------------------------------------------------------------
const formSchema = z.object({
  // Basic info
  welkPaar: z.string(),
  medischeIndicatie: z.string().optional(),
  schoenmaat: z.string(),

  // Talonette fields
  talonetteEnabled: z.boolean().optional(),
  talonetteVerhogingLinks: z.string().optional(),
  talonetteVerhogingRechts: z.string().optional(),
  talonettePrijs: z.number().optional(),

  // Steunzool fields
  steunzoolEnabled: z.boolean().optional(),
  steunzoolTypeGeneral: z.string().optional(),
  steunzoolAndersText: z.string().optional(),
  steunzoolCorrectieMiddenvoet: z.string().optional(),
  steunzoolCorrectieVoorvoet: z.string().optional(),
  steunzoolVvPellote: z.string().optional(),
  steunzoolPrijs: z.number().optional(),
  steunzoolPrijsNaam: z.string().optional(),

  // Calculated final price
  finalPrice: z.number().optional(),

  // Special notes
  bijzonderheden: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const FormIntakeSteunzolenPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // ---------------------------------------------------------------------------
  // FORM SETUP
  // ---------------------------------------------------------------------------
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      // Basic info
      welkPaar: 'Eerste paar',
      medischeIndicatie: '',
      schoenmaat: '',

      // Talonette state
      talonetteEnabled: false,
      talonetteVerhogingLinks: '',
      talonetteVerhogingRechts: '',
      talonettePrijs: TALONETTE_PRIJS_OPTIES[0]?.value || 0,

      // Steunzool defaults
      steunzoolEnabled: false,
      steunzoolTypeGeneral: STEUNZOOL_TYPE_OPTIES[0]?.value || '',
      steunzoolAndersText: '',
      steunzoolCorrectieMiddenvoet: CORRECTIE_VOORVOET_OPTIES[0]?.value || '',
      steunzoolCorrectieVoorvoet: CORRECTIE_VOORVOET_OPTIES[0]?.value || '',
      steunzoolVvPellote: CORRECTIE_VOORVOET_OPTIES[0]?.value || '',
      steunzoolPrijs: STEUNZOLEN_PRIJS_OPTIES[1]?.value || 0,
      steunzoolPrijsNaam: '',

      // Calculated final price
      finalPrice: undefined,

      // Special notes
      bijzonderheden: '',
    },
  });

  const {clearStorage} = useFormPersistence(
    'intakeSteunzolen',
    form.watch,
    form.setValue,
  );

  const steunzoolTypeGeneral = form.watch('steunzoolTypeGeneral');
  const talonetteEnabled = form.watch('talonetteEnabled');
  const steunzoolEnabled = form.watch('steunzoolEnabled');
  const talonettePrijs = form.watch('talonettePrijs');
  const steunzoolPrijs = form.watch('steunzoolPrijs');

  // Watch values for logic
  const finalPrice = React.useMemo(() => {
    const talonettePrice = talonetteEnabled ? talonettePrijs || 0 : 0;
    const steunzoolPrice = steunzoolEnabled ? steunzoolPrijs || 0 : 0;
    return talonettePrice + steunzoolPrice;
  }, [talonetteEnabled, talonettePrijs, steunzoolEnabled, steunzoolPrijs]);

  // Sync finalPrice to form state so it is available on submit
  React.useEffect(() => {
    form.setValue('finalPrice', finalPrice);
  }, [finalPrice, form]);

  // Debug
  console.log('Debug values:', {
    talonetteEnabled,
    talonettePrijs,
    steunzoolEnabled,
    steunzoolPrijs,
    finalPrice,
  });

  // ---------------------------------------------------------------------------
  // On Submit Handler for sending data to Redux store and end JSON
  // ---------------------------------------------------------------------------
  const onSubmit: SubmitHandler<FormData> = data => {
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'Steunzolen'}));
    }

    //Check if talonette is enabled
    const talonetteEnabled = !!data.talonetteEnabled;

    //Check if steunzool is enabled
    const steunzoolEnabled = !!data.steunzoolEnabled;

    dispatch(
      setIntakeSteunzolenData({
        welkPaar: data.welkPaar,
        medischeIndicatie: data.medischeIndicatie || '',
        schoenmaat: data.schoenmaat,

        // Talonette logic
        talonetteEnabled: data.talonetteEnabled,
        talonetteVerhogingLinks: data.talonetteVerhogingLinks || '',
        talonetteVerhogingRechts: data.talonetteVerhogingRechts || '',

        // Steunzool fields
        steunzoolTypeGeneral: steunzoolEnabled
          ? data.steunzoolTypeGeneral || ''
          : '',
        steunzoolAndersText: steunzoolEnabled
          ? data.steunzoolAndersText || ''
          : '',
        steunzoolCorrectieMiddenvoet: steunzoolEnabled
          ? data.steunzoolCorrectieMiddenvoet || ''
          : '',
        steunzoolCorrectieVoorvoet: steunzoolEnabled
          ? data.steunzoolCorrectieVoorvoet || ''
          : '',
        steunzoolVvPellote: steunzoolEnabled
          ? data.steunzoolVvPellote || ''
          : '',
        steunzoolPrijs: steunzoolEnabled ? data.steunzoolPrijs : undefined,
        steunzoolPrijsNaam: steunzoolEnabled
          ? data.steunzoolPrijsNaam || ''
          : '',

        // Final Price
        finalPrice: data.finalPrice || 0,

        // Special notes
        bijzonderheden: data.bijzonderheden || '',
      }),
    );

    void router.push(Routes.form_results);
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
              <FormCard title={t('description')} description={t('whichPair')}>
                <FormBlock columns={2} dividers={true} alignItems="start">
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
                      onChange={e =>
                        form.setValue('medischeIndicatie', e.target.value)
                      }
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
                    render={({field}) => (
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
                  Talonette Section 
                 ========================================================== */}
              <FormCard
                title={t('talonetteSection')}
                description={t('talonetteDescription')}
                toggleAble={true}
                toggleLabel={t('enableTalonette')}
                toggleId="talonette-toggle"
                defaultOpen={form.watch('talonetteEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('talonetteEnabled', isOpen, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                {/* Heel Raise */}
                <FormBlock columns={2} dividers={true}>
                  <FormItemWrapper label={t('insoleHeelRaiseLeft')}>
                    <Input
                      id="hak-verhoging-links"
                      type="number"
                      step="0.1"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('talonetteVerhogingLinks')}
                      onChange={e =>
                        form.setValue('talonetteVerhogingLinks', e.target.value)
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('insoleHeelRaiseRight')}>
                    <Input
                      id="hak-verhoging-rechts"
                      type="number"
                      step="0.1"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('talonetteVerhogingRechts')}
                      onChange={e =>
                        form.setValue(
                          'talonetteVerhogingRechts',
                          e.target.value,
                        )
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* ==========================================================
                  Steunzolen Section 
                 ========================================================== */}
              <FormCard
                title={t('insolesSection')}
                description={t('insolesDescription')}
                toggleAble={true}
                toggleLabel={t('enableInsoles')}
                toggleId="steunzolen-toggle"
                defaultOpen={form.watch('steunzoolEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('steunzoolEnabled', isOpen, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                {/* ROW 1: Type Selection */}
                <FormBlock columns={1} dividers={true} alignItems="start">
                  {/* Type Selection */}
                  <FormItemWrapper label={t('insoleType')}>
                    <Select
                      value={form.watch('steunzoolTypeGeneral') || undefined}
                      onValueChange={val =>
                        form.setValue('steunzoolTypeGeneral', val)
                      }
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder={t('insoleType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {STEUNZOOL_TYPE_OPTIES.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Conditional "Other" Textarea (Spans full width if visible) */}
                  {steunzoolTypeGeneral === 'Anders' && (
                    <FormItemWrapper
                      label={t('specifyOther')}
                      className="col-span-2 pt-2"
                    >
                      <Textarea
                        id="steunzool-anders"
                        placeholder={t('specifyPlaceholder')}
                        value={form.watch('steunzoolAndersText')}
                        onChange={e =>
                          form.setValue('steunzoolAndersText', e.target.value)
                        }
                        rows={2}
                        className="w-2/3 resize-none"
                      />
                    </FormItemWrapper>
                  )}
                </FormBlock>

                {/* ROW 2: Corrections */}
                <FormBlock
                  columns={3}
                  dividers={true}
                  title={t('insoleCorrections')}
                >
                  <FormItemWrapper label={t('midfootCorrection')}>
                    <Select
                      value={
                        form.watch('steunzoolCorrectieMiddenvoet') || undefined
                      }
                      onValueChange={val =>
                        form.setValue('steunzoolCorrectieMiddenvoet', val)
                      }
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
                      value={
                        form.watch('steunzoolCorrectieVoorvoet') || undefined
                      }
                      onValueChange={val =>
                        form.setValue('steunzoolCorrectieVoorvoet', val)
                      }
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
                      onValueChange={val =>
                        form.setValue('steunzoolVvPellote', val)
                      }
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

                {/* ROW 3: Steunzool type selectie */}
                <FormBlock columns={1} dividers={true} alignItems="start">
                  <FormItemWrapper label={t('insoleType')}>
                    <Select
                      value={
                        form.watch('steunzoolPrijs')
                          ? String(form.watch('steunzoolPrijs'))
                          : undefined
                      }
                      onValueChange={val => {
                        const numVal = val ? parseFloat(val) : undefined;
                        form.setValue('steunzoolPrijs', numVal);

                        // Optional: If user manually changes price to something else, should Talonette toggle off?
                        // Logic left to you, currently it stays enabled.
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('chooseOption')} />
                      </SelectTrigger>
                      <SelectContent>
                        {STEUNZOLEN_PRIJS_OPTIES.map(option => (
                          <SelectItem
                            key={option.value}
                            value={String(option.value)}
                          >
                            {t(option.label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* ==========================================================
                  Price Section 
                 ========================================================== */}
              <FormCard title={t('priceDetails')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <FormItemWrapper>
                    <div className="relative w-28">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        €
                      </span>
                      <Input
                        id="steunzool-prijs-value"
                        type="text"
                        value={finalPrice || 0}
                        readOnly
                        className="pl-6 bg-muted text-center cursor-not-allowed"
                        tabIndex={-1}
                        disabled
                      />
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
                    render={({field}) => (
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
