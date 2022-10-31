/* eslint-disable react/display-name */
import classNames from 'classnames';
import React, { PropsWithChildren, Ref } from 'react';
import { BaseProps } from '..';
import styles from './styles.module.scss';

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      ref={ref}
      className={classNames(
        className,
        styles.toolbarMenu
      )}
    />
  )
);