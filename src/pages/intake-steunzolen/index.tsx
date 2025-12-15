import React, { useState } from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  setIntakeSteunzolenData,
  setClientData,
} from '@/domain/store/slices/formData';
import { focusAndHighlightInvalidFields } from '@/utils/warningNavigationMap';
import {
  PAARTYPE_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
  CORRECTIE_MIDDENVOET_OPTIES,
  CORRECTIE_VOORVOET_OPTIES,
  PELLOTE_OPTIES,
  STEUNZOLEN_PRIJS_OPTIES,
} from '@/lib/constants/formConstants';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const FormIntakeSteunzolenPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // State voor welk paar
  const [welkPaar, setWelkPaar] = useState<string>('Eerste paar');

  // State voor medische indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState<string>('');

  // State voor schoenmaat (required)
  const [schoenmaat, setSchoenmaat] = useState<string>('');

  // State voor steunzool type (single select)
  const [steunzoolTypeGeneral, setSteunzoolTypeGeneral] = useState<string>('');

  // State voor Anders option
  const [steunzoolAndersText, setSteunzoolAndersText] = useState<string>('');

  // State voor correcties
  const [steunzoolCorrectieMiddenvoet, setSteunzoolCorrectieMiddenvoet] = useState<string>('');
  const [steunzoolCorrectieVoorvoet, setSteunzoolCorrectieVoorvoet] = useState<string>('');
  const [steunzoolVvPellote, setSteunzoolVvPellote] = useState<string>('');
  const [steunzoolHakVerhogingLinks, setSteunzoolHakVerhogingLinks] = useState<string>('');
  const [steunzoolHakVerhogingRechts, setSteunzoolHakVerhogingRechts] = useState<string>('');

  // State voor prijs (required) - numeric
  const [prijs, setPrijs] = useState<number>(225);
  const [prijsNaam, setPrijsNaam] = useState<string>(t('insolesPrice225'));

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState<string>('');

  const [showWarnings, setShowWarnings] = useState(false);

  // Check if Talonette is selected
  const talonetteOption = STEUNZOLEN_PRIJS_OPTIES.find(opt => opt.label === 'prijsTalonette');
  const isTalonette = talonetteOption && prijs === talonetteOption.value;

  // Validation: check which required fields are missing
  const getMissingFields = (): Array<{ fieldName: string; fieldId: string }> => {
    const missing: Array<{ fieldName: string; fieldId: string }> = [];

    if (!schoenmaat.trim()) {
      missing.push({ fieldName: t('shoeSize'), fieldId: 'field-schoenmaat' });
    }

    // Only check steunzool type if NOT Talonette
    if (!isTalonette) {
      if (!steunzoolTypeGeneral.trim()) {
        missing.push({
          fieldName: t('insoleTypeGeneral'),
          fieldId: 'field-steunzooltype',
        });
      }

      // If Anders is selected, check if text is provided
      if (steunzoolTypeGeneral === 'Anders' && !steunzoolAndersText.trim()) {
        missing.push({
          fieldName: t('insoleOtherText'),
          fieldId: 'field-steunzoolanders',
        });
      }
    }

    // If is Talonette, check the Hak Verhoging fields
    if (isTalonette) {
      if (!steunzoolHakVerhogingLinks.trim() && !steunzoolHakVerhogingRechts.trim()) {
        missing.push({
          fieldName: t('insoleHeelRaiseCm'),
          fieldId: 'field-hakverhoging',
        });
      }
    }

    if (!prijs) {
      missing.push({ fieldName: t('insolePrice'), fieldId: 'field-prijs' });
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

    // Update client data with intake type
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'Steunzolen' }));
    }

    dispatch(
      setIntakeSteunzolenData({
        welkPaar,
        medischeIndicatie,
        schoenmaat,
        steunzoolTypeGeneral:
          steunzoolTypeGeneral === 'Anders' ? steunzoolAndersText : steunzoolTypeGeneral,
        steunzoolCorrectieMiddenvoet,
        steunzoolCorrectieVoorvoet,
        steunzoolVvPellote,
        steunzoolHakVerhogingLinks,
        steunzoolHakVerhogingRechts,
        prijs,
        prijsNaam,
        bijzonderheden,
      })
    );

    console.log('Intake Steunzolen data opgeslagen in Redux store');
    router.push(Routes.form_results);
  };

  const missingFields = getMissingFields();
  const hasErrors = missingFields.length > 0;

  return (
    <BaseLayout title={t('intakeInsoles')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">{t('intakeInsoles')}</h1>
          <p className="text-lg text-muted-foreground">{t('insolesDescription')}</p>
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
          {/* Which Pair */}
          <Card>
            <CardHeader>
              <CardTitle>{t('whichPair')}</CardTitle>
              <CardDescription>Select which pair this intake is for</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={welkPaar} onValueChange={setWelkPaar}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PAARTYPE_OPTIES.map(option => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`paar-${option.value}`} />
                      <Label htmlFor={`paar-${option.value}`} className="font-normal cursor-pointer">
                        {t(option.value.toLowerCase().replace(/ /g, ''))}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Medical Indication */}
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

          {/* Shoe Size */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t('shoeSize')} <span className="text-destructive">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2" id="field-schoenmaat">
                <Input
                  placeholder={t('shoeSizePlaceholder')}
                  value={schoenmaat}
                  onChange={e => setSchoenmaat(e.target.value)}
                  className={cn(!schoenmaat.trim() && showWarnings && 'border-destructive')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Price */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t('insolePrice')} <span className="text-destructive">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2" id="field-prijs">
                <RadioGroup
                  value={prijs.toString()}
                  onValueChange={val => {
                    setPrijs(Number(val));
                    const selectedOption = STEUNZOLEN_PRIJS_OPTIES.find(
                      opt => opt.value === Number(val)
                    );
                    if (selectedOption) setPrijsNaam(t(selectedOption.label));
                  }}
                >
                  <div className="space-y-3">
                    {STEUNZOLEN_PRIJS_OPTIES.map(option => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.value.toString()}
                          id={`price-${option.value}`}
                        />
                        <Label htmlFor={`price-${option.value}`} className="font-normal cursor-pointer">
                          {t(option.label)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Insoles Details - Only if NOT Talonette */}
          {!isTalonette && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {t('insoles')} <span className="text-destructive">*</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Insole Type */}
                <div className="space-y-3" id="field-steunzooltype">
                  <Label className="text-sm font-semibold">{t('insoleTypeGeneral')}</Label>
                  <RadioGroup value={steunzoolTypeGeneral} onValueChange={setSteunzoolTypeGeneral}>
                    <div className="space-y-2">
                      {STEUNZOOL_TYPE_OPTIES.map(option => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`type-${option.value}`} />
                          <Label htmlFor={`type-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  {steunzoolTypeGeneral === 'Anders' && (
                    <Input
                      id="field-steunzoolanders"
                      placeholder={t('insoleOtherTextPlaceholder')}
                      value={steunzoolAndersText}
                      onChange={e => setSteunzoolAndersText(e.target.value)}
                      className={cn(
                        'mt-3',
                        steunzoolTypeGeneral === 'Anders' &&
                        !steunzoolAndersText.trim() &&
                        showWarnings &&
                        'border-destructive'
                      )}
                    />
                  )}
                </div>

                <Separator />

                {/* Midfoot Correction */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">{t('insoleMiddfootCorrection')}</Label>
                  <RadioGroup
                    value={steunzoolCorrectieMiddenvoet}
                    onValueChange={setSteunzoolCorrectieMiddenvoet}
                  >
                    <div className="space-y-2">
                      {CORRECTIE_MIDDENVOET_OPTIES.map(option => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`midfoot-${option.value}`} />
                          <Label htmlFor={`midfoot-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Forefoot Correction */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">{t('insoleForefootCorrection')}</Label>
                  <RadioGroup
                    value={steunzoolCorrectieVoorvoet}
                    onValueChange={setSteunzoolCorrectieVoorvoet}
                  >
                    <div className="space-y-2">
                      {CORRECTIE_VOORVOET_OPTIES.map(option => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`forefoot-${option.value}`} />
                          <Label htmlFor={`forefoot-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Forefoot Pad */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">{t('insoleForefootPad')}</Label>
                  <RadioGroup value={steunzoolVvPellote} onValueChange={setSteunzoolVvPellote}>
                    <div className="space-y-2">
                      {PELLOTE_OPTIES.map(option => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`pad-${option.value}`} />
                          <Label htmlFor={`pad-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Heel Raise */}
                <div className="space-y-3" id="field-hakverhoging">
                  <Label className="text-sm font-semibold">{t('insoleHeelRaiseCm')}</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heel-left" className="text-sm">
                        {t('left')}
                      </Label>
                      <Input
                        id="heel-left"
                        type="number"
                        placeholder={t('heelRaisePlaceholder')}
                        value={steunzoolHakVerhogingLinks}
                        onChange={e => setSteunzoolHakVerhogingLinks(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heel-right" className="text-sm">
                        {t('right')}
                      </Label>
                      <Input
                        id="heel-right"
                        type="number"
                        placeholder={t('heelRaisePlaceholder')}
                        value={steunzoolHakVerhogingRechts}
                        onChange={e => setSteunzoolHakVerhogingRechts(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Talonette Heel Raise - Only if Talonette */}
          {isTalonette && (
            <Card>
              <CardHeader>
                <CardTitle>{t('insoleHeelRaiseCm')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="talonette-left" className="text-sm">
                      {t('left')}
                    </Label>
                    <Input
                      id="talonette-left"
                      type="number"
                      placeholder={t('heelRaisePlaceholder')}
                      value={steunzoolHakVerhogingLinks}
                      onChange={e => setSteunzoolHakVerhogingLinks(e.target.value)}
                      className={cn(
                        isTalonette &&
                        !steunzoolHakVerhogingLinks.trim() &&
                        !steunzoolHakVerhogingRechts.trim() &&
                        showWarnings &&
                        'border-destructive'
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="talonette-right" className="text-sm">
                      {t('right')}
                    </Label>
                    <Input
                      id="talonette-right"
                      type="number"
                      placeholder={t('heelRaisePlaceholder')}
                      value={steunzoolHakVerhogingRechts}
                      onChange={e => setSteunzoolHakVerhogingRechts(e.target.value)}
                      className={cn(
                        isTalonette &&
                        !steunzoolHakVerhogingLinks.trim() &&
                        !steunzoolHakVerhogingRechts.trim() &&
                        showWarnings &&
                        'border-destructive'
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Special Notes */}
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
          <FormFooter>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              {t('cancel')}
            </Button>
            <Button type="submit" size="lg" className="min-w-[200px]">
              <span className="mr-2">{t('saveAndContinue')}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </FormFooter>
        </form>
      </div>
    </BaseLayout>
  );
};

export default FormIntakeSteunzolenPage;
