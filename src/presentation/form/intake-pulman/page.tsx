import React, { useState } from 'react';
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
  Select,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/domain/store/hooks';
import { setIntakePulmanData } from '@/domain/store/slices/formData';
import { Side, PULMAN_TYPE_OPTIONS, SHOE_SIZES } from '@/presentation/form/constants/formConstants';

export const FormIntakePulmanPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor Links/Rechts/Beide selectie (default: Beide)
  const [side, setSide] = useState<Side>('beide');

  // State voor medische indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState('');

  // State voor gezwachteld
  const [gezwachteld, setGezwachteld] = useState<'ja' | 'nee'>('nee');

  // State voor type Pulman
  const [typePulman, setTypePulman] = useState('');

  // State voor schoenmaten
  const [schoenmaat, setSchoenmaat] = useState('');
  const [afgegevenMaat, setAfgegevenMaat] = useState('');

  // State voor omsluiting
  const [omsluitingLinksType, setOmsluitingLinksType] = useState('');
  const [omsluitingRechtsType, setOmsluitingRechtsType] = useState('');
  const [omsluitingLinksMm, setOmsluitingLinksMm] = useState('');
  const [omsluitingRechtsMm, setOmsluitingRechtsMm] = useState('');

  // State voor proefschoen
  const [proefschoen, setProefschoen] = useState('');

  // State voor hiel
  const [hielLinks, setHielLinks] = useState('');
  const [hielRechts, setHielRechts] = useState('');

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const showLinks = side === 'links' || side === 'beide';
  const showRechts = side === 'rechts' || side === 'beide';

  const handleSubmit = () => {
    dispatch(
      setIntakePulmanData({
        side,
        medischeIndicatie,
        gezwachteld,
        typePulman,
        schoenmaat,
        afgegevenMaat,
        omsluitingLinksType,
        omsluitingRechtsType,
        omsluitingLinksMm,
        omsluitingRechtsMm,
        proefschoen,
        hielLinks,
        hielRechts,
        bijzonderheden,
      })
    );

    console.log('Intake Pulman data opgeslagen in Redux store');
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
            <RadioGroup value={side} onChange={v => setSide(v as Side)}>
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
            Medische Indicatie
          </Text>
          <Textarea
            placeholder="Medische indicatie"
            value={medischeIndicatie}
            onChange={e => setMedischeIndicatie(e.target.value)}
            minH={{ base: '80px', md: '100px' }}
          />
        </Box>

        <Divider />

        {/* Gezwachteld */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Gezwachteld?
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
            <RadioGroup value={gezwachteld} onChange={v => setGezwachteld(v as 'ja' | 'nee')}>
              <Stack direction="row" spacing={6}>
                <Radio value="ja">Ja</Radio>
                <Radio value="nee">Nee</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Type Pulman */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Type Pulman
          </Text>
          <FormControl>
            <Select
              placeholder="Selecteer type"
              value={typePulman}
              onChange={e => setTypePulman(e.target.value)}
              size="md"
            >
              {PULMAN_TYPE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider />

        {/* Schoenmaat klant */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Schoenmaat klant
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
                {SHOE_SIZES.map(size => (
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
            Afgegeven maat
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
                {SHOE_SIZES.map(size => (
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
            Opslaan en doorgaan
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormIntakePulmanPage;
