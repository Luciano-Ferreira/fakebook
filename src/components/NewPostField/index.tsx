import isHotkey from 'is-hotkey';
import { Code, LinkSimpleHorizontal, TextBolder, Image, Smiley } from 'phosphor-react';
import { useCallback, useMemo, useState } from 'react';
import { 
  BaseEditor,
  createEditor, 
  Descendant, 
  Editor, 
  Transforms, 
  Element as SlateElement,
  Node 
} from 'slate';

import { withHistory } from 'slate-history';

import { withReact, Slate, Editable, ReactEditor } from 'slate-react';
import { CustomElement, CustomText } from './types';

import { Leaf } from './Leaf';
import { Toolbar } from './components/Toolbar';

import { Element } from './Element';


import styles from './styles.module.scss';
import { MarkButton, toggleMark } from './MarkButton';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// types and hotkey shortcuts
const htk = 'mod+b' as string;
const HOTKEYS = {
  'mod+b': 'bold'
}



export const NewPostField = () => {
  const [value, setValue]= useState<Descendant[]>([{ type: 'paragraph', children: [{ text: '' }] }]);

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className={styles.container}>
      <Slate
        editor={editor}
        value={value}
        onChange={(val) => {
          if (val !== value) {
            setValue(val);
          }
        }}
      >
        <Toolbar>
          <MarkButton format='bold' icon={<TextBolder />} />
          <MarkButton format='link' icon={<LinkSimpleHorizontal />} />
          <MarkButton format='code' icon={<Code />} />
          <MarkButton format='image' icon={<Image />} />
          <MarkButton format='emoji' icon={<Smiley />} />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          onKeyDown={(event: any) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[htk as keyof typeof HOTKEYS]
                toggleMark(editor, mark)
              }
            }
          }}
          className='w-full bg-gray-900 border-0 resize-none p-4 rounded-lg text-gray-100 leading-[1.4] mt-4'
          placeholder='Em o que você está pensando?'

        />
      </Slate>
      <button
        onClick={() => console.log(JSON.stringify(value))}
      >
        Postar
      </button>
    </div>
  )
}

