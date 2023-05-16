import { memo } from 'react';

import dayjs from 'dayjs';

import { Button, Text, Tr } from '@chakra-ui/react';

import StatusBadge from '../@Badge/StatusBadge';
import CustomTd from '../@Table/CustomTd';

import { WorkEmergencyType } from 'generated/apis/@types/data-contracts';

interface EmergencyStatusItemProps {
  item: WorkEmergencyType;
  index: number;
  page: number;
  handleEmergencyOff: (workLogId: number) => void;
}

const EmergencyStatusItem = ({
  item,
  index,
  page,
  handleEmergencyOff,
}: EmergencyStatusItemProps) => {
  return (
    <Tr h="60px">
      <CustomTd w="120px">
        <Text textStyle="Text" color="black">
          {/* P_TODO: 기획 확인 필요. index를 표시하는게 나을것같은데? */}
          {/* {index + 1 + (page - 1) * 10} */}
          {item.id}
        </Text>
      </CustomTd>
      <CustomTd w="200px">
        <Text textStyle="Text" color="black">
          {item.user}
        </Text>
      </CustomTd>
      <CustomTd w="200px">
        <Text
          textStyle="Text"
          color="black"
          textOverflow="ellipsis"
          w="200px"
          overflow="hidden"
        >
          {item.heavyEquipmentType}
        </Text>
      </CustomTd>
      <CustomTd w="120px">
        <StatusBadge status={item.statusDisplay} />
      </CustomTd>
      <CustomTd w="250px">
        <Text textStyle="Text" color="black">
          {item.createdAt ? dayjs(item.createdAt).format('HH:mm:ss') : '-'}
        </Text>
      </CustomTd>
      <CustomTd w="250px">
        <Text textStyle="Text" color="black">
          {item.emergencyReleaseTime
            ? dayjs(item.emergencyReleaseTime).format('HH:mm:ss')
            : '-'}
        </Text>
      </CustomTd>
      <CustomTd w="140px">
        <Button
          onClick={() => handleEmergencyOff(item.id)}
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
