/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSlate } from 'slate-react';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Popover } from '@headlessui/react';
import EmojiPicker from './EmojiPicker';
import { Editor } from 'slate';


export const EmojiPickerButton = ({ format, icon }: { format: string, icon?: any }) => {
  const editor = useSlate();

  const onEmojiClick = async (emoji: any) => {
    await setTimeout(() => {
      Editor.end(editor, [0, 0]);
      

    }, 100);
    

    Editor.insertText(editor, emoji.native!);
  };
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button>
            <Button
              active={open}
              onMouseDown={(event: { preventDefault: () => void; }) => {
                event.preventDefault();
              }}
            >
              <Icon>{icon}</Icon>
            </Button>
          </Popover.Button>
          <Popover.Panel className='absolute right-4'>
            <EmojiPicker  onEmojiSelect={onEmojiClick} />
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};
