import { useEffect, useState } from 'react';

import Modal, { ModalData } from './modal';

export default function useModal(modalData: ModalData, deps: any[] = []) {
  const [modal, setModal] = useState<Modal>(new Modal(modalData));

  useEffect(() => {
    setModal(
      new Modal({
        body: modalData.body,
        title: modalData.title,
        visibility: modalData.visibility,
      }),
    );
  }, deps);

  modal.update = (values: Partial<Modal>) => {
    setModal((prevModal) => {
      const newModal = new Modal({ ...modalData, ...values });

      newModal.update = prevModal.update;

      return newModal;
    });
  };

  return [modal];
}