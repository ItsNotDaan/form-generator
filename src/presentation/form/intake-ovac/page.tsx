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
  Radio,
  RadioGroup,
  Button,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '../../routes';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setIntakeOVACData, setClientData } from '@/domain/store/slices/formData';
import { OVAC_OMSCHRIJVING_ITEMS, PAARTYPE_OPTIES } from '@/presentation/form/constants/formConstants';

export const FormIntakeOVACPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // State voor omschrijving/paartype
  const [omschrijving, setOmschrijving] = useState<string>('Eerste paar');

  // State voor medische indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState('');

  // State voor omschrijving items - individuele velden per item en zijde
  const [supplementIndividueelLinks, setSupplementIndividueelLinks] = useState(false);
  const [supplementIndividueelRechts, setSupplementIndividueelRechts] = useState(false);
  const [eenvoudigeAfwikkelrolLinks, setEenvoudigeAfwikkelrolLinks] = useState(false);
  const [eenvoudigeAfwikkelrolRechts, setEenvoudigeAfwikkelrolRechts] = useState(false);
  const [gecompliceerdeAfwikkelrolLinks, setGecompliceerdeAfwikkelrolLinks] = useState(false);
  const [gecompliceerdeAfwikkelrolRechts, setGecompliceerdeAfwikkelrolRechts] = useState(false);
  const [hakAanpassing2cmLinks, setHakAanpassing2cmLinks] = useState(false);
  const [hakAanpassing2cmRechts, setHakAanpassing2cmRechts] = useState(false);
  const [hakZoolVerhoging3cmLinks, setHakZoolVerhoging3cmLinks] = useState(false);
  const [hakZoolVerhoging3cmRechts, setHakZoolVerhoging3cmRechts] = useState(false);
  const [hakZoolVerhoging7cmLinks, setHakZoolVerhoging7cmLinks] = useState(false);
  const [hakZoolVerhoging7cmRechts, setHakZoolVerhoging7cmRechts] = useState(false);
  const [aangepastehakkenLinks, setAangepastehakkenLinks] = useState(false);
  const [aangepastehakkenRechts, setAangepastehakkenRechts] = useState(false);
  const [zoolverstijvingLinks, setZoolverstijvingLinks] = useState(false);
  const [zoolverstijvingRechts, setZoolverstijvingRechts] = useState(false);
  const [nieuweWreefsluitingLinks, setNieuweWreefsluitingLinks] = useState(false);
  const [nieuweWreefsluitingRechts, setNieuweWreefsluitingRechts] = useState(false);

  // State voor verkorting
  const [verkortingLinks, setVerkortingLinks] = useState(false);
  const [verkortingRechts, setVerkortingRechts] = useState(false);

  // State voor voorvoet en hiel
  const [voorvoetCm, setVoorvoetCm] = useState('');
  const [hielCm, setHielCm] = useState('');

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  // Helper functie om de juiste state getter/setter te krijgen voor een item en zijde
  const getStateForItem = (key: string, side: 'links' | 'rechts'): [boolean, (value: boolean) => void] => {
    const stateMap: Record<string, { links: [boolean, (v: boolean) => void]; rechts: [boolean, (v: boolean) => void] }> = {
      supplementIndividueel: {
        links: [supplementIndividueelLinks, setSupplementIndividueelLinks],
        rechts: [supplementIndividueelRechts, setSupplementIndividueelRechts],
      },
      eenvoudigeAfwikkelrol: {
        links: [eenvoudigeAfwikkelrolLinks, setEenvoudigeAfwikkelrolLinks],
        rechts: [eenvoudigeAfwikkelrolRechts, setEenvoudigeAfwikkelrolRechts],
      },
      gecompliceerdeAfwikkelrol: {
        links: [gecompliceerdeAfwikkelrolLinks, setGecompliceerdeAfwikkelrolLinks],
        rechts: [gecompliceerdeAfwikkelrolRechts, setGecompliceerdeAfwikkelrolRechts],
      },
      hakAanpassing2cm: {
        links: [hakAanpassing2cmLinks, setHakAanpassing2cmLinks],
        rechts: [hakAanpassing2cmRechts, setHakAanpassing2cmRechts],
      },
      hakZoolVerhoging3cm: {
        links: [hakZoolVerhoging3cmLinks, setHakZoolVerhoging3cmLinks],
        rechts: [hakZoolVerhoging3cmRechts, setHakZoolVerhoging3cmRechts],
      },
      hakZoolVerhoging7cm: {
        links: [hakZoolVerhoging7cmLinks, setHakZoolVerhoging7cmLinks],
        rechts: [hakZoolVerhoging7cmRechts, setHakZoolVerhoging7cmRechts],
      },
      aangepastehakken: {
        links: [aangepastehakkenLinks, setAangepastehakkenLinks],
        rechts: [aangepastehakkenRechts, setAangepastehakkenRechts],
      },
      zoolverstijving: {
        links: [zoolverstijvingLinks, setZoolverstijvingLinks],
        rechts: [zoolverstijvingRechts, setZoolverstijvingRechts],
      },
      nieuweWreefsluiting: {
        links: [nieuweWreefsluitingLinks, setNieuweWreefsluitingLinks],
        rechts: [nieuweWreefsluitingRechts, setNieuweWreefsluitingRechts],
      },
    };
    return stateMap[key][side];
  };

  const handleSubmit = () => {
    // Update client data with intake type
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'OVAC' }));
    }

    dispatch(
      setIntakeOVACData({
        omschrijving,
        medischeIndicatie,
        supplementIndividueelLinks,
        supplementIndividueelRechts,
        eenvoudigeAfwikkelrolLinks,
        eenvoudigeAfwikkelrolRechts,
        gecompliceerdeAfwikkelrolLinks,
        gecompliceerdeAfwikkelrolRechts,
        hakAanpassing2cmLinks,
        hakAanpassing2cmRechts,
        hakZoolVerhoging3cmLinks,
        hakZoolVerhoging3cmRechts,
        hakZoolVerhoging7cmLinks,
        hakZoolVerhoging7cmRechts,
        aangepastehakkenLinks,
        aangepastehakkenRechts,
        zoolverstijvingLinks,
        zoolverstijvingRechts,
        nieuweWreefsluitingLinks,
        nieuweWreefsluitingRechts,
        verkortingLinks,
        verkortingRechts,
        voorvoetCm,
        hielCm,
        bijzonderheden,
      })
    );

    console.log('Intake OVAC data opgeslagen in Redux store');

    // Navigeer naar results page
    router.push(Routes.form_results);
  };

  return (
    <BaseLayout
      title={t('intakeOvac')}
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

        {/* Medische Indicatie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('medischeIndicatie')}
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
            <Textarea
              placeholder={t('medischeIndicatiePlaceholder')}
              value={medischeIndicatie}
              onChange={e => setMedischeIndicatie(e.target.value)}
              minH={{ base: '80px', md: '100px' }}
            />
          </Flex>
        </Box>

        <Divider />

        {/* Omschrijving Tabel */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Omschrijving
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
            <Box overflowX="auto">
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th>Omschrijving</Th>
                    <Th textAlign="center">Post nr</Th>
                    <Th textAlign="center">R</Th>
                    <Th textAlign="center">L</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {OVAC_OMSCHRIJVING_ITEMS.map(item => {
                    const [rechtsValue, setRechtsValue] = getStateForItem(item.key, 'rechts');
                    const [linksValue, setLinksValue] = getStateForItem(item.key, 'links');

                    return (
                      <Tr key={item.key}>
                        <Td>{item.label}</Td>
                        <Td textAlign="center">{item.postNr}</Td>
                        <Td textAlign="center">
                          <Checkbox
                            isChecked={rechtsValue}
                            onChange={(e) => setRechtsValue(e.target.checked)}
                            size="sm"
                          />
                        </Td>
                        <Td textAlign="center">
                          <Checkbox
                            isChecked={linksValue}
                            onChange={(e) => setLinksValue(e.target.checked)}
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

        {/* Verkorting */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Verkorting
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
            align="center"
          >
            <Stack direction="row" spacing={6}>
              <Checkbox
                isChecked={verkortingRechts}
                onChange={e => setVerkortingRechts(e.target.checked)}
              >
                R
              </Checkbox>
              <Checkbox
                isChecked={verkortingLinks}
                onChange={e => setVerkortingLinks(e.target.checked)}
              >
                L
              </Checkbox>
            </Stack>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} flex={1}>
              <FormControl>
                <FormLabel fontSize="sm">Voorvoet (cm)</FormLabel>
                <Input
                  type="number"
                  placeholder="0"
                  value={voorvoetCm}
                  onChange={e => setVoorvoetCm(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Hiel (cm)</FormLabel>
                <Input
                  type="number"
                  placeholder="0"
                  value={hielCm}
                  onChange={e => setHielCm(e.target.value)}
                  size="sm"
                />
              </FormControl>
            </SimpleGrid>
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

export default FormIntakeOVACPage;
