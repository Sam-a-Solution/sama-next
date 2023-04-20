import React from 'react';

import { Checkbox, CheckboxProps, Text } from '@chakra-ui/react';

interface AuthCheckboxProps extends CheckboxProps {
  labelText: string;
}

function AuthCheckbox({ labelText, ...basisProps }: AuthCheckboxProps) {
  return (
    <Checkbox colorScheme="primary" {...basisProps}>
      <Text textStyle="Text" color="black">
        {labelText}
      </Text>
    </Checkbox>
  );
}

export default AuthCheckbox;
