import React, { forwardRef, useEffect, useState } from 'react';

import { joinClass } from '../../../utils';

import { useChildrenElements } from '../../../hooks';

import { Icon, Text } from '../../../elements';

import type { InputProps } from '../interface';

import './InputContent.scss';

enum EInputContentChildren {
  APPEND = 'append',
  PREPEND = 'prepend',
  ICON_LEFT = 'icon-left',
  ICON_RIGHT = 'icon-right',
}

interface InputContentProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  icon?: InputProps['icon'];
  rows?: number;
  addon?: InputProps['addon'];
  counter?: InputProps['counter'];
  children?: React.ReactNode;
  iconColor?: InputProps['iconColor'];
  autoFocus?: InputProps['autoFocus'];
  dataCyName?: InputProps['dataCyName'];
  iconPosition?: InputProps['iconPosition'];
}
export const InputContent = forwardRef<any, InputContentProps>(
  (
    {
      id,
      icon,
      rows,
      type,
      addon,
      counter,
      children,
      iconColor = 'neutral-90',
      className,
      dataCyName,
      iconPosition = 'left',
      ...props
    },
    ref,
  ) => {
    const [typeInput, setTypeInput] = useState<string | undefined>(type);
    const [currentIcon, setCurrentIcon] =
      useState<InputContentProps['icon']>(icon);
    const [currentIconPosition, setCurrentIconPosition] =
      useState<InputContentProps['iconPosition']>(iconPosition);

    const isPassword = type === 'password';
    const isTextArea = typeInput === 'textarea';
    const toggleShowPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setTypeInput((prev) => (prev === 'password' ? 'text' : 'password'));
      setCurrentIcon((prev) => (prev === 'eye' ? 'eye-close' : 'eye'));
    };

    const { getChildrenElement, childrenElements } =
      useChildrenElements(children);
    const renderIcon = () => {
      const classNameList = isPassword ? 'input-content__icon--password' : '';
      return (
        <Icon
          icon={currentIcon}
          color={iconColor}
          onClick={isPassword ? toggleShowPassword : undefined}
          className={classNameList}
        />
      );
    };

    const iconLeftElement =
      currentIcon && currentIconPosition === 'left'
        ? renderIcon()
        : getChildrenElement(EInputContentChildren.ICON_LEFT);

    const iconRightElement =
      currentIcon && currentIconPosition === 'right'
        ? renderIcon()
        : getChildrenElement(EInputContentChildren.ICON_RIGHT);
    const hasIconLeft = Boolean(iconLeftElement);
    const hasIconRight = Boolean(iconRightElement);

    const prependElement = getChildrenElement(EInputContentChildren.PREPEND);
    const appendElement = getChildrenElement(EInputContentChildren.APPEND);

    const isPrepend = Boolean(childrenElements[EInputContentChildren.PREPEND]);
    const isAppend = Boolean(childrenElements[EInputContentChildren.APPEND]);

    const InputElement = isTextArea ? 'textarea' : 'input';

    const inputFieldClassNameList = joinClass([
      className,
      'input-content__field',
      hasIconLeft && 'input-content__field--icon-left',
      isPrepend && 'input-content__field--prepend',
      isAppend && 'input-content__field--append',
      addon && !isAppend && 'input-content__field--addon',
      counter && !hasIconRight && 'input-content__field--counter',
    ]);

    useEffect(() => {
      if (!currentIcon && typeInput === 'password') {
        setCurrentIcon('eye-close');
        setCurrentIconPosition('right');
      }
    }, [icon]);

    return (
      <div className="input-content">
        {isPrepend && (
          <div className="input-content__prepend">{prependElement}</div>
        )}

        <div className="input-content__wrapper">
          {hasIconLeft && (
            <div className="input-content__icon input-content__icon--left">
              {iconLeftElement}
            </div>
          )}
          <InputElement
            id={id}
            ref={ref}
            type={typeInput}
            rows={isTextArea ? rows : undefined}
            data-cy={dataCyName}
            className={inputFieldClassNameList}
            {...props}
          />
          {hasIconRight && (
            <div className="input-content__icon input-content__icon--right">
              {iconRightElement}
            </div>
          )}
          {counter && !hasIconRight && (
            <div className="input-content__counter">
              <Text color="neutral-60">{counter}</Text>
            </div>
          )}
        </div>
        {addon && !isAppend && (
          <div className="input-content__addon">
            <Text color="neutral-60">{addon}</Text>
          </div>
        )}
        {isAppend && (
          <div className="input-content__append">{appendElement}</div>
        )}
      </div>
    );
  },
);
