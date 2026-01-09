import React from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {
  LOCATION_OPTIONS,
  SALUTATION_OPTIONS,
  PRACTITIONERS,
  INSURANCE_COMPANIES,
  Location,
  Salutation,
} from '@/lib/constants/formConstants';
import {useAppDispatch} from '@/domain/store/hooks';
import {setClientData} from '@/domain/store/slices/formData';
import {ChevronRight} from 'lucide-react';
import {DatePicker} from '@/components/ui/date-picker';
import {useForm} from 'react-hook-form';
import {useFormPersistence} from '@/hooks/useFormPersistence';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {useDutchAddressLookup} from '@/components/ui/dutch-address-input';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';

const FormOldClientPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  const formSchema = z.object({
    practitionerId: z.string().min(1, {message: 'Required'}),
    date: z.string().min(1, {message: 'Required'}),
    location: z.string().min(1, {message: 'Required'}),
    salutation: z.string().min(1, {message: 'Required'}),
    initials: z.string().min(1, {message: 'Required'}),
    clientName: z.string().min(1, {message: 'Required'}),
    birthDate: z.string().optional(),
    address: z.string().optional(),
    houseNumber: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    email: z.string().optional(),
    insurance: z.string().min(1, {message: 'Required'}),
    phoneOne: z.string().optional(),
    phoneTwo: z.string().optional(),
    specialist: z.string().optional(),
    medicalIndication: z.string().optional(),
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
      medicalIndication: '',
    },
  });

  // Persist Old Client form state across refreshes
  const {clearStorage} = useFormPersistence(
    'oldClient',
    form.watch,
    form.setValue,
  );

  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  // Persist Old Client form state across refreshes
  useFormPersistence('oldClient', form.watch, form.setValue);

  // Address lookup logic using the custom hook
  const {
    loading: addressLoading,
    error: addressError,
    street,
    city,
    handlePostcodeBlur,
    handleHouseNumberBlur,
  } = useDutchAddressLookup({
    postcode: form.watch('postalCode') || '',
    houseNumber: form.watch('houseNumber') || '',
    t,
  });

  // Auto-fill street and city when they change
  React.useEffect(() => {
    if (street) {
      form.setValue('address', street, {shouldValidate: true});
    }
    // Only clear if street is empty and user has entered both fields
    if (
      !street &&
      form.getValues('postalCode') &&
      form.getValues('houseNumber')
    ) {
      form.setValue('address', '', {shouldValidate: true});
    }
  }, [street]);
  React.useEffect(() => {
    if (city) {
      form.setValue('city', city, {shouldValidate: true});
    }
    if (
      !city &&
      form.getValues('postalCode') &&
      form.getValues('houseNumber')
    ) {
      form.setValue('city', '', {shouldValidate: true});
    }
  }, [city]);
  const onSubmit = (data: FormData) => {
    dispatch(
      setClientData({
        practitionerId: data.practitionerId,
        date: data.date,
        location: data.location as Location,
        salutation: data.salutation as Salutation,
        initials: data.initials,
        clientName: data.clientName,
        birthDate: data.birthDate || '',
        address: data.address || '',
        houseNumber: data.houseNumber || '',
        postalCode: data.postalCode || '',
        city: data.city || '',
        phoneOne: data.phoneOne || '',
        phoneTwo: data.phoneTwo || '',
        email: data.email || '',
        insurance: data.insurance,
        medicalIndication: data.medicalIndication || '',
        specialist: data.specialist || '',
      }),
    );
    clearStorage();
    void router.push(Routes.form_selection);
  };

  return (
    <BaseLayout title={t('existingClient')} currentStep={1}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('existingClient')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('existingClientDescription')}
          </p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              <FormCard
                title={t('appointmentInformation')}
                description={t('appointmentInformationDescription')}
              >
                <FormBlock
                  columns={2}
                  // dividers={true}
                >
                  {/* Practitioner */}
                  <FormItemWrapper
                    label={t('practitioner')}
                    requiredLabel={true}
                  >
                    <FormField
                      control={form.control}
                      name="practitionerId"
                      render={({field, fieldState}) => (
                        <FormItem className="w-2/3">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                className="w-full"
                                aria-invalid={!!fieldState.error}
                              >
                                <SelectValue
                                  placeholder={t('selectPractitioner')}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {PRACTITIONERS.map(option => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>

                  {/* Measurement Date */}
                  <FormItemWrapper
                    label={t('measurementDate')}
                    requiredLabel={true}
                  >
                    <FormField
                      control={form.control}
                      name="date"
                      render={({field}) => (
                        <FormItem className="w-2/3">
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
                  </FormItemWrapper>
                </FormBlock>

                <FormBlock>
                  <FormItemWrapper label={t('location')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="location"
                      render={({field, fieldState}) => (
                        <FormItem className="w-2/3">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                className="w-full"
                                aria-invalid={!!fieldState.error}
                              >
                                <SelectValue
                                  placeholder={t('selectLocation')}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {LOCATION_OPTIONS.map(option => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Personal Information */}
              <FormCard
                title={t('personalInformation')}
                description={t('personalInformationDescription')}
              >
                <FormBlock
                  columns={3}
                  // dividers={true}
                >
                  {/* Salutation */}
                  <FormItemWrapper label={t('salutation')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="salutation"
                      render={({field, fieldState}) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex gap-4"
                              aria-invalid={!!fieldState?.error}
                            >
                              {SALUTATION_OPTIONS.map(option => (
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
                  </FormItemWrapper>

                  {/* Initials */}
                  <FormItemWrapper label={t('initials')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="initials"
                      render={({field}) => (
                        <FormItem>
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
                  </FormItemWrapper>

                  {/* Last Name */}
                  <FormItemWrapper label={t('lastName')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({field}) => (
                        <FormItem className="w-full">
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
                  </FormItemWrapper>
                </FormBlock>

                <FormBlock>
                  {/* Birth Date */}
                  <FormItemWrapper label={t('birthDate')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({field}) => (
                        <FormItem className="w-2/3">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t('selectBirthDate')}
                              maxLength={10}
                              onChange={e => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 8) {
                                  value = value.slice(0, 8);
                                }
                                let formatted = value;
                                if (value.length > 4) {
                                  formatted = `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4)}`;
                                } else if (value.length > 2) {
                                  formatted = `${value.slice(0, 2)}-${value.slice(2)}`;
                                }
                                field.onChange(formatted);
                              }}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Address Information */}

              <FormCard
                title={t('addressInformation')}
                description={t('addressInformationDescription')}
              >
                <FormBlock columns={2}>
                  <FormItemWrapper label={t('postalCode')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({field, fieldState}) => (
                        <FormItem className="w-3/4">
                          <FormControl>
                            <Input
                              {...field}
                              id="postcode"
                              placeholder={t('postalCodePlaceholder')}
                              aria-invalid={
                                !!fieldState.error || !!addressError
                              }
                              onBlur={e => {
                                field.onBlur();
                                handlePostcodeBlur();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>
                  <FormItemWrapper
                    label={t('houseNumber')}
                    requiredLabel={true}
                  >
                    <FormField
                      control={form.control}
                      name="houseNumber"
                      render={({field, fieldState}) => (
                        <FormItem className="w-3/4">
                          <FormControl>
                            <Input
                              {...field}
                              id="houseNumber"
                              placeholder={t('houseNumberPlaceholder')}
                              aria-invalid={
                                !!fieldState.error || !!addressError
                              }
                              onBlur={e => {
                                field.onBlur();
                                handleHouseNumberBlur();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>
                  <FormItemWrapper label={t('streetName')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({field}) => (
                        <FormItem className="w-3/4">
                          <FormControl>
                            <Input
                              {...field}
                              id="street"
                              placeholder={t('autofill')}
                              readOnly
                              tabIndex={-1}
                              className="bg-muted cursor-default pointer-events-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>
                  <FormItemWrapper label={t('city')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="city"
                      render={({field}) => (
                        <FormItem className="w-3/4">
                          <FormControl>
                            <Input
                              {...field}
                              id="city"
                              placeholder={t('autofill')}
                              readOnly
                              tabIndex={-1}
                              className="bg-muted cursor-default pointer-events-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>
                </FormBlock>
                {/* Address lookup error and loading state */}
                {(addressError || addressLoading) && (
                  <div className="text-sm text-destructive mt-2 min-h-[1.5em]">
                    {addressLoading ? t('addressLoadingMessage') : addressError}
                  </div>
                )}
              </FormCard>

              {/* Contact Information */}
              <FormCard
                title={t('contactInformation')}
                description={t('contactInformationDescription')}
              >
                {/* Phone Numbers */}
                <FormBlock columns={2}>
                  <FormItemWrapper label={t('phoneOne')} requiredLabel={false}>
                    <FormField
                      control={form.control}
                      name="phoneOne"
                      render={({field}) => (
                        <FormItem className="w-2/3">
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
                  </FormItemWrapper>
                  <FormItemWrapper label={t('phoneTwo')} requiredLabel={false}>
                    <FormField
                      control={form.control}
                      name="phoneTwo"
                      render={({field}) => (
                        <FormItem className="w-2/3">
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
                  </FormItemWrapper>
                </FormBlock>

                {/* Email */}
                <FormBlock columns={1}>
                  <FormItemWrapper label={t('email')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({field}) => (
                        <FormItem className="w-2/3">
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
                  </FormItemWrapper>
                </FormBlock>
              </FormCard>

              {/* Insurance and Medical Information */}
              <FormCard
                title={t('insuranceAndMedical')}
                description={t('insuranceAndMedicalDescription')}
              >
                <FormBlock>
                  {/* Insurance */}
                  <FormItemWrapper label={t('insurance')} requiredLabel={true}>
                    <FormField
                      control={form.control}
                      name="insurance"
                      render={({field, fieldState}) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                className="w-full"
                                aria-invalid={!!fieldState.error}
                              >
                                <SelectValue
                                  placeholder={t('selectInsurance')}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {INSURANCE_COMPANIES.map(option => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItemWrapper>

                  {/* Specialist */}
                  <FormItemWrapper
                    label={t('specialist')}
                    requiredLabel={true}
                    className="w-full"
                  >
                    <FormField
                      control={form.control}
                      name="specialist"
                      render={({field}) => (
                        <FormItem className="w-full">
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
                  </FormItemWrapper>

                  {/* Medical Indication */}
                  <FormItemWrapper
                    label={t('medicalIndication')}
                    requiredLabel={false}
                    className="w-full"
                  >
                    <FormField
                      control={form.control}
                      name="medicalIndication"
                      render={({field}) => (
                        <FormItem className="w-full">
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
                  </FormItemWrapper>
                </FormBlock>
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

export default FormOldClientPage;
