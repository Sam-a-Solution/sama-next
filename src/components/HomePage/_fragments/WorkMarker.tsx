import React, { memo } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { WorkType } from 'generated/apis/@types/data-contracts';
import {
  MarkerEmergencyIcon,
  MarkerStopIcon,
  MarkerWorkIcon,
} from 'generated/icons/MyIcons';

interface WorkMarkerProps {
  work: WorkType;
}

const WorkMarker = ({ work }: WorkMarkerProps) => {
  return (
    <Flex flexDir="column" gap="4px" alignItems="center">
      {work.status === 'EMERGENCY' && <MarkerEmergencyIcon w="34px" h="34px" />}
      {work.status === 'PROGRESS' && <MarkerWorkIcon w="34px" h="34px" />}
      {(work.status === 'END' || work.status === 'READY') && (
        <MarkerStopIcon w="34px" h="34px" />
      )}
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
      </Flex>
    </Flex>
  );
};

export default WorkMarker;
