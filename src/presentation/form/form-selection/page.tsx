import React from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
import {
  Box,
  Flex,
  Text,
  Button,
  SimpleGrid,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {useAppSelector, useAppDispatch} from '@/domain/store/hooks';
import {clearIntakeForms} from '@/domain/store/slices/formData';

export const FormSelectionPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // If no client data exists, redirect to new client page
  React.useEffect(() => {
    if (!clientData) {
      router.push(Routes.form_new_client);
    }
  }, [clientData, router]);

  // Clear all intake forms when entering form selection
  React.useEffect(() => {
    dispatch(clearIntakeForms());
  }, [dispatch]);

  if (!clientData) {
    return null;
  }

  return (
    <BaseLayout
      title={t('selectIntakeForm')}
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
        <Box>
          <Text fontWeight="bold" fontSize="xl" mb={2}>
            {t('clientDataSaved')}
          </Text>
          <Text fontSize="md" color="gray.600">
            {t('selectIntakeFormDescription')}
          </Text>
        </Box>

        <Alert status="info">
          <AlertIcon />
          {t('clientInfo')}: {clientData.initials} {clientData.clientName}
        </Alert>

        <Box>
          <Text fontWeight="bold" mb={3} fontSize="lg">
            {t('availableIntakeForms')}
          </Text>
          <SimpleGrid columns={{base: 1, md: 2}} spacing={4}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_vlos)}
            >
              {t('intakeVlos')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_pulman)}
            >
              {t('intakePulman')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_rebacare)}
            >
              {t('intakeRebacare')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_osb)}
            >
              {t('intakeOsb')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_ovac)}
            >
              {t('intakeOvac')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_steunzolen)}
            >
              {t('intakeSteunzolen')}
            </Button>
          </SimpleGrid>
        </Box>
      </Flex>
    </BaseLayout>
  );
};
