import React, {useMemo} from 'react';

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
  const style = useMemo(() => (
      modal.visibility
      ? { width: '100%', height: '100%' }
      : {}
  ), [modal.visibility]);

  const handleClose = () => {
      onCloseFunction?.();
      modal.close();
  }

  return (
    <ModalContext.Provider value={{ modal }}>
      <div style={style} className={joinClass(['modal', context])}>
          <ModalComponent
              key={modal.title}
              title={modal.title}
              onClose={handleClose}
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
