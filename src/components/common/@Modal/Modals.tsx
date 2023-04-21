import React, { useContext } from 'react';

import {
  ModalsDispatchContext,
  ModalsStateContext,
} from 'contexts/modal/modal.context';

const Modals = (): JSX.Element => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);
  return (
    <>
      {openedModals.map((modal, index) => {
        const { Component, props } = modal;
        const onClose = () => {
          close(Component);
        };
        return <Component {...props} key={index} onClose={onClose} />;
      })}
    </>
  );
};
export default Modals;
