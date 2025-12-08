import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
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
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '../../routes';
import { useAppSelector } from '@/domain/store/hooks';
import { BEHANDELAARS } from '@/presentation/form/constants/formConstants';
import { generateCodes } from '@/utils/codeGenerator';
import {
  findNavigationForWarning,
  getFormRoute,
  scrollToField,
} from '@/utils/warningNavigationMap';

export const FormResultsPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
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

  // Normalize values: false/"nee" -> "", true/"ja" -> "Ja"
  // Keep all keys for Word document generation (no exclusion)
  const normalizeValue = (value: any): any => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'boolean') {
      return value ? 'Ja' : ''; // false becomes empty string, not excluded
    }
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'ja') return 'Ja';
      if (value.toLowerCase() === 'nee') return '';
      return value;
    }
    if (Array.isArray(value)) {
      return value.map(normalizeValue);
    }
    if (typeof value === 'object') {
      return normalizeObject(value);
    }
    return value;
  };

  const normalizeObject = (obj: any): any => {
    const normalized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      normalized[key] = normalizeValue(value);
    }
    return normalized;
  };

  // Generate complete JSON with all data and constants
  const generateCompleteJSON = () => {
    // Resolve practitioner ID to name
    const resolvedClientData = formData.client
      ? normalizeObject({
        ...formData.client,
        practitionerName:
          BEHANDELAARS.find(p => p.value === formData.client?.practitionerId)
            ?.label || formData.client?.practitionerId,
      })
      : null;

    // Build result object with only non-null intake forms
    const result: any = {
      clientData: resolvedClientData,
    };

    // Only include intake forms that have data (normalized)
    if (formData.intakeVLOS) {
      result.intakeVLOS = normalizeObject(formData.intakeVLOS);
    }
    if (formData.intakeOSA) {
      result.intakeOSA = normalizeObject(formData.intakeOSA);
    }
    if (formData.intakePulman) {
      result.intakePulman = normalizeObject(formData.intakePulman);
    }
    if (formData.intakeRebacare) {
      result.intakeRebacare = normalizeObject(formData.intakeRebacare);
    }
    if (formData.intakeOSB) {
      result.intakeOSB = normalizeObject(formData.intakeOSB);
    }
    if (formData.intakeOVAC) {
      result.intakeOVAC = normalizeObject(formData.intakeOVAC);
    }
    if (formData.intakeSteunzolen) {
      result.intakeSteunzolen = normalizeObject(formData.intakeSteunzolen);
    }

    // Generate medical codes if applicable
    if (formData.client && (formData.intakeVLOS || formData.intakeOSA)) {
      const { codes, warnings, generalBasiscode } = generateCodes(
        formData.client,
        {
          intakeVLOS: formData.intakeVLOS,
          intakeOSA: formData.intakeOSA,
          intakePulman: formData.intakePulman,
          intakeRebacare: formData.intakeRebacare,
          intakeOSB: formData.intakeOSB,
          intakeOVAC: formData.intakeOVAC,
          intakeSteunzolen: formData.intakeSteunzolen,
        }
      );

      // Group normalized codes under medicalCodes object
      result.medicalCodes = normalizeObject(codes);

      // Add generalBasiscode to the appropriate intake data
      if (generalBasiscode) {
        if (formData.intakeVLOS && result.intakeVLOS) {
          result.intakeVLOS.generalBasiscode = generalBasiscode;
        }
        if (formData.intakeOSA && result.intakeOSA) {
          result.intakeOSA.generalBasiscode = generalBasiscode;
        }
      }

      // Add warnings if any
      if (warnings.length > 0) {
        result.codeWarnings = warnings;
      }
    }

    result.generatedAt = new Date().toISOString();

    return result;
  };

  const jsonData = generateCompleteJSON();
  const jsonString = JSON.stringify(jsonData, null, 2);
  const codeWarnings = jsonData.codeWarnings as string[] | undefined;

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
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        gap={{ base: 4, md: 6 }}
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

        {/* Display code generation warnings if any */}
        {codeWarnings && codeWarnings.length > 0 && (
          <Alert status="warning" flexDirection="column" alignItems="flex-start">
            <HStack mb={2}>
              <AlertIcon />
              <Text fontWeight="bold">{t('codeWarnings')}:</Text>
            </HStack>
            <VStack align="stretch" spacing={2} ml={6}>
              {codeWarnings.map((warning, idx) => {
                const navInfo = findNavigationForWarning(warning);
                return (
                  <HStack key={idx} justify="space-between">
                    <Text>{warning}</Text>
                    {navInfo && (
                      <Button
                        size="sm"
                        colorScheme="orange"
                        variant="outline"
                        onClick={() => {
                          router.push(getFormRoute(navInfo.formType), undefined, {
                            shallow: true,
                          });
                          // Use setTimeout to ensure navigation completes before scrolling
                          setTimeout(() => {
                            scrollToField(navInfo.fieldId);
                          }, 100);
                        }}
                      >
                        {t('goToField', {
                          fieldLabel: navInfo.fieldLabel,
                        })}
                      </Button>
                    )}
                  </HStack>
                );
              })}
            </VStack>
          </Alert>
        )}

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

          {formData.intakeOSA && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeOsa'), formData.intakeOSA)}
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
