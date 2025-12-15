import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/presentation/routes';
import {
  LOCATIE_OPTIES,
  AANHEF_OPTIES,
  BEHANDELAARS,
  ZORGVERZEKERAARS,
  Locatie,
  Aanhef,
} from '@/presentation/form/constants/formConstants';
import { useAppDispatch } from '@/domain/store/hooks';
import { setClientData } from '@/domain/store/slices/formData';
import { focusAndHighlightInvalidFields } from '@/utils/warningNavigationMap';
import { AlertCircle, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatePicker } from '@/presentation/components/ui/DatePicker';
import { Select } from '@/presentation/components/ui/Select';

const FormNewClientPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
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
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('newClient')}</h1>
          <p className="text-lg text-gray-600">{t('newClientDescription')}</p>
        </div>

        {/* Warning Alert */}
        {showWarnings && hasErrors && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
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
                Information about the measurement appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2" id="field-behandelaar">
                  <Label htmlFor="practitioner">
                    {t('practitioner')} <span className="text-destructive">*</span>
                  </Label>
                  <Select
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

                <div className="space-y-2" id="field-aanmeetdatum">
                  <Label htmlFor="date">
                    {t('measurementDate')} <span className="text-destructive">*</span>
                  </Label>
                  <DatePicker
                    date={date ? new Date(date) : undefined}
                    onDateChanged={(newDate) => setDate(newDate ? newDate.toISOString().split('T')[0] : '')}
                    placeholder={t('selectDate')}
                    className={cn(!date && showWarnings && 'border-destructive')}
                    error={!date && showWarnings}
                  />
                </div>
              </div>

              <div className="space-y-2" id="field-locatie">
                <Label>{t('location')} <span className="text-destructive">*</span></Label>
                <RadioGroup
                  value={location}
                  onValueChange={(value) => setLocation(value as Locatie)}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {LOCATIE_OPTIES.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.value}
                        id={`location-${option.value}`}
                        className={cn(!location && showWarnings && 'border-destructive')}
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
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('personalInformation')}</CardTitle>
              <CardDescription>
                Basic client identification information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2" id="field-aanhef">
                  <Label>{t('salutation')} <span className="text-destructive">*</span></Label>
                  <RadioGroup
                    value={salutation}
                    onValueChange={(value) => setSalutation(value as Aanhef)}
                    className="flex flex-col space-y-2"
                  >
                    {AANHEF_OPTIES.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.value}
                          id={`salutation-${option.value}`}
                          className={cn(!salutation && showWarnings && 'border-destructive')}
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
                </div>

                <div className="space-y-2" id="field-voorletters">
                  <Label htmlFor="initials">
                    {t('initials')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="initials"
                    value={initials}
                    onChange={(e) => setInitials(e.target.value)}
                    placeholder={t('initialsPlaceholder')}
                    className={cn(!initials.trim() && showWarnings && 'border-destructive')}
                  />
                </div>

                <div className="space-y-2" id="field-achternaam">
                  <Label htmlFor="lastName">
                    {t('lastName')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={t('lastNamePlaceholder')}
                    className={cn(!clientName.trim() && showWarnings && 'border-destructive')}
                  />
                </div>
              </div>

              <div className="space-y-2" id="field-geboortedatum">
                <Label htmlFor="birthDate">
                  {t('birthDate')} <span className="text-destructive">*</span>
                </Label>
                <DatePicker
                  date={birthDate ? new Date(birthDate) : undefined}
                  onDateChanged={(newDate) => setBirthDate(newDate ? newDate.toISOString().split('T')[0] : '')}
                  placeholder={t('selectBirthDate')}
                  className={cn(!birthDate && showWarnings && 'border-destructive')}
                  error={!birthDate && showWarnings}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('addressInformation')}</CardTitle>
              <CardDescription>
                Client's residential address details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-2" id="field-straatnaam">
                  <Label htmlFor="address">
                    {t('streetName')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t('streetNamePlaceholder')}
                    className={cn(!address.trim() && showWarnings && 'border-destructive')}
                  />
                </div>

                <div className="space-y-2" id="field-huisnummer">
                  <Label htmlFor="houseNumber">
                    {t('houseNumber')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="houseNumber"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    placeholder={t('houseNumberPlaceholder')}
                    className={cn(!houseNumber.trim() && showWarnings && 'border-destructive')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2" id="field-postcode">
                  <Label htmlFor="postalCode">
                    {t('postalCode')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder={t('postalCodePlaceholder')}
                    className={cn(!postalCode.trim() && showWarnings && 'border-destructive')}
                  />
                </div>

                <div className="space-y-2" id="field-woonplaats">
                  <Label htmlFor="city">
                    {t('city')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t('cityPlaceholder')}
                    className={cn(!city.trim() && showWarnings && 'border-destructive')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('contactInformation')}</CardTitle>
              <CardDescription>
                Phone numbers and email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phoneOne">{t('phoneOne')}</Label>
                  <Input
                    id="phoneOne"
                    type="tel"
                    value={phoneOne}
                    onChange={(e) => setPhoneOne(e.target.value)}
                    placeholder={t('phoneOnePlaceholder')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneTwo">{t('phoneTwo')}</Label>
                  <Input
                    id="phoneTwo"
                    type="tel"
                    value={phoneTwo}
                    onChange={(e) => setPhoneTwo(e.target.value)}
                    placeholder={t('phoneTwoPlaceholder')}
                  />
                </div>
              </div>

              <div className="space-y-2" id="field-email">
                <Label htmlFor="email">
                  {t('email')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className={cn(!email.trim() && showWarnings && 'border-destructive')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Insurance & Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('insuranceAndMedical')}</CardTitle>
              <CardDescription>
                Insurance provider and medical details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2" id="field-zorgverzekeraar">
                <Label htmlFor="insurance">
                  {t('insurance')} <span className="text-destructive">*</span>
                </Label>
                <Select
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
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg" className="min-w-[200px]">
              <span className="mr-2">Continue to Form Selection</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default FormNewClientPage;
