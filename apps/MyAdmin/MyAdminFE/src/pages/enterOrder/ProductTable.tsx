import { PropType, defineComponent } from 'vue';
import { ElFormItem, ElInput, ElInputNumber, ElTable, ElTableColumn } from 'element-plus';
import { OrderProperty } from '@/api/types/order';
import { CirclePlus, Remove, Tools } from '@element-plus/icons-vue';

import styles from './index.module.less';

const ProductTable = defineComponent({
  props: {
    data: {
      type: Array as PropType<OrderProperty['productList']>,
      require: true,
      default: () => [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
  },
  emits: ['update:data'],
  setup: (props, ctx) => {
    const rules = {
      name: [{ required: true, message: '请输入商品名称', trigger: 'change' }],
      quantity: [{ required: true, message: '请输入商品数量', trigger: 'change' }],
      spec: [{ required: true, message: '请输入商品规格', trigger: 'change' }],
    };
    const addRow = (index: number) => {
      const temp = [...props.data];
      temp.splice(index + 1, 0, {
        name: '',
        quantity: 1,
      }),
        ctx.emit('update:data', temp);
    };
    const deleteRow = (index: number) => {
      if (index === 0 && props.data.length === 1) return;
      const temp = [...props.data];
      temp.splice(index, 1)
      ctx.emit('update:data', temp);
    };
    return () => (
      <ElTable
        class={styles.table}
        data={props.data}
        border
        headerCellStyle={{ background: '#eef1f6', color: '#606266' }}
      >
        <ElTableColumn
          prop="edit"
          label=""
          width="70"
          v-slots={{
            header: () => <div class={styles.toolswrap}>
              <Tools class={styles.tools} />
            </div>,
            default: (scope: any) => <div class={styles.operator}>
              <div class={styles.add} onClick={() => addRow(scope.$index)}>
                <CirclePlus />
              </div>
              <div
                class={[
                  styles.remove,
                  scope.$index === 0 && props.data.length === 1 ? styles.disabled : ''
                ]}
                onClick={() => deleteRow(scope.$index)}
              >
                <Remove />
              </div>
            </div>,
          }}
        ></ElTableColumn>
        <ElTableColumn
          prop="name"
          label="商品名称"
          width={200}
          v-slots={{
            default: (scope: any) => {
              return (
                <ElFormItem prop={`productList[${scope.$index}].name`} rules={rules.name}>
                  <ElInput v-model={scope.row.name} placeholder="请输入商品名称" />
                </ElFormItem>
              );
            },
          }}
        />
        <ElTableColumn
          prop="quantity"
          label="数量"
          width={150}
          v-slots={{
            default: (scope: any) => {
              return (
                <ElFormItem prop={`productList[${scope.$index}].quantity`} rules={rules.quantity}>
                  <ElInputNumber v-model={scope.row.quantity} stepStrictly={true} min={1} />
                </ElFormItem>
              );
            },
          }}
        />
        <ElTableColumn
          prop="spec"
          label="规格"
          v-slots={{
            default: (scope: any) => {
              return (
                <ElFormItem prop={`productList[${scope.$index}].spec`} rules={rules.spec}>
                  <ElInput v-model={scope.row.spec} placeholder="请输入商品规格" />
                </ElFormItem>
              );
            },
          }}
        />
        <ElTableColumn
          prop="desc"
          label="其他"
          v-slots={{
            default: (scope: any) => {
              return (
                <ElFormItem>
                  <ElInput v-model={scope.row.desc} placeholder="请输入备注" />
                </ElFormItem>
              );
            },
          }}
        />
      </ElTable>
    );
  },
});

export default ProductTable;
