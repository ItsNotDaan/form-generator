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
  STEUNZOOL_TYPE_OPTIES,
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
    welkPaar: z.string(),
    medischeIndicatie: z.string().optional(),
    side: z.enum(['left', 'right', 'both'] as const).optional(),

    // Functieonderzoek
    doel: z.record(z.string(), z.boolean()),
    loopfunctieIndicatie: z.string().optional(),
    loopfunctieAndersText: z.string().optional(),

    // Supplier and Product
    leverancierNaam: z.string().optional(),
    bestelDatum: z.string().optional(),
    productSpecificaties: z.object({
      artCode: z.string().optional(),
      lengteMaat: z.string().optional(),
      wijdte: z.string().optional(),
      kleur: z.string().optional(),
      sluiting: z.string().optional(),
    }),

    // Steunzolen/Talonette Section
    talonetteEnabled: z.boolean().optional(),
    talonetteVerhogingLinks: z.string().optional(),
    talonetteVerhogingRechts: z.string().optional(),

    steunzoolEnabled: z.boolean().optional(),
    steunzoolTypeGeneral: z.string().optional(),
    steunzoolAndersText: z.string().optional(),
    steunzoolCorrectieMiddenvoet: z.string().optional(),
    steunzoolCorrectieVoorvoet: z.string().optional(),
    steunzoolVvPellote: z.string().optional(),

    // Supplement (van leest)
    supplementIndividueelEnabled: z.boolean().optional(),
    supplementIndividueelLinks: z.boolean().optional(),
    supplementIndividueelRechts: z.boolean().optional(),

    // Zoolverstijving
    zoolverstijvingEnabled: z.boolean().optional(),
    zoolverstijvingLinks: z.boolean().optional(),
    zoolverstijvingRechts: z.boolean().optional(),

    // Afwikkelrol (onder schoen)
    afwikkelrolEnabled: z.boolean().optional(),
    afwikkelrolCmLinks: z.string().optional(),
    afwikkelrolCmRechts: z.string().optional(),

    bijzonderheden: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      welkPaar: PAARTYPE_OPTIES[0]?.value || 'Eerste paar',
      medischeIndicatie: '',
      side: 'both',

      // Functieonderzoek
      doel: {},
      loopfunctieIndicatie: '',
      loopfunctieAndersText: '',

      // Supplier and Product
      leverancierNaam: '',
      bestelDatum: new Date().toISOString().split('T')[0],
      productSpecificaties: {
        artCode: '',
        lengteMaat: '',
        wijdte: '',
        kleur: '',
        sluiting: '',
      },

      // Steunzolen/Talonette Section
      talonetteEnabled: false,
      talonetteVerhogingLinks: '',
      talonetteVerhogingRechts: '',

      steunzoolEnabled: false,
      steunzoolTypeGeneral: '',
      steunzoolAndersText: '',
      steunzoolCorrectieMiddenvoet: '',
      steunzoolCorrectieVoorvoet: '',
      steunzoolVvPellote: '',

      // Supplement (van leest)
      supplementIndividueelEnabled: false,
      supplementIndividueelLinks: false,
      supplementIndividueelRechts: false,

      // Zoolverstijving
      zoolverstijvingEnabled: false,
      zoolverstijvingLinks: false,
      zoolverstijvingRechts: false,

      // Afwikkelrol (onder schoen)
      afwikkelrolEnabled: false,
      afwikkelrolCmLinks: '',
      afwikkelrolCmRechts: '',

      bijzonderheden: '',
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
        welkPaar: data.welkPaar,
        medischeIndicatie: data.medischeIndicatie || '',
        side: data.side || 'both',

        // Functieonderzoek
        doel: data.doel as Record<string, boolean>,
        loopfunctieIndicatie: data.loopfunctieIndicatie || '',
        loopfunctieAndersText: data.loopfunctieAndersText || '',

        // Supplier and Product
        leverancierNaam: data.leverancierNaam || '',
        bestelDatum: data.bestelDatum || '',
        productSpecificaties: {
          artCode: data.productSpecificaties?.artCode || '',
          lengteMaat: data.productSpecificaties?.lengteMaat || '',
          wijdte: data.productSpecificaties?.wijdte || '',
          kleur: data.productSpecificaties?.kleur || '',
          sluiting: data.productSpecificaties?.sluiting || '',
        },

        // Steunzolen/Talonette (conditional based on toggle)
        talonetteVerhogingLinks: data.talonetteEnabled
          ? data.talonetteVerhogingLinks || ''
          : '',
        talonetteVerhogingRechts: data.talonetteEnabled
          ? data.talonetteVerhogingRechts || ''
          : '',
        steunzoolTypeGeneral: data.steunzoolEnabled
          ? data.steunzoolTypeGeneral || ''
          : '',
        steunzoolAndersText: data.steunzoolEnabled
          ? data.steunzoolAndersText || ''
          : '',
        steunzoolCorrectieMiddenvoet: data.steunzoolEnabled
          ? data.steunzoolCorrectieMiddenvoet || ''
          : '',
        steunzoolCorrectieVoorvoet: data.steunzoolEnabled
          ? data.steunzoolCorrectieVoorvoet || ''
          : '',
        steunzoolVvPellote: data.steunzoolEnabled
          ? data.steunzoolVvPellote || ''
          : '',

        // Supplement (conditional based on toggle)
        supplementIndividueelLinks: data.supplementIndividueelEnabled
          ? !!data.supplementIndividueelLinks
          : false,
        supplementIndividueelRechts: data.supplementIndividueelEnabled
          ? !!data.supplementIndividueelRechts
          : false,

        // Zoolverstijving (conditional based on toggle)
        zoolverstijvingLinks: data.zoolverstijvingEnabled
          ? !!data.zoolverstijvingLinks
          : false,
        zoolverstijvingRechts: data.zoolverstijvingEnabled
          ? !!data.zoolverstijvingRechts
          : false,

        // Afwikkelrol (conditional based on toggle)
        afwikkelrolCmLinks: data.afwikkelrolEnabled
          ? data.afwikkelrolCmLinks || ''
          : '',
        afwikkelrolCmRechts: data.afwikkelrolEnabled
          ? data.afwikkelrolCmRechts || ''
          : '',

        bijzonderheden: data.bijzonderheden || '',
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
                      value={form.watch('welkPaar')}
                      onValueChange={val => form.setValue('welkPaar', val)}
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
                          <RadioGroupItem value="left" />
                          {t('left')}
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value="right" />
                          {t('right')}
                        </Label>
                        <Label className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value="both" />
                          {t('both')}
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
                        id={`doel-${optie.fullKey}`}
                        checked={
                          (form.watch('doel')[optie.fullKey] as boolean) ||
                          false
                        }
                        onCheckedChange={checked =>
                          form.setValue('doel', {
                            ...form.getValues('doel'),
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
                      value={form.watch('loopfunctieIndicatie') || ''}
                      onValueChange={v =>
                        form.setValue('loopfunctieIndicatie', v)
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
                {form.watch('loopfunctieIndicatie') === 'Anders' && (
                  <FormBlock centerTitle={false}>
                    <FormItemWrapper label={t('otherWalkingFunction')}>
                      <Textarea
                        id="loopfunctie-anders"
                        placeholder={t('otherWalkingFunctionPlaceholder')}
                        value={form.watch('loopfunctieAndersText')}
                        onChange={e =>
                          form.setValue('loopfunctieAndersText', e.target.value)
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
                      value={form.watch('leverancierNaam') || ''}
                      onValueChange={v => form.setValue('leverancierNaam', v)}
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
                        form.watch('bestelDatum') &&
                        form.watch('bestelDatum') !== ''
                          ? new Date(form.watch('bestelDatum')!)
                          : undefined
                      }
                      onChange={selectedDate =>
                        form.setValue(
                          'bestelDatum',
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
                      value={form.watch('productSpecificaties')?.artCode || ''}
                      onChange={e =>
                        form.setValue('productSpecificaties', {
                          ...form.getValues('productSpecificaties'),
                          artCode: e.target.value,
                        })
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('color')}>
                    <Input
                      id="kleur-osb"
                      placeholder={t('color')}
                      value={form.watch('productSpecificaties')?.kleur || ''}
                      onChange={e =>
                        form.setValue('productSpecificaties', {
                          ...form.getValues('productSpecificaties'),
                          kleur: e.target.value,
                        })
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>
                </FormBlock>

                <FormBlock columns={3} dividers={true} hoverEffect={true}>
                  <FormItemWrapper label={t('width')}>
                    <Input
                      id="wijdte"
                      placeholder={t('width')}
                      value={form.watch('productSpecificaties')?.wijdte || ''}
                      onChange={e =>
                        form.setValue('productSpecificaties', {
                          ...form.getValues('productSpecificaties'),
                          wijdte: e.target.value,
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
                        form.watch('productSpecificaties')?.lengteMaat || ''
                      }
                      onChange={e =>
                        form.setValue('productSpecificaties', {
                          ...form.getValues('productSpecificaties'),
                          lengteMaat: e.target.value,
                        })
                      }
                      className="w-2/3"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper label={t('closure')}>
                    <Input
                      id="sluiting-osb"
                      placeholder={t('closure')}
                      value={form.watch('productSpecificaties')?.sluiting || ''}
                      onChange={e =>
                        form.setValue('productSpecificaties', {
                          ...form.getValues('productSpecificaties'),
                          sluiting: e.target.value,
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
                  form.watch('steunzoolEnabled') ||
                  form.watch('talonetteEnabled')
                }
                onToggleChange={isOpen => {
                  form.setValue('steunzoolEnabled', isOpen);
                  form.setValue('talonetteEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('talonetteVerhogingLinks', '');
                    form.setValue('talonetteVerhogingRechts', '');
                    form.setValue('steunzoolTypeGeneral', '');
                    form.setValue('steunzoolAndersText', '');
                    form.setValue('steunzoolCorrectieMiddenvoet', '');
                    form.setValue('steunzoolCorrectieVoorvoet', '');
                    form.setValue('steunzoolVvPellote', '');
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

                {/* Steunzool Type Selection */}
                <FormBlock
                  columns={2}
                  dividers={true}
                  title={t('insoleType')}
                  alignItems="start"
                >
                  <FormItemWrapper className="col-span-2">
                    <Select
                      value={form.watch('steunzoolTypeGeneral') || undefined}
                      onValueChange={val =>
                        form.setValue('steunzoolTypeGeneral', val)
                      }
                    >
                      <SelectTrigger className="w-2/3 mt-2">
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

                  {form.watch('steunzoolTypeGeneral') === 'Anders' && (
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

                {/* Corrections */}
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
                        form.watch('steunzoolCorrectieVoorvoet') || undefined
                      }
                      onValueChange={val =>
                        form.setValue('steunzoolCorrectieVoorvoet', val)
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
                      value={form.watch('steunzoolVvPellote') || undefined}
                      onValueChange={val =>
                        form.setValue('steunzoolVvPellote', val)
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
                    form.setValue('supplementIndividueelLinks', false);
                    form.setValue('supplementIndividueelRechts', false);
                  }
                }}
              >
                <FormBlock columns={2} dividers={true}>
                  <FormItemWrapper>
                    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors">
                      <Checkbox
                        id="supplement-links"
                        checked={!!form.watch('supplementIndividueelLinks')}
                        onCheckedChange={checked =>
                          form.setValue('supplementIndividueelLinks', !!checked)
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
                        checked={!!form.watch('supplementIndividueelRechts')}
                        onCheckedChange={checked =>
                          form.setValue(
                            'supplementIndividueelRechts',
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
                defaultOpen={form.watch('zoolverstijvingEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('zoolverstijvingEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('zoolverstijvingLinks', false);
                    form.setValue('zoolverstijvingRechts', false);
                  }
                }}
              >
                <FormBlock columns={2} dividers={true}>
                  <FormItemWrapper>
                    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors">
                      <Checkbox
                        id="zoolverstijving-links"
                        checked={!!form.watch('zoolverstijvingLinks')}
                        onCheckedChange={checked =>
                          form.setValue('zoolverstijvingLinks', !!checked)
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
                        checked={!!form.watch('zoolverstijvingRechts')}
                        onCheckedChange={checked =>
                          form.setValue('zoolverstijvingRechts', !!checked)
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
                    form.setValue('afwikkelrolCmLinks', '');
                    form.setValue('afwikkelrolCmRechts', '');
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
                      value={form.watch('afwikkelrolCmLinks') || ''}
                      onChange={e =>
                        form.setValue('afwikkelrolCmLinks', e.target.value)
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
                      value={form.watch('afwikkelrolCmRechts') || ''}
                      onChange={e =>
                        form.setValue('afwikkelrolCmRechts', e.target.value)
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
                  value={form.watch('bijzonderheden')}
                  onChange={e =>
                    form.setValue('bijzonderheden', e.target.value)
                  }
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
