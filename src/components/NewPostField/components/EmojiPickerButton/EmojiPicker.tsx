import { useEffect, useRef } from 'react';

import data from '@emoji-mart/data';
import { Picker, PickerProps } from 'emoji-mart';
import i18n from '@emoji-mart/data/i18n/pt.json';
i18n.search_no_results_1 = 'Sem Resultados';

import styles from './styles.module.scss';

const EmojiPicker = (props: PickerProps | Readonly<PickerProps> | any) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    new Picker({ ...props, data, ref, i18n });
  }, [props]);

  return (
    <div className={styles.emEmojiPicker} ref={ref} />
  )
};

export default EmojiPicker;