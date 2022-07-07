import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from '../Avatar';
import styles from './styles.module.scss';
import { IComment } from './@types';

export function Comment({ author, createdAt, content, likes  }: IComment): JSX.Element {
  return (
    <div className={styles.comment}>
      <Avatar 
        src={author?.avatar}
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContainer}>
          <header>
            <div className={styles.authorAndTime}>
            <strong>{author?.name}</strong>
            <time
              title={String(createdAt)}
              dateTime={String(createdAt)}
            >
              {String(createdAt)}
            </time>
            </div>
            <button title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>
          <div className={styles.commentContent} dangerouslySetInnerHTML={{ __html: content ? content : '' }}>
          </div>
        </div>
        <footer className={styles.footerComment}>
          <button>
            <ThumbsUp size={20} /> Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}