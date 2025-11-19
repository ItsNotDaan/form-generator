import React, {useState} from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
import {
  Box,
  Flex,
  Text,
  Button,
  Alert,
  AlertIcon,
  Divider,
  Code,
  useToast,
  Heading,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {useAppSelector} from '@/domain/store/hooks';
import {
  PRACTITIONERS,
  LOCATION_OPTIONS,
  SALUTATION_OPTIONS,
  OMSLUITING_OPTIONS,
  SUPPLEMENT_TYPES,
  HAKSOORT_OPTIONS,
  LOOPZOOL_OPTIONS,
  SLUITING_OPTIONS,
  HAKSCHORING_TYPES,
  YES_NO,
  OPENSTAND_OPTIONS,
} from '@/presentation/form/constants/formConstants';

export const FormResultsPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const toast = useToast();
  const formData = useAppSelector(state => state.formData);

  // If no client data exists, redirect to new client page
  React.useEffect(() => {
    if (!formData.client) {
      router.push(Routes.form_new_client);
    }
  }, [formData.client, router]);

  if (!formData.client) {
    return null;
  }

  // Generate complete JSON with all data and constants
  const generateCompleteJSON = () => {
    const constants = {
      practitioners: PRACTITIONERS,
      locationOptions: LOCATION_OPTIONS,
      salutationOptions: SALUTATION_OPTIONS,
      omsluitingOptions: OMSLUITING_OPTIONS,
      supplementTypes: SUPPLEMENT_TYPES,
      haksoortOptions: HAKSOORT_OPTIONS,
      loopzoolOptions: LOOPZOOL_OPTIONS,
      sluitingOptions: SLUITING_OPTIONS,
      hakschoringTypes: HAKSCHORING_TYPES,
      yesNoOptions: YES_NO,
      openstandOptions: OPENSTAND_OPTIONS,
    };

    return {
      clientData: formData.client,
      intakeVLOS: formData.intakeVLOS,
      intakePulman: formData.intakePulman,
      intakeRebacare: formData.intakeRebacare,
      intakeOSB: formData.intakeOSB,
      intakeOVAC: formData.intakeOVAC,
      intakeSteunzolen: formData.intakeSteunzolen,
      constants,
      generatedAt: new Date().toISOString(),
    };
  };

  const jsonData = generateCompleteJSON();
  const jsonString = JSON.stringify(jsonData, null, 2);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      toast({
        title: t('jsonCopied'),
        description: t('jsonCopiedDescription'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const renderFieldValue = (label: string, value: any) => {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    let displayValue = value;
    if (typeof value === 'boolean') {
      displayValue = value ? t('ja') : t('nee');
    } else if (typeof value === 'object') {
      displayValue = JSON.stringify(value);
    }

    return (
      <Box key={label}>
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">
          {label}:
        </Text>
        <Text fontSize="md" mb={2}>
          {displayValue}
        </Text>
      </Box>
    );
  };

  const renderSection = (title: string, data: any) => {
    if (!data) {
      return null;
    }

    return (
      <Box>
        <Heading size="md" mb={3}>
          {title}
        </Heading>
        <VStack align="stretch" spacing={2}>
          {Object.entries(data).map(([key, value]) =>
            renderFieldValue(key, value)
          )}
        </VStack>
      </Box>
    );
  };

  return (
    <BaseLayout
      title={t('formResults')}
      showBackButton={true}
      onBackButtonClicked={() => router.push(Routes.overview)}
    >
      <Flex
        w="full"
        direction="column"
        bg="white"
        p={{base: 4, md: 6}}
        borderRadius="md"
        gap={{base: 4, md: 6}}
      >
        <Box>
          <Heading size="lg" mb={2}>
            {t('formResultsTitle')}
          </Heading>
          <Text fontSize="md" color="gray.600">
            {t('formResultsDescription')}
          </Text>
        </Box>

        <Alert status="success">
          <AlertIcon />
          {t('formDataComplete')}
        </Alert>

        {/* Display all form data */}
        <Box>
          <Heading size="md" mb={4}>
            {t('submittedData')}
          </Heading>

          {renderSection(t('clientData'), formData.client)}

          {formData.intakeVLOS && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeVlos'), formData.intakeVLOS)}
            </>
          )}

          {formData.intakePulman && (
            <>
              <Divider my={4} />
              {renderSection(t('intakePulman'), formData.intakePulman)}
            </>
          )}

          {formData.intakeRebacare && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeRebacare'), formData.intakeRebacare)}
            </>
          )}

          {formData.intakeOSB && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeOsb'), formData.intakeOSB)}
            </>
          )}

          {formData.intakeOVAC && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeOvac'), formData.intakeOVAC)}
            </>
          )}

          {formData.intakeSteunzolen && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeSteunzolen'), formData.intakeSteunzolen)}
            </>
          )}
        </Box>

        <Divider />

        {/* JSON Output Section */}
        <Box>
          <HStack mb={4} justify="space-between">
            <Heading size="md">{t('jsonOutput')}</Heading>
            <Button colorScheme="blue" onClick={handleCopyJSON}>
              {t('copyJson')}
            </Button>
          </HStack>

          <Text fontSize="sm" color="gray.600" mb={3}>
            {t('jsonOutputDescription')}
          </Text>

          <Box
            bg="gray.50"
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            maxH="500px"
            overflowY="auto"
          >
            <Code
              display="block"
              whiteSpace="pre"
              fontSize="sm"
              p={0}
              bg="transparent"
            >
              {jsonString}
            </Code>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Flex gap={4} justifyContent="flex-end" mt={4}>
          <Button
            variant="outline"
            onClick={() => router.push(Routes.form_selection)}
          >
            {t('fillAnotherForm')}
          </Button>
          <Button
            variant="primary"
            onClick={() => router.push(Routes.overview)}
          >
            {t('backToOverview')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};
