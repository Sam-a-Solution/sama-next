import React from 'react';

import { Text, VStack } from '@chakra-ui/react';

interface AlertBodyProps {
  title: string;
  content: string;
}

function AlertBody({ title, content }: AlertBodyProps) {
  return (
    <VStack gap="16px">
      <Text textStyle="Title" color="primary.500">
        {title}
      </Text>
      <Text
        textStyle="Text"
        color="gray.600"
        whiteSpace="pre-wrap"
        textAlign="center"
      >
        {content}
      </Text>
    </VStack>
  );
}

export default AlertBody;
