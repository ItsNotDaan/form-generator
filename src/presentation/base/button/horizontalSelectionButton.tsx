import {
  NextMonthIcon,
  NextYearIcon,
  PreviousMonthIcon,
  PreviousYearIcon,
} from '@/presentation/base/icon/date';
import {Box, BoxProps, Flex, IconButton, Text} from '@chakra-ui/react';
import {memo} from 'react';

interface ButtonProps {
  onClick(): void;
  disabled?: boolean;
  ariaLabel: string;
}

interface Props {
  text: string;
  leftButton: ButtonProps;
  rightButton: ButtonProps;
  startButton?: ButtonProps;
  endButton?: ButtonProps;
}

export const HorizontalSelectionButton = memo(
  ({
    text,
    leftButton,
    rightButton,
    startButton,
    endButton,
    ...rest
  }: Props & BoxProps) => {
    return (
      <Box {...rest}>
        <Flex
          w={'full'}
          h={'full'}
          bg={'white'}
          px={'3'}
          py={'2'}
          gap={'2'}
          borderColor={'gray.200'}
          borderWidth={'1px'}
          borderRadius={'1.5'}
          boxShadow={'roleContainer'}
          align={'center'}
        >
          {startButton && (
            <IconButton
              onClick={startButton.onClick}
              disabled={startButton.disabled}
              minW={'unset'}
              boxSize={'5'}
              icon={<PreviousYearIcon boxSize={'5'} />}
              aria-label={startButton.ariaLabel}
            />
          )}
          <IconButton
            onClick={leftButton.onClick}
            disabled={leftButton.disabled}
            minW={'unset'}
            boxSize={'5'}
            icon={<PreviousMonthIcon boxSize={'5'} />}
            aria-label={leftButton.ariaLabel}
          />

          <Text w={'full'} noOfLines={1}>
            {text}
          </Text>

          <IconButton
            minW={'unset'}
            boxSize={'5'}
            onClick={rightButton.onClick}
            disabled={rightButton.disabled}
            icon={<NextMonthIcon boxSize={'5'} />}
            aria-label={rightButton.ariaLabel}
          />
          {endButton && (
            <IconButton
              minW={'unset'}
              boxSize={'5'}
              onClick={endButton.onClick}
              disabled={endButton.disabled}
              icon={<NextYearIcon boxSize={'5'} />}
              aria-label={endButton.ariaLabel}
            />
          )}
        </Flex>
      </Box>
    );
  }
);
