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
  PAIR_TYPE_OPTIONS,
  INSOLE_TYPE_OPTIONS,
  MIDFOOT_CORRECTION_OPTIONS,
  FOREFOOT_CORRECTION_OPTIONS,
  PELOTTE_OPTIONS,
  INSOLE_PRICE_OPTIONS,
  HEEL_RAISE_PRICE_OPTIONS,
} from '@/domain/form/constants/formConstants';
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
  whichPair: z.string(),
  medicalIndication: z.string().optional(),
  shoeSize: z.string(),

  // Talonette fields
  heelRaiseEnabled: z.boolean().optional(),
  heelRaiseLeft: z.string().optional(),
  heelRaiseRight: z.string().optional(),
  heelRaisePrice: z.number().optional(),

  // Steunzool fields
  insoleEnabled: z.boolean().optional(),
  insoleTypeGeneral: z.string().optional(),
  insoleOtherText: z.string().optional(),
  insoleMidfootCorrection: z.string().optional(),
  insoleForefootCorrection: z.string().optional(),
  insoleForefootPad: z.string().optional(),
  insolePrice: z.number().optional(),
  insolePriceName: z.string().optional(),

  // Calculated final price
  finalPrice: z.number().optional(),

  // Special notes
  specialNotes: z.string().optional(),
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
      whichPair: 'Eerste paar',
      medicalIndication: '',
      shoeSize: '',

      // Talonette state
      heelRaiseEnabled: false,
      heelRaiseLeft: '',
      heelRaiseRight: '',
      heelRaisePrice: HEEL_RAISE_PRICE_OPTIONS[0]?.value || 0,

      // Steunzool defaults
      insoleEnabled: false,
      insoleTypeGeneral: INSOLE_TYPE_OPTIONS[0]?.value || '',
      insoleOtherText: '',
      insoleMidfootCorrection: FOREFOOT_CORRECTION_OPTIONS[0]?.value || '',
      insoleForefootCorrection: FOREFOOT_CORRECTION_OPTIONS[0]?.value || '',
      insoleForefootPad: FOREFOOT_CORRECTION_OPTIONS[0]?.value || '',
      insolePrice: INSOLE_PRICE_OPTIONS[1]?.value || 0,
      insolePriceName: INSOLE_PRICE_OPTIONS[1]?.label || '',

      // Calculated final price
      finalPrice: undefined,

      // Special notes
      specialNotes: '',
    },
  });

  const {clearStorage} = useFormPersistence(
    'intakeInsoles',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  const insoleTypeGeneral = form.watch('insoleTypeGeneral');
  const heelRaiseEnabled = form.watch('heelRaiseEnabled');
  const insoleEnabled = form.watch('insoleEnabled');
  const heelRaisePriceValue = form.watch('heelRaisePrice');
  const insolePriceValue = form.watch('insolePrice');

  // Watch values for logic
  const finalPrice = React.useMemo(() => {
    const heelRaisePrice = heelRaiseEnabled ? heelRaisePriceValue || 0 : 0;
    const insolePrice = insoleEnabled ? insolePriceValue || 0 : 0;
    return heelRaisePrice + insolePrice;
  }, [heelRaiseEnabled, heelRaisePriceValue, insoleEnabled, insolePriceValue]);

  // Sync finalPrice to form state so it is available on submit
  React.useEffect(() => {
    form.setValue('finalPrice', finalPrice);
  }, [finalPrice, form]);

  // Sync insolePriceName whenever insolePrice changes
  // This ensures the price name is always in sync with the price value
  React.useEffect(() => {
    const currentPrice = form.getValues('insolePrice');
    if (currentPrice) {
      const selectedOption = INSOLE_PRICE_OPTIONS.find(
        option => option.value === currentPrice,
      );
      if (selectedOption && selectedOption.label) {
        form.setValue('insolePriceName', selectedOption.label);
      }
    }
  }, [insolePriceValue, form]);

  // Debug
  console.log('Debug values:', {
    heelRaiseEnabled,
    heelRaisePrice: heelRaisePriceValue,
    insoleEnabled,
    insolePrice: insolePriceValue,
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
    const heelRaiseEnabled = !!data.heelRaiseEnabled;

    //Check if steunzool is enabled
    const insoleEnabled = !!data.insoleEnabled;

    dispatch(
      setIntakeSteunzolenData({
        whichPair: data.whichPair,
        medicalIndication: data.medicalIndication || '',
        shoeSize: data.shoeSize,

        // Talonette logic
        heelRaiseEnabled: data.heelRaiseEnabled,
        heelRaiseLeft: data.heelRaiseLeft || '',
        heelRaiseRight: data.heelRaiseRight || '',

        // Steunzool fields
        insoleTypeGeneral: insoleEnabled ? data.insoleTypeGeneral || '' : '',
        insoleOtherText: insoleEnabled ? data.insoleOtherText || '' : '',
        insoleMidfootCorrection: insoleEnabled
          ? data.insoleMidfootCorrection || ''
          : '',
        insoleForefootCorrection: insoleEnabled
          ? data.insoleForefootCorrection || ''
          : '',
        insoleForefootPad: insoleEnabled ? data.insoleForefootPad || '' : '',
        insolePrice: insoleEnabled ? data.insolePrice : undefined,
        insolePriceName: insoleEnabled ? data.insolePriceName || '' : '',

        // Final Price
        finalPrice: data.finalPrice || 0,

        // Special notes
        specialNotes: data.specialNotes || '',
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
                      value={form.watch('whichPair')}
                      onValueChange={val => form.setValue('whichPair', val)}
                      className="w-2/3"
                    >
                      <div className="flex flex-col gap-3">
                        {PAIR_TYPE_OPTIONS.map(option => (
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
                      value={form.watch('medicalIndication')}
                      onChange={e =>
                        form.setValue('medicalIndication', e.target.value)
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
                    name="shoeSize"
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
                defaultOpen={form.watch('heelRaiseEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('heelRaiseEnabled', isOpen, {
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
                      value={form.watch('heelRaiseLeft')}
                      onChange={e =>
                        form.setValue('heelRaiseLeft', e.target.value)
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
                      value={form.watch('heelRaiseRight')}
                      onChange={e =>
                        form.setValue('heelRaiseRight', e.target.value)
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
                defaultOpen={form.watch('insoleEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('insoleEnabled', isOpen, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                {/* ROW 1: Type Selection */}
                <FormBlock columns={1} dividers={true} alignItems="start">
                  {/* Type Selection */}
                  <FormItemWrapper label={t('insoleTypeGeneral')}>
                    <Select
                      value={form.watch('insoleTypeGeneral') || undefined}
                      onValueChange={val => {
                        form.setValue('insoleTypeGeneral', val);

                        // Clear the insoleOtherText if not selecting Anders
                        if (val !== 'Anders') {
                          form.setValue('insoleOtherText', '');
                        }
                      }}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder={t('insoleType')} />
                      </SelectTrigger>
                      <SelectContent>
                        {INSOLE_TYPE_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  {/* Conditional "Other" Textarea (Spans full width if visible) */}
                  {insoleTypeGeneral === 'Anders' && (
                    <FormItemWrapper
                      label={t('specifyOther')}
                      className="col-span-2 pt-2"
                    >
                      <Textarea
                        id="steunzool-anders"
                        placeholder={t('specifyPlaceholder')}
                        value={form.watch('insoleOtherText')}
                        onChange={e =>
                          form.setValue('insoleOtherText', e.target.value)
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
                      value={form.watch('insoleMidfootCorrection') || undefined}
                      onValueChange={val =>
                        form.setValue('insoleMidfootCorrection', val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('chooseOption')} />
                      </SelectTrigger>
                      <SelectContent>
                        {MIDFOOT_CORRECTION_OPTIONS.map(option => (
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
                        form.watch('insoleForefootCorrection') || undefined
                      }
                      onValueChange={val =>
                        form.setValue('insoleForefootCorrection', val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('chooseOption')} />
                      </SelectTrigger>
                      <SelectContent>
                        {FOREFOOT_CORRECTION_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  <FormItemWrapper label={t('forefootPad')}>
                    <Select
                      value={form.watch('insoleForefootPad') || undefined}
                      onValueChange={val =>
                        form.setValue('insoleForefootPad', val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('chooseOption')} />
                      </SelectTrigger>
                      <SelectContent>
                        {PELOTTE_OPTIONS.map(option => (
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
                  <FormItemWrapper label={t('insolePriceName')}>
                    <Select
                      value={
                        form.watch('insolePrice')
                          ? String(form.watch('insolePrice'))
                          : undefined
                      }
                      onValueChange={val => {
                        const numVal = val ? parseFloat(val) : undefined;
                        // Find the corresponding label for this price value
                        const selectedOption = INSOLE_PRICE_OPTIONS.find(
                          option => option.value === numVal,
                        );
                        form.setValue('insolePrice', numVal);
                        form.setValue(
                          'insolePriceName',
                          selectedOption?.label || '',
                        );

                        // Optional: If user manually changes price to something else, should Talonette toggle off?
                        // Logic left to you, currently it stays enabled.
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('chooseOption')} />
                      </SelectTrigger>
                      <SelectContent>
                        {INSOLE_PRICE_OPTIONS.map(option => (
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
                    name="specialNotes"
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
                  onClick={handleResetDraft}
                >
                  {t('reset')}
                </Button>
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
