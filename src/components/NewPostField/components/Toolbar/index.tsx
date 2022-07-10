import classNames from 'classnames';
import React, { PropsWithChildren, Ref } from 'react';
import { BaseProps } from '..';
import { Menu } from '../Menu';

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={classNames(
        className,
        'relative p-[1px_18px_17px] m-[0_-20px] border-b-2 border-solid border-green-500 mb-[20px]',
      )}
    />
  )
)