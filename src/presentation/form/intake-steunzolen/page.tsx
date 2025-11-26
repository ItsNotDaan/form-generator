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
import { setIntakeSteunzolenData, setClientData } from '@/domain/store/slices/formData';
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

  // State voor steunzool types (checkboxes)
  const [steunzoolType, setSteunzoolType] = useState<Record<string, boolean>>({});

  // State voor Anders option
  const [steunzoolAnders, setSteunzoolAnders] = useState<boolean>(false);
  const [steunzoolAndersText, setSteunzoolAndersText] = useState<string>('');

  // State voor correcties
  const [correctieMiddenvoet, setCorrectieMiddenvoet] = useState<string>('');
  const [correctieVoorvoet, setCorrectieVoorvoet] = useState<string>('');
  const [pellote, setPellote] = useState<string>('');
  const [hakverhoging, setHakverhoging] = useState<string>('');

  // State voor prijs (required)
  const [prijs, setPrijs] = useState<string>('steunzolen225');

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState<string>('');

  // Validation: check which required fields are missing
  const getMissingFields = (): string[] => {
    const missing: string[] = [];

    if (!schoenmaat.trim()) {
      missing.push(t('schoenmaat'));
    }

    // Check if at least one steunzool type is selected OR Anders is filled
    const hasAtLeastOneSteunzoolType = Object.values(steunzoolType).some(value => value === true);
    const hasAndersWithText = steunzoolAnders && steunzoolAndersText.trim();

    if (!hasAtLeastOneSteunzoolType && !hasAndersWithText) {
      missing.push(t('steunzoolTypeOfAnders'));
    }

    if (!prijs) {
      missing.push(t('prijs'));
    }

    return missing;
  };

  const areAllFieldsValid = getMissingFields().length === 0;

  const handleSubmit = () => {
    if (!areAllFieldsValid) {
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
        steunzoolType,
        steunzoolAnders,
        steunzoolAndersText,
        correctieMiddenvoet,
        correctieVoorvoet,
        pellote,
        hakverhoging,
        prijs,
        bijzonderheden,
      })
    );

    console.log('Intake Steunzolen data opgeslagen in Redux store');

    // Navigeer naar results page
    router.push(Routes.form_results);
  };

  return (
    <BaseLayout
      title={t('intakeSteunzolen')}
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
        {!areAllFieldsValid && (
          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold" mb={2}>{t('vulVerplichteVeldenIn')}</Text>
              <UnorderedList>
                {getMissingFields().map((field, index) => (
                  <ListItem key={index}>{field}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Alert>
        )}

        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('welkPaar')}
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
                  direction={{ base: "column", md: "row" }}
                  spacing={4}
                  flexWrap="wrap"
                >
                  {PAARTYPE_OPTIES.map(option => (
                    <Radio
                      key={option.value}
                      value={option.value}
                    >
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
            {t('medischeIndicatie')}
          </Text>
          <FormControl>
            <Textarea
              placeholder={t('medischeIndicatiePlaceholder')}
              value={medischeIndicatie}
              onChange={e => setMedischeIndicatie(e.target.value)}
              minH={{ base: '80px', md: '100px' }}
            />
          </FormControl>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('schoenmaat')} *
          </Text>
          <FormControl isRequired>
            <Input
              placeholder={t('schoenmaarPlaceholder')}
              value={schoenmaat}
              onChange={e => setSchoenmaat(e.target.value)}
              size="md"
            />
          </FormControl>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('steunzolen')} *
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Stack spacing={4}>
              <Box>
                <Text fontWeight="semibold" mb={2} fontSize="sm">
                  {t('typeSteunzolen')}
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {STEUNZOOL_TYPE_OPTIES.filter(option => option.value !== 'Anders').map(option => (
                    <Checkbox
                      key={option.value}
                      isChecked={steunzoolType[option.value] || false}
                      onChange={e =>
                        setSteunzoolType({
                          ...steunzoolType,
                          [option.value]: e.target.checked,
                        })
                      }
                      size="sm"
                    >
                      {t(option.label)}
                    </Checkbox>
                  ))}
                </SimpleGrid>
                <Box mt={3}>
                  <Checkbox
                    isChecked={steunzoolAnders}
                    onChange={e => setSteunzoolAnders(e.target.checked)}
                    size="sm"
                  >
                    {t('anders')}
                  </Checkbox>
                  {steunzoolAnders && (
                    <Input
                      placeholder={t('andersSpecificatiePlaceholder')}
                      value={steunzoolAndersText}
                      onChange={e => setSteunzoolAndersText(e.target.value)}
                      size="sm"
                      mt={2}
                    />
                  )}
                </Box>
              </Box>

              <Divider />

              <Box>
                <Text fontWeight="semibold" mb={2} fontSize="sm">
                  {t('correctieMiddenvoet')}
                </Text>
                <RadioGroup value={correctieMiddenvoet} onChange={setCorrectieMiddenvoet}>
                  <Stack spacing={2}>
                    {CORRECTIE_MIDDENVOET_OPTIES.map(option => (
                      <Radio key={option.value} value={option.value} size="sm">
                        {t(option.label)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>

              <Divider />

              <Box>
                <Text fontWeight="semibold" mb={2} fontSize="sm">
                  {t('correctieVoorvoet')}
                </Text>
                <RadioGroup value={correctieVoorvoet} onChange={setCorrectieVoorvoet}>
                  <Stack spacing={2}>
                    {CORRECTIE_VOORVOET_OPTIES.map(option => (
                      <Radio key={option.value} value={option.value} size="sm">
                        {t(option.label)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>

              <Divider />

              <Box>
                <Text fontWeight="semibold" mb={2} fontSize="sm">
                  {t('pellote')}
                </Text>
                <RadioGroup value={pellote} onChange={setPellote}>
                  <Stack spacing={2}>
                    {PELLOTE_OPTIES.map(option => (
                      <Radio key={option.value} value={option.value} size="sm">
                        {t(option.label)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>

              <Divider />

              <Box>
                <Text fontWeight="semibold" mb={2} fontSize="sm">
                  {t('hakverhoging')}
                </Text>
                <Input
                  placeholder={t('hakverhogingPlaceholder')}
                  value={hakverhoging}
                  onChange={e => setHakverhoging(e.target.value)}
                  size="sm"
                />
              </Box>
            </Stack>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('prijs')} *
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <RadioGroup value={prijs} onChange={setPrijs}>
              <Stack spacing={3}>
                {STEUNZOLEN_PRIJS_OPTIES.map(option => (
                  <Radio key={option.value} value={option.value} size="sm">
                    {t(option.label)}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="bold" mb={4} fontSize={{ base: 'md', md: 'lg' }}>
            {t('bijzonderheden')}
          </Text>
          <Textarea
            placeholder={t('bijzonderhedenPlaceholder')}
            value={bijzonderheden}
            onChange={e => setBijzonderheden(e.target.value)}
            minH={{ base: '100px', md: '120px' }}
          />
        </Box>

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
