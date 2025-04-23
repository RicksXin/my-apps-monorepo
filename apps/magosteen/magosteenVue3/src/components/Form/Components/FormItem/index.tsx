import { computed, defineComponent, PropType, ref } from 'vue';
import FormDataProps, { Rules } from '@/api/types/form';
import { DatetimePicker, Popup } from 'vant';
import { Time } from '@/utils/time';
import { Button } from '@/components/Button';
import styles from './index.module.scss';

export const FormItem = defineComponent({
  props: {
    prop: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    label: {
      type: String,
    },
    rule: {
      type: Object as PropType<Rules>,
    },
    type: {
      type: String as PropType<'date' | 'validation' | 'select'>,
    },
    options: Array as PropType<Array<{ value: string; text: string }>>,
    error: String,
    placeholder: String,
    onClick: Function as PropType<((e: MouseEvent) => void) | undefined>,
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {

    const refDateVisible = ref(false);
    const content = computed(() => {
      const children = context.slots.default?.();
      const button = context.slots.button?.();
      return (
        <div class={styles.form_item_value}>
          {children ? (
            children.map((c) => <c class={props.error?.length! > 1 ? styles.error : ''} />)
          ) : (
            <>
              {props.type === 'select' ? (
                <select
                  class={[styles.form_item, styles.select]}
                  value={props.modelValue}
                  onChange={(e: any) => {
                    context.emit('update:modelValue', e.target.value);
                  }}
                >
                  {props.options?.map((option) => (
                    <option value={option.value}>{option.text}</option>
                  ))}
                </select>
              ) : (
                <>
                  {' '}
                  <input
                    value={props.modelValue}
                    readonly={props.type === 'date'}
                    placeholder={props.placeholder}
                    onInput={(e: any) => {
                      context.emit('update:modelValue', e.target.value);
                    }}
                    onClick={() => {
                      if (props.type === 'date') {
                        refDateVisible.value = true;
                      }
                    }}
                    class={[
                      styles.form_item,
                      styles.input,
                      button ? styles.input_with_button : '',
                      props.error?.length! > 1 ? styles.error : '',
                    ]}
                  />
                  {props.type === 'date' ? (
                    <Popup position="bottom" v-model:show={refDateVisible.value} teleport="body">
                      <DatetimePicker
                        modelValue={props.modelValue ? new Date(props.modelValue) : new Date()}
                        type="date"
                        title="选择年月日"
                        onConfirm={(date: Date) => {
                          context.emit('update:modelValue', new Time(date).format());
                          refDateVisible.value = false;
                        }}
                        onCancel={() => (refDateVisible.value = false)}
                      />
                    </Popup>
                  ) : null}
                  {button ? <div class={[styles.slots_button]}>{button}</div> : null}
                </>
              )}
            </>
          )}
        </div>
      );
    });

    return () => (
      <div class={styles.form_row}>
        <label class={styles.form_label}>
          <span class={styles.form_item_name}>{props.label}</span>
          {content.value}
          <div class={styles.form_item_errorHint}>
            <span>{props.error}</span>
          </div>
        </label>
      </div>
    );
  },
});
