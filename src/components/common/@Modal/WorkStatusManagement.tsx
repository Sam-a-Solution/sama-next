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

import StatusBadge from '../@Badge/StatusBadge';
import CustomTable from '../@Table/CustomTable';
import CustomTd from '../@Table/CustomTd';
import CustomTh from '../@Table/CustomTh';
import Pagination from '../Pagination';
import CustomAlert from './@Alert/CustomAlert';
import CustomConfirmAlert from './@Alert/CustomConfirmAlert';
import ModalContainer from './ModalContainer';
import Report from './Report';

import { WorkLogType } from 'generated/apis/@types/data-contracts';
import {
  useWorkLogCheckUpdateMutation,
  useWorkLogListQuery,
} from 'generated/apis/WorkLog/WorkLog.query';
import { WorkManagementIcon } from 'generated/icons/MyIcons';

interface WorkStatusManagementProps extends Omit<ModalProps, 'children'> {}

function WorkStatusManagement({ ...props }: WorkStatusManagementProps) {
  const { openModal } = useModals();
  const queryClient = useQueryClient();

  const [workLogList, setWorkLogList] = useState<WorkLogType[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<undefined | number>(0);

  useWorkLogListQuery({
    variables: {
      query: {
        limit: 10,
        offset: page * 10 - 10,
      },
    },
    options: {
      onSuccess: (data) => {
        setCount(data?.count);
        setWorkLogList(data?.results ?? []);
      },
    },
  });

  const { mutate: checkUpdateMutate } = useWorkLogCheckUpdateMutation({
    options: {
      onSuccess: () => {
        openModal(CustomAlert, {
          auxProps: {
            title: '관리자 확인 완료',
            content: '작업 확인 완료했습니다.',
            submitText: '확인',
          },
        });
        queryClient.invalidateQueries([
          'WORK_LOG_LIST',
          {
            query: {
              limit: 10,
              offset: page * 10 - 10,
            },
          },
        ]);
      },
    },
  });

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
              <WorkManagementIcon w="24px" h="24px" />
            </Flex>
            <Text textStyle="TitleLarge" color="black">
              작업 현황 관리
            </Text>
          </Flex>
          <CloseButton onClick={props.onClose} />
        </Flex>
      }
      body={
        <TableContainer p="0 !important">
          <CustomTable>
            <Thead>
              <Tr h="40px" bg="gray.200">
                <CustomTh w="100px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    순번
                  </Text>
                </CustomTh>
                <CustomTh w="160px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    운전자
                  </Text>
                </CustomTh>
                <CustomTh w="160px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    차종
                  </Text>
                </CustomTh>
                <CustomTh w="80px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    현재상태
                  </Text>
                </CustomTh>
                <CustomTh w="140px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    작업내용
                  </Text>
                </CustomTh>
                <CustomTh w="220px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    작업 시작 시간
                  </Text>
                </CustomTh>
                <CustomTh w="220px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    작업 종료 시간
                  </Text>
                </CustomTh>
                <CustomTh w="200px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    관리자 확인
                  </Text>
                </CustomTh>
              </Tr>
            </Thead>
            <Tbody display="inline-block">
              {workLogList?.map((item, index) => {
                const isEditable =
                  !item?.endTime || item?.isChecked ? false : true;
                return (
                  <Tr key={`${item.user}-${item.id}-${index}`} h="60px">
                    <CustomTd w="100px">
                      <Text textStyle="Text" color="black">
                        {page * 10 - 10 + index + 1}
                      </Text>
                    </CustomTd>
                    <CustomTd w="160px">
                      <Text textStyle="Text" color="black">
                        {item?.user || ''}
                      </Text>
                    </CustomTd>
                    <CustomTd w="160px">
                      <Text textStyle="Text" color="black">
                        {item?.heavyEquipmentType?.koreaName || ''}
                      </Text>
                    </CustomTd>
                    <CustomTd w="80px">
                      <StatusBadge status={item?.statusDisplay} />
                    </CustomTd>
                    <CustomTd w="140px">
                      {/* 관리자 확인이 완료되었거나, 작업 미종료시 작업내용 수정 불가 */}
                      <Button
                        w="68px"
                        h="30px"
                        variant="outline"
                        colorScheme="primary"
                        onClick={() => {
                          // console.log({
                          //   isChecked: item?.isChecked,
                          //   endTime: !!item?.endTime,
                          //   isEditable,
                          // });
                          openModal(Report, {
                            auxProps: {
                              workLogId: item?.id,
                              isEditable,
                            },
                          });
                        }}
                      >
                        작업 내용
                      </Button>
                    </CustomTd>
                    <CustomTd w="220px">
                      <Text textStyle="Text" color="black">
                        {dayjs(item.startTime).format('HH:mm:ss') || '-'}
                      </Text>
                    </CustomTd>
                    <CustomTd w="220px">
                      <Text textStyle="Text" color="black">
                        {item?.endTime
                          ? dayjs(item?.endTime).format('HH:mm:ss')
                          : '-'}
                      </Text>
                    </CustomTd>
                    <CustomTd w="200px">
                      {(item?.statusDisplay === '대기' ||
                        item?.statusDisplay === '종료') &&
                      item?.isChecked ? (
                        <Flex flexDir="column">
                          <Text
                            textStyle="Text"
                            color="black"
                            textAlign="center"
                          >
                            {/* 관리자ID */}
                            {item?.checkManager || ''}
                          </Text>
                          <Text
                            textStyle="Text"
                            color="black"
                            textAlign="center"
                          >
                            {dayjs(item?.checkManagerTime).format(
                              'YY-MM-DD HH:mm:ss',
                            )}
                            {/* {item?.checkManagerTime || ''} */}
                          </Text>
                        </Flex>
                      ) : (
                        <Button
                          w="80px"
                          h="30px"
                          bg={item?.isChecked ? 'gray.500' : 'primary.500'}
                          border={item?.isChecked ? 'none' : '1px solid'}
                          _hover={{
                            bg: item?.isChecked ? 'gray.600' : 'primary.600',
                          }}
                          _active={{
                            bg: item?.isChecked ? 'gray.700' : 'primary.700',
                          }}
                          color="white"
                          onClick={
                            !item?.endTime
                              ? undefined
                              : () =>
                                  openModal(CustomConfirmAlert, {
                                    auxProps: {
                                      title: '관리자 확인',
                                      content: `해당 작업 내용을 확인하시겠습니까?${'\n'}확인 후에는 수정이 불가능합니다.`,
                                      cancelText: '취소',
                                      submitText: '확인',
                                      onSubmit: () => {
                                        checkUpdateMutate({
                                          workLogId: item?.id,
                                          data: {},
                                        });
                                      },
                                    },
                                  })
                          }
                          isDisabled={item?.isChecked || !item?.endTime}
                        >
                          확인
                        </Button>
                      )}
                    </CustomTd>
                  </Tr>
                );
              })}
            </Tbody>
            <Pagination
              totalItems={count}
              currentPage={page}
              itemsPerPage={10}
              onChangePage={setPage}
            />
          </CustomTable>
        </TableContainer>
      }
      modalHeaderProps={{
        p: '20px 30px !important',
        mb: '10px !important',
      }}
      modalContentProps={{
        minW: '1280px',
        minH: '810px',
      }}
      modalBodyProps={{
        p: '0 !important',
      }}
      {...props}
    />
  );
}

export default WorkStatusManagement;
