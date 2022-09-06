import { useSelected } from 'slate-react';

interface Props {
  attributes: any;
  children: any;
  element: any;
}

export const Link = ({ attributes, children, element }: Props) => {
  const selected = useSelected()
  return (
    <a
      {...attributes}
      href={element.url}
      className={
        selected
          ? 'text-green-500 shadow shadow-green-500'
          : 'text-green-500'
      }
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  )
}


const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className='text-[0]'
  >
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

