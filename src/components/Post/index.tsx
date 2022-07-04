import styles from './Post.module.scss';

interface Props {
  avatar: string;
  author: string;
  bio: string;
  publishedAt: string;
}

export function Post({ author, bio, avatar, publishedAt }: Props): JSX.Element {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img
            src={avatar}
            alt={author}
          />
          <div className={styles.authorInfo}>
            <strong>{author}</strong>
            <span>{bio}</span>
          </div>
        </div>
        <time
          title='11 de maio às 08:13'
          dateTime='2022-05-11 08:13:30'
        >{publishedAt}</time>
      </header>
      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
        <p>
          <a href="#">jane.design/doctorcare</a>{' '}
          <a href="#">#novoprojeto</a> {' '}
          <a href="#">#nlw</a> {' '}
          <a href="#">#rocketseat</a>
        </p>
      </div>
      <form
        className={styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder='Deixe um comentário'
        />
        <button type='submit'>Comentar</button>
      </form>
    </article>
  )
}