import React, { ElementType, useMemo, useState } from 'react';

import { ModalProps } from '@chakra-ui/react';

import Modals from '@components/common/@Modal/Modals';

import { ModalsDispatchContext, ModalsStateContext } from './modal.context';

const ModalsProvider = ({ children }: { children: JSX.Element }) => {
  const [openedModals, setOpenedModals] = useState<
    { Component: ElementType; props: ModalProps }[]
  >([]);

  const open = (Component: ElementType, props: ModalProps) => {
    setOpenedModals(
      (modals): { Component: ElementType; props: ModalProps }[] => {
        return [...modals, { Component, props }];
      },
    );
  };

  const close = (Component: ElementType) => {
    setOpenedModals((modals) => {
      return modals.filter((modal) => {
        return modal.Component !== Component;
      });
    });
  };

  const dispatch: any = useMemo(() => ({ open, close }), []);
  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
        <Modals />
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
