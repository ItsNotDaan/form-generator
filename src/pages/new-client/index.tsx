import React, { useState } from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { RadioGroupField } from '@/components/ui/radio-group-field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import {
  LOCATIE_OPTIES,
  AANHEF_OPTIES,
  BEHANDELAARS,
  ZORGVERZEKERAARS,
  Locatie,
  Aanhef,
} from '@/lib/constants/formConstants';
import { useAppDispatch } from '@/domain/store/hooks';
import { setClientData } from '@/domain/store/slices/formData';
import { focusAndHighlightInvalidFields } from '@/utils/warningNavigationMap';
import { AlertCircle, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatePicker } from '@/components/ui/date-picker';
import { ReactSelect } from '@/components/ui/react-select';
import { DutchAddressInput } from '@/components/ui/dutch-address-input';

const FormNewClientPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor client data
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
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
  const [practitionerId, setPractitionerId] = useState<string | undefined>(undefined);
  const [phoneOne, setPhoneOne] = useState('');
  const [phoneTwo, setPhoneTwo] = useState('');
  const [specialist, setSpecialist] = useState('');

  const [showWarnings, setShowWarnings] = useState(false);

  // Validation: check which required fields are missing
  const getMissingFields = (): Array<{ fieldName: string; fieldId: string }> => {
    const missing: Array<{ fieldName: string; fieldId: string }> = [];

    if (!practitionerId) {
      missing.push({ fieldName: t('practitioner'), fieldId: 'field-behandelaar' });
    }
    if (!date) {
      missing.push({ fieldName: t('measurementDate'), fieldId: 'field-aanmeetdatum' });
    }
    if (!location) {
      missing.push({ fieldName: t('location'), fieldId: 'field-locatie' });
    }
    if (!salutation) {
      missing.push({ fieldName: t('salutation'), fieldId: 'field-aanhef' });
    }
    if (!initials.trim()) {
      missing.push({ fieldName: t('initials'), fieldId: 'field-voorletters' });
    }
    if (!clientName.trim()) {
      missing.push({ fieldName: t('lastName'), fieldId: 'field-achternaam' });
    }
    if (!birthDate) {
      missing.push({ fieldName: t('birthDate'), fieldId: 'field-geboortedatum' });
    }
    if (!address.trim()) {
      missing.push({ fieldName: t('streetName'), fieldId: 'field-straatnaam' });
    }
    if (!houseNumber.trim()) {
      missing.push({ fieldName: t('houseNumber'), fieldId: 'field-huisnummer' });
    }
    if (!postalCode.trim()) {
      missing.push({ fieldName: t('postalCode'), fieldId: 'field-postcode' });
    }
    if (!city.trim()) {
      missing.push({ fieldName: t('city'), fieldId: 'field-woonplaats' });
    }
    if (!email.trim()) {
      missing.push({ fieldName: t('email'), fieldId: 'field-email' });
    }
    if (!insurance.trim()) {
      missing.push({ fieldName: t('insurance'), fieldId: 'field-zorgverzekeraar' });
    }

    return missing;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const missingFields = getMissingFields();
    if (missingFields.length > 0) {
      setShowWarnings(true);
      focusAndHighlightInvalidFields(missingFields.map(f => f.fieldId));
      return;
    }

    // Save data to Redux store
    dispatch(
      setClientData({
        practitionerId: practitionerId!,
        date,
        location: location as Locatie,
        salutation: salutation as Aanhef,
        initials,
        clientName,
        birthDate,
        address,
        houseNumber,
        postalCode,
        city,
        phoneOne,
        phoneTwo,
        email,
        insurance,
        medischeIndicatie,
        specialist,
      })
    );

    // Navigate to form selection
    router.push(Routes.form_selection);
  };

  const missingFields = getMissingFields();
  const hasErrors = missingFields.length > 0;

  return (
    <BaseLayout title={t('newClient')} currentStep={1}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">{t('newClient')}</h1>
          <p className="text-lg text-muted-foreground">{t('newClientDescription')}</p>
        </div>

        <FormSection>
          {/* Warning Alert */}
          {showWarnings && hasErrors && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive mb-2">
                    {t('requiredFieldsTitle')}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-destructive/90">
                    {missingFields.map((field, index) => (
                      <li key={index}>{field.fieldName}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Appointment Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t('appointmentInformation')}</CardTitle>
                <CardDescription>
                  {t('appointmentInformationDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2" id="field-behandelaar">
                    <Label htmlFor="practitioner">
                      {t('practitioner')} <span className="text-destructive">*</span>
                    </Label>
                    <ReactSelect
                      value={
                        practitionerId
                          ? { label: BEHANDELAARS.find((p) => p.value === practitionerId)?.label || '', value: practitionerId }
                          : null
                      }
                      onChange={(option) => {
                        if (option && 'value' in option) {
                          setPractitionerId(option.value);
                        }
                      }}
                      options={BEHANDELAARS}
                      placeholder={t('selectPractitioner')}
                      className={cn(!practitionerId && showWarnings && 'border-destructive')}
                    />
                  </div>

                  <div id="field-aanmeetdatum">
                    <DatePicker
                      label={`${t('measurementDate')} *`}
                      value={date ? new Date(date) : undefined}
                      onChange={(selectedDate) => setDate(selectedDate ? selectedDate.toISOString().split('T')[0] : '')}
                      placeholder={t('selectDate')}
                      error={!date && showWarnings}
                      disabled={(d) => d > new Date()}
                      className="w-full"
                    />
                  </div>
                </div>

                <RadioGroupField
                  id="locatie"
                  label={t('location')}
                  value={location}
                  onChange={(value) => setLocation(value as Locatie)}
                  options={LOCATIE_OPTIES}
                  required
                  error={!location && showWarnings}
                  layout="grid-4"
                />
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t('personalInformation')}</CardTitle>
                <CardDescription>
                  {t('personalInformationDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <RadioGroupField
                    id="aanhef"
                    label={t('salutation')}
                    value={salutation}
                    onChange={(value) => setSalutation(value as Aanhef)}
                    options={AANHEF_OPTIES}
                    required
                    error={!salutation && showWarnings}
                    layout="horizontal"
                    className=''
                  />

                  <FormField
                    id="voorletters"
                    label={t('initials')}
                    value={initials}
                    onChange={setInitials}
                    placeholder={t('initialsPlaceholder')}
                    required
                    error={!initials.trim() && showWarnings}
                  />

                  <FormField
                    id="achternaam"
                    label={t('lastName')}
                    value={clientName}
                    onChange={setClientName}
                    placeholder={t('lastNamePlaceholder')}
                    required
                    error={!clientName.trim() && showWarnings}
                  />
                </div>

                <div id="field-geboortedatum">
                  <DatePicker
                    label={`${t('birthDate')} *`}
                    value={birthDate ? new Date(birthDate) : undefined}
                    onChange={(selectedDate) => setBirthDate(selectedDate ? selectedDate.toISOString().split('T')[0] : '')}
                    placeholder={t('selectBirthDate')}
                    error={!birthDate && showWarnings}
                    disabled={(d) => d > new Date()}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t('addressInformation')}</CardTitle>
                <CardDescription>
                  {t('addressInformationDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <DutchAddressInput
                  postcode={postalCode}
                  houseNumber={houseNumber}
                  onPostcodeChange={setPostalCode}
                  onHouseNumberChange={setHouseNumber}
                  onStreetChange={setAddress}
                  onCityChange={setCity}
                  postcodeLabel={t('postalCode')}
                  houseNumberLabel={t('houseNumber')}
                  streetLabel={t('streetName')}
                  cityLabel={t('city')}
                  street={address}
                  city={city}
                  t={t}
                />
              </CardContent>
            </Card>

            {/* Contact Information */}
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
                    id="phoneOne"
                    label={t('phoneOne')}
                    value={phoneOne}
                    onChange={setPhoneOne}
                    type="tel"
                    placeholder={t('phoneOnePlaceholder')}
                  />

                  <FormField
                    id="phoneTwo"
                    label={t('phoneTwo')}
                    value={phoneTwo}
                    onChange={setPhoneTwo}
                    type="tel"
                    placeholder={t('phoneTwoPlaceholder')}
                  />
                </div>

                <FormField
                  id="email"
                  label={t('email')}
                  value={email}
                  onChange={setEmail}
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  required
                  error={!email.trim() && showWarnings}
                />
              </CardContent>
            </Card>

            {/* Insurance & Medical Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t('insuranceAndMedical')}</CardTitle>
                <CardDescription>
                  {t('insuranceAndMedicalDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2" id="field-zorgverzekeraar">
                  <Label htmlFor="insurance">
                    {t('insurance')} <span className="text-destructive">*</span>
                  </Label>
                  <ReactSelect
                    value={
                      insurance
                        ? { label: insurance, value: insurance }
                        : null
                    }
                    onChange={(option) => {
                      if (option && 'value' in option) {
                        setInsurance(option.value || '');
                      }
                    }}
                    options={ZORGVERZEKERAARS}
                    placeholder={t('selectInsurance')}
                    className={cn(!insurance && showWarnings && 'border-destructive')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialist">{t('specialist')}</Label>
                  <Input
                    id="specialist"
                    value={specialist}
                    onChange={(e) => setSpecialist(e.target.value)}
                    placeholder={t('specialistPlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalIndication">{t('medicalIndication')}</Label>
                  <Textarea
                    id="medicalIndication"
                    value={medischeIndicatie}
                    onChange={(e) => setMedischeIndicatie(e.target.value)}
                    placeholder={t('medicalIndicationPlaceholder')}
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Section */}
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
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default FormNewClientPage;
