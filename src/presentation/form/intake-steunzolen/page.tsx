import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Input,
  Text,
  Box,
  Divider,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Button,
  SimpleGrid,
  Alert,
  AlertIcon,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '../../routes';
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
} from '@/presentation/form/constants/formConstants';

export const FormIntakeSteunzolenPage = () => {
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
      missing.push({ fieldName: t('insolePrice'), fieldId: 'field-prijs' });
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
      dispatch(setClientData({ ...clientData, intakeType: 'Steunzolen' }));
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
      <Flex
        w="full"
        direction="column"
        bg="white"
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        gap={{ base: 4, md: 6 }}
      >
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('whichPair')}
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box flex={1}>
              <RadioGroup value={welkPaar} onChange={setWelkPaar}>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  spacing={4}
                  flexWrap="wrap"
                >
                  {PAARTYPE_OPTIES.map(option => (
                    <Radio key={option.value} value={option.value}>
                      {t(option.value.toLowerCase().replace(/ /g, ''))}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
          </Flex>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('medicalIndication')}
          </Text>
          <FormControl>
            <Textarea
              placeholder={t('medicalIndicationPlaceholder')}
              value={medischeIndicatie}
              onChange={e => setMedischeIndicatie(e.target.value)}
              minH={{ base: '80px', md: '100px' }}
            />
          </FormControl>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('shoeSize')} *
          </Text>
          <FormControl isRequired id="field-schoenmaat">
            <Input
              placeholder={t('shoeSizePlaceholder')}
              value={schoenmaat}
              onChange={e => setSchoenmaat(e.target.value)}
              size="md"
            />
          </FormControl>
        </Box>

        <Divider />

        {/* Prijs moet eerst komen */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('insolePrice')} *
          </Text>
          <FormControl
            isRequired
            id="field-prijs"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
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
              <Stack spacing={3}>
                {STEUNZOLEN_PRIJS_OPTIES.map(option => (
                  <Radio
                    key={option.value}
                    value={option.value.toString()}
                    size="sm"
                  >
                    {t(option.label)}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>

        {!isTalonette && (
          <>
            <Divider />

            <Box>
              <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
                {t('insoles')} *
              </Text>
              <Box
                border="1px solid"
                borderColor="inherit"
                borderRadius="md"
                p={4}
                mt={2}
              >
                <Stack spacing={4}>
                  <FormControl id="field-steunzooltype">
                    <Text fontWeight="semibold" mb={2} fontSize="sm">
                      {t('insoleTypeGeneral')}
                    </Text>
                    <RadioGroup
                      value={steunzoolTypeGeneral}
                      onChange={setSteunzoolTypeGeneral}
                    >
                      <Stack spacing={2}>
                        {STEUNZOOL_TYPE_OPTIES.map(option => (
                          <Radio
                            key={option.value}
                            value={option.value}
                            size="sm"
                          >
                            {option.label}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                    {steunzoolTypeGeneral === 'Anders' && (
                      <Input
                        id="field-steunzoolanders"
                        placeholder={t('insoleOtherTextPlaceholder')}
                        value={steunzoolAndersText}
                        onChange={e => setSteunzoolAndersText(e.target.value)}
                        size="sm"
                        mt={3}
                      />
                    )}
                  </FormControl>

                  <Divider />

                  <Box>
                    <Text fontWeight="semibold" mb={2} fontSize="sm">
                      {t('insoleMiddfootCorrection')}
                    </Text>
                    <RadioGroup
                      value={steunzoolCorrectieMiddenvoet}
                      onChange={setSteunzoolCorrectieMiddenvoet}
                    >
                      <Stack spacing={2}>
                        {CORRECTIE_MIDDENVOET_OPTIES.map(option => (
                          <Radio
                            key={option.value}
                            value={option.value}
                            size="sm"
                          >
                            {option.label}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>

                  <Divider />

                  <Box>
                    <Text fontWeight="semibold" mb={2} fontSize="sm">
                      {t('insoleForefootCorrection')}
                    </Text>
                    <RadioGroup
                      value={steunzoolCorrectieVoorvoet}
                      onChange={setSteunzoolCorrectieVoorvoet}
                    >
                      <Stack spacing={2}>
                        {CORRECTIE_VOORVOET_OPTIES.map(option => (
                          <Radio
                            key={option.value}
                            value={option.value}
                            size="sm"
                          >
                            {option.label}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>

                  <Divider />

                  <Box>
                    <Text fontWeight="semibold" mb={2} fontSize="sm">
                      {t('insoleForefootPad')}
                    </Text>
                    <RadioGroup
                      value={steunzoolVvPellote}
                      onChange={setSteunzoolVvPellote}
                    >
                      <Stack spacing={2}>
                        {PELLOTE_OPTIES.map(option => (
                          <Radio
                            key={option.value}
                            value={option.value}
                            size="sm"
                          >
                            {option.label}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>

                  <Divider />

                  <Box id="field-hakverhoging">
                    <Text fontWeight="semibold" mb={2} fontSize="sm">
                      {t('insoleHeelRaiseCm')}
                    </Text>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                      <FormControl>
                        <FormLabel fontSize="sm">{t('left')}</FormLabel>
                        <Input
                          type="number"
                          placeholder={t('heelRaisePlaceholder')}
                          value={steunzoolHakVerhogingLinks}
                          onChange={e =>
                            setSteunzoolHakVerhogingLinks(e.target.value)
                          }
                          size="sm"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="sm">{t('right')}</FormLabel>
                        <Input
                          type="number"
                          placeholder={t('heelRaisePlaceholder')}
                          value={steunzoolHakVerhogingRechts}
                          onChange={e =>
                            setSteunzoolHakVerhogingRechts(e.target.value)
                          }
                          size="sm"
                        />
                      </FormControl>
                    </SimpleGrid>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </>
        )}

        {isTalonette && (
          <>
            <Divider />

            <Box>
              <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
                {t('insoleHeelRaiseCm')}
              </Text>
              <Box
                border="1px solid"
                borderColor="inherit"
                borderRadius="md"
                p={4}
                mt={2}
              >
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">{t('left')}</FormLabel>
                    <Input
                      type="number"
                      placeholder={t('heelRaisePlaceholder')}
                      value={steunzoolHakVerhogingLinks}
                      onChange={e =>
                        setSteunzoolHakVerhogingLinks(e.target.value)
                      }
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">{t('right')}</FormLabel>
                    <Input
                      type="number"
                      placeholder={t('heelRaisePlaceholder')}
                      value={steunzoolHakVerhogingRechts}
                      onChange={e =>
                        setSteunzoolHakVerhogingRechts(e.target.value)
                      }
                      size="sm"
                    />
                  </FormControl>
                </SimpleGrid>
              </Box>
            </Box>
          </>
        )}

        <Divider />

        <Box>
          <Text fontWeight="bold" mb={4} fontSize={{ base: 'md', md: 'lg' }}>
            {t('specialNotes')}
          </Text>
          <Textarea
            placeholder={t('specialNotesPlaceholder')}
            value={bijzonderheden}
            onChange={e => setBijzonderheden(e.target.value)}
            minH={{ base: '100px', md: '120px' }}
          />
        </Box>

        {!areAllFieldsValid && (
          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold" mb={2}>
                {t('fillRequiredFields')}
              </Text>
              <UnorderedList>
                {getMissingFields().map((field, index) => (
                  <ListItem key={index}>{field.fieldName}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Alert>
        )}

        <Flex justifyContent={{ base: 'stretch', sm: 'flex-end' }} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{ base: 'full', sm: 'auto' }}
          >
            Opslaan en doorgaan
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormIntakeSteunzolenPage;
