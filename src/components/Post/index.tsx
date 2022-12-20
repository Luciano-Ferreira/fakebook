/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, InvalidEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Avatar } from '../Avatar';
import { Comment } from './Comment';
import { Loading } from '../Loading';

import { IPost } from './@types';
import styles from './styles.module.scss';


export function Post({
  id,
  customer,
  createdAt,
  comments,
  content,
}: IPost): JSX.Element {
  const [newComment, setNewComment] = useState({
    id: uuid(),
    author: {
      id: '',
      avatar: '',
      name: '',
      role: ''
    },
    createdAt: new Date(),
    content: '',
    likes: 0
  });

  const [stateComments, setStateComments] = useState(comments!);

  if (!customer || !createdAt || !content || !id) {
    return <Loading />;
  }

  const publishedDatePostFormatted = format(
    new Date(createdAt),
    'd\' de \'LLLL\' de \'Y\' às \'HH\':\'mm',
    {
      locale: ptBR,
    }
  );

  const publishedDatePostRelativeToNow = formatDistanceToNow(
    new Date(createdAt),
    {
      locale: ptBR,
      addSuffix: true,
    }
  );

  function handleCreateNewComment(event: ChangeEvent<HTMLFormElement>) {
    event?.preventDefault();

    setStateComments([...stateComments, newComment]);

    setNewComment({
      id: uuid(),
      author: {
        id: '',
        avatar: '',
        name: '',
        role: ''
      },
      createdAt: new Date(),
      content: '',
      likes: 0
    });
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');

    setNewComment(comment => {
      return {
        ...comment,
        content: event.target.value,
        createdAt: new Date()
      };
    });
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatorio!');
  }

  function deleteComment(commentId: string) {
    const commentsWithoutDeletedOne = stateComments?.filter((comment) => {
      return comment.id !== commentId;
    });
    setStateComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newComment.content.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={customer?.avatar} withBorder  alt={customer?.name} />
          <div className={styles.authorInfo}>
            <strong>{customer?.name}</strong>
            <span>{customer?.role}</span>
          </div>
        </div>
        <time title={publishedDatePostFormatted} dateTime={String(createdAt)}>
          {publishedDatePostRelativeToNow}
        </time>
      </header>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content ? content : '' }}
      ></div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newComment.content}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {stateComments?.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              author={comment.author}
              content={comment.content}
              createdAt={comment.createdAt}
              likes={comment.likes}
              onDelete={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
