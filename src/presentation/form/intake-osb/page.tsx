import React, {useState} from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
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
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {useAppDispatch} from '@/domain/store/hooks';
import {setIntakeOSBData} from '@/domain/store/slices/formData';
import {
  PAARTYPE_OPTIONS,
  DOEL_OPTIONS,
  LOOPFUNCTIE_OPTIONS,
  LEVERANCIER_OPTIONS,
  BASISCODE_OPTIONS,
  SUPPLEMENT_OPTIONS,
  HALLUX_MM_OPTIONS,
  VERDIEPING_MM_OPTIONS,
  STEUNZOOL_TYPES,
  CORRECTIE_MIDDENVOET,
  CORRECTIE_VOORVOET,
  PELLOTE_OPTIONS,
} from '@/presentation/form/constants/formConstants';

export const FormIntakeOSBPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  // Sectie 1: Header & Omschrijving
  const [ordernummer, setOrdernummer] = useState('');
  const [omschrijving, setOmschrijving] = useState<string[]>([]);

  // Sectie 2: Medische Indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState('');

  // Sectie 3: Doel (checkboxes zonder L/R)
  const [doel, setDoel] = useState<string[]>([]);

  // Sectie 4: Loopfunctie
  const [loopfunctie, setLoopfunctie] = useState<string[]>([]);

  // Sectie 5: Leverancier & Bestel Datum
  const [leverancier, setLeverancier] = useState<string[]>([]);
  const [bestelDatum, setBestelDatum] = useState('');

  // Sectie 6: Product Specificaties
  const [artCode, setArtCode] = useState('');
  const [lengteMaat, setLengteMaat] = useState('');
  const [wijdte, setWijdte] = useState('');
  const [kleur, setKleur] = useState('');
  const [sluiting, setSluiting] = useState('');

  // Sectie 7: Modules - Hallux valgus
  const [halluxValgusEnabled, setHalluxValgusEnabled] = useState(false);
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
  const [verdiepingenVoorvoetExtraLinks, setVerdiepingenVoorvoetExtraLinks] =
    useState(false);
  const [verdiepingenVoorvoetExtraRechts, setVerdiepingenVoorvoetExtraRechts] =
    useState(false);

  // Sectie 8: Basiscode SOS & Omschrijving
  const [basiscodeSOS, setBasiscodeSOS] = useState<string[]>([]);
  const [supplements, setSupplements] = useState<
    Record<string, {links: boolean; rechts: boolean; code: number}>
  >({});

  // Sectie 9: Steunzolen
  const [steunzoolLinksType, setSteunzoolLinksType] = useState<string[]>([]);
  const [steunzoolLinksTypeAnders, setSteunzoolLinksTypeAnders] = useState('');
  const [
    steunzoolLinksCorrectieMiddenvoet,
    setSteunzoolLinksCorrectieMiddenvoet,
  ] = useState('');
  const [steunzoolLinksCorrectieVoorvoet, setSteunzoolLinksCorrectieVoorvoet] =
    useState('');
  const [steunzoolLinksVvPellote, setSteunzoolLinksVvPellote] = useState('');
  const [steunzoolLinksHakVerhogingCm, setSteunzoolLinksHakVerhogingCm] =
    useState('');

  const [steunzoolRechtsType, setSteunzoolRechtsType] = useState<string[]>([]);
  const [steunzoolRechtsTypeAnders, setSteunzoolRechtsTypeAnders] =
    useState('');
  const [
    steunzoolRechtsCorrectieMiddenvoet,
    setSteunzoolRechtsCorrectieMiddenvoet,
  ] = useState('');
  const [
    steunzoolRechtsCorrectieVoorvoet,
    setSteunzoolRechtsCorrectieVoorvoet,
  ] = useState('');
  const [steunzoolRechtsVvPellote, setSteunzoolRechtsVvPellote] = useState('');
  const [steunzoolRechtsHakVerhogingCm, setSteunzoolRechtsHakVerhogingCm] =
    useState('');

  // Bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  // Helper functions
  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  const toggleSupplement = (key: string, side: 'links' | 'rechts') => {
    const supplement = SUPPLEMENT_OPTIONS.find(s => s.key === key);
    if (!supplement) {
      return;
    }

    setSupplements(prev => {
      const current = prev[key] || {
        links: false,
        rechts: false,
        code: supplement.code,
      };
      return {
        ...prev,
        [key]: {
          ...current,
          [side]: !current[side],
        },
      };
    });
  };

  const handleSubmit = () => {
    dispatch(
      setIntakeOSBData({
        ordernummer,
        omschrijving,
        medischeIndicatie,
        doel,
        loopfunctie,
        leverancier,
        bestelDatum,
        productSpecificaties: {
          artCode,
          lengteMaat,
          wijdte,
          kleur,
          sluiting,
        },
        halluxValgusEnabled,
        halluxValgusLinks,
        halluxValgusRechts,
        halluxValgusLinksMm,
        halluxValgusRechtsMm,
        verdiepingenVoorvoetLinks,
        verdiepingenVoorvoetRechts,
        verdiepingenVoorvoetLinksMm,
        verdiepingenVoorvoetRechtsMm,
        verdiepingenVoorvoetExtraLinks,
        verdiepingenVoorvoetExtraRechts,
        basiscodeSOS,
        supplements,
        steunzoolLinks: {
          type: steunzoolLinksType,
          typeAnders: steunzoolLinksTypeAnders,
          correctieMiddenvoet: steunzoolLinksCorrectieMiddenvoet,
          correctieVoorvoet: steunzoolLinksCorrectieVoorvoet,
          vvPellote: steunzoolLinksVvPellote,
          hakVerhogingCm: steunzoolLinksHakVerhogingCm,
        },
        steunzoolRechts: {
          type: steunzoolRechtsType,
          typeAnders: steunzoolRechtsTypeAnders,
          correctieMiddenvoet: steunzoolRechtsCorrectieMiddenvoet,
          correctieVoorvoet: steunzoolRechtsCorrectieVoorvoet,
          vvPellote: steunzoolRechtsVvPellote,
          hakVerhogingCm: steunzoolRechtsHakVerhogingCm,
        },
        bijzonderheden,
      })
    );

    console.log('Intake OSB data opgeslagen in Redux store');
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
        p={{base: 4, md: 6}}
        borderRadius="md"
        gap={{base: 4, md: 6}}
      >
        {/* Sectie 1: Header & Omschrijving */}
        <Box>
          <Flex justify="space-between" align="start" mb={3}>
            <Text fontWeight="bold" fontSize={{base: 'md', md: 'lg'}}>
              Omschrijving
            </Text>
            <FormControl maxW="200px">
              <FormLabel fontSize="sm" mb={1}>
                Ordernummer
              </FormLabel>
              <Input
                placeholder="Ordernummer"
                value={ordernummer}
                onChange={e => setOrdernummer(e.target.value)}
                size="sm"
              />
            </FormControl>
          </Flex>
          <Box border="1px solid" borderColor="inherit" borderRadius="md" p={4}>
            <Stack spacing={3}>
              {PAARTYPE_OPTIONS.map(option => (
                <Checkbox
                  key={option}
                  isChecked={omschrijving.includes(option)}
                  onChange={() =>
                    setOmschrijving(toggleArrayItem(omschrijving, option))
                  }
                  size="sm"
                >
                  {option}
                </Checkbox>
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider />

        {/* Sectie 2: Medische Indicatie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Medische Indicatie
          </Text>
          <Textarea
            placeholder="Medische indicatie"
            value={medischeIndicatie}
            onChange={e => setMedischeIndicatie(e.target.value)}
            minH={{base: '80px', md: '100px'}}
          />
        </Box>

        <Divider />

        {/* Sectie 3: Doel */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Doel
          </Text>
          <Box border="1px solid" borderColor="inherit" borderRadius="md" p={4}>
            <Stack spacing={3}>
              {DOEL_OPTIONS.map(option => (
                <Checkbox
                  key={option}
                  isChecked={doel.includes(option)}
                  onChange={() => setDoel(toggleArrayItem(doel, option))}
                  size="sm"
                >
                  {option}
                </Checkbox>
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider />

        {/* Sectie 4: Loopfunctie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Loopfunctie
          </Text>
          <Box border="1px solid" borderColor="inherit" borderRadius="md" p={4}>
            <Stack spacing={3}>
              {LOOPFUNCTIE_OPTIONS.map(option => (
                <Checkbox
                  key={option}
                  isChecked={loopfunctie.includes(option)}
                  onChange={() =>
                    setLoopfunctie(toggleArrayItem(loopfunctie, option))
                  }
                  size="sm"
                >
                  {option}
                </Checkbox>
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider />

        {/* Sectie 5: Leverancier & Bestel Datum */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Leverancier
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mb={4}
          >
            <Stack spacing={3}>
              {LEVERANCIER_OPTIONS.map(option => (
                <Checkbox
                  key={option}
                  isChecked={leverancier.includes(option)}
                  onChange={() =>
                    setLeverancier(toggleArrayItem(leverancier, option))
                  }
                  size="sm"
                >
                  {option}
                </Checkbox>
              ))}
            </Stack>
          </Box>

          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Bestel Datum
          </Text>
          <FormControl>
            <Input
              type="date"
              value={bestelDatum}
              onChange={e => setBestelDatum(e.target.value)}
              size="sm"
            />
          </FormControl>
        </Box>

        <Divider />

        {/* Sectie 6: Product Specificaties */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Product Specificaties
          </Text>
          <SimpleGrid columns={{base: 1, md: 2, lg: 5}} spacing={4}>
            <FormControl>
              <FormLabel fontSize="sm">Art. Code</FormLabel>
              <Input
                placeholder="Art. Code"
                value={artCode}
                onChange={e => setArtCode(e.target.value)}
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Lengte maat</FormLabel>
              <Input
                type="number"
                placeholder="Lengte maat"
                value={lengteMaat}
                onChange={e => setLengteMaat(e.target.value)}
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Wijdte</FormLabel>
              <Input
                placeholder="Wijdte"
                value={wijdte}
                onChange={e => setWijdte(e.target.value)}
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Kleur</FormLabel>
              <Input
                placeholder="Kleur"
                value={kleur}
                onChange={e => setKleur(e.target.value)}
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Sluiting</FormLabel>
              <Input
                placeholder="Sluiting"
                value={sluiting}
                onChange={e => setSluiting(e.target.value)}
                size="sm"
              />
            </FormControl>
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Sectie 7: Modules - Hallux valgus */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Hallux valgus
          </Text>
          <Box border="1px solid" borderColor="inherit" borderRadius="md" p={4}>
            <Checkbox
              isChecked={halluxValgusEnabled}
              onChange={e => setHalluxValgusEnabled(e.target.checked)}
              size="sm"
              mb={4}
            >
              Enable Hallux valgus
            </Checkbox>

            {halluxValgusEnabled && (
              <Stack spacing={4}>
                <HStack spacing={6} align="start">
                  <Box>
                    <Checkbox
                      isChecked={halluxValgusLinks}
                      onChange={e => setHalluxValgusLinks(e.target.checked)}
                      size="sm"
                      mb={2}
                    >
                      Links
                    </Checkbox>
                    {halluxValgusLinks && (
                      <Stack spacing={2} ml={6}>
                        {HALLUX_MM_OPTIONS.map(option => (
                          <Checkbox
                            key={option}
                            isChecked={halluxValgusLinksMm === option}
                            onChange={() => setHalluxValgusLinksMm(option)}
                            size="sm"
                          >
                            {option}
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
                      mb={2}
                    >
                      Rechts
                    </Checkbox>
                    {halluxValgusRechts && (
                      <Stack spacing={2} ml={6}>
                        {HALLUX_MM_OPTIONS.map(option => (
                          <Checkbox
                            key={option}
                            isChecked={halluxValgusRechtsMm === option}
                            onChange={() => setHalluxValgusRechtsMm(option)}
                            size="sm"
                          >
                            {option}
                          </Checkbox>
                        ))}
                      </Stack>
                    )}
                  </Box>
                </HStack>
              </Stack>
            )}
          </Box>
        </Box>

        <Divider />

        {/* Sectie 7: Modules - Verdiepingen voorvoet */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Verdiepingen voorvoet
          </Text>
          <Box border="1px solid" borderColor="inherit" borderRadius="md" p={4}>
            <HStack spacing={6} align="start" mb={4}>
              <Box>
                <Checkbox
                  isChecked={verdiepingenVoorvoetLinks}
                  onChange={e => setVerdiepingenVoorvoetLinks(e.target.checked)}
                  size="sm"
                  mb={2}
                >
                  Links
                </Checkbox>
                {verdiepingenVoorvoetLinks && (
                  <Stack spacing={2} ml={6}>
                    {VERDIEPING_MM_OPTIONS.map(option => (
                      <Checkbox
                        key={option}
                        isChecked={verdiepingenVoorvoetLinksMm === option}
                        onChange={() => setVerdiepingenVoorvoetLinksMm(option)}
                        size="sm"
                      >
                        {option}
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
                  mb={2}
                >
                  Rechts
                </Checkbox>
                {verdiepingenVoorvoetRechts && (
                  <Stack spacing={2} ml={6}>
                    {VERDIEPING_MM_OPTIONS.map(option => (
                      <Checkbox
                        key={option}
                        isChecked={verdiepingenVoorvoetRechtsMm === option}
                        onChange={() => setVerdiepingenVoorvoetRechtsMm(option)}
                        size="sm"
                      >
                        {option}
                      </Checkbox>
                    ))}
                  </Stack>
                )}
              </Box>
            </HStack>

            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Extra
            </Text>
            <HStack spacing={6}>
              <Checkbox
                isChecked={verdiepingenVoorvoetExtraLinks}
                onChange={e =>
                  setVerdiepingenVoorvoetExtraLinks(e.target.checked)
                }
                size="sm"
              >
                Links
              </Checkbox>
              <Checkbox
                isChecked={verdiepingenVoorvoetExtraRechts}
                onChange={e =>
                  setVerdiepingenVoorvoetExtraRechts(e.target.checked)
                }
                size="sm"
              >
                Rechts
              </Checkbox>
            </HStack>
          </Box>
        </Box>

        <Divider />

        {/* Sectie 8: Basiscode SOS & Omschrijving */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Basiscode SOS & Omschrijving
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            overflowX="auto"
          >
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Basiscode SOS
            </Text>
            <Stack spacing={2} mb={4}>
              {BASISCODE_OPTIONS.map(option => (
                <Checkbox
                  key={option}
                  isChecked={basiscodeSOS.includes(option)}
                  onChange={() =>
                    setBasiscodeSOS(toggleArrayItem(basiscodeSOS, option))
                  }
                  size="sm"
                >
                  {option}
                </Checkbox>
              ))}
            </Stack>

            <Table size="sm" variant="simple">
              <Thead>
                <Tr>
                  <Th>Omschrijving (Code)</Th>
                  <Th textAlign="center">L</Th>
                  <Th textAlign="center">R</Th>
                </Tr>
              </Thead>
              <Tbody>
                {SUPPLEMENT_OPTIONS.map(supplement => (
                  <Tr key={supplement.key}>
                    <Td>
                      {supplement.label} ({supplement.code})
                    </Td>
                    <Td textAlign="center">
                      <Checkbox
                        isChecked={supplements[supplement.key]?.links || false}
                        onChange={() =>
                          toggleSupplement(supplement.key, 'links')
                        }
                        size="sm"
                      />
                    </Td>
                    <Td textAlign="center">
                      <Checkbox
                        isChecked={supplements[supplement.key]?.rechts || false}
                        onChange={() =>
                          toggleSupplement(supplement.key, 'rechts')
                        }
                        size="sm"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>

        <Divider />

        {/* Sectie 9: Steunzolen - Links */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Steunzool Links
          </Text>
          <Box border="1px solid" borderColor="inherit" borderRadius="md" p={4}>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Steunzool type
            </Text>
            <Stack spacing={2} mb={4}>
              {STEUNZOOL_TYPES.map(option => (
                <Box key={option}>
                  <Checkbox
                    isChecked={steunzoolLinksType.includes(option)}
                    onChange={() =>
                      setSteunzoolLinksType(
                        toggleArrayItem(steunzoolLinksType, option)
                      )
                    }
                    size="sm"
                  >
                    {option}
                  </Checkbox>
                  {option === 'Anders' &&
                    steunzoolLinksType.includes(option) && (
                      <Input
                        placeholder="Specificeer anders"
                        value={steunzoolLinksTypeAnders}
                        onChange={e =>
                          setSteunzoolLinksTypeAnders(e.target.value)
                        }
                        size="sm"
                        ml={6}
                        mt={2}
                        maxW="300px"
                      />
                    )}
                </Box>
              ))}
            </Stack>

            <SimpleGrid columns={{base: 1, md: 2}} spacing={4} mb={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Correctie middenvoet
                </Text>
                <Stack spacing={2}>
                  {CORRECTIE_MIDDENVOET.map(option => (
                    <Checkbox
                      key={option}
                      isChecked={steunzoolLinksCorrectieMiddenvoet === option}
                      onChange={() =>
                        setSteunzoolLinksCorrectieMiddenvoet(option)
                      }
                      size="sm"
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Correctie voorvoet
                </Text>
                <Stack spacing={2}>
                  {CORRECTIE_VOORVOET.map(option => (
                    <Checkbox
                      key={option}
                      isChecked={steunzoolLinksCorrectieVoorvoet === option}
                      onChange={() =>
                        setSteunzoolLinksCorrectieVoorvoet(option)
                      }
                      size="sm"
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>
            </SimpleGrid>

            <Box mb={4}>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                V.v. pellote
              </Text>
              <Stack spacing={2}>
                {PELLOTE_OPTIONS.map(option => (
                  <Checkbox
                    key={option}
                    isChecked={steunzoolLinksVvPellote === option}
                    onChange={() => setSteunzoolLinksVvPellote(option)}
                    size="sm"
                  >
                    {option}
                  </Checkbox>
                ))}
              </Stack>
            </Box>

            <FormControl>
              <FormLabel fontSize="sm">Hak verhoging (cm)</FormLabel>
              <Input
                type="number"
                placeholder="0"
                value={steunzoolLinksHakVerhogingCm}
                onChange={e => setSteunzoolLinksHakVerhogingCm(e.target.value)}
                size="sm"
                maxW="150px"
              />
            </FormControl>
          </Box>
        </Box>

        <Divider />

        {/* Sectie 9: Steunzolen - Rechts */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Steunzool Rechts
          </Text>
          <Box border="1px solid" borderColor="inherit" borderRadius="md" p={4}>
            <Text fontSize="sm" fontWeight="medium" mb={2}>
              Steunzool type
            </Text>
            <Stack spacing={2} mb={4}>
              {STEUNZOOL_TYPES.map(option => (
                <Box key={option}>
                  <Checkbox
                    isChecked={steunzoolRechtsType.includes(option)}
                    onChange={() =>
                      setSteunzoolRechtsType(
                        toggleArrayItem(steunzoolRechtsType, option)
                      )
                    }
                    size="sm"
                  >
                    {option}
                  </Checkbox>
                  {option === 'Anders' &&
                    steunzoolRechtsType.includes(option) && (
                      <Input
                        placeholder="Specificeer anders"
                        value={steunzoolRechtsTypeAnders}
                        onChange={e =>
                          setSteunzoolRechtsTypeAnders(e.target.value)
                        }
                        size="sm"
                        ml={6}
                        mt={2}
                        maxW="300px"
                      />
                    )}
                </Box>
              ))}
            </Stack>

            <SimpleGrid columns={{base: 1, md: 2}} spacing={4} mb={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Correctie middenvoet
                </Text>
                <Stack spacing={2}>
                  {CORRECTIE_MIDDENVOET.map(option => (
                    <Checkbox
                      key={option}
                      isChecked={steunzoolRechtsCorrectieMiddenvoet === option}
                      onChange={() =>
                        setSteunzoolRechtsCorrectieMiddenvoet(option)
                      }
                      size="sm"
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Correctie voorvoet
                </Text>
                <Stack spacing={2}>
                  {CORRECTIE_VOORVOET.map(option => (
                    <Checkbox
                      key={option}
                      isChecked={steunzoolRechtsCorrectieVoorvoet === option}
                      onChange={() =>
                        setSteunzoolRechtsCorrectieVoorvoet(option)
                      }
                      size="sm"
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>
            </SimpleGrid>

            <Box mb={4}>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                V.v. pellote
              </Text>
              <Stack spacing={2}>
                {PELLOTE_OPTIONS.map(option => (
                  <Checkbox
                    key={option}
                    isChecked={steunzoolRechtsVvPellote === option}
                    onChange={() => setSteunzoolRechtsVvPellote(option)}
                    size="sm"
                  >
                    {option}
                  </Checkbox>
                ))}
              </Stack>
            </Box>

            <FormControl>
              <FormLabel fontSize="sm">Hak verhoging (cm)</FormLabel>
              <Input
                type="number"
                placeholder="0"
                value={steunzoolRechtsHakVerhogingCm}
                onChange={e => setSteunzoolRechtsHakVerhogingCm(e.target.value)}
                size="sm"
                maxW="150px"
              />
            </FormControl>
          </Box>
        </Box>

        <Divider />

        {/* Bijzonderheden */}
        <Box>
          <Text fontWeight="bold" mb={4} fontSize={{base: 'md', md: 'lg'}}>
            {t('bijzonderheden')}
          </Text>
          <Textarea
            placeholder={t('bijzonderhedenPlaceholder')}
            value={bijzonderheden}
            onChange={e => setBijzonderheden(e.target.value)}
            minH={{base: '100px', md: '120px'}}
          />
        </Box>

        {/* Submit button */}
        <Flex justifyContent={{base: 'stretch', sm: 'flex-end'}} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{base: 'full', sm: 'auto'}}
          >
            Opslaan en doorgaan
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormIntakeOSBPage;
