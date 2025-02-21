import React, { useEffect, useRef } from 'react';

import type { TColors, TContext } from '../../utils';
import joinClass from '../../utils/join-class';

import { Icon } from '../../elements/icon';

import './Modal.scss';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  isOpen: boolean;
  spacing?: 'md' | 'lg';
  context?: TContext;
  onClose(): void;
  children: React.ReactNode;
  closeOnEsc?: boolean;
  backDropColor?: TColors;
  closeOnOutsideClick?: boolean;
  removeBackgroundScroll?: boolean;
}

export default function Modal({
  title,
  isOpen,
  spacing = 'md',
  context = 'primary',
  onClose,
  children,
  closeOnEsc = false,
  backDropColor = 'neutral-100',
  closeOnOutsideClick = true,
  removeBackgroundScroll = false,
  ...props
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (removeBackgroundScroll && isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (removeBackgroundScroll) document.body.style.overflow = 'auto';
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
    'modal',
    'modal__fade-in',
    `modal__spacing--${spacing}`,
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
        className={modalClasses}
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        ref={modalRef}
      >
        <Icon
          icon="close"
          size={35}
          onClick={onClose}
          aria-label="Fechar modal"
          className="modal__close"
        />
        {title && <h2 id="modal-title">{title}</h2>}
        <div id="modal-description">{children}</div>
      </div>
    </>
  ) : null;
}
