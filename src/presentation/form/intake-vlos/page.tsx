import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Text,
  Box,
  Divider,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

export const FormIntakeVLOSPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');

  // State voor Links/Rechts/Beide selectie (default: Beide)
  const [side, setSide] = useState<string>('beide');

  // State voor schachthoogte
  const [schachthoogteLinks, setSchachthoogteLinks] = useState('');
  const [schachthoogteRechts, setSchachthoogteRechts] = useState('');

  // State voor omsluiting (multi-select) - Multivorm standaard geselecteerd
  const [omsluitingLinks, setOmsluitingLinks] = useState<string[]>(['Multivorm omsluiting']);
  const [omsluitingRechts, setOmsluitingRechts] = useState<string[]>(['Multivorm omsluiting']);

  // State voor omsluiting mm waardes
  const [omsluitingLinksMm, setOmsluitingLinksMm] = useState<Record<string, string>>({
    'Multivorm omsluiting': '3',
  });
  const [omsluitingRechtsMm, setOmsluitingRechtsMm] = useState<Record<string, string>>({
    'Multivorm omsluiting': '3',
  });

  // State voor schoren
  const [schorenEnabled, setSchorenEnabled] = useState<string>('nee');
  const [schorenLinksType, setSchorenLinksType] = useState('');
  const [schorenLinksMm, setSchorenLinksMm] = useState('');
  const [schorenRechtsType, setSchorenRechtsType] = useState('');
  const [schorenRechtsMm, setSchorenRechtsMm] = useState('');

  // Omsluiting opties
  const omsluitingOpties = [
    { label: 'Hoge omsluiting', needsMm: true },
    { label: 'Lavero omsluiting', needsMm: true, defaultMm: '4' },
    { label: 'Multivorm omsluiting', needsMm: true, defaultMm: '3' },
    { label: 'Plastazote', needsMm: true, defaultMm: '3' },
    { label: 'Orca omsluiting', needsMm: false },
  ];

  const showLinks = side === 'links' || side === 'beide';
  const showRechts = side === 'rechts' || side === 'beide';

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
        p={6}
        borderRadius="md"
        gap={6}
      >
        {/* Links/Rechts/Beide selectie */}
        <Box>
          <Text fontWeight="bold" mb={3}>{t('side')}</Text>
          <RadioGroup value={side} onChange={setSide}>
            <Stack direction="row" spacing={6}>
              <Radio value="beide">{t('beide')}</Radio>
              <Radio value="links">{t('links')}</Radio>
              <Radio value="rechts">{t('rechts')}</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Divider />

        {/* Schachthoogte */}
        <Box>
          <Text fontWeight="bold" mb={3}>{t('schachthoogte')}</Text>
          <Flex gap={4}>
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

        {/* Omsluiting */}
        <Box>
          <Text fontWeight="bold" mb={3}>{t('omsluiting')}</Text>
          <Flex gap={6} direction={{ base: 'column', md: 'row' }}>
            {showLinks && (
              <Box flex={1}>
                <FormLabel fontSize="sm" mb={3}>{t('links')}</FormLabel>
                <Stack spacing={3}>
                  {omsluitingOpties.map((optie) => (
                    <Flex key={optie.label} alignItems="center" gap={3}>

                      <Box flex={1}>
                        <Checkbox
                          isChecked={omsluitingLinks.includes(optie.label)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setOmsluitingLinks([...omsluitingLinks, optie.label]);
                              // Set standaard waarde als het mm nodig heeft
                              if (optie.needsMm && optie.defaultMm) {
                                setOmsluitingLinksMm({ ...omsluitingLinksMm, [optie.label]: optie.defaultMm });
                              }
                            } else {
                              setOmsluitingLinks(omsluitingLinks.filter(o => o !== optie.label));
                              // Verwijder mm waarde
                              const newMm = { ...omsluitingLinksMm };
                              delete newMm[optie.label];
                              setOmsluitingLinksMm(newMm);
                            }
                          }}
                          size="sm"
                        >
                          {optie.label}
                        </Checkbox>
                      </Box>

                      {optie.needsMm && omsluitingLinks.includes(optie.label) && (
                        <InputGroup size="sm" width="80px">
                          <Input
                            type="number"
                            value={omsluitingLinksMm[optie.label] || ''}
                            onChange={(e) => setOmsluitingLinksMm({
                              ...omsluitingLinksMm,
                              [optie.label]: e.target.value
                            })}
                          />
                          <InputRightAddon children="mm" />
                        </InputGroup>
                      )}

                    </Flex>
                  ))}
                </Stack>
              </Box>
            )}
            {showRechts && (
              <Box
                flex={1}
                borderLeft={showLinks ? "1px" : "none"}
                borderColor="inherit"
                pl={showLinks ? 6 : 0}
              >
                <FormLabel fontSize="sm" mb={3}>{t('rechts')}</FormLabel>
                <Stack spacing={3}>
                  {omsluitingOpties.map((optie) => (
                    <Flex key={optie.label} alignItems="center" gap={3}>
                      <Box flex={1}>
                        <Checkbox
                          isChecked={omsluitingRechts.includes(optie.label)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setOmsluitingRechts([...omsluitingRechts, optie.label]);
                              // Set standaard waarde als het mm nodig heeft
                              if (optie.needsMm && optie.defaultMm) {
                                setOmsluitingRechtsMm({ ...omsluitingRechtsMm, [optie.label]: optie.defaultMm });
                              }
                            } else {
                              setOmsluitingRechts(omsluitingRechts.filter(o => o !== optie.label));
                              // Verwijder mm waarde
                              const newMm = { ...omsluitingRechtsMm };
                              delete newMm[optie.label];
                              setOmsluitingRechtsMm(newMm);
                            }
                          }}
                          size="sm"
                        >
                          {optie.label}
                        </Checkbox>
                      </Box>
                      {optie.needsMm && omsluitingRechts.includes(optie.label) && (
                        <InputGroup size="sm" width="80px">
                          <Input
                            type="number"
                            value={omsluitingRechtsMm[optie.label] || ''}
                            onChange={(e) => setOmsluitingRechtsMm({
                              ...omsluitingRechtsMm,
                              [optie.label]: e.target.value
                            })}
                          />
                          <InputRightAddon children="mm" />
                        </InputGroup>
                      )}
                    </Flex>
                  ))}
                </Stack>
              </Box>
            )}
          </Flex>
        </Box>

        <Divider />

        {/* Schoren */}
        <Box>
          <Text fontWeight="bold" mb={3}>{t('schoren')}</Text>
          <RadioGroup value={schorenEnabled} onChange={setSchorenEnabled}>
            <Stack direction="row" spacing={6} mb={4}>
              <Radio value="ja">{t('ja')}</Radio>
              <Radio value="nee">{t('nee')}</Radio>
            </Stack>
          </RadioGroup>

          {schorenEnabled === 'ja' && (
            <Flex gap={6} direction={{ base: 'column', md: 'row' }}>
              {showLinks && (
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>
                    {t('links')}
                  </Text>
                  <FormControl mb={3}>
                    <FormLabel fontSize="sm">{t('type')}</FormLabel>
                    <Select
                      placeholder={t('selectType')}
                      value={schorenLinksType}
                      onChange={(e) => setSchorenLinksType(e.target.value)}
                      size="sm"
                    >
                      <option value="lateraal">{t('lateraal')}</option>
                      <option value="mediaal">{t('mediaal')}</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">mm</FormLabel>
                    <InputGroup size="sm" width="80px">
                      <Input
                        type="number"
                        value={schorenLinksMm}
                        onChange={(e) => setSchorenLinksMm(e.target.value)}
                      />
                      <InputRightAddon children="mm" />
                    </InputGroup>
                  </FormControl>
                </Box>
              )}
              {showRechts && (
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>
                    {t('rechts')}
                  </Text>
                  <FormControl mb={3}>
                    <FormLabel fontSize="sm">{t('type')}</FormLabel>
                    <Select
                      placeholder={t('selectType')}
                      value={schorenRechtsType}
                      onChange={(e) => setSchorenRechtsType(e.target.value)}
                      size="sm"
                    >
                      <option value="lateraal">{t('lateraal')}</option>
                      <option value="mediaal">{t('mediaal')}</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">mm</FormLabel>
                    <InputGroup size="sm" width="80px">
                      <Input
                        type="number"
                        value={schorenRechtsMm}
                        onChange={(e) => setSchorenRechtsMm(e.target.value)}
                      />
                      <InputRightAddon children="mm" />
                    </InputGroup>
                  </FormControl>
                </Box>
              )}
            </Flex>
          )}
        </Box>

        <Divider />

        {/* Bijzonderheden */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('bijzonderheden')}</Text>
          <Textarea placeholder={t('bijzonderhedenPlaceholder')} />
        </Box>

      </Flex>
    </BaseLayout>
  );
};

export default FormIntakeVLOSPage;
