import React, { useRef } from 'react';

import joinClass from '../../utils/join-class';

import { useDropdown, useOutsideClick } from '../../hooks';

import { DropdownProps } from './interface';

import Activator from './Activator';

import './Dropdown.scss';

export default function Dropdown({
  type = 'button',
  label = 'activator',
  isOpen: externalIsOpen,
  context = 'neutral',
  disabled,
  children,
  className = '',
  activator,
  onClickOutside,
  onDropDownClick,
  ...props
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, setIsOpen } = useDropdown(externalIsOpen);

  const handleActivatorClick = () => {
    if (disabled) return;

    // Toggle do dropdown
    setIsOpen(!isOpen);

    // Notifica o pai ao clicar no dropdown
    if (onDropDownClick) {
      onDropDownClick(!isOpen);
    }
  };

  const classNameList = joinClass([
    'dropdown',
    context && `dropdown__context--${context}`,
    className,
  ]);

  useOutsideClick(ref, () => {
    setIsOpen(false);

    onClickOutside && onClickOutside(true);

    onDropDownClick && onDropDownClick(false);
  }, [setIsOpen]);

  return (
    <div {...props} ref={ref} className={classNameList}>
      <div onClick={handleActivatorClick}>
        {!activator ? (
          <Activator
            type={type}
            label={label}
            isOpen={isOpen}
            onClick={handleActivatorClick}
            context={context}
          />
        ) : (
          activator
        )}
      </div>
      {isOpen && (
        <div className={`dropdown__action--${type}`} tabIndex={-1}>
          {children}
        </div>
      )}
    </div>
  );
}
