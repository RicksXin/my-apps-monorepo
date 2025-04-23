import { Children, FC, ReactElement } from 'react';
import Tab from './Tab';
import styles from './index.module.scss';

interface TabProps {
  selected: string;
  classPrefix?: string;
  children?: ReactElement | ReactElement[];
  className?: string;
  onSelected: (key: string) => void;
}
const Tabs: FC<TabProps> = (props) => {
  const childrenArray = Children.toArray(props.children) as ReactElement[];
  const cp = props.classPrefix;
  if (!childrenArray) return <></>;
  childrenArray.forEach((v) => {
    if (typeof v.type === 'symbol') return;
    if (v.type !== Tab) {
      throw new Error('<Tabs> only accepts <Tab> as children');
    }
  });

  return (
    <div className={[styles.tabs, cp + '_tabs', props.className].join(' ')}>
      <ol className={styles.tabs_nav}>
        {childrenArray
          .filter((v) => v.type === Tab)
          .map((item) => (
            <li
              className={[
                item.props?.id === props.selected
                  ? [styles.selected, cp + '_selected'].join(' ')
                  : '',
                cp + '_tabs_nav_item',
                props?.className,
              ].join(' ')}
              key={item.props.id}
              onClick={() => {
                props.onSelected(item.props.id);
              }}
            >
              {item.props?.name || item.props?.id}
            </li>
          ))}
      </ol>
      <div className={styles.tab_content}>
        {childrenArray.find((content) => content.props?.id === props.selected)}
      </div>
    </div>
  );
};

export default Tabs;
