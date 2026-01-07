import React, {useEffect} from 'react';
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
  setIntakePulmanData,
  setClientData,
} from '@/domain/store/slices/formData';
import {
  Zijde,
  PULMAN_TYPE_OPTIES,
  SCHOENMATEN,
  PAARTYPE_OPTIES,
} from '@/lib/constants/formConstants';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {scrollToFirstError} from '@/utils/formHelpers';
import {useFormPersistence} from '@/hooks/useFormPersistence';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import {Switch} from '@/components/ui/switch';

const FormIntakePulmanPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const formSchema = z.object({
    welkPaar: z.string(),
    side: z.enum(['left', 'right', 'both'] as const),
    medischeIndicatie: z.string().optional(),
    gezwachteld: z.boolean(),
    typePulman: z.string().optional(),
    schoenmaat: z.string().optional(),
    afgegevenMaat: z.string().optional(),
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
      typePulman: '',
      schoenmaat: '',
      afgegevenMaat: '',
      bijzonderheden: '',
    },
  });

  const {clearStorage} = useFormPersistence(
    'intakePulman',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  const gezwachteld = form.watch('gezwachteld');
  const schoenmaat = form.watch('schoenmaat');
  const afgegevenMaat = form.watch('afgegevenMaat');

  useEffect(() => {
    if (gezwachteld) {
      form.setValue('typePulman', 'Harlem Extra');
      // Only auto-set afgegevenMaat if gezwachteld is checked, schoenmaat is selected, and afgegevenMaat is empty
      if (schoenmaat && !afgegevenMaat) {
        // Try to parse schoenmaat as a number and add 2
        const schoenmaatNum = parseInt(schoenmaat, 10);
        if (!isNaN(schoenmaatNum)) {
          form.setValue('afgegevenMaat', String(schoenmaatNum + 2));
        }
      }
    }
  }, [gezwachteld, schoenmaat, afgegevenMaat, form]);

  const onSubmit = (data: FormData) => {
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'Pulman'}));
    }
    dispatch(setIntakePulmanData(data));
    clearStorage();
    void router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakePulman')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('intakePulman')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('pulmanDescription')}
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

              {/* Side & Bandaged */}
              <FormCard title={t('side') + ' & ' + t('bandaged')}>
                <FormBlock columns={2} dividers={true}>
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
                  <FormItemWrapper>
                    <FormLabel>{t('bandaged')}</FormLabel>
                    <FormField
                      control={form.control}
                      name="gezwachteld"
                      render={({field}) => (
                        <FormItem className="flex flex-col items-center">
                          <FormControl>
                            <div className="flex flex-col-2 items-center justify-center space-x-2">
                              <Switch
                                id="gezwachteld-switch"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <Label
                                htmlFor="gezwachteld-switch"
                                className="font-normal cursor-pointer"
                              >
                                {field.value ? t('yes') : t('no')}
                              </Label>
                            </div>
                          </FormControl>
                          {gezwachteld && (
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

              {/* Type Pulman & Shoe Sizes */}
              <FormCard
                title={
                  t('pulmanType') +
                  ' & ' +
                  t('shoeSize') +
                  ' & ' +
                  t('providedShoeSize')
                }
              >
                <FormBlock columns={3} dividers={true}>
                  {/* Left column: Type Pulman (disabled if bandaged) */}
                  <FormItemWrapper label={t('pulmanType')}>
                    <FormField
                      control={form.control}
                      name="typePulman"
                      render={({field}) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('selectType')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PULMAN_TYPE_OPTIES.map(option => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {t(option.label)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>

                  {/* Middle column: Current Shoe Size */}
                  <FormItemWrapper label={t('shoeSize')}>
                    <FormField
                      control={form.control}
                      name="schoenmaat"
                      render={({field}) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('selectSize')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SCHOENMATEN.map(size => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>

                  {/* Right column: Issued Size */}
                  <FormItemWrapper label={t('providedShoeSize')}>
                    <FormField
                      control={form.control}
                      name="afgegevenMaat"
                      render={({field}) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('selectSize')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SCHOENMATEN.map(size => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              <FormCard title={t('specialNotes')}>
                <FormField
                  control={form.control}
                  name="bijzonderheden"
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

export default FormIntakePulmanPage;
