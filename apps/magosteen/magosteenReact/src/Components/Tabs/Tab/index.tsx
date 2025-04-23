import { FC, ReactNode } from 'react';

interface TabProps {
  id: string;
  name: string;
  onClick?: Function;
  className?: string;
  children?: ReactNode;
}
const Tab: FC<TabProps> = (props) => (
  <div className={props.className} onClick={props?.onClick?.()}>
    {props.children}
  </div>
);

export default Tab;
