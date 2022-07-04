interface Props {
  avatar: string;
  author: string;
  bio: string;
  content: string;
  publishedAt: string;
}

export function Post({ author, bio, avatar, publishedAt, content }: Props) {
  return (
    <article className='flex flex-col'>
      <header className='flex'>
        <div className='flex'>
          <img
            className='h-16 w-16 rounded-full border-2 border-green-500'
            src={avatar}
            alt={author}
          />
          <div className='flex flex-col'>
            <h3>{author}</h3>
            <p>{bio}</p>
          </div>
        </div>
        <time 
          title='11 de maio às 08:13'
          dateTime='2022-05-11 08:13:30'
        >{publishedAt}</time>
      </header>
      <p>{content}</p>
    </article>
  )
}