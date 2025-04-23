import { defineComponent, onMounted, onUpdated, PropType, ref, watch } from 'vue';
import * as echarts from 'echarts';
import { Time } from '@/utils/time';
import styles from './index.module.scss';

const echartsOption = {
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: ([item]: any) => {
      const [x, y] = item.data
      return `${new Time(new Date(x)).format('YYYY年MM月DD日')} ￥${y}`
    },
  },
  grid: [{ left: 16, top: 20, right: 16, bottom: 20 }],
  xAxis: {
    type: 'time',
    boundaryGap: ['3%', '0%'],
    axisLabel: {
      formatter: (value: string) => new Time(new Date(value)).format('MM-DD'),
    },
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    show: true,
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
    axisLabel: {
      show: false,
    },
  },
}

export const LineChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<[string, number][]>,
      required: true
    }
  },
  setup: (props) => {
    const refDiv = ref<HTMLElement>();
    let myChart: echarts.ECharts | null = null
    onMounted(() => {
      if (!refDiv.value) return;
      myChart = echarts.init(refDiv.value);
      myChart.setOption({
        ...echartsOption,
        series: [{
          data: props.data,
          type: 'line'
        }]
      });
    });
    watch(() => props.data, () => {
      myChart?.setOption({
        series: [{
          data: props.data,
        }]
      });
    })
    return () => <div ref={refDiv} class={styles.line_wrapper}></div>;
  },
});
