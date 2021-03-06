import { Logo } from './Logo';

export function Header(): JSX.Element {
  return (
    <header className='h-20 bg-gray-800 flex items-center justify-center'>
      <Logo />
    </header>
  )
}