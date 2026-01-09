import React from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {
  setIntakeRebacareData,
  setClientData,
} from '@/domain/store/slices/formData';
import {Side, PAIR_TYPE_OPTIONS} from '@/lib/constants/formConstants';
import {ChevronRight, Info} from 'lucide-react';
import {useForm} from 'react-hook-form';
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
import {FormBlock, FormCard, FormItemWrapper} from '@/components/ui/form-block';
import {Switch} from '@/components/ui/switch';

const FormIntakeRebacarePage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    whichPair: z.string(),
    side: z.enum(['left', 'right', 'both'] as const),
    medicalIndication: z.string().optional(),
    bandagedFoot: z.boolean(),
    specialNotes: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      whichPair: 'Eerste paar',
      side: 'both',
      medicalIndication: '',
      bandagedFoot: false,
      specialNotes: '',
    },
  });

  const {clearStorage} = useFormPersistence(
    'intakeRebacare',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'Rebacare'}));
    }
    dispatch(setIntakeRebacareData(data));
    clearStorage();
    void router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakeRebacare')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('intakeRebacare')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('rebacareDescription')}
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

              {/* Side & Bandaged */}
              <FormCard title={t('side') + ' & ' + t('bandaged')}>
                <FormBlock columns={2} dividers={true}>
                  {/* Side (Radio Group) */}
                  <FormItemWrapper>
                    <Label>{t('side')}</Label>
                    <FormField
                      control={form.control}
                      name="side"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <div className="flex gap-6">
                                {['both', 'left', 'right'].map(s => (
                                  <div
                                    key={s}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={s}
                                      id={`side-${s}`}
                                    />
                                    <Label
                                      htmlFor={`side-${s}`}
                                      className="font-normal cursor-pointer"
                                    >
                                      {t(s)}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>

                  {/* Bandaged Switch */}
                  <FormItemWrapper>
                    <FormLabel>{t('bandaged')}</FormLabel>
                    <FormField
                      control={form.control}
                      name="bandagedFoot"
                      render={({field}) => (
                        <FormItem className="flex flex-col items-center">
                          <FormControl>
                            <div className="flex flex-col-2 items-center justify-center space-x-2">
                              <Switch
                                id="bandagedFoot-switch"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <Label
                                htmlFor="bandagedFoot-switch"
                                className="font-normal cursor-pointer"
                              >
                                {field.value ? t('yes') : t('no')}
                              </Label>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Special Notes */}
              <FormCard title={t('specialNotes')}>
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
              </FormCard>

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

export default FormIntakeRebacarePage;
