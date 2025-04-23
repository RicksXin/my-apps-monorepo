import { FC, MouseEvent, ReactElement, useMemo, useState } from 'react';
import styles from './index.module.scss';

interface ButtonProps {
  level?: 'important' | 'normal' | 'danger';
  type?: 'submit' | 'button';
  disabled?: boolean;
  autoSelfDisabled?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactElement | string;
}

const Button: FC<ButtonProps> = (props) => {
  const [selfDisabled, setSelfDisabled] = useState<boolean>(false);
  const _disabled = useMemo(() => {
    if (!props.autoSelfDisabled) return props.disabled;
    return selfDisabled || props.disabled;
  }, [props.autoSelfDisabled, props.disabled]);
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    setSelfDisabled(true);
    setTimeout(() => {
      setSelfDisabled(false);
    }, 500);
  };
  return (
    <button
      className={[
        styles.btn,
        props.className,
        props.disabled || _disabled ? styles.disabled : '',
        styles[props.level || 'normal'],
      ].join(' ')}
      type={props.type}
      disabled={_disabled}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};
Button.defaultProps = {
  level: 'normal',
  type: 'button',
  disabled: false,
  autoSelfDisabled: false,
  onClick: undefined,
};
export default Button;
