import { Transforms } from 'slate';

import {
  useSlateStatic,
  useSelected,
  useFocused,
  ReactEditor,
} from 'slate-react';

import { Icon } from '../../Icon';
import { Trash } from 'phosphor-react';

import classNames from 'classnames';

interface Props {
  attributes: any;
  children: any;
  element: any;
}

export const Image = ({ attributes, children, element }: Props) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)

  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        className='relative'
      >
        <img
          src={element.url}
          className={classNames('block max-w-full max-h-[20em] shadow-none', { 'shadow-[0_0_0_3px_#43be73]': selected && focused })}
        />
        <button
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={classNames('absolute top-[0.5em] right-[0.5em] bg-transparent text-gray-100', { 'inline': selected && focused })}
        >
          <Icon>{<Trash />}</Icon>
        </button>
      </div>
    </div>
  )
}
