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
} from '@/presentation/components/ui';

import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {
  setIntakePulmanData,
  setClientData,
} from '@/domain/store/slices/formData';
import {focusAndHighlightInvalidFields} from '@/utils/warningNavigationMap';
import {
  PAARTYPE_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
  CORRECTIE_MIDDENVOET_OPTIES,
  CORRECTIE_VOORVOET_OPTIES,
  PELLOTE_OPTIES,
  STEUNZOLEN_PRIJS_OPTIES,
} from '@/presentation/form/constants/formConstants';

export const FormIntakePulmanPageTailwind = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  const [welkPaar, setWelkPaar] = useState<string>('Eerste paar');
  const [medischeIndicatie, setMedischeIndicatie] = useState<string>('');
  const [schoenmaat, setSchoenmaat] = useState<string>('');
  const [steunzoolTypeGeneral, setSteunzoolTypeGeneral] = useState<string>('');
  const [steunzoolAndersText, setSteunzoolAndersText] = useState<string>('');
  const [steunzoolCorrectieMiddenvoet, setSteunzoolCorrectieMiddenvoet] =
    useState<string>('');
  const [steunzoolCorrectieVoorvoet, setSteunzoolCorrectieVoorvoet] =
    useState<string>('');
  const [steunzoolVvPellote, setSteunzoolVvPellote] = useState<string>('');
  const [steunzoolHakVerhogingLinks, setSteunzoolHakVerhogingLinks] =
    useState<string>('');
  const [steunzoolHakVerhogingRechts, setSteunzoolHakVerhogingRechts] =
    useState<string>('');
  const [prijs, setPrijs] = useState<number>(225);
  const [prijsNaam, setPrijsNaam] = useState<string>(t('insolesPrice225'));
  const [bijzonderheden, setBijzonderheden] = useState<string>('');

  const talonetteOption = STEUNZOLEN_PRIJS_OPTIES.find(
    opt => opt.label === 'prijsTalonette'
  );
  const isTalonette = talonetteOption && prijs === talonetteOption.value;

  const getMissingFields = (): Array<{fieldName: string; fieldId: string}> => {
    const missing: Array<{fieldName: string; fieldId: string}> = [];

    if (!schoenmaat.trim()) {
      missing.push({fieldName: t('shoeSize'), fieldId: 'field-schoenmaat'});
    }

    if (!isTalonette) {
      if (!steunzoolTypeGeneral.trim()) {
        missing.push({
          fieldName: t('insoleTypeGeneral'),
          fieldId: 'field-steunzooltype',
        });
      }

      if (steunzoolTypeGeneral === 'Anders' && !steunzoolAndersText.trim()) {
        missing.push({
          fieldName: t('insoleOtherText'),
          fieldId: 'field-steunzoolanders',
        });
      }
    }

    if (isTalonette) {
      if (
        !steunzoolHakVerhogingLinks.trim() &&
        !steunzoolHakVerhogingRechts.trim()
      ) {
        missing.push({
          fieldName: t('insoleHeelRaiseCm'),
          fieldId: 'field-hakverhoging',
        });
      }
    }

    if (!prijs) {
      missing.push({fieldName: t('insolePrice'), fieldId: 'field-prijs'});
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

    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'Pulman'}));
    }

    dispatch(
      setIntakePulmanData({
        welkPaar,
        medischeIndicatie,
        schoenmaat,
        steunzoolTypeGeneral:
          steunzoolTypeGeneral === 'Anders'
            ? steunzoolAndersText
            : steunzoolTypeGeneral,
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

    router.push(Routes.form_results);
  };

  return (
    <BaseLayout
      title={t('intakePulman')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <div className="w-full flex flex-col bg-white p-4 md:p-6 rounded-md gap-4 md:gap-6">
        {/* Welk Paar Section - Reusable! */}
        <FormSection title={t('whichPair')} bordered>
          <RadioGroup value={welkPaar} onChange={setWelkPaar}>
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              {PAARTYPE_OPTIES.map(option => (
                <Radio key={option.value} value={option.value}>
                  {t(option.value.toLowerCase().replace(/ /g, ''))}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </FormSection>

        <FormDivider />

        {/* Medical Indication Section - Reusable! */}
        <FormSection title={t('medicalIndication')}>
          <Textarea
            placeholder={t('medicalIndicationPlaceholder')}
            value={medischeIndicatie}
            onChange={e => setMedischeIndicatie(e.target.value)}
            className="min-h-[80px] md:min-h-[100px]"
          />
        </FormSection>

        <FormDivider />

        {/* Shoe Size Section - Reusable! */}
        <FormSection title={t('shoeSize')} required>
          <FormControl isRequired id="field-schoenmaat">
            <Input
              placeholder={t('shoeSizePlaceholder')}
              value={schoenmaat}
              onChange={e => setSchoenmaat(e.target.value)}
            />
          </FormControl>
        </FormSection>

        <FormDivider />

        {/* Price Section - Reusable! */}
        <FormSection title={t('insolePrice')} required bordered>
          <FormControl isRequired id="field-prijs">
            <RadioGroup
              value={prijs.toString()}
              onChange={val => {
                setPrijs(Number(val));
                const selectedOption = STEUNZOLEN_PRIJS_OPTIES.find(
                  opt => opt.value === Number(val)
                );
                if (selectedOption) setPrijsNaam(t(selectedOption.label));
              }}
            >
              <div className="flex flex-col gap-3">
                {STEUNZOLEN_PRIJS_OPTIES.map(option => (
                  <Radio
                    key={option.value}
                    value={option.value.toString()}
                    size="sm"
                  >
                    {t(option.label)}
                  </Radio>
                ))}
              </div>
            </RadioGroup>
          </FormControl>
        </FormSection>

        {!isTalonette && (
          <>
            <FormDivider />

            {/* Insoles Section - Reusable! */}
            <FormSection title={t('insoles')} required bordered>
              <div className="flex flex-col gap-4">
                <FormControl id="field-steunzooltype">
                  <p className="font-semibold mb-2 text-sm">
                    {t('insoleTypeGeneral')}
                  </p>
                  <RadioGroup
                    value={steunzoolTypeGeneral}
                    onChange={setSteunzoolTypeGeneral}
                  >
                    <div className="flex flex-col gap-2">
                      {STEUNZOOL_TYPE_OPTIES.map(option => (
                        <Radio key={option.value} value={option.value} size="sm">
                          {option.label}
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                  {steunzoolTypeGeneral === 'Anders' && (
                    <Input
                      id="field-steunzoolanders"
                      placeholder={t('insoleOtherTextPlaceholder')}
                      value={steunzoolAndersText}
                      onChange={e => setSteunzoolAndersText(e.target.value)}
                      className="mt-3 text-sm"
                    />
                  )}
                </FormControl>

                <FormDivider />

                <div>
                  <p className="font-semibold mb-2 text-sm">
                    {t('insoleMiddfootCorrection')}
                  </p>
                  <RadioGroup
                    value={steunzoolCorrectieMiddenvoet}
                    onChange={setSteunzoolCorrectieMiddenvoet}
                  >
                    <div className="flex flex-col gap-2">
                      {CORRECTIE_MIDDENVOET_OPTIES.map(option => (
                        <Radio key={option.value} value={option.value} size="sm">
                          {option.label}
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <FormDivider />

                <div>
                  <p className="font-semibold mb-2 text-sm">
                    {t('insoleForefootCorrection')}
                  </p>
                  <RadioGroup
                    value={steunzoolCorrectieVoorvoet}
                    onChange={setSteunzoolCorrectieVoorvoet}
                  >
                    <div className="flex flex-col gap-2">
                      {CORRECTIE_VOORVOET_OPTIES.map(option => (
                        <Radio key={option.value} value={option.value} size="sm">
                          {option.label}
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <FormDivider />

                <div>
                  <p className="font-semibold mb-2 text-sm">
                    {t('insoleForefootPad')}
                  </p>
                  <RadioGroup
                    value={steunzoolVvPellote}
                    onChange={setSteunzoolVvPellote}
                  >
                    <div className="flex flex-col gap-2">
                      {PELLOTE_OPTIES.map(option => (
                        <Radio key={option.value} value={option.value} size="sm">
                          {option.label}
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <FormDivider />

                <div id="field-hakverhoging">
                  <p className="font-semibold mb-2 text-sm">
                    {t('insoleHeelRaiseCm')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormControl>
                      <FormLabel className="text-sm">{t('left')}</FormLabel>
                      <Input
                        type="number"
                        placeholder={t('heelRaisePlaceholder')}
                        value={steunzoolHakVerhogingLinks}
                        onChange={e =>
                          setSteunzoolHakVerhogingLinks(e.target.value)
                        }
                        className="text-sm"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel className="text-sm">{t('right')}</FormLabel>
                      <Input
                        type="number"
                        placeholder={t('heelRaisePlaceholder')}
                        value={steunzoolHakVerhogingRechts}
                        onChange={e =>
                          setSteunzoolHakVerhogingRechts(e.target.value)
                        }
                        className="text-sm"
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </FormSection>
          </>
        )}

        {isTalonette && (
          <>
            <FormDivider />

            {/* Heel Raise Section for Talonette - Reusable! */}
            <FormSection title={t('insoleHeelRaiseCm')} bordered>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormControl>
                  <FormLabel className="text-sm">{t('left')}</FormLabel>
                  <Input
                    type="number"
                    placeholder={t('heelRaisePlaceholder')}
                    value={steunzoolHakVerhogingLinks}
                    onChange={e => setSteunzoolHakVerhogingLinks(e.target.value)}
                    className="text-sm"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel className="text-sm">{t('right')}</FormLabel>
                  <Input
                    type="number"
                    placeholder={t('heelRaisePlaceholder')}
                    value={steunzoolHakVerhogingRechts}
                    onChange={e =>
                      setSteunzoolHakVerhogingRechts(e.target.value)
                    }
                    className="text-sm"
                  />
                </FormControl>
              </div>
            </FormSection>
          </>
        )}

        <FormDivider />

        {/* Special Notes Section - Reusable! */}
        <FormSection title={t('specialNotes')}>
          <Textarea
            placeholder={t('specialNotesPlaceholder')}
            value={bijzonderheden}
            onChange={e => setBijzonderheden(e.target.value)}
            className="min-h-[100px] md:min-h-[120px]"
          />
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
            Opslaan en doorgaan
          </Button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default FormIntakePulmanPageTailwind;
