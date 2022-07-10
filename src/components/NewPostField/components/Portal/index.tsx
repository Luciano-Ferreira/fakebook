import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: ReactNode;
}

export const Portal = ({ children }: Props) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}