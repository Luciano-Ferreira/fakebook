import { PencilLine } from 'phosphor-react';

interface Params {
  banner: string;
  username: string;
  avatar: string;
  bio: string;
}

export function Sidebar({ banner, username, bio, avatar }: Params) {
  return (
    <aside className='bg-gray-800 rounded-lg overflow-hidden'>
      <img 
        className='w-full h-[72px] object-cover'
        src={banner} 
      />
      <div className='flex flex-col items-center mt-[calc(0px-1.5rem-6px)] box-s'>
        <img 
          src={avatar} 
          alt={username}
          className='h-16 w-16 rounded-full flex border-4 border-gray-800 outline outline-2 outline-green-500'
        />
        <strong
          className='mt-1 text-gray-100 leading-[1.6]'
        >{username}</strong>
        <span
          className='text-sm text-gray-400 leading-[1.6]'
        >{bio}</span>
      </div>
      <footer className='border-t border-solid border-gray-600 mt-6 pt-6 px-8 pb-8'>
        <a href="#" className='bg-transparent text-green-500 border border-solid border-green-500 rounded-lg h-[50px] py-0 px-6 weight font-bold flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white-100 transition-colors'>
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}