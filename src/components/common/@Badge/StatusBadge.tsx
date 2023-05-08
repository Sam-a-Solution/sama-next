import React, { useMemo } from 'react';

import { Badge } from '@chakra-ui/react';

interface StatusBadgeProps {
  status?: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusMap: { [key: string]: string } = useMemo(
    () => ({
      '진행 중': '운전',
      대기: '정지',
      종료: '정지',
      비상: '비상',
    }),
    [],
  );
  return (
    <Badge
      w="50px"
      h="26px"
      py="4px"
      bg={
        status === '진행 중'
          ? 'secondary.100'
          : status === '비상'
          ? '#FFE2E2'
          : 'gray.500'
      }
      color={
        status === '진행 중'
          ? 'primary.500'
          : status === '비상'
          ? '#FF6060'
          : 'white'
      }
      borderRadius="30px"
    >
      {statusMap[status as string]}
    </Badge>
  );
}

export default StatusBadge;
