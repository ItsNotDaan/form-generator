import React from 'react';
import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';

export interface TransparentIconButtonProps
  extends Omit<IconButtonProps, 'aria-label'> {
  icon: JSX.Element;
  label?: string;
}

export const TransparentIconButton = ({
  icon,
  label,
  ...rest
}: TransparentIconButtonProps) => {
  return (
    <ChakraIconButton
      p={'1'}
      aria-label={label ?? ''}
      boxSize={'7'}
      minH={'unset'}
      minW={'unset'}
      _focus={{}}
      bg={'transparent'}
      {...rest}
    >
      {icon}
    </ChakraIconButton>
  );
};
