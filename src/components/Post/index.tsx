import { Avatar } from '../Avatar';
import { Comment } from '../Comment';

import styles from './styles.module.scss';

import { IPost } from './@types';


export function Post({ customer, createdAt, comments, content }: IPost): JSX.Element {

  if (!comments) {
    return (
      <div className='flex-1'>
        <h1>Loading...</h1>
      </div>
    )
  }
  console.log(JSON.stringify(comments, null, 2))
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
          title={String(createdAt)}
          dateTime={String(createdAt)}
        >{String(createdAt)}
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