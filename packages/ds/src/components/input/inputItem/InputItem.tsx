import React, { forwardRef, useMemo } from 'react';

import { joinClass } from '../../../utils';

import Text from '../../../elements/text';

import './InputItem.scss';

interface InputItemProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type?: string;
  addon?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  multiline?: boolean;
  dataCyName?: string;
  componentId: string;
  inputClassList: string;
  [key: string]: any;
}

const InputItem = forwardRef<any, InputItemProps>(
  (
    {
      type,
      addon,
      value,
      disabled,
      children,
      autoFocus,
      multiline,
      className,
      dataCyName,
      componentId,
      placeholder,
      inputClassList,
      ...props
    },
    ref,
  ) => {
    const childrenElements = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    const getChildrenElement = (elementId: string): React.ReactNode | null => {
      const element = childrenElements.find(
        (child) =>
          React.isValidElement(child) &&
          (child.props as any)['data-children'] === elementId,
      );
      return element || null;
    };

    const prependElement = getChildrenElement('prepend');
    const appendElement = getChildrenElement('append');
    const iconLeftElement = getChildrenElement('icon-left');
    const iconRightElement = getChildrenElement('icon-right');
    const counterElement = getChildrenElement('counter');

    const InputElement = multiline ? 'textarea' : 'input';

    return (
      <div
        className={joinClass([
          'input-item',
          className,
          disabled && 'input-item__disabled',
        ])}
      >
        {prependElement}
        <div className="input-item__wrapper">
          {iconLeftElement}
          <InputElement
            id={componentId}
            ref={ref}
            type={type}
            value={value}
            disabled={disabled}
            data-cy={dataCyName}
            autoFocus={autoFocus}
            placeholder={placeholder}
            className={inputClassList}
            {...props}
          />
          {iconRightElement}
          {counterElement}
        </div>
        {addon && (
          <div className="input-item__addon">
            <Text color="neutral-60">{addon}</Text>
          </div>
        )}
        {appendElement}
      </div>
    );
  },
);

export default InputItem;
