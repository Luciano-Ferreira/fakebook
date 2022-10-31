/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ThumbsUp, Trash } from 'phosphor-react';
import { format, formatDistanceToNow } from 'date-fns';

import { Avatar } from '../../Avatar';
import { Loading } from '../../Loading';

import ptBR from 'date-fns/locale/pt-BR';

import { IComment } from './@types';

import styles from './styles.module.scss';
import { useState } from 'react';

export function Comment({ id, author, createdAt, content, likes, onDelete }: IComment): JSX.Element {
  const [likeCount, setLikeCount] = useState(likes!);

  if (!author || !createdAt || !content || !id) {
    return (
      <Loading />
    );
  }
  const publishedDateCommentFormatted = format(new Date(createdAt), 'd\' de \'LLLL\' de \'Y\' às \'HH\':\'mm', {
    locale: ptBR,
  });

  const publishedDateCommentRelativeToNow = formatDistanceToNow(new Date(createdAt), {
    locale: ptBR,
    addSuffix: true,
  });

  function handleDeleteComment() {
    onDelete(id!);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

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
              <span>{author?.role}</span>
              <time
                title={publishedDateCommentFormatted}
                dateTime={String(createdAt)}
              >
                {publishedDateCommentRelativeToNow}
              </time>
            </div>
            <button title='Deletar comentário' onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>
          <div className={styles.commentContent}>
            <pre>{content}</pre>
          </div>
        </div>
        <footer className={styles.footerComment}>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} /> Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}