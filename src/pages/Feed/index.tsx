import { Header } from '../../components/Header';
import { Post } from '../../components/Post';
import { Sidebar } from '../../components/Sidebar';
import { useGetPostWithCommentsQuery } from '../../graphql/generated';

export function Feed(): JSX.Element {

  const { data, loading, error } = useGetPostWithCommentsQuery();
  if (loading) return <p>loading...</p>
  if (error) return <p>error...</p>
  console.log(JSON.stringify(data, null, 2))

  if (!data || !data.posts) {
    return (
      <div className='flex-1'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <Header />

      <div className='max-w-[70rem] my-2 mx-auto py-0 px-1 gap-2 items-start grid lg:grid-cols-[256px_1fr] md:grid-cols-1'>
        <Sidebar
          banner='https://images.unsplash.com/29/night-square.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50'
          bio='Security engineer'
          username='Eliot Alderson'
          avatar='https://user-images.githubusercontent.com/46464433/177191269-5cabb63b-09db-4ed0-9192-bef56c8a7fe7.jpeg'
        />
        <main>
          {data?.posts.map(({ id, customer, createdAt, content, comments }) => {
            {console.log(comments)}

            return (
              <Post
                key={id}
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