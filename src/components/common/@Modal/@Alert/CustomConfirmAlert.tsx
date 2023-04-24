import React from 'react';

import { ModalProps } from '@chakra-ui/react';

import ModalContainer from '../ModalContainer';
import AlertBody from './_fragments/AlertBody';
import ConfirmAlertFooter from './_fragments/ConfirmAlertFooter';

interface CustomConfirmAlertProps extends Omit<ModalProps, 'children'> {
  auxProps: {
    onSubmit: () => void;
    title: string;
    content: string;
    cancelText: string;
    submitText: string;
  };
}

function CustomConfirmAlert({ auxProps, ...props }: CustomConfirmAlertProps) {
  const { onSubmit, title, content, cancelText, submitText } = auxProps;
  return (
    <ModalContainer
      header={<></>}
      body={<AlertBody title={title} content={content} />}
      footer={
        <ConfirmAlertFooter
          cancelText={cancelText}
          submitText={submitText}
          onClose={props.onClose}
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

export default CustomConfirmAlert;
