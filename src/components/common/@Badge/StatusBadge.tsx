import React, { useMemo } from 'react';

import { Badge } from '@chakra-ui/react';

interface StatusBadgeProps {
  status?: string;
  isEmergencyReleased?: boolean;
}

function StatusBadge({ status, isEmergencyReleased }: StatusBadgeProps) {
  const isProgress = status === '진행 중' || status === 'PROGRESS';
  const isPause = status === '일시중지' || status === 'PAUSE';

  const isEmergency =
    isEmergencyReleased === false &&
    (status === '비상' || status === 'EMERGENCY');

  const statusText = useMemo(() => {
    {
      if (isEmergency) return '비상';
      else if (isProgress) return '운전';
      else if (isPause) return '일시중지';
      else return '정지';
    }
  }, [isEmergency, isPause, isProgress]);

  const bgColor = useMemo(() => {
    {
      if (isEmergency) return 'warning.100';
      else if (isProgress) return 'secondary.100';
      else if (isPause) return 'gray.600';
      else return 'gray.500';
    }
  }, [isEmergency, isPause, isProgress]);

  const color = useMemo(() => {
    {
      if (isEmergency) return 'warning.500';
      else if (isProgress) return 'primary.500';
      else if (isPause) return 'white';
      else return 'white';
    }
  }, [isEmergency, isPause, isProgress]);

  return (
    <Badge
      w="60px"
      h="26px"
      py="4px"
      bg={bgColor}
      color={color}
      borderRadius="30px"
    >
      {statusText}
    </Badge>
  );
}

export default StatusBadge;
