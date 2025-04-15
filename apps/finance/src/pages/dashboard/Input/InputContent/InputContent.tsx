import React, { useEffect, useState } from 'react';

import useChildrenElements from '@repo/ds/hooks/use-children-elements/useChildrenElements';
import type { TIcon } from '@repo/ds/elements/icon/interface';
import Icon from '@repo/ds/elements/icon/Icon';

import './InputContent.scss';
import joinClass from '@repo/ds/utils/join-class/joinClass';

enum EInputContentChildren {
  APPEND = 'append',
  PREPEND = 'prepend',
  ICON_LEFT = 'icon-left',
  ICON_RIGHT = 'icon-right',
}

type InputContentProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  icon?: React.ReactNode | TIcon;
  rows?: number;
  children?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

export default function InputContent({
  id,
  icon,
  rows,
  type,
  name,
  children,
  className,
  iconPosition = 'left',
  ...props
}: InputContentProps) {
  const [typeInput, setTypeInput] = useState<string | undefined>(type);
  const [currentIcon, setCurrentIcon] = useState<InputContentProps['icon']>(icon);
  const [currentIconPosition, setCurrentIconPosition] = useState<InputContentProps['iconPosition']>(iconPosition);

  const isPassword = type === 'password';

  const { getChildrenElement, childrenElements } =
    useChildrenElements(children);

  const isTextArea = typeInput === 'textarea';
  const InputElement = isTextArea ? 'textarea' : 'input';

  const toggleShowPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setTypeInput((prev) => (prev === 'password' ? 'text' : 'password'));
      setCurrentIcon((prev) => (prev === 'eye' ? 'eye-close' : 'eye'));
  }

  const renderIcon = () => {
      const classNameList = isPassword ? 'input-content__icon--password' : '';
      return (
          <Icon icon={currentIcon} onClick={isPassword ? toggleShowPassword: undefined} className={classNameList}/>
      )
  }

  const iconLeftElement =
    currentIcon && currentIconPosition === 'left' ? (
      renderIcon()
    ) : (
      getChildrenElement(EInputContentChildren.ICON_LEFT)
    );

  const iconRightElement =
    currentIcon && currentIconPosition === 'right' ? (
        renderIcon()
    ) : (
      getChildrenElement(EInputContentChildren.ICON_RIGHT)
    );
  const hasIconLeft = Boolean(iconLeftElement);
  const hasIconRight = Boolean(iconRightElement);

  const prependElement = getChildrenElement(EInputContentChildren.PREPEND);
  const appendElement = getChildrenElement(EInputContentChildren.APPEND);

  const isPrepend = Boolean(childrenElements[EInputContentChildren.PREPEND]);
  const isAppend = Boolean(childrenElements[EInputContentChildren.APPEND]);

  const inputFieldClassNameList = joinClass([
    className,
    'input-content__field',
    hasIconLeft && 'input-content__field--icon-left',
    isPrepend && 'input-content__field--prepend',
    isAppend && 'input-content__field--append',
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
          <div className="input-content__prepend">
            {prependElement}
          </div>
      )}
      <div className="input-content__wrapper">
        {hasIconLeft && (
          <div className="input-content__icon input-content__icon--left">
            {iconLeftElement}
          </div>
        )}
        <InputElement
          id={id}
          type={typeInput}
          rows={isTextArea ? rows : undefined}
          name={name}
          className={inputFieldClassNameList}
          {...props}
        />
        {hasIconRight && (
          <div className="input-content__icon input-content__icon--right">
            {iconRightElement}
          </div>
        )}
      </div>
      {isAppend && (
          <div className="input-content__append">
            {appendElement}
          </div>
      )}
    </div>
  );
}
