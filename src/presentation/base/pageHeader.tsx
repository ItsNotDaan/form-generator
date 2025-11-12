import React, {memo} from 'react';
import {Box, Button, Flex, HStack, Text} from '@chakra-ui/react';
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
        <Box w={'full'} bg={'brand.700'} boxShadow={'md'}>
          {/* Desktop & Tablet Layout */}
          <Box display={{base: 'none', md: 'block'}}>
            <Flex
              maxW={'1400px'}
              mx={'auto'}
              px={6}
              py={4}
              alignItems={'center'}
              gap={8}
            >
              {/* Left: Back button + Title */}
              <Flex alignItems={'center'} gap={3} flex={'1'} minW={0}>
                {showBackButton && title && (
                  <Button
                    aria-label={t('common:back')}
                    variant={'tertiaryLight'}
                    _hover={{bg: 'whiteAlpha.200'}}
                    onClick={() => onBackButtonClicked?.()}
                    size={'sm'}
                    leftIcon={<LeftArrowIcon boxSize={'4'} color={'white'} />}
                  >
                    <Text
                      color={'white'}
                      fontSize={'md'}
                      fontWeight={'500'}
                      noOfLines={1}
                    >
                      {t('back')}
                    </Text>
                  </Button>
                )}
                {!showBackButton && title && (
                  <Text
                    color={'white'}
                    fontSize={'lg'}
                    fontWeight={'600'}
                    noOfLines={1}
                  >
                    {title}
                  </Text>
                )}
              </Flex>

              {/* Center: Eemland Logo */}
              <Link href={Routes.overview}>
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  px={8}
                  py={2}
                  borderRadius={'md'}
                  transition={'all 0.2s'}
                  _hover={{bg: 'whiteAlpha.200'}}
                >
                  <Text
                    color={'white'}
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                    letterSpacing={'wider'}
                  >
                    EEMLAND
                  </Text>
                </Flex>
              </Link>

              {/* Right: Help button */}
              <Flex justifyContent={'flex-end'} flex={'1'} minW={0}>
                <Link href={Routes.help}>
                  <Button
                    variant={'tertiaryLight'}
                    as={'div'}
                    size={'sm'}
                    _hover={{bg: 'whiteAlpha.200'}}
                  >
                    <Text fontWeight={'500'} color={'white'} fontSize={'md'}>
                      {t('help')}
                    </Text>
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Box>

          {/* Mobile Layout */}
          <Box display={{base: 'block', md: 'none'}}>
            {/* Top row: Eemland centered */}
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              py={3}
              borderBottom={'1px solid'}
              borderColor={'whiteAlpha.300'}
            >
              <Link href={Routes.overview}>
                <Text
                  color={'white'}
                  fontSize={'xl'}
                  fontWeight={'bold'}
                  letterSpacing={'wide'}
                >
                  Eemland
                </Text>
              </Link>
            </Flex>

            {/* Bottom row: Back/Title + Help */}
            <Flex
              px={3}
              py={2}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={2}
            >
              {/* Left: Back or Title */}
              <Box flex={'1'} minW={0}>
                {showBackButton && title ? (
                  <Button
                    aria-label={t('common:back')}
                    variant={'tertiaryLight'}
                    _hover={{bg: 'whiteAlpha.200'}}
                    onClick={() => onBackButtonClicked?.()}
                    size={'sm'}
                    px={2}
                  >
                    <HStack spacing={1}>
                      <LeftArrowIcon boxSize={'3'} color={'white'} />
                      <Text
                        color={'white'}
                        fontSize={'sm'}
                        fontWeight={'500'}
                        noOfLines={1}
                      >
                        {title}
                      </Text>
                    </HStack>
                  </Button>
                ) : title ? (
                  <Text
                    color={'white'}
                    fontSize={'sm'}
                    fontWeight={'600'}
                    noOfLines={1}
                    pl={2}
                  >
                    {title}
                  </Text>
                ) : null}
              </Box>

              {/* Right: Help */}
              <Link href={Routes.help}>
                <Button
                  variant={'tertiaryLight'}
                  as={'div'}
                  size={'sm'}
                  _hover={{bg: 'whiteAlpha.200'}}
                >
                  <Text fontWeight={'500'} color={'white'} fontSize={'sm'}>
                    {t('help')}
                  </Text>
                </Button>
              </Link>
            </Flex>
          </Box>
        </Box>
      </>
    );
  }
);
