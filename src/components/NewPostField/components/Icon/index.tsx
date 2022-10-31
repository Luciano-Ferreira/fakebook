/* eslint-disable react/display-name */
import classNames from 'classnames';
import React, { PropsWithChildren, Ref } from 'react';
import { BaseProps } from '..';

export const Icon = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      className={classNames(
        className,
        'text-lg align-text-bottom'
      )}
    />
  )
);