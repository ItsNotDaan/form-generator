import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Input,
  Box,
  Divider,
  Textarea,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

interface BasiscodeProps {
  code: string;
  label: string;
}

interface BasiscodeLRCheckboxProps {
  code: string;
  label: string;
}

const BasiscodeCheckbox: React.FC<BasiscodeProps> = ({ code, label }) => (
  <Flex gap={2} alignItems="center">
    <Text minW="8">{code}</Text>
    <Text flex={1}>{label}</Text>
    <Checkbox />
  </Flex>
);

const BasiscodeLRCheckbox: React.FC<BasiscodeLRCheckboxProps> = ({ code, label }) => (
  <Flex gap={2} alignItems="center">
    <Text minW="8">{code}</Text>
    <Text flex="1">{label}</Text>
    <Text> Links </Text>
    <Checkbox size="sm" aria-label="Links" />
    <Text> Rechts </Text>
    <Checkbox size="sm" aria-label="Rechts" />
  </Flex>
);

export const FormIntakeOSAVLOSPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');

  const [paarType, setPaarType] = useState<string>('');

  return (
    <BaseLayout
      title={t('intakeOsavlos')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <Flex
        w="full"
        direction="column"
        bg="white"
        p={6}
        borderRadius="md"
        gap={6}
      >
        {/* Basiscodes */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('Basiscodes')}</Text>
          <Grid templateColumns="repeat(8, 1fr)" gap={2}>
            {['01', '02', '03', '04', '05', '06', '07', '08'].map(code => (
              <GridItem key={code}>
                <Checkbox>{code}</Checkbox>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <Divider />

        <Flex gap={8} alignItems="center-top">
          {/* Omschrijvingen */}
          <FormControl>
            <Text fontWeight="bold" mb={4}>{t('Omschrijving')}</Text>
            <Stack spacing={2}>
              <BasiscodeLRCheckbox code="09" label={t('Proefschoen:')} />
              <BasiscodeLRCheckbox code="10" label={t('Verhoging 1 t/m 8:')} />
              <BasiscodeLRCheckbox code="11" label={t('Verhoging 6 cm of meer:')} />
              <BasiscodeLRCheckbox code="14" label={t('Aanvulling lengte/breedte:')} />
              <BasiscodeLRCheckbox code="15" label={t('Zoolverstijving:')} />
              <BasiscodeLRCheckbox code="16" label={t('Med/Lateraal Ezelsoor:')} />
              <BasiscodeLRCheckbox code="16a" label={t('Koker aan supplement:')} />
              <BasiscodeLRCheckbox code="17" label={t('Koker tussen voering:')} />
              <BasiscodeLRCheckbox code="21" label={t('Correctie (Uren)')} />
              <BasiscodeLRCheckbox code="22" label={t('Overigen:')} />
            </Stack>
          </FormControl>

          <Divider orientation="vertical" />

          {/* Indien OSA */}
          <FormControl>
            <Text fontWeight="bold" mb={4}>{t('Indien een OSA:')}</Text>
            <RadioGroup onChange={setPaarType} value={paarType}>
              <Stack direction="column" spacing={2}>
                <Radio value="eerstePaar">{t('Eerste Paar')}</Radio>
                <Radio value="herhalingsPaar">{t('Herhalings Paar')}</Radio>
                <Radio value="reservePaar">{t('Reserve Paar')}</Radio>
                <Radio value="privePaar">{t('Privé Paar')}</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Flex>

        <Divider />

        {/* Supplementen */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('supplementen')}</Text>
          <Stack spacing={3}>
            <BasiscodeLRCheckbox code="" label={t('keerwand')} />
            <BasiscodeLRCheckbox code="0" label={t('verkorting')} />
            <BasiscodeLRCheckbox code="0" label={t('schoring')} />
          </Stack>
        </Box>

        {/* Voeringschoen
        <Box>
          <Text fontWeight="bold" mb={4}>{t('voeringschoen')}</Text>
          <Stack spacing={3}>
            <LRCheckbox label={t('hoogteOmsluiting')} hasCmField />
            <LRCheckbox label={t('laveroOmsluiting')} />
            <LRCheckbox label={t('multivormOmsluiting')} />
            <LRCheckbox label={t('plastazote3mm')} />
            <LRCheckbox label={t('orcaOmsluiting')} />
            <LRCheckbox label={t('schoren')} hasLateraalMediaal />
            <LRCheckbox label={t('neusverlenging')} hasCmField />
            <LRCheckbox label={t('ercoflexveer')} />
            <LRCheckbox label={t('zoolverstijfing')} />
          </Stack>
        </Box> */}

        {/* Bijzonderheden */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('bijzonderheden')}</Text>
          <FormControl>
            <Textarea
              placeholder={t('bijzonderhedenPlaceholder')}
              size="lg"
              minH="120px"
            />
          </FormControl>
        </Box>

      </Flex>
    </BaseLayout>
  );
};