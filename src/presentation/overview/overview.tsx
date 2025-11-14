import React from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
import {Button, Divider, Flex, SimpleGrid, Text} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../routes';

export const OverviewPage = () => {
  const router = useRouter();

  return (
    <BaseLayout title={'title'}>
      <Flex
        w={'full'}
        h={'full'}
        bg={'white'}
        borderRadius={'2'}
        flex={'1'}
        p={4}
        direction="column"
        gap={6}
      >
        <Text variant={'title'} w={'full'} noOfLines={1}>
          {'forms'}
        </Text>

        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={4}>
          <Button
            variant={'primary'}
            p={4}
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_new_client);
            }}
          >
            {'new_client_form'}
          </Button>
          <Button
            variant={'primary'}
            p={4}
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_old_client);
            }}
          >
            {'old_client_form'}
          </Button>
        </SimpleGrid>
      </Flex>

      <Divider />

      <Flex
<<<<<<< HEAD
        w={'full'}
        h={'full'}
        bg={'white'}
        borderRadius={'2'}
        flex={'1'}
=======
        gap={{base: 4, md: 6}}
        direction="column"
        border="1px solid"
        borderColor="inherit"
        borderRadius="md"
>>>>>>> origin/main
        p={4}
        direction="column"
        gap={6}
      >
        <Text variant={'title'} w={'full'} noOfLines={1}>
          {'Intake Formulieren'}
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <Button
            variant={'secondary'}
            p={4}
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_vlos);
            }}
          >
            Intake VLOS
          </Button>
          <Button
            variant={'secondary'}
            p={4}
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_pulman);
            }}
          >
            Intake Pulman
          </Button>
          <Button
            variant={'secondary'}
            p={4}
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_osb);
            }}
          >
            Intake OSB
          </Button>
          <Button
            variant={'secondary'}
            p={4}
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_ovac);
            }}
          >
            Intake OVAC
          </Button>
          <Button
            variant={'secondary'}
            p={4}
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_steunzolen);
            }}
          >
            Intake Steunzolen
          </Button>
        </SimpleGrid>
      </Flex>
    </BaseLayout>
  );
};
