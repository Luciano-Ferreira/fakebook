import { ReactNode } from 'react'

interface Props {
  children?: ReactNode;
}
export function PostList({ children }: Props): JSX.Element {
  return (
    <main>
      {children}
    </main>
  )
}