import { Header } from '../../components/Header';
import { Post } from '../../components/Post';
import { Sidebar } from '../../components/Sidebar';

export function Feed(): JSX.Element {
  return (
    <>
      <Header />

      <div className='max-w-[70rem] my-2 mx-auto py-0 px-1 grid grid-cols-[256px_1fr] gap-2 items-start'>
        <Sidebar
          banner='https://images.unsplash.com/29/night-square.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50'
          bio='Security engineer'
          username='Eliot Alderson'
          avatar='https://user-images.githubusercontent.com/46464433/177191269-5cabb63b-09db-4ed0-9192-bef56c8a7fe7.jpeg'
        />
        <main>
          <Post
            author='Luciano Silva'
            avatar='https://avatars.githubusercontent.com/u/46464433?v=4'
            bio='Full Stack Developer'
            publishedAt='há um mês'
          />
          <Post
            author='Luciano Silva'
            avatar='https://avatars.githubusercontent.com/u/46464433?v=4'
            bio='Full Stack Developer'
            publishedAt='há um mês'
          />
          <Post
            author='Luciano Silva'
            avatar='https://avatars.githubusercontent.com/u/46464433?v=4'
            bio='Full Stack Developer'
            publishedAt='há um mês'
          />
        </main>
      </div>
    </>
  )
}