import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
  Flex,
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
import { setIntakeRebacareData, setClientData } from '@/domain/store/slices/formData';
import { Zijde, PAARTYPE_OPTIES } from '@/presentation/form/constants/formConstants';

export const FormIntakeRebacarePage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // State voor omschrijving/paartype
  const [omschrijving, setOmschrijving] = useState<string>('Eerste paar');

  // State voor Links/Rechts/Beide selectie (default: Beide)
  const [side, setSide] = useState<Zijde>('beide');

  // State voor medische indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState('');

  // State voor gezwachteld
  const [gezwachteld, setGezwachteld] = useState<boolean>(false);

  // Helper functions for boolean <-> string conversion for UI
  const boolToString = (value: boolean): string => value ? 'ja' : 'nee';
  const stringToBool = (value: string): boolean => value === 'ja';

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const handleSubmit = () => {
    // Update client data with intake type
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'Rebacare' }));
    }

    dispatch(
      setIntakeRebacareData({
        omschrijving,
        side,
        medischeIndicatie,
        gezwachteld,
        bijzonderheden,
      })
    );

    console.log('Intake Rebacare data opgeslagen in Redux store');

    // Navigeer naar results page
    router.push(Routes.form_results);
  };

  return (
    <BaseLayout
      title={t('intakeRebacare')}
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

export default FormIntakeRebacarePage;
