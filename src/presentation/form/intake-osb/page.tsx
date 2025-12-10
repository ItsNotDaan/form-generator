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
  Radio,
  RadioGroup,
  Alert,
  AlertIcon,
  UnorderedList,
  ListItem,
  Select,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/domain/store/hooks';
import { setIntakeOSBData } from '@/domain/store/slices/formData';
import {
  STEUNZOLEN_PRIJS_OPTIES,
  STEUNZOOL_TYPE_OPTIES,
  CORRECTIE_MIDDENVOET_OPTIES,
  CORRECTIE_VOORVOET_OPTIES,
  PELLOTE_OPTIES,
  BASISCODE_OPTIES,
  JA_NEE_OPTIES,
  LEVERANCIER_OPTIES,
  LOOPFUNCTIE_INDICATIE_OPTIES,
} from '@/presentation/form/constants/formConstants';
import { DatePickerField } from '@/presentation/base/input/datePickerField';

const FormIntakeOSBPage = () => {
  const { t } = useTranslation('form');
  const router = useRouter();
  const dispatch = useAppDispatch();

  // State
  const [welkPaar, setWelkPaar] = useState('Eerste paar');

  // Doel states
  const [doelPasvorm, setDoelPasvorm] = useState(false);
  const [doelLoopafstandVergroten, setDoelLoopafstandVergroten] =
    useState(false);
  const [doelStabiliteit, setDoelStabiliteit] = useState(false);
  const [doelOndersteuningGewelf, setDoelOndersteuningGewelf] = useState(false);

  // Loopfunctie states
  const [loopfunctieIndicatie, setLoopfunctieIndicatie] = useState('');
  const [loopfunctieAndersText, setLoopfunctieAndersText] = useState('');

  // Bestel Informatie states
  const [leverancierNaam, setLeverancierNaam] = useState('');
  const [bestelDatum, setBestelDatum] = useState<Date | undefined>(undefined);
  const [artikelCode, setArtikelCode] = useState('');
  const [lengteMaat, setLengteMaat] = useState('');
  const [wijdteMaat, setWijdteMaat] = useState('');
  const [schoenKleur, setSchoenKleur] = useState('');
  const [schoenSluiting, setSchoenSluiting] = useState('');

  const [basiscode, setBasiscode] = useState('42');
  const [aanpassingen, setAanpassingen] = useState<any>({});
  const [steunzolenEnabled, setSteunzolenEnabled] = useState(false);
  const [schoenmaat, setSchoenmaat] = useState('');
  const [steunzoolPrijs, setSteunzoolPrijs] = useState(0);
  const [steunzoolPrijsNaam, setSteunzoolPrijsNaam] = useState('');
  const [steunzoolTypeGeneral, setSteunzoolTypeGeneral] = useState('');
  const [steunzoolAndersText, setSteunzoolAndersText] = useState('');
  const [steunzoolCorrectieMiddenvoet, setSteunzoolCorrectieMiddenvoet] =
    useState('');
  const [steunzoolCorrectieVoorvoet, setSteunzoolCorrectieVoorvoet] =
    useState('');
  const [steunzoolVvPellote, setSteunzoolVvPellote] = useState('');
  const [steunzoolHakVerhogingLinks, setSteunzoolHakVerhogingLinks] =
    useState('');
  const [steunzoolHakVerhogingRechts, setSteunzoolHakVerhogingRechts] =
    useState('');
  const [bijzonderheden, setBijzonderheden] = useState('');

  // Helper functions for boolean to string conversion
  const boolToString = (b: boolean) => (b ? 'ja' : 'nee');
  const stringToBool = (s: string) => s === 'ja';

  // Check if Talonette is selected
  const talonetteOption = STEUNZOLEN_PRIJS_OPTIES.find(
    opt => opt.label === 'prijsTalonette'
  );
  const isSteunzolenTalonette =
    talonetteOption && steunzoolPrijs === talonetteOption.value;

  // Validation helpers
  const getMissingFields = (): Array<{ fieldName: string; fieldId: string }> => {
    const missing: Array<{ fieldName: string; fieldId: string }> = [];

    // Loopfunctie Anders validation
    if (loopfunctieIndicatie === 'Anders' && !loopfunctieAndersText.trim()) {
      missing.push({
        fieldName: t('otherText'),
        fieldId: 'field-loopfunctie-anders-osb',
      });
    }

    return missing;
  };
  const areAllFieldsValid = getMissingFields().length === 0;

  // Submit handler
  const handleSubmit = () => {
    if (!areAllFieldsValid) {
      return;
    }
    dispatch(
      setIntakeOSBData({
        welkPaar,
        doel: {
          doelPasvorm,
          doelLoopafstandVergroten,
          doelStabiliteit,
          doelOndersteuningGewelf,
        },
        loopfunctieIndicatie,
        loopfunctieAndersText,
        leverancierNaam,
        bestelDatum: bestelDatum?.toISOString(),
        productSpecificaties: {
          artCode: artikelCode,
          lengteMaat,
          wijdte: wijdteMaat,
          kleur: schoenKleur,
          sluiting: schoenSluiting,
        },
        basiscode,
        aanpassingen,
        steunzoolTypeGeneral,
        steunzoolAndersText,
        steunzoolCorrectieMiddenvoet,
        steunzoolCorrectieVoorvoet,
        steunzoolVvPellote,
        steunzoolHakVerhogingLinks,
        steunzoolHakVerhogingRechts,
        steunzoolPrijs,
        steunzoolPrijsNaam,
        bijzonderheden,
      })
    );
    router.push('/form-results');
  };

  // Render
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
        {/* Basiscode */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('basicCode')}
          </Text>
          <RadioGroup value={basiscode} onChange={setBasiscode}>
            <Stack direction="row" spacing={4}>
              {BASISCODE_OPTIES.map(option => (
                <Radio key={option.value} value={option.value}>
                  {t(`basicCode${option.value}`)}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>

        <Divider />

        {/* Doel Section */}
        <Box id="section-doel">
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('goal')}
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl id="field-doel-pasvorm">
                <FormLabel fontSize="sm" fontWeight="medium" mb={2}>
                  {t('goalFit')}
                </FormLabel>
                <RadioGroup
                  value={boolToString(doelPasvorm)}
                  onChange={v => setDoelPasvorm(stringToBool(v))}
                >
                  <Stack direction="row" spacing={4}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.label)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl id="field-doel-loopafstand">
                <FormLabel fontSize="sm" fontWeight="medium" mb={2}>
                  {t('goalIncreaseWalkingDistance')}
                </FormLabel>
                <RadioGroup
                  value={boolToString(doelLoopafstandVergroten)}
                  onChange={v => setDoelLoopafstandVergroten(stringToBool(v))}
                >
                  <Stack direction="row" spacing={4}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.label)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl id="field-doel-stabiliteit">
                <FormLabel fontSize="sm" fontWeight="medium" mb={2}>
                  {t('goalStability')}
                </FormLabel>
                <RadioGroup
                  value={boolToString(doelStabiliteit)}
                  onChange={v => setDoelStabiliteit(stringToBool(v))}
                >
                  <Stack direction="row" spacing={4}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.label)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl id="field-doel-gewelf">
                <FormLabel fontSize="sm" fontWeight="medium" mb={2}>
                  {t('goalArchSupport')}
                </FormLabel>
                <RadioGroup
                  value={boolToString(doelOndersteuningGewelf)}
                  onChange={v => setDoelOndersteuningGewelf(stringToBool(v))}
                >
                  <Stack direction="row" spacing={4}>
                    {JA_NEE_OPTIES.map(opt => (
                      <Radio key={opt.value} value={opt.value}>
                        {t(opt.label)}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>
            </SimpleGrid>
          </Box>
        </Box>

        <Divider />

        {/* Loopfunctie Section */}
        <Box id="section-loopfunctie">
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('walkingFunction')}
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <FormControl id="field-loopfunctie-indicatie">
              <RadioGroup
                value={loopfunctieIndicatie}
                onChange={setLoopfunctieIndicatie}
              >
                <Stack direction="row" spacing={6}>
                  {LOOPFUNCTIE_INDICATIE_OPTIES.map(option => (
                    <Radio key={option.value} value={option.value}>
                      {t(option.label)}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>

        <Divider />

        {/* Bestel Informatie Section */}
        <Box id="section-bestel-informatie">
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('orderInformation')}
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
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl id="field-leverancier-osb">
                <FormLabel fontSize="sm" fontWeight="medium">
                  {t('supplier')}
                </FormLabel>
                <Select
                  placeholder={t('supplier')}
                  value={leverancierNaam}
                  onChange={e => setLeverancierNaam(e.target.value)}
                  size="sm"
                >
                  {LEVERANCIER_OPTIES.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="field-besteldatum-osb">
                <FormLabel fontSize="sm" fontWeight="medium">
                  {t('orderDate')}
                </FormLabel>
                <DatePickerField
                  date={bestelDatum}
                  onDateChanged={setBestelDatum}
                  placeholder={t('orderDate')}
                  isSmallVariant
                />
              </FormControl>
            </SimpleGrid>

            <Divider />

            <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={4}>
              <FormControl id="field-artikelcode-osb">
                <FormLabel fontSize="sm" fontWeight="medium">
                  {t('artCode')}
                </FormLabel>
                <Input
                  placeholder={t('artCode')}
                  value={artikelCode}
                  onChange={e => setArtikelCode(e.target.value)}
                  size="sm"
                />
              </FormControl>

              <FormControl id="field-lengtemaat-osb">
                <FormLabel fontSize="sm" fontWeight="medium">
                  {t('lengthSize')}
                </FormLabel>
                <Input
                  placeholder={t('lengthSize')}
                  value={lengteMaat}
                  onChange={e => setLengteMaat(e.target.value)}
                  size="sm"
                />
              </FormControl>

              <FormControl id="field-wijdtemaat-osb">
                <FormLabel fontSize="sm" fontWeight="medium">
                  {t('widthSize')}
                </FormLabel>
                <Input
                  placeholder={t('widthSize')}
                  value={wijdteMaat}
                  onChange={e => setWijdteMaat(e.target.value)}
                  size="sm"
                />
              </FormControl>

              <FormControl id="field-schoenkleur-osb">
                <FormLabel fontSize="sm" fontWeight="medium">
                  {t('color')}
                </FormLabel>
                <Input
                  placeholder={t('color')}
                  value={schoenKleur}
                  onChange={e => setSchoenKleur(e.target.value)}
                  size="sm"
                />
              </FormControl>

              <FormControl id="field-schoensluiting-osb">
                <FormLabel fontSize="sm" fontWeight="medium">
                  {t('shoeClosure')}
                </FormLabel>
                <Input
                  placeholder={t('shoeClosure')}
                  value={schoenSluiting}
                  onChange={e => setSchoenSluiting(e.target.value)}
                  size="sm"
                />
              </FormControl>
            </SimpleGrid>
          </Flex>
        </Box>

        <Divider />

        {/* Aanpassingen Section */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Aanpassingen
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {/* Hallux Valgus */}
              <Box>
                <Text fontWeight="semibold" mb={3} fontSize="sm">
                  Hallux Valgus
                </Text>
                <Stack spacing={3}>
                  <Flex align="center" gap={3}>
                    <Checkbox
                      isChecked={aanpassingen.halluxValgusLinks}
                      onChange={e =>
                        setAanpassingen((a: any) => ({
                          ...a,
                          halluxValgusLinks: e.target.checked,
                        }))
                      }
                    >
                      <Text fontSize="sm">Links</Text>
                    </Checkbox>
                    {aanpassingen.halluxValgusLinks && (
                      <Select
                        value={aanpassingen.halluxValgusLinksMm || ''}
                        onChange={e =>
                          setAanpassingen((a: any) => ({
                            ...a,
                            halluxValgusLinksMm: e.target.value,
                          }))
                        }
                        size="sm"
                        maxW="100px"
                        placeholder="mm"
                      >
                        <option value="3">3mm</option>
                        <option value="8">8mm</option>
                      </Select>
                    )}
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Checkbox
                      isChecked={aanpassingen.halluxValgusRechts}
                      onChange={e =>
                        setAanpassingen((a: any) => ({
                          ...a,
                          halluxValgusRechts: e.target.checked,
                        }))
                      }
                    >
                      <Text fontSize="sm">Rechts</Text>
                    </Checkbox>
                    {aanpassingen.halluxValgusRechts && (
                      <Select
                        value={aanpassingen.halluxValgusRechtsMm || ''}
                        onChange={e =>
                          setAanpassingen((a: any) => ({
                            ...a,
                            halluxValgusRechtsMm: e.target.value,
                          }))
                        }
                        size="sm"
                        maxW="100px"
                        placeholder="mm"
                      >
                        <option value="3">3mm</option>
                        <option value="8">8mm</option>
                      </Select>
                    )}
                  </Flex>
                </Stack>
              </Box>

              {/* Verdieping voorvoet */}
              <Box>
                <Text fontWeight="semibold" mb={3} fontSize="sm">
                  Verdieping voorvoet
                </Text>
                <Stack spacing={3}>
                  <Flex align="center" gap={3}>
                    <Checkbox
                      isChecked={aanpassingen.verdiepingVoorvoetLinks}
                      onChange={e =>
                        setAanpassingen((a: any) => ({
                          ...a,
                          verdiepingVoorvoetLinks: e.target.checked,
                        }))
                      }
                    >
                      <Text fontSize="sm">Links</Text>
                    </Checkbox>
                    {aanpassingen.verdiepingVoorvoetLinks && (
                      <Select
                        value={aanpassingen.verdiepingVoorvoetLinksMm || ''}
                        onChange={e =>
                          setAanpassingen((a: any) => ({
                            ...a,
                            verdiepingVoorvoetLinksMm: e.target.value,
                          }))
                        }
                        size="sm"
                        maxW="100px"
                        placeholder="mm"
                      >
                        <option value="3">3mm</option>
                        <option value="8">8mm</option>
                      </Select>
                    )}
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Checkbox
                      isChecked={aanpassingen.verdiepingVoorvoetRechts}
                      onChange={e =>
                        setAanpassingen((a: any) => ({
                          ...a,
                          verdiepingVoorvoetRechts: e.target.checked,
                        }))
                      }
                    >
                      <Text fontSize="sm">Rechts</Text>
                    </Checkbox>
                    {aanpassingen.verdiepingVoorvoetRechts && (
                      <Select
                        value={aanpassingen.verdiepingVoorvoetRechtsMm || ''}
                        onChange={e =>
                          setAanpassingen((a: any) => ({
                            ...a,
                            verdiepingVoorvoetRechtsMm: e.target.value,
                          }))
                        }
                        size="sm"
                        maxW="100px"
                        placeholder="mm"
                      >
                        <option value="3">3mm</option>
                        <option value="8">8mm</option>
                      </Select>
                    )}
                  </Flex>
                </Stack>
              </Box>

              {/* Supplement Individueel */}
              <Box>
                <Text fontWeight="semibold" mb={3} fontSize="sm">
                  Supplement Individueel
                </Text>
                <Stack direction="row" spacing={6}>
                  <Checkbox
                    isChecked={aanpassingen.supplementIndividueelLinks}
                    onChange={e =>
                      setAanpassingen((a: any) => ({
                        ...a,
                        supplementIndividueelLinks: e.target.checked,
                      }))
                    }
                  >
                    <Text fontSize="sm">Links</Text>
                  </Checkbox>
                  <Checkbox
                    isChecked={aanpassingen.supplementIndividueelRechts}
                    onChange={e =>
                      setAanpassingen((a: any) => ({
                        ...a,
                        supplementIndividueelRechts: e.target.checked,
                      }))
                    }
                  >
                    <Text fontSize="sm">Rechts</Text>
                  </Checkbox>
                </Stack>
              </Box>

              {/* Afwikkelrol Eenvoudig */}
              <Box>
                <Text fontWeight="semibold" mb={3} fontSize="sm">
                  Afwikkelrol Eenvoudig
                </Text>
                <Stack direction="row" spacing={6}>
                  <Checkbox
                    isChecked={aanpassingen.afwikkelrolEenvoudigLinks}
                    onChange={e =>
                      setAanpassingen((a: any) => ({
                        ...a,
                        afwikkelrolEenvoudigLinks: e.target.checked,
                      }))
                    }
                  >
                    <Text fontSize="sm">Links</Text>
                  </Checkbox>
                  <Checkbox
                    isChecked={aanpassingen.afwikkelrolEenvoudigRechts}
                    onChange={e =>
                      setAanpassingen((a: any) => ({
                        ...a,
                        afwikkelrolEenvoudigRechts: e.target.checked,
                      }))
                    }
                  >
                    <Text fontSize="sm">Rechts</Text>
                  </Checkbox>
                </Stack>
              </Box>

              {/* Afwikkelrol gecompliceerd */}
              <Box>
                <Text fontWeight="semibold" mb={3} fontSize="sm">
                  Afwikkelrol gecompliceerd
                </Text>
                <Stack direction="row" spacing={6}>
                  <Checkbox
                    isChecked={aanpassingen.afwikkelrolGecompliceerdLinks}
                    onChange={e =>
                      setAanpassingen((a: any) => ({
                        ...a,
                        afwikkelrolGecompliceerdLinks: e.target.checked,
                      }))
                    }
                  >
                    <Text fontSize="sm">Links</Text>
                  </Checkbox>
                  <Checkbox
                    isChecked={aanpassingen.afwikkelrolGecompliceerdRechts}
                    onChange={e =>
                      setAanpassingen((a: any) => ({
                        ...a,
                        afwikkelrolGecompliceerdRechts: e.target.checked,
                      }))
                    }
                  >
                    <Text fontSize="sm">Rechts</Text>
                  </Checkbox>
                </Stack>
              </Box>

              {/* Zoolverstijving */}
              <Box>
                <Text fontWeight="semibold" mb={3} fontSize="sm">
                  {t('soleStiffening')}
                </Text>
                <Stack direction="row" spacing={6}>
                  <Checkbox
                    isChecked={aanpassingen.zoolverstijvingLinks}
                    onChange={e =>
                      setAanpassingen((a: any) => ({
                        ...a,
                        zoolverstijvingLinks: e.target.checked,
                      }))
                    }
                  >
                    <Text fontSize="sm">Links</Text>
                  </Checkbox>
                  <Checkbox
                    isChecked={aanpassingen.zoolverstijvingRechts}
                    onChange={e =>
                      setAanpassingen((a: any) => ({
                        ...a,
                        zoolverstijvingRechts: e.target.checked,
                      }))
                    }
                  >
                    <Text fontSize="sm">Rechts</Text>
                  </Checkbox>
                </Stack>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>

        <Divider />

        {/* Steunzolen Section */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('insoles')}
          </Text>
          <RadioGroup
            value={steunzolenEnabled ? 'ja' : 'nee'}
            onChange={val => setSteunzolenEnabled(val === 'ja')}
            mb={4}
          >
            <Stack direction="row" spacing={4}>
              <Radio value="ja">{t('yes')}</Radio>
              <Radio value="nee">{t('no')}</Radio>
            </Stack>
          </RadioGroup>

          {steunzolenEnabled && (
            <Flex
              gap={{ base: 2, md: 3 }}
              direction="column"
              border="1px solid"
              borderColor="inherit"
              borderRadius="md"
              p={4}
              mt={2}
            >
              <FormControl id="field-schoenmaat-osb">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  {t('shoeSize')} *
                </Text>
                <Input
                  placeholder={t('shoeSizePlaceholder')}
                  value={schoenmaat}
                  onChange={e => setSchoenmaat(e.target.value)}
                  size="sm"
                />
              </FormControl>

              <Divider />

              <FormControl id="field-prijs-osb">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  {t('insolePrice')} *
                </Text>
                <RadioGroup
                  value={steunzoolPrijs.toString()}
                  onChange={val => {
                    setSteunzoolPrijs(Number(val));
                    const selectedOption = STEUNZOLEN_PRIJS_OPTIES.find(
                      opt => opt.value === Number(val)
                    );
                    if (selectedOption) {
                      setSteunzoolPrijsNaam(t(selectedOption.label));
                    }
                  }}
                >
                  <Stack spacing={2}>
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

              {!isSteunzolenTalonette && (
                <>
                  <Divider />

                  <FormControl id="field-steunzooltype-osb">
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
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
                        id="field-steunzoolanders-osb"
                        placeholder={t('insoleOtherTextPlaceholder')}
                        value={steunzoolAndersText}
                        onChange={e => setSteunzoolAndersText(e.target.value)}
                        size="sm"
                        mt={3}
                        maxW="300px"
                      />
                    )}
                  </FormControl>

                  <Divider />

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      {t('midfootCorrection')}
                    </Text>
                    <Flex gap={{ base: 2, md: 3 }} flexWrap="wrap">
                      {CORRECTIE_MIDDENVOET_OPTIES.map(option => (
                        <Checkbox
                          key={option.value}
                          isChecked={
                            steunzoolCorrectieMiddenvoet === option.value
                          }
                          onChange={() =>
                            setSteunzoolCorrectieMiddenvoet(
                              steunzoolCorrectieMiddenvoet === option.value
                                ? ''
                                : option.value
                            )
                          }
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
                      {t('forefootCorrection')}
                    </Text>
                    <Flex gap={{ base: 2, md: 3 }} flexWrap="wrap">
                      {CORRECTIE_VOORVOET_OPTIES.map(option => (
                        <Checkbox
                          key={option.value}
                          isChecked={
                            steunzoolCorrectieVoorvoet === option.value
                          }
                          onChange={() =>
                            setSteunzoolCorrectieVoorvoet(
                              steunzoolCorrectieVoorvoet === option.value
                                ? ''
                                : option.value
                            )
                          }
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
                      {t('forefootPad')}
                    </Text>
                    <Flex gap={{ base: 2, md: 3 }} flexWrap="wrap">
                      {PELLOTE_OPTIES.map(option => (
                        <Checkbox
                          key={option.value}
                          isChecked={steunzoolVvPellote === option.value}
                          onChange={() =>
                            setSteunzoolVvPellote(
                              steunzoolVvPellote === option.value
                                ? ''
                                : option.value
                            )
                          }
                          size="sm"
                        >
                          {option.label}
                        </Checkbox>
                      ))}
                    </Flex>
                  </Box>
                </>
              )}

              <Divider />

              <Box id="field-hakverhoging-osb">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
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
            </Flex>
          )}
        </Box>

        <Divider />

        {/* Bijzonderheden */}
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
            {t('saveAndContinue')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormIntakeOSBPage;
