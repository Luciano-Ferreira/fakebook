/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from './components/InsertImageButton/Image';
import { Link } from './components/InsertLinkButton/Link';

interface Props {
  attributes: any;
  children: any;
  element: any;
}

export const Element = (props: Props) => {
  const style = { textAlign: props.element.align };
  switch (props.element.type) {
  case 'link':
    return (
      <Link {...props} />
    );
  case 'block-quote':
    return (
      <blockquote style={style} {...props.attributes}>
        {props.children}
      </blockquote>
    );
  case 'bulleted-list':
    return (
      <ul style={style} {...props.attributes}>
        {props.children}
      </ul>
    );
  case 'heading-one':
    return (
      <h1 style={style} {...props.attributes}>
        {props.children}
      </h1>
    );
  case 'heading-two':
    return (
      <h2 style={style} {...props.attributes}>
        {props.children}
      </h2>
    );
  case 'list-item':
    return (
      <li style={style} {...props.attributes}>
        {props.children}
      </li>
    );
  case 'numbered-list':
    return (
      <ol style={style} {...props.attributes}>
        {props.children}
      </ol>
    );
  case 'image':
    return (
      <Image {...props}/>
    );
  default:
    return (
      <p style={style} {...props.attributes}>
        {props.children}
      </p>
    );
  }
};