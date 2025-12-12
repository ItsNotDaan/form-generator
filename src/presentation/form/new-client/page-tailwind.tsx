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

export const FormNewClientPageTailwind = () => {
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

  // Convert options for Select component
  const practitionerOptions: SelectOption[] = BEHANDELAARS.map(b => ({
    label: b.label,
    value: b.value,
  }));

  const insuranceOptions: SelectOption[] = ZORGVERZEKERAARS.map(z => ({
    label: z,
    value: z,
  }));

  // Validation: check which required fields are missing
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
      title={t('newClientForm')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <div className="w-full flex flex-col bg-white p-4 md:p-6 rounded-md gap-4 md:gap-6" id="client-data-section">
        {/* Behandelaar en Aanmeetdatum */}
        <FormSection title={t('practitionerAndDate')} bordered>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div id="field-behandelaar" className="flex-1">
              <FormControl isRequired>
                <FormLabel className="text-sm">{t('practitioner')}</FormLabel>
                <Select
                  options={practitionerOptions}
                  value={practitionerOptions.find(o => o.value === practitionerId) || null}
                  onChange={option => setPractitionerId(option?.value)}
                  placeholder={t('choosePractitioner')}
                  error={!practitionerId}
                />
              </FormControl>
            </div>
            <div id="field-aanmeetdatum" className="flex-1">
              <FormControl isRequired>
                <FormLabel className="text-sm">{t('measurementDate')}</FormLabel>
                <div className="max-w-full md:max-w-[300px]">
                  <DatePicker
                    date={date ? new Date(date) : undefined}
                    onDateChanged={d => d && setDate(d.toISOString())}
                    error={!date}
                  />
                </div>
              </FormControl>
            </div>
          </div>
        </FormSection>

        <FormDivider />

        {/* Locatie */}
        <FormSection title={t('location')} bordered>
          <div id="field-locatie">
            <FormControl isRequired>
              <FormLabel className="text-sm">{t('location')}</FormLabel>
              <RadioGroup value={location} onChange={v => setLocation(v as Locatie)}>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
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

        <FormDivider />

        {/* Persoonlijke gegevens */}
        <FormSection title={t('personalInformation')} bordered>
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Aanhef */}
            <div id="field-aanhef">
              <FormControl isRequired>
                <FormLabel className="text-sm">{t('salutation')}</FormLabel>
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
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div id="field-voorletters" className="flex-1">
                <FormControl isRequired>
                  <FormLabel htmlFor="input-voorletters" className="text-sm">
                    {t('initials')}
                  </FormLabel>
                  <Input
                    id="input-voorletters"
                    name="initials"
                    value={initials}
                    onChange={e => setInitials(e.target.value)}
                    placeholder={t('initialsPlaceholder')}
                    className="text-sm"
                    error={initials.trim().length === 0}
                  />
                </FormControl>
              </div>
              <div id="field-achternaam" className="flex-1">
                <FormControl isRequired>
                  <FormLabel htmlFor="input-achternaam" className="text-sm">
                    {t('lastName')}
                  </FormLabel>
                  <Input
                    id="input-achternaam"
                    name="lastName"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder={t('lastNamePlaceholder')}
                    className="text-sm"
                    error={clientName.trim().length === 0}
                  />
                </FormControl>
              </div>
            </div>

            {/* Geboortedatum */}
            <div id="field-geboortedatum">
              <FormControl isRequired>
                <FormLabel className="text-sm">{t('birthDate')}</FormLabel>
                <DatePicker
                  date={birthDate ? new Date(birthDate) : undefined}
                  onDateChanged={date => date && setBirthDate(date.toISOString())}
                  error={birthDate.length === 0}
                />
              </FormControl>
            </div>
          </div>
        </FormSection>

        <FormDivider />

        {/* Adresgegevens */}
        <FormSection title={t('addressInformation')} bordered>
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Postcode en Huisnummer */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <div id="field-postcode" className="flex-1">
                <FormControl isRequired>
                  <FormLabel htmlFor="input-postcode" className="text-sm">
                    {t('postalCode')}
                  </FormLabel>
                  <Input
                    id="input-postcode"
                    name="postalCode"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    placeholder={t('postalCodePlaceholder')}
                    className="text-sm"
                    error={postalCode.trim().length === 0}
                  />
                </FormControl>
              </div>
              <div id="field-huisnummer" className="flex-1">
                <FormControl isRequired>
                  <FormLabel htmlFor="input-huisnummer" className="text-sm">
                    {t('houseNumber')}
                  </FormLabel>
                  <Input
                    id="input-huisnummer"
                    name="houseNumber"
                    value={houseNumber}
                    onChange={e => setHouseNumber(e.target.value)}
                    placeholder={t('houseNumberPlaceholder')}
                    className="text-sm"
                    error={houseNumber.trim().length === 0}
                  />
                </FormControl>
              </div>
            </div>

            {/* Straatnaam en Stad */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div id="field-straatnaam" className="flex-1">
                <FormControl isRequired>
                  <FormLabel htmlFor="input-straatnaam" className="text-sm">
                    {t('streetName')}
                  </FormLabel>
                  <Input
                    id="input-straatnaam"
                    name="streetName"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder={t('streetNamePlaceholder')}
                    className="text-sm"
                    error={address.trim().length === 0}
                  />
                </FormControl>
              </div>
              <div id="field-stad" className="flex-1">
                <FormControl isRequired>
                  <FormLabel htmlFor="input-stad" className="text-sm">
                    {t('city')}
                  </FormLabel>
                  <Input
                    id="input-stad"
                    name="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder={t('cityPlaceholder')}
                    className="text-sm"
                    error={city.trim().length === 0}
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </FormSection>

        <FormDivider />

        {/* Contactgegevens */}
        <FormSection title={t('contactInformation')} bordered>
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Telefoon nummers */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div id="field-telefoon1" className="flex-1">
                <FormControl isRequired>
                  <FormLabel htmlFor="input-telefoon1" className="text-sm">
                    {t('phone1')}
                  </FormLabel>
                  <Input
                    id="input-telefoon1"
                    name="phone1"
                    type="tel"
                    value={phoneOne}
                    onChange={e => setPhoneOne(e.target.value)}
                    placeholder={t('phone1Placeholder')}
                    className="text-sm"
                    error={phoneOne.trim().length === 0}
                  />
                </FormControl>
              </div>
              <div id="field-telefoon2" className="flex-1">
                <FormControl>
                  <FormLabel htmlFor="input-telefoon2" className="text-sm">
                    {t('phone2')}
                  </FormLabel>
                  <Input
                    id="input-telefoon2"
                    name="phone2"
                    type="tel"
                    value={phoneTwo}
                    onChange={e => setPhoneTwo(e.target.value)}
                    placeholder={t('phone2Placeholder')}
                    className="text-sm"
                  />
                </FormControl>
              </div>
            </div>

            {/* Email */}
            <div id="field-emailadres">
              <FormControl isRequired>
                <FormLabel htmlFor="input-emailadres" className="text-sm">
                  {t('email')}
                </FormLabel>
                <Input
                  id="input-emailadres"
                  name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="text-sm"
                  error={email.trim().length === 0}
                />
              </FormControl>
            </div>
          </div>
        </FormSection>

        <FormDivider />

        {/* Verzekering en Medische info */}
        <FormSection title={t('insuranceAndMedicalInformation')} bordered>
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Zorgverzekering */}
            <div id="field-verzekeringsmaatschappij">
              <FormControl isRequired>
                <FormLabel className="text-sm">{t('insuranceCompany')}</FormLabel>
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

            {/* Specialist/Huisarts */}
            <div id="field-specialisthuisarts">
              <FormControl isRequired>
                <FormLabel htmlFor="input-specialist" className="text-sm">
                  {t('specialistGp')}
                </FormLabel>
                <Input
                  id="input-specialist"
                  name="specialist"
                  value={specialist}
                  onChange={e => setSpecialist(e.target.value)}
                  placeholder={t('specialistGpPlaceholder')}
                  className="text-sm"
                  error={specialist.trim().length === 0}
                />
              </FormControl>
            </div>

            {/* Medische Indicatie */}
            <div>
              <FormControl>
                <FormLabel htmlFor="input-medische-indicatie" className="text-sm">
                  {t('medicalIndication')}
                </FormLabel>
                <Textarea
                  id="input-medische-indicatie"
                  value={medischeIndicatie}
                  onChange={e => setMedischeIndicatie(e.target.value)}
                  placeholder={t('medicalIndicationPlaceholder')}
                  className="min-h-[80px] md:min-h-[100px] text-sm"
                />
              </FormControl>
            </div>
          </div>
        </FormSection>

        {!areAllFieldsValid && (
          <Alert status="warning" className="rounded-md">
            <AlertIcon status="warning" />
            <div>
              <p className="font-bold mb-2">{t('fillRequiredFields')}</p>
              <ul className="list-disc list-inside">
                {getMissingFields().map((field, index) => (
                  <li key={index}>{field.fieldName}</li>
                ))}
              </ul>
            </div>
          </Alert>
        )}

        <div className="flex justify-stretch sm:justify-end mt-4">
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="w-full sm:w-auto"
          >
            {t('saveAndContinue')}
          </Button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default FormNewClientPageTailwind;
