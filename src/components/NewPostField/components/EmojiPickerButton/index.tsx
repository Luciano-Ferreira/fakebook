import { useSlate } from 'slate-react';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Popover } from '@headlessui/react';
import { useState } from 'react';
import EmojiPicker from './EmojiPicker';
import { Editor } from 'slate';


export const EmojiPickerButton = ({ format, icon }: { format: string, icon?: any }) => {
  const editor = useSlate();

  const onEmojiClick = async (event: any) => {
    Editor.insertText(editor, event.native!)
  };

  function handlePicker(event: Event) {
    event.preventDefault()
  }
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button>
            <Button
              active={open}
              onMouseDown={handlePicker}
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
