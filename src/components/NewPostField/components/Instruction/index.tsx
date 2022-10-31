/* eslint-disable react/display-name */
import classNames from 'classnames';
import React, { PropsWithChildren, Ref } from 'react';
import { BaseProps } from '..';

export const Instruction = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      ref={ref}
      className={classNames(
        className,
        'whitespace-pre-wrap m-[0_-20px_10px] p-[10px_20px] text-sm bg-white-100'
      )}
    />
  )
);