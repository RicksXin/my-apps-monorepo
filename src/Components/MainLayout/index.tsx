import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '@/Components/index';
import { IconName } from '../Icon';
interface MainLayoutProps {
  title: string;
  icon?: IconName;
  children: ReactElement;
}
const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div>
      <NavBar title={props.title} icon={props.icon || 'menu'} />
      {props.children}
      <Outlet />
    </div>
  );
};

export default MainLayout;
