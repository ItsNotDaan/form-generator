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
  Button,
  SimpleGrid,
  Radio,
  RadioGroup,
  Alert,
  AlertIcon,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {useAppDispatch} from '@/domain/store/hooks';
import {setIntakeOSBData} from '@/domain/store/slices/formData';
import {
  PAARTYPE_OPTIES,
  DOEL_OPTIES,
  LOOPFUNCTIE_OPTIES,
  LEVERANCIER_OPTIES,
} from '@/presentation/form/constants/formConstants';

const FormIntakeOSBPage = () => {
  const {t} = useTranslation('form');
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
  const [steunzoolCorrectieMiddenvoet, setSteunzoolCorrectieMiddenvoet] =
    useState('');
  const [steunzoolCorrectieVoorvoet, setSteunzoolCorrectieVoorvoet] =
    useState('');
  const [steunzoolVvPellote, setSteunzoolVvPellote] = useState('');
  const [steunzoolHakVerhogingLinks, setSteunzoolHakVerhogingLinks] =
    useState('');
  const [steunzoolHakVerhogingRechts, setSteunzoolHakVerhogingRechts] =
    useState('');
  const [bijzonderheden, setBijzonderheden] = useState('');

  // Validation helpers
  const getMissingFields = (): Array<{fieldName: string; fieldId: string}> => {
    const missing: Array<{fieldName: string; fieldId: string}> = [];
    // No required fields for OSB
    return missing;
  };
  const areAllFieldsValid = getMissingFields().length === 0;

  // Submit handler
  const handleSubmit = () => {
    if (!areAllFieldsValid) {
      return;
    }
    dispatch(
      setIntakeOSBData({
        welkPaar,
        loopfunctie,
        leverancier,
        productSpecificaties: {artCode, lengteMaat, wijdte},
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
      })
    );
    router.push('/form-results');
  };

  // Render
  return (
    <BaseLayout
      title={t('intakeOsb')}
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
        {/* Example: Basiscode block */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            Basiscode
          </Text>
          <Input
            placeholder="Vul basiscode in"
            value={basiscode}
            onChange={e => setBasiscode(e.target.value)}
            size="sm"
          />
        </Box>
        <Divider />
        {/* ...rest of the form, similar to OSA, using the correct state and handlers... */}
        {/* Show validation alert if needed */}
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
        <Flex justifyContent={{base: 'stretch', sm: 'flex-end'}} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{base: 'full', sm: 'auto'}}
          >
            {t('opslaanEnDoorgaan')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormIntakeOSBPage;
