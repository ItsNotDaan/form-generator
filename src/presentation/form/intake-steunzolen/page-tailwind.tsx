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
} from '@/presentation/components/ui';

import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {
  setIntakeSteunzolenData,
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

export const FormIntakeSteunzolenPageTailwind = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
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
  const [steunzoolCorrectieMiddenvoet, setSteunzoolCorrectieMiddenvoet] =
    useState<string>('');
  const [steunzoolCorrectieVoorvoet, setSteunzoolCorrectieVoorvoet] =
    useState<string>('');
  const [steunzoolVvPellote, setSteunzoolVvPellote] = useState<string>('');
  const [steunzoolHakVerhogingLinks, setSteunzoolHakVerhogingLinks] =
    useState<string>('');
  const [steunzoolHakVerhogingRechts, setSteunzoolHakVerhogingRechts] =
    useState<string>('');

  // State voor prijs (required) - numeric
  const [prijs, setPrijs] = useState<number>(225);
  const [prijsNaam, setPrijsNaam] = useState<string>(t('insolesPrice225'));

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState<string>('');

  // Check if Talonette is selected by checking if the selected price matches the Talonette option
  const talonetteOption = STEUNZOLEN_PRIJS_OPTIES.find(
    opt => opt.label === 'prijsTalonette'
  );
  const isTalonette = talonetteOption && prijs === talonetteOption.value;

  // Validation: check which required fields are missing
  const getMissingFields = (): Array<{fieldName: string; fieldId: string}> => {
    const missing: Array<{fieldName: string; fieldId: string}> = [];

    if (!schoenmaat.trim()) {
      missing.push({fieldName: t('shoeSize'), fieldId: 'field-schoenmaat'});
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

    //If is Talonette, check the Hak Verhoging fields
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
      return; // Validation alert will show the missing fields
    }

    // Update client data with intake type
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'Steunzolen'}));
    }

    dispatch(
      setIntakeSteunzolenData({
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

    console.log('Intake Steunzolen data opgeslagen in Redux store');

    // Navigeer naar results page
    router.push(Routes.form_results);
  };

  return (
    <BaseLayout
      title={t('intakeInsoles')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <div className="w-full flex flex-col bg-white p-4 md:p-6 rounded-md gap-4 md:gap-6">
        <div>
          <p className="font-bold mb-3 text-base md:text-lg">
            {t('whichPair')}
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 border border-gray-200 rounded-md p-4 mt-2">
            <div className="flex-1">
              <RadioGroup value={welkPaar} onChange={setWelkPaar}>
                <div className="flex flex-col md:flex-row gap-4 flex-wrap">
                  {PAARTYPE_OPTIES.map(option => (
                    <Radio key={option.value} value={option.value}>
                      {t(option.value.toLowerCase().replace(/ /g, ''))}
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        <div>
          <p className="font-bold mb-3 text-base md:text-lg">
            {t('medicalIndication')}
          </p>
          <FormControl>
            <Textarea
              placeholder={t('medicalIndicationPlaceholder')}
              value={medischeIndicatie}
              onChange={e => setMedischeIndicatie(e.target.value)}
              className="min-h-[80px] md:min-h-[100px]"
            />
          </FormControl>
        </div>

        <div className="border-t border-gray-200" />

        <div>
          <p className="font-bold mb-3 text-base md:text-lg">
            {t('shoeSize')} *
          </p>
          <FormControl isRequired id="field-schoenmaat">
            <Input
              placeholder={t('shoeSizePlaceholder')}
              value={schoenmaat}
              onChange={e => setSchoenmaat(e.target.value)}
            />
          </FormControl>
        </div>

        <div className="border-t border-gray-200" />

        {/* Prijs moet eerst komen */}
        <div>
          <p className="font-bold mb-3 text-base md:text-lg">
            {t('insolePrice')} *
          </p>
          <FormControl
            isRequired
            id="field-prijs"
            className="border border-gray-200 rounded-md p-4 mt-2"
          >
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
        </div>

        {!isTalonette && (
          <>
            <div className="border-t border-gray-200" />

            <div>
              <p className="font-bold mb-3 text-base md:text-lg">
                {t('insoles')} *
              </p>
              <div className="border border-gray-200 rounded-md p-4 mt-2">
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
                          <Radio
                            key={option.value}
                            value={option.value}
                            size="sm"
                          >
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

                  <div className="border-t border-gray-200" />

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
                          <Radio
                            key={option.value}
                            value={option.value}
                            size="sm"
                          >
                            {option.label}
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="border-t border-gray-200" />

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
                          <Radio
                            key={option.value}
                            value={option.value}
                            size="sm"
                          >
                            {option.label}
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="border-t border-gray-200" />

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
                          <Radio
                            key={option.value}
                            value={option.value}
                            size="sm"
                          >
                            {option.label}
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="border-t border-gray-200" />

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
              </div>
            </div>
          </>
        )}

        {isTalonette && (
          <>
            <div className="border-t border-gray-200" />

            <div>
              <p className="font-bold mb-3 text-base md:text-lg">
                {t('insoleHeelRaiseCm')}
              </p>
              <div className="border border-gray-200 rounded-md p-4 mt-2">
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
          </>
        )}

        <div className="border-t border-gray-200" />

        <div>
          <p className="font-bold mb-4 text-base md:text-lg">
            {t('specialNotes')}
          </p>
          <Textarea
            placeholder={t('specialNotesPlaceholder')}
            value={bijzonderheden}
            onChange={e => setBijzonderheden(e.target.value)}
            className="min-h-[100px] md:min-h-[120px]"
          />
        </div>

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

export default FormIntakeSteunzolenPageTailwind;
