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
        const url = window.prompt('Enter the URL of the image:')
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        insertImage(editor, url!)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const insertImage = (editor: CustomEditor, url: string) => {
  const text = { text: '' }
  
  const image: ImageElement = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}


const isImageUrl = (url: string) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()

  return imageExtensions.includes(ext!)
}

export default InsertImageButton