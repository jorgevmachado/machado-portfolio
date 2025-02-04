import {useEffect, useMemo, useState} from 'react';

import Modal, { ModalData } from './modal';

export default function useModal(modalData: ModalData, deps: any[] = []) {
  const [modal, setModal] = useState<Modal>(new Modal(modalData));

  useEffect(() => {
    setModal(new Modal(modalData));
  }, deps);

  useMemo(() => {
    modal.update = (values: Partial<Modal>) => {
      setModal((prevState) => {
        const updateModal = new Modal({ ...modalData, ...values })
        updateModal.update = prevState.update;
        return updateModal;
      })
    }
  }, [modal, modalData]);

  return [modal];
}