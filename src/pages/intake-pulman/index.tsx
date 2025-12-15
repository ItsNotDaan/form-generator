import React, { useState, useEffect } from 'react';
import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import {
  setIntakePulmanData,
  setClientData,
} from '@/domain/store/slices/formData';
import { focusAndHighlightInvalidFields } from '@/utils/warningNavigationMap';
import {
  Zijde,
  PULMAN_TYPE_OPTIES,
  SCHOENMATEN,
  PAARTYPE_OPTIES,
} from '@/lib/constants/formConstants';
import { ChevronRight, Info } from 'lucide-react';

const FormIntakePulmanPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // State voor omschrijving/paartype
  const [omschrijving, setOmschrijving] = useState<string>('Eerste paar');

  // State voor Links/Rechts/Beide selectie (default: Beide)
  const [side, setSide] = useState<Zijde>('both');

  // State voor medische indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState('');

  // State voor gezwachteld
  const [gezwachteld, setGezwachteld] = useState<boolean>(false);

  // Helper functions for boolean <-> string conversion for UI
  const boolToString = (value: boolean): string => (value ? 'yes' : 'no');
  const stringToBool = (value: string): boolean => value === 'yes';

  // State voor type Pulman
  const [typePulman, setTypePulman] = useState('');

  // State voor schoenmaten
  const [schoenmaat, setSchoenmaat] = useState('');
  const [afgegevenMaat, setAfgegevenMaat] = useState('');

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const showLinks = side === 'left' || side === 'both';
  const showRechts = side === 'right' || side === 'both';

  // Automatisch switchen naar Harlem Extra als gezwachteld true is
  useEffect(() => {
    if (gezwachteld) {
      setTypePulman('Harlem Extra');
    }
  }, [gezwachteld]);

  // Validation: check which required fields are missing
  const getMissingFields = (): Array<{ fieldName: string; fieldId: string }> => {
    const missing: Array<{ fieldName: string; fieldId: string }> = [];
    // No required fields for Pulman
    return missing;
  };

  const areAllFieldsValid = getMissingFields().length === 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!areAllFieldsValid) {
      const missingFields = getMissingFields();
      focusAndHighlightInvalidFields(missingFields.map(f => f.fieldId));
      return; // Validation alert will show the missing fields
    }

    // Update client data with intake type
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'Pulman' }));
    }

    dispatch(
      setIntakePulmanData({
        welkPaar: omschrijving,
        side,
        medischeIndicatie,
        gezwachteld,
        typePulman,
        schoenmaat,
        afgegevenMaat,
        bijzonderheden,
      })
    );

    console.log('Intake Pulman data opgeslagen in Redux store');

    // Navigeer naar results page
    router.push(Routes.form_results);
  };

  return (
    <BaseLayout title={t('intakePulman')} currentStep={2}>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('intakePulman')}</h1>
          <p className="text-lg text-gray-600">{t('pulmanDescription')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Omschrijving/Paartype */}
          <Card>
            <CardHeader>
              <CardTitle>{t('whichPair')}</CardTitle>
              <CardDescription>
                Select which pair this intake is for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={omschrijving} onValueChange={setOmschrijving}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PAARTYPE_OPTIES.map(option => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.value}
                        id={`paar-${option.value}`}
                      />
                      <Label
                        htmlFor={`paar-${option.value}`}
                        className="font-normal cursor-pointer"
                      >
                        {t(option.value.toLowerCase().replace(/ /g, ''))}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Links/Rechts/Beide selectie */}
          <Card>
            <CardHeader>
              <CardTitle>{t('side')}</CardTitle>
              <CardDescription>
                Select which side (left, right, or both)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={side} onValueChange={(v) => setSide(v as Zijde)}>
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="side-both" />
                    <Label htmlFor="side-both" className="font-normal cursor-pointer">
                      {t('both')}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="side-left" />
                    <Label htmlFor="side-left" className="font-normal cursor-pointer">
                      {t('left')}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="right" id="side-right" />
                    <Label htmlFor="side-right" className="font-normal cursor-pointer">
                      {t('right')}
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Medische Indicatie */}
          <Card>
            <CardHeader>
              <CardTitle>{t('medicalIndication')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={t('medicalIndicationPlaceholder')}
                value={medischeIndicatie}
                onChange={e => setMedischeIndicatie(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* Gezwachteld */}
          <Card>
            <CardHeader>
              <CardTitle>{t('bandaged')}</CardTitle>
              <CardDescription>
                Is the affected area bandaged?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={boolToString(gezwachteld)}
                onValueChange={(v) => setGezwachteld(stringToBool(v))}
              >
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="bandaged-yes" />
                    <Label htmlFor="bandaged-yes" className="font-normal cursor-pointer">
                      {t('yes')}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="bandaged-no" />
                    <Label htmlFor="bandaged-no" className="font-normal cursor-pointer">
                      {t('no')}
                    </Label>
                  </div>
                </div>
              </RadioGroup>
              {gezwachteld && (
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800 whitespace-pre-line">
                      {t('bandagedInformationPulman')}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Type Pulman */}
          <Card>
            <CardHeader>
              <CardTitle>{t('pulmanType')}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={typePulman} onValueChange={setTypePulman}>
                <div className="flex gap-6">
                  {PULMAN_TYPE_OPTIES.map(option => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`pulman-${option.value}`} />
                      <Label htmlFor={`pulman-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Schoenmaat klant */}
          <Card>
            <CardHeader>
              <CardTitle>{t('shoeSize')}</CardTitle>
              <CardDescription>
                Client's current shoe size
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={schoenmaat} onValueChange={setSchoenmaat}>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {SCHOENMATEN.map(size => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={`size-${size}`} />
                      <Label htmlFor={`size-${size}`} className="font-normal cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Afgegeven maat */}
          <Card>
            <CardHeader>
              <CardTitle>{t('providedSize')}</CardTitle>
              <CardDescription>
                Size of the provided footwear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={afgegevenMaat} onValueChange={setAfgegevenMaat}>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {SCHOENMATEN.map(size => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={`provided-${size}`} />
                      <Label htmlFor={`provided-${size}`} className="font-normal cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Bijzonderheden */}
          <Card>
            <CardHeader>
              <CardTitle>{t('specialNotes')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={t('specialNotesPlaceholder')}
                value={bijzonderheden}
                onChange={e => setBijzonderheden(e.target.value)}
                rows={5}
                className="resize-none"
              />
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
              <span className="mr-2">{t('saveAndContinue')}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default FormIntakePulmanPage;
