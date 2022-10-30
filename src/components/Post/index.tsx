import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

import { Avatar } from "../Avatar";
import { Comment } from "./Comment";
import { Loading } from "../Loading";

import { IPost } from "./@types";
import styles from "./styles.module.scss";
import { IComment } from "./Comment/@types";

export function Post({
  id,
  customer,
  createdAt,
  comments,
  content,
}: IPost): JSX.Element {
  const [newComment, setNewComment] = useState("");

  if (!comments || !customer || !createdAt || !content || !id) {
    return <Loading />;
  }

  const publishedDatePostFormatted = format(
    new Date(createdAt),
    "d' de 'LLLL' de 'Y' às 'HH':'mm",
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

  function handleCreateNewComment(event: any) {
    event?.preventDefault();

    // setComments([...comments, newComment])

    setNewComment("");
  }

  function handleNewCommentChange(event: any) {
    setNewComment(event?.target.value);
  }

  function deleteComment(comment: IComment) {
    console.log(comment.id);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={customer?.avatar} withBorder />
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
        dangerouslySetInnerHTML={{ __html: content ? content : "" }}
      ></div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newComment}
          onChange={handleNewCommentChange}
        />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments?.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              author={comment.author}
              content={comment.content}
              createdAt={comment.createdAt}
              likes={comment.likes}
            />
          );
        })}
      </div>
    </article>
  );
}
