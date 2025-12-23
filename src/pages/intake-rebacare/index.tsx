import React from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import {
  setIntakeRebacareData,
  setClientData,
} from '@/domain/store/slices/formData';
import { Zijde, PAARTYPE_OPTIES } from '@/lib/constants/formConstants';
import { ChevronRight, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { scrollToFirstError } from '@/utils/formHelpers';
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { FormBlock, FormCard, FormItemWrapper } from '@/components/ui/form-block';
import { Switch } from '@/components/ui/switch';

const FormIntakeRebacarePage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    welkPaar: z.string(),
    side: z.enum(['left', 'right', 'both'] as const),
    medischeIndicatie: z.string().optional(),
    gezwachteld: z.boolean(),
    bijzonderheden: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      welkPaar: 'Eerste paar',
      side: 'both',
      medischeIndicatie: '',
      gezwachteld: false,
      bijzonderheden: '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'Rebacare' }));
    }
    dispatch(setIntakeRebacareData(data));
    router.push(Routes.form_results);
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
              {/* Which Pair */}
              <FormCard title={t('whichPair')}>
                <FormBlock columns={1} dividers={false} hoverEffect={false}>
                  <RadioGroup
                    value={form.watch('welkPaar')}
                    onValueChange={v => form.setValue('welkPaar', v)}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {PAARTYPE_OPTIES.map(option => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`paar-${option.value}`}
                          />
                          <Label
                            htmlFor={`paar-${option.value}`}
                            className="font-normal cursor-pointer"
                          >
                            {t(option.label)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </FormBlock>
              </FormCard>

              {/* Side & Bandaged */}
              <FormCard title={t('side') + ' & ' + t('bandaged')}>
                <FormBlock
                  columns={2}
                  dividers={true}
                >
                  <FormItemWrapper>
                    <Label>{t('side')}</Label>
                    <FormField
                      control={form.control}
                      name="side"
                      render={({ field }) => (
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
                                    <RadioGroupItem value={s} id={`side-${s}`} />
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
                  <FormItemWrapper>
                    <FormLabel>{t('bandaged')}</FormLabel>
                    <FormField
                      control={form.control}
                      name="gezwachteld"
                      render={({ field }) => (
                        <FormItem
                          className='flex flex-col items-center'
                        >
                          <FormControl>
                            <div className="flex flex-col-2 items-center justify-center space-x-2">
                              <Switch
                                id="gezwachteld-switch"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <Label htmlFor="gezwachteld-switch" className="font-normal cursor-pointer">
                                {field.value ? t('yes') : t('no')}
                              </Label>
                            </div>
                          </FormControl>
                          {field.value && (
                            <div className="flex flex-row items-center rounded-md p-3 gap-2 bg-primary/10 w-2/3">
                              <Info className="h-20 w-20 mt-0.5 text-primary" />
                              <p className="text-sm text-foreground">
                                {t('bandagedInformationPulman')}
                              </p>
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>


              <FormCard title={t('medicalIndication')}>
                <FormField
                  control={form.control}
                  name="medischeIndicatie"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={t('medicalIndicationPlaceholder')}
                          rows={4}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormCard>

              <FormCard title={t('specialNotes')}>
                <FormField
                  control={form.control}
                  name="bijzonderheden"
                  render={({ field }) => (
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
