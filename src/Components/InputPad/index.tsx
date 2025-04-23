// import { DatetimePicker, Popup } from 'vant';
import { Time } from '@/utils/time';
import { FC, useRef } from 'react';
import { Icon } from '../Icon';
import styles from './index.module.scss';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}
interface InputPadProps {
  happenAt: string;
  amount: number;
  disabled?: boolean;
  onSelectHappenAt: (happen_at: string) => void;
  onInputAmount: (amount: number) => void;
  onSubmit: () => void;
}
const InputPad: FC<InputPadProps> = (props) => {
  const amount = useRef<String>(props.amount ? `${props.amount}` : '');
  const isShow = useRef(false);
  const disabled = useRef<boolean>(false);
  const appendText = (n: number | string) => {
    const ns = n.toString();
    const m = amount.current;
    const dotIndex = m.indexOf('.');
    if (m.length >= 13) return;
    if (dotIndex >= 0 && m.length - dotIndex > 2) return;
    if (ns === '0' && dotIndex === -1 && m === '0') return;
    if (ns === '.' && dotIndex !== -1) return;
    if (m === '0' && ns !== '.') amount.current = '';
    amount.current += `${n}`;
  };
  const setDate = (date: Date) => {
    props.onSelectHappenAt(date.toISOString());
    hideDatePicker();
  };
  const showDatePicker = () => {
    isShow.current = true;
  };
  const hideDatePicker = () => {
    isShow.current = false;
  };
  const keyMaps: ButtonProps[] = [
    {
      text: '1',
      onClick: () => {
        appendText('1');
      },
    },
    {
      text: '2',
      onClick: () => {
        appendText('2');
      },
    },
    {
      text: '3',
      onClick: () => {
        appendText('3');
      },
    },
    {
      text: '4',
      onClick: () => {
        appendText('4');
      },
    },
    {
      text: '5',
      onClick: () => {
        appendText('5');
      },
    },
    {
      text: '6',
      onClick: () => {
        appendText('6');
      },
    },
    {
      text: '7',
      onClick: () => {
        appendText('7');
      },
    },
    {
      text: '8',
      onClick: () => {
        appendText('8');
      },
    },
    {
      text: '9',
      onClick: () => {
        appendText('9');
      },
    },
    {
      text: '.',
      onClick: () => {
        appendText('.');
      },
    },
    {
      text: '0',
      onClick: () => {
        appendText('0');
      },
    },
    {
      text: '清空',
      onClick: () => {
        amount.current = '0';
      },
    },
    {
      text: '提交',
      onClick: () => {
        props.onInputAmount(+amount.current);
        props.onSubmit?.();
      },
    },
  ];
  return (
    <div className={styles.number_keyboard}>
      <div className={styles.number_keyboard__header}>
        <span className={styles.date}>
          <Icon name="date" className={styles.icon} onClick={showDatePicker} />
          <span>
            <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
            {/* <Popup position="bottom" v-model:show={isShow.current}>
              <DatetimePicker
                modelValue={props.happenAt ? new Date(props.happenAt) : new Date()}
                type="date"
                title="选择年月日"
                onConfirm={setDate}
                onCancel={hideDatePicker}
              />
            </Popup> */}
          </span>
        </span>
        <span className={styles.amount}>{amount.current}</span>
      </div>
      <div className={styles.number_keyboard__body}>
        <div className={styles.number_keyboard__body_keys}>
          {keyMaps.map((key) => (
            <button
              key={key.text}
              onClick={key.onClick}
              className={disabled.current ? styles.disabled : ''}
            >
              {key.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputPad;
