interface Params {
  banner: string;
  username: string;
  bio: string;
}

export function Sidebar({ banner, username, bio }: Params) {
  return (
    <aside className='bg-gray-800 rounded-lg overflow-hidden'>
      <img 
        className='w-full h-[72px] object-cover'
        src={banner} 
      />
      <div className='flex flex-col items-center'>
        <strong>{username}</strong>
        <span>{bio}</span>
      </div>
      <footer className='border border-solid border-gray-600 mt-6 pt-6 px-8 pb-8'>
        <a href="#" className='bg-transparent text-green-500 border border-solid border-green-500 rounded-lg h-[50px] py-0 px-6 weight font-bold flex items-center justify-center'>
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}