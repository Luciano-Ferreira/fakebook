import { ReactNode } from 'react';

interface Props {
  attributes: any;
  children: ReactNode;
}

export const DefaultElement = ({ attributes, children }: Props) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  )
}