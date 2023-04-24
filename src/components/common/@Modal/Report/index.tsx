import React from 'react';

import { Button, CloseButton, Flex, ModalProps, Text } from '@chakra-ui/react';

import ModalContainer from '../ModalContainer';
import ReportForm from './_fragments/ReportForm';

interface ReportProps extends Omit<ModalProps, 'children'> {}

function Report({ ...props }: ReportProps) {
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
      body={<ReportForm />}
      footer={
        <Flex w="100%" h="100px" alignItems="center" gap="10px">
          <Button flex="1" h="50px" variant="outline" onClick={props.onClose}>
            <Text textStyle="Button">취소</Text>
          </Button>
          <Button
            flex="1"
            h="50px"
            // TODO: 작업일지 수정 API 연동
            onClick={() => alert('작업일지 수정 API 연동')}
          >
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
        h: '300px',
        overflow: 'auto',
      }}
      modalFooterProps={{
        position: 'sticky',
        bottom: '0',
        bg: 'white',
        zIndex: 'sticky',
      }}
      {...props}
    />
  );
}

export default Report;
