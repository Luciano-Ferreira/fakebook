import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.scss';

export function Comment(): JSX.Element {
  return (
    <div className={styles.comment}>
      <img src="https://github.com/luciano-ferreira.png" alt="Luciano Silva" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
            <strong>Luciano Silva</strong>
            <time
              title='11 de maio às 08:13'
              dateTime='2022-05-11 08:13:30'
            >
              Cerca de 1h atrás
            </time>
            </div>
            <button title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>Muito bom Dev parabains 👊</p>
        </div>
        <footer className={styles.footerComment}>
          <button>
            <ThumbsUp size={20} /> Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}