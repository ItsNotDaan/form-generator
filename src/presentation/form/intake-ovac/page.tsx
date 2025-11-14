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
  Radio,
  RadioGroup,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {useAppDispatch} from '@/domain/store/hooks';
import {setIntakeOVACData} from '@/domain/store/slices/formData';

export const FormIntakeOVACPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor proefschoen
  const [proefschoen, setProefschoen] = useState<string>('nee');

  // State voor datum
  const [datum, setDatum] = useState('');

  // State voor diktes
  const [diktes, setDiktes] = useState('');

  // State voor maatverdeling
  const [maatverdeling, setMaatverdeling] = useState('');

  // State voor schoen sizes (24-32)
  const [schoenSizes, setSchoenSizes] = useState<Record<string, boolean>>({
    '24': false,
    '25': false,
    '26': false,
    '27': false,
    '28': false,
    '29': false,
    '30': false,
    '31': false,
    '32': false,
  });

  // State voor procedures
  const [vrijstaandSchoentje, setVrijstaandSchoentje] = useState(false);
  const [voetAfdrukkleusKast, setVoetAfdrukkleusKast] = useState(false);
  const [bevolktenSchottel, setBevolktenSchottel] = useState(false);
  const [proefschoeneenGecombineerd, setProefschoeneenGecombineerd] =
    useState(false);
  const [bevolktenSchoen, setBevolktenSchoen] = useState(false);
  const [enkelvolschoen, setEnkelvolschoen] = useState(false);
  const [enkelvolkastel, setEnkelvolkastel] = useState(false);

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const handleSubmit = () => {
    dispatch(
      setIntakeOVACData({
        proefschoen: proefschoen as 'ja' | 'nee',
        datum,
        diktes,
        maatverdeling,
        schoenSizes,
        procedures: {
          vrijstaandSchoentje,
          voetAfdrukkleusKast,
          bevolktenSchottel,
          proefschoeneenGecombineerd,
          bevolktenSchoen,
          enkelvolschoen,
          enkelvolkastel,
        },
        bijzonderheden,
      })
    );

    console.log('Intake OVAC data opgeslagen in Redux store');
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
        p={{base: 4, md: 6}}
        borderRadius="md"
        gap={{base: 4, md: 6}}
      >
        {/* Proefschoen */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('proefschoen')}
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
            <RadioGroup value={proefschoen} onChange={setProefschoen}>
              <Stack direction="row" spacing={6}>
                <Radio value="ja">{t('ja')}</Radio>
                <Radio value="nee">{t('nee')}</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Datum */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Datum
          </Text>
          <FormControl>
            <Input
              type="date"
              value={datum}
              onChange={e => setDatum(e.target.value)}
              size="sm"
            />
          </FormControl>
        </Box>

        <Divider />

        {/* Diktes */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Diktes
          </Text>
          <FormControl>
            <Input
              placeholder="Diktes"
              value={diktes}
              onChange={e => setDiktes(e.target.value)}
              size="sm"
            />
          </FormControl>
        </Box>

        <Divider />

        {/* Maatverdeling */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Maatverdeling
          </Text>
          <FormControl>
            <Input
              placeholder="Maatverdeling"
              value={maatverdeling}
              onChange={e => setMaatverdeling(e.target.value)}
              size="sm"
            />
          </FormControl>
        </Box>

        <Divider />

        {/* Schoen Sizes (24-32) */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Maat
          </Text>
          <Box
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <SimpleGrid columns={{base: 3, sm: 5, md: 9}} spacing={4}>
              {Object.keys(schoenSizes).map(size => (
                <Checkbox
                  key={size}
                  isChecked={schoenSizes[size]}
                  onChange={e =>
                    setSchoenSizes({...schoenSizes, [size]: e.target.checked})
                  }
                  size="sm"
                >
                  {size}
                </Checkbox>
              ))}
            </SimpleGrid>
          </Box>
        </Box>

        <Divider />

        {/* Procedures */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Procedures
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
                isChecked={vrijstaandSchoentje}
                onChange={e => setVrijstaandSchoentje(e.target.checked)}
                size="sm"
              >
                Vrijstaand schoentje
              </Checkbox>
              <Checkbox
                isChecked={voetAfdrukkleusKast}
                onChange={e => setVoetAfdrukkleusKast(e.target.checked)}
                size="sm"
              >
                Voetafdruk kleus kast
              </Checkbox>
              <Checkbox
                isChecked={bevolktenSchottel}
                onChange={e => setBevolktenSchottel(e.target.checked)}
                size="sm"
              >
                Bevolkten schottel
              </Checkbox>
              <Checkbox
                isChecked={proefschoeneenGecombineerd}
                onChange={e => setProefschoeneenGecombineerd(e.target.checked)}
                size="sm"
              >
                Proefschoen een gecombineerd
              </Checkbox>
              <Checkbox
                isChecked={bevolktenSchoen}
                onChange={e => setBevolktenSchoen(e.target.checked)}
                size="sm"
              >
                Bevolkten schoen
              </Checkbox>
              <Checkbox
                isChecked={enkelvolschoen}
                onChange={e => setEnkelvolschoen(e.target.checked)}
                size="sm"
              >
                Enkelvol schoen
              </Checkbox>
              <Checkbox
                isChecked={enkelvolkastel}
                onChange={e => setEnkelvolkastel(e.target.checked)}
                size="sm"
              >
                Enkelvol kastel
              </Checkbox>
            </Stack>
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

export default FormIntakeOVACPage;
