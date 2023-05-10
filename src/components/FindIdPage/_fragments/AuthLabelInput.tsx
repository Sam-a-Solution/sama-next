import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Flex, FlexProps, Input, InputProps, Text } from '@chakra-ui/react';

import { findIdSchemaType } from '../_hooks/FindIdSchema';

interface AuthLabelInput extends InputProps {
  label: string;
  placeholderText: string;
  flexProps?: FlexProps;
  errorMessage?: string;
  name: 'code' | 'phone';
}

function AuthLabelInput({
  label,
  placeholderText,
  errorMessage,
  flexProps,
  name,
  ...props
}: AuthLabelInput) {
  const { register } = useFormContext<findIdSchemaType>();
  return (
    <Flex flexDir="column" w="100%" gap="10px" {...flexProps}>
      <Text aria-label="아이디" textStyle="TitleSmall" color="primary.500">
        {label}
      </Text>
      <Input
        h="50px"
        bg="gray.50"
        border="1px solid"
        borderColor={errorMessage ? 'alert.warning.500' : 'gray.200'}
        borderRadius="5px"
        placeholder={placeholderText}
        _placeholder={{
          textStyle: 'Text',
          color: 'gray.500',
        }}
        _active={{
          outline: 'none',
        }}
        _focus={{
          borderColor: errorMessage ? 'alert.warning.500' : 'black',
          outline: 'none',
        }}
        _focusVisible={{
          outline: 'none',
          boxShadow: 'none !important',
        }}
        {...register(name)}
        {...props}
      />
      {errorMessage && (
        <Text textStyle="TextSmall" color="alert.warning.500">
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
}

export default AuthLabelInput;
