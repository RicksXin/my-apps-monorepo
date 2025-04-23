import { defineComponent } from 'vue';
import { Charts } from '@/pages/Statistics/Charts';
import { TimeTabsLayout } from '@/pages/Components/TimeTabsLayout';

const StatisticsPage = defineComponent({
  setup: () => () => <TimeTabsLayout component={Charts} showYear={false} icon='back' />,
});

export default StatisticsPage;