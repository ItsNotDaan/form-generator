import React, {memo} from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {LeftArrowIcon} from '@/presentation/base/icon/leftArrow';
import {Link} from '@/presentation/base/link';
import {Routes} from '../routes';

export interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackButtonClicked?: () => void;
}

export const PageHeader = memo(
  ({title, showBackButton, onBackButtonClicked}: PageHeaderProps) => {
    const {t} = useTranslation('common');

    return (
      <>
        <Center w={'full'} bg={'brand.700'} alignItems={'center'}>
          <Flex 
            direction={'row'} 
            w={'full'} 
            p={{base: 3, md: 5}} 
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            {/* Left: Page title with back button */}
            <Box flex={{base: '1', md: '1'}} minW={0}>
              {!title ? <Box /> : showBackButton ? (
                <Button
                  aria-label={t('common:back')}
                  px={'2'}
                  variant={'tertiaryLight'}
                  _hover={{bg: 'gray.600'}}
                  onClick={() => onBackButtonClicked?.()}
                >
                  <HStack py={'2'} spacing={{base: 1, md: 2}}>
                    <LeftArrowIcon boxSize={{base: '4', md: '5'}} color={'white'} />
                    <Text 
                      variant={'pageTitle'} 
                      ml={'1'} 
                      noOfLines={1}
                      fontSize={{base: 'sm', md: 'md', lg: 'lg'}}
                    >
                      {title}
                    </Text>
                  </HStack>
                </Button>
              ) : (
                <Text
                  variant={'pageTitle'}
                  noOfLines={1}
                  fontSize={{base: 'sm', md: 'md', lg: 'lg'}}
                  pl={{base: '2', md: '4'}}
                >
                  {title}
                </Text>
              )}
            </Box>

            {/* Center: Eemland logo */}
            <Box 
              flex={{base: '0 0 auto', md: '0 0 auto'}} 
              textAlign={'center'}
              px={{base: 2, md: 4}}
            >
              <Link href={Routes.overview}>
                <Text 
                  variant={'pageTitle'} 
                  noOfLines={1}
                  fontSize={{base: 'lg', md: 'xl'}}
                  fontWeight={'bold'}
                >
                  Eemland
                </Text>
              </Link>
            </Box>

            {/* Right: Help button */}
            <Box flex={{base: '1', md: '1'}} textAlign={'right'} minW={0}>
              <Link href={Routes.help}>
                {/* Cast button as div, so the focus will only be on Link parent component */}
                <Button variant={'tertiaryLight'} as={'div'}>
                  <HStack py={'2'} spacing={{base: 1, md: 2}}>
                    <Text 
                      fontWeight={'500'} 
                      color={'white'}
                      fontSize={{base: 'sm', md: 'md', lg: 'lg'}}
                    >
                      {t('help')}
                    </Text>
                  </HStack>
                </Button>
              </Link>
            </Box>
          </Flex>
        </Center>
      </>
    );
  }
);
