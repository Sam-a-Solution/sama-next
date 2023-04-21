/* eslint-disable @typescript-eslint/no-unused-vars */
import { ElementType, createContext } from 'react';

import { ModalProps } from '@chakra-ui/react';

export const ModalsStateContext = createContext<
  { Component: ElementType; props: ModalProps }[]
>([]);

export const ModalsDispatchContext = createContext({
  open: (Component: ElementType, props: Partial<ModalProps>) => undefined,
  close: (Component: ElementType) => undefined,
});
