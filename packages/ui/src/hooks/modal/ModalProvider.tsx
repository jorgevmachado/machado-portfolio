import React from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';
import ModalComponent from '@repo/ds/components/modal/Modal';

import Modal from './modal';
import ModalContext from './ModalContext';

interface ModalProviderProps {
  modal: Modal;
  onCloseFunction?: () => void;
  context?: 'primary' | 'secondary';
}

export default function ModalProvider({
  modal,
  context = 'primary',
  onCloseFunction,
}: Readonly<ModalProviderProps>) {
  const style = { width: '100%', height: '100%' };
  return (
    <ModalContext.Provider value={{ modal }}>
      <div
        style={modal.visibility ? style : {}}
        className={joinClass(['modal', context])}
      >
          <ModalComponent
              key={modal.title}
              title={modal.title}
              onClose={() => {
                  onCloseFunction && onCloseFunction();
                  modal.close();
              }}
              isOpen={modal.visibility}
              closeOnEsc
              closeOnOutsideClick
          >
              {modal.body}
          </ModalComponent>
      </div>
    </ModalContext.Provider>
  );
}
