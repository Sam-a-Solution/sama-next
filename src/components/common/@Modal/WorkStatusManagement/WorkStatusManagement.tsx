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

import StatusBadge from '../../@Badge/StatusBadge';
import CustomTable from '../../@Table/CustomTable';
import CustomTd from '../../@Table/CustomTd';
import CustomTh from '../../@Table/CustomTh';
import Pagination from '../../Pagination';
import CustomAlert from '../@Alert/CustomAlert';
import CustomConfirmAlert from '../@Alert/CustomConfirmAlert';
import ModalContainer from '../ModalContainer';
import Report from '../Report/Report';
import WorkStatusManagementHeader from './WorkStatusManagementHeader';
import WorkStatusManagementItem from './WorkStatusManagementItem';

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

  const onClickOpenReportModal = ({
    item,
    isEditable,
  }: {
    item: WorkLogType;
    isEditable: boolean;
  }) => {
    openModal(Report, {
      auxProps: {
        workLogId: item?.id,
        isEditable,
      },
    });
  };

  const onClickManagerCheck = ({ item }: { item: WorkLogType }) => {
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
            <WorkStatusManagementHeader />
            <Tbody display="inline-block">
              {workLogList?.map((item, index) => (
                <WorkStatusManagementItem
                  key={item.id}
                  index={index}
                  item={item}
                  page={page}
                  onClickOpenReportModal={onClickOpenReportModal}
                  onClickManagerCheck={onClickManagerCheck}
                />
              ))}
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