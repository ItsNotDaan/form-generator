import React, {useState} from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Button,
  Divider,
  Input,
  Stack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {DatePickerField} from '@/presentation/base/input/datePickerField';
import {
  DropdownField,
  DropdownType,
} from '@/presentation/base/input/dropdownField';
import {useAppDispatch} from '@/domain/store/hooks';
import {setClientData} from '@/domain/store/slices/formData';

export const FormNewClientPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor client data
  const [date, setDate] = useState('');
  const [location, setLocation] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [salutation, setSalutation] = useState<string>('');
  const [initials, setInitials] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [city, setCity] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [insurance, setInsurance] = useState('');
  const [practitionerId, setPractitionerId] = useState<string | undefined>(
    undefined
  );
  const [phoneOne, setPhoneOne] = useState('');
  const [phoneTwo, setPhoneTwo] = useState('');
  const [specialist, setSpecialist] = useState('');

  // Practitioner list
  const practitioners = [
    {label: 'Dr. Jan de Vries', value: 'p1'},
    {label: 'Dr. Anna Jansen', value: 'p2'},
    {label: 'Dr. Piet van Dijk', value: 'p3'},
  ];

  const handleSubmit = () => {
    // Dispatch client data naar Redux store
    dispatch(
      setClientData({
        practitionerId,
        date,
        osaVlos: 'VLOS', // Alleen VLOS
        location: location as 'FZ' | 'FM' | 'NN' | 'MMC' | 'AMC' | undefined,
        salutation: salutation as 'Mw.' | 'Dhr.' | 'Mej.' | undefined,
        initials,
        clientName,
        birthDate,
        address,
        postalCode,
        houseNumber,
        city,
        phoneOne,
        phoneTwo,
        email,
        bsn: '', // Verwijderd uit formulier
        insurance,
        specialist, // Bevat nu Specialist/Huisarts
        familyDoctor: '', // Verwijderd uit formulier
      })
    );

    // Navigeer naar intake VLOS
    router.push(Routes.form_intake_vlos);
  };

  return (
    <BaseLayout
      title={t('new-client')}
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
        {/* Behandelaar en Aanmeetdatum */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('behandelaarEnDatum')}
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
            <FormControl flex={1}>
              <FormLabel fontSize="sm">{t('behandelaar')}</FormLabel>
              <DropdownField
                type={DropdownType.SINGLE_NON_CREATABLE}
                items={practitioners}
                item={practitionerId}
                onItemSelected={item => setPractitionerId(item?.value)}
                placeholder={t('choosePractitioner')}
                isSmallVariant
              />
            </FormControl>
            <FormControl flex={1}>
              <FormLabel fontSize="sm">{t('aanmeetdatum')}</FormLabel>
              <Box maxW={{base: 'full', md: '300px'}}>
                <DatePickerField
                  date={date ? new Date(date) : undefined}
                  onDateChanged={d => d && setDate(d.toISOString())}
                  isSmallVariant
                />
              </Box>
            </FormControl>
          </Flex>
        </Box>

        <Divider />

        {/* Locatie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('locatie')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align="center"
            p={4}
            mt={2}
          >
            <RadioGroup value={location} onChange={setLocation}>
              <Stack
                direction={{base: 'column', sm: 'row'}}
                spacing={{base: 2, sm: 6}}
              >
                <Radio value="FZ">FZ</Radio>
                <Radio value="FM">FM</Radio>
                <Radio value="NN">NN</Radio>
                <Radio value="MMC">MMC</Radio>
                <Radio value="AMC">AMC</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Box>

        <Divider />

        {/* Persoonlijke gegevens */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('persoonlijkeGegevens')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {/* Aanhef */}
            <FormControl>
              <FormLabel fontSize="sm">{t('aanhef')}</FormLabel>
              <RadioGroup value={salutation} onChange={setSalutation}>
                <Stack direction="row" spacing={6}>
                  <Radio value="Mw.">Mw.</Radio>
                  <Radio value="Dhr.">Dhr.</Radio>
                  <Radio value="Mej.">Mej.</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* Voorletters en Achternaam */}
            <Flex
              gap={{base: 4, md: 6}}
              direction={{base: 'column', md: 'row'}}
            >
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('voorletters')}</FormLabel>
                <Input
                  value={initials}
                  onChange={e => setInitials(e.target.value)}
                  size="sm"
                  placeholder={t('voorllettersPlaceholder')}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('achternaam')}</FormLabel>
                <Input
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  size="sm"
                  placeholder={t('achternaamPlaceholder')}
                />
              </FormControl>
            </Flex>

            {/* Geboortedatum */}
            <FormControl>
              <FormLabel fontSize="sm">{t('geboortedatum')}</FormLabel>
              <Box>
                <DatePickerField
                  date={birthDate ? new Date(birthDate) : undefined}
                  onDateChanged={date =>
                    date && setBirthDate(date.toISOString())
                  }
                  isSmallVariant
                />
              </Box>
            </FormControl>
          </Flex>
        </Box>

        <Divider />

        {/* Adresgegevens */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('adresgegevens')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {/* Postcode en Huisnummer */}
            <Flex
              gap={{base: 4, md: 6}}
              direction={{base: 'column', sm: 'row'}}
            >
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('postcode')}</FormLabel>
                <Input
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  size="sm"
                  placeholder={t('postcodePlaceholder')}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('huisnummer')}</FormLabel>
                <Input
                  value={houseNumber}
                  onChange={e => setHouseNumber(e.target.value)}
                  size="sm"
                  placeholder={t('huisnummerPlaceholder')}
                />
              </FormControl>
            </Flex>

            {/* Straatnaam en Stad */}
            <Flex
              gap={{base: 4, md: 6}}
              direction={{base: 'column', md: 'row'}}
            >
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('straatnaam')}</FormLabel>
                <Input
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  size="sm"
                  placeholder={t('straatnaamPlaceholder')}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('stad')}</FormLabel>
                <Input
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  size="sm"
                  placeholder={t('stadPlaceholder')}
                />
              </FormControl>
            </Flex>
          </Flex>
        </Box>

        <Divider />

        {/* Contactgegevens */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('contactgegevens')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {/* Telefoon nummers */}
            <Flex
              gap={{base: 4, md: 6}}
              direction={{base: 'column', md: 'row'}}
            >
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('telefoon1')}</FormLabel>
                <Input
                  type="tel"
                  value={phoneOne}
                  onChange={e => setPhoneOne(e.target.value)}
                  size="sm"
                  placeholder={t('telefoon1Placeholder')}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('telefoon2')}</FormLabel>
                <Input
                  type="tel"
                  value={phoneTwo}
                  onChange={e => setPhoneTwo(e.target.value)}
                  size="sm"
                  placeholder={t('telefoon2Placeholder')}
                />
              </FormControl>
            </Flex>

            {/* Email */}
            <FormControl>
              <FormLabel fontSize="sm">{t('emailadres')}</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                size="sm"
                placeholder={t('emailadresPlaceholder')}
              />
            </FormControl>
          </Flex>
        </Box>

        <Divider />

        {/* Verzekering en Medische info */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('verzekeringEnMedischeInformatie')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Flex
              gap={{base: 4, md: 6}}
              direction={{base: 'column', md: 'row'}}
            >
              <FormControl flex={1}>
                <FormLabel fontSize="sm">
                  {t('verzekeringsmaatschappij')}
                </FormLabel>
                <Input
                  value={insurance}
                  onChange={e => setInsurance(e.target.value)}
                  size="sm"
                  placeholder={t('verzekeringsmaatschappijPlaceholder')}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('specialistHuisarts')}</FormLabel>
                <Input
                  value={specialist}
                  onChange={e => setSpecialist(e.target.value)}
                  size="sm"
                  placeholder={t('specialistHuisartsPlaceholder')}
                />
              </FormControl>
            </Flex>
          </Flex>
        </Box>

        {/* Submit button */}
        <Flex justifyContent={{base: 'stretch', sm: 'flex-end'}} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{base: 'full', sm: 'auto'}}
          >
            {t('doorgaanNaarVlosIntake')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};
