import { useContext } from 'react';

import { ModalProps } from '@chakra-ui/react';

import { ModalsDispatchContext } from 'contexts/modal/modal.context';

export interface OpenModalProps extends Partial<ModalProps> {
  auxProps?: unknown;
}

export default function useModals() {
  const { open, close } = useContext(ModalsDispatchContext);

  const openModal = (Component: React.ElementType, props?: OpenModalProps) => {
    open(Component, { ...props, isOpen: true });
  };

  const closeModal = (Component: React.ElementType) => {
    close(Component);
  };

  return {
    openModal,
    closeModal,
  };
}
