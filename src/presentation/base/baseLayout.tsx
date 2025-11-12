import {Flex, FlexProps} from '@chakra-ui/react';
import React, {memo} from 'react';
import {PageHeader, PageHeaderProps} from '@/presentation/base/pageHeader';

interface Props extends PageHeaderProps {
  children: JSX.Element[] | JSX.Element;
  parentStyles?: FlexProps;
}

export const BaseLayout = memo(
  ({
    children,
    title,
    showBackButton,
    onBackButtonClicked,
    parentStyles,
  }: Props) => {
    return (
      <Flex direction={'column'} w={'full'} minH={'100vh'} h={'full'}>
        <PageHeader
          title={title}
          showBackButton={showBackButton}
          onBackButtonClicked={onBackButtonClicked}
        />

        <Flex
          direction={'row'}
          flex={'1'}
          w={'full'}
          h={'full'}
          alignItems={'stretch'}
        >
          {/* Main container */}
          <Flex bg={'gray.100'} flex={'1'}>
            <Flex
              p={'4'}
              direction={'column'}
              h={'full'}
              w={'full'}
              {...parentStyles}
            >
              {children}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
);
