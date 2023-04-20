import React from 'react';

import { Flex, FlexProps, InputProps, Text } from '@chakra-ui/react';

import CustomInput from '@components/common/@Input/CustomInput';

interface AuthLabelInput extends InputProps {
  label: string;
  placeholderText: string;
  flexProps?: FlexProps;
}

function AuthLabelInput({ label, placeholderText, flexProps }: AuthLabelInput) {
  return (
    <Flex flexDir="column" w="100%" gap="10px" {...flexProps}>
      <Text aria-label="아이디" textStyle="TitleSmall" color="primary.500">
        {label}
      </Text>
      <CustomInput placeholder={placeholderText} />
    </Flex>
  );
}

export default AuthLabelInput;
