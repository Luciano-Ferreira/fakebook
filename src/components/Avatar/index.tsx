import { ImgHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  withBorder?: boolean;
}

export function Avatar({ withBorder=true, ...props }: Props): JSX.Element {
  return (
    <img 
      className={withBorder ? (styles.avatarWithBorder) : (styles.avatar)} 
      {...props}
    />
  );
}