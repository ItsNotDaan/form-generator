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
  Textarea,
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
  const [medischeIndicatie, setMedischeIndicatie] = useState('');
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
      missing.push({
        fieldName: t('practitioner'),
        fieldId: 'field-behandelaar',
      });
    }
    if (!date) {
      missing.push({
        fieldName: t('measurementDate'),
        fieldId: 'field-aanmeetdatum',
      });
    }
    if (!location) {
      missing.push({ fieldName: t('location'), fieldId: 'field-locatie' });
    }
    if (!salutation) {
      missing.push({ fieldName: t('salutation'), fieldId: 'field-aanhef' });
    }
    if (!initials.trim()) {
      missing.push({ fieldName: t('initials'), fieldId: 'field-voorletters' });
    }
    if (!clientName.trim()) {
      missing.push({ fieldName: t('lastName'), fieldId: 'field-achternaam' });
    }
    if (!birthDate) {
      missing.push({ fieldName: t('birthDate'), fieldId: 'field-geboortedatum' });
    }
    if (!address.trim()) {
      missing.push({ fieldName: t('streetName'), fieldId: 'field-straatnaam' });
    }
    if (!postalCode.trim()) {
      missing.push({ fieldName: t('postalCode'), fieldId: 'field-postcode' });
    }
    if (!houseNumber.trim()) {
      missing.push({ fieldName: t('houseNumber'), fieldId: 'field-huisnummer' });
    }
    if (!city.trim()) {
      missing.push({ fieldName: t('city'), fieldId: 'field-stad' });
    }
    if (!phoneOne.trim()) {
      missing.push({ fieldName: t('phone1'), fieldId: 'field-telefoon1' });
    }
    if (!email.trim()) {
      missing.push({ fieldName: t('email'), fieldId: 'field-emailadres' });
    }
    if (!insurance.trim()) {
      missing.push({
        fieldName: t('insuranceCompany'),
        fieldId: 'field-verzekeringsmaatschappij',
      });
    }
    if (!specialist.trim()) {
      missing.push({
        fieldName: t('specialistGp'),
        fieldId: 'field-specialisthuisarts',
      });
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
        medischeIndicatie,
        insurance,
        specialist, // Bevat nu Specialist/Huisarts
      })
    );

    // Navigeer naar form selection page
    router.push(Routes.form_selection);
  };

  return (
    <BaseLayout
      title={t('newClientForm')}
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
            {t('practitionerAndDate')}
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
            <Box id="field-behandelaar">
              <FormControl flex={1} isRequired isInvalid={!practitionerId}>
                <FormLabel fontSize="sm">{t('practitioner')}</FormLabel>
                <DropdownField
                  type={DropdownType.SINGLE_NON_CREATABLE}
                  items={BEHANDELAARS}
                  item={practitionerId}
                  onItemSelected={item => setPractitionerId(item?.value)}
                  placeholder={t('choosePractitioner')}
                  isSmallVariant
                />
              </FormControl>
            </Box>
            <Box id="field-aanmeetdatum">
              <FormControl flex={1} isRequired isInvalid={!date}>
                <FormLabel fontSize="sm">{t('measurementDate')}</FormLabel>
                <Box maxW={{ base: 'full', md: '300px' }}>
                  <DatePickerField
                    date={date ? new Date(date) : undefined}
                    onDateChanged={d => d && setDate(d.toISOString())}
                    isSmallVariant
                  />
                </Box>
              </FormControl>
            </Box>
          </Flex>
        </Box>
        <Divider />
        {/* Locatie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('location')}
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
            <Box id="field-locatie">
              <FormControl isRequired isInvalid={!location}>
                <RadioGroup
                  value={location}
                  onChange={v => setLocation(v as Locatie)}
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
            </Box>
          </Flex>
        </Box>
        <Divider />
        {/* Persoonlijke gegevens */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('personalInformation')}
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
            <Box id="field-aanhef">
              <FormControl isRequired isInvalid={!salutation}>
                <FormLabel fontSize="sm">{t('salutation')}</FormLabel>
                <RadioGroup
                  value={salutation}
                  onChange={v => setSalutation(v as Aanhef)}
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
            </Box>

            {/* Voorletters en Achternaam */}
            <Flex
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Box id="field-voorletters" flex={1}>
                <FormControl
                  isRequired
                  isInvalid={initials.trim().length === 0}
                >
                  <FormLabel fontSize="sm">{t('initials')}</FormLabel>
                  <Input
                    value={initials}
                    onChange={e => setInitials(e.target.value)}
                    size="sm"
                    placeholder={t('initialsPlaceholder')}
                  />
                </FormControl>
              </Box>
              <Box id="field-achternaam" flex={1}>
                <FormControl
                  isRequired
                  isInvalid={clientName.trim().length === 0}
                >
                  <FormLabel fontSize="sm">{t('lastName')}</FormLabel>
                  <Input
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    size="sm"
                    placeholder={t('lastNamePlaceholder')}
                  />
                </FormControl>
              </Box>
            </Flex>

            {/* Geboortedatum */}
            <Box id="field-geboortedatum">
              <FormControl isRequired isInvalid={birthDate.length === 0}>
                <FormLabel fontSize="sm">{t('birthDate')}</FormLabel>
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
            </Box>
          </Flex>
        </Box>
        <Divider />
        {/* Adresgegevens */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('addressInformation')}
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
              <Box id="field-postcode" flex={1}>
                <FormControl
                  isRequired
                  isInvalid={postalCode.trim().length === 0}
                >
                  <FormLabel fontSize="sm">{t('postalCode')}</FormLabel>
                  <Input
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    size="sm"
                    placeholder={t('postalCodePlaceholder')}
                  />
                </FormControl>
              </Box>
              <Box id="field-huisnummer" flex={1}>
                <FormControl
                  isRequired
                  isInvalid={houseNumber.trim().length === 0}
                >
                  <FormLabel fontSize="sm">{t('houseNumber')}</FormLabel>
                  <Input
                    value={houseNumber}
                    onChange={e => setHouseNumber(e.target.value)}
                    size="sm"
                    placeholder={t('houseNumberPlaceholder')}
                  />
                </FormControl>
              </Box>
            </Flex>

            {/* Straatnaam en Stad */}
            <Flex
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Box id="field-straatnaam" flex={1}>
                <FormControl isRequired isInvalid={address.trim().length === 0}>
                  <FormLabel fontSize="sm">{t('streetName')}</FormLabel>
                  <Input
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    size="sm"
                    placeholder={t('streetNamePlaceholder')}
                  />
                </FormControl>
              </Box>
              <Box id="field-stad" flex={1}>
                <FormControl isRequired isInvalid={city.trim().length === 0}>
                  <FormLabel fontSize="sm">{t('city')}</FormLabel>
                  <Input
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    size="sm"
                    placeholder={t('cityPlaceholder')}
                  />
                </FormControl>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Divider />
        {/* Contactgegevens */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('contactInformation')}
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
              <Box id="field-telefoon1" flex={1}>
                <FormControl
                  isRequired
                  isInvalid={phoneOne.trim().length === 0}
                >
                  <FormLabel fontSize="sm">{t('phone1')}</FormLabel>
                  <Input
                    type="tel"
                    value={phoneOne}
                    onChange={e => setPhoneOne(e.target.value)}
                    size="sm"
                    placeholder={t('phone1Placeholder')}
                  />
                </FormControl>
              </Box>
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('phone2')}</FormLabel>
                <Input
                  type="tel"
                  value={phoneTwo}
                  onChange={e => setPhoneTwo(e.target.value)}
                  size="sm"
                  placeholder={t('phone2Placeholder')}
                />
              </FormControl>
            </Flex>

            {/* Email */}
            <Box id="field-emailadres">
              <FormControl isRequired isInvalid={email.trim().length === 0}>
                <FormLabel fontSize="sm">{t('email')}</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  size="sm"
                  placeholder={t('emailPlaceholder')}
                />
              </FormControl>
            </Box>
          </Flex>
        </Box>
        <Divider /> {/* Verzekering en Medische info */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('insuranceAndMedicalInformation')}
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
              <Box id="field-verzekeringsmaatschappij" flex={1}>
                <FormControl
                  isRequired
                  isInvalid={insurance.trim().length === 0}
                >
                  <FormLabel fontSize="sm">{t('insuranceCompany')}</FormLabel>
                  <DropdownField
                    type={DropdownType.SINGLE_CREATABLE}
                    items={ZORGVERZEKERAARS}
                    item={insurance}
                    onItemSelected={item => setInsurance(item?.value || '')}
                    onCreateOption={value => setInsurance(value)}
                    isLoading={false}
                    placeholder={t('insuranceCompanyPlaceholder')}
                    isSmallVariant
                  />
                </FormControl>
              </Box>
              <Box id="field-specialisthuisarts" flex={1}>
                <FormControl
                  isRequired
                  isInvalid={specialist.trim().length === 0}
                >
                  <FormLabel fontSize="sm">{t('specialistGp')}</FormLabel>
                  <Input
                    value={specialist}
                    onChange={e => setSpecialist(e.target.value)}
                    size="sm"
                    placeholder={t('specialistGpPlaceholder')}
                  />
                </FormControl>
              </Box>
            </Flex>

            {/* Medische Indicatie */}
            <Box>
              <FormControl>
                <FormLabel fontSize="sm">{t('medicalIndication')}</FormLabel>
                <Textarea
                  value={medischeIndicatie}
                  onChange={e => setMedischeIndicatie(e.target.value)}
                  placeholder={t('medicalIndicationPlaceholder')}
                  minH={{ base: '80px', md: '100px' }}
                  size="sm"
                />
              </FormControl>
            </Box>
          </Flex>
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
