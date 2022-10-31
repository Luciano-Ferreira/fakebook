/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEditor, Editor } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { CustomEditor } from '../../custom-types';

export const toggleMark = (editor: BaseEditor & ReactEditor & CustomEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor: BaseEditor & ReactEditor & CustomEditor, format: string) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format as keyof typeof marks] === true : false;
};


export const MarkButton = ({ format, icon }: { format: string, icon?: any }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: { preventDefault: () => void; }) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
