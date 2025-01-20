import React, { useEffect } from 'react';

import type { TColors, TContext } from '../../utils';
import joinClass from '../../utils/join-class';

import Icon from '../../elements/icon';
import Text from '../../elements/text';

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
  closeOnEsc,
  backDropColor = 'neutral-100',
  closeOnOutsideClick,
  removeBackgroundScroll,
  ...props
}: ModalProps) {
  const onCloseFunction = () => {
    if (removeBackgroundScroll) {
      document.body.style.overflow = 'auto';
    }
    onClose();
  };

  useEffect(() => {
    if (removeBackgroundScroll && isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  useEffect(() => {
    if (closeOnEsc) {
      const keyDownHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onCloseFunction();
        }
      };

      window.addEventListener('keydown', keyDownHandler);

      return () => window.removeEventListener('keydown', keyDownHandler);
    }
  }, [closeOnEsc]);

  const classNameList = joinClass([
    'modal',
    'modal__fade-in',
    `modal__spacing--${spacing}`,
    `modal__context--${context}`,
  ]);

  return isOpen ? (
    <>
      <div
        className={joinClass([
          'modal__backdrop',
          'modal__fade-in',
          `ds-bg-${backDropColor}`,
        ])}
        onClick={() => closeOnOutsideClick && onCloseFunction}
      />
      <div {...props} className={classNameList}>
        <Icon
          icon="close"
          size={35}
          onClick={onCloseFunction}
          tabIndex={0}
          className="modal__close"
          aria-label="close modal"
          data-testid="on-close"
        />

        <Text tag="h2" weight="bold" variant="xlarge" tabIndex={0}>
          {title}
        </Text>

        <div tabIndex={0}>{children}</div>
      </div>
    </>
  ) : null;
}
