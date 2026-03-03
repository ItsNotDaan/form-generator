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
} from '@/domain/form/constants/formConstants';
import {useAppDispatch} from '@/domain/store/hooks';
import {setClientData} from '@/domain/store/slices/formData';
import {ChevronRight} from 'lucide-react';
import {DatePicker} from '@/components/ui/date-picker';
import {useForm, useWatch} from 'react-hook-form';
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

const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
const postalCodeRegex = /^\d{4}\s?[A-Za-z]{2}$/;

// ---------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------

const formatFormDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const parseFormDate = (value: string): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const [day, month, year] = value.split('-');
  if (!day || !month || !year) {
    return undefined;
  }

  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed;
};

const formatBirthDateInput = (rawValue: string) => {
  let value = rawValue.replace(/\D/g, '');
  if (value.length > 8) {
    value = value.slice(0, 8);
  }

  if (value.length > 4) {
    return `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4)}`;
  }

  if (value.length > 2) {
    return `${value.slice(0, 2)}-${value.slice(2)}`;
  }

  return value;
};

// ---------------------------------------------------------------------------
// SCHEMA DEFINITION
// ---------------------------------------------------------------------------

const createFormSchema = (t: (key: string) => string) =>
  z.object({
    // Appointment information
    practitionerId: z.string().min(1, {message: t('required')}),
    date: z.string().min(1, {message: t('required')}),
    location: z.string().min(1, {message: t('required')}),

    // Personal information
    salutation: z.string().optional(),
    initials: z.string().optional(),
    clientName: z.string().optional(),
    birthDate: z.string().min(1, {message: t('required')}),
    bsn: z.string().optional(),

    // Address information
    address: z.string().min(1, {message: t('required')}),
    houseNumber: z.string().min(1, {message: t('required')}),
    postalCode: z
      .string()
      .trim()
      .min(1, {message: t('required')})
      .regex(postalCodeRegex, {message: t('invalidPostcodeMessage')}),
    city: z.string().min(1, {message: t('required')}),

    // Optional information
    email: z
      .string()
      .trim()
      .optional()
      .refine(value => !value || z.string().email().safeParse(value).success, {
        message: t('invalidEmailMessage'),
      }),
    insurance: z.string().optional(),
    phoneOne: z
      .string()
      .trim()
      .optional()
      .refine(value => !value || phoneRegex.test(value), {
        message: t('invalidPhoneMessage'),
      }),
    phoneTwo: z
      .string()
      .trim()
      .optional()
      .refine(value => !value || phoneRegex.test(value), {
        message: t('invalidPhoneMessage'),
      }),

    // Medical information
    specialist: z.string().optional(),
    medicalIndication: z.string().optional(),

    // Other variables
    optionalEnabled: z.boolean().optional(),
  });

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

const getDefaultFormValues = (): FormData => ({
  // Appointment information
  practitionerId: '',
  date: formatFormDate(new Date()),
  location: '',
  salutation: '',

  // Personal information
  initials: '',
  clientName: '',
  birthDate: '',
  bsn: '',

  // Address information
  address: '',
  houseNumber: '',
  postalCode: '',
  city: '',

  // Optional information
  email: '',
  insurance: '',
  phoneOne: '',
  phoneTwo: '',

  // Medical information
  specialist: '',
  medicalIndication: '',

  // Other variables
  optionalEnabled: false,
});

// ---------------------------------------------------------------------------
// FORM SETUP
// ---------------------------------------------------------------------------

const FormOldClientPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  const formSchema = React.useMemo(() => createFormSchema(t), [t]);

  // form: beheert de staat van het formulier, inclusief de waarden van de velden, validatie status en foutmeldingen. Het maakt gebruik van react-hook-form voor eenvoudige integratie met React componenten en zod voor schema validatie.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    shouldFocusError: true,
    defaultValues: getDefaultFormValues(),
  });

  // Persist Old Client form state across refreshes
  const {clearStorage} = useFormPersistence(
    'oldClient',
    form.watch,
    form.setValue,
  );

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

  // Handles the reset button click, which clears the persisted form state and resets the form to its default values.
  const handleResetDraft = () => {
    clearStorage();
    form.reset();
  };

  const optionalEnabled = useWatch({
    control: form.control,
    name: 'optionalEnabled',
  });

  //Needs to be watched for the auto-lookup.
  const postalCode = useWatch({
    control: form.control,
    name: 'postalCode',
  });
  //Needs to be watched for the auto-lookup.
  const houseNumber = useWatch({
    control: form.control,
    name: 'houseNumber',
  });

  // Ref to track if auto-lookup has already been triggered to prevent multiple lookups on re-renders
  const hasAutoLookupRef = React.useRef(false);

  // Address lookup logic using the custom hook
  const {
    loading: addressLoading,
    error: addressError,
    street,
    city,
    handlePostcodeBlur,
    handleHouseNumberBlur,
  } = useDutchAddressLookup({
    postcode: postalCode,
    houseNumber,
    t,
  });

  // Auto-trigger address lookup when both postal code and house number are entered.
  React.useEffect(() => {
    if (hasAutoLookupRef.current) {
      return;
    }

    if (!postalCode || !houseNumber) {
      return;
    }

    const hasPersistedAddress =
      !!form.getValues('address') || !!form.getValues('city');

    hasAutoLookupRef.current = true;

    if (!hasPersistedAddress) {
      handleHouseNumberBlur();
    }
  }, [postalCode, houseNumber, handleHouseNumberBlur, form]);

  // Auto-fill street and city when they change
  React.useEffect(() => {
    if (street) {
      form.setValue('address', street, {shouldValidate: true});
    }
    // Only clear if street is empty and user has entered both fields
    if (
      !street &&
      postalCode &&
      houseNumber &&
      (addressError || !form.getValues('address'))
    ) {
      form.setValue('address', '', {shouldValidate: true});
    }
  }, [street, addressError, postalCode, houseNumber, form]);
  React.useEffect(() => {
    if (city) {
      form.setValue('city', city, {shouldValidate: true});
    }
    if (
      !city &&
      postalCode &&
      houseNumber &&
      (addressError || !form.getValues('city'))
    ) {
      form.setValue('city', '', {shouldValidate: true});
    }
  }, [city, addressError, postalCode, houseNumber, form]);

  // Handles form submission, dispatches the form data to the Redux store and navigates to the form selection page.
  const onSubmit = (data: FormData) => {
    dispatch(
      setClientData({
        ...data,
        clientType: 'oldClient',
        location: data.location as Location,
        salutation: data.salutation as Salutation,
      }),
    );
    void router.push(Routes.form_selection);
  };

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------

  return (
    <BaseLayout title={t('oldClient')} currentStep={1}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('oldClient')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('oldClientDescription')}
          </p>
        </div>

        <FormSection>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, scrollToFirstError)}
              className="space-y-6"
            >
              {/* This is the required information section */}
              <FormCard
                title={t('requiredInformation')}
                description={t('requiredInformationDescription')}
                className="border-primary! border-2 text-primary!"
              >
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
                    <FormItemWrapper
                      label={t('salutation')}
                      requiredLabel={false}
                    >
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

                    {/* Last Name */}
                    <FormItemWrapper
                      label={t('lastName')}
                      requiredLabel={false}
                    >
                      <FormField
                        control={form.control}
                        name="clientName"
                        render={({field}) => (
                          <FormItem className="w-2/3">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t('lastNamePlaceholder')}
                                autoComplete="family-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItemWrapper>

                    {/* Birth Date */}
                    <FormItemWrapper
                      label={t('birthDate')}
                      requiredLabel={true}
                    >
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
                                autoComplete="bday"
                                onChange={e => {
                                  field.onChange(
                                    formatBirthDateInput(e.target.value),
                                  );
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

                {/* Appointment Information */}
                <FormCard
                  title={t('appointmentInformation')}
                  description={t('appointmentInformationDescription')}
                >
                  <FormBlock columns={2}>
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
                                value={parseFormDate(field.value)}
                                onChange={selectedDate => {
                                  field.onChange(
                                    selectedDate
                                      ? formatFormDate(selectedDate)
                                      : '',
                                  );
                                }}
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

                {/* Address Information */}
                <FormCard
                  title={t('addressInformation')}
                  description={t('addressInformationDescription')}
                >
                  <FormBlock columns={2}>
                    <FormItemWrapper
                      label={t('postalCode')}
                      requiredLabel={true}
                    >
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
                                autoComplete="postal-code"
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

                    {/* House Number can be 304 but also 29-304 or 89-A*/}
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
                                autoComplete="address-line2"
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
                    <FormItemWrapper
                      label={t('streetName')}
                      requiredLabel={true}
                    >
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
                                autoComplete="address-line1"
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
                                autoComplete="address-level2"
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
                      {addressLoading
                        ? t('addressLoadingMessage')
                        : addressError}
                    </div>
                  )}
                </FormCard>
              </FormCard>

              {/* This is the optional information section. */}
              <FormCard
                title={t('optionalInformation')}
                description={t('optionalInformationDescription')}
                toggleAble={true}
                toggleLabel={t('showOptionalInformation')}
                toggleId="steunzolen-toggle"
                defaultOpen={optionalEnabled}
                onToggleChange={isOpen => {
                  form.setValue('optionalEnabled', isOpen, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                {/* Appointment information section of the company */}
                <FormCard
                  title={t('appointmentInformation')}
                  description={t('appointmentInformationDescription')}
                >
                  <FormBlock columns={2}>
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
                                disabled
                              >
                                <SelectTrigger
                                  className="w-full bg-muted cursor-not-allowed"
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
                              <Input
                                {...field}
                                placeholder={t('selectDate')}
                                readOnly
                                disabled
                                className="bg-muted cursor-not-allowed"
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
                                disabled
                              >
                                <SelectTrigger
                                  className="w-full bg-muted cursor-not-allowed"
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

                {/* Personal Information of the client*/}
                <FormCard
                  title={t('personalInformation')}
                  description={t('personalInformationDescription')}
                >
                  <FormBlock
                    columns={3}
                    // dividers={true}
                  >
                    {/* Salutation */}
                    <FormItemWrapper
                      label={t('salutation')}
                      requiredLabel={false}
                    >
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
                                disabled
                              >
                                {SALUTATION_OPTIONS.map(option => (
                                  <div
                                    key={option.value}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={option.value}
                                      id={`salutation-duplicate-${option.value}`}
                                      disabled
                                      className="cursor-not-allowed"
                                    />
                                    <Label
                                      htmlFor={`salutation-duplicate-${option.value}`}
                                      className="font-normal cursor-not-allowed opacity-60"
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
                    <FormItemWrapper
                      label={t('initials')}
                      requiredLabel={false}
                    >
                      <FormField
                        control={form.control}
                        name="initials"
                        render={({field}) => (
                          <FormItem className="w-2/3">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t('initialsPlaceholder')}
                                autoComplete="given-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItemWrapper>

                    {/* Last Name */}
                    <FormItemWrapper
                      label={t('lastName')}
                      requiredLabel={false}
                    >
                      <FormField
                        control={form.control}
                        name="clientName"
                        render={({field}) => (
                          <FormItem className="w-2/3">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t('lastNamePlaceholder')}
                                autoComplete="family-name"
                                readOnly
                                disabled
                                className="bg-muted cursor-not-allowed"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItemWrapper>
                  </FormBlock>

                  <FormBlock columns={2}>
                    {/* Birth Date */}
                    <FormItemWrapper
                      label={t('birthDate')}
                      requiredLabel={true}
                    >
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
                                autoComplete="bday"
                                readOnly
                                disabled
                                className="bg-muted cursor-not-allowed"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItemWrapper>

                    {/* BSN Niet verplicht  */}
                    <FormItemWrapper label={t('bsn')} requiredLabel={false}>
                      <FormField
                        control={form.control}
                        name="bsn"
                        render={({field}) => (
                          <FormItem className="w-2/3">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={t('bsnPlaceholder')}
                                type="text"
                                maxLength={9}
                                onChange={e => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    '',
                                  );
                                  field.onChange(value);
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

                {/* Contact Information */}
                <FormCard
                  title={t('contactInformation')}
                  description={t('contactInformationDescription')}
                >
                  {/* Phone Numbers */}
                  <FormBlock columns={2}>
                    <FormItemWrapper
                      label={t('phoneOne')}
                      requiredLabel={false}
                    >
                      <FormField
                        control={form.control}
                        name="phoneOne"
                        render={({field}) => (
                          <FormItem className="w-2/3">
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                autoComplete="tel"
                                placeholder={t('phoneOnePlaceholder')}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItemWrapper>
                    <FormItemWrapper
                      label={t('phoneTwo')}
                      requiredLabel={false}
                    >
                      <FormField
                        control={form.control}
                        name="phoneTwo"
                        render={({field}) => (
                          <FormItem className="w-2/3">
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                autoComplete="tel"
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
                    <FormItemWrapper label={t('email')} requiredLabel={false}>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                          <FormItem className="w-2/3">
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                autoComplete="email"
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
                    <FormItemWrapper
                      label={t('insurance')}
                      requiredLabel={false}
                    >
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
              </FormCard>

              {/* This is the footer of the form */}
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
