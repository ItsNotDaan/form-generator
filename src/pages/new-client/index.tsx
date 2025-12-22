import React from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {
  LOCATIE_OPTIES,
  AANHEF_OPTIES,
  BEHANDELAARS,
  ZORGVERZEKERAARS,
  Locatie,
  Aanhef,
} from '@/lib/constants/formConstants';
import {useAppDispatch} from '@/domain/store/hooks';
import {setClientData} from '@/domain/store/slices/formData';
import {ChevronRight} from 'lucide-react';
import {DatePicker} from '@/components/ui/date-picker';
import {ReactSelect} from '@/components/ui/react-select';
import {useForm, Controller} from 'react-hook-form';
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
import { useFormPersistence } from '@/hooks/useFormPersistence';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {DutchAddressInput} from '@/components/ui/dutch-address-input';

const FormNewClientPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  const formSchema = z.object({
    practitionerId: z.string().min(1, {message: t('required')}),
    date: z.string().min(1, {message: t('required')}),
    location: z.string().min(1, {message: t('required')}),
    salutation: z.string().min(1, {message: t('required')}),
    initials: z.string().min(1, {message: t('required')}),
    clientName: z.string().min(1, {message: t('required')}),
    birthDate: z.string().min(1, {message: t('required')}),
    address: z.string().min(1, {message: t('required')}),
    houseNumber: z.string().min(1, {message: t('required')}),
    postalCode: z.string().min(1, {message: t('required')}),
    city: z.string().min(1, {message: t('required')}),
    email: z.string().min(1, {message: t('required')}),
    insurance: z.string().min(1, {message: t('required')}),
    phoneOne: z.string().optional(),
    phoneTwo: z.string().optional(),
    specialist: z.string().optional(),
    medischeIndicatie: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: {
      practitionerId: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      salutation: '',
      initials: '',
      clientName: '',
      birthDate: '',
      address: '',
      houseNumber: '',
      postalCode: '',
      city: '',
      email: '',
      insurance: '',
      phoneOne: '',
      phoneTwo: '',
      specialist: '',
      medischeIndicatie: '',
    },
  });

  const onSubmit = (data: FormData) => {
    dispatch(
      setClientData({
        practitionerId: data.practitionerId,
        date: data.date,
        location: data.location as Locatie,
        salutation: data.salutation as Aanhef,
        initials: data.initials,
        clientName: data.clientName,
        birthDate: data.birthDate,
        address: data.address,
        houseNumber: data.houseNumber,
        postalCode: data.postalCode,
        city: data.city,
        phoneOne: data.phoneOne || '',
        phoneTwo: data.phoneTwo || '',
        email: data.email,
        insurance: data.insurance,
        medischeIndicatie: data.medischeIndicatie || '',
        specialist: data.specialist || '',
      }),
    );
    router.push(Routes.form_selection);
  };

  return (
    <BaseLayout title={t('newClient')} currentStep={1}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('newClient')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('newClientDescription')}
          </p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{t('appointmentInformation')}</CardTitle>
                  <CardDescription>
                    {t('appointmentInformationDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="practitionerId"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            {t('practitioner')}{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <ReactSelect
                              value={
                                field.value
                                  ? {
                                      label:
                                        BEHANDELAARS.find(
                                          p => p.value === field.value,
                                        )?.label || '',
                                      value: field.value,
                                    }
                                  : null
                              }
                              onChange={option => {
                                if (option && 'value' in option) {
                                  field.onChange(option.value);
                                }
                              }}
                              options={BEHANDELAARS}
                              placeholder={t('selectPractitioner')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            {t('measurementDate')}{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              value={
                                field.value ? new Date(field.value) : undefined
                              }
                              onChange={selectedDate =>
                                field.onChange(
                                  selectedDate
                                    ? selectedDate.toISOString().split('T')[0]
                                    : '',
                                )
                              }
                              placeholder={t('selectDate')}
                              disabled={d => d > new Date()}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                          {t('location')}{' '}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4"
                          >
                            {LOCATIE_OPTIES.map(option => (
                              <div
                                key={option.value}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={option.value}
                                  id={`location-${option.value}`}
                                />
                                <Label
                                  htmlFor={`location-${option.value}`}
                                  className="font-normal cursor-pointer"
                                >
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('personalInformation')}</CardTitle>
                  <CardDescription>
                    {t('personalInformationDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="salutation"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            {t('salutation')}{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex gap-4"
                            >
                              {AANHEF_OPTIES.map(option => (
                                <div
                                  key={option.value}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={option.value}
                                    id={`salutation-${option.value}`}
                                  />
                                  <Label
                                    htmlFor={`salutation-${option.value}`}
                                    className="font-normal cursor-pointer"
                                  >
                                    {option.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="initials"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            {t('initials')}{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t('initialsPlaceholder')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            {t('lastName')}{' '}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t('lastNamePlaceholder')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                          {t('birthDate')}{' '}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            value={
                              field.value ? new Date(field.value) : undefined
                            }
                            onChange={selectedDate =>
                              field.onChange(
                                selectedDate
                                  ? selectedDate.toISOString().split('T')[0]
                                  : '',
                              )
                            }
                            placeholder={t('selectBirthDate')}
                            disabled={d => d > new Date()}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('addressInformation')}</CardTitle>
                  <CardDescription>
                    {t('addressInformationDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Controller
                    control={form.control}
                    name="postalCode"
                    render={({field: postalCodeField}) => (
                      <Controller
                        control={form.control}
                        name="houseNumber"
                        render={({field: houseNumberField}) => (
                          <Controller
                            control={form.control}
                            name="address"
                            render={({field: addressField}) => (
                              <Controller
                                control={form.control}
                                name="city"
                                render={({field: cityField}) => (
                                  <DutchAddressInput
                                    postcode={postalCodeField.value}
                                    houseNumber={houseNumberField.value}
                                    street={addressField.value}
                                    city={cityField.value}
                                    onPostcodeChange={postalCodeField.onChange}
                                    onHouseNumberChange={
                                      houseNumberField.onChange
                                    }
                                    onStreetChange={addressField.onChange}
                                    onCityChange={cityField.onChange}
                                    postcodeLabel={t('postalCode')}
                                    houseNumberLabel={t('houseNumber')}
                                    streetLabel={t('streetName')}
                                    cityLabel={t('city')}
                                    t={t}
                                  />
                                )}
                              />
                            )}
                          />
                        )}
                      />
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('contactInformation')}</CardTitle>
                  <CardDescription>
                    {t('contactInformationDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phoneOne"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>{t('phoneOne')}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder={t('phoneOnePlaceholder')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneTwo"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>{t('phoneTwo')}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder={t('phoneTwoPlaceholder')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                          {t('email')}{' '}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder={t('emailPlaceholder')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('insuranceAndMedical')}</CardTitle>
                  <CardDescription>
                    {t('insuranceAndMedicalDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="insurance"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                          {t('insurance')}{' '}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <ReactSelect
                            value={
                              field.value
                                ? {label: field.value, value: field.value}
                                : null
                            }
                            onChange={option => {
                              if (option && 'value' in option) {
                                field.onChange(option.value || '');
                              }
                            }}
                            options={ZORGVERZEKERAARS}
                            placeholder={t('selectInsurance')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specialist"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t('specialist')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t('specialistPlaceholder')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medischeIndicatie"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>{t('medicalIndication')}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={t('medicalIndicationPlaceholder')}
                            rows={4}
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
                  <span className="mr-2">{t('continueToFormSelection')}</span>
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

export default FormNewClientPage;
