import React from 'react';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import {useForm} from 'react-hook-form';
import {useFormPersistence} from '@/backend/hooks/useFormPersistence';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {BaseLayout, FormFooter, FormSection} from '@/components/layout';
import {
  InsoleAndTalonetteBlock,
  PairAndIndicationBlock,
  SideSelectionBlock,
  SpecialNotesBlock,
} from '@/components/forms/blocks';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import {ChevronRight} from 'lucide-react';
import {Form} from '@/components/ui/form';
import {Routes} from '@/backend/utils/routes';
import {PAIR_TYPE_OPTIONS} from '@/backend/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/backend/store/hooks';
import {
  setClientData,
  setIntakeOVACData,
} from '@/backend/store/slices/formData';
import {scrollToFirstError} from '@/backend/utils/formHelpers';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';

// ---------------------------------------------------------------------------
// SCHEMA DEFINITION
// ---------------------------------------------------------------------------
const formSchema = z.object({
  // Basic info
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

  // ---------------------------------------------------------------------------
  // FORM SETUP
  // ---------------------------------------------------------------------------
  const defaultFormValues: FormData = {
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
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: defaultFormValues,
  });

  // Persist OVAC form state across refreshes
  const {clearStorage} = useFormPersistence(
    'intakeOVAC',
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

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------
  return (
    <BaseLayout title={t('intakeOvac')} currentStep={3}>
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
              {/* PairAndIndicationBlock */}
              <PairAndIndicationBlock form={form} t={t} />

              {/* SideSelectionBlock */}
              <SideSelectionBlock form={form} t={t} includeAmputation={false} />

              {/* Section 1: Steunzolen/Talonette */}
              <InsoleAndTalonetteBlock
                form={form}
                t={t}
                mode="split"
                includePriceSelector={false}
                resetFieldsOnToggleOff={true}
              />

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

              {/* SpecialNotesBlock */}
              <SpecialNotesBlock form={form} t={t} />

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
