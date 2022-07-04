import Header from './components/Header';
import { Post } from './components/Post';
import { Sidebar } from './components/Sidebar';
import './styles/global.scss';

function App() {

  return (
    <>
      <Header />

      <div className='max-w-[70rem] my-2 mx-auto py-0 px-1 grid grid-cols-[256px_1fr] gap-2 items-start'>
        <Sidebar
          banner='https://images.unsplash.com/29/night-square.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50'
          bio='Front end Developer'
          username='Luciano Silva'
        />
        <main>
          <Post
            author='Luciano Silva'
            avatar='https://avatars.githubusercontent.com/u/46464433?v=4'
            bio='Full Stack Developer'
            content='Fala galeraa 👋
            Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀
            👉 jane.design/doctorcare #novoprojeto #nlw #rocketseat'
            publishedAt='um mes atras'
          />

        </main>
      </div>
    </>
  )
}

export default App
