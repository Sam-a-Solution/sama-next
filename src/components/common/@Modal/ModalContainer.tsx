import React from 'react';

import {
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalHeaderProps,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

interface ModalContainerProps extends Omit<ModalProps, 'children'> {
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  modalContentProps?: ModalContentProps;
  modalHeaderProps?: ModalHeaderProps;
  modalBodyProps?: ModalBodyProps;
  modalFooterProps?: ModalFooterProps;
}

function ModalContainer({
  header,
  body,
  footer,
  modalContentProps,
  modalBodyProps,
  modalHeaderProps,
  modalFooterProps,
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
        {footer && <ModalFooter {...modalFooterProps}>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
}

export default ModalContainer;
