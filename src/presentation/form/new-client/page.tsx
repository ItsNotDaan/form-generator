import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
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
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '../../routes';
import { DatePickerField } from '@/presentation/base/input/datePickerField';
import {
  DropdownField,
  DropdownType,
} from '@/presentation/base/input/dropdownField';
import {
  LOCATIE_OPTIES,
  AANHEF_OPTIES,
  BEHANDELAARS,
  ZORGVERZEKERAARS,
  Locatie,
  Aanhef,
} from '@/presentation/form/constants/formConstants';
import { useAppDispatch } from '@/domain/store/hooks';
import { setClientData } from '@/domain/store/slices/formData';
import { focusAndHighlightInvalidFields } from '@/utils/warningNavigationMap';

export const FormNewClientPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor client data
  const [date, setDate] = useState('');
  const [location, setLocation] = useState<Locatie | ''>('');
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [salutation, setSalutation] = useState<Aanhef | ''>('');
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

  // Validation: check which required fields are missing
  const getMissingFields = (): Array<{ fieldName: string; fieldId: string }> => {
    const missing: Array<{ fieldName: string; fieldId: string }> = [];

    if (!practitionerId) {
      missing.push({ fieldName: t('behandelaar'), fieldId: 'field-behandelaar' });
    }
    if (!date) {
      missing.push({ fieldName: t('aanmeetdatum'), fieldId: 'field-aanmeetdatum' });
    }
    if (!location) {
      missing.push({ fieldName: t('locatie'), fieldId: 'field-locatie' });
    }
    if (!salutation) {
      missing.push({ fieldName: t('aanhef'), fieldId: 'field-aanhef' });
    }
    if (!initials.trim()) {
      missing.push({ fieldName: t('voorletters'), fieldId: 'field-voorletters' });
    }
    if (!clientName.trim()) {
      missing.push({ fieldName: t('achternaam'), fieldId: 'field-achternaam' });
    }
    if (!birthDate) {
      missing.push({ fieldName: t('geboortedatum'), fieldId: 'field-geboortedatum' });
    }
    if (!address.trim()) {
      missing.push({ fieldName: t('straatnaam'), fieldId: 'field-straatnaam' });
    }
    if (!postalCode.trim()) {
      missing.push({ fieldName: t('postcode'), fieldId: 'field-postcode' });
    }
    if (!houseNumber.trim()) {
      missing.push({ fieldName: t('huisnummer'), fieldId: 'field-huisnummer' });
    }
    if (!city.trim()) {
      missing.push({ fieldName: t('stad'), fieldId: 'field-stad' });
    }
    if (!phoneOne.trim()) {
      missing.push({ fieldName: t('telefoon1'), fieldId: 'field-telefoon1' });
    }
    if (!email.trim()) {
      missing.push({ fieldName: t('emailadres'), fieldId: 'field-emailadres' });
    }
    if (!insurance.trim()) {
      missing.push({ fieldName: t('verzekeringsmaatschappij'), fieldId: 'field-verzekeringsmaatschappij' });
    }
    if (!specialist.trim()) {
      missing.push({ fieldName: t('specialistHuisarts'), fieldId: 'field-specialisthuisarts' });
    }

    return missing;
  };

  const areAllFieldsValid = getMissingFields().length === 0;

  const handleSubmit = () => {
    if (!areAllFieldsValid) {
      const missingFields = getMissingFields();
      focusAndHighlightInvalidFields(missingFields.map(f => f.fieldId));
      return; // Validation alert will show the missing fields
    }
    // Dispatch client data naar Redux store
    dispatch(
      setClientData({
        practitionerId,
        date,
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
        insurance,
        specialist, // Bevat nu Specialist/Huisarts
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
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        gap={{ base: 4, md: 6 }}
        id="client-data-section"
      >
        {/* Behandelaar en Aanmeetdatum */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('behandelaarEnDatum')}
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
            <FormControl flex={1} isRequired isInvalid={!practitionerId} id="field-behandelaar">
              <FormLabel fontSize="sm">{t('behandelaar')}</FormLabel>
              <DropdownField
                type={DropdownType.SINGLE_NON_CREATABLE}
                items={BEHANDELAARS}
                item={practitionerId}
                onItemSelected={item => setPractitionerId(item?.value)}
                placeholder={t('choosePractitioner')}
                isSmallVariant
              />
            </FormControl>
            <FormControl flex={1} isRequired isInvalid={!date} id="field-aanmeetdatum">
              <FormLabel fontSize="sm">{t('aanmeetdatum')}</FormLabel>
              <Box maxW={{ base: 'full', md: '300px' }}>
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
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('locatie')}
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            align="center"
            p={4}
            mt={2}
          >
            <FormControl isRequired isInvalid={!location} id="field-locatie">
              <RadioGroup
                value={location}
                onChange={v => setLocation(v as Location)}
              >
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  spacing={{ base: 2, sm: 6 }}
                >
                  {LOCATIE_OPTIES.map(o => (
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
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('persoonlijkeGegevens')}
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
            {/* Aanhef */}
            <FormControl isRequired isInvalid={!salutation} id="field-aanhef">
              <FormLabel fontSize="sm">{t('aanhef')}</FormLabel>
              <RadioGroup
                value={salutation}
                onChange={v => setSalutation(v as Salutation)}
              >
                <Stack direction="row" spacing={6}>
                  {AANHEF_OPTIES.map(o => (
                    <Radio key={o.value} value={o.value}>
                      {o.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>

            {/* Voorletters en Achternaam */}
            <Flex
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <FormControl
                flex={1}
                isRequired
                isInvalid={initials.trim().length === 0}
                id="field-voorletters"
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
                id="field-achternaam"
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
            <FormControl isRequired isInvalid={birthDate.length === 0} id="field-geboortedatum">
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
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('adresgegevens')}
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
            {/* Postcode en Huisnummer */}
            <Flex
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <FormControl
                flex={1}
                isRequired
                isInvalid={postalCode.trim().length === 0}
                id="field-postcode"
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
                id="field-huisnummer"
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
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <FormControl
                flex={1}
                isRequired
                isInvalid={address.trim().length === 0}
                id="field-straatnaam"
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
                id="field-stad"
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
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('contactgegevens')}
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
            {/* Telefoon nummers */}
            <Flex
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <FormControl
                flex={1}
                isRequired
                isInvalid={phoneOne.trim().length === 0}
                id="field-telefoon1"
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
            <FormControl isRequired isInvalid={email.trim().length === 0} id="field-emailadres">
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
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('verzekeringEnMedischeInformatie')}
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
            <Flex
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <FormControl
                flex={1}
                isRequired
                isInvalid={insurance.trim().length === 0}
                id="field-verzekeringsmaatschappij"
              >
                <FormLabel fontSize="sm">
                  {t('verzekeringsmaatschappij')}
                </FormLabel>
                <DropdownField
                  type={DropdownType.SINGLE_CREATABLE}
                  items={ZORGVERZEKERAARS}
                  item={insurance}
                  onItemSelected={item => setInsurance(item?.value || '')}
                  placeholder={t('verzekeringsmaatschappijPlaceholder')}
                  isSmallVariant
                />
              </FormControl>
              <FormControl
                flex={1}
                isRequired
                isInvalid={specialist.trim().length === 0}
                id="field-specialisthuisarts"
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
                  <ListItem key={index}>{field.fieldName}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Alert>
        )}

        {/* Submit button */}
        <Flex justifyContent={{ base: 'stretch', sm: 'flex-end' }} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{ base: 'full', sm: 'auto' }}
          >
            {t('saveAndSelectForm')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};
