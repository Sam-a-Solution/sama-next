import React from 'react';

import { Badge } from '@chakra-ui/react';

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      w="50px"
      h="26px"
      py="4px"
      bg={
        status === '운전'
          ? 'secondary.100'
          : status === '비상'
          ? '#FFE2E2'
          : 'gray.500'
      }
      color={
        status === '운전'
          ? 'primary.500'
          : status === '비상'
          ? '#FF6060'
          : 'white'
      }
      borderRadius="30px"
    >
      {status}
    </Badge>
  );
}

export default StatusBadge;
