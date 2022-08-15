import { useMemo } from 'react'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { Transforms, createEditor, Descendant } from 'slate'
import {
  Slate,
  Editable,
  useSlateStatic,
  useSelected,
  useFocused,
  withReact,
  ReactEditor,
} from 'slate-react'
import { withHistory } from 'slate-history'

import { ImageElement } from '../../custom-types'
import { Toolbar } from '../Toolbar'
import { Button } from '../Button'
import { Icon } from '../Icon'
import classNames from 'classnames'

const ImagesExample = () => {
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  )

  return (
    <Slate editor={editor} value={initialValue}>
      <Toolbar>
        <InsertImageButton />
      </Toolbar>
      <Editable
        renderElement={props => <Element {...props} />}
        placeholder="Enter some text..."
      />
    </Slate>
  )
}

const withImages = (editor: any) => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element: any) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = (data: any) => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertImage = (editor: any, url: any) => {
  const text = { text: '' }
  const image: ImageElement = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

const Element = (props: any) => {
  const { attributes, children, element } = props

  switch (element.type) {
    case 'image':
      return <Image {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Image = ({ attributes, children, element }: any) => {
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
          className={classNames('block max-w-full max-h-[20em] shadow-none', { 'shadow-[0_0_0_3px_#B4D5FF]': selected && focused })}
        />
        <Button
          active
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={classNames('absolute top-[0.5em] left-[0.5em] bg-white-100 hidden', { 'inline': selected && focused })}
        >
          <Icon>delete</Icon>
        </Button>
      </div>
    </div>
  )
}

const InsertImageButton = () => {
  const editor = useSlateStatic()
  return (
    <Button
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the image:')
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        insertImage(editor, url)
      }}
    >
      <Icon>image</Icon>
    </Button>
  )
}

const isImageUrl = (url: string) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext!)
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          'In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos.',
      },
    ],
  },
  {
    type: 'image',
    url: 'https://source.unsplash.com/kFrdX5IeQzI',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your clipboard and paste it anywhere in the editor!',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'You can delete images with the cross in the top left. Try deleting this sheep:',
      },
    ],
  },
  {
    type: 'image',
    url: 'https://source.unsplash.com/zOwZKwZOZq8',
    children: [{ text: '' }],
  },
]

export default ImagesExample
