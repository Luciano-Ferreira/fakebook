import { useState } from 'react';
import Picker from 'emoji-picker-react';

export const EmojiPickerButton = () => {
  const [chosenEmoji, setChosenEmoji] = useState<any | null>(null);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div>
      {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  )
}
