import React, { FC, FormEvent, ReactElement, useState } from 'react';
import FormDataProps, { Rules } from '@/api/types/form';
import { validate } from '@/utils/validateForm';
import styles from './index.module.scss';

interface FormProps {
  formData: FormDataProps;
  rules: Rules[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children?: ReactElement[];
}

const Form: FC<FormProps> = (props) => {
  const [errors, setErrors] = useState<{ [k in keyof typeof props.formData]?: string[] }>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = checkInput();
    if (validate) props.onSubmit?.(e);
  };
  const checkInput = () => {
    if (props.formData && props.rules) {
      Object.keys(props.formData).forEach((key) => {
        setErrors((pre) => ({ ...pre, [key]: undefined }));
      });
      const err = validate(props.formData, props.rules);
      if (Object.keys(err).length) {
        setErrors(err)
        return false;
      } else {
        return true;
      }
    }
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {React.Children.map(props.children, (c) => {
        if (!c) return null;
        const itemProps = {
          value: props.formData[c?.props?.prop],
          error: errors[c?.props?.prop] ? errors[c?.props?.prop]?.[0] : '　',
        };

        return React.cloneElement(c, itemProps);
      })}
    </form>
  );
};
export default Form;
