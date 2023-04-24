import React from 'react';

import { ModalProps } from '@chakra-ui/react';

import ModalContainer from '../ModalContainer';
import AlertBody from './_fragments/AlertBody';
import AlertFooter from './_fragments/AlertFooter';

interface CustomAlertProps extends Omit<ModalProps, 'children'> {
  auxProps: {
    title: string;
    content: string;
    submitText: string;
    onSubmit: () => void;
  };
}

function CustomAlert({ auxProps, ...props }: CustomAlertProps) {
  const { title, content, submitText, onSubmit } = auxProps;
  return (
    <ModalContainer
      header={<></>}
      body={<AlertBody title={title} content={content} />}
      footer={
        <AlertFooter
          submitText={submitText}
          onSubmit={() => {
            props.onClose();
            onSubmit();
          }}
        />
      }
      modalContentProps={{
        maxW: '343px',
      }}
      modalHeaderProps={{
        p: '0',
      }}
      modalBodyProps={{
        p: '32px 20px',
      }}
      modalFooterProps={{
        p: '0',
      }}
      {...props}
    />
  );
}

export default CustomAlert;
