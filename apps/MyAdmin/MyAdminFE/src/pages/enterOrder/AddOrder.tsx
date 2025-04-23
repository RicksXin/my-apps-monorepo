import {
  ElButton,
  ElDatePicker,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRow,
  ElSelect,
  ElTabPane,
  ElTabs,
} from 'element-plus';
import { defineComponent, nextTick, reactive, ref } from 'vue';
import { OrderProperty } from '@/api/types/order';
import ProductTable from './ProductTable';
import { rules, salesPersonList, sourceList } from './const';
import styles from './index.module.less';
import { updateOrder } from '@/api/Order';

const AddOrder = defineComponent({
  emits: ['add', 'refresh'],
  setup: (_, ctx) => {
    const dialogVisible = ref(false);
    const formRef = ref();
    const form = reactive<OrderProperty>({
      orderDate: '2023-08-10',
      userName: '张先生',
      phone: '19087652341',
      address: '巢湖市城市之光',
      sourceId: 0,
      productList: [
        {
          name: '520床垫',
          quantity: 1,
          spec: '1.8米'
        },
      ],
      totalAmount: 3000,
      salesPerson: [0]
    });

    const hide = () => {
      dialogVisible.value = false;
    };
    const show = () => {
      if (form.sourceId === 1) {
        form.merchantInfo = {
          merchantName: '',
          commission: 0,
        };
      }
      nextTick(() => {
        if (formRef.value) formRef.value.clearValidate();
      });
      dialogVisible.value = true;
    };
    const cancel = async () => {
      hide();
    };
    const selectSource = (e: number) => {
      if (e === 1) {
        form.merchantInfo = {
          merchantName: '',
          commission: 0,
        };
      } else {
        form.merchantInfo = undefined;
      }
    };
    const submit = async () => {
      await formRef.value.validate();
      await updateOrder(form)
      hide();
      ctx.emit('refresh');
    };
    ctx.expose({ show });

    return () => (
      <ElDialog v-model={dialogVisible.value} closeOnClickModal={false} title="新增订单" width="70%">
        <ElForm ref={formRef} model={form} class={styles.form} rules={rules}>
          <ElTabs>
            <ElTabPane label="基本信息" />
          </ElTabs>
          <ElRow>
            <ElFormItem prop="orderDate" label="订单日期" required>
              <ElDatePicker v-model={form.orderDate} placeholder='请选择日期' valueFormat="YYYY-MM-DD" />
            </ElFormItem>
            <ElFormItem prop="totalAmount" label="订单金额（元）" required>
              <ElInputNumber v-model={form.totalAmount} min={0} precision={2} />
            </ElFormItem>
            <ElFormItem prop="salesPerson" label="导购" required>
              <ElSelect v-model={form.salesPerson} multiple collapseTags placeholder='请选择导购'>
                {
                  salesPersonList.map(person => <ElOption
                    value={person.value}
                    label={person.label}
                  />)
                }
              </ElSelect>
            </ElFormItem>
          </ElRow>
          <ElRow>
            <ElFormItem prop="userName" label="客户姓名" required>
              <ElInput v-model={form.userName} placeholder='请输入客户姓名' />
            </ElFormItem>
            <ElFormItem prop="phone" label="客户电话" required>
              <ElInput v-model={form.phone} placeholder='请输入客户电话' />
            </ElFormItem>
            <ElFormItem prop="address" label="送货地址" required>
              <ElInput v-model={form.address} style="width: 300px" placeholder='请输入送货地址' />
            </ElFormItem>
          </ElRow>
          <ElRow>
            <ElFormItem prop="sourceId" label="来客渠道" required>
              <ElSelect v-model={form.sourceId} onChange={selectSource}>
                {sourceList.map((source) => (
                  <ElOption value={source.value} label={source.label} />
                ))}
              </ElSelect>
            </ElFormItem>
            {form.sourceId === 1 && form.merchantInfo ? (
              <>
                <ElFormItem prop="merchantInfo.commission" label="分润额" required>
                  <ElInputNumber v-model={form.merchantInfo.commission} min={0} precision={2} />
                </ElFormItem>
              </>
            ) : null}
          </ElRow>

          <ElTabs>
            <ElTabPane label="产品信息" />
          </ElTabs>
          <ProductTable v-model:data={form.productList} />
          <div align="right" class={styles.footer}>
            <ElButton onClick={cancel}>取消</ElButton>
            <ElButton type="primary" onClick={submit}>
              保存
            </ElButton>
          </div>
        </ElForm>
      </ElDialog>
    );
  },
});

export default AddOrder;
