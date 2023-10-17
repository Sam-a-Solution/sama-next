import { memo } from 'react';

import dayjs from 'dayjs';

import { Button, Flex, Text, Tr } from '@chakra-ui/react';

import StatusBadge from '@components/common/@Badge/StatusBadge';
import CustomTd from '@components/common/@Table/CustomTd';

import { WorkLogType } from 'generated/apis/@types/data-contracts';

interface WorkStatusManagementItemProps {
  item: WorkLogType;
  index: number;
  page: number;
  onClickOpenReportModal: ({
    item,
    isEditable,
  }: {
    item: WorkLogType;
    isEditable: boolean;
  }) => void;
  onClickManagerCheck: ({ item }: { item: WorkLogType }) => void;
  onClickOpenPauseLogModal: ({ item }: { item: WorkLogType }) => void;
}

const WorkStatusManagementItem = ({
  item,
  index,
  page,
  onClickManagerCheck,
  onClickOpenReportModal,
  onClickOpenPauseLogModal,
}: WorkStatusManagementItemProps) => {
  const isEditable =
    !item?.isChecked &&
    (item?.statusDisplay === '대기' || item?.statusDisplay === '종료');

  const isCanCheck =
    item?.statusDisplay === '대기' || item?.statusDisplay === '종료';

  return (
    <Tr key={`${item.user}-${item.id}-${index}`} h="60px">
      <CustomTd w="100px">
        {/* P_TODO: 기획 확인 필요. index를 표시하는게 나을것같은데? */}
        <Text textStyle="Text" color="black">
          {/* {page * 10 - 10 + index + 1} */}
          {item.id}
        </Text>
      </CustomTd>
      <CustomTd w="160px">
        <Text textStyle="Text" color="black">
          {item?.user || ''}
        </Text>
      </CustomTd>
      <CustomTd w="160px">
        <Text
          textStyle="Text"
          color="black"
          textOverflow="ellipsis"
          w="160px"
          overflow="hidden"
        >
          {item?.heavyEquipmentType?.koreaName || ''}
        </Text>
      </CustomTd>
      <CustomTd w="80px">
        <StatusBadge
          status={item?.statusDisplay}
          isEmergencyReleased={item.isEmergencyReleased}
        />
      </CustomTd>
      <CustomTd w="140px">
        {/* 관리자 확인이 완료되었거나, 작업 미종료시 작업내용 수정 불가 */}
        <Button
          w="68px"
          h="30px"
          variant="outline"
          colorScheme="primary"
          onClick={() => onClickOpenReportModal({ item, isEditable })}
        >
          작업 내용
        </Button>
      </CustomTd>
      <CustomTd w="120px">
        <Text textStyle="Text" color="black">
          {dayjs(item.startTime).format('HH:mm:ss') || '-'}
        </Text>
      </CustomTd>
      <CustomTd w="120px">
        <Text textStyle="Text" color="black">
          {item?.endTime ? dayjs(item?.endTime).format('HH:mm:ss') : '-'}
        </Text>
      </CustomTd>
      <CustomTd w="120px">
        <Text textStyle="Text" color="black">
          {item.workTime ? item.workTime?.split('.')[0] : '-'}
        </Text>
      </CustomTd>
      <CustomTd w="120px">
        <Button
          w="auto"
          px="12px"
          h="30px"
          variant="outline"
          colorScheme="primary"
          onClick={() => onClickOpenPauseLogModal({ item })}
        >
          일시 중지 내역
        </Button>
      </CustomTd>
      <CustomTd w="200px">
        {item?.isChecked ? (
          <Flex flexDir="column">
            <Text color="black" textAlign="center">
              {item?.checkManager || ''}
            </Text>
            <Text color="black" textAlign="center">
              {dayjs(item?.checkManagerTime).format('YY-MM-DD HH:mm:ss')}
            </Text>
          </Flex>
        ) : (
          <Button
            w="80px"
            h="30px"
            bg={'primary.500'}
            border={'1px solid'}
            isDisabled={!isCanCheck}
            _disabled={{
              bg: 'gray.400',
              border: 'none',
              _hover: {
                bg: 'gray.400',
              },
            }}
            color="white"
            onClick={() => onClickManagerCheck({ item })}
          >
            확인
          </Button>
        )}
      </CustomTd>
    </Tr>
  );
};

export default memo(WorkStatusManagementItem);
