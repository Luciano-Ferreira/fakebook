import { BaseEditor, Editor, Transforms, Element, Range } from 'slate';
import { useSlate } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import * as SlateReact from 'slate-react';
import { CustomEditor, LinkElement } from '../../custom-types';
import { Button } from '../Button';
import { Icon } from '../Icon';
import isUrl from 'is-url';
import { Fragment, useState } from 'react';

import styles from './styles.module.scss';
import { Dialog, Transition } from '@headlessui/react';

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
  const [isOpen, setIsOpen] = useState(false);


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleLinkButton(event: Event) {
    event.preventDefault()
    // const href = window.prompt('Digite ou cole um link aqui:')
    // if (!href) return
    // insertLink(editor, href)

    openModal()
  }

  function onSendLink(event: any) {
    event.preventDefault();


    const href = event.target.href.value;
    const title = event.target.title.value;
    const openInNewTab = event.target.openInNewTab.value == 'on' ? true : false;

    insertLink(editor, href, title, openInNewTab)

    closeModal()

  }

  return (

    <>

      <Button
        active={isLinkActive(editor)}
        onMouseDown={handleLinkButton}
        format={format}

      >
        <Icon>
          {icon}
        </Icon>
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className={styles.dialog} onClose={closeModal} open={isOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left shadow-xl transition-all'>
                  <Dialog.Title
                    as='h1'
                    className='text-lg font-bold leading-6 text-gray-100'
                  >
                    Inserir link
                  </Dialog.Title>
                  <form onSubmit={onSendLink} className={styles.formImg}>
                    <label>
                      Link/url:
                      <input type="text" name='href' />
                    </label>
                    <label>
                      Titulo:
                      <input type="text" name='title' />
                    </label>
                    <label>
                      Abrir em uma nova aba:
                      <input type="checkbox" name='openInNewTab'/>
                    </label>

                    <div className='mt-4'>
                      <button
                        type='submit'
                        className='inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white-100 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                      >
                        Inserir
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
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


const insertLink = (editor: CustomEditor, href: string, title: string, openInNewTab: boolean) => {
  if (editor.selection) {
    wrapLink(editor, href, title, openInNewTab)
  }
}

export const withInlines = (editor: BaseEditor & SlateReact.ReactEditor & HistoryEditor, title: string, openInNewTab: boolean) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element: any) =>
    ['link'].includes(element.type) || isInline(element)

  editor.insertText = (text: string) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text, title, openInNewTab)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data: any) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text, title, openInNewTab)
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


const wrapLink = (editor: CustomEditor, href: string, title: string, openInNewTab: boolean) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection);


  const link: LinkElement = {
    type: 'link',
    href,
    title,
    openInNewTab,
    children: isCollapsed ? [{ text: href }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}


export default InsertLinkButton