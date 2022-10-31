import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { NewPostField } from '../../components/NewPostField';
import { Post } from '../../components/Post';
import { Sidebar } from '../../components/Sidebar';
import { useGetPostsWithCommentsQuery } from '../../graphql/generated';

export function Feed(): JSX.Element {
  const { data, loading, error } = useGetPostsWithCommentsQuery();
  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return (
      <p>error...</p>
    );
  }
  if (!data || !data.posts) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Header />

      <div className='max-w-[70rem] my-8 mx-auto py-0 px-1 gap-8 items-start grid lg:grid-cols-[256px_1fr] md:grid-cols-1'>
        <Sidebar
          banner='https://images.unsplash.com/29/night-square.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50'
          bio='Security engineer'
          username='Eliot Alderson'
          avatar='https://user-images.githubusercontent.com/46464433/177191269-5cabb63b-09db-4ed0-9192-bef56c8a7fe7.jpeg'
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
            );
          })}
        </main>
      </div>
    </>
  );
}