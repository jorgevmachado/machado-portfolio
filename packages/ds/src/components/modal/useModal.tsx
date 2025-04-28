import React, { useState } from 'react';

import Modal from './Modal';
import type { UseModalProps } from './types';

export default function useModal() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<UseModalProps | undefined>(
    undefined,
  );

  const openModal = (config: UseModalProps) => {
    setModalConfig(config);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setModalConfig(undefined);
  };

  const modal =
    isVisible && modalConfig ? (
      <Modal
        title={modalConfig.title}
        width={modalConfig.width}
        isOpen={isVisible}
        onClose={closeModal}
        maxHeight={modalConfig.maxHeight}
        closeOnEsc={modalConfig.closeOnEsc}
        customCloseIcon={modalConfig.customCloseIcon}
        closeOnOutsideClick={modalConfig.closeOnOutsideClick}
        removeBackgroundScroll={modalConfig.removeBackgroundScroll}
      >
        {modalConfig.body}
      </Modal>
    ) : null;

  return { openModal, closeModal, modal };
}
