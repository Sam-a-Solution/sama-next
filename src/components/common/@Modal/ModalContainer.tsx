import React from 'react';

import {
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalHeaderProps,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

interface ModalContainerProps extends Omit<ModalProps, 'children'> {
  header: React.ReactNode;
  body: React.ReactNode;
  modalContentProps?: ModalContentProps;
  modalHeaderProps?: ModalHeaderProps;
  modalBodyProps?: ModalBodyProps;
}

function ModalContainer({
  header,
  body,
  modalContentProps,
  modalBodyProps,
  modalHeaderProps,
  ...props
}: ModalContainerProps) {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent
        background="white"
        borderRadius="10px"
        boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
        {...modalContentProps}
      >
        <ModalHeader {...modalHeaderProps}>{header}</ModalHeader>
        <ModalBody {...modalBodyProps}>{body}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalContainer;
