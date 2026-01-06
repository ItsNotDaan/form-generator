import React from 'react';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {BaseLayout, FormFooter, FormSection} from '@/components/layout';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {ChevronRight} from 'lucide-react';
import {Form} from '@/components/ui/form';
import {Routes} from '@/lib/routes';
import {
  CORRECTIE_MIDDENVOET_OPTIES,
  CORRECTIE_VOORVOET_OPTIES,
  PAARTYPE_OPTIES,
  PELLOTE_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
} from '@/lib/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {setClientData, setIntakeOVACData} from '@/domain/store/slices/formData';
import {scrollToFirstError} from '@/utils/formHelpers';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  welkPaar: z.string(),
  medischeIndicatie: z.string().optional(),
  side: z.enum(['left', 'right', 'both'] as const).optional(),

  // Section 1: Steunzolen/Talonette
  talonetteEnabled: z.boolean().optional(),
  talonetteVerhogingLinks: z.string().optional(),
  talonetteVerhogingRechts: z.string().optional(),

  steunzoolEnabled: z.boolean().optional(),
  steunzoolTypeGeneral: z.string().optional(),
  steunzoolAndersText: z.string().optional(),
  steunzoolCorrectieMiddenvoet: z.string().optional(),
  steunzoolCorrectieVoorvoet: z.string().optional(),
  steunzoolVvPellote: z.string().optional(),

  // Section 2: Supplement (van leest)
  supplementIndividueelEnabled: z.boolean().optional(),
  supplementIndividueelLinks: z.boolean().optional(),
  supplementIndividueelRechts: z.boolean().optional(),

  // Section 3: Zoolverstijving
  zoolverstijvingEnabled: z.boolean().optional(),
  zoolverstijvingLinks: z.boolean().optional(),
  zoolverstijvingRechts: z.boolean().optional(),

  // Section 4: Afwikkelrol (onder schoen)
  afwikkelrolEnabled: z.boolean().optional(),
  afwikkelrolCmLinks: z.string().optional(),
  afwikkelrolCmRechts: z.string().optional(),

  // Section 5: Hakzool verhoging
  hakzoolVerhogingEnabled: z.boolean().optional(),
  hakzoolVerhogingCmLinks: z.string().optional(),
  hakzoolVerhogingCmRechts: z.string().optional(),

  // Section 6: Nieuwe wreefsluiting
  nieuweWreefsluitingEnabled: z.boolean().optional(),
  nieuweWreefsluitingLinks: z.boolean().optional(),
  nieuweWreefsluitingRechts: z.boolean().optional(),

  bijzonderheden: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const FormIntakeOVACPage = () => {
  const {t} = useTranslation('form');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      welkPaar: PAARTYPE_OPTIES[0]?.value || 'Eerste paar',
      medischeIndicatie: '',
      side: 'both',

      // Section 1: Steunzolen/Talonette
      talonetteEnabled: false,
      talonetteVerhogingLinks: '',
      talonetteVerhogingRechts: '',

      steunzoolEnabled: false,
      steunzoolTypeGeneral: '',
      steunzoolAndersText: '',
      steunzoolCorrectieMiddenvoet: '',
      steunzoolCorrectieVoorvoet: '',
      steunzoolVvPellote: '',

      // Section 2: Supplement
      supplementIndividueelEnabled: false,
      supplementIndividueelLinks: false,
      supplementIndividueelRechts: false,

      // Section 3: Zoolverstijving
      zoolverstijvingEnabled: false,
      zoolverstijvingLinks: false,
      zoolverstijvingRechts: false,

      // Section 4: Afwikkelrol
      afwikkelrolEnabled: false,
      afwikkelrolCmLinks: '',
      afwikkelrolCmRechts: '',

      // Section 5: Hakzool verhoging
      hakzoolVerhogingEnabled: false,
      hakzoolVerhogingCmLinks: '',
      hakzoolVerhogingCmRechts: '',

      // Section 6: Nieuwe wreefsluiting
      nieuweWreefsluitingEnabled: false,
      nieuweWreefsluitingLinks: false,
      nieuweWreefsluitingRechts: false,

      bijzonderheden: '',
    },
  });

  const showSteunzolen = form.watch('steunzoolEnabled');

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'OVAC'}));
    }

    dispatch(
      setIntakeOVACData({
        welkPaar: data.welkPaar,
        medischeIndicatie: data.medischeIndicatie || '',

        // Section 1: Steunzolen/Talonette
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

        // Section 2: Supplement (van leest)
        supplementIndividueelLinks: data.supplementIndividueelEnabled
          ? !!data.supplementIndividueelLinks
          : false,
        supplementIndividueelRechts: data.supplementIndividueelEnabled
          ? !!data.supplementIndividueelRechts
          : false,

        // Section 3: Zoolverstijving
        zoolverstijvingLinks: data.zoolverstijvingEnabled
          ? !!data.zoolverstijvingLinks
          : false,
        zoolverstijvingRechts: data.zoolverstijvingEnabled
          ? !!data.zoolverstijvingRechts
          : false,

        // Section 4: Afwikkelrol (onder schoen) - dispatch cm values
        afwikkelrolCmLinks: data.afwikkelrolEnabled
          ? data.afwikkelrolCmLinks || ''
          : '',
        afwikkelrolCmRechts: data.afwikkelrolEnabled
          ? data.afwikkelrolCmRechts || ''
          : '',

        // Section 5: Hakzool verhoging - dispatch cm values
        hakzoolVerhogingCmLinks: data.hakzoolVerhogingEnabled
          ? data.hakzoolVerhogingCmLinks || ''
          : '',
        hakzoolVerhogingCmRechts: data.hakzoolVerhogingEnabled
          ? data.hakzoolVerhogingCmRechts || ''
          : '',

        // Section 6: Nieuwe wreefsluiting
        nieuweWreefsluitingLinks: data.nieuweWreefsluitingEnabled
          ? !!data.nieuweWreefsluitingLinks
          : false,
        nieuweWreefsluitingRechts: data.nieuweWreefsluitingEnabled
          ? !!data.nieuweWreefsluitingRechts
          : false,

        bijzonderheden: data.bijzonderheden || '',
      }),
    );

    void router.push(Routes.form_results);
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
              {/* Section 0: Description and which pair */}
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

              {/* Section 1: Steunzolen/Talonette */}

              {/* Talonette */}
              <FormCard
                title={t('talonetteSection')}
                description={t('talonetteDescription')}
                toggleAble={true}
                toggleLabel={t('addTalonette')}
                toggleId="talonette-toggle"
                defaultOpen={form.watch('talonetteEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('talonetteEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('talonetteVerhogingLinks', '');
                    form.setValue('talonetteVerhogingRechts', '');
                  }
                }}
              >
                {/* Heel Raise (no pricing for OVAC) */}
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

              {/* Steunzolen */}
              <FormCard
                title={t('insolesSection')}
                description={t('insolesDescription')}
                toggleAble={true}
                toggleLabel={t('addInsoles')}
                toggleId="steunzolen-toggle"
                defaultOpen={form.watch('steunzoolEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('steunzoolEnabled', isOpen);
                  if (!isOpen) {
                    // Clear steunzolen fields when disabled
                    form.setValue('steunzoolTypeGeneral', '');
                    form.setValue('steunzoolAndersText', '');
                    form.setValue('steunzoolCorrectieMiddenvoet', '');
                    form.setValue('steunzoolCorrectieVoorvoet', '');
                    form.setValue('steunzoolVvPellote', '');
                  }
                }}
              >
                {/* Type Selection */}
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

              {/* Section 2: Supplement (van leest) */}
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
                          form.setValue(
                            'supplementIndividueelRechts',
                            !!checked,
                          )
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

              {/* Section 3: Zoolverstijving */}
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

              {/* Section 4: Afwikkelrol (onder schoen) */}
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
                <FormBlock columns={3} dividers={true}>
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
                      className="w-full"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper>
                    <div className="flex items-center justify-center h-full min-h-25 border-2 border-dashed border-muted-foreground/25 rounded-md bg-muted/20">
                      <p className="text-sm text-muted-foreground">
                        {t('rockerSoleImage')}
                      </p>
                    </div>
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
                      className="w-full"
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Section 5: Hakzool verhoging */}
              <FormCard
                title={t('heelSoleRaise')}
                toggleAble={true}
                toggleLabel={t('addHeelSoleRaise')}
                toggleId="hakzool-toggle"
                defaultOpen={form.watch('hakzoolVerhogingEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('hakzoolVerhogingEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('hakzoolVerhogingCmLinks', '');
                    form.setValue('hakzoolVerhogingCmRechts', '');
                  }
                }}
              >
                <FormBlock columns={3} dividers={true}>
                  <FormItemWrapper label={t('leftCm')}>
                    <Input
                      id="hakzool-cm-links"
                      type="number"
                      step="0.1"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('hakzoolVerhogingCmLinks') || ''}
                      onChange={e =>
                        form.setValue('hakzoolVerhogingCmLinks', e.target.value)
                      }
                      className="w-full"
                    />
                  </FormItemWrapper>

                  <FormItemWrapper>
                    <div className="flex items-center justify-center h-full min-h-25 border-2 border-dashed border-muted-foreground/25 rounded-md bg-muted/20">
                      <p className="text-sm text-muted-foreground">
                        {t('heelSoleRaiseImage')}
                      </p>
                    </div>
                  </FormItemWrapper>

                  <FormItemWrapper label={t('rightCm')}>
                    <Input
                      id="hakzool-cm-rechts"
                      type="number"
                      step="0.1"
                      placeholder={t('cmPlaceholder')}
                      value={form.watch('hakzoolVerhogingCmRechts') || ''}
                      onChange={e =>
                        form.setValue(
                          'hakzoolVerhogingCmRechts',
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Section 6: Nieuwe wreefsluiting */}
              <FormCard
                title={t('newInstepClosure')}
                toggleAble={true}
                toggleLabel={t('addNewInstepClosure')}
                toggleId="wreefsluiting-toggle"
                defaultOpen={form.watch('nieuweWreefsluitingEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('nieuweWreefsluitingEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('nieuweWreefsluitingLinks', false);
                    form.setValue('nieuweWreefsluitingRechts', false);
                  }
                }}
              >
                <FormBlock columns={2} dividers={true}>
                  <FormItemWrapper>
                    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors">
                      <Checkbox
                        id="wreefsluiting-links"
                        checked={!!form.watch('nieuweWreefsluitingLinks')}
                        onCheckedChange={checked =>
                          form.setValue('nieuweWreefsluitingLinks', !!checked)
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
                        id="wreefsluiting-rechts"
                        checked={!!form.watch('nieuweWreefsluitingRechts')}
                        onCheckedChange={checked =>
                          form.setValue('nieuweWreefsluitingRechts', !!checked)
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

              {/* Bijzonderheden */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('specialNotes')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={t('specialNotesPlaceholder')}
                    value={form.watch('bijzonderheden')}
                    onChange={e =>
                      form.setValue('bijzonderheden', e.target.value)
                    }
                    rows={4}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

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

export default FormIntakeOVACPage;
