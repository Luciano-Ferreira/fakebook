import styles from './styles.module.scss';

interface Props {
  src?: string;
  alt?: string;
  withBorder?: boolean;
}

export function Avatar({ src, alt, withBorder }: Props): JSX.Element {
  return (
    <img 
      className={withBorder ? (styles.avatarWithBorder) : (styles.avatar)} 
      src={src} 
      alt={alt}
    />
  )
}