import { FC, useState } from 'react';
import styles from './index.module.scss';
import { Icon, Popup } from '@/Components';
interface InputPadProps {
  className?: string;
}
export const InputPad: FC<InputPadProps> = (props) => {
  const [visible, setVisible] = useState(false)
  const onClickDate = () => {
    console.log('点击了');

    setVisible(!visible)
  }
  return (
    <div className={[styles.wrap, props.className].join(' ')}>
      <div className={styles.top}>
        <span className={styles.date}>
          <Icon name="calendar" className={styles.icon}></Icon>
          <span>2001-02-03</span>
        </span>
        <code>123285</code>
      </div>
      <div className={styles.bottom}>
        <div className={styles.pad_wrap}>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>0</button>
          <button>.</button>
          <button>清空</button>
          <button>提交</button>
        </div>
      </div>
      <Popup visible={visible} onClickMask={() => setVisible(false)} />
    </div>
  );
};
