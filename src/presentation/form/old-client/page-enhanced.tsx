import React, {useState} from 'react';
import {BaseLayout} from '@/presentation/components/layout';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Alert,
  AlertIcon,
  FormSection,
  FormDivider,
  DatePicker,
  Select,
  SelectOption,
  FormContainer,
  PageContainer,
  FormRow,
  FormFieldWrapper,
} from '@/presentation/components/ui';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {
  LOCATIE_OPTIES,
  AANHEF_OPTIES,
  BEHANDELAARS,
  ZORGVERZEKERAARS,
  Locatie,
  Aanhef,
} from '@/presentation/form/constants/formConstants';
import {useAppDispatch} from '@/domain/store/hooks';
import {setClientData} from '@/domain/store/slices/formData';
import {focusAndHighlightInvalidFields} from '@/utils/warningNavigationMap';

export const FormOldClientPageEnhanced = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor client data
  const [date, setDate] = useState('');
  const [location, setLocation] = useState<Locatie | ''>('');
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [salutation, setSalutation] = useState<Aanhef | ''>('');
  const [initials, setInitials] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [city, setCity] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [insurance, setInsurance] = useState('');
  const [medischeIndicatie, setMedischeIndicatie] = useState('');
  const [practitionerId, setPractitionerId] = useState<string | undefined>(
    undefined
  );
  const [phoneOne, setPhoneOne] = useState('');
  const [phoneTwo, setPhoneTwo] = useState('');
  const [specialist, setSpecialist] = useState('');

  const practitionerOptions: SelectOption[] = BEHANDELAARS.map(b => ({
    label: b.label,
    value: b.value,
  }));

  const insuranceOptions: SelectOption[] = ZORGVERZEKERAARS.map(z => ({
    label: z,
    value: z,
  }));

  const getMissingFields = (): Array<{fieldName: string; fieldId: string}> => {
    const missing: Array<{fieldName: string; fieldId: string}> = [];

    if (!practitionerId) {
      missing.push({
        fieldName: t('practitioner'),
        fieldId: 'field-behandelaar',
      });
    }
    if (!date) {
      missing.push({
        fieldName: t('measurementDate'),
        fieldId: 'field-aanmeetdatum',
      });
    }
    if (!location) {
      missing.push({fieldName: t('location'), fieldId: 'field-locatie'});
    }
    if (!salutation) {
      missing.push({fieldName: t('salutation'), fieldId: 'field-aanhef'});
    }
    if (!initials.trim()) {
      missing.push({fieldName: t('initials'), fieldId: 'field-voorletters'});
    }
    if (!clientName.trim()) {
      missing.push({fieldName: t('lastName'), fieldId: 'field-achternaam'});
    }
    if (!birthDate) {
      missing.push({fieldName: t('birthDate'), fieldId: 'field-geboortedatum'});
    }
    if (!address.trim()) {
      missing.push({fieldName: t('streetName'), fieldId: 'field-straatnaam'});
    }
    if (!postalCode.trim()) {
      missing.push({fieldName: t('postalCode'), fieldId: 'field-postcode'});
    }
    if (!houseNumber.trim()) {
      missing.push({fieldName: t('houseNumber'), fieldId: 'field-huisnummer'});
    }
    if (!city.trim()) {
      missing.push({fieldName: t('city'), fieldId: 'field-stad'});
    }
    if (!phoneOne.trim()) {
      missing.push({fieldName: t('phone1'), fieldId: 'field-telefoon1'});
    }
    if (!email.trim()) {
      missing.push({fieldName: t('email'), fieldId: 'field-emailadres'});
    }
    if (!insurance.trim()) {
      missing.push({
        fieldName: t('insuranceCompany'),
        fieldId: 'field-verzekeringsmaatschappij',
      });
    }
    if (!specialist.trim()) {
      missing.push({
        fieldName: t('specialistGp'),
        fieldId: 'field-specialisthuisarts',
      });
    }

    return missing;
  };

  const areAllFieldsValid = getMissingFields().length === 0;

  const handleSubmit = () => {
    if (!areAllFieldsValid) {
      const missingFields = getMissingFields();
      focusAndHighlightInvalidFields(missingFields.map(f => f.fieldId));
      return;
    }
    
    dispatch(
      setClientData({
        practitionerId,
        date,
        location: location || undefined,
        salutation: salutation || undefined,
        initials,
        clientName,
        birthDate,
        address,
        postalCode,
        houseNumber,
        city,
        phoneOne,
        phoneTwo,
        email,
        medischeIndicatie,
        insurance,
        specialist,
      })
    );

    router.push(Routes.form_selection);
  };

  return (
    <BaseLayout
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
      currentStep={1}
    >
      <FormContainer id="client-data-section">
        <PageContainer>
          {/* Header */}
          <div className="text-center space-y-2 pb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('existingClientForm')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('fillClientInformation')}
            </p>
          </div>

          <FormDivider />

          {/* Behandelaar en Aanmeetdatum */}
          <FormSection 
            title={t('practitionerAndDate')} 
            description={t('selectPractitionerAndDate')}
            bordered
          >
            <FormRow columns={2}>
              <FormFieldWrapper id="field-behandelaar">
                <FormControl isRequired>
                  <FormLabel className="text-sm font-semibold">
                    {t('practitioner')}
                  </FormLabel>
                  <Select
                    options={practitionerOptions}
                    value={practitionerOptions.find(o => o.value === practitionerId) || null}
                    onChange={option => setPractitionerId(option?.value)}
                    placeholder={t('choosePractitioner')}
                    error={!practitionerId}
                  />
                </FormControl>
              </FormFieldWrapper>
              <FormFieldWrapper id="field-aanmeetdatum">
                <FormControl isRequired>
                  <FormLabel className="text-sm font-semibold">
                    {t('measurementDate')}
                  </FormLabel>
                  <DatePicker
                    date={date ? new Date(date) : undefined}
                    onDateChanged={d => d && setDate(d.toISOString())}
                    error={!date}
                  />
                </FormControl>
              </FormFieldWrapper>
            </FormRow>
          </FormSection>

          {/* Locatie */}
          <FormSection title={t('location')} bordered>
            <div id="field-locatie">
              <FormControl isRequired>
                <RadioGroup value={location} onChange={v => setLocation(v as Locatie)}>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {LOCATIE_OPTIES.map(o => (
                      <Radio key={o.value} value={o.value} id={`radio-locatie-${o.value}`}>
                        {o.label}
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
          </FormSection>

          {/* Persoonlijke gegevens */}
          <FormSection 
            title={t('personalInformation')} 
            description={t('enterPersonalDetails')}
            bordered
          >
            <div className="space-y-6">
              {/* Aanhef */}
              <div id="field-aanhef">
                <FormControl isRequired>
                  <FormLabel className="text-sm font-semibold">{t('salutation')}</FormLabel>
                  <RadioGroup value={salutation} onChange={v => setSalutation(v as Aanhef)}>
                    <div className="flex flex-row gap-6">
                      {AANHEF_OPTIES.map(o => (
                        <Radio key={o.value} value={o.value} id={`radio-aanhef-${o.value}`}>
                          {o.label}
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>

              {/* Voorletters en Achternaam */}
              <FormRow>
                <FormFieldWrapper id="field-voorletters">
                  <FormControl isRequired>
                    <FormLabel htmlFor="input-voorletters" className="text-sm font-semibold">
                      {t('initials')}
                    </FormLabel>
                    <Input
                      id="input-voorletters"
                      name="initials"
                      value={initials}
                      onChange={e => setInitials(e.target.value)}
                      placeholder={t('initialsPlaceholder')}
                      error={initials.trim().length === 0}
                    />
                  </FormControl>
                </FormFieldWrapper>
                <FormFieldWrapper id="field-achternaam">
                  <FormControl isRequired>
                    <FormLabel htmlFor="input-achternaam" className="text-sm font-semibold">
                      {t('lastName')}
                    </FormLabel>
                    <Input
                      id="input-achternaam"
                      name="lastName"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder={t('lastNamePlaceholder')}
                      error={clientName.trim().length === 0}
                    />
                  </FormControl>
                </FormFieldWrapper>
              </FormRow>

              {/* Geboortedatum */}
              <div id="field-geboortedatum">
                <FormControl isRequired>
                  <FormLabel className="text-sm font-semibold">{t('birthDate')}</FormLabel>
                  <DatePicker
                    date={birthDate ? new Date(birthDate) : undefined}
                    onDateChanged={date => date && setBirthDate(date.toISOString())}
                    error={birthDate.length === 0}
                  />
                </FormControl>
              </div>
            </div>
          </FormSection>

          {/* Adresgegevens */}
          <FormSection title={t('addressInformation')} bordered>
            <div className="space-y-6">
              <FormRow>
                <FormFieldWrapper id="field-postcode">
                  <FormControl isRequired>
                    <FormLabel htmlFor="input-postcode" className="text-sm font-semibold">
                      {t('postalCode')}
                    </FormLabel>
                    <Input
                      id="input-postcode"
                      name="postalCode"
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      placeholder={t('postalCodePlaceholder')}
                      error={postalCode.trim().length === 0}
                    />
                  </FormControl>
                </FormFieldWrapper>
                <FormFieldWrapper id="field-huisnummer">
                  <FormControl isRequired>
                    <FormLabel htmlFor="input-huisnummer" className="text-sm font-semibold">
                      {t('houseNumber')}
                    </FormLabel>
                    <Input
                      id="input-huisnummer"
                      name="houseNumber"
                      value={houseNumber}
                      onChange={e => setHouseNumber(e.target.value)}
                      placeholder={t('houseNumberPlaceholder')}
                      error={houseNumber.trim().length === 0}
                    />
                  </FormControl>
                </FormFieldWrapper>
              </FormRow>

              <FormRow>
                <FormFieldWrapper id="field-straatnaam">
                  <FormControl isRequired>
                    <FormLabel htmlFor="input-straatnaam" className="text-sm font-semibold">
                      {t('streetName')}
                    </FormLabel>
                    <Input
                      id="input-straatnaam"
                      name="streetName"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder={t('streetNamePlaceholder')}
                      error={address.trim().length === 0}
                    />
                  </FormControl>
                </FormFieldWrapper>
                <FormFieldWrapper id="field-stad">
                  <FormControl isRequired>
                    <FormLabel htmlFor="input-stad" className="text-sm font-semibold">
                      {t('city')}
                    </FormLabel>
                    <Input
                      id="input-stad"
                      name="city"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder={t('cityPlaceholder')}
                      error={city.trim().length === 0}
                    />
                  </FormControl>
                </FormFieldWrapper>
              </FormRow>
            </div>
          </FormSection>

          {/* Contactgegevens */}
          <FormSection title={t('contactInformation')} bordered>
            <div className="space-y-6">
              <FormRow>
                <FormFieldWrapper id="field-telefoon1">
                  <FormControl isRequired>
                    <FormLabel htmlFor="input-telefoon1" className="text-sm font-semibold">
                      {t('phone1')}
                    </FormLabel>
                    <Input
                      id="input-telefoon1"
                      name="phone1"
                      type="tel"
                      value={phoneOne}
                      onChange={e => setPhoneOne(e.target.value)}
                      placeholder={t('phone1Placeholder')}
                      error={phoneOne.trim().length === 0}
                    />
                  </FormControl>
                </FormFieldWrapper>
                <FormFieldWrapper id="field-telefoon2">
                  <FormControl>
                    <FormLabel htmlFor="input-telefoon2" className="text-sm font-semibold">
                      {t('phone2')}
                    </FormLabel>
                    <Input
                      id="input-telefoon2"
                      name="phone2"
                      type="tel"
                      value={phoneTwo}
                      onChange={e => setPhoneTwo(e.target.value)}
                      placeholder={t('phone2Placeholder')}
                    />
                  </FormControl>
                </FormFieldWrapper>
              </FormRow>

              <div id="field-emailadres">
                <FormControl isRequired>
                  <FormLabel htmlFor="input-emailadres" className="text-sm font-semibold">
                    {t('email')}
                  </FormLabel>
                  <Input
                    id="input-emailadres"
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    error={email.trim().length === 0}
                  />
                </FormControl>
              </div>
            </div>
          </FormSection>

          {/* Verzekering en Medische info */}
          <FormSection title={t('insuranceAndMedicalInformation')} bordered>
            <div className="space-y-6">
              <div id="field-verzekeringsmaatschappij">
                <FormControl isRequired>
                  <FormLabel className="text-sm font-semibold">{t('insuranceCompany')}</FormLabel>
                  <Select
                    options={insuranceOptions}
                    value={insuranceOptions.find(o => o.value === insurance) || null}
                    onChange={option => setInsurance(option?.value || '')}
                    placeholder={t('chooseInsurance')}
                    isCreatable
                    error={insurance.trim().length === 0}
                  />
                </FormControl>
              </div>

              <div id="field-specialisthuisarts">
                <FormControl isRequired>
                  <FormLabel htmlFor="input-specialist" className="text-sm font-semibold">
                    {t('specialistGp')}
                  </FormLabel>
                  <Input
                    id="input-specialist"
                    name="specialist"
                    value={specialist}
                    onChange={e => setSpecialist(e.target.value)}
                    placeholder={t('specialistGpPlaceholder')}
                    error={specialist.trim().length === 0}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl>
                  <FormLabel htmlFor="input-medische-indicatie" className="text-sm font-semibold">
                    {t('medicalIndication')}
                  </FormLabel>
                  <Textarea
                    id="input-medische-indicatie"
                    value={medischeIndicatie}
                    onChange={e => setMedischeIndicatie(e.target.value)}
                    placeholder={t('medicalIndicationPlaceholder')}
                    className="min-h-[100px] md:min-h-[120px]"
                  />
                </FormControl>
              </div>
            </div>
          </FormSection>

          {!areAllFieldsValid && (
            <Alert status="warning" className="rounded-xl">
              <AlertIcon status="warning" />
              <div>
                <p className="font-bold mb-2">{t('fillRequiredFields')}</p>
                <ul className="list-disc list-inside space-y-1">
                  {getMissingFields().map((field, index) => (
                    <li key={index} className="text-sm">{field.fieldName}</li>
                  ))}
                </ul>
              </div>
            </Alert>
          )}

          <div className="flex justify-stretch sm:justify-end pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {t('saveAndContinue')}
            </Button>
          </div>
        </PageContainer>
      </FormContainer>
    </BaseLayout>
  );
};

export default FormOldClientPageEnhanced;
