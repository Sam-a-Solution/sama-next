import React from 'react';

import { TableCaptionProps, Th } from '@chakra-ui/react';

interface CustomThProps extends TableCaptionProps {
  children: React.ReactNode;
}

function CustomTh({ children, ...props }: CustomThProps) {
  return (
    <Th
      textAlign="center"
      css={{
        padding: 0,
      }}
      {...props}
    >
      {children}
    </Th>
  );
}

export default CustomTh;
