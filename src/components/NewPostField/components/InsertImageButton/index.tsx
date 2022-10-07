import { Transforms } from 'slate'
import { useSlateStatic } from 'slate-react'
import { CustomEditor, ImageElement } from '../../custom-types'
import { Button } from '../Button'
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'
import { Icon } from '../Icon'
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react'


import styles from './styles.module.scss';

interface Props {
  icon: any;
  format: string;
}
const InsertImageButton = ({ icon }: Props) => {
  const editor = useSlateStatic();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleImageButton(event: Event) {
    event.preventDefault()
    // const src = window.prompt('Enter the URL of the image:')
    // if (src && !isImageUrl(src)) {
    //   alert('URL isnt an image')
    //   return
    // }


    openModal();
  }

  function onSendImage(event: any) {
    event.preventDefault();

    const src = event.target.src.value;
    const alt = event.target.alt.value;
    const title = event.target.title.value;
    const width = event.target.width.value;
    const height = event.target.height.value;


    if (src && !isImageUrl(src)) {
      alert('URL isnt an image');
      return
    }

    insertImage(editor, src!, alt, title,width, height)
    console.log(src, alt, title, width, height)

    closeModal()
  }

  return (
    <>
      <Button
        onMouseDown={handleImageButton}
      >
        <Icon>{icon}</Icon>
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
                    Inserir imagem
                  </Dialog.Title>
                  <form onSubmit={onSendImage} className={styles.formImg}>
                    <label>
                      Link/src/url:
                      <input type="text" name='src' />
                    </label>
                    <label>
                      Texto alternativo:
                      <input type="text" name='alt' />
                    </label>
                    <label>
                      Titulo:
                      <input type="text" name='title' />
                    </label>
                    <label>
                      Largura:
                      <input type="text" name='width'/>
                    </label>
                    <label>
                      Altura:
                      <input type="text" name='height'/>
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

const isImageUrl = (src: string) => {
  if (!src) return false
  if (!isUrl(src)) return false
  const ext = new URL(src).pathname.split('.').pop()

  return imageExtensions.includes(ext!)
}
// width: 1500, height: 1500, src:'https://github.com/luciano-ferreira.png', alt:'test', mimeType: 'image/png'
const insertImage = (
  editor: CustomEditor,
  src: string,
  alt: string,
  title: string,
  width: number,
  height: number
) => {
  const text = { text: '' }

  const image: ImageElement = {
    width,
    height,
    mimeType: `image/${new URL(src).pathname.split('.').pop()}`,
    title,
    type: 'image',
    src,
    alt,
    children: [text]
  }

  Transforms.insertNodes(editor, image)
}


export default InsertImageButton