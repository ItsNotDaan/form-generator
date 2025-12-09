import React, {useState} from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
import {
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Input,
  Select,
  Text,
  Box,
  Divider,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Button,
  Image,
  Alert,
  AlertIcon,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {
  OMSLUITING_OPTIES,
  OmsluitingKey,
  OmsluitingOptie,
  OPENSTAND_OPTIES,
  SUPPLEMENT_TYPE_OPTIES,
  HAKSOORT_OPTIES,
  LOOPZOOL_OPTIES,
  SLUITING_OPTIES,
  HAKSCHORING_TYPE_OPTIES,
  EZELSOOR_TYPE_OPTIES,
  JA_NEE_OPTIES,
  PAARTYPE_OPTIES,
  Zijde,
} from '@/presentation/form/constants/formConstants';
import {useAppDispatch, useAppSelector} from '@/domain/store/hooks';
import {setIntakeOSAData, setClientData} from '@/domain/store/slices/formData';

export const FormIntakeOSAPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // State voor omschrijving/paartype
  const [welkPaar, setWelkPaar] = useState<string>('Eerste paar'); // State voor Links/Rechts/Beide selectie (default: Beide)
  const [side, setSide] = useState<Zijde>('beide');

  // State voor schachthoogte
  const [schachthoogteLinks, setSchachthoogteLinks] = useState('14');
  const [schachthoogteRechts, setSchachthoogteRechts] = useState('14');

  // State voor omsluiting (multi-select) - Multivorm standaard geselecteerd
  // Now using Record<string, boolean> for Word document compatibility
  const [omsluitingLinks, setOmsluitingLinks] = useState<
    Record<string, boolean>
  >({
    omsluitingLinksMultivorm: true,
  });
  const [omsluitingRechts, setOmsluitingRechts] = useState<
    Record<string, boolean>
  >({
    omsluitingRechtsMultivorm: true,
  });

  // State voor omsluiting mm waardes with descriptive keys
  const [omsluitingLinksMm, setOmsluitingLinksMm] = useState<
    Record<string, string>
  >({
    omsluitingMmLinksMultivorm: '3',
  });
  const [omsluitingRechtsMm, setOmsluitingRechtsMm] = useState<
    Record<string, string>
  >({
    omsluitingMmRechtsMultivorm: '3',
  });

  // State voor supplementschoring
  const [supplementschoringLinksEnabled, setSupplementschoringLinksEnabled] =
    useState<boolean>(false);
  const [supplementschoringRechtsEnabled, setSupplementschoringRechtsEnabled] =
    useState<boolean>(false);
  const [supplementschoringLinksType, setSupplementschoringLinksType] =
    useState(''); // lateraal/mediaal/lateraal of mediaal
  const [supplementschoringRechtsType, setSupplementschoringRechtsType] =
    useState('');

  // State voor zoolverstijving (gecorrigeerd van zoolverslijving)
  const [zoolverstijvingEnabled, setZoolverstijvingEnabled] =
    useState<boolean>(false);
  const [zoolverstijvingLinks, setZoolverstijvingLinks] = useState(false);
  const [zoolverstijvingRechts, setZoolverstijvingRechts] = useState(false);

  // State voor sluiting
  const [sluitingType, setSluitingType] = useState<string>(
    SLUITING_OPTIES[0].value
  ); // standaard haken/ringen

  // State voor inschotpunt
  const [inschotpunt, setInschotpunt] = useState('');

  // State voor openstand schacht
  const [openstandSchacht, setOpenstandSchacht] = useState<string>(
    OPENSTAND_OPTIES[2].value
  );

  // State voor tongpolster
  const [tongpolsterEnabled, setTongpolsterEnabled] = useState<boolean>(false);

  // State voor tong vaststikken
  const [tongVaststikkenEnabled, setTongVaststikkenEnabled] =
    useState<boolean>(false);

  // State voor haksoort
  const [haksoortLinks, setHaksoortLinks] = useState<string>(
    HAKSOORT_OPTIES[0].value
  ); // standaard
  const [haksoortRechts, setHaksoortRechts] = useState<string>(
    HAKSOORT_OPTIES[0].value
  ); // standaard

  // State voor hakhoogte
  const [hakhoogteLinks, setHakhoogteLinks] = useState('2'); // standaard 2cm
  const [hakhoogteRechts, setHakhoogteRechts] = useState('2'); // standaard 2cm

  // State voor hakschoring
  const [hakschoringLinksEnabled, setHakschoringLinksEnabled] =
    useState<boolean>(false);
  const [hakschoringRechtsEnabled, setHakschoringRechtsEnabled] =
    useState<boolean>(false);
  const [hakschoringLinksType, setHakschoringLinksType] = useState(''); // mediaal/lateraal
  const [hakschoringRechtsType, setHakschoringRechtsType] = useState('');

  // State voor ezelsoor
  const [ezelsoorLinksEnabled, setEzelsoorLinksEnabled] =
    useState<boolean>(false);
  const [ezelsoorRechtsEnabled, setEzelsoorRechtsEnabled] =
    useState<boolean>(false);
  const [ezelsoorLinksType, setEzelsoorLinksType] = useState(''); // mediaal/lateraal
  const [ezelsoorRechtsType, setEzelsoorRechtsType] = useState('');

  // State voor hakafronding
  const [hakafrondingLinksEnabled, setHakafrondingLinksEnabled] =
    useState<boolean>(true); // standaard true
  const [hakafrondingRechtsEnabled, setHakafrondingRechtsEnabled] =
    useState<boolean>(true); // standaard true
  const [hakafrondingLinksHoogte, setHakafrondingLinksHoogte] = useState('10'); // standaard 10mm
  const [hakafrondingLinksLengte, setHakafrondingLinksLengte] = useState('50'); // standaard 50mm
  const [hakafrondingRechtsHoogte, setHakafrondingRechtsHoogte] =
    useState('10'); // standaard 10mm
  const [hakafrondingRechtsLengte, setHakafrondingRechtsLengte] =
    useState('50'); // standaard 50mm

  // State voor loopzool
  const [loopzoolType, setLoopzoolType] = useState<string>(
    LOOPZOOL_OPTIES[0].value
  ); // standaard

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const showLinks = side === 'links' || side === 'beide';
  const showRechts = side === 'rechts' || side === 'beide';

  // Helper functions for boolean <-> string conversion for UI
  const boolToString = (value: boolean): string => (value ? 'ja' : 'nee');
  const stringToBool = (value: string): boolean => value === 'ja';

  // Handler om terug te gaan (optioneel: data opslaan in localStorage/sessionStorage)
  // Validation: check which required fields are missing
  const getMissingFields = (): string[] => {
    const missing: string[] = [];
    // No required fields for OSA
    return missing;
  };

  const areAllFieldsValid = getMissingFields().length === 0;

  const handleSubmit = () => {
    if (!areAllFieldsValid) {
      return; // Validation alert will show the missing fields
    }

    // Update client data with intake type
    if (clientData) {
      dispatch(setClientData({...clientData, intakeType: 'OSA'}));
    }

    // Dispatch intake OSA data naar Redux store
    dispatch(
      setIntakeOSAData({
        welkPaar,
        side,
        schachthoogteLinks,
        schachthoogteRechts,
        omsluitingLinks,
        omsluitingRechts,
        omsluitingLinksMm,
        omsluitingRechtsMm,
        supplementschoringLinksEnabled,
        supplementschoringRechtsEnabled,
        supplementschoringLinksType,
        supplementschoringRechtsType,
        zoolverstijvingEnabled,
        zoolverstijvingLinks,
        zoolverstijvingRechts,
        sluitingType,
        inschotpunt,
        openstandSchacht,
        tongpolsterEnabled,
        tongVaststikkenEnabled,
        haksoortLinks,
        haksoortRechts,
        hakhoogteLinks,
        hakhoogteRechts,
        hakschoringLinksEnabled,
        hakschoringRechtsEnabled,
        hakschoringLinksType,
        hakschoringRechtsType,
        ezelsoorLinksEnabled,
        ezelsoorRechtsEnabled,
        ezelsoorLinksType,
        ezelsoorRechtsType,
        hakafrondingLinksEnabled,
        hakafrondingRechtsEnabled,
        hakafrondingLinksHoogte,
        hakafrondingLinksLengte,
        hakafrondingRechtsHoogte,
        hakafrondingRechtsLengte,
        loopzoolType,
        bijzonderheden,
      })
    );

    // Navigeer naar results page
    router.push(Routes.form_results);
  };

  return (
    <BaseLayout
      title={t('intakeOsa')}
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
        {/* Omschrijving/Paartype */}
        <Box id="osa-welk-paar">
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('welkPaar')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box flex={1}>
              <RadioGroup value={welkPaar} onChange={setWelkPaar}>
                <Stack
                  direction={{base: 'column', md: 'row'}}
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

        {/* Links/Rechts/Beide selectie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('side')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
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

        {/* Schachthoogte */}
        <Box id="osa-schachthoogte">
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('schachthoogte')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
          >
            {showLinks && (
              <FormControl>
                <FormLabel fontSize="sm">{t('links')}</FormLabel>
                <Input
                  type="number"
                  placeholder="cm"
                  value={schachthoogteLinks}
                  onChange={e => setSchachthoogteLinks(e.target.value)}
                  size="sm"
                />
              </FormControl>
            )}
            {showRechts && (
              <FormControl>
                <FormLabel fontSize="sm">{t('rechts')}</FormLabel>
                <Input
                  type="number"
                  placeholder="cm"
                  value={schachthoogteRechts}
                  onChange={e => setSchachthoogteRechts(e.target.value)}
                  size="sm"
                />
              </FormControl>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Openstand Schacht */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('openstandSchacht')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
          >
            <RadioGroup
              value={openstandSchacht}
              onChange={v => setOpenstandSchacht(v)}
            >
              <Stack
                direction={{base: 'column', sm: 'row'}}
                spacing={{base: 2, sm: 4}}
              >
                {OPENSTAND_OPTIES.map(opt => (
                  <Radio key={opt.value} value={opt.value}>
                    {opt.label.replace('.', ',')} cm
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Omsluiting */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('omsluiting')}
          </Text>
          <Flex
            gap={6}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {showLinks && (
              <Box flex={1}>
                <FormLabel fontSize="sm" mb={3}>
                  {t('links')}
                </FormLabel>
                <Stack spacing={3}>
                  {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                    <Flex key={optie.key} alignItems="center" gap={3}>
                      <Box flex={1}>
                        <Checkbox
                          isChecked={
                            omsluitingLinks[optie.fullKeyLinks] || false
                          }
                          onChange={e => {
                            setOmsluitingLinks({
                              ...omsluitingLinks,
                              [optie.fullKeyLinks]: e.target.checked,
                            });
                            if (
                              e.target.checked &&
                              optie.needsMm &&
                              optie.defaultMm
                            ) {
                              setOmsluitingLinksMm({
                                ...omsluitingLinksMm,
                                [optie.mmKeyLinks]: optie.defaultMm,
                              });
                            } else if (!e.target.checked) {
                              const next = {...omsluitingLinksMm};
                              delete next[optie.mmKeyLinks];
                              setOmsluitingLinksMm(next);
                            }
                          }}
                          size="sm"
                        >
                          {optie.label}
                        </Checkbox>
                      </Box>
                      {optie.needsMm && omsluitingLinks[optie.fullKeyLinks] && (
                        <Input
                          type="number"
                          placeholder="mm"
                          value={omsluitingLinksMm[optie.mmKeyLinks] || ''}
                          onChange={e =>
                            setOmsluitingLinksMm({
                              ...omsluitingLinksMm,
                              [optie.mmKeyLinks]: e.target.value,
                            })
                          }
                          size="sm"
                          width="80px"
                        />
                      )}
                    </Flex>
                  ))}
                </Stack>
              </Box>
            )}
            {showRechts && (
              <Box
                flex={1}
                borderLeft={{base: 'none', md: showLinks ? '1px' : 'none'}}
                borderTop={{base: showLinks ? '1px' : 'none', md: 'none'}}
                borderColor="inherit"
                pl={{base: 0, md: showLinks ? 6 : 0}}
                pt={{base: showLinks ? 4 : 0, md: 0}}
              >
                <FormLabel fontSize="sm" mb={3}>
                  {t('rechts')}
                </FormLabel>
                <Stack spacing={3}>
                  {OMSLUITING_OPTIES.map((optie: OmsluitingOptie) => (
                    <Flex key={optie.key} alignItems="center" gap={3}>
                      <Box flex={1}>
                        <Checkbox
                          isChecked={
                            omsluitingRechts[optie.fullKeyRechts] || false
                          }
                          onChange={e => {
                            setOmsluitingRechts({
                              ...omsluitingRechts,
                              [optie.fullKeyRechts]: e.target.checked,
                            });
                            if (
                              e.target.checked &&
                              optie.needsMm &&
                              optie.defaultMm
                            ) {
                              setOmsluitingRechtsMm({
                                ...omsluitingRechtsMm,
                                [optie.mmKeyRechts]: optie.defaultMm,
                              });
                            } else if (!e.target.checked) {
                              const next = {...omsluitingRechtsMm};
                              delete next[optie.mmKeyRechts];
                              setOmsluitingRechtsMm(next);
                            }
                          }}
                          size="sm"
                        >
                          {optie.label}
                        </Checkbox>
                      </Box>
                      {optie.needsMm &&
                        omsluitingRechts[optie.fullKeyRechts] && (
                          <Input
                            type="number"
                            placeholder="mm"
                            value={omsluitingRechtsMm[optie.mmKeyRechts] || ''}
                            onChange={e =>
                              setOmsluitingRechtsMm({
                                ...omsluitingRechtsMm,
                                [optie.mmKeyRechts]: e.target.value,
                              })
                            }
                            size="sm"
                            width="80px"
                          />
                        )}
                    </Flex>
                  ))}
                </Stack>
              </Box>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Supplementschoring */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('supplementSchoring')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {showLinks && (
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>
                  {t('links')}
                </Text>
                <RadioGroup
                  value={boolToString(supplementschoringLinksEnabled)}
                  onChange={v =>
                    setSupplementschoringLinksEnabled(stringToBool(v))
                  }
                >
                  <Stack direction="row" spacing={4} mb={3}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.value)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                {supplementschoringLinksEnabled && (
                  <Select
                    placeholder="Lateraal / Mediaal / Lateraal of Mediaal"
                    value={supplementschoringLinksType}
                    onChange={e =>
                      setSupplementschoringLinksType(e.target.value)
                    }
                    size="sm"
                  >
                    {SUPPLEMENT_TYPE_OPTIES.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Box>
            )}
            {showRechts && (
              <Box
                flex={1}
                borderLeft={{base: 'none', md: showLinks ? '1px' : 'none'}}
                borderTop={{base: showLinks ? '1px' : 'none', md: 'none'}}
                borderColor="inherit"
                pl={{base: 0, md: showLinks ? 6 : 0}}
                pt={{base: showLinks ? 4 : 0, md: 0}}
              >
                <Text fontSize="sm" fontWeight="semibold" mb={2}>
                  {t('rechts')}
                </Text>
                <RadioGroup
                  value={boolToString(supplementschoringRechtsEnabled)}
                  onChange={v =>
                    setSupplementschoringRechtsEnabled(stringToBool(v))
                  }
                >
                  <Stack direction="row" spacing={4} mb={3}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.value)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                {supplementschoringRechtsEnabled && (
                  <Select
                    placeholder="Lateraal / Mediaal / Lateraal of Mediaal"
                    value={supplementschoringRechtsType}
                    onChange={e =>
                      setSupplementschoringRechtsType(e.target.value)
                    }
                    size="sm"
                  >
                    {SUPPLEMENT_TYPE_OPTIES.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Box>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Zoolverstijving */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('zoolverstijving')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
          >
            <RadioGroup
              value={boolToString(zoolverstijvingEnabled)}
              onChange={v => setZoolverstijvingEnabled(stringToBool(v))}
            >
              <Stack direction="row" spacing={4}>
                {JA_NEE_OPTIES.map(opt => (
                  <Radio key={opt.value} value={opt.value}>
                    {t(opt.value)}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>

            {zoolverstijvingEnabled && (
              <Stack
                direction={{base: 'column', sm: 'row'}}
                spacing={{base: 3, sm: 6}}
              >
                {showLinks && (
                  <Checkbox
                    isChecked={zoolverstijvingLinks}
                    onChange={e => setZoolverstijvingLinks(e.target.checked)}
                  >
                    {t('links')}
                  </Checkbox>
                )}
                {showRechts && (
                  <Checkbox
                    isChecked={zoolverstijvingRechts}
                    onChange={e => setZoolverstijvingRechts(e.target.checked)}
                  >
                    {t('rechts')}
                  </Checkbox>
                )}
              </Stack>
            )}
          </Flex>
        </Box>
        <Divider />

        {/* Sluiting */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('sluiting')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
          >
            <RadioGroup value={sluitingType} onChange={setSluitingType}>
              <Stack direction="row" spacing={6}>
                {SLUITING_OPTIES.map(opt => (
                  <Radio key={opt.value} value={opt.value}>
                    {opt.label}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Inschotpunt */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('inschotpunt')}
          </Text>
          <Flex
            gap={4}
            alignItems="flex-start"
            direction={{base: 'column-reverse', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box w={{base: '100%', md: '50%'}}>
              <FormControl>
                <FormLabel fontSize="sm">{t('inschotpuntCm')}</FormLabel>
                <Input
                  type="number"
                  placeholder={t('inschotpuntPlaceholder')}
                  value={inschotpunt}
                  onChange={e => setInschotpunt(e.target.value)}
                  size="sm"
                  maxW={{base: 'full', md: '200px'}}
                />
              </FormControl>
            </Box>
            <Box
              w={{base: '100%', md: '50%'}}
              height={{base: '250px', md: '300px'}}
              border="1px solid"
              borderColor="inherit"
              borderRadius="md"
              overflow="hidden"
              bg="white"
            >
              <Image
                src="/images/intake-vlos/inschotpunt.png"
                alt="Inschotpunt"
                objectFit="contain"
                w="100%"
                h="100%"
              />
            </Box>
          </Flex>
        </Box>

        <Divider />

        {/* Tongpolster */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('tongpolster')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
          >
            <RadioGroup
              value={boolToString(tongpolsterEnabled)}
              onChange={v => setTongpolsterEnabled(stringToBool(v))}
            >
              <Stack direction={{base: 'column', sm: 'row'}} spacing={6}>
                <Radio value="ja">{t('tongpolsterJa')}</Radio>
                <Radio value="nee">{t('nee')}</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Tong vaststikken */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('tongVaststikken')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
          >
            <RadioGroup
              value={boolToString(tongVaststikkenEnabled)}
              onChange={v => setTongVaststikkenEnabled(stringToBool(v))}
            >
              <Stack direction="row" spacing={6}>
                {JA_NEE_OPTIES.map(opt => (
                  <Radio key={opt.value} value={opt.value}>
                    {t(opt.value)}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Haksoort */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('haksoort')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
          >
            {showLinks && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">Links</FormLabel>
                <Select
                  value={haksoortLinks}
                  onChange={e => setHaksoortLinks(e.target.value)}
                  size="sm"
                >
                  {HAKSOORT_OPTIES.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
            {showRechts && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">Rechts</FormLabel>
                <Select
                  value={haksoortRechts}
                  onChange={e => setHaksoortRechts(e.target.value)}
                  size="sm"
                >
                  {HAKSOORT_OPTIES.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Hakhoogte */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('hakhoogte')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={'center'}
            p={4}
            mt={2}
          >
            {showLinks && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('hakhoogteLinksCm')}</FormLabel>
                <Input
                  type="number"
                  placeholder={t('hakhoogtePlaceholder')}
                  value={hakhoogteLinks}
                  onChange={e => setHakhoogteLinks(e.target.value)}
                  size="sm"
                />
              </FormControl>
            )}
            {showRechts && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('hakhoogteRechtsCm')}</FormLabel>
                <Input
                  type="number"
                  placeholder={t('hakhoogtePlaceholder')}
                  value={hakhoogteRechts}
                  onChange={e => setHakhoogteRechts(e.target.value)}
                  size="sm"
                />
              </FormControl>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Hakschoring */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('hakschoring')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {showLinks && (
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>
                  {t('links')}
                </Text>
                <RadioGroup
                  value={boolToString(hakschoringLinksEnabled)}
                  onChange={v => setHakschoringLinksEnabled(stringToBool(v))}
                >
                  <Stack direction="row" spacing={4} mb={3}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.value)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                {hakschoringLinksEnabled && (
                  <Select
                    placeholder="Mediaal / Lateraal"
                    value={hakschoringLinksType}
                    onChange={e => setHakschoringLinksType(e.target.value)}
                    size="sm"
                  >
                    {HAKSCHORING_TYPE_OPTIES.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Box>
            )}
            {showRechts && (
              <Box
                flex={1}
                borderLeft={{base: 'none', md: showLinks ? '1px' : 'none'}}
                borderTop={{base: showLinks ? '1px' : 'none', md: 'none'}}
                borderColor="inherit"
                pl={{base: 0, md: showLinks ? 6 : 0}}
                pt={{base: showLinks ? 4 : 0, md: 0}}
              >
                <Text fontSize="sm" fontWeight="semibold" mb={2}>
                  {t('rechts')}
                </Text>
                <RadioGroup
                  value={boolToString(hakschoringRechtsEnabled)}
                  onChange={v => setHakschoringRechtsEnabled(stringToBool(v))}
                >
                  <Stack direction="row" spacing={4} mb={3}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.value)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                {hakschoringRechtsEnabled && (
                  <Select
                    placeholder="Mediaal / Lateraal"
                    value={hakschoringRechtsType}
                    onChange={e => setHakschoringRechtsType(e.target.value)}
                    size="sm"
                  >
                    {HAKSCHORING_TYPE_OPTIES.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Box>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Ezelsoor */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('ezelsoor')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {showLinks && (
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>
                  {t('links')}
                </Text>
                <RadioGroup
                  value={boolToString(ezelsoorLinksEnabled)}
                  onChange={v => setEzelsoorLinksEnabled(stringToBool(v))}
                >
                  <Stack direction="row" spacing={4} mb={3}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.value)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                {ezelsoorLinksEnabled && (
                  <Select
                    placeholder="Mediaal / Lateraal"
                    value={ezelsoorLinksType}
                    onChange={e => setEzelsoorLinksType(e.target.value)}
                    size="sm"
                  >
                    {EZELSOOR_TYPE_OPTIES.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Box>
            )}
            {showRechts && (
              <Box
                flex={1}
                borderLeft={{base: 'none', md: showLinks ? '1px' : 'none'}}
                borderTop={{base: showLinks ? '1px' : 'none', md: 'none'}}
                borderColor="inherit"
                pl={{base: 0, md: showLinks ? 6 : 0}}
                pt={{base: showLinks ? 4 : 0, md: 0}}
              >
                <Text fontSize="sm" fontWeight="semibold" mb={2}>
                  {t('rechts')}
                </Text>
                <RadioGroup
                  value={boolToString(ezelsoorRechtsEnabled)}
                  onChange={v => setEzelsoorRechtsEnabled(stringToBool(v))}
                >
                  <Stack direction="row" spacing={4} mb={3}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.value)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                {ezelsoorRechtsEnabled && (
                  <Select
                    placeholder="Mediaal / Lateraal"
                    value={ezelsoorRechtsType}
                    onChange={e => setEzelsoorRechtsType(e.target.value)}
                    size="sm"
                  >
                    {EZELSOOR_TYPE_OPTIES.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Box>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Hakafronding */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('hakafronding')}
          </Text>
          <Flex
            gap={4}
            alignItems="flex-start"
            direction={{base: 'column-reverse', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box w={{base: '100%', md: '50%'}}>
              <Stack spacing={4}>
                {showLinks && (
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>
                      {t('links')}
                    </Text>
                    <RadioGroup
                      value={boolToString(hakafrondingLinksEnabled)}
                      onChange={v =>
                        setHakafrondingLinksEnabled(stringToBool(v))
                      }
                    >
                      <Stack direction="row" spacing={4} mb={3}>
                        {JA_NEE_OPTIES.map(opt => (
                          <Radio key={opt.value} value={opt.value}>
                            {t(opt.value)}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                    {hakafrondingLinksEnabled && (
                      <Flex gap={2} direction={{base: 'column', sm: 'row'}}>
                        <FormControl>
                          <FormLabel fontSize="sm">{t('hoogteMm')}</FormLabel>
                          <Input
                            type="number"
                            value={hakafrondingLinksHoogte}
                            onChange={e =>
                              setHakafrondingLinksHoogte(e.target.value)
                            }
                            size="sm"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="sm">{t('lengteMm')}</FormLabel>
                          <Input
                            type="number"
                            value={hakafrondingLinksLengte}
                            onChange={e =>
                              setHakafrondingLinksLengte(e.target.value)
                            }
                            size="sm"
                          />
                        </FormControl>
                      </Flex>
                    )}
                  </Box>
                )}
                {showRechts && (
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>
                      {t('rechts')}
                    </Text>
                    <RadioGroup
                      value={boolToString(hakafrondingRechtsEnabled)}
                      onChange={v =>
                        setHakafrondingRechtsEnabled(stringToBool(v))
                      }
                    >
                      <Stack direction="row" spacing={4} mb={3}>
                        {JA_NEE_OPTIES.map(opt => (
                          <Radio key={opt.value} value={opt.value}>
                            {t(opt.value)}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                    {hakafrondingRechtsEnabled && (
                      <Flex gap={2} direction={{base: 'column', sm: 'row'}}>
                        <FormControl>
                          <FormLabel fontSize="sm">{t('hoogteMm')}</FormLabel>
                          <Input
                            type="number"
                            value={hakafrondingRechtsHoogte}
                            onChange={e =>
                              setHakafrondingRechtsHoogte(e.target.value)
                            }
                            size="sm"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="sm">{t('lengteMm')}</FormLabel>
                          <Input
                            type="number"
                            value={hakafrondingRechtsLengte}
                            onChange={e =>
                              setHakafrondingRechtsLengte(e.target.value)
                            }
                            size="sm"
                          />
                        </FormControl>
                      </Flex>
                    )}
                  </Box>
                )}
              </Stack>
            </Box>
            <Box
              w={{base: '100%', md: '50%'}}
              height={{base: '250px', md: '300px'}}
              border="1px solid"
              borderColor="inherit"
              borderRadius="md"
              overflow="hidden"
              bg="white"
            >
              <Image
                src="/images/intake-vlos/hakafronding.png"
                alt="Hakafronding"
                objectFit="contain"
                w="100%"
                h="100%"
              />
            </Box>
          </Flex>
        </Box>

        <Divider />

        {/* Loopzool */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('loopzool')}
          </Text>
          <FormControl>
            <Select
              value={loopzoolType}
              onChange={e => setLoopzoolType(e.target.value)}
              size="sm"
            >
              {LOOPZOOL_OPTIES.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormControl>
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

        {!areAllFieldsValid && (
          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold" mb={2}>
                {t('vulVerplichteVeldenIn')}
              </Text>
              <UnorderedList>
                {getMissingFields().map((field, index) => (
                  <ListItem key={index}>{field}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Alert>
        )}

        {/* Submit button */}
        <Flex justifyContent={{base: 'stretch', sm: 'flex-end'}} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{base: 'full', sm: 'auto'}}
            isDisabled={!areAllFieldsValid}
            size="lg"
          >
            {t('opslaanEnDoorgaan')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormIntakeOSAPage;
