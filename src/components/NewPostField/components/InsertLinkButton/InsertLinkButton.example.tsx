import React, { useMemo } from 'react';
import isUrl from 'is-url';
import { isKeyHotkey } from 'is-hotkey';
import { Editable, withReact, useSlate, useSelected } from 'slate-react';
import * as SlateReact from 'slate-react';
import {
  Transforms,
  Editor,
  Range,
  createEditor,
  Element as SlateElement,
  Descendant,
  BaseEditor,
} from 'slate'
import { HistoryEditor, withHistory } from 'slate-history';
import { CustomEditor, LinkElement } from '../../custom-types';

import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Toolbar } from '../../components/Toolbar';


const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          'In addition to block nodes, you can create inline nodes. Here is a ',
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlink' }],
      },
      {
        text: ', and here is a more unusual inline: an ',
      },
      {
        type: 'button',
        children: [{ text: 'editable button' }],
      },
      {
        text: '!',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          'There are two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected. ',
      },
      // The following is an example of an inline at the end of a block.
      // This is an edge case that can cause issues.
      {
        type: 'link',
        url: 'https://twitter.com/JustMissEmma/status/1448679899531726852',
        children: [{ text: 'Finally, here is our favorite dog video.' }],
      },
      { text: '' },
    ],
  },
]
const InlinesExample = () => {
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  )

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    const { selection } = editor

    // Default left/right behavior is unit:'character'.
    // This fails to distinguish between two cursor positions, such as
    // <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
    // Here we modify the behavior to unit:'offset'.
    // This lets the user step into and out of the inline without stepping over characters.
    // You may wish to customize this further to only use unit:'offset' in specific cases.
    if (selection && Range.isCollapsed(selection)) {
      const { nativeEvent } = event
      if (isKeyHotkey('left', nativeEvent)) {
        event.preventDefault()
        Transforms.move(editor, { unit: 'offset', reverse: true })
        return
      }
      if (isKeyHotkey('right', nativeEvent)) {
        event.preventDefault()
        Transforms.move(editor, { unit: 'offset' })
        return
      }
    }
  }

  return (
    <SlateReact.Slate editor={editor} value={initialValue}>
      <Toolbar>
        <AddLinkButton />
        <RemoveLinkButton />
      </Toolbar>
      <Editable
        renderElement={props => <Element {...props} />}
        renderLeaf={props => <Text {...props} />}
        placeholder="Enter some text..."
        onKeyDown={onKeyDown}
      />
    </SlateReact.Slate>
  )
}

const withInlines = (editor: BaseEditor & SlateReact.ReactEditor & HistoryEditor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element: any) =>
    ['link'].includes(element.type) || isInline(element)

  editor.insertText = (text: string) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data: any) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertLink = (editor: CustomEditor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}


const isLinkActive = (editor: CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
  return !!link
}


const unwrapLink = (editor: CustomEditor) => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
}


const wrapLink = (editor: CustomEditor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}


// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    className='text-[0]'
  >
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)

const LinkComponent = ({ attributes, children, element }: any) => {
  const selected = useSelected()
  return (
    <a
      {...attributes}
      href={element.url}
      className={
        selected
          ? 'shadow shadow-red-500'
          : ''
      }
    >
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  )
}

const Element = (props: JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'link':
      return <LinkComponent {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Text = (props: { attributes: any; children: any; leaf: any }) => {
  const { attributes, children, leaf } = props
  return (
    <span
      // The following is a workaround for a Chromium bug where,
      // if you have an inline at the end of a block,
      // clicking the end of a block puts the cursor inside the inline
      // instead of inside the final {text: ''} node
      // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
      className={
        leaf.text === ''
          ? 'pl-[0.1px]'
          : null
      }
      {...attributes}
    >
      {children}
    </span>
  )
}

const AddLinkButton = () => {
  const editor = useSlate()
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event: any) => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertLink(editor, url)
      }}
    >
      <Icon>link</Icon>
    </Button>
  )
}

const RemoveLinkButton = () => {
  const editor = useSlate()

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event: any) => {
        if (isLinkActive(editor)) {
          unwrapLink(editor)
        }
      }}
    >
      <Icon>link_off</Icon>
    </Button>
  )
}


export default InlinesExample