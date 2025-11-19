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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {DatePickerField} from '@/presentation/base/input/datePickerField';
import {
  DropdownField,
  DropdownType,
} from '@/presentation/base/input/dropdownField';
import {
  LOCATION_OPTIONS,
  SALUTATION_OPTIONS,
  PRACTITIONERS,
  Location,
  Salutation,
} from '@/presentation/form/constants/formConstants';
import {useAppDispatch} from '@/domain/store/hooks';
import {setClientData} from '@/domain/store/slices/formData';

export const FormNewClientPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor client data
  const [date, setDate] = useState('');
  const [location, setLocation] = useState<Location | ''>('');
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [salutation, setSalutation] = useState<Salutation | ''>('');
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

  // All fields are required for new client
  const areAllFieldsValid =
    !!practitionerId &&
    !!date &&
    !!location &&
    !!salutation &&
    initials.trim().length > 0 &&
    clientName.trim().length > 0 &&
    birthDate.length > 0 &&
    address.trim().length > 0 &&
    postalCode.trim().length > 0 &&
    houseNumber.trim().length > 0 &&
    city.trim().length > 0 &&
    phoneOne.trim().length > 0 &&
    email.trim().length > 0 &&
    insurance.trim().length > 0 &&
    specialist.trim().length > 0;

  const handleSubmit = () => {
    if (!areAllFieldsValid) {
      return;
    }
    // Dispatch client data naar Redux store
    dispatch(
      setClientData({
        practitionerId,
        date,
        osaVlos: 'VLOS', // Alleen VLOS
        location: location || undefined,
        salutation: salutation || undefined,
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

    // Navigeer naar form selection page
    router.push(Routes.form_selection);
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
            <FormControl flex={1} isRequired isInvalid={!practitionerId}>
              <FormLabel fontSize="sm">{t('behandelaar')}</FormLabel>
              <DropdownField
                type={DropdownType.SINGLE_NON_CREATABLE}
                items={PRACTITIONERS}
                item={practitionerId}
                onItemSelected={item => setPractitionerId(item?.value)}
                placeholder={t('choosePractitioner')}
                isSmallVariant
              />
            </FormControl>
            <FormControl flex={1} isRequired isInvalid={!date}>
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
            <FormControl isRequired isInvalid={!location}>
              <RadioGroup
                value={location}
                onChange={v => setLocation(v as Location)}
              >
                <Stack
                  direction={{base: 'column', sm: 'row'}}
                  spacing={{base: 2, sm: 6}}
                >
                  {LOCATION_OPTIONS.map(o => (
                    <Radio key={o.value} value={o.value}>
                      {o.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>
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
            <FormControl isRequired isInvalid={!salutation}>
              <FormLabel fontSize="sm">{t('aanhef')}</FormLabel>
              <RadioGroup
                value={salutation}
                onChange={v => setSalutation(v as Salutation)}
              >
                <Stack direction="row" spacing={6}>
                  {SALUTATION_OPTIONS.map(o => (
                    <Radio key={o.value} value={o.value}>
                      {o.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* Voorletters en Achternaam */}
            <Flex
              gap={{base: 4, md: 6}}
              direction={{base: 'column', md: 'row'}}
            >
              <FormControl
                flex={1}
                isRequired
                isInvalid={initials.trim().length === 0}
              >
                <FormLabel fontSize="sm">{t('voorletters')}</FormLabel>
                <Input
                  value={initials}
                  onChange={e => setInitials(e.target.value)}
                  size="sm"
                  placeholder={t('voorllettersPlaceholder')}
                />
              </FormControl>
              <FormControl
                flex={1}
                isRequired
                isInvalid={clientName.trim().length === 0}
              >
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
            <FormControl isRequired isInvalid={birthDate.length === 0}>
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
              <FormControl
                flex={1}
                isRequired
                isInvalid={postalCode.trim().length === 0}
              >
                <FormLabel fontSize="sm">{t('postcode')}</FormLabel>
                <Input
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  size="sm"
                  placeholder={t('postcodePlaceholder')}
                />
              </FormControl>
              <FormControl
                flex={1}
                isRequired
                isInvalid={houseNumber.trim().length === 0}
              >
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
              <FormControl
                flex={1}
                isRequired
                isInvalid={address.trim().length === 0}
              >
                <FormLabel fontSize="sm">{t('straatnaam')}</FormLabel>
                <Input
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  size="sm"
                  placeholder={t('straatnaamPlaceholder')}
                />
              </FormControl>
              <FormControl
                flex={1}
                isRequired
                isInvalid={city.trim().length === 0}
              >
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
              <FormControl
                flex={1}
                isRequired
                isInvalid={phoneOne.trim().length === 0}
              >
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
            <FormControl isRequired isInvalid={email.trim().length === 0}>
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
              <FormControl
                flex={1}
                isRequired
                isInvalid={insurance.trim().length === 0}
              >
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
              <FormControl
                flex={1}
                isRequired
                isInvalid={specialist.trim().length === 0}
              >
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
          {!areAllFieldsValid && (
            <Alert status="warning" mt={4}>
              <AlertIcon />
              Vul alle verplichte velden in om verder te gaan.
            </Alert>
          )}
        </Box>

        {/* Submit button */}
        <Flex justifyContent={{base: 'stretch', sm: 'flex-end'}} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{base: 'full', sm: 'auto'}}
            isDisabled={!areAllFieldsValid}
          >
            {areAllFieldsValid
              ? t('saveAndSelectForm')
              : 'Vul verplichte velden in'}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};
