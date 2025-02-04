import React from 'react';

import Modal, { ModalData } from './modal';

export interface ModalContextProps {
  modal: Modal;
}

export default React.createContext<ModalContextProps>({
  modal: new Modal({} as ModalData),
});