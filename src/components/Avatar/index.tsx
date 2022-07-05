import styles from './styles.module.scss';

interface Props {
  src: string;
  alt?: string;
  outlined?: boolean;
}

export function Avatar({ src, alt, outlined }: Props): JSX.Element {
  return (
    <img 
      className={outlined ? (styles.avatarOutlined) : (styles.avatar)} 
      src={src} 
      alt={alt}
    />
  )
}