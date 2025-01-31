import React, { forwardRef, useState } from 'react';

import { joinClass } from '../../../utils';

import { useChildrenElements } from '../../../hooks';

import { Icon, Text } from '../../../elements';

import './InputContent.scss';

export enum EDataChildren {
  ICON = 'icon',
  APPEND = 'append',
  COUNTER = 'counter',
  PREPEND = 'prepend',
  ICON_LEFT = 'icon-left',
  ICON_RIGHT = 'icon-right',
}

interface InputItemProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  rows?: number;
  type?: string;
  addon?: string;
  children?: React.ReactNode;
  autoFocus?: boolean;
  multiline?: boolean;
  isInvalid?: boolean;
  dataCyName?: string;
  hasFloatingSlots?: boolean;
  inputClassNameList?: string;
  isInputMouseFocused?: boolean;
}
export const InputContent = forwardRef<any, InputItemProps>(
  (
    {
      id,
      rows,
      type,
      addon,
      children,
      disabled,
      multiline,
      isInvalid,
      dataCyName,
      placeholder,
      hasFloatingSlots,
      isInputMouseFocused,
      ...props
    },
    ref,
  ) => {
    const [typeInput, setTypeInput] = useState<string | undefined>(type);
    const [passwordIcon, setPasswordIcon] = useState<'eye' | 'eye-close'>(
      'eye-close',
    );

    const toggleShowPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      setTypeInput((prev) => (prev === 'password' ? 'text' : 'password'));
      setPasswordIcon((prev) => (prev === 'eye' ? 'eye-close' : 'eye'));
    };

    const { getChildrenElement, childrenElements } =
      useChildrenElements(children);
    const prependElement = getChildrenElement(EDataChildren.PREPEND);
    const appendElement = getChildrenElement(EDataChildren.APPEND);
    const iconLeftElement = getChildrenElement(EDataChildren.ICON_LEFT);
    const iconRightElement =
      type === 'password' ? (
        <Icon
          icon={passwordIcon}
          onClick={toggleShowPassword}
          className="input-content__password"
          data-children="icon-right"
        />
      ) : (
        getChildrenElement(EDataChildren.ICON_RIGHT)
      );
    const counterElement = getChildrenElement(EDataChildren.COUNTER);

    const isPrepend = Boolean(childrenElements[EDataChildren.PREPEND]);
    const isAppend = Boolean(childrenElements[EDataChildren.APPEND]);

    const InputElement = multiline ? 'textarea' : 'input';

    const classNameList = joinClass([
      'input-content__container--wrapper',
      multiline && 'input-content__container--wrapper-multiline',
      isInvalid && 'input-content__container--wrapper-invalid',
      (childrenElements[EDataChildren.ICON] ||
        childrenElements[EDataChildren.ICON_RIGHT]) &&
        'input-content__container--wrapper-icon-right',
      childrenElements[EDataChildren.ICON_LEFT] &&
        'input-content__container--wrapper-icon-left',
      addon && 'input-content__container--wrapper-addon',
      childrenElements[EDataChildren.COUNTER] &&
        'input-content__container--wrapper-counter',
      isPrepend && 'input-content__container--wrapper-prepend',
      isAppend &&
        !hasFloatingSlots &&
        'input-content__container--wrapper-append',
      isAppend &&
        hasFloatingSlots &&
        'input-content__container--wrapper-append__floating',
      isInputMouseFocused && 'input-content__container--wrapper-focused',
      disabled && 'input-content__container--wrapper-disabled',
    ]);

    return (
      <>
        {prependElement && (
          <div className={joinClass(['input-content__prepend'])}>
            {prependElement}
          </div>
        )}

        <div
          className={joinClass([
            'input-content__container',
            childrenElements[EDataChildren.ICON_LEFT] &&
              'input-content__container--icon__left',
          ])}
        >
          {iconLeftElement}
          <InputElement
            id={id}
            ref={ref}
            type={typeInput}
            rows={rows}
            tabIndex={0}
            data-cy={dataCyName}
            disabled={disabled}
            className={classNameList}
            placeholder={placeholder}
            {...props}
          />
          {iconRightElement}
          {counterElement}
        </div>
        {addon && (
          <div className="input-content__addon">
            <Text color="neutral-60">{addon}</Text>
          </div>
        )}
        {appendElement && (
          <div
            className={joinClass([
              !hasFloatingSlots
                ? 'input-content__append'
                : 'input-content__append-floating',
            ])}
          >
            {appendElement}
          </div>
        )}
      </>
    );
  },
);
