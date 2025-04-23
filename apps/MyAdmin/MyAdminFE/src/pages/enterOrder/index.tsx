import { ElTableColumn } from 'element-plus';
import { defineComponent, onMounted, ref } from 'vue';
import Grid from '../Components/Grid';
import Query from './Query';
import AddOrder from './AddOrder';
import { getOrderList } from '@/api/Order';

const EnterOrder = defineComponent({
  components: {
    Grid,
    ElTableColumn,
  },
  setup: () => {
    const grid = ref();
    const addOrder = ref();
    const loadData = async () => {
      return await getOrderList();
    };
    const add = () => {
      if (addOrder.value) {
        addOrder.value.show?.({});
      }
    };
    const load = () => {
      if (grid.value) {
        grid.value.loadData?.({});
      }
    }
    onMounted(() => {
      load()
    });
    return () => (
      <div>
        <Query onAdd={add} />
        <Grid ref={grid} remoteMethod={loadData}>
          <ElTableColumn label="订单Id" prop="orderId" />
          <ElTableColumn label="订单日期" prop="orderDate" />
          <ElTableColumn label="用户姓名" prop="userName" />
          <ElTableColumn label="用户联系方式" prop="phone" />
          <ElTableColumn label="送货地址" prop="address" />
        </Grid>
        <AddOrder ref={addOrder} onRefresh={load} />
      </div>
    );
  },
});

export default EnterOrder;
