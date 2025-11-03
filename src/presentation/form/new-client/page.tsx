import React, { useState, ChangeEvent, useEffect } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import { Box, Flex, Text, FormControl, FormLabel, Checkbox, Button, Divider } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '../../routes';
import { TextField } from '@/presentation/base/input/textField';
import { DatePickerField } from '@/presentation/base/input/datePickerField';
import { DropdownField, DropdownType } from '@/presentation/base/input/dropdownField';
// using Chakra Checkbox directly for location toggles
import { RadioField } from '@/presentation/base/input/radioField';
import { RightArrowIcon } from '@/presentation/base/icon/rightArrow';
import { DEV_CLIENT_MIDDLEWARE_MANIFEST } from 'next/dist/shared/lib/constants';

export const FormNewClientPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');

  const [fileNumber, setFileNumber] = useState('');
  const [date, setDate] = useState('');
  // osaVlos: 'OSA' | 'VLOS'
  const [osaVlos, setOsaVlos] = useState<string | undefined>(undefined);
  const [locations, setLocations] = useState<Record<string, boolean>>({
    FZ: false,
    FM: false,
    NN: false,
    MMC: false,
    AMC: false,
  });
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [salutation, setSalutation] = useState<string>('');
  const [initials, setInitials] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [city, setCity] = useState(''); // Added state for city
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [insurance, setInsurance] = useState('');
  const [bsn, setBsn] = useState('');
  const [practitionerId, setPractitionerId] = useState<string | undefined>(undefined);
  const [phoneOne, setPhoneOne] = useState('');
  const [phoneTwo, setPhoneTwo] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [familyDoctor, setFamilyDoctor] = useState('');

  // temporary practitioner list (move to global store if needed)
  const practitioners = [
    { label: 'Dr. Jan de Vries', value: 'p1' },
    { label: 'Dr. Anna Jansen', value: 'p2' },
    { label: 'Dr. Piet van Dijk', value: 'p3' },
  ];

  return (
    <BaseLayout
      title={t('new-client')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <Flex
        w={'full'}
        h={'full'}
        bg={'white'}
        borderRadius={'2'}
        flex={'1'}
        p={4}
        direction="column"
        gap={4}
      >
        <Flex direction="column" gap={4}>
          <FormControl as={Flex} direction="column" gap={4}>
            {/* Behandelaar selector */}
            <Flex gap={4} alignItems="center">
              <FormControl>
                <FormLabel mb={2}>Behandelaar:</FormLabel>
                <DropdownField
                  type={DropdownType.SINGLE_NON_CREATABLE}
                  items={practitioners}
                  item={practitionerId}
                  onItemSelected={item => setPractitionerId(item?.value)}
                  placeholder={t('choosePractitioner')}
                  isSmallVariant
                />
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel mb={2}>Aanmeetdatum:</FormLabel>
              <DatePickerField
                date={date ? new Date(date) : undefined}
                onDateChanged={d => d && setDate(d.toISOString())}
                isSmallVariant
              />
            </FormControl>

            {/* Eerste rij */}
            <Flex gap={4} alignItems="center">
              {/* OSA/VLOS Checkboxen */}
              <FormControl>
                <FormLabel mb={2}>OSA of VLOS:</FormLabel>
                <RadioField
                  items={[{ label: 'OSA', value: 'OSA' }, { label: 'VLOS', value: 'VLOS' }]}
                  value={osaVlos}
                  onItemSelected={(item: any) => setOsaVlos(item?.value)}
                  stackProps={{ spacing: '4' }}
                />
              </FormControl>

              {/* Locatie checkboxes */}
              <FormControl>
                <FormLabel mb={2}>Locatie:</FormLabel>
                <RadioField
                  items={[
                    { label: 'FZ', value: 'FZ' },
                    { label: 'FM', value: 'FM' },
                    { label: 'NN', value: 'NN' },
                    { label: 'MMC', value: 'MMC' },
                    { label: 'AMC', value: 'AMC' }
                  ]}
                  value={Object.keys(locations).find(key => locations[key])}
                  onItemSelected={(item: any) => {
                    const newLocations: Record<string, boolean> = {};
                    Object.keys(locations).forEach(key => {
                      newLocations[key] = key === item?.value;
                    });
                    setLocations(newLocations);
                  }}
                  stackProps={{ direction: 'row', spacing: '4' }}
                />
              </FormControl>
            </Flex>

            <Divider />

            <Flex gap={4} alignItems="center">
              {/* Aanhef, Voorletters, Achternaam */}
              <FormControl>
                <FormLabel mb={2}>Aanhef:</FormLabel>
                <RadioField
                  items={[{ label: 'Mw.', value: 'Mw.' }, { label: 'Dhr.', value: 'Dhr.' }, { label: 'Mej.', value: 'Mej.' }]}
                  value={salutation}
                  onItemSelected={(item: any) => setSalutation(item?.value)}
                  stackProps={{ direction: 'row', spacing: '4' }}
                />
                <TextField label="Voorletters:" value={initials} onTextChanged={setInitials} isSmallVariant />
                <TextField label="Achternaam:" value={clientName} onTextChanged={setClientName} isSmallVariant />
              </FormControl>

              <Divider orientation="vertical" />

              <FormControl>
                <FormLabel mb={2}>Geboortedatum:</FormLabel>
                <DatePickerField
                  date={birthDate ? new Date(birthDate) : undefined}
                  onDateChanged={(date) => date && setBirthDate(date.toISOString())}
                  isSmallVariant
                />
              </FormControl>
            </Flex>

            <Divider />

            {/* Huisnummer, Huisadres, Postcode/woonplaats */}
            <Flex gap={4}>
              <TextField label="Postcode:" value={postalCode} onTextChanged={setPostalCode} isSmallVariant />
              <TextField label="Huisnummer:" value={houseNumber} onTextChanged={setHouseNumber} isSmallVariant />
              <TextField label="Stad:" value={city} onTextChanged={setCity} isSmallVariant />
              <TextField label="Straatnaam:" value={address} onTextChanged={setAddress} isSmallVariant />
            </Flex>

            {/* Telefoon + Email */}
            <Flex gap={4}>
              <TextField label="Tel 1:" value={phoneOne} onTextChanged={setPhoneOne} isSmallVariant type="tel" />
              <TextField label="Tel 2:" value={phoneTwo} onTextChanged={setPhoneTwo} isSmallVariant type="tel" />
            </Flex>

            <Flex gap={4}>
              <TextField label="Emailadres:" value={email} onTextChanged={setEmail} isSmallVariant type="email" />
            </Flex>

            {/* Verzekering + Specialist */}
            <Flex gap={4}>
              <TextField label="Verz.maatschappij:" value={insurance} onTextChanged={setInsurance} isSmallVariant />
              <TextField label="Specialist:" value={specialist} onTextChanged={setSpecialist} isSmallVariant />
            </Flex>
          </FormControl>

          {/* Offerte/Factuur checkboxes removed per request */}

          {/* Next page button */}
          <Flex justifyContent="flex-end" mt={4}>
            <Button
              variant={'primary'}
              p={4}
              onClick={event => {
                event.preventDefault();
                router.push(Routes.form_intake_osa_vlos);
              }}
            >
              {t('OSA/VLOS')}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </BaseLayout >
  );
};
