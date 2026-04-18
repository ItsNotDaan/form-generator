import React, {useEffect, useState} from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/backend/utils/routes';
import {useAppDispatch, useAppSelector} from '@/backend/store/hooks';
import {
  setIntakeSteunzolenData,
  setClientData,
} from '@/backend/store/slices/formData';
import {
  INSOLE_TYPE_OPTIONS,
  MIDFOOT_CORRECTION_OPTIONS,
  FOREFOOT_CORRECTION_OPTIONS,
  PELOTTE_OPTIONS,
  INSOLE_PRICE_OPTIONS,
  HEEL_RAISE_PRICE_OPTIONS,
} from '@/backend/constants/formConstants';
import {ChevronRight} from 'lucide-react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {z} from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {scrollToFirstError} from '@/backend/utils/formHelpers';
import {useFormPersistence} from '@/backend/hooks/useFormPersistence';
import {
  InsoleAndTalonetteBlock,
  PairAndIndicationBlock,
  SpecialNotesBlock,
} from '@/components/forms/blocks';

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
  const defaultFormValues: FormData = {
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
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: defaultFormValues,
  });

  const {clearStorage} = useFormPersistence(
    'intakeInsoles',
    form.watch,
    form.setValue,
  );

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------
  const handleResetDraft = () => {
    clearStorage();
    form.reset(defaultFormValues);
  };

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

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------
  return (
    <BaseLayout title={t('intakeInsoles')} currentStep={3}>
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
              {/* PairAndIndicationBlock */}
              <PairAndIndicationBlock form={form} t={t} />

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

              {/* Talonette + Steunzolen */}
              <InsoleAndTalonetteBlock form={form} t={t} mode="split" />

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

              {/* SpecialNotesBlock */}
              <SpecialNotesBlock form={form} t={t} />

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
