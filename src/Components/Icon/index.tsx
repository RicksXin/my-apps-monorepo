import { FC, MouseEventHandler } from 'react';
import styles from './index.module.scss';

export type IconName =
  | 'add'
  | 'logo'
  | 'chart'
  | 'clock'
  | 'cloud'
  | 'mangosteen'
  | 'pig'
  | 'menu'
  | 'back'
  | 'export'
  | 'charts'
  | 'notify'
  | 'back'
  | 'date'
  | 'loading'
  | 'none'
  | 'calendar';
interface IconProps {
  name: IconName;
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
}
export const Icon: FC<IconProps> = (props) => {
  return (
    <svg className={[styles.icon, props.className].join(' ')} onClick={props.onClick}>
      {props.name === 'none' ? null : <use xlinkHref={'#' + props.name}></use>}
    </svg>
  );
};

export default Icon;
