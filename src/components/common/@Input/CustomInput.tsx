import React from 'react';

import { Input, InputProps } from '@chakra-ui/react';

interface CustomInputProps extends InputProps {}

function CustomInput({ ...basisProps }: CustomInputProps, ref: React.Ref<any>) {
  return (
    <Input
      ref={ref}
      h="50px !important"
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
        boxShadow: 'none !important',
      }}
      _focus={{
        borderColor: 'black',
        outline: 'none',
        boxShadow: 'none !important',
      }}
      _focusVisible={{
        outline: 'none',
        boxShadow: 'none !important',
      }}
      _invalid={{
        borderColor: 'alert.warning.500',
        boxShadow: 'none !important',
      }}
      {...basisProps}
    />
  );
}

export default React.forwardRef(CustomInput);
