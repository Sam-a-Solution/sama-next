import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

interface AlertFooterProps {
  submitText: string;
  onSubmit: () => void;
}

function AlertFooter({ submitText, onSubmit }: AlertFooterProps) {
  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      borderTop="1px solid"
      borderColor="gray.300"
      p="15px 0"
      cursor="pointer"
      onClick={onSubmit}
    >
      <Text textStyle="Text" color="black">
        {submitText}
      </Text>
    </Flex>
  );
}

export default AlertFooter;
