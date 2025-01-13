import React, { forwardRef } from 'react';

import Text from '../../../elements/text';

import './InputItem.scss';

interface InputItemProps extends React.HTMLProps<any> {
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
      inputClassList,
      ...props
    },
    ref,
  ) => {
    const childrenElements = React.Children.toArray(children);

    const getChildrenElement = (elementId: string) => {
      return childrenElements.find(
        (child: any) => child.props['data-children'] === elementId,
      );
    };

    return (
      <div className={`input-item ${className}`}>
        {getChildrenElement('prepend')}
        <div className="input-item__wrapper">
          {getChildrenElement('icon-left')}
          {multiline ? (
            <textarea
              id={componentId}
              ref={ref}
              value={value}
              disabled={disabled}
              data-cy={dataCyName}
              className={inputClassList}
              {...props}
            />
          ) : (
            <input
              id={componentId}
              ref={ref}
              type={type}
              value={value}
              disabled={disabled}
              data-cy={dataCyName}
              autoFocus={autoFocus}
              className={inputClassList}
              {...props}
            />
          )}
          {getChildrenElement('icon-right')}
          {getChildrenElement('counter')}
        </div>
        {addon && (
          <div className="input-item__addon">
            <Text color="neutral-60">{addon}</Text>
          </div>
        )}
        {getChildrenElement('append')}
      </div>
    );
  },
);

export default InputItem;
