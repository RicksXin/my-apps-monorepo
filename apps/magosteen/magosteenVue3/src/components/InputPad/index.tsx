import { DatetimePicker, Popup } from 'vant';
import { computed, defineComponent, PropType, ref, watch, watchEffect } from 'vue';
import { Time } from '@/utils/time';
import { Icon } from '../Icon';
import styles from './index.module.scss';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}
export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number,
    disabled: {
      type: Boolean,
      default: false,
    },
    onSubmit: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, context) => {
    const amount = ref<String>(props.amount ? `${props.amount}` : '');
    const isShow = ref(false);
    const disabled = ref<boolean>(false);
    const appendText = (n: number | string) => {
      const ns = n.toString();
      const m = amount.value;
      const dotIndex = m.indexOf('.');
      if (m.length >= 13) return;
      if (dotIndex >= 0 && m.length - dotIndex > 2) return;
      if (ns === '0' && dotIndex === -1 && m === '0') return;
      if (ns === '.' && dotIndex !== -1) return;
      if (m === '0' && ns !== '.') amount.value = '';
      amount.value += `${n}`;
    };
    const setDate = (date: Date) => {

      context.emit('update:happenAt', date.toISOString());
      hideDatePicker();
    };
    const showDatePicker = () => {
      isShow.value = true;
    };
    const hideDatePicker = () => {
      isShow.value = false;
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
          amount.value = '0';
        },
      },
      {
        text: '提交',
        onClick: () => {
          context.emit('update:amount', +amount.value);
          props.onSubmit?.();
        },
      },
    ];
    return () => (
      <div class={styles.number_keyboard}>
        <div class={styles.number_keyboard__header}>
          <span class={styles.date}>
            <Icon name="date" class={styles.icon} onClick={showDatePicker} />
            <span>
              <span onClick={showDatePicker}>{new Time(props.happenAt).format()}</span>
              <Popup position="bottom" v-model:show={isShow.value}>
                <DatetimePicker
                  modelValue={props.happenAt ? new Date(props.happenAt) : new Date()}
                  type="date"
                  title="选择年月日"
                  onConfirm={setDate}
                  onCancel={hideDatePicker}
                />
              </Popup>
            </span>
          </span>
          <span class={styles.amount}>{amount.value}</span>
        </div>
        <div class={styles.number_keyboard__body}>
          <div class={styles.number_keyboard__body_keys}>
            {keyMaps.map((key) => (
              <button onClick={key.onClick} class={disabled.value ? styles.disabled : ''}>
                {key.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
