import React, { useEffect, useRef } from 'react';
import joinClass from '../../utils/join-class';

import { Icon } from '../../elements/icon';
import { Text } from '../../elements/text';

import type { ModalProps } from './types';

import './Modal.scss';

export default function Modal({
  title,
  width = '500px',
  isOpen,
  context = 'neutral',
  onClose,
  children,
  maxHeight = '80vh',
  closeOnEsc = true,
  backDropColor = 'neutral-100',
  customCloseIcon,
  closeOnOutsideClick = true,
  removeBackgroundScroll = true,
  ...props
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (removeBackgroundScroll && isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (removeBackgroundScroll) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [isOpen, removeBackgroundScroll]);

  useEffect(() => {
    if (!closeOnEsc) return;
    const keyHandler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [closeOnEsc, onClose]);

  const backdropClasses = joinClass([
    'modal__backdrop',
    `ds-bg-${backDropColor}`,
  ]);
  const modalClasses = joinClass([
    'modal__content',
    'modal__fade-in',
    `modal__context--${context}`,
  ]);

  return isOpen ? (
    <>
      <div
        className={backdropClasses}
        onClick={() => closeOnOutsideClick && onClose()}
        aria-hidden="true"
      />
      <div
        {...props}
        style={{ width, maxHeight }}
        className={modalClasses}
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        ref={modalRef}
      >
        <div className="modal__header">
          {title && (
            <Text
              id="modal-title"
              tag="h2"
              variant="xlarge"
              weight="bold"
              className="modal__title"
            >
              {title}
            </Text>
          )}
          {onClose &&
            (customCloseIcon ? (
              React.cloneElement(customCloseIcon, {
                onClick: onClose,
              } as Partial<typeof customCloseIcon.props>)
            ) : (
              <Icon
                icon="close"
                size={35}
                onClick={onClose}
                aria-label="Fechar modal"
                className="modal__close"
              />
            ))}
        </div>
        <div id="modal-description">{children}</div>
      </div>
    </>
  ) : null;
}
