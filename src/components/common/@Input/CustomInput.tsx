import React from 'react';

import { Input, InputProps } from '@chakra-ui/react';

interface CustomInputProps extends InputProps {}

function CustomInput({ ...basisProps }: CustomInputProps, ref: React.Ref<any>) {
  return (
    <Input
      h="50px"
      bg="gray.50"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="5px"
      _placeholder={{
        textStyle: 'Text',
        color: 'gray.500',
      }}
      _active={{
        outline: 'none',
      }}
      _focus={{
        borderColor: 'black',
        outline: 'none',
      }}
      _focusVisible={{
        outline: 'none',
        boxShadow: 'none !important',
      }}
      {...basisProps}
    />
  );
}

export default React.forwardRef(CustomInput);
