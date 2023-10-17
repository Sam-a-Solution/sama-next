import React, { memo, useMemo } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { WorkType } from 'generated/apis/@types/data-contracts';
import {
  MarkerEmergencyIcon,
  MarkerPauseIcon,
  MarkerStopIcon,
  MarkerWorkIcon,
} from 'generated/icons/MyIcons';

interface WorkMarkerProps {
  work: WorkType;
}

const WorkMarker = ({ work }: WorkMarkerProps) => {
  const MarkerIcon = useMemo(() => {
    switch (work.status) {
      case 'EMERGENCY':
        return MarkerEmergencyIcon;
      case 'PROGRESS':
        return MarkerWorkIcon;
      case 'PAUSE':
        return MarkerPauseIcon;
      default:
        return MarkerStopIcon;
    }
  }, [work.status]);
  return (
    <Flex flexDir="column" gap="4px" alignItems="center">
      <MarkerIcon w="34px" h="34px" />

      <Flex flexDir="column">
        <Box
          alignSelf="center"
          borderRightColor="transparent"
          borderRightWidth="8px"
          borderLeftColor="transparent"
          borderLeftWidth="8px"
          borderBottomColor="rgba(0, 0, 0, 0.66)"
          borderBottomWidth="10px"
        />
        <Flex
          flexDir="column"
          bgColor="rgba(0, 0, 0, 0.66)"
          borderRadius="4px"
          alignItems="center"
          py="4px"
          px="8px"
        >
          <Text color="white" size="sm" fontWeight="700" wordBreak="keep-all">
            {work.heavyEquipmentType?.koreaName}
          </Text>
          <Text color="white" size="sm" wordBreak="keep-all">
            {work.user}
          </Text>
        </Flex>
        MarkerIcon
      </Flex>
    </Flex>
  );
};

export default WorkMarker;
