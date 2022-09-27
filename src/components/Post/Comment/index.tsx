import { ThumbsUp, Trash } from 'phosphor-react';
import { format, formatDistanceToNow } from 'date-fns';

import { Avatar } from '../../Avatar';
import { Loading } from '../../Loading';

import ptBR from 'date-fns/locale/pt-BR';

import { IComment } from './@types';

import styles from './styles.module.scss';

interface Props {
  comment: IComment;
  onDeleteComment: any;
}

export function Comment({ comment, onDeleteComment }: Props): JSX.Element {
  if (!comment.author || !comment.createdAt || !comment.content || !comment.id ) {
    return (
      <Loading />
    )
  }
  const publishedDateCommentFormatted = format(new Date(comment.createdAt), "d' de 'LLLL' de 'Y' às 'HH':'mm", {
    locale: ptBR,
  });

  const publishedDateCommentRelativeToNow = formatDistanceToNow(new Date(comment.createdAt), {
    locale: ptBR,
    addSuffix: true,
  });


  return (
    <div className={styles.comment}>
      <Avatar 
        src={comment.author?.avatar}
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContainer}>
          <header>
            <div className={styles.authorAndTime}>
            <strong>{comment.author?.name}</strong>
            <span>{comment.author?.role}</span>
            <time
              title={publishedDateCommentFormatted}
              dateTime={String(comment.createdAt)}
            >
              {publishedDateCommentRelativeToNow}
            </time>
            </div>
            <button 
              title='Deletar comentário' 
              onClick={onDeleteComment(comment)}
            >
              <Trash size={24} />
            </button>
          </header>
          <div className={styles.commentContent} dangerouslySetInnerHTML={{ __html: comment.content ? comment.content : '' }}>
          </div>
        </div>
        <footer className={styles.footerComment}>
          <button>
            <ThumbsUp size={20} /> Aplaudir <span>{comment.likes}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}