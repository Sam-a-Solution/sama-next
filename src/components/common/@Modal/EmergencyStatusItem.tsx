import { memo } from 'react';

import { Button, Text, Tr } from '@chakra-ui/react';

import StatusBadge from '../@Badge/StatusBadge';
import CustomTd from '../@Table/CustomTd';

import { WorkEmergencyType } from 'generated/apis/@types/data-contracts';

interface EmergencyStatusItemProps {
  item: WorkEmergencyType;
}

const EmergencyStatusItem = ({ item }: EmergencyStatusItemProps) => {
  return (
    <Tr h="60px">
      <CustomTd w="120px">
        <Text textStyle="Text" color="black">
          {item.id}
        </Text>
      </CustomTd>
      <CustomTd w="200px">
        <Text textStyle="Text" color="black">
          {item.user}
        </Text>
      </CustomTd>
      <CustomTd w="200px">
        <Text textStyle="Text" color="black">
          {item.heavyEquipmentType}
        </Text>
      </CustomTd>
      <CustomTd w="120px">
        <StatusBadge status={item.statusDisplay} />
      </CustomTd>
      <CustomTd w="250px">
        <Text textStyle="Text" color="black">
          {item.endTime || '-'}
        </Text>
      </CustomTd>
      <CustomTd w="250px">
        <Text textStyle="Text" color="black">
          {item.emergencyReleaseTime || '-'}
        </Text>
      </CustomTd>
      <CustomTd w="140px">
        <Button
          w="80px"
          h="30px"
          isDisabled={item.isEmergencyReleased}
          _disabled={{
            bg: 'gray.400',
            border: 'none',
            _hover: {
              bg: 'gray.400',
            },
          }}
        >
          해제
        </Button>
      </CustomTd>
    </Tr>
  );
};

export default memo(EmergencyStatusItem);
