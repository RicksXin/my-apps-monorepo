import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import * as echarts from 'echarts';
import styles from './index.module.scss';

const defaultOption = {
  tooltip: {
    trigger: 'item',
    formatter: (x: { name: string; value: number; percent: number }) => {
      const { name, value, percent } = x;
      return `${name}: ￥${value} 占比 ${percent}%`;
    },
  },
  grid: [{ left: 0, top: 0, right: 0, bottom: 0 }],
  series: [
    {
      type: 'pie',
      radius: '50%',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};
export const PieChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ value: number; name: string }[]>,
      required: true,
    },
  },
  setup: (props) => {
    const refDiv = ref<HTMLDivElement>();
    const myChart = ref<echarts.ECharts>();
    onMounted(() => {
      if (refDiv.value === undefined) return;
      myChart.value = echarts.init(refDiv.value);
      myChart.value.setOption(defaultOption);
    });
    watch(
      () => props.data,
      () => {
        myChart.value?.setOption({
          series: [{ data: props.data }],
        });
      }
    );
    return () => <div ref={refDiv} class={styles.pie_wrapper} />;
  },
});
