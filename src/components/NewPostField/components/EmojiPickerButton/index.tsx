import { BaseEditor, Editor } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { CustomEditor } from '../../custom-types';
import { Popover } from '@headlessui/react';
import Picker from 'emoji-picker-react';
import { useState, useCallback, useEffect } from 'react';



export const EmojiPickerButton = ({ format, icon }: { format: string, icon?: any }) => {
  const editor = useSlate();

  const [chosenEmoji, setChosenEmoji] = useState<any>(null);


  const onEmojiClick = async (event: any, emojiObject: any) => {
    useEffect(() => {

      setTimeout(() => {
        setChosenEmoji(emojiObject);
        console.log(event);
      }, 100);
      console.log(chosenEmoji.emoji);
      if (emojiObject !== null)
        editor.insertText(chosenEmoji.emoji!)
    }, [chosenEmoji])

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
            <Picker onEmojiClick={onEmojiClick} />
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}
