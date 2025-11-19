import React, { memo } from 'react';
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { LeftArrowIcon } from '@/presentation/base/icon/leftArrow';
import { Link } from '@/presentation/base/link';
import { Routes } from '../routes';

export interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackButtonClicked?: () => void;
}

export const PageHeader = memo(
  ({ title, showBackButton, onBackButtonClicked }: PageHeaderProps) => {
    const { t } = useTranslation('common');

    return (
      <>
        <Box w={'full'} bg={'brand.700'} boxShadow={'md'}>

          {/* Desktop & Tablet Layout */}
          <Box display={{ base: 'none', md: 'block' }}>
            <Flex
              maxW={'1400px'}
              mx={'auto'}
              px={3}
              py={4}
              alignItems={'center'}
              position={'relative'}
            >
              {/* Left: Back button */}
              <Flex justifyContent={'flex-start'} flex={'1'} minW={0} zIndex={1}>
                {showBackButton && (
                  <Button
                    aria-label={'common:back'}
                    variant={'tertiaryLight'}
                    _hover={{ bg: 'whiteAlpha.200' }}
                    transition={'all 0.2s'}
                    onClick={() => onBackButtonClicked?.()}
                    size={'sm'}
                    leftIcon={<LeftArrowIcon boxSize={'6'} color={'white'} />}
                  >
                    <Text
                      color={'white'}
                      fontSize={'lg'}
                      fontWeight={'600'}
                    >
                      {t('back')}
                    </Text>
                  </Button>
                )}
              </Flex>

              {/* Center: Title (absolutely centered) */}
              {title && (
                <Box
                  position={'absolute'}
                  left={'50%'}
                  transform={'translateX(-50%)'}
                  maxW={'33%'}
                >
                  <Text
                    color={'white'}
                    fontSize={'lg'}
                    fontWeight={'600'}
                    noOfLines={1}
                    textAlign={'center'}
                  >
                    {title}
                  </Text>
                </Box>
              )}

              {/* Right: Eemland Logo */}
              <Flex justifyContent={'flex-end'} flex={'1'} minW={0} zIndex={1}>
                <Link
                  href={Routes.overview}
                  px={2}
                  py={2}
                  borderRadius={'md'}
                  transition={'all 0.2s'}
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  <Text
                    color={'white'}
                    fontSize={'lg'}
                    fontWeight={'bold'}
                    letterSpacing={'wider'}
                  >
                    EEMLAND
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Box>

          {/* Mobile Layout */}
          <Box display={{ base: 'block', md: 'none' }}>
            <Flex
              px={3}
              py={4}
              alignItems={'center'}
            >
              {/* Left: Back arrow only */}
              <Flex justifyContent={'flex-start'} flex={'1'} minW={0}>
                {showBackButton && (
                  <Button
                    aria-label={'common:back'}
                    variant={'tertiaryLight'}
                    _hover={{ bg: 'whiteAlpha.200' }}
                    transition={'all 0.2s'}
                    onClick={() => onBackButtonClicked?.()}
                    size={'sm'}
                    minW={'auto'}
                    px={2}
                  >
                    <LeftArrowIcon boxSize={'6'} color={'white'} />
                  </Button>
                )}
              </Flex>

              {/* Center: Title */}
              <Flex justifyContent={'center'} flex={'1'} minW={0}>
                {title && (
                  <Text
                    color={'white'}
                    fontSize={'md'}
                    fontWeight={'600'}
                    noOfLines={1}
                    textAlign={'center'}
                  >
                    {title}
                  </Text>
                )}
              </Flex>

              {/* Right: Eemland Logo */}
              <Flex justifyContent={'flex-end'} flex={'1'} minW={0}>
                <Link
                  href={Routes.overview}
                  px={2}
                  py={1}
                  borderRadius={'md'}
                  transition={'all 0.2s'}
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  <Text
                    color={'white'}
                    fontSize={'md'}
                    fontWeight={'bold'}
                    letterSpacing={'wide'}
                  >
                    EEMLAND
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </>
    );
  }
);
