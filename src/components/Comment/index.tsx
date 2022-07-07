import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from '../Avatar';
import styles from './styles.module.scss';
import { IComment } from './@types';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function Comment({ author, createdAt, content, likes  }: IComment): JSX.Element {
  if (!author || !likes || !createdAt || !content) {
    return (
      <div className='flex-1'>
        <h1>Loading...</h1>
      </div>
    )
  }
  const publishedDateCommentFormatted = format(new Date(createdAt), "d' de 'LLLL' de 'Y' às 'HH':'mm", {
    locale: ptBR,
  });

  const publishedDateCommentRelativeToNow = formatDistanceToNow(new Date(createdAt), {
    locale: ptBR,
    addSuffix: true,
  });

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
              title={publishedDateCommentFormatted}
              dateTime={String(createdAt)}
            >
              {publishedDateCommentRelativeToNow}
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