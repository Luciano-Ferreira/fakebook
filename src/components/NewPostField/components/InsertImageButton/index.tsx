import { Transforms } from 'slate'
import { useSlateStatic } from 'slate-react'
import { CustomEditor, ImageElement } from '../../custom-types'
import { Button } from '../Button'
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'
import { Icon } from '../Icon'

interface Props {
  icon: any;
  format: string;
}
const InsertImageButton = ({ icon }: Props) => {
  const editor = useSlateStatic()
  return (
    <Button
      onMouseDown={(event: Event) => {
        event.preventDefault()
        const src = window.prompt('Enter the URL of the image:')
        if (src && !isImageUrl(src)) {
          alert('URL is not an image')
          return
        }
        insertImage(editor, src!)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const insertImage = (editor: CustomEditor, src: string) => {
  const text = { text: '' }
  
  const image: ImageElement = { width: 1500, height: 1500, mimeType: 'image/png', handle: 'N3JOKsXrT9ezCU4Ba6LI', type: 'image', src, alt: 'test', children: [text] }
  Transforms.insertNodes(editor, image)
}


const isImageUrl = (url: string) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()

  return imageExtensions.includes(ext!)
}

export default InsertImageButton