import React from 'react';

import { Td } from '@chakra-ui/react';

interface CustomTdProps {
  children: React.ReactNode;
  w: string;
  borderColor?: string;
  bg?: string;
}

function CustomTd({ children, w, borderColor, bg }: CustomTdProps) {
  return (
    <Td
      w={w}
      borderBottom="1px solid"
      borderColor={borderColor || 'gray.300'}
      textAlign="center"
      bg={bg || 'white'}
      css={{
        padding: 0,
      }}
    >
      {children}
    </Td>
  );
}

export default CustomTd;
