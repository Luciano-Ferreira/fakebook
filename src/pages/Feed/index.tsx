import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { NewPostField } from '../../components/NewPostField';
import { Post } from '../../components/Post';
import { Sidebar } from '../../components/Sidebar';
import { useGetPostsWithCommentsQuery, useGetLoggedUserQuery } from '../../graphql/generated';

export function Feed(): JSX.Element {
  const { data, loading, error } = useGetPostsWithCommentsQuery();

  const { data: loggedUserData, loading: loggedUserLoading, error: loggedUserError } = useGetLoggedUserQuery();


  if (loading || loggedUserLoading) return <Loading />
  if (error || loggedUserError) return <p>error...</p>
  if (!data || !data.posts || !loggedUserData || !loggedUserData.loggedUser) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Header />

      <div className='max-w-[70rem] my-8 mx-auto py-0 px-1 gap-8 items-start grid lg:grid-cols-[256px_1fr] md:grid-cols-1'>
        <Sidebar
          banner={loggedUserData.loggedUser.banner}
          bio={loggedUserData.loggedUser.role}
          username={loggedUserData.loggedUser.name}
          avatar={loggedUserData.loggedUser.avatar}
        />
        <main>

          <NewPostField />
          
          {data?.posts.map(({ id, customer, createdAt, content, comments }) => {
            return (
              <Post
                key={id}
                id={id}
                customer={customer}
                createdAt={createdAt}
                content={content.html}
                comments={comments}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}