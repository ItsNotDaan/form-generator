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
  Button,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { DatePickerField } from '@/presentation/base/input/datePickerField';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '../../routes';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setIntakeOSBData, setClientData } from '@/domain/store/slices/formData';
import {
  PAARTYPE_OPTIES,
  DOEL_OPTIES,
  LOOPFUNCTIE_OPTIES,
  LEVERANCIER_OPTIES,
  BASISCODE_OPTIES,
  SUPPLEMENT_OPTIES,
  HALLUX_MM_OPTIES,
  VERDIEPING_MM_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
  CORRECTIE_MIDDENVOET_OPTIES,
  CORRECTIE_VOORVOET_OPTIES,
  PELLOTE_OPTIES,
} from '@/presentation/form/constants/formConstants';

export const FormIntakeOSBPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // Sectie 1: Header & Omschrijving
  const [ordernummer, setOrdernummer] = useState('');
  const [omschrijving, setOmschrijving] = useState<string>('');

  // Sectie 2: Medische Indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState('');

  // Sectie 3: Doel (checkboxes zonder L/R) - now Record for Word document
  const [doel, setDoel] = useState<Record<string, boolean>>({});

  // Sectie 4: Loopfunctie - now Record for Word document
  const [loopfunctie, setLoopfunctie] = useState<Record<string, boolean>>({});

  // Sectie 5: Leverancier & Bestel Datum
  const [leverancier, setLeverancier] = useState<string>('');
  const [bestelDatum, setBestelDatum] = useState<Date | undefined>(undefined);

  // Sectie 6: Product Specificaties
  const [artCode, setArtCode] = useState('');
  const [lengteMaat, setLengteMaat] = useState('');
  const [wijdte, setWijdte] = useState('');
  const [kleur, setKleur] = useState('');
  const [sluiting, setSluiting] = useState('');

  // Sectie 7: Modules - Hallux valgus
  const [halluxValgusLinks, setHalluxValgusLinks] = useState(false);
  const [halluxValgusRechts, setHalluxValgusRechts] = useState(false);
  const [halluxValgusLinksMm, setHalluxValgusLinksMm] = useState('');
  const [halluxValgusRechtsMm, setHalluxValgusRechtsMm] = useState('');

  // Sectie 7: Modules - Verdiepingen voorvoet
  const [verdiepingenVoorvoetLinks, setVerdiepingenVoorvoetLinks] =
    useState(false);
  const [verdiepingenVoorvoetRechts, setVerdiepingenVoorvoetRechts] =
    useState(false);
  const [verdiepingenVoorvoetLinksMm, setVerdiepingenVoorvoetLinksMm] =
    useState('');
  const [verdiepingenVoorvoetRechtsMm, setVerdiepingenVoorvoetRechtsMm] =
    useState('');

  // Sectie 8: Basiscode SOS & Omschrijving
  const [basiscodeSOS, setBasiscodeSOS] = useState<string>('');

  // Supplements - individuele state variabelen (4 supplements × 2 zijdes = 8 velden)
  const [supplementIndividueelLinks, setSupplementIndividueelLinks] = useState(false);
  const [supplementIndividueelRechts, setSupplementIndividueelRechts] = useState(false);
  const [afwikkelrolEenvoudigLinks, setAfwikkelrolEenvoudigLinks] = useState(false);
  const [afwikkelrolEenvoudigRechts, setAfwikkelrolEenvoudigRechts] = useState(false);
  const [afwikkelrolGecompliceerdLinks, setAfwikkelrolGecompliceerdLinks] = useState(false);
  const [afwikkelrolGecompliceerdRechts, setAfwikkelrolGecompliceerdRechts] = useState(false);
  const [zoolverstijvingLinks, setZoolverstijvingLinks] = useState(false);
  const [zoolverstijvingRechts, setZoolverstijvingRechts] = useState(false);

  // Sectie 9: Steunzolen (gecombineerd voor beide voeten) - now Record for Word document
  const [steunzoolType, setSteunzoolType] = useState<Record<string, boolean>>({});
  const [steunzoolTypeAnders, setSteunzoolTypeAnders] = useState('');
  const [steunzoolCorrectieMiddenvoet, setSteunzoolCorrectieMiddenvoet] =
    useState('');
  const [steunzoolCorrectieVoorvoet, setSteunzoolCorrectieVoorvoet] =
    useState('');
  const [steunzoolVvPellote, setSteunzoolVvPellote] = useState('');
  const [steunzoolHakVerhogingLinks, setSteunzoolHakVerhogingLinks] =
    useState('');
  const [steunzoolHakVerhogingRechts, setSteunzoolHakVerhogingRechts] =
    useState('');

  // Bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  // Helper functions - toggleArrayItem removed, now using Record<string, boolean>

  // Helper functie om de juiste state getter/setter te krijgen voor een supplement en zijde
  const getSupplementState = (key: string, side: 'links' | 'rechts'): [boolean, (value: boolean) => void] => {
    const stateMap: Record<string, { links: [boolean, (v: boolean) => void]; rechts: [boolean, (v: boolean) => void] }> = {
      individueel: {
        links: [supplementIndividueelLinks, setSupplementIndividueelLinks],
        rechts: [supplementIndividueelRechts, setSupplementIndividueelRechts],
      },
      afwikkelrol_eenvoudig: {
        links: [afwikkelrolEenvoudigLinks, setAfwikkelrolEenvoudigLinks],
        rechts: [afwikkelrolEenvoudigRechts, setAfwikkelrolEenvoudigRechts],
      },
      afwikkelrol_gecompliceerd: {
        links: [afwikkelrolGecompliceerdLinks, setAfwikkelrolGecompliceerdLinks],
        rechts: [afwikkelrolGecompliceerdRechts, setAfwikkelrolGecompliceerdRechts],
      },
      zoolverstijving: {
        links: [zoolverstijvingLinks, setZoolverstijvingLinks],
        rechts: [zoolverstijvingRechts, setZoolverstijvingRechts],
      },
    };
    return stateMap[key][side];
  };

  const handleSubmit = () => {
    // Update client data with intake type
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'OSB' }));
    }

    dispatch(
      setIntakeOSBData({
        ordernummer,
        omschrijving,
        medischeIndicatie,
        doel,
        loopfunctie,
        leverancier,
        bestelDatum: bestelDatum?.toISOString() || '',
        productSpecificaties: {
          artCode,
          lengteMaat,
          wijdte,
          kleur,
          sluiting,
        },
        halluxValgusLinks,
        halluxValgusRechts,
        halluxValgusLinksMm,
        halluxValgusRechtsMm,
        verdiepingenVoorvoetLinks,
        verdiepingenVoorvoetRechts,
        verdiepingenVoorvoetLinksMm,
        verdiepingenVoorvoetRechtsMm,
        basiscodeSOS,
        supplementIndividueelLinks,
        supplementIndividueelRechts,
        afwikkelrolEenvoudigLinks,
        afwikkelrolEenvoudigRechts,
        afwikkelrolGecompliceerdLinks,
        afwikkelrolGecompliceerdRechts,
        zoolverstijvingLinks,
        zoolverstijvingRechts,
        steunzoolType,
        steunzoolTypeAnders,
        steunzoolCorrectieMiddenvoet,
        steunzoolCorrectieVoorvoet,
        steunzoolVvPellote,
        steunzoolHakVerhogingLinks,
        steunzoolHakVerhogingRechts,
        bijzonderheden,
      })
    );

    console.log('Intake OSB data opgeslagen in Redux store');

    // Navigeer naar results page
    router.push(Routes.form_results);
  };

  return (
    <BaseLayout
      title={t('intakeOsb')}
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
        {/* Sectie 1: Header & Omschrijving */}
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

        {/* Sectie 2: Medische Indicatie */}
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

        {/* Sectie 3: Doel */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('doel')}
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
            <Stack
              spacing={3}
              direction={{ base: 'column', md: 'row' }}
            >
              {DOEL_OPTIES.map(option => (
                <Checkbox
                  key={option.value}
                  isChecked={doel[option.fullKey] || false}
                  onChange={(e) => setDoel({ ...doel, [option.fullKey]: e.target.checked })}
                  size="sm"
                >
                  {option.label}
                </Checkbox>
              ))}
            </Stack>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 4: Loopfunctie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('loopfunctie')}
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
            <Stack spacing={3}>
              {LOOPFUNCTIE_OPTIES.map(option => (
                <Checkbox
                  key={option.value}
                  isChecked={loopfunctie[option.fullKey] || false}
                  onChange={(e) =>
                    setLoopfunctie({ ...loopfunctie, [option.fullKey]: e.target.checked })
                  }
                  size="sm"
                >
                  {option.label}
                </Checkbox>
              ))}
            </Stack>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 5: Leverancier & Bestel Datum */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('leverancier')}
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
              <RadioGroup value={leverancier} onChange={setLeverancier}>
                <Stack spacing={3}>
                  {LEVERANCIER_OPTIES.map(option => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 6: Product Specificaties */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('productSpecificaties')}
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm">{t('artCode')}</FormLabel>
                <Input
                  placeholder={t('artCodePlaceholder')}
                  value={artCode}
                  onChange={e => setArtCode(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('lengteMaat')}</FormLabel>
                <Input
                  type="number"
                  placeholder={t('lengteMaatPlaceholder')}
                  value={lengteMaat}
                  onChange={e => setLengteMaat(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('wijdte')}</FormLabel>
                <Input
                  placeholder={t('wijdtePlaceholder')}
                  value={wijdte}
                  onChange={e => setWijdte(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('kleur')}</FormLabel>
                <Input
                  placeholder={t('kleurPlaceholder')}
                  value={kleur}
                  onChange={e => setKleur(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('sluitingOsb')}</FormLabel>
                <Input
                  placeholder={t('sluitingPlaceholder')}
                  value={sluiting}
                  onChange={e => setSluiting(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl >
                <FormLabel fontSize="sm">{t('bestelDatum')}</FormLabel>
                <DatePickerField
                  date={bestelDatum}
                  onDateChanged={setBestelDatum}
                  maxDate={null}
                />
              </FormControl>
            </SimpleGrid>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 7: Modules */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('modules')}
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {/* Hallux valgus */}
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={3}>
                {t('halluxValgus')}
              </Text>
              <HStack spacing={6} align="start">
                <Box>
                  <Checkbox
                    isChecked={halluxValgusLinks}
                    onChange={e => setHalluxValgusLinks(e.target.checked)}
                    size="sm"
                    mb={halluxValgusLinks ? 2 : 0}
                  >
                    {t('links')}
                  </Checkbox>
                  {halluxValgusLinks && (
                    <Stack spacing={2} ml={6}>
                      {HALLUX_MM_OPTIES.map(option => (
                        <Checkbox
                          key={option.value}
                          isChecked={halluxValgusLinksMm === option.value}
                          onChange={() => setHalluxValgusLinksMm(option.value)}
                          size="sm"
                        >
                          {option.label}
                        </Checkbox>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Box>
                  <Checkbox
                    isChecked={halluxValgusRechts}
                    onChange={e => setHalluxValgusRechts(e.target.checked)}
                    size="sm"
                    mb={halluxValgusRechts ? 2 : 0}
                  >
                    {t('rechts')}
                  </Checkbox>
                  {halluxValgusRechts && (
                    <Stack spacing={2} ml={6}>
                      {HALLUX_MM_OPTIES.map(option => (
                        <Checkbox
                          key={option.value}
                          isChecked={halluxValgusRechtsMm === option.value}
                          onChange={() => setHalluxValgusRechtsMm(option.value)}
                          size="sm"
                        >
                          {option.label}
                        </Checkbox>
                      ))}
                    </Stack>
                  )}
                </Box>
              </HStack>
            </Box>

            <Divider />

            {/* Verdiepingen voorvoet */}
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={3}>
                {t('verdiepingenVoorvoet')}
              </Text>
              <HStack spacing={6} align="start">
                <Box>
                  <Checkbox
                    isChecked={verdiepingenVoorvoetLinks}
                    onChange={e =>
                      setVerdiepingenVoorvoetLinks(e.target.checked)
                    }
                    size="sm"
                    mb={verdiepingenVoorvoetLinks ? 2 : 0}
                  >
                    {t('links')}
                  </Checkbox>
                  {verdiepingenVoorvoetLinks && (
                    <Stack spacing={2} ml={6}>
                      {VERDIEPING_MM_OPTIES.map(option => (
                        <Checkbox
                          key={option.value}
                          isChecked={verdiepingenVoorvoetLinksMm === option.value}
                          onChange={() =>
                            setVerdiepingenVoorvoetLinksMm(option.value)
                          }
                          size="sm"
                        >
                          {option.label}
                        </Checkbox>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Box>
                  <Checkbox
                    isChecked={verdiepingenVoorvoetRechts}
                    onChange={e =>
                      setVerdiepingenVoorvoetRechts(e.target.checked)
                    }
                    size="sm"
                    mb={verdiepingenVoorvoetRechts ? 2 : 0}
                  >
                    {t('rechts')}
                  </Checkbox>
                  {verdiepingenVoorvoetRechts && (
                    <Stack spacing={2} ml={6}>
                      {VERDIEPING_MM_OPTIES.map(option => (
                        <Checkbox
                          key={option.value}
                          isChecked={verdiepingenVoorvoetRechtsMm === option.value}
                          onChange={() =>
                            setVerdiepingenVoorvoetRechtsMm(option.value)
                          }
                          size="sm"
                        >
                          {option.label}
                        </Checkbox>
                      ))}
                    </Stack>
                  )}
                </Box>
              </HStack>
            </Box>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 8: Basiscode SOS & Omschrijving */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('basiscodeSosEnOmschrijving')}
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('basiscodeSos')}
              </Text>
              <RadioGroup value={basiscodeSOS} onChange={setBasiscodeSOS}>
                <Stack direction="row" spacing={4} flexWrap="wrap">
                  {BASISCODE_OPTIES.map(option => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>

            <Box overflowX="auto">
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th>{t('omschrijvingCode')}</Th>
                    <Th textAlign="center">L</Th>
                    <Th textAlign="center">R</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {SUPPLEMENT_OPTIES.map(supplement => {
                    const [linksValue, setLinksValue] = getSupplementState(supplement.key, 'links');
                    const [rechtsValue, setRechtsValue] = getSupplementState(supplement.key, 'rechts');

                    return (
                      <Tr key={supplement.key}>
                        <Td>
                          {supplement.label} ({supplement.code})
                        </Td>
                        <Td textAlign="center">
                          <Checkbox
                            isChecked={linksValue}
                            onChange={(e) => setLinksValue(e.target.checked)}
                            size="sm"
                          />
                        </Td>
                        <Td textAlign="center">
                          <Checkbox
                            isChecked={rechtsValue}
                            onChange={(e) => setRechtsValue(e.target.checked)}
                            size="sm"
                          />
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 9: Steunzolen */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('steunzolen')}
          </Text>
          <Flex
            gap={{ base: 2, md: 3 }}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('steunzoolType')}
              </Text>
              <Flex
                gap={{ base: 2, md: 3 }}
                flexWrap="wrap"
                direction={{ base: 'column', md: 'row' }}
              >
                {STEUNZOOL_TYPE_OPTIES.map(option => (
                  <Box key={option.value}>
                    <Checkbox
                      isChecked={steunzoolType[option.fullKey] || false}
                      onChange={(e) =>
                        setSteunzoolType({ ...steunzoolType, [option.fullKey]: e.target.checked })
                      }
                      size="sm"
                    >
                      {option.label}
                    </Checkbox>
                    {option.value === 'Anders' && steunzoolType[option.fullKey] && (
                      <Input
                        placeholder={t('andersSpecificeer')}
                        value={steunzoolTypeAnders}
                        onChange={e => setSteunzoolTypeAnders(e.target.value)}
                        size="sm"
                        mt={2}
                        maxW="300px"
                      />
                    )}
                  </Box>
                ))}
              </Flex>
            </Box>

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('correctieMiddenvoet')}
              </Text>
              <Flex
                gap={{ base: 2, md: 3 }}
                flexWrap="wrap">
                {CORRECTIE_MIDDENVOET_OPTIES.map(option => (
                  <Checkbox
                    key={option.value}
                    isChecked={steunzoolCorrectieMiddenvoet === option.value}
                    onChange={() => setSteunzoolCorrectieMiddenvoet(
                      steunzoolCorrectieMiddenvoet === option.value ? '' : option.value
                    )}
                    size="sm"
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </Flex>
            </Box>

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('correctieVoorvoet')}
              </Text>
              <Flex
                gap={{ base: 2, md: 3 }}
                flexWrap="wrap"
              >
                {CORRECTIE_VOORVOET_OPTIES.map(option => (
                  <Checkbox
                    key={option.value}
                    isChecked={steunzoolCorrectieVoorvoet === option.value}
                    onChange={() => setSteunzoolCorrectieVoorvoet(
                      steunzoolCorrectieVoorvoet === option.value ? '' : option.value
                    )}
                    size="sm"
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </Flex>
            </Box>

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('vvPellote')}
              </Text>
              <Flex
                gap={{ base: 2, md: 3 }}
                flexWrap="wrap"
              >
                {PELLOTE_OPTIES.map(option => (
                  <Checkbox
                    key={option.value}
                    isChecked={steunzoolVvPellote === option.value}
                    onChange={() => setSteunzoolVvPellote(
                      steunzoolVvPellote === option.value ? '' : option.value
                    )}
                    size="sm"
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </Flex>
            </Box>

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('hakVerhogingCm')}
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">{t('links')}</FormLabel>
                  <Input
                    type="number"
                    placeholder={t('hakVerhogingPlaceholder')}
                    value={steunzoolHakVerhogingLinks}
                    onChange={e =>
                      setSteunzoolHakVerhogingLinks(e.target.value)
                    }
                    size="sm"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">{t('rechts')}</FormLabel>
                  <Input
                    type="number"
                    placeholder={t('hakVerhogingPlaceholder')}
                    value={steunzoolHakVerhogingRechts}
                    onChange={e =>
                      setSteunzoolHakVerhogingRechts(e.target.value)
                    }
                    size="sm"
                  />
                </FormControl>
              </SimpleGrid>
            </Box>
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
      </Flex >
    </BaseLayout >
  );
};

export default FormIntakeOSBPage;
