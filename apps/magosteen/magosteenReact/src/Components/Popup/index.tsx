import { FC, useState } from 'react';

import { useSpring, animated } from '@react-spring/web';

import styles from './index.module.scss';
interface PopupProps {
  visible: boolean;
  onClickMask: () => void;
}
export const Popup: FC<PopupProps> = (props) => {
  const { visible, onClickMask } = props;
  const [maskVisible, setMaskVisible] = useState(visible);
  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) {
        setMaskVisible(true);
      }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) {
        setMaskVisible(false);
      }
    },
  });
  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
  });
  return (
    <div>
      <animated.div
        className="bg-black:75"
        onClick={() => onClickMask?.()}
      // style={maskStyles2}
      />
      <animated.div style={menuStyles}></animated.div>
    </div>
  );
};

export default Popup;
