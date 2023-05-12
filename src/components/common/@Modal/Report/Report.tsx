import React from 'react';
import { FormProvider } from 'react-hook-form';

import dayjs from 'dayjs';

import { Button, CloseButton, Flex, ModalProps, Text } from '@chakra-ui/react';

import useModals from '@hooks/useModals';

import { useQueryClient } from '@tanstack/react-query';

import CustomAlert from '../@Alert/CustomAlert';
import CustomConfirmAlert from '../@Alert/CustomConfirmAlert';
import ModalContainer from '../ModalContainer';
import ReportForm from './_fragments/ReportForm';
import useReportForm from './_hooks/useReportForm';

import { useWorkChoiceRetrieveQuery } from 'generated/apis/Work/Work.query';
import {
  useWorkLogRetrieveQuery,
  useWorkLogUpdateMutation,
} from 'generated/apis/WorkLog/WorkLog.query';

interface ReportProps extends Omit<ModalProps, 'children'> {
  auxProps?: {
    workLogId: number;
    isEditable: boolean;
  };
}

function Report({ auxProps, ...props }: ReportProps) {
  const { workLogId, isEditable } = auxProps ?? {
    workLogId: 0,
    isEditable: false,
  };

  const queryClient = useQueryClient();
  const methods = useReportForm();
  const { getValues } = methods;
  const { openModal } = useModals();

  // 데이터 다른 modal 상태 바뀔떄마다 set 해 버려서...문제가 생김.
  const { data: workLogData } = useWorkLogRetrieveQuery({
    variables: {
      workLogId,
    },
    options: {
      enabled: !!workLogId,
      onSuccess: (response) => {
        const {
          name,
          startTime,
          endTime,
          locationName,
          construction,
          roadControl,
          business,
          facility,
          heavyEquipmentType,
          operationDepartment,
        } = response;

        methods.setValue('name', name);
        methods.setValue(
          'startTime',
          dayjs(startTime).format('YYYY-MM-DD') || '',
        );
        methods.setValue('endTime', dayjs(endTime).format('YYYY-MM-DD') || '');
        methods.setValue('locationName', locationName);
        methods.setValue('construction', construction);
        methods.setValue(
          'heavyEquipmentType',
          heavyEquipmentType.id.toString(),
        );
        methods.setValue('business', business.id.toString());
        methods.setValue('facility', facility.id.toString());
        methods.setValue(
          'operationDepartment',
          operationDepartment.id.toString(),
        );

        methods.setValue('roadControl', roadControl);
      },
    },
  });

  const { data: selects } = useWorkChoiceRetrieveQuery();

  const { mutate: updateWorkLogMutate } = useWorkLogUpdateMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['WORK_LOG_LIST']);
        openModal(CustomAlert, {
          auxProps: {
            title: '작업 내용 수정 완료',
            content: '작업 내용이 수정되었습니다.',
            submitText: '확인',
            onSubmit: () => {
              props.onClose();
            },
          },
        });
      },
      onError: (e) =>
        console.log('갱신에러', e?.response?.data, methods.getValues()),
    },
  });

  const openConfirmAlert = () => {
    openModal(CustomConfirmAlert, {
      auxProps: {
        title: '작업 내용 수정',
        content: '작업 내용을 수정하시겠습니까?',
        cancelText: '취소',
        submitText: '수정',
        onSubmit: () => {
          const values = methods.getValues();
          updateWorkLogMutate({
            workLogId,
            data: {
              ...values,
              heavyEquipmentType: {
                id: Number(getValues('heavyEquipmentType')),
              },
              business: { id: Number(getValues('business')) },
              facility: { id: Number(getValues('facility')) },
              operationDepartment: {
                id: Number(getValues('operationDepartment')),
              },
              // startTime: dayjs(getValues('startTime')).format('YYYY-MM-DD'),
              // endTime: dayjs(getValues('endTime')).format('YYYY-MM-DD'),
              byManager: true,
            },
          });
        },
      },
    });
  };

  return (
    <ModalContainer
      header={
        <Flex justifyContent="space-between" alignItems="center" gap="8px">
          <Text textStyle="TitleLarge" color="black">
            작업 내용
          </Text>
          <CloseButton onClick={props.onClose} />
        </Flex>
      }
      body={
        <FormProvider {...methods}>
          <ReportForm
            userName={workLogData?.user}
            isReadOnly={!isEditable}
            selects={selects}
          />
        </FormProvider>
      }
      footer={
        <>
          {isEditable && (
            <Flex w="100%" h="100px" alignItems="center" gap="10px">
              <Button
                flex="1"
                h="50px"
                variant="outline"
                onClick={props.onClose}
              >
                <Text textStyle="Button">취소</Text>
              </Button>
              <Button flex="1" h="50px" onClick={openConfirmAlert}>
                <Text textStyle="Button">수정</Text>
              </Button>
            </Flex>
          )}
        </>
      }
      // TODO: 스크롤 처리
      modalContentProps={{
        minW: '574px',
        maxH: '800px',
        position: 'relative',
        h: '90vh',
      }}
      modalHeaderProps={{
        p: '19px 30px',
      }}
      modalBodyProps={{
        p: '0 30px',
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

export default Report;
