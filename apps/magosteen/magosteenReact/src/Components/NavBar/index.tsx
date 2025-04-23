import { FC, MouseEventHandler } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon, { IconName } from '@/Components/Icon';
import useMenuStore from '@/stores/useMenuStore';
import OverlayIcon from '../OverlayIcon';
import styles from './index.module.scss';


interface NavBarProps {
  title: string;
  icon: IconName;
}
export const NavBar: FC<NavBarProps> = ({ icon, title }) => {
  const { visible, setVisible } = useMenuStore()
  const nav = useNavigate();
  const [params] = useSearchParams();
  const goBack: MouseEventHandler<SVGSVGElement> | undefined = () => {
    const return_to = params.get('return_to');
    if (return_to) {
      nav(return_to.toString());
    } else {
      nav(-1);
    }
  };
  const openMenu: MouseEventHandler<SVGSVGElement> | undefined = () => {
    setVisible(!visible);
  };
  return (
    <div className={styles.navbar}>
      {icon ? (
        <span className={styles.icon_wrapper}>
          <Icon name={icon} className={styles.icon} onClick={icon === 'menu' ? openMenu : goBack} />
        </span>
      ) : null}
      <span className={styles.title_wrapper}>{title}</span>
      {icon === 'menu' ? (
        <OverlayIcon />
      ) : null}
    </div>
  );
};

export default NavBar;
