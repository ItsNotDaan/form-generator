import React from 'react';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import {useForm} from 'react-hook-form';
import {useFormPersistence} from '@/hooks/useFormPersistence';
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
  MIDFOOT_CORRECTION_OPTIONS,
  FOREFOOT_CORRECTION_OPTIONS,
  PAIR_TYPE_OPTIONS,
  PELOTTE_OPTIONS,
  INSOLE_TYPE_OPTIONS,
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
  whichPair: z.string(),
  medicalIndication: z.string().optional(),
  side: z.enum(['left', 'right', 'both'] as const).optional(),

  // Section 1: Steunzolen/Talonette
  heelRaiseEnabled: z.boolean().optional(),
  heelRaiseLeft: z.string().optional(),
  heelRaiseRight: z.string().optional(),

  insoleEnabled: z.boolean().optional(),
  insoleTypeGeneral: z.string().optional(),
  insoleOtherText: z.string().optional(),
  insoleMidfootCorrection: z.string().optional(),
  insoleForefootCorrection: z.string().optional(),
  insoleForefootPad: z.string().optional(),

  // Section 2: Supplement (van leest)
  supplementIndividueelEnabled: z.boolean().optional(),
  customInsoleIndividualLeft: z.boolean().optional(),
  customInsoleIndividualRight: z.boolean().optional(),

  // Section 3: Zoolverstijving
  soleReinforcementEnabled: z.boolean().optional(),
  soleReinforcementLeft: z.boolean().optional(),
  soleReinforcementRight: z.boolean().optional(),

  // Section 4: Afwikkelrol (onder schoen)
  afwikkelrolEnabled: z.boolean().optional(),
  rockerRollCmLeft: z.string().optional(),
  rockerRollCmRight: z.string().optional(),

  // Section 5: Hakzool verhoging
  hakzoolVerhogingEnabled: z.boolean().optional(),
  heelSoleElevationCmLeft: z.string().optional(),
  heelSoleElevationCmRight: z.string().optional(),

  // Section 6: Nieuwe wreefsluiting
  nieuweWreefsluitingEnabled: z.boolean().optional(),
  newInstepClosureLeft: z.boolean().optional(),
  newInstepClosureRight: z.boolean().optional(),

  specialNotes: z.string().optional(),
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
      whichPair: PAIR_TYPE_OPTIONS[0]?.value || 'Eerste paar',
      medicalIndication: '',
      side: 'both',

      // Section 1: Steunzolen/Talonette
      heelRaiseEnabled: false,
      heelRaiseLeft: '',
      heelRaiseRight: '',

      insoleEnabled: false,
      insoleTypeGeneral: '',
      insoleOtherText: '',
      insoleMidfootCorrection: '',
      insoleForefootCorrection: '',
      insoleForefootPad: '',

      // Section 2: Supplement
      supplementIndividueelEnabled: false,
      customInsoleIndividualLeft: false,
      customInsoleIndividualRight: false,

      // Section 3: Zoolverstijving
      soleReinforcementEnabled: false,
      soleReinforcementLeft: false,
      soleReinforcementRight: false,

      // Section 4: Afwikkelrol
      afwikkelrolEnabled: false,
      rockerRollCmLeft: '',
      rockerRollCmRight: '',

      // Section 5: Hakzool verhoging
      hakzoolVerhogingEnabled: false,
      heelSoleElevationCmLeft: '',
      heelSoleElevationCmRight: '',

      // Section 6: Nieuwe wreefsluiting
      nieuweWreefsluitingEnabled: false,
      newInstepClosureLeft: false,
      newInstepClosureRight: false,

      specialNotes: '',
    },
  });

  // Persist OVAC form state across refreshes
  const {clearStorage} = useFormPersistence(
    'intakeOVAC',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  const showSteunzolen = form.watch('insoleEnabled');

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'OVAC'}));
    }

    dispatch(
      setIntakeOVACData({
        whichPair: data.whichPair,
        medicalIndication: data.medicalIndication || '',

        // Section 1: Steunzolen/Talonette
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

        // Section 2: Supplement (van leest)
        customInsoleIndividualLeft: data.supplementIndividueelEnabled
          ? !!data.customInsoleIndividualLeft
          : false,
        customInsoleIndividualRight: data.supplementIndividueelEnabled
          ? !!data.customInsoleIndividualRight
          : false,

        // Section 3: Zoolverstijving
        soleReinforcementLeft: data.soleReinforcementEnabled
          ? !!data.soleReinforcementLeft
          : false,
        soleReinforcementRight: data.soleReinforcementEnabled
          ? !!data.soleReinforcementRight
          : false,

        // Section 4: Afwikkelrol (onder schoen) - dispatch cm values
        rockerRollCmLeft: data.afwikkelrolEnabled
          ? data.rockerRollCmLeft || ''
          : '',
        rockerRollCmRight: data.afwikkelrolEnabled
          ? data.rockerRollCmRight || ''
          : '',

        // Section 5: Hakzool verhoging - dispatch cm values
        heelSoleElevationCmLeft: data.hakzoolVerhogingEnabled
          ? data.heelSoleElevationCmLeft || ''
          : '',
        heelSoleElevationCmRight: data.hakzoolVerhogingEnabled
          ? data.heelSoleElevationCmRight || ''
          : '',

        // Section 6: Nieuwe wreefsluiting
        newInstepClosureLeft: data.nieuweWreefsluitingEnabled
          ? !!data.newInstepClosureLeft
          : false,
        newInstepClosureRight: data.nieuweWreefsluitingEnabled
          ? !!data.newInstepClosureRight
          : false,

        specialNotes: data.specialNotes || '',
      }),
    );

    clearStorage();

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

              {/* Section 1: Steunzolen/Talonette */}

              {/* Talonette */}
              <FormCard
                title={t('talonetteSection')}
                description={t('talonetteDescription')}
                toggleAble={true}
                toggleLabel={t('addTalonette')}
                toggleId="talonette-toggle"
                defaultOpen={form.watch('heelRaiseEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('heelRaiseEnabled', isOpen);
                  if (!isOpen) {
                    form.setValue('heelRaiseLeft', '');
                    form.setValue('heelRaiseRight', '');
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

              {/* Steunzolen */}
              <FormCard
                title={t('insolesSection')}
                description={t('insolesDescription')}
                toggleAble={true}
                toggleLabel={t('addInsoles')}
                toggleId="steunzolen-toggle"
                defaultOpen={form.watch('insoleEnabled')}
                onToggleChange={isOpen => {
                  form.setValue('insoleEnabled', isOpen);
                  if (!isOpen) {
                    // Clear steunzolen fields when disabled
                    form.setValue('insoleTypeGeneral', '');
                    form.setValue('insoleOtherText', '');
                    form.setValue('insoleMidfootCorrection', '');
                    form.setValue('insoleForefootCorrection', '');
                    form.setValue('insoleForefootPad', '');
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
                      <SelectTrigger className="">
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
                      <SelectTrigger className="">
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
                          form.setValue(
                            'customInsoleIndividualRight',
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

              {/* Section 3: Zoolverstijving */}
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
                    form.setValue('rockerRollCmLeft', '');
                    form.setValue('rockerRollCmRight', '');
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
                      value={form.watch('rockerRollCmLeft') || ''}
                      onChange={e =>
                        form.setValue('rockerRollCmLeft', e.target.value)
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
                      value={form.watch('rockerRollCmRight') || ''}
                      onChange={e =>
                        form.setValue('rockerRollCmRight', e.target.value)
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
                    form.setValue('heelSoleElevationCmLeft', '');
                    form.setValue('heelSoleElevationCmRight', '');
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
                      value={form.watch('heelSoleElevationCmLeft') || ''}
                      onChange={e =>
                        form.setValue('heelSoleElevationCmLeft', e.target.value)
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
                      value={form.watch('heelSoleElevationCmRight') || ''}
                      onChange={e =>
                        form.setValue(
                          'heelSoleElevationCmRight',
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
                    form.setValue('newInstepClosureLeft', false);
                    form.setValue('newInstepClosureRight', false);
                  }
                }}
              >
                <FormBlock columns={2} dividers={true}>
                  <FormItemWrapper>
                    <Label className="flex items-center space-x-2 rounded-md border bg-foreground/5 px-3 py-2 cursor-pointer hover:bg-accent/30 transition-colors">
                      <Checkbox
                        id="wreefsluiting-links"
                        checked={!!form.watch('newInstepClosureLeft')}
                        onCheckedChange={checked =>
                          form.setValue('newInstepClosureLeft', !!checked)
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
                        checked={!!form.watch('newInstepClosureRight')}
                        onCheckedChange={checked =>
                          form.setValue('newInstepClosureRight', !!checked)
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
                    value={form.watch('specialNotes')}
                    onChange={e =>
                      form.setValue('specialNotes', e.target.value)
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetDraft}
                >
                  {t('reset')}
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
