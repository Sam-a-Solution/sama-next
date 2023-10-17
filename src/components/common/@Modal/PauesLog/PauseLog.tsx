import React from 'react';
import { FormProvider } from 'react-hook-form';

import { count } from 'console';
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

import { useGetPauseLogListQuery } from '@apis/pause-log/PauseLogApi.query';
import useModals from '@hooks/useModals';

import CustomTable from '@components/common/@Table/CustomTable';
import CustomTd from '@components/common/@Table/CustomTd';
import CustomTh from '@components/common/@Table/CustomTh';

import { useQueryClient } from '@tanstack/react-query';

import ModalContainer from '../ModalContainer';

interface PauseLogProps extends Omit<ModalProps, 'children'> {
  auxProps?: {
    workLogId: number;
  };
}

function PauseLog({ auxProps, ...props }: PauseLogProps) {
  const { workLogId } = auxProps ?? {
    workLogId: 0,
  };

  const { data: pauseLogList } = useGetPauseLogListQuery({
    variables: {
      work_log: workLogId,
    },
    options: {
      onSuccess: (data) => {
        console.log('!@!@!@@! 로그 데이터 불러오기 완료: ', data);
      },
      onError: (err) => {
        console.log('!@!@!@@! 로그 데이터 불러오기 에러:', err);
      },
    },
  });

  return (
    <ModalContainer
      header={
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap="8px"
          mb="20px"
        >
          <Text textStyle="TitleLarge" color="black">
            일시 중지 내역
          </Text>
          <CloseButton onClick={props.onClose} />
        </Flex>
      }
      body={
        <TableContainer>
          <CustomTable minH="640px">
            <Thead h="40px" bg="gray.200">
              <CustomTh w="200px">
                <Text textStyle="TitleSmall" color="gray.700">
                  일시 중지 시작 시각
                </Text>
              </CustomTh>
              <CustomTh w="200px">
                <Text textStyle="TitleSmall" color="gray.700">
                  일시 중지 종료 시각
                </Text>
              </CustomTh>
              <CustomTh w="200px">
                <Text textStyle="TitleSmall" color="gray.700">
                  일시 정지 시간
                </Text>
              </CustomTh>
            </Thead>
            <Tbody
              display="inline-block"
              h="600px"
              borderBottom="1px solid"
              borderColor="gray.300"
            >
              {pauseLogList?.map((pauseLog, index) => (
                <Tr h="60px" key={index}>
                  <CustomTd w="200px">
                    <Text textStyle="Text">
                      {dayjs(pauseLog.startTime).format('hh:mm:ss')}
                    </Text>
                  </CustomTd>
                  <CustomTd w="200px">
                    <Text textStyle="Text">
                      {pauseLog.endTime
                        ? dayjs(pauseLog.endTime).format('hh:mm:ss')
                        : '-'}
                    </Text>
                  </CustomTd>
                  <CustomTd w="200px">
                    <Text textStyle="Text">
                      {pauseLog.pauseTime !== '00:00:00'
                        ? pauseLog.pauseTime.split('.')[0]
                        : '-'}
                    </Text>
                  </CustomTd>
                </Tr>
              ))}
            </Tbody>
          </CustomTable>
        </TableContainer>
      }
      // TODO: 스크롤 처리
      modalContentProps={{
        minW: '600px',
        maxH: '800px',
        position: 'relative',
        h: '90vh',
      }}
      modalHeaderProps={{
        p: '19px 30px',
      }}
      modalBodyProps={{
        p: '0px',
        minH: '300px',
        overflowY: 'scroll',
      }}
      modalFooterProps={{
        position: 'sticky',
        bottom: '0',
        bg: 'white',
        zIndex: 'sticky',
        p: '0 30px',
        borderRadius: '10px',
      }}
      {...props}
    />
  );
}

export default PauseLog;
