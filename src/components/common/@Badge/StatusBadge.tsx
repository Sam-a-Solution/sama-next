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
      PROGRESS: '운전',
      READY: '정지',
      END: '정지',
      EMERGENCY: '비상',
    }),
    [],
  );

  const isProgress = status === '진행 중' || status === 'PROGRESS';

  const isEmergency = status === '비상' || status === 'EMERGENCY';

  return (
    <Badge
      w="50px"
      h="26px"
      py="4px"
      bg={isProgress ? 'secondary.100' : isEmergency ? '#FFE2E2' : 'gray.500'}
      color={isProgress ? 'primary.500' : isEmergency ? '#FF6060' : 'white'}
      borderRadius="30px"
    >
      {statusMap[status as string]}
    </Badge>
  );
}

export default StatusBadge;
