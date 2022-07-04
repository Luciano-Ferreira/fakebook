interface Params {
  avatar: string;
  author: string;
  bio: string;
  content: string;
  publishedAt: string;
}
export function Post({ author, bio, avatar, publishedAt, content }: Params) {
  return (
    <div className='flex flex-col'>
      <div className='flex'>
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
        <p>{publishedAt}</p>
      </div>
      <p>{content}</p>
    </div>
  )
}