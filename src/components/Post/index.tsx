import { gql, useQuery } from '@apollo/client';
import { Avatar } from '../Avatar';
import { Comment } from '../Comment';

import styles from './styles.module.scss';

interface Props {
  author: string;
  bio: string;
  publishedAt: string;
}

const GET_POST_WITH_COMMENTS = gql`
  query GetPostWithComments {
    posts(orderBy: createdAt_ASC) {
      customer {
        id
        avatar
        name
        role
      }
      createdAt
      content {
        html
      }
      comments(orderBy: createdAt_ASC) {
          author {
            id
            avatar
            name
            role
          }
          createdAt
          content {
            html
          }
        likes
      }
    }
  }
`

export function Post({ author, bio, publishedAt }: Props): JSX.Element {
  const { data, loading, error } = useQuery(GET_POST_WITH_COMMENTS);
  if (loading) return <p>loading...</p>
  if (error) return <p>error...</p>
  console.log(JSON.stringify(data, null, 2))

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src='https://github.com/luciano-ferreira.png'
            withBorder
          />
          <div className={styles.authorInfo}>
            <strong>{author}</strong>
            <span>{bio}</span>
          </div>
        </div>
        <time
          title='11 de maio às 08:13'
          dateTime='2022-05-11 08:13:30'
        >{publishedAt}
        </time>
      </header>
      <div className={styles.content} >
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
        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}