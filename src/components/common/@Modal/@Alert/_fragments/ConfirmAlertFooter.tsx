import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

interface ConfirmAlertFooterProps {
  cancelText: string;
  submitText: string;
  onClose: () => void;
  onSubmit: () => void;
}

function ConfirmAlertFooter({
  cancelText,
  submitText,
  onClose,
  onSubmit,
}: ConfirmAlertFooterProps) {
  return (
    <Flex w="100%" borderTop="1px solid" borderColor="gray.300">
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        p="14.5px 0"
        borderRight="1px solid"
        borderColor="gray.300"
        cursor="pointer"
        onClick={onClose}
      >
        <Text textStyle="Text" color="black">
          {cancelText}
        </Text>
      </Flex>
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        p="14.5px 0"
        cursor="pointer"
        onClick={onSubmit}
      >
        <Text textStyle="Text" color="primary.500">
          {submitText}
        </Text>
      </Flex>
    </Flex>
  );
}

export default ConfirmAlertFooter;
