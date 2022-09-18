import { BaseEditor, Editor, Transforms, Element, Range } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { HistoryEditor, withHistory } from 'slate-history';
import * as SlateReact from 'slate-react';
import { CustomEditor, LinkElement } from '../../custom-types';
import { Button } from '../Button';
import { Icon } from '../Icon';
import isUrl from 'is-url';

interface Props {
  format: string;
  icon: any;
}

const isLinkActive = (editor: CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  })
  return !!link
}

const InsertLinkButton = ({ format, icon }: Props) => {
  const editor = useSlate();
  
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event: any) => {
        event.preventDefault()
        const url = window.prompt('Digite ou cole um link aqui:')
        if (!url) return
        insertLink(editor, url)
      }}
      format={format} 
      
    >
      <Icon>
        {icon}
      </Icon>
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


const insertLink = (editor: CustomEditor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

export const withInlines = (editor: BaseEditor & SlateReact.ReactEditor & HistoryEditor) => {
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

const unwrapLink = (editor: CustomEditor) => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
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


export default InsertLinkButton