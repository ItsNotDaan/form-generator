import React, {useState} from 'react';
import {BaseLayout} from '@/presentation/components/layout';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {
  DatePicker,
  Select,
  SelectOption,
  Alert,
  AlertIcon,
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
import {cn} from '@/lib/utils';

export const FormNewClientPageShadcn = () => {
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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t('newClientForm')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('fillClientInformation')}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Warning Message */}
          {!areAllFieldsValid && (
            <Alert status="error">
              <AlertIcon status="error" />
              <span>{t('fillRequiredFields')}</span>
            </Alert>
          )}

          {/* Behandelaar en Aanmeetdatum Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('practitionerAndDate')}</CardTitle>
              <CardDescription>
                {t('selectPractitionerAndDate')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="field-behandelaar" className="space-y-2">
                  <Label htmlFor="practitioner" className="text-sm font-medium">
                    {t('practitioner')} <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    options={practitionerOptions}
                    value={
                      practitionerOptions.find(o => o.value === practitionerId) ||
                      null
                    }
                    onChange={option => setPractitionerId(option?.value)}
                    placeholder={t('choosePractitioner')}
                    error={!practitionerId}
                  />
                </div>
                <div id="field-aanmeetdatum" className="space-y-2">
                  <Label htmlFor="measurementDate" className="text-sm font-medium">
                    {t('measurementDate')} <span className="text-destructive">*</span>
                  </Label>
                  <DatePicker
                    date={date ? new Date(date) : undefined}
                    onDateChanged={d => d && setDate(d.toISOString())}
                    error={!date}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Locatie Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('location')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="field-locatie">
                <RadioGroup
                  value={location}
                  onValueChange={v => setLocation(v as Locatie)}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  {LOCATIE_OPTIES.map(o => (
                    <div key={o.value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={o.value}
                        id={`radio-locatie-${o.value}`}
                      />
                      <Label
                        htmlFor={`radio-locatie-${o.value}`}
                        className="font-normal cursor-pointer"
                      >
                        {o.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Persoonlijke gegevens Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('personalInformation')}</CardTitle>
              <CardDescription>{t('enterPersonalDetails')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Aanhef en Voorletters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="field-aanhef" className="space-y-2">
                  <Label className="text-sm font-medium">
                    {t('salutation')} <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={salutation}
                    onValueChange={v => setSalutation(v as Aanhef)}
                    className="flex flex-col gap-3"
                  >
                    {AANHEF_OPTIES.map(o => (
                      <div key={o.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={o.value}
                          id={`radio-aanhef-${o.value}`}
                        />
                        <Label
                          htmlFor={`radio-aanhef-${o.value}`}
                          className="font-normal cursor-pointer"
                        >
                          {o.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-4">
                  <div id="field-voorletters" className="space-y-2">
                    <Label htmlFor="initials" className="text-sm font-medium">
                      {t('initials')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="initials"
                      value={initials}
                      onChange={e => setInitials(e.target.value)}
                      placeholder={t('initialsPlaceholder')}
                      className={cn(!initials.trim() && 'border-destructive')}
                    />
                  </div>
                </div>
              </div>

              {/* Achternaam en Geboortedatum */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="field-achternaam" className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    {t('lastName')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder={t('lastNamePlaceholder')}
                    className={cn(!clientName.trim() && 'border-destructive')}
                  />
                </div>
                <div id="field-geboortedatum" className="space-y-2">
                  <Label htmlFor="birthDate" className="text-sm font-medium">
                    {t('birthDate')} <span className="text-destructive">*</span>
                  </Label>
                  <DatePicker
                    date={birthDate ? new Date(birthDate) : undefined}
                    onDateChanged={d => d && setBirthDate(d.toISOString())}
                    error={!birthDate}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adresgegevens Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('addressInformation')}</CardTitle>
              <CardDescription>{t('enterAddressDetails')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div id="field-straatnaam" className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  {t('streetName')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder={t('streetNamePlaceholder')}
                  className={cn(!address.trim() && 'border-destructive')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div id="field-postcode" className="space-y-2">
                  <Label htmlFor="postalCode" className="text-sm font-medium">
                    {t('postalCode')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="postalCode"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    placeholder={t('postalCodePlaceholder')}
                    className={cn(!postalCode.trim() && 'border-destructive')}
                  />
                </div>
                <div id="field-huisnummer" className="space-y-2">
                  <Label htmlFor="houseNumber" className="text-sm font-medium">
                    {t('houseNumber')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="houseNumber"
                    value={houseNumber}
                    onChange={e => setHouseNumber(e.target.value)}
                    placeholder={t('houseNumberPlaceholder')}
                    className={cn(!houseNumber.trim() && 'border-destructive')}
                  />
                </div>
                <div id="field-stad" className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">
                    {t('city')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder={t('cityPlaceholder')}
                    className={cn(!city.trim() && 'border-destructive')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contactgegevens Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('contactInformation')}</CardTitle>
              <CardDescription>{t('enterContactDetails')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div id="field-telefoon1" className="space-y-2">
                  <Label htmlFor="phoneOne" className="text-sm font-medium">
                    {t('phone1')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phoneOne"
                    type="tel"
                    value={phoneOne}
                    onChange={e => setPhoneOne(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className={cn(!phoneOne.trim() && 'border-destructive')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneTwo" className="text-sm font-medium">
                    {t('phone2')}
                  </Label>
                  <Input
                    id="phoneTwo"
                    type="tel"
                    value={phoneTwo}
                    onChange={e => setPhoneTwo(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                  />
                </div>
              </div>

              <div id="field-emailadres" className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t('email')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className={cn(!email.trim() && 'border-destructive')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Medische en Verzekeringsinformatie Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t('medicalAndInsuranceInfo')}</CardTitle>
              <CardDescription>{t('enterMedicalDetails')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div id="field-verzekeringsmaatschappij" className="space-y-2">
                <Label htmlFor="insurance" className="text-sm font-medium">
                  {t('insuranceCompany')} <span className="text-destructive">*</span>
                </Label>
                <Select
                  options={insuranceOptions}
                  value={
                    insuranceOptions.find(o => o.value === insurance) || null
                  }
                  onChange={option => setInsurance(option?.value || '')}
                  placeholder={t('chooseInsurance')}
                  error={!insurance.trim()}
                />
              </div>

              <div id="field-specialisthuisarts" className="space-y-2">
                <Label htmlFor="specialist" className="text-sm font-medium">
                  {t('specialistGp')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="specialist"
                  value={specialist}
                  onChange={e => setSpecialist(e.target.value)}
                  placeholder={t('specialistPlaceholder')}
                  className={cn(!specialist.trim() && 'border-destructive')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalIndication" className="text-sm font-medium">
                  {t('medicalIndication')}
                </Label>
                <Textarea
                  id="medicalIndication"
                  value={medischeIndicatie}
                  onChange={e => setMedischeIndicatie(e.target.value)}
                  placeholder={t('medicalIndicationPlaceholder')}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!areAllFieldsValid}
              className="min-w-[200px]"
            >
              {t('continue')}
            </Button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default FormNewClientPageShadcn;
