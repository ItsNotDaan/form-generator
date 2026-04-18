import React from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Switch} from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {DatePicker} from '@/components/ui/date-picker';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/backend/utils/routes';
import {
  PAIR_TYPE_OPTIONS,
  SUPPLIER_OPTIONS,
  INSOLE_TYPE_OPTIONS,
  INSOLE_PRICE_OPTIONS,
  MIDFOOT_CORRECTION_OPTIONS,
  FOREFOOT_CORRECTION_OPTIONS,
  PELOTTE_OPTIONS,
  HALLUX_MM_OPTIONS,
  DEEPENING_MM_OPTIONS,
} from '@/backend/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/backend/store/hooks';
import {setIntakeOSBData, setClientData} from '@/backend/store/slices/formData';

import {ChevronRight} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form} from '@/components/ui/form';
import {scrollToFirstError} from '@/backend/utils/formHelpers';
import {useFormPersistence} from '@/backend/hooks/useFormPersistence';
import {
  FunctieonderzoekBlock,
  InsoleAndTalonetteBlock,
  PairAndIndicationBlock,
  SideSelectionBlock,
  SpecialNotesBlock,
} from '@/components/forms/blocks';

// ---------------------------------------------------------------------------
// SCHEMA DEFINITION
// ---------------------------------------------------------------------------
const FormIntakeOSBPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    // Basic info
    whichPair: z.string(),
    medicalIndication: z.string().optional(),
    side: z.enum(['left', 'right', 'both'] as const).optional(),

    // Functieonderzoek (OSB-specific)
    goal: z.record(z.string(), z.boolean()),
    walkingFunctionIndication: z.string().optional(),
    walkingFunctionOtherText: z.string().optional(),

    // FunctieonderzoekBlock required fields
    pathologies: z.record(z.string(), z.boolean()),
    walkingDistanceAids: z.record(z.string(), z.boolean()),
    painPerception: z.string().optional(),
    footInspection: z.record(z.string(), z.boolean()),
    walkingDistance: z.record(z.string(), z.boolean()),
    painDuration: z.record(z.string(), z.boolean()),
    muscleStrengthDorsalFlexi: z.number().optional(),
    muscleStrengthPlantarFlexi: z.number().optional(),
    toeArea: z.record(z.string(), z.boolean()),
    midfoot: z.record(z.string(), z.boolean()),
    ankleJoint: z.record(z.string(), z.boolean()),
    knees: z.record(z.string(), z.boolean()),

    // Supplier and Product
    supplierName: z.string().optional(),
    orderDate: z.string().optional(),
    osb: z
      .object({
        articleCode: z.string().optional(),
        lengthSize: z.string().optional(),
        width: z.string().optional(),
        color: z.string().optional(),
        closure: z.string().optional(),
      })
      .optional(),

    // Steunzolen/Talonette Section
    heelRaiseEnabled: z.boolean().optional(),
    heelRaiseLeft: z.string().optional(),
    heelRaiseRight: z.string().optional(),

    insoleEnabled: z.boolean().optional(),
    insoleTypeGeneral: z.string().optional(),
    insolePriceName: z.string().optional(),
    insolePrice: z.number().optional(),
    insoleOtherText: z.string().optional(),
    insoleMidfootCorrection: z.string().optional(),
    insoleForefootCorrection: z.string().optional(),
    insoleForefootPad: z.string().optional(),

    // Supplement (van leest)
    supplementIndividueelEnabled: z.boolean().optional(),
    customInsoleIndividualLeft: z.boolean().optional(),
    customInsoleIndividualRight: z.boolean().optional(),

    // Zoolverstijving
    soleReinforcementEnabled: z.boolean().optional(),
    soleReinforcementLeft: z.boolean().optional(),
    soleReinforcementRight: z.boolean().optional(),

    // Afwikkelrol (onder schoen) - always visible
    rockerRollCmLeft: z.string().optional(),
    rockerRollCmRight: z.string().optional(),

    // Modules: Hallux valgus & Verdieping voorvoet - always visible
    halluxMmLeft: z.string().optional(),
    halluxMmRight: z.string().optional(),
    deepeningMmLeft: z.string().optional(),
    deepeningMmRight: z.string().optional(),

    specialNotes: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const defaultFormValues: FormData = {
    whichPair: PAIR_TYPE_OPTIONS[0]?.value || 'Eerste paar',
    medicalIndication: '',
    side: 'both',

    // Functieonderzoek (OSB-specific)
    goal: {},
    walkingFunctionIndication: '',
    walkingFunctionOtherText: '',

    // FunctieonderzoekBlock required defaults
    pathologies: {},
    walkingDistanceAids: {},
    painPerception: '0',
    footInspection: {},
    walkingDistance: {},
    painDuration: {},
    muscleStrengthDorsalFlexi: 3,
    muscleStrengthPlantarFlexi: 3,
    toeArea: {},
    midfoot: {},
    ankleJoint: {},
    knees: {},

    // Supplier and Product
    supplierName: '',
    orderDate: (() => {
      const now = new Date();
      return `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
    })(),
    osb: {
      articleCode: '',
      lengthSize: '',
      width: '',
      color: '',
      closure: '',
    },

    // Steunzolen/Talonette Section
    heelRaiseEnabled: false,
    heelRaiseLeft: '',
    heelRaiseRight: '',

    insoleEnabled: false,
    insoleTypeGeneral: '',
    insolePriceName: INSOLE_PRICE_OPTIONS[1]?.label || '',
    insolePrice: INSOLE_PRICE_OPTIONS[1]?.value,
    insoleOtherText: '',
    insoleMidfootCorrection: '',
    insoleForefootCorrection: '',
    insoleForefootPad: '',

    // Supplement (van leest)
    supplementIndividueelEnabled: false,
    customInsoleIndividualLeft: false,
    customInsoleIndividualRight: false,

    // Zoolverstijving
    soleReinforcementEnabled: false,
    soleReinforcementLeft: false,
    soleReinforcementRight: false,

    // Afwikkelrol (onder schoen)
    rockerRollCmLeft: '',
    rockerRollCmRight: '',

    // Modules: Hallux valgus & Verdieping voorvoet
    halluxMmLeft: HALLUX_MM_OPTIONS[0]?.value,
    halluxMmRight: HALLUX_MM_OPTIONS[0]?.value,
    deepeningMmLeft: DEEPENING_MM_OPTIONS[0]?.value,
    deepeningMmRight: DEEPENING_MM_OPTIONS[0]?.value,

    specialNotes: '',
  };

  // ---------------------------------------------------------------------------
  // FORM SETUP
  // ---------------------------------------------------------------------------
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: defaultFormValues,
  });

  // Persist form state to localStorage (survives refresh)
  const {clearStorage} = useFormPersistence(
    'intakeOSB',
    form.watch,
    form.setValue,
  );

  // Sync insolePriceName whenever insolePrice changes
  const insolePriceValue = form.watch('insolePrice');
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

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------
  const handleResetDraft = () => {
    clearStorage();
    form.reset(defaultFormValues);
  };

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'OSB'}));
    }

    dispatch(
      setIntakeOSBData({
        whichPair: data.whichPair,
        medicalIndication: data.medicalIndication || '',
        side: data.side || 'both',

        // Functieonderzoek
        goal: data.goal as Record<string, boolean>,
        walkingFunctionIndication: data.walkingFunctionIndication || '',
        walkingFunctionOtherText: data.walkingFunctionOtherText || '',

        // Supplier and Product
        supplierName: data.supplierName || '',
        orderDate: data.orderDate || '',
        osb: {
          articleCode: data.osb?.articleCode || '',
          lengthSize: data.osb?.lengthSize || '',
          width: data.osb?.width || '',
          color: data.osb?.color || '',
          closure: data.osb?.closure || '',
        },

        // Steunzolen/Talonette (conditional based on toggle)
        heelRaiseLeft: data.heelRaiseEnabled ? data.heelRaiseLeft || '' : '',
        heelRaiseRight: data.heelRaiseEnabled ? data.heelRaiseRight || '' : '',
        insoleTypeGeneral: data.insoleEnabled
          ? data.insoleTypeGeneral || ''
          : '',
        insolePriceName: data.insoleEnabled ? data.insolePriceName || '' : '',
        insolePrice: data.insoleEnabled ? data.insolePrice : undefined,
        insoleOtherText: data.insoleEnabled ? data.insoleOtherText || '' : '',
        insoleMidfootCorrection: data.insoleEnabled
          ? data.insoleMidfootCorrection || ''
          : '',
        insoleForefootCorrection: data.insoleEnabled
          ? data.insoleForefootCorrection || ''
          : '',
        insoleForefootPad: data.insoleEnabled
          ? data.insoleForefootPad || ''
          : '',

        // Supplement (conditional based on toggle)
        customInsoleIndividualLeft: !!data.customInsoleIndividualLeft,
        customInsoleIndividualRight: !!data.customInsoleIndividualRight,

        // Zoolverstijving (conditional based on toggle)
        soleReinforcementLeft: !!data.soleReinforcementLeft,
        soleReinforcementRight: !!data.soleReinforcementRight,

        // Afwikkelrol
        rockerRollCmLeft: data.rockerRollCmLeft || '',
        rockerRollCmRight: data.rockerRollCmRight || '',

        // Modules
        halluxMmLeft: data.halluxMmLeft || HALLUX_MM_OPTIONS[0]?.value,
        halluxMmRight: data.halluxMmRight || HALLUX_MM_OPTIONS[0]?.value,
        deepeningMmLeft: data.deepeningMmLeft || DEEPENING_MM_OPTIONS[0]?.value,
        deepeningMmRight:
          data.deepeningMmRight || DEEPENING_MM_OPTIONS[0]?.value,

        specialNotes: data.specialNotes || '',
      }),
    );

    clearStorage();

    void router.push(Routes.form_results);
  };

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------
  return (
    <BaseLayout title={t('intakeOsb')} currentStep={3}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('intakeOsb')}
          </h1>
          <p className="text-lg text-muted-foreground">{t('osbDescription')}</p>
        </div>

        <FormSection className="max-w-6xl mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* PairAndIndicationBlock */}
              <PairAndIndicationBlock form={form} t={t} />

              {/* SideSelectionBlock */}
              <SideSelectionBlock form={form} t={t} includeAmputation={false} />

              {/* FunctieonderzoekBlock */}
              <FunctieonderzoekBlock form={form} t={t} />

              {/* Product Specifications */}
              <FormCard title={t('productSpecifications')}>
                {/* Supplier and Order Date */}
                <FormBlock columns={2} dividers={true} hoverEffect={true}>
                  <FormItemWrapper label={t('supplier')}>
                    <Select
                      value={form.watch('supplierName') || ''}
                      onValueChange={v => form.setValue('supplierName', v)}
                    >
                      <SelectTrigger className="w-2/3">
                        <SelectValue placeholder={t('supplier')} />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPLIER_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>

                  <FormItemWrapper label={t('orderDate')}>
                    <DatePicker
                      value={
                        form.watch('orderDate') &&
                        form.watch('orderDate') !== ''
                          ? (() => {
                              const dateStr = form.watch('orderDate')!;
                              const [day, month, year] = dateStr.split('-');
                              return new Date(
                                Number(year),
                                Number(month) - 1,
                                Number(day),
                              );
                            })()
                          : undefined
                      }
                      onChange={selectedDate =>
                        form.setValue(
                          'orderDate',
                          selectedDate
                            ? `${selectedDate.getDate().toString().padStart(2, '0')}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getFullYear()}`
                            : '',
                        )
                      }
                      placeholder={t('selectDate')}
                      disabled={d => d > new Date()}
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>

                {/* Product Details */}
                <FormBlock columns={2} dividers={true} hoverEffect={true}>
                  <FormItemWrapper label={t('articleCode')}>
                    <Input
                      id="art-code"
                      placeholder={t('articleCode')}
                      value={form.watch('osb')?.articleCode || ''}
                      onChange={e =>
                        form.setValue('osb', {
                          ...(form.getValues('osb') || {}),
                          articleCode: e.target.value,
                        })
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('color')}>
                    <Input
                      id="color-osb"
                      placeholder={t('color')}
                      value={form.watch('osb')?.color || ''}
                      onChange={e =>
                        form.setValue('osb', {
                          ...(form.getValues('osb') || {}),
                          color: e.target.value,
                        })
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>

                <FormBlock columns={3} dividers={true} hoverEffect={true}>
                  <FormItemWrapper label={t('width')}>
                    <Input
                      id="width"
                      placeholder={t('width')}
                      value={form.watch('osb')?.width || ''}
                      onChange={e =>
                        form.setValue('osb', {
                          ...(form.getValues('osb') || {}),
                          width: e.target.value,
                        })
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('lengthSize')}>
                    <Input
                      id="lengte-maat"
                      placeholder={t('lengthSize')}
                      value={form.watch('osb')?.lengthSize || ''}
                      onChange={e =>
                        form.setValue('osb', {
                          ...(form.getValues('osb') || {}),
                          lengthSize: e.target.value,
                        })
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('closure')}>
                    <Input
                      id="closure-osb"
                      placeholder={t('closure')}
                      value={form.watch('osb')?.closure || ''}
                      onChange={e =>
                        form.setValue('osb', {
                          ...(form.getValues('osb') || {}),
                          closure: e.target.value,
                        })
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Modules */}
              <FormCard
                title={t('modules')}
                toggleAble={true}
                toggleLabel={t('addModules') || t('modules')}
                toggleId="modules-toggle"
                defaultOpen={true}
                onToggleChange={isOpen => {
                  if (!isOpen) {
                    form.setValue('soleReinforcementLeft', false);
                    form.setValue('soleReinforcementRight', false);
                    form.setValue('rockerRollCmLeft', '');
                    form.setValue('rockerRollCmRight', '');
                    form.setValue('halluxMmLeft', 'no');
                    form.setValue('halluxMmRight', 'no');
                    form.setValue('deepeningMmLeft', 'no');
                    form.setValue('deepeningMmRight', 'no');
                    form.setValue('customInsoleIndividualLeft', false);
                    form.setValue('customInsoleIndividualRight', false);
                  }
                }}
              >
                {/* Row 1: Sole Stiffening | Rocker Sole */}
                <FormBlock columns={2} dividers={true} hoverEffect={true}>
                  {/* Sole Stiffening - Left/Right Switches */}
                  <FormItemWrapper>
                    <FormBlock
                      columns={2}
                      dividers={true}
                      title={t('soleStiffening')}
                      hoverEffect={false}
                      className="border-0 bg-transparent"
                      contentClassName="lg:*:!px-8"
                    >
                      <FormItemWrapper label={t('left')}>
                        <Switch
                          id="sole-stiffening-left"
                          checked={!!form.watch('soleReinforcementLeft')}
                          onCheckedChange={checked =>
                            form.setValue('soleReinforcementLeft', !!checked)
                          }
                        />
                      </FormItemWrapper>

                      <FormItemWrapper label={t('right')}>
                        <Switch
                          id="sole-stiffening-right"
                          checked={!!form.watch('soleReinforcementRight')}
                          onCheckedChange={checked =>
                            form.setValue('soleReinforcementRight', !!checked)
                          }
                        />
                      </FormItemWrapper>
                    </FormBlock>
                  </FormItemWrapper>

                  {/* Rocker Sole - Left/Right cm Input */}
                  <FormItemWrapper>
                    <FormBlock
                      columns={2}
                      dividers={true}
                      title={t('rockerSole')}
                      hoverEffect={false}
                      className="border-0 bg-transparent"
                    >
                      <FormItemWrapper label={`${t('left')} (cm)`}>
                        <Input
                          id="rocker-left-cm"
                          type="number"
                          step="0.1"
                          placeholder={t('cmPlaceholder')}
                          value={form.watch('rockerRollCmLeft') || ''}
                          onChange={e =>
                            form.setValue('rockerRollCmLeft', e.target.value)
                          }
                          className="w-2/3"
                        />
                      </FormItemWrapper>

                      <FormItemWrapper label={`${t('right')} (cm)`}>
                        <Input
                          id="rocker-right-cm"
                          type="number"
                          step="0.1"
                          placeholder={t('cmPlaceholder')}
                          value={form.watch('rockerRollCmRight') || ''}
                          onChange={e =>
                            form.setValue('rockerRollCmRight', e.target.value)
                          }
                          className="w-2/3"
                        />
                      </FormItemWrapper>
                    </FormBlock>
                  </FormItemWrapper>
                </FormBlock>

                {/* Row 2: Hallux Valgus | Forefoot Deepening */}
                <FormBlock columns={2} dividers={true} hoverEffect={true}>
                  {/* Hallux Valgus */}
                  <FormItemWrapper>
                    <FormBlock
                      columns={2}
                      dividers={true}
                      title={t('halluxValgus')}
                      hoverEffect={false}
                      className="border-0 bg-transparent"
                      contentClassName="lg:*:!px-8"
                    >
                      <FormItemWrapper label={t('left')}>
                        <Select
                          value={form.watch('halluxMmLeft') || 'no'}
                          onValueChange={v => form.setValue('halluxMmLeft', v)}
                        >
                          <SelectTrigger id="hallux-left">
                            <SelectValue placeholder={t('halluxMm')} />
                          </SelectTrigger>
                          <SelectContent>
                            {HALLUX_MM_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItemWrapper>

                      <FormItemWrapper label={t('right')}>
                        <Select
                          value={form.watch('halluxMmRight') || 'no'}
                          onValueChange={v => form.setValue('halluxMmRight', v)}
                        >
                          <SelectTrigger id="hallux-right">
                            <SelectValue placeholder={t('halluxMm')} />
                          </SelectTrigger>
                          <SelectContent>
                            {HALLUX_MM_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItemWrapper>
                    </FormBlock>
                  </FormItemWrapper>

                  {/* Forefoot Deepening */}
                  <FormItemWrapper>
                    <FormBlock
                      columns={2}
                      dividers={true}
                      title={t('forefootDepressions')}
                      hoverEffect={false}
                      className="border-0 bg-transparent"
                      contentClassName="lg:*:!px-8"
                    >
                      <FormItemWrapper label={t('left')}>
                        <Select
                          value={form.watch('deepeningMmLeft') || 'no'}
                          onValueChange={v =>
                            form.setValue('deepeningMmLeft', v)
                          }
                        >
                          <SelectTrigger id="deepening-left">
                            <SelectValue placeholder={t('deepeningMm')} />
                          </SelectTrigger>
                          <SelectContent>
                            {DEEPENING_MM_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItemWrapper>

                      <FormItemWrapper label={t('right')}>
                        <Select
                          value={form.watch('deepeningMmRight') || 'no'}
                          onValueChange={v =>
                            form.setValue('deepeningMmRight', v)
                          }
                        >
                          <SelectTrigger id="deepening-right">
                            <SelectValue placeholder={t('deepeningMm')} />
                          </SelectTrigger>
                          <SelectContent>
                            {DEEPENING_MM_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItemWrapper>
                    </FormBlock>
                  </FormItemWrapper>
                </FormBlock>

                {/* Row 3: Supplement (van leest/schuimdoos) - Centered */}
                <FormBlock columns={1} alignItems="center">
                  <FormItemWrapper label={t('supplement')}>
                    <div className="flex items-center justify-center gap-8">
                      <div className="flex items-center gap-3">
                        <Switch
                          id="supplement-left"
                          checked={!!form.watch('customInsoleIndividualLeft')}
                          onCheckedChange={checked =>
                            form.setValue(
                              'customInsoleIndividualLeft',
                              !!checked,
                            )
                          }
                        />
                        <Label htmlFor="supplement-left">{t('left')}</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          id="supplement-right"
                          checked={!!form.watch('customInsoleIndividualRight')}
                          onCheckedChange={checked =>
                            form.setValue(
                              'customInsoleIndividualRight',
                              !!checked,
                            )
                          }
                        />
                        <Label htmlFor="supplement-right">{t('right')}</Label>
                      </div>
                    </div>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Steunzolen/Talonette Section (Combined) */}
              <InsoleAndTalonetteBlock
                form={form}
                t={t}
                mode="combined"
                resetFieldsOnToggleOff={true}
                includePriceSelector={true}
              />

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

export default FormIntakeOSBPage;
