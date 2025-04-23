import { Children, cloneElement, FC, ReactElement, useMemo } from "react";
import styles from './index.module.scss'

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'with_btn';
  value?: string | number;
  error?: string;
  className?: string;
  children?: ReactElement;
  onChange?: (value: string | number) => void;
}

const Input: FC<InputProps> = (props) => {
  const { placeholder, type, value, onChange, className, children } = props

  return (
    <div className={styles.container}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className={[
          styles.input,
          type === 'with_btn' ? styles.input_with_button : '',
          className
        ].join(' ')}
      />
      {type === 'with_btn' ? children : null}
    </div>
  )
}
export default Input;