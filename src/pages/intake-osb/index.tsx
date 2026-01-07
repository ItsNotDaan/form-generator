import React from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
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
import {Routes} from '@/lib/routes';
import {
  PAARTYPE_OPTIES,
  DOEL_OPTIES,
  LOOPFUNCTIE_INDICATIE_OPTIES,
  LEVERANCIER_OPTIES,
  INSOLE_TYPE_OPTIONS,
  CORRECTIE_MIDDENVOET_OPTIES,
  CORRECTIE_VOORVOET_OPTIES,
  PELLOTE_OPTIES,
} from '@/lib/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {setIntakeOSBData, setClientData} from '@/domain/store/slices/formData';

import {ChevronRight} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form} from '@/components/ui/form';
import {scrollToFirstError} from '@/utils/formHelpers';
import {useFormPersistence} from '@/hooks/useFormPersistence';

const FormIntakeOSBPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    whichPair: z.string(),
    medicalIndication: z.string().optional(),
    side: z.enum(['left', 'right', 'both'] as const).optional(),

    // Functieonderzoek
    goal: z.record(z.string(), z.boolean()),
    walkingFunctionIndication: z.string().optional(),
    walkingFunctionOtherText: z.string().optional(),

    // Supplier and Product
    supplierName: z.string().optional(),
    orderDate: z.string().optional(),
    productSpecifications: z.object({
      articleCode: z.string().optional(),
      lengthSize: z.string().optional(),
      width: z.string().optional(),
      color: z.string().optional(),
      closure: z.string().optional(),
    }),

    // Steunzolen/Talonette Section
    heelRaiseEnabled: z.boolean().optional(),
    heelRaiseLeft: z.string().optional(),
    heelRaiseRight: z.string().optional(),

    insoleEnabled: z.boolean().optional(),
    insoleTypeGeneral: z.string().optional(),
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

    // Afwikkelrol (onder schoen)
    afwikkelrolEnabled: z.boolean().optional(),
    rockerRollCmLeft: z.string().optional(),
    rockerRollCmRight: z.string().optional(),

    specialNotes: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      whichPair: PAARTYPE_OPTIES[0]?.value || 'Eerste paar',
      medicalIndication: '',
      side: 'both',

      // Functieonderzoek
      goal: {},
      walkingFunctionIndication: '',
      walkingFunctionOtherText: '',

      // Supplier and Product
      supplierName: '',
      orderDate: new Date().toISOString().split('T')[0],
      productSpecifications: {
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
      afwikkelrolEnabled: false,
      rockerRollCmLeft: '',
      rockerRollCmRight: '',

      specialNotes: '',
    },
  });

  // Persist form state to localStorage (survives refresh)
  const {clearStorage} = useFormPersistence(
    'intakeOSB',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
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
        productSpecifications: {
          articleCode: data.productSpecifications?.articleCode || '',
          lengthSize: data.productSpecifications?.lengthSize || '',
          width: data.productSpecifications?.width || '',
          color: data.productSpecifications?.color || '',
          closure: data.productSpecifications?.closure || '',
        },

        // Steunzolen/Talonette (conditional based on toggle)
        heelRaiseLeft: data.heelRaiseEnabled ? data.heelRaiseLeft || '' : '',
        heelRaiseRight: data.heelRaiseEnabled ? data.heelRaiseRight || '' : '',
        insoleTypeGeneral: data.insoleEnabled
          ? data.insoleTypeGeneral || ''
          : '',
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
        customInsoleIndividualLeft: data.supplementIndividueelEnabled
          ? !!data.customInsoleIndividualLeft
          : false,
        customInsoleIndividualRight: data.supplementIndividueelEnabled
          ? !!data.customInsoleIndividualRight
          : false,

        // Zoolverstijving (conditional based on toggle)
        soleReinforcementLeft: data.soleReinforcementEnabled
          ? !!data.soleReinforcementLeft
          : false,
        soleReinforcementRight: data.soleReinforcementEnabled
          ? !!data.soleReinforcementRight
          : false,

        // Afwikkelrol (conditional based on toggle)
        rockerRollCmLeft: data.afwikkelrolEnabled
          ? data.rockerRollCmLeft || ''
          : '',
        rockerRollCmRight: data.afwikkelrolEnabled
          ? data.rockerRollCmRight || ''
          : '',

        specialNotes: data.specialNotes || '',
      }),
    );

    clearStorage();

    void router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeOsb')} currentStep={2}>
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
              {/* Section 0.1: Description and which pair */}
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
                        {PAARTYPE_OPTIES.map(option => (
                          <Label
                            key={option.value}
                            className="flex items-center gap-3 rounded-md border bg-background px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors"
                            htmlFor={`osb-${option.value}`}
                          >
                            <RadioGroupItem
                              id={`osb-${option.value}`}
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

              {/* Section 0.2: Left/Right/Both selector */}
              <FormCard
                title={t('side')}
                description={t('chooseSideDescription')}
              >
                <FormBlock columns={1} alignItems="center">
                  <FormItemWrapper>
                    <RadioGroup
                      value={form.watch('side') || 'both'}
                      onValueChange={val =>
                        form.setValue('side', val as 'left' | 'right' | 'both')
                      }
                    >
                      <div className="flex gap-6 justify-center">
                        <Label className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value="both" />
                          {t('both')}
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value="left" />
                          {t('left')}
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value="right" />
                          {t('right')}
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Functieonderzoek */}
              <FormCard
                title={t('functionalResearch')}
                description={t('functionalResearchDescription')}
              >
                {/* Doel (Goals) */}
                <FormBlock
                  title={t('goals')}
                  columns={4}
                  dividers={false}
                  centerTitle={true}
                >
                  {DOEL_OPTIES.map(optie => (
                    <Label
                      key={optie.fullKey}
                      className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors has-aria-checked:bg-accent/30"
                    >
                      <Checkbox
                        id={`goal-${optie.fullKey}`}
                        checked={
                          (form.watch('goal')[optie.fullKey] as boolean) ||
                          false
                        }
                        onCheckedChange={checked =>
                          form.setValue('goal', {
                            ...form.getValues('goal'),
                            [optie.fullKey]: !!checked,
                          })
                        }
                        className=""
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none">{optie.label}</p>
                      </div>
                    </Label>
                  ))}
                </FormBlock>

                {/* Loopfunctie */}
                <FormBlock title={t('walkingFunction')} centerTitle={true}>
                  <FormItemWrapper>
                    <Select
                      value={form.watch('walkingFunctionIndication') || ''}
                      onValueChange={v =>
                        form.setValue('walkingFunctionIndication', v)
                      }
                    >
                      <SelectTrigger className="w-2/3">
                        <SelectValue
                          placeholder={t('walkingFunctionIndication')}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {LOOPFUNCTIE_INDICATIE_OPTIES.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItemWrapper>
                </FormBlock>

                {/* Conditional "Anders" textarea */}
                {form.watch('walkingFunctionIndication') === 'Anders' && (
                  <FormBlock centerTitle={false}>
                    <FormItemWrapper label={t('otherWalkingFunction')}>
                      <Textarea
                        id="loopfunctie-anders"
                        placeholder={t('otherWalkingFunctionPlaceholder')}
                        value={form.watch('walkingFunctionOtherText')}
                        onChange={e =>
                          form.setValue(
                            'walkingFunctionOtherText',
                            e.target.value,
                          )
                        }
                        rows={2}
                        className="w-2/3 resize-none"
                      />
                    </FormItemWrapper>
                  </FormBlock>
                )}
              </FormCard>

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
                        {LEVERANCIER_OPTIES.map(opt => (
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
                          ? new Date(form.watch('orderDate')!)
                          : undefined
                      }
                      onChange={selectedDate =>
                        form.setValue(
                          'orderDate',
                          selectedDate
                            ? selectedDate.toISOString().split('T')[0]
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
                      value={
                        form.watch('productSpecifications')?.articleCode || ''
                      }
                      onChange={e =>
                        form.setValue('productSpecifications', {
                          ...form.getValues('productSpecifications'),
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
                      value={form.watch('productSpecifications')?.color || ''}
                      onChange={e =>
                        form.setValue('productSpecifications', {
                          ...form.getValues('productSpecifications'),
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
                      value={form.watch('productSpecifications')?.width || ''}
                      onChange={e =>
                        form.setValue('productSpecifications', {
                          ...form.getValues('productSpecifications'),
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
                      value={
                        form.watch('productSpecifications')?.lengthSize || ''
                      }
                      onChange={e =>
                        form.setValue('productSpecifications', {
                          ...form.getValues('productSpecifications'),
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
                      value={form.watch('productSpecifications')?.closure || ''}
                      onChange={e =>
                        form.setValue('productSpecifications', {
                          ...form.getValues('productSpecifications'),
                          closure: e.target.value,
                        })
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Steunzolen/Talonette Section (Combined) */}
              <FormCard
                title={t('insolesAndTalonette')}
                description={t('insolesAndTalonetteDescription')}
                toggleAble={true}
                toggleLabel={t('addInsolesOrTalonette')}
                toggleId="steunzolen-talonette-toggle"
                defaultOpen={
                  form.watch('insoleEnabled') || form.watch('heelRaiseEnabled')
                }
                onToggleChange={isOpen => {
                  form.setValue('insoleEnabled', isOpen);
                  form.setValue('heelRaiseEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('heelRaiseLeft', '');
                    form.setValue('heelRaiseRight', '');
                    form.setValue('insoleTypeGeneral', '');
                    form.setValue('insoleOtherText', '');
                    form.setValue('insoleMidfootCorrection', '');
                    form.setValue('insoleForefootCorrection', '');
                    form.setValue('insoleForefootPad', '');
                  }
                }}
              >
                {/* Talonette Heel Raise */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  title={t('talonetteSection')}
                >
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

                {/* Steunzool Type Selection */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  title={t('insoleType')}
                  alignItems="start"
                >
                  <FormItemWrapper className="col-span-2">
                    <Select
                      value={form.watch('insoleTypeGeneral') || undefined}
                      onValueChange={val =>
                        form.setValue('insoleTypeGeneral', val)
                      }
                    >
                      <SelectTrigger className="w-2/3 mt-2">
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

                  {form.watch('insoleTypeGeneral') === 'Anders' && (
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

                {/* Corrections */}
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
                      value={
                        form.watch('insoleForefootCorrection') || undefined
                      }
                      onValueChange={val =>
                        form.setValue('insoleForefootCorrection', val)
                      }
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
                      value={form.watch('insoleForefootPad') || undefined}
                      onValueChange={val =>
                        form.setValue('insoleForefootPad', val)
                      }
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
              </FormCard>

              {/* Supplement (van leest) */}
              <FormCard
                title={t('supplement')}
                description={t('supplementDescription')}
                toggleAble={true}
                toggleLabel={t('addSupplement')}
                toggleId="supplement-toggle"
                defaultOpen={form.watch('supplementIndividueelEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('supplementIndividueelEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('customInsoleIndividualLeft', false);
                    form.setValue('customInsoleIndividualRight', false);
                  }
                }}
              >
                <FormBlock columns={2} dividers={true}>
                  <FormItemWrapper>
                    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors">
                      <Checkbox
                        id="supplement-links"
                        checked={!!form.watch('customInsoleIndividualLeft')}
                        onCheckedChange={checked =>
                          form.setValue('customInsoleIndividualLeft', !!checked)
                        }
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t('left')}
                        </p>
                      </div>
                    </Label>
                  </FormItemWrapper>

                  <FormItemWrapper>
                    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors">
                      <Checkbox
                        id="supplement-rechts"
                        checked={!!form.watch('customInsoleIndividualRight')}
                        onCheckedChange={checked =>
                          form.setValue(
                            'customInsoleIndividualRight',
                            !!checked,
                          )
                        }
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t('right')}
                        </p>
                      </div>
                    </Label>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Zoolverstijving */}
              <FormCard
                title={t('soleStiffening')}
                toggleAble={true}
                toggleLabel={t('addSoleStiffening')}
                toggleId="zoolverstijving-toggle"
                defaultOpen={form.watch('soleReinforcementEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('soleReinforcementEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('soleReinforcementLeft', false);
                    form.setValue('soleReinforcementRight', false);
                  }
                }}
              >
                <FormBlock columns={2} dividers={true}>
                  <FormItemWrapper>
                    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors">
                      <Checkbox
                        id="zoolverstijving-links"
                        checked={!!form.watch('soleReinforcementLeft')}
                        onCheckedChange={checked =>
                          form.setValue('soleReinforcementLeft', !!checked)
                        }
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t('left')}
                        </p>
                      </div>
                    </Label>
                  </FormItemWrapper>

                  <FormItemWrapper>
                    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors">
                      <Checkbox
                        id="zoolverstijving-rechts"
                        checked={!!form.watch('soleReinforcementRight')}
                        onCheckedChange={checked =>
                          form.setValue('soleReinforcementRight', !!checked)
                        }
                      />
                      <div className="grid gap-1.5 font-normal">
                        <p className="text-sm leading-none font-medium">
                          {t('right')}
                        </p>
                      </div>
                    </Label>
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Afwikkelrol (onder schoen) */}
              <FormCard
                title={t('rockerSole')}
                toggleAble={true}
                toggleLabel={t('addRockerSole')}
                toggleId="afwikkelrol-toggle"
                defaultOpen={form.watch('afwikkelrolEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('afwikkelrolEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('rockerRollCmLeft', '');
                    form.setValue('rockerRollCmRight', '');
                  }
                }}
              >
                <FormBlock columns={2} dividers={true}>
                  <FormItemWrapper label={t('leftCm')}>
                    <Input
                      id="afwikkelrol-cm-links"
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

                  <FormItemWrapper label={t('rightCm')}>
                    <Input
                      id="afwikkelrol-cm-rechts"
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
              </FormCard>

              {/* Special Notes */}
              <FormCard title={t('specialNotes')}>
                <Textarea
                  placeholder={t('specialNotesPlaceholder')}
                  value={form.watch('specialNotes')}
                  onChange={e => form.setValue('specialNotes', e.target.value)}
                  rows={5}
                />
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

export default FormIntakeOSBPage;
