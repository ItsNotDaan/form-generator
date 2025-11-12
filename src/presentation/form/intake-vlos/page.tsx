import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
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
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { OMSLUITING_OPTIONS, OmsluitingKey, OmsluitingOption } from '@/presentation/form/constants/omsluiting';
import { useAppDispatch } from '@/domain/store/hooks';
import { setIntakeVLOSData } from '@/domain/store/slices/formData';

export const FormIntakeVLOSPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor Links/Rechts/Beide selectie (default: Beide)
  const [side, setSide] = useState<string>('beide');

  // State voor schachthoogte
  const [schachthoogteLinks, setSchachthoogteLinks] = useState('');
  const [schachthoogteRechts, setSchachthoogteRechts] = useState('');

  // State voor omsluiting (multi-select) - Multivorm standaard geselecteerd
  const [omsluitingLinks, setOmsluitingLinks] = useState<OmsluitingKey[]>(['multivorm']);
  const [omsluitingRechts, setOmsluitingRechts] = useState<OmsluitingKey[]>(['multivorm']);

  // State voor omsluiting mm waardes
  const [omsluitingLinksMm, setOmsluitingLinksMm] = useState<Record<OmsluitingKey, string>>({
    multivorm: '3',
  } as Record<OmsluitingKey, string>);
  const [omsluitingRechtsMm, setOmsluitingRechtsMm] = useState<Record<OmsluitingKey, string>>({
    multivorm: '3',
  } as Record<OmsluitingKey, string>);

  // State voor supplementschoring
  const [supplementschoringLinksEnabled, setSupplementschoringLinksEnabled] = useState<string>('nee');
  const [supplementschoringRechtsEnabled, setSupplementschoringRechtsEnabled] = useState<string>('nee');
  const [supplementschoringLinksType, setSupplementschoringLinksType] = useState(''); // lateraal/mediaal/lateraal of mediaal
  const [supplementschoringRechtsType, setSupplementschoringRechtsType] = useState('');

  // State voor zoolverstijving (gecorrigeerd van zoolverslijving)
  const [zoolverstijvingEnabled, setZoolverstijvingEnabled] = useState<string>('nee');
  const [zoolverstijvingLinks, setZoolverstijvingLinks] = useState(false);
  const [zoolverstijvingRechts, setZoolverstijvingRechts] = useState(false);

  // State voor sluiting
  const [sluitingType, setSluitingType] = useState('haken/ringen'); // standaard haken/ringen

  // State voor inschotpunt
  const [inschotpunt, setInschotpunt] = useState('');

  // State voor openstand schacht
  const [openstandSchacht, setOpenstandSchacht] = useState<string>('1');

  // State voor tongpolster
  const [tongpolsterEnabled, setTongpolsterEnabled] = useState<string>('nee');

  // State voor tong vaststikken
  const [tongVaststikkenEnabled, setTongVaststikkenEnabled] = useState<string>('nee');

  // State voor haksoort
  const [haksoortLinks, setHaksoortLinks] = useState('Sleehak Vlak'); // standaard
  const [haksoortRechts, setHaksoortRechts] = useState('Sleehak Vlak'); // standaard

  // State voor hakhoogte
  const [hakhoogteLinks, setHakhoogteLinks] = useState('2'); // standaard 2cm
  const [hakhoogteRechts, setHakhoogteRechts] = useState('2'); // standaard 2cm

  // State voor hakschoring
  const [hakschoringLinksEnabled, setHakschoringLinksEnabled] = useState<string>('nee');
  const [hakschoringRechtsEnabled, setHakschoringRechtsEnabled] = useState<string>('nee');
  const [hakschoringLinksType, setHakschoringLinksType] = useState(''); // mediaal/lateraal
  const [hakschoringRechtsType, setHakschoringRechtsType] = useState('');

  // State voor hakafronding
  const [hakafrondingLinksEnabled, setHakafrondingLinksEnabled] = useState<string>('ja'); // standaard ja
  const [hakafrondingRechtsEnabled, setHakafrondingRechtsEnabled] = useState<string>('ja'); // standaard ja
  const [hakafrondingLinksHoogte, setHakafrondingLinksHoogte] = useState('10'); // standaard 10mm
  const [hakafrondingLinksLengte, setHakafrondingLinksLengte] = useState('50'); // standaard 50mm
  const [hakafrondingRechtsHoogte, setHakafrondingRechtsHoogte] = useState('10'); // standaard 10mm
  const [hakafrondingRechtsLengte, setHakafrondingRechtsLengte] = useState('50'); // standaard 50mm

  // State voor loopzool
  const [loopzoolType, setLoopzoolType] = useState('Lavero Soft 6mm'); // standaard

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const showLinks = side === 'links' || side === 'beide';
  const showRechts = side === 'rechts' || side === 'beide';

  // Handler om terug te gaan (optioneel: data opslaan in localStorage/sessionStorage)
  const handleSubmit = () => {
    // Dispatch intake VLOS data naar Redux store
    dispatch(setIntakeVLOSData({
      side: side as 'beide' | 'links' | 'rechts',
      schachthoogteLinks,
      schachthoogteRechts,
      omsluitingLinks,
      omsluitingRechts,
      omsluitingLinksMm,
      omsluitingRechtsMm,
      supplementschoringLinksEnabled: supplementschoringLinksEnabled as 'ja' | 'nee',
      supplementschoringRechtsEnabled: supplementschoringRechtsEnabled as 'ja' | 'nee',
      supplementschoringLinksType,
      supplementschoringRechtsType,
      zoolverstijvingEnabled: zoolverstijvingEnabled as 'ja' | 'nee',
      zoolverstijvingLinks,
      zoolverstijvingRechts,
      sluitingType,
      inschotpunt,
      openstandSchacht,
      tongpolsterEnabled: tongpolsterEnabled as 'ja' | 'nee',
      tongVaststikkenEnabled: tongVaststikkenEnabled as 'ja' | 'nee',
      haksoortLinks,
      haksoortRechts,
      hakhoogteLinks,
      hakhoogteRechts,
      hakschoringLinksEnabled: hakschoringLinksEnabled as 'ja' | 'nee',
      hakschoringRechtsEnabled: hakschoringRechtsEnabled as 'ja' | 'nee',
      hakschoringLinksType,
      hakschoringRechtsType,
      hakafrondingLinksEnabled: hakafrondingLinksEnabled as 'ja' | 'nee',
      hakafrondingRechtsEnabled: hakafrondingRechtsEnabled as 'ja' | 'nee',
      hakafrondingLinksHoogte,
      hakafrondingLinksLengte,
      hakafrondingRechtsHoogte,
      hakafrondingRechtsLengte,
      loopzoolType,
      bijzonderheden,
    }));

    // TODO: Navigeer naar volgende stap of overzicht (bijv. PDF generatie pagina)
    console.log('Intake VLOS data opgeslagen in Redux store');
    // router.push('/pdf-preview'); // voor later
  };

  return (
    <BaseLayout
      title={t('intakeVlos')}
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
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>{t('side')}</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
            color="inherit"
          >
            <RadioGroup value={side} onChange={setSide}>
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
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>{t('schachthoogte')}</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
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
                  onChange={(e) => setSchachthoogteLinks(e.target.value)}
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
                  onChange={(e) => setSchachthoogteRechts(e.target.value)}
                  size="sm"
                />
              </FormControl>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Openstand Schacht */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>{t('openstandSchacht')}</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
          >
            <RadioGroup value={openstandSchacht} onChange={setOpenstandSchacht}>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: 2, sm: 4 }}>
                <Radio value="0.5">0,5 cm</Radio>
                <Radio value="0.8">0,8 cm</Radio>
                <Radio value="1">1 cm</Radio>
                <Radio value="1.5">1,5 cm</Radio>
                <Radio value="2">2 cm</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Omsluiting */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>{t('omsluiting')}</Text>
          <Flex
            gap={6}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {showLinks && (
              <Box flex={1}>
                <FormLabel fontSize="sm" mb={3}>{t('links')}</FormLabel>
                <Stack spacing={3}>
                  {OMSLUITING_OPTIONS.map((optie: OmsluitingOption) => (
                    <Flex key={optie.key} alignItems="center" gap={3}>
                      <Box flex={1}>
                        <Checkbox
                          isChecked={omsluitingLinks.includes(optie.key)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setOmsluitingLinks([...omsluitingLinks, optie.key]);
                              if (optie.needsMm && optie.defaultMm) {
                                setOmsluitingLinksMm({ ...omsluitingLinksMm, [optie.key]: optie.defaultMm });
                              }
                            } else {
                              setOmsluitingLinks(omsluitingLinks.filter((o) => o !== optie.key));
                              const next = { ...omsluitingLinksMm };
                              delete (next as any)[optie.key];
                              setOmsluitingLinksMm(next);
                            }
                          }}
                          size="sm"
                        >
                          {optie.label}
                        </Checkbox>
                      </Box>
                      {optie.needsMm && omsluitingLinks.includes(optie.key) && (
                        <Input
                          type="number"
                          placeholder="mm"
                          value={omsluitingLinksMm[optie.key] || ''}
                          onChange={(e) => setOmsluitingLinksMm({
                            ...omsluitingLinksMm,
                            [optie.key]: e.target.value,
                          })}
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
                borderLeft={{ base: 'none', md: showLinks ? '1px' : 'none' }}
                borderTop={{ base: showLinks ? '1px' : 'none', md: 'none' }}
                borderColor="gray.200"
                pl={{ base: 0, md: showLinks ? 6 : 0 }}
                pt={{ base: showLinks ? 4 : 0, md: 0 }}
              >
                <FormLabel fontSize="sm" mb={3}>{t('rechts')}</FormLabel>
                <Stack spacing={3}>
                  {OMSLUITING_OPTIONS.map((optie: OmsluitingOption) => (
                    <Flex key={optie.key} alignItems="center" gap={3}>
                      <Box flex={1}>
                        <Checkbox
                          isChecked={omsluitingRechts.includes(optie.key)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setOmsluitingRechts([...omsluitingRechts, optie.key]);
                              if (optie.needsMm && optie.defaultMm) {
                                setOmsluitingRechtsMm({ ...omsluitingRechtsMm, [optie.key]: optie.defaultMm });
                              }
                            } else {
                              setOmsluitingRechts(omsluitingRechts.filter((o) => o !== optie.key));
                              const next = { ...omsluitingRechtsMm };
                              delete (next as any)[optie.key];
                              setOmsluitingRechtsMm(next);
                            }
                          }}
                          size="sm"
                        >
                          {optie.label}
                        </Checkbox>
                      </Box>
                      {optie.needsMm && omsluitingRechts.includes(optie.key) && (
                        <Input
                          type="number"
                          placeholder="mm"
                          value={omsluitingRechtsMm[optie.key] || ''}
                          onChange={(e) => setOmsluitingRechtsMm({
                            ...omsluitingRechtsMm,
                            [optie.key]: e.target.value,
                          })}
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
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Supplement schoring</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
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
                <RadioGroup value={supplementschoringLinksEnabled} onChange={setSupplementschoringLinksEnabled}>
                  <Stack direction="row" spacing={4} mb={3}>
                    <Radio value="ja">{t('ja')}</Radio>
                    <Radio value="nee">{t('nee')}</Radio>
                  </Stack>
                </RadioGroup>
                {supplementschoringLinksEnabled === 'ja' && (
                  <Select
                    placeholder="Lateraal / Mediaal / Lateraal of Mediaal"
                    value={supplementschoringLinksType}
                    onChange={(e) => setSupplementschoringLinksType(e.target.value)}
                    size="sm"
                  >
                    <option value="Lateraal">Lateraal</option>
                    <option value="Mediaal">Mediaal</option>
                    <option value="Lateraal of Mediaal">Lateraal of Mediaal</option>
                  </Select>
                )}
              </Box>
            )}
            {showRechts && (
              <Box
                flex={1}
                borderLeft={{ base: 'none', md: showLinks ? '1px' : 'none' }}
                borderTop={{ base: showLinks ? '1px' : 'none', md: 'none' }}
                borderColor="gray.200"
                pl={{ base: 0, md: showLinks ? 6 : 0 }}
                pt={{ base: showLinks ? 4 : 0, md: 0 }}
              >
                <Text fontSize="sm" fontWeight="semibold" mb={2}>
                  {t('rechts')}
                </Text>
                <RadioGroup value={supplementschoringRechtsEnabled} onChange={setSupplementschoringRechtsEnabled}>
                  <Stack direction="row" spacing={4} mb={3}>
                    <Radio value="ja">{t('ja')}</Radio>
                    <Radio value="nee">{t('nee')}</Radio>
                  </Stack>
                </RadioGroup>
                {supplementschoringRechtsEnabled === 'ja' && (
                  <Select
                    placeholder="Lateraal / Mediaal / Lateraal of Mediaal"
                    value={supplementschoringRechtsType}
                    onChange={(e) => setSupplementschoringRechtsType(e.target.value)}
                    size="sm"
                  >
                    <option value="Lateraal">Lateraal</option>
                    <option value="Mediaal">Mediaal</option>
                    <option value="Lateraal of Mediaal">Lateraal of Mediaal</option>
                  </Select>
                )}
              </Box>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Zoolverstijving */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Zoolverstijving</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
          >
            <RadioGroup value={zoolverstijvingEnabled} onChange={setZoolverstijvingEnabled}>
              <Stack direction="row" spacing={4}>
                <Radio value="ja">{t('ja')}</Radio>
                <Radio value="nee">{t('nee')}</Radio>
              </Stack>
            </RadioGroup>

            {zoolverstijvingEnabled === 'ja' && (
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: 3, sm: 6 }}>
                {showLinks && (
                  <Checkbox
                    isChecked={zoolverstijvingLinks}
                    onChange={(e) => setZoolverstijvingLinks(e.target.checked)}
                  >
                    {t('links')}
                  </Checkbox>
                )}
                {showRechts && (
                  <Checkbox
                    isChecked={zoolverstijvingRechts}
                    onChange={(e) => setZoolverstijvingRechts(e.target.checked)}
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
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Sluiting</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
          >
            <RadioGroup value={sluitingType} onChange={setSluitingType}>
              <Stack direction="row" spacing={6}>
                <Radio value="haken/ringen">Haken/Ringen</Radio>
                <Radio value="klittenband">Klittenband</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>




        {/* Tongpolster */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Tongpolster</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
          >
            <RadioGroup value={tongpolsterEnabled} onChange={setTongpolsterEnabled}>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={6}>
                <Radio value="ja">{t('ja')} (plastazote 3mm)</Radio>
                <Radio value="nee">{t('nee')}</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />


        {/* Tong vaststikken */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Tong vaststikken</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
          >
            <RadioGroup value={tongVaststikkenEnabled} onChange={setTongVaststikkenEnabled}>
              <Stack direction="row" spacing={6}>
                <Radio value="ja">{t('ja')}</Radio>
                <Radio value="nee">{t('nee')}</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />


        {/* Haksoort */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Haksoort</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
          >
            {showLinks && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">Links</FormLabel>
                <Select
                  value={haksoortLinks}
                  onChange={(e) => setHaksoortLinks(e.target.value)}
                  size="sm"
                >
                  <option value="Sleehak Vlak">Sleehak Vlak</option>
                  <option value="Opbouwhak">Opbouwhak</option>
                  <option value="Leer/Poro">Leer/Poro</option>
                  <option value="Uitholling">Uitholling</option>
                  <option value="Vlak">Vlak</option>
                  <option value="Blokhak">Blokhak</option>
                  <option value="Kernbekleding">Kernbekleding</option>
                </Select>
              </FormControl>
            )}
            {showRechts && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">Rechts</FormLabel>
                <Select
                  value={haksoortRechts}
                  onChange={(e) => setHaksoortRechts(e.target.value)}
                  size="sm"
                >
                  <option value="Sleehak Vlak">Sleehak Vlak</option>
                  <option value="Opbouwhak">Opbouwhak</option>
                  <option value="Leer/Poro">Leer/Poro</option>
                  <option value="Uitholling">Uitholling</option>
                  <option value="Vlak">Vlak</option>
                  <option value="Blokhak">Blokhak</option>
                  <option value="Kernbekleding">Kernbekleding</option>
                </Select>
              </FormControl>
            )}
          </Flex>
        </Box>

        <Divider />


        {/* Hakhoogte */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Hakhoogte</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align={"center"}
            p={4}
            mt={2}
          >
            {showLinks && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">Links (cm)</FormLabel>
                <Input
                  type="number"
                  placeholder="2"
                  value={hakhoogteLinks}
                  onChange={(e) => setHakhoogteLinks(e.target.value)}
                  size="sm"
                />
              </FormControl>
            )}
            {showRechts && (
              <FormControl flex={1}>
                <FormLabel fontSize="sm">Rechts (cm)</FormLabel>
                <Input
                  type="number"
                  placeholder="2"
                  value={hakhoogteRechts}
                  onChange={(e) => setHakhoogteRechts(e.target.value)}
                  size="sm"
                />
              </FormControl>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Hakschoring */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Hakschoring</Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {showLinks && (
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>{t('links')}</Text>
                <RadioGroup value={hakschoringLinksEnabled} onChange={setHakschoringLinksEnabled}>
                  <Stack direction="row" spacing={4} mb={3}>
                    <Radio value="ja">{t('ja')}</Radio>
                    <Radio value="nee">{t('nee')}</Radio>
                  </Stack>
                </RadioGroup>
                {hakschoringLinksEnabled === 'ja' && (
                  <Select
                    placeholder="Mediaal / Lateraal"
                    value={hakschoringLinksType}
                    onChange={(e) => setHakschoringLinksType(e.target.value)}
                    size="sm"
                  >
                    <option value="Mediaal">Mediaal</option>
                    <option value="Lateraal">Lateraal</option>
                  </Select>
                )}
              </Box>
            )}
            {showRechts && (
              <Box
                flex={1}
                borderLeft={{ base: 'none', md: showLinks ? '1px' : 'none' }}
                borderTop={{ base: showLinks ? '1px' : 'none', md: 'none' }}
                borderColor="gray.200"
                pl={{ base: 0, md: showLinks ? 6 : 0 }}
                pt={{ base: showLinks ? 4 : 0, md: 0 }}
              >
                <Text fontSize="sm" fontWeight="semibold" mb={2}>{t('rechts')}</Text>
                <RadioGroup value={hakschoringRechtsEnabled} onChange={setHakschoringRechtsEnabled}>
                  <Stack direction="row" spacing={4} mb={3}>
                    <Radio value="ja">{t('ja')}</Radio>
                    <Radio value="nee">{t('nee')}</Radio>
                  </Stack>
                </RadioGroup>
                {hakschoringRechtsEnabled === 'ja' && (
                  <Select
                    placeholder="Mediaal / Lateraal"
                    value={hakschoringRechtsType}
                    onChange={(e) => setHakschoringRechtsType(e.target.value)}
                    size="sm"
                  >
                    <option value="Mediaal">Mediaal</option>
                    <option value="Lateraal">Lateraal</option>
                  </Select>
                )}
              </Box>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Hakafronding */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Hakafronding</Text>
          <Flex
            gap={4}
            alignItems="flex-start"
            direction={{ base: 'column-reverse', md: 'row' }}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box w={{ base: '100%', md: '50%' }}>
              <Stack spacing={4}>
                {showLinks && (
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>{t('links')}</Text>
                    <RadioGroup value={hakafrondingLinksEnabled} onChange={setHakafrondingLinksEnabled}>
                      <Stack direction="row" spacing={4} mb={3}>
                        <Radio value="ja">{t('ja')}</Radio>
                        <Radio value="nee">{t('nee')}</Radio>
                      </Stack>
                    </RadioGroup>
                    {hakafrondingLinksEnabled === 'ja' && (
                      <Flex gap={2} direction={{ base: 'column', sm: 'row' }}>
                        <FormControl>
                          <FormLabel fontSize="sm">Hoogte (mm)</FormLabel>
                          <Input
                            type="number"
                            value={hakafrondingLinksHoogte}
                            onChange={(e) => setHakafrondingLinksHoogte(e.target.value)}
                            size="sm"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="sm">Lengte (mm)</FormLabel>
                          <Input
                            type="number"
                            value={hakafrondingLinksLengte}
                            onChange={(e) => setHakafrondingLinksLengte(e.target.value)}
                            size="sm"
                          />
                        </FormControl>
                      </Flex>
                    )}
                  </Box>
                )}
                {showRechts && (
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>{t('rechts')}</Text>
                    <RadioGroup value={hakafrondingRechtsEnabled} onChange={setHakafrondingRechtsEnabled}>
                      <Stack direction="row" spacing={4} mb={3}>
                        <Radio value="ja">{t('ja')}</Radio>
                        <Radio value="nee">{t('nee')}</Radio>
                      </Stack>
                    </RadioGroup>
                    {hakafrondingRechtsEnabled === 'ja' && (
                      <Flex gap={2} direction={{ base: 'column', sm: 'row' }}>
                        <FormControl>
                          <FormLabel fontSize="sm">Hoogte (mm)</FormLabel>
                          <Input
                            type="number"
                            value={hakafrondingRechtsHoogte}
                            onChange={(e) => setHakafrondingRechtsHoogte(e.target.value)}
                            size="sm"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontSize="sm">Lengte (mm)</FormLabel>
                          <Input
                            type="number"
                            value={hakafrondingRechtsLengte}
                            onChange={(e) => setHakafrondingRechtsLengte(e.target.value)}
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
              w={{ base: '100%', md: '50%' }}
              height={{ base: '250px', md: '300px' }}
              border="1px solid"
              borderColor="gray.300"
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
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Loopzool</Text>
          <FormControl>
            <Select
              value={loopzoolType}
              onChange={(e) => setLoopzoolType(e.target.value)}
              size="sm"
            >
              <option value="Lavero Soft 6mm">Lavero Soft 6mm</option>
              <option value="Star-o-last 6mm">Star-o-last 6mm</option>
              <option value="Astrostar 6mm">Astrostar 6mm</option>
              <option value="Autoband profiel 6mm">Autoband profiel 6mm</option>
            </Select>
          </FormControl>
        </Box>

        <Divider />

        {/* Bijzonderheden */}
        <Box>
          <Text fontWeight="bold" mb={4} fontSize={{ base: 'md', md: 'lg' }}>{t('bijzonderheden')}</Text>
          <Textarea
            placeholder={t('bijzonderhedenPlaceholder')}
            value={bijzonderheden}
            onChange={(e) => setBijzonderheden(e.target.value)}
            minH={{ base: '100px', md: '120px' }}
          />
        </Box>

        {/* Submit button */}
        <Flex justifyContent={{ base: 'stretch', sm: 'flex-end' }} mt={4}>
          <Button variant="primary" onClick={handleSubmit} w={{ base: 'full', sm: 'auto' }}>
            Opslaan en doorgaan
          </Button>
        </Flex>

      </Flex>
    </BaseLayout>
  );
};

export default FormIntakeVLOSPage;
