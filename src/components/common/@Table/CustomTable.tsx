import React from 'react';

import { Table, TableProps } from '@chakra-ui/react';

interface CustomTableProps extends TableProps {
  children: React.ReactNode;
}

function CustomTable({ children, ...basisProps }: CustomTableProps) {
  return (
    <Table
      css={{
        tableLayout: 'fixed',
      }}
      display="inline-block"
      {...basisProps}
    >
      {children}
    </Table>
  );
}

export default CustomTable;
