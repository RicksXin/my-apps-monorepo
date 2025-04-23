import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import { FormItem } from '@/components/Form/Components/FormItem';
import { LineChart } from '@/pages/Components/ChartModule/Line';
import { PieChart } from '@/pages/Components/ChartModule/Pie';
import { BarChart } from '@/pages/Components/ChartModule/Bar';
import { getSummary } from '@/api/item';
import { onError } from '@/utils/onError';
import { ItemSummaryByHappenAt, ItemSummaryByTagId } from '@/api/types/items';
import { Time } from '@/utils/time';
import { TagDTO } from '@/api/types/tags';

import styles from './index.module.scss';

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      default: new Time().firstDayOfMonth().format(),
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      default: new Time().lastDayOfMonth().format(),
      required: true,
    },
    custom: {
      type: Boolean,
      default: false,
    }
  },
  setup: (props) => {
    const kind = ref('expenses');
    const rawData = reactive<{
      line: ItemSummaryByHappenAt | null;
      pie: ItemSummaryByTagId | null;
    }>({ line: null, pie: null });

    const getLineData = async () => {
      const { data: line } = await getSummary({
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        group_by: 'happen_at',
      }).catch(onError);
      Object.assign(rawData, { line });
    };
    const getPieData = async () => {
      const { data: pie } = await getSummary({
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        group_by: 'tag_id',
      }).catch(onError);
      Object.assign(rawData, { pie });
    };

    const lineChartData = computed<[string, number][]>(() => {
      let dataIndex = 0;
      const days = (+new Date(props.endDate) - +new Date(props.startDate)) / 86400000 + 1;
      const arr: [string, number][] = Array.from(new Array(days), (_, d) => {
        const time = new Time(props.startDate).add(d, 'day').format();
        const data = rawData.line?.groups;
        return [time, time === data?.[dataIndex]?.happen_at ? data[dataIndex++].amount : 0];
      });
      return arr;
    });
    onMounted(() => {
      if (props.custom) return
      getLineData()
    });
    watch(() => kind.value, getLineData);

    const pieChartData = computed<{
      value: number;
      name: string;
    }[]>(() => rawData.pie?.groups?.map((item) => ({
      value: item.amount,
      name: item.tag.name,
    })) || []);

    const barChartData = computed<{
      tag: TagDTO;
      amount: number;
      percent: string;
    }[]>(() => {
      const total = rawData.pie?.groups?.reduce((sum, item) => sum + item.amount, 0) ?? 1;
      return (
        rawData.pie?.groups?.map(({ amount, tag }) => ({
          tag,
          amount,
          percent: Math.round((amount / total) * 100) + '%',
        })) || []);
    });
    onMounted(() => {
      if (props.custom) return
      getPieData()
    });
    watch(() => kind.value, getPieData);
    watch(() => [props.startDate, props.endDate], () => {
      getLineData();
      getPieData()
    })

    return () => (
      <div class={styles.wrapper}>
        <FormItem
          v-model={kind.value}
          label="类型"
          type="select"
          options={[
            { value: 'expenses', text: '支出' },
            { value: 'income', text: '收入' },
          ]}
        />
        <LineChart data={lineChartData.value} />
        <PieChart data={pieChartData.value} />
        <BarChart data={barChartData.value} />
      </div>
    );
  },
});
