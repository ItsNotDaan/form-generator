import React, { useState, useEffect } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Divider,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Button,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '../../routes';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setIntakePulmanData, setClientData } from '@/domain/store/slices/formData';
import {
  Zijde,
  PULMAN_TYPE_OPTIES,
  SCHOENMATEN,
  PAARTYPE_OPTIES,
} from '@/presentation/form/constants/formConstants';

export const FormIntakePulmanPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // State voor omschrijving/paartype
  const [omschrijving, setOmschrijving] = useState<string>('');

  // State voor Links/Rechts/Beide selectie (default: Beide)
  const [side, setSide] = useState<Zijde>('beide');

  // State voor medische indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState('');

  // State voor gezwachteld
  const [gezwachteld, setGezwachteld] = useState<boolean>(false);

  // Helper functions for boolean <-> string conversion for UI
  const boolToString = (value: boolean): string => value ? 'ja' : 'nee';
  const stringToBool = (value: string): boolean => value === 'ja';

  // State voor type Pulman
  const [typePulman, setTypePulman] = useState('');

  // State voor schoenmaten
  const [schoenmaat, setSchoenmaat] = useState('');
  const [afgegevenMaat, setAfgegevenMaat] = useState('');

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const showLinks = side === 'links' || side === 'beide';
  const showRechts = side === 'rechts' || side === 'beide';

  // Automatisch switchen naar Harlem Extra als gezwachteld true is
  useEffect(() => {
    if (gezwachteld) {
      setTypePulman('Harlem Extra');
    }
  }, [gezwachteld]);

  const handleSubmit = () => {
    // Update client data with intake type
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'Pulman' }));
    }

    dispatch(
      setIntakePulmanData({
        omschrijving,
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
    <BaseLayout
      title={t('intakePulman')}
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
        {/* Omschrijving/Paartype */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('omschrijving')}
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
              <RadioGroup value={omschrijving} onChange={setOmschrijving}>
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

        {/* Links/Rechts/Beide selectie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('side')}
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
            color="inherit"
          >
            <RadioGroup value={side} onChange={v => setSide(v as Zijde)}>
              <Stack direction="row" spacing={6}>
                <Radio value="beide">{t('beide')}</Radio>
                <Radio value="links">{t('links')}</Radio>
                <Radio value="rechts">{t('rechts')}</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Medische Indicatie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('medischeIndicatie')}
          </Text>
          <Textarea
            placeholder={t('medischeIndicatiePlaceholder')}
            value={medischeIndicatie}
            onChange={e => setMedischeIndicatie(e.target.value)}
            minH={{ base: '80px', md: '100px' }}
          />
        </Box>

        <Divider />

        {/* Gezwachteld */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('gezwachteld')}
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
            color="inherit"
          >
            <RadioGroup
              value={boolToString(gezwachteld)}
              onChange={v => setGezwachteld(stringToBool(v))}
            >
              <Stack direction="row" spacing={6}>
                <Radio value="ja">{t('ja')}</Radio>
                <Radio value="nee">{t('nee')}</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
          {gezwachteld && (
            <Box
              mt={4}
              p={3}
              bg="blue.50"
              borderRadius="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Text fontSize="sm" color="blue.800" whiteSpace="pre-line">
                {t('gezwachteldInformationPulman')}
              </Text>
            </Box>
          )}
        </Box>

        <Divider />

        {/* Type Pulman */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('typePulman')}
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
            color="inherit"
          >
            <RadioGroup value={typePulman} onChange={setTypePulman}>
              <Stack direction="row" spacing={6}>
                {PULMAN_TYPE_OPTIES.map(option => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Schoenmaat klant */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('schoenmaat')}
          </Text>
          <Flex
            gap={{ base: 2, md: 3 }}
            direction="row"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
            flexWrap="wrap"
          >
            <RadioGroup value={schoenmaat} onChange={setSchoenmaat}>
              <Stack direction="row" spacing={{ base: 3, md: 4 }} flexWrap="wrap">
                {SCHOENMATEN.map(size => (
                  <Radio key={size} value={size}>
                    {size}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Afgegeven maat */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('afgegevenMaat')}
          </Text>
          <Flex
            gap={{ base: 2, md: 3 }}
            direction="row"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
            flexWrap="wrap"
          >
            <RadioGroup value={afgegevenMaat} onChange={setAfgegevenMaat}>
              <Stack direction="row" spacing={{ base: 3, md: 4 }} flexWrap="wrap">
                {SCHOENMATEN.map(size => (
                  <Radio key={size} value={size}>
                    {size}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Bijzonderheden */}
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

        {/* Submit button */}
        <Flex justifyContent={{ base: 'stretch', sm: 'flex-end' }} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{ base: 'full', sm: 'auto' }}
          >
            {t('opslaanEnDoorgaan')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormIntakePulmanPage;
