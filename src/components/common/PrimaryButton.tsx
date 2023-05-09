import React from 'react';

import { Button, ButtonProps, StyleProps, Text } from '@chakra-ui/react';

interface PrimaryButtonProps extends ButtonProps {}

const PrimaryButton = ({ ...props }: PrimaryButtonProps) => {
  return (
    <Button
      w="100%"
      size="lg"
      colorScheme={'primary'}
      borderRadius="5px"
      _disabled={{
        bg: 'gray.400',
        border: 'none',
        _hover: {
          bg: 'gray.400',
        },
      }}
      {...props}
    >
      <Text textStyle="Button">{props.children}</Text>
    </Button>
  );
};

export default PrimaryButton;
