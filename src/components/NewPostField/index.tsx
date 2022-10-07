import isHotkey from 'is-hotkey';
import { Code, LinkSimpleHorizontal, TextBolder, Image, Smiley } from 'phosphor-react';
import {
  FormEvent,
  useCallback,
  useMemo,
  useState
} from 'react';

import {
  createEditor,
  Descendant
} from 'slate';

import { withHistory } from 'slate-history';

import {
  withReact,
  Slate,
  Editable,
  RenderElementProps,
  RenderLeafProps
} from 'slate-react';

import { Leaf } from './Leaf';
import { Toolbar } from './components/Toolbar';
import InsertImageButton from './components/InsertImageButton';

import { Element } from './Element';

import { MarkButton, toggleMark } from './components/MarkButton';
import InsertLinkButton from './components/InsertLinkButton';
import { withInlines } from './components/InsertLinkButton';
import { EmojiPickerButton } from './components/EmojiPickerButton';

import styles from './styles.module.scss';
import { useCreateNewPostMutation } from '../../graphql/generated';

// types and hotkey shortcuts
const htk = 'mod+b' as string;
const HOTKEYS = {
  'mod+b': 'bold'
}



export const NewPostField = () => {
  const [value, setValue] = useState<Descendant[]>([{ type: 'paragraph', children: [{ text: '' }] }]);
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const editor = useMemo(() => withInlines(withHistory(withReact(createEditor()))), []);

  const [createNewPost, { loading, error }] = useCreateNewPostMutation();

  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const newPostData = await createNewPost({
      variables: {
        customerId: 'cl58rsmw49vv00blrkbyt9s66',
        content: { children: value }
      }
    })
    console.log(loading)
    console.log(error)
    console.log(newPostData)
  }

  return (
    <form className={styles.postForm} onSubmit={handleSubmit}>
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
          <InsertLinkButton format='link' icon={<LinkSimpleHorizontal />} />
          <MarkButton format='code' icon={<Code />} />
          <InsertImageButton format='image' icon={<Image />} />
          <EmojiPickerButton format='emoji' icon={<Smiley />} />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
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

      <footer>
        <button
          type='submit'
          onClick={() => console.log(JSON.stringify(value))}
        >
          Postar
        </button>
      </footer>

    </form>
  )
}

