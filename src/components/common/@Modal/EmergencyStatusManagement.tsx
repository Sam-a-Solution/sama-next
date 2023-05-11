import React, { useState } from 'react';

import dayjs from 'dayjs';

import {
  Button,
  CloseButton,
  Flex,
  ModalProps,
  TableContainer,
  Tbody,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';

import useModals from '@hooks/useModals';

import { useQueryClient } from '@tanstack/react-query';

import { useWorkLogEmergencyReleaseUpdateMutation } from '../../../generated/apis/WorkLog/WorkLog.query';
import StatusBadge from '../@Badge/StatusBadge';
import CustomTable from '../@Table/CustomTable';
import CustomTd from '../@Table/CustomTd';
import CustomTh from '../@Table/CustomTh';
import Pagination from '../Pagination';
import CustomAlert from './@Alert/CustomAlert';
import CustomConfirmAlert from './@Alert/CustomConfirmAlert';
import EmergencyStatusItem from './EmergencyStatusItem';
import ModalContainer from './ModalContainer';

import { WorkLogType } from 'generated/apis/@types/data-contracts';
import { useWorkLogEmergencyRetrieveQuery } from 'generated/apis/WorkLog/WorkLog.query';
import { EmergencyIcon } from 'generated/icons/MyIcons';

interface EmergencyStatusManagementProps extends Omit<ModalProps, 'children'> {}

function EmergencyStatusManagement({
  ...props
}: EmergencyStatusManagementProps) {
  const queryClient = useQueryClient();
  const { openModal } = useModals();

  const [emergencyList, setEmergencyList] = useState<WorkLogType[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<undefined | number>(0);

  useWorkLogEmergencyRetrieveQuery({
    variables: {
      query: {
        limit: 10,
        offset: page * 10 - 9,
      },
    },
    options: {
      onSuccess: (data) => {
        setCount(data.count);
        setEmergencyList(data.results ?? []);
      },
    },
  });

  const { mutate: updateEmergencyOffMutate } =
    useWorkLogEmergencyReleaseUpdateMutation({
      options: {
        onSuccess: () => {
          queryClient.invalidateQueries(['WORK_LOG_EMERGENCY_RETRIEVE']);
          openModal(CustomAlert, {
            auxProps: {
              title: '비상상황 해제 완료',
              content: '비상상황이 해제되었습니다.',
              submitText: '확인',
            },
          });
        },
      },
    });

  const handleEmergencyOff = (workLogId: number) => {
    openModal(CustomConfirmAlert, {
      auxProps: {
        title: '비상상황 해제',
        content: '비상상황을 해제하시겠습니까?',
        cancelText: '취소',
        submitText: '해제',
        onSubmit: () => {
          updateEmergencyOffMutate({
            workLogId,
            data: {},
          });
        },
      },
    });
  };

  return (
    <ModalContainer
      header={
        <Flex justifyContent="space-between">
          <Flex alignItems="center" gap="8px">
            <Flex
              w="40px"
              h="40px"
              justifyContent="center"
              alignItems="center"
              bg="secondary.50"
              borderRadius="30px"
            >
              <EmergencyIcon w="24px" h="24px" />
            </Flex>
            <Text textStyle="TitleLarge" color="black">
              비상 상황 관리
            </Text>
          </Flex>
          <CloseButton onClick={props.onClose} />
        </Flex>
      }
      body={
        <TableContainer>
          <CustomTable minH="640px">
            <Thead>
              <Tr h="40px" bg="gray.200">
                <CustomTh w="120px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    순번
                  </Text>
                </CustomTh>
                <CustomTh w="200px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    운전자
                  </Text>
                </CustomTh>
                <CustomTh w="200px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    차종
                  </Text>
                </CustomTh>
                <CustomTh w="120px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    현재상태
                  </Text>
                </CustomTh>
                <CustomTh w="250px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    발생 시간
                  </Text>
                </CustomTh>
                <CustomTh w="250px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    해제 시간
                  </Text>
                </CustomTh>
                <CustomTh w="140px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    비상상황 해제
                  </Text>
                </CustomTh>
              </Tr>
            </Thead>
            <Tbody
              display="inline-block"
              h="600px"
              borderBottom="1px solid"
              borderColor="gray.300"
            >
              {emergencyList.map((emergency, index) => (
                <Tr key={emergency.id} h="60px">
                  <CustomTd w="120px">
                    <Text textStyle="Text" color="black">
                      {index + 1 + (page - 1) * 10}
                    </Text>
                  </CustomTd>
                  <CustomTd w="200px">
                    <Text textStyle="Text" color="black">
                      {emergency?.user}
                    </Text>
                  </CustomTd>
                  <CustomTd w="200px">
                    <Text textStyle="Text" color="black">
                      {/* {item.carType} */}
                      {emergency?.heavyEquipmentType?.koreaName}
                    </Text>
                  </CustomTd>
                  <CustomTd w="120px">
                    <StatusBadge status={emergency?.statusDisplay} />
                  </CustomTd>
                  <CustomTd w="250px">
                    <Text textStyle="Text" color="black">
                      {/* {item.startTime || '-'} */}
                      {dayjs(emergency?.startTime).format('HH:mm:ss') || '-'}
                    </Text>
                  </CustomTd>
                  <CustomTd w="250px">
                    <Text textStyle="Text" color="black">
                      {/* {item.endTime || '-'} */}
                      {dayjs(emergency?.endTime).format('HH:mm:ss') || '-'}
                    </Text>
                  </CustomTd>
                  <CustomTd w="140px">
                    <Button
                      w="80px"
                      h="30px"
                      bg={emergency?.isChecked ? 'gray.500' : 'primary.500'}
                      border={emergency?.isChecked ? 'none' : '1px solid'}
                      _hover={{
                        bg: emergency?.isChecked ? 'gray.600' : 'primary.600',
                      }}
                      _active={{
                        bg: emergency?.isChecked ? 'gray.700' : 'primary.700',
                      }}
                      _disabled={{
                        bg: 'gray.400',
                      }}
                      color="white"
                      onClick={() => handleEmergencyOff(emergency?.id)}
                      isDisabled={emergency?.isChecked || !emergency?.endTime}
                    >
                      해제
                    </Button>
                  </CustomTd>
                </Tr>
                // <EmergencyStatusItem
                //   key={emergency?.id}
                //   item={emergency}
                //   index={index}
                //   page={page}
                // />
              ))}
            </Tbody>
          </CustomTable>
          <Pagination
            totalItems={count}
            currentPage={page}
            itemsPerPage={10}
            onChangePage={setPage}
          />
        </TableContainer>
      }
      modalContentProps={{
        minW: '1280px',
      }}
      modalBodyProps={{
        p: '0 !important',
      }}
      {...props}
    />
  );
}

export default EmergencyStatusManagement;
