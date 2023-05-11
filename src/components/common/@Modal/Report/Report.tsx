import React from 'react';
import { FormProvider } from 'react-hook-form';

import dayjs from 'dayjs';

import { Button, CloseButton, Flex, ModalProps, Text } from '@chakra-ui/react';

import useModals from '@hooks/useModals';

import { useQueryClient } from '@tanstack/react-query';

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
  const { openModal } = useModals();

  useWorkLogRetrieveQuery({
    variables: {
      workLogId,
    },
    options: {
      enabled: !!workLogId,
      onSuccess: (response) => {
        methods.setValue('workId', response.workId);
        methods.setValue('user', response.user);
        methods.setValue('name', response.name);
        methods.setValue(
          'startTime',
          dayjs(response.startTime).format('YYYY-MM-DD') || '',
        );
        methods.setValue(
          'endTime',
          dayjs(response.endTime).format('YYYY-MM-DD') || '',
        );
        methods.setValue('locationName', response.locationName);
        methods.setValue('construction', response.construction);
        methods.setValue('heavyEquipmentType', response.heavyEquipmentType);
        methods.setValue('facility', response.facility);
        methods.setValue('business', response.business);
        methods.setValue('operationDepartment', response.operationDepartment);
        methods.setValue('roadControl', response.roadControl);
      },
    },
  });

  const { data: selects } = useWorkChoiceRetrieveQuery();

  const { mutate: updateWorkLogMutate } = useWorkLogUpdateMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['WORK_LOG_LIST']);
        props.onClose();
      },
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

          console.log({ values });

          // TODO: business, facility, heavyEquipmentType, operationDepartment 값에서 koreaName 제거

          updateWorkLogMutate({
            workLogId,
            data: {
              name: values.name,
              locationName: values.locationName,
              // latitude: values.latitude,
              // longitude: values.longitude,
              business: values.business,
              facility: values.facility,
              heavyEquipmentType: values.heavyEquipmentType,
              operationDepartment: values.operationDepartment,
              construction: values.construction,
              roadControl: values.roadControl,
              workId: values.workId,
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
            isReadOnly={!isEditable}
            businesSelectList={selects?.business}
            facilitySelectList={selects?.facility}
            heavyEquipmentSelectList={selects?.heavyEquipmentType}
            operationDepartmentSelectList={selects?.operationDepartment}
          />
        </FormProvider>
      }
      footer={
        <Flex w="100%" h="100px" alignItems="center" gap="10px">
          <Button flex="1" h="50px" variant="outline" onClick={props.onClose}>
            <Text textStyle="Button">취소</Text>
          </Button>
          <Button flex="1" h="50px" onClick={openConfirmAlert}>
            <Text textStyle="Button">수정</Text>
          </Button>
        </Flex>
      }
      // TODO: 스크롤 처리
      modalContentProps={{
        minW: '574px',
        maxH: '800px',
        position: 'relative',
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
      }}
      {...props}
    />
  );
}

export default Report;
