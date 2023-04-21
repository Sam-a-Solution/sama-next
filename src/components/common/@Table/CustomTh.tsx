import React from 'react';

import { Th } from '@chakra-ui/react';

interface CustomThProps {
  children: React.ReactNode;
  w: string;
}

function CustomTh({ children, w }: CustomThProps) {
  return (
    <Th
      w={w}
      textAlign="center"
      css={{
        padding: 0,
      }}
    >
      {children}
    </Th>
  );
}

export default CustomTh;
