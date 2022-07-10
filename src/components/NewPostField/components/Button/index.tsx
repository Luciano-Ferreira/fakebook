import React, { PropsWithChildren, Ref } from 'react';
import classNames from 'classnames';
import { BaseProps } from '..';

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }: PropsWithChildren<{ active: boolean, reversed: boolean } & BaseProps>, ref: Ref<HTMLSpanElement>) => (
    <span
      {...props}
      ref={ref}
      className={classNames(className,
        reversed ? (active ? 'text-white-100' : 'text-[#aaa]') : (active ? 'text-green-400 font-extrabold ' : 'text-[#ccc]')
      )}
    >
    </span>
  )
)
