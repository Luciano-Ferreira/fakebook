import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from '../Avatar';
import { Comment } from '../Comment';
import { Loading } from '../Loading';

import { IPost } from './@types';
import styles from './styles.module.scss';

export function Post({ id, customer, createdAt, comments, content }: IPost): JSX.Element {

  if (!comments || !customer || !createdAt || !content || !id) {
    return (
      <Loading />
    )
  }

  const publishedDatePostFormatted = format(new Date(createdAt), "d' de 'LLLL' de 'Y' às 'HH':'mm", {
    locale: ptBR,
  });

  const publishedDatePostRelativeToNow = formatDistanceToNow(new Date(createdAt), {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={customer?.avatar}
            withBorder
          />
          <div className={styles.authorInfo}>
            <strong>{customer?.name}</strong>
            <span>{customer?.role}</span>
          </div>
        </div>
        <time
          title={publishedDatePostFormatted}
          dateTime={String(createdAt)}
        >{publishedDatePostRelativeToNow}
        </time>
      </header>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content ? content : '' }}>
        
      </div>
      <form
        className={styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder='Deixe um comentário'
        />
        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments?.map(comment => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              author={comment.author}
              content={comment.content.html}
              createdAt={comment.createdAt}
              likes={comment.likes}
            />
          )
        })}
      </div>
    </article>
  )
}