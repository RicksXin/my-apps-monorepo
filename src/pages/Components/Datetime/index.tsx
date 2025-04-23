import { Time } from '@/utils/time';
import { computed, defineComponent, PropType } from 'vue';

export const DateTime = defineComponent({
  props: {
    value: {
      type: [Date, String] as PropType<string | Date>,
      required: true,
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  setup: (props) => {
    const displayTime = computed(() => new Time(props.value).format(props.format));
    return () => <div>{displayTime.value}</div>;
  },
});
