import React, { useMemo } from 'react';

import { Badge } from '@chakra-ui/react';

interface StatusBadgeProps {
  status?: string;
  isEmergencyReleased?: boolean;
}

function StatusBadge({ status, isEmergencyReleased }: StatusBadgeProps) {
  const isProgress = status === '진행 중' || status === 'PROGRESS';

  const isEmergency =
    isEmergencyReleased === false &&
    (status === '비상' || status === 'EMERGENCY');

  const getStatusText = ({
    isProgress,
    isEmergency,
  }: {
    isProgress: boolean;
    isEmergency: boolean;
  }) => {
    if (isEmergency) return '비상';
    else if (isProgress) return '운전';
    else return '정지';
  };

  console.log('이머전시이이ㅣㅣ', isEmergency, isEmergencyReleased);

  return (
    <Badge
      w="50px"
      h="26px"
      py="4px"
      bg={isProgress ? 'secondary.100' : isEmergency ? '#FFE2E2' : 'gray.500'}
      color={isProgress ? 'primary.500' : isEmergency ? '#FF6060' : 'white'}
      borderRadius="30px"
    >
      {/* {statusMap[status as string]} */}
      {getStatusText({
        isProgress,
        isEmergency,
      })}
    </Badge>
  );
}

export default StatusBadge;
