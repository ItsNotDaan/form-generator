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
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '../../routes';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setIntakeSteunzolenData, setClientData } from '@/domain/store/slices/formData';
import { PAARTYPE_OPTIES } from '@/presentation/form/constants/formConstants';

export const FormIntakeSteunzolenPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // State voor omschrijving/paartype
  const [omschrijving, setOmschrijving] = useState<string>('');

  // State voor processes
  const [processes, setProcesses] = useState('');

  // State voor Schoenteest checkboxes
  const [berekteKloonzool, setBerekteKloonzool] = useState(false);
  const [berekteKustvlakte, setBerekteKustvlakte] = useState(false);
  const [berekteVlakten, setBerekteVlakten] = useState(false);
  const [enkelvolZolen, setEnkelvolZolen] = useState(false);

  // State voor Steunzolen checkboxes
  const [ts15cm, setTs15cm] = useState(false);
  const [tussenlegd, setTussenlegd] = useState(false);
  const [steunzolen, setSteunzolen] = useState(false);
  const [bislangTussen, setBislangTussen] = useState(false);
  const [bislang, setBislang] = useState(false);

  // State voor Corrections
  const [vervolgC1Lang1UVlug, setVervolgC1Lang1UVlug] = useState(false);
  const [vervolgC1Kort, setVervolgC1Kort] = useState(false);
  const [uithollingC1Krag3Grote, setUithollingC1Krag3Grote] = useState(false);
  const [uithollingC1Krag3Kleine, setUithollingC1Krag3Kleine] = useState(false);
  const [haktVerlengdC1Krag3, setHaktVerlengdC1Krag3] = useState(false);

  // State voor Pads
  const [csm, setCsm] = useState(false);
  const [e625, setE625] = useState(false);
  const [e425, setE425] = useState(false);
  const [cushlin, setCushlin] = useState(false);

  // State voor fields
  const [corr, setCorr] = useState('');
  const [montage, setMontage] = useState('');
  const [controle, setControle] = useState('');
  const [belasting, setBelasting] = useState('');
  const [pref, setPref] = useState('');

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const handleSubmit = () => {
    // Update client data with intake type
    if (clientData) {
      dispatch(setClientData({ ...clientData, intakeType: 'Steunzolen' }));
    }

    dispatch(
      setIntakeSteunzolenData({
        omschrijving,
        processes,
        schoenteest: {
          berekteKloonzool,
          berekteKustvlakte,
          berekteVlakten,
          enkelvolZolen,
        },
        steunzolen: {
          ts15cm,
          tussenlegd,
          steunzolen,
          bislangTussen,
          bislang,
        },
        corrections: {
          vervolgC1Lang1UVlug,
          vervolgC1Kort,
          uithollingC1Krag3Grote,
          uithollingC1Krag3Kleine,
          haktVerlengdC1Krag3,
        },
        pads: {
          csm,
          e625,
          e425,
          cushlin,
        },
        corr,
        montage,
        controle,
        belasting,
        pref,
        bijzonderheden,
      })
    );

    console.log('Intake Steunzolen data opgeslagen in Redux store');

    // Navigeer naar results page
    router.push(Routes.form_results);
  };

  return (
    <BaseLayout
      title={t('intakeSteunzolen')}
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

        {/* Processes */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Processes
          </Text>
          <FormControl>
            <Input
              placeholder="Processes"
              value={processes}
              onChange={e => setProcesses(e.target.value)}
              size="sm"
            />
          </FormControl>
        </Box>

        <Divider />

        {/* Schoenteest */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Schoenteest
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Stack spacing={3}>
              <Checkbox
                isChecked={berekteKloonzool}
                onChange={e => setBerekteKloonzool(e.target.checked)}
                size="sm"
              >
                Berekte kloonzool met
              </Checkbox>
              <Checkbox
                isChecked={berekteKustvlakte}
                onChange={e => setBerekteKustvlakte(e.target.checked)}
                size="sm"
              >
                Berekte kustvlakte scatter
              </Checkbox>
              <Checkbox
                isChecked={berekteVlakten}
                onChange={e => setBerekteVlakten(e.target.checked)}
                size="sm"
              >
                Berekte vlakten/klosse scatter
              </Checkbox>
              <Checkbox
                isChecked={enkelvolZolen}
                onChange={e => setEnkelvolZolen(e.target.checked)}
                size="sm"
              >
                Enkelvol zolen retel
              </Checkbox>
            </Stack>
          </Box>
        </Box>

        <Divider />

        {/* Steunzolen */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Steunzolen
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Stack spacing={3}>
              <Checkbox
                isChecked={ts15cm}
                onChange={e => setTs15cm(e.target.checked)}
                size="sm"
              >
                T.s 1,5 cm
              </Checkbox>
              <Checkbox
                isChecked={tussenlegd}
                onChange={e => setTussenlegd(e.target.checked)}
                size="sm"
              >
                Tussenlegd
              </Checkbox>
              <Checkbox
                isChecked={steunzolen}
                onChange={e => setSteunzolen(e.target.checked)}
                size="sm"
              >
                Steunzolen
              </Checkbox>
              <Checkbox
                isChecked={bislangTussen}
                onChange={e => setBislangTussen(e.target.checked)}
                size="sm"
              >
                Bislang tussen
              </Checkbox>
              <Checkbox
                isChecked={bislang}
                onChange={e => setBislang(e.target.checked)}
                size="sm"
              >
                Bislang
              </Checkbox>
            </Stack>
          </Box>
        </Box>

        <Divider />

        {/* Corrections */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Correcties
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Stack spacing={3}>
              <Checkbox
                isChecked={vervolgC1Lang1UVlug}
                onChange={e => setVervolgC1Lang1UVlug(e.target.checked)}
                size="sm"
              >
                Vervolg C 1 lang 1 U vlug
              </Checkbox>
              <Checkbox
                isChecked={vervolgC1Kort}
                onChange={e => setVervolgC1Kort(e.target.checked)}
                size="sm"
              >
                Vervolg C 1 kort
              </Checkbox>
              <Checkbox
                isChecked={uithollingC1Krag3Grote}
                onChange={e => setUithollingC1Krag3Grote(e.target.checked)}
                size="sm"
              >
                Uitholling C 1 krag 3 grote
              </Checkbox>
              <Checkbox
                isChecked={uithollingC1Krag3Kleine}
                onChange={e => setUithollingC1Krag3Kleine(e.target.checked)}
                size="sm"
              >
                Uitholling C 1 krag 3 kleine D base
              </Checkbox>
              <Checkbox
                isChecked={haktVerlengdC1Krag3}
                onChange={e => setHaktVerlengdC1Krag3(e.target.checked)}
                size="sm"
              >
                Hakt verlengd C 1 krag 3 Grote
              </Checkbox>
            </Stack>
          </Box>
        </Box>

        <Divider />

        {/* Pads */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Pads
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Stack spacing={3}>
              <Checkbox
                isChecked={csm}
                onChange={e => setCsm(e.target.checked)}
                size="sm"
              >
                € 6-25.00
              </Checkbox>
              <Checkbox
                isChecked={e625}
                onChange={e => setE625(e.target.checked)}
                size="sm"
              >
                € 6-25.00
              </Checkbox>
              <Checkbox
                isChecked={e425}
                onChange={e => setE425(e.target.checked)}
                size="sm"
              >
                € 4-25.00
              </Checkbox>
              <Checkbox
                isChecked={cushlin}
                onChange={e => setCushlin(e.target.checked)}
                size="sm"
              >
                Cushlin
              </Checkbox>
            </Stack>
          </Box>
        </Box>

        <Divider />

        {/* Other Fields */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Details
          </Text>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel fontSize="sm">Corr</FormLabel>
              <Input
                placeholder="Corr"
                value={corr}
                onChange={e => setCorr(e.target.value)}
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Montage</FormLabel>
              <Input
                placeholder="Montage"
                value={montage}
                onChange={e => setMontage(e.target.value)}
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Controle</FormLabel>
              <Input
                placeholder="Controle"
                value={controle}
                onChange={e => setControle(e.target.value)}
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Belasting</FormLabel>
              <Input
                placeholder="Belasting"
                value={belasting}
                onChange={e => setBelasting(e.target.value)}
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Pref</FormLabel>
              <Input
                placeholder="Pref"
                value={pref}
                onChange={e => setPref(e.target.value)}
                size="sm"
              />
            </FormControl>
          </Stack>
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

export default FormIntakeSteunzolenPage;
