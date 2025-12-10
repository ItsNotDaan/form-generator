import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
  Flex, FormControl, FormLabel, Checkbox, Input, Text, Box, Divider, Textarea, Stack, Button, SimpleGrid, Radio, RadioGroup, Alert, AlertIcon, UnorderedList, ListItem
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/domain/store/hooks';
import { setIntakeOSBData } from '@/domain/store/slices/formData';
import {
  PAARTYPE_OPTIES, DOEL_OPTIES, LOOPFUNCTIE_OPTIES, LEVERANCIER_OPTIES
} from '@/presentation/form/constants/formConstants';

const FormIntakeOSBPage = () => {
  const { t } = useTranslation('form');
  const router = useRouter();
  const dispatch = useAppDispatch();

  // State
  const [welkPaar, setWelkPaar] = useState('Eerste paar');
  const [loopfunctie, setLoopfunctie] = useState<Record<string, boolean>>({});
  const [leverancier, setLeverancier] = useState('');
  const [artCode, setArtCode] = useState('');
  const [lengteMaat, setLengteMaat] = useState('');
  const [wijdte, setWijdte] = useState('');
  const [basiscode, setBasiscode] = useState('');
  const [aanpassingen, setAanpassingen] = useState<any>({});
  const [steunzolenEnabled, setSteunzolenEnabled] = useState(false);
  const [schoenmaat, setSchoenmaat] = useState('');
  const [steunzoolPrijs, setSteunzoolPrijs] = useState(0);
  const [steunzoolPrijsNaam, setSteunzoolPrijsNaam] = useState('');
  const [steunzoolTypeGeneral, setSteunzoolTypeGeneral] = useState('');
  const [steunzoolAndersText, setSteunzoolAndersText] = useState('');
  const [steunzoolCorrectieMiddenvoet, setSteunzoolCorrectieMiddenvoet] = useState('');
  const [steunzoolCorrectieVoorvoet, setSteunzoolCorrectieVoorvoet] = useState('');
  const [steunzoolVvPellote, setSteunzoolVvPellote] = useState('');
  const [steunzoolHakVerhogingLinks, setSteunzoolHakVerhogingLinks] = useState('');
  const [steunzoolHakVerhogingRechts, setSteunzoolHakVerhogingRechts] = useState('');
  const [bijzonderheden, setBijzonderheden] = useState('');

  // Validation helpers
  const getMissingFields = () => [];
  const areAllFieldsValid = getMissingFields().length === 0;

  // Submit handler
  const handleSubmit = () => {
    if (!areAllFieldsValid) return;
    dispatch(setIntakeOSBData({
      welkPaar,
      loopfunctie,
      leverancier,
      productSpecificaties: { artCode, lengteMaat, wijdte },
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
    }));
    router.push('/form-results');
  };

  // Render
  return (
    <BaseLayout title={t('intakeOsb')} showBackButton={true} onBackButtonClicked={() => router.back()}>
      <Flex w="full" direction="column" bg="white" p={{ base: 4, md: 6 }} borderRadius="md" gap={{ base: 4, md: 6 }}>
        {/* Example: Basiscode block */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>Basiscode</Text>
          <Input placeholder="Vul basiscode in" value={basiscode} onChange={e => setBasiscode(e.target.value)} size="sm" />
        </Box>
        <Divider />
        {/* ...rest of the form, similar to OSA, using the correct state and handlers... */}
        {/* Show validation alert if needed */}
        {!areAllFieldsValid && (
          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold" mb={2}>{t('vulVerplichteVeldenIn')}</Text>
              <UnorderedList>
                {getMissingFields().map((field, index) => (
                  <ListItem key={index}>{field.fieldName}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Alert>
        )}
        <Flex justifyContent={{ base: 'stretch', sm: 'flex-end' }} mt={4}>
          <Button variant="primary" onClick={handleSubmit} w={{ base: 'full', sm: 'auto' }}>{t('opslaanEnDoorgaan')}</Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

//
onChange = { e => setAanpassingen(a => ({ ...a, halluxValgusLinks: e.target.checked }))}
                >
  Links
                </Checkbox >
{
  aanpassingen.halluxValgusLinks && (
    <select
      value={aanpassingen.halluxValgusLinksMm}
      onChange={e => setAanpassingen(a => ({ ...a, halluxValgusLinksMm: e.target.value }))}
      style={{ marginLeft: 8 }}
    >
      <option value="">mm</option>
      <option value="3">3mm</option>
      <option value="8">8mm</option>
    </select>
  )
}
  < Checkbox
isChecked = { aanpassingen.halluxValgusRechts }
onChange = { e => setAanpassingen(a => ({ ...a, halluxValgusRechts: e.target.checked }))}
                >
  Rechts
                </Checkbox >
{
  aanpassingen.halluxValgusRechts && (
    <select
      value={aanpassingen.halluxValgusRechtsMm}
      onChange={e => setAanpassingen(a => ({ ...a, halluxValgusRechtsMm: e.target.value }))}
      style={{ marginLeft: 8 }}
    >
      <option value="">mm</option>
      <option value="3">3mm</option>
      <option value="8">8mm</option>
    </select>
  )
}
              </Stack >
            </Box >

  {/* Verdieping voorvoet */ }
  < Box flex = { 1} minW = "220px" >
              <Text fontWeight="semibold" mb={2}>Verdieping voorvoet</Text>
              <Stack direction="row" spacing={4} align="center">
                <Checkbox
                  isChecked={aanpassingen.verdiepingVoorvoetLinks}
                  onChange={e => setAanpassingen(a => ({ ...a, verdiepingVoorvoetLinks: e.target.checked }))}
                >
                  Links
                </Checkbox>
                {aanpassingen.verdiepingVoorvoetLinks && (
                  <select
                    value={aanpassingen.verdiepingVoorvoetLinksMm}
                    onChange={e => setAanpassingen(a => ({ ...a, verdiepingVoorvoetLinksMm: e.target.value }))}
                    style={{ marginLeft: 8 }}
                  >
                    <option value="">mm</option>
                    <option value="3">3mm</option>
                    <option value="8">8mm</option>
                  </select>
                )}
                <Checkbox
                  isChecked={aanpassingen.verdiepingVoorvoetRechts}
                  onChange={e => setAanpassingen(a => ({ ...a, verdiepingVoorvoetRechts: e.target.checked }))}
                >
                  Rechts
                </Checkbox>
                {aanpassingen.verdiepingVoorvoetRechts && (
                  <select
                    value={aanpassingen.verdiepingVoorvoetRechtsMm}
                    onChange={e => setAanpassingen(a => ({ ...a, verdiepingVoorvoetRechtsMm: e.target.value }))}
                    style={{ marginLeft: 8 }}
                  >
                    <option value="">mm</option>
                    <option value="3">3mm</option>
                    <option value="8">8mm</option>
                  </select>
                )}
              </Stack>
            </Box >

  {/* Supplement Individueel */ }
  < Box flex = { 1} minW = "220px" >
              <Text fontWeight="semibold" mb={2}>Supplement Individueel</Text>
              <Stack direction="row" spacing={4}>
                <Checkbox
                  isChecked={aanpassingen.supplementIndividueelLinks}
                  onChange={e => setAanpassingen(a => ({ ...a, supplementIndividueelLinks: e.target.checked }))}
                >
                  Links
                </Checkbox>
                <Checkbox
                  isChecked={aanpassingen.supplementIndividueelRechts}
                  onChange={e => setAanpassingen(a => ({ ...a, supplementIndividueelRechts: e.target.checked }))}
                >
                  Rechts
                </Checkbox>
              </Stack>
            </Box >

  {/* Afwikkelrol Eenvoudig */ }
  < Box flex = { 1} minW = "220px" >
              <Text fontWeight="semibold" mb={2}>Afwikkelrol Eenvoudig</Text>
              <Stack direction="row" spacing={4}>
                <Checkbox
                  isChecked={aanpassingen.afwikkelrolEenvoudigLinks}
                  onChange={e => setAanpassingen(a => ({ ...a, afwikkelrolEenvoudigLinks: e.target.checked }))}
                >
                  Links
                </Checkbox>
                <Checkbox
                  isChecked={aanpassingen.afwikkelrolEenvoudigRechts}
                  onChange={e => setAanpassingen(a => ({ ...a, afwikkelrolEenvoudigRechts: e.target.checked }))}
                >
                  Rechts
                </Checkbox>
              </Stack>
            </Box >

  {/* Afwikkelrol gecompliceerd */ }
  < Box flex = { 1} minW = "220px" >
              <Text fontWeight="semibold" mb={2}>Afwikkelrol gecompliceerd</Text>
              <Stack direction="row" spacing={4}>
                <Checkbox
                  isChecked={aanpassingen.afwikkelrolGecompliceerdLinks}
                  onChange={e => setAanpassingen(a => ({ ...a, afwikkelrolGecompliceerdLinks: e.target.checked }))}
                >
                  Links
                </Checkbox>
                <Checkbox
                  isChecked={aanpassingen.afwikkelrolGecompliceerdRechts}
                  onChange={e => setAanpassingen(a => ({ ...a, afwikkelrolGecompliceerdRechts: e.target.checked }))}
                >
                  Rechts
                </Checkbox>
              </Stack>
            </Box >
          </Flex >
        </Box >

  <Divider />

{/* Sectie 9: Steunzolen */ }
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('steunzolen')}
          </Text>
          <RadioGroup
            value={steunzolenEnabled ? 'yes' : 'no'}
            onChange={val => setSteunzolenEnabled(val === 'yes')}
            mb={4}
          >
            <Stack direction="row" spacing={4}>
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Stack>
          </RadioGroup>

          {steunzolenEnabled && (
            <Flex
              gap={{base: 2, md: 3}}
              direction="column"
              border="1px solid"
              borderColor="inherit"
              borderRadius="md"
              p={4}
              mt={2}
            >
              <FormControl id="field-schoenmaat-osb">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  {t('schoenmaat')} *
                </Text>
                <Input
                  placeholder={t('schoenmaarPlaceholder')}
                  value={schoenmaat}
                  onChange={e => setSchoenmaat(e.target.value)}
                  size="sm"
                />
              </FormControl>

              <Divider />

              <FormControl id="field-prijs-osb">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  {t('steunzoolPrijs')} *
                </Text>
                <RadioGroup
                  value={steunzoolPrijs.toString()}
                  onChange={val => {
                    setSteunzoolPrijs(Number(val));
                    const selectedOption = STEUNZOLEN_PRIJS_OPTIES.find(
                      opt => opt.value === Number(val)
                    );
                    if (selectedOption)
                      setSteunzoolPrijsNaam(t(selectedOption.label));
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
                      {t('steunzoolTypeGeneral')}
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
                        placeholder={t('steunzoolAndersTextPlaceholder')}
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
                      {t('correctieMiddenvoet')}
                    </Text>
                    <Flex gap={{base: 2, md: 3}} flexWrap="wrap">
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
                      {t('correctieVoorvoet')}
                    </Text>
                    <Flex gap={{base: 2, md: 3}} flexWrap="wrap">
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
                      {t('vvPellote')}
                    </Text>
                    <Flex gap={{base: 2, md: 3}} flexWrap="wrap">
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
                  {t('steunzoolHakVerhogingCm')}
                </Text>
                <SimpleGrid columns={{base: 1, sm: 2}} spacing={4}>
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
          )}
        </Box>

        <Divider />

{/* Bijzonderheden */ }
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

{
  !areAllFieldsValid && (
    <Alert status="warning" borderRadius="md">
      <AlertIcon />
      <Box>
        <Text fontWeight="bold" mb={2}>
          {t('vulVerplichteVeldenIn')}
        </Text>
        <UnorderedList>
          {getMissingFields().map((field, index) => (
            <ListItem key={index}>{field.fieldName}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Alert>
  )
}

{/* Submit button */ }
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
