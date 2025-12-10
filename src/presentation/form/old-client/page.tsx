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
  LOCATIE_OPTIES,
  AANHEF_OPTIES,
  BEHANDELAARS,
  ZORGVERZEKERAARS,
  Locatie,
  Aanhef,
} from '@/presentation/form/constants/formConstants';
import {
  DropdownField,
  DropdownType,
} from '@/presentation/base/input/dropdownField';
import { useAppDispatch, useAppSelector } from '@/domain/store/hooks';
import { setClientData } from '@/domain/store/slices/formData';
import { focusAndHighlightInvalidFields } from '@/utils/warningNavigationMap';

export const FormOldClientPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();
  const existingClient = useAppSelector(s => s.formData.client);

  const [practitionerId, setPractitionerId] = useState<string | undefined>(
    existingClient?.practitionerId
  );
  const [date, setDate] = useState(
    existingClient?.date ? existingClient.date : ''
  );
  const [location, setLocation] = useState<Locatie | ''>(
    existingClient?.location || ''
  );
  const [salutation, setSalutation] = useState<Aanhef | ''>(
    existingClient?.salutation || ''
  );
  const [initials, setInitials] = useState(existingClient?.initials || '');
  const [clientName, setClientName] = useState(
    existingClient?.clientName || ''
  );
  const [birthDate, setBirthDate] = useState(existingClient?.birthDate || '');
  const [address, setAddress] = useState(existingClient?.address || '');
  const [postalCode, setPostalCode] = useState(
    existingClient?.postalCode || ''
  );
  const [houseNumber, setHouseNumber] = useState(
    existingClient?.houseNumber || ''
  );
  const [city, setCity] = useState(existingClient?.city || '');
  const [email, setEmail] = useState(existingClient?.email || '');
  const [insurance, setInsurance] = useState(existingClient?.insurance || '');
  const [specialist, setSpecialist] = useState(
    existingClient?.specialist || ''
  );
  const [phoneOne, setPhoneOne] = useState(existingClient?.phoneOne || '');
  const [phoneTwo, setPhoneTwo] = useState(existingClient?.phoneTwo || '');
  const [medischeIndicatie, setMedischeIndicatie] = useState(
    existingClient?.medischeIndicatie || ''
  );
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
    if (!initials.trim()) {
      missing.push({ fieldName: t('initials'), fieldId: 'field-voorletters' });
    }
    if (!clientName.trim()) {
      missing.push({ fieldName: t('lastName'), fieldId: 'field-achternaam' });
    }
    if (!birthDate) {
      missing.push({ fieldName: t('birthDate'), fieldId: 'field-geboortedatum' });
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
        specialist,
      })
    );

    // Navigeer naar form selection page
    router.push(Routes.form_selection);
  };

  return (
    <BaseLayout
      title={t('existingClientForm')}
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
        <Box id="client-data-section">
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
            <FormControl>
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
            <Box id="field-geboortedatum">
              <FormControl isRequired isInvalid={birthDate.length === 0}>
                <FormLabel fontSize="sm">{t('birthDate')}</FormLabel>
                <Box>
                  <DatePickerField
                    date={birthDate ? new Date(birthDate) : undefined}
                    onDateChanged={d => d && setBirthDate(d.toISOString())}
                    isSmallVariant
                  />
                </Box>
              </FormControl>
            </Box>
          </Flex>
        </Box>
        <Divider />
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
            <Flex
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('postalCode')}</FormLabel>
                <Input
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  size="sm"
                  placeholder={t('postalCodePlaceholder')}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('houseNumber')}</FormLabel>
                <Input
                  value={houseNumber}
                  onChange={e => setHouseNumber(e.target.value)}
                  size="sm"
                  placeholder={t('houseNumberPlaceholder')}
                />
              </FormControl>
            </Flex>
            <Flex
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('streetName')}</FormLabel>
                <Input
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  size="sm"
                  placeholder={t('streetNamePlaceholder')}
                />
              </FormControl>
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('city')}</FormLabel>
                <Input
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  size="sm"
                  placeholder={t('cityPlaceholder')}
                />
              </FormControl>
            </Flex>
          </Flex>
        </Box>
        <Divider />
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
            <Flex
              gap={{ base: 4, md: 6 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('phone1')}</FormLabel>
                <Input
                  type="tel"
                  value={phoneOne}
                  onChange={e => setPhoneOne(e.target.value)}
                  size="sm"
                  placeholder={t('phone1Placeholder')}
                />
              </FormControl>
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
            <FormControl>
              <FormLabel fontSize="sm">{t('email')}</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                size="sm"
                placeholder={t('emailPlaceholder')}
              />
            </FormControl>
          </Flex>
        </Box>
        <Divider />
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
              <FormControl flex={1}>
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
              <FormControl flex={1}>
                <FormLabel fontSize="sm">{t('specialistGp')}</FormLabel>
                <Input
                  value={specialist}
                  onChange={e => setSpecialist(e.target.value)}
                  size="sm"
                  placeholder={t('specialistGpPlaceholder')}
                />
              </FormControl>
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

        <Flex justifyContent={{ base: 'stretch', sm: 'flex-end' }} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{ base: 'full', sm: 'auto' }}
          >
            {t('saveAndContinue')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormOldClientPage;
