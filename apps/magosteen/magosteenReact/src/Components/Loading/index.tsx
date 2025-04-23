import { FC } from "react";
import Icon from '../Icon';
import styles from './index.module.scss'
interface LoadingProps {
  title?: string;
}

const Loading: FC<LoadingProps> = (props) => {
  return (
    <div className={styles.loading_wrap}>
      <Icon name='loading' />
      <div className={styles.loading_text}>
        {props.title || '加载中...'}
      </div>
    </div>
  );
}

export default Loading;