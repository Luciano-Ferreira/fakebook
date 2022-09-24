import { useSlate } from 'slate-react';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Popover } from '@headlessui/react';
import { useState, useEffect } from 'react';
import EmojiPicker from './EmojiPicker';
import { Editor } from 'slate';


export const EmojiPickerButton = ({ format, icon }: { format: string, icon?: any }) => {
  const editor = useSlate();

  const [chosenEmoji, setChosenEmoji] = useState<any>(null);


  const onEmojiClick = async (event: any, emojiObject: any) => {

    setTimeout(() => {
      setChosenEmoji(event.native);
    }, 100);
    
    Editor.insertText(editor, event.native!)

  };
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button>
            <Button
              active={open}
              onMouseDown={(event: { preventDefault: () => void; }) => {
                event.preventDefault()
              }}
            >
              <Icon>{icon}</Icon>
            </Button>
          </Popover.Button>
          <Popover.Panel className='absolute right-4'>
            <EmojiPicker onEmojiSelect={onEmojiClick} />
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}
