import { deepCopy } from '@/utils/helper';
import { ElPagination, ElTable, TreeNode } from 'element-plus';
import { defineComponent, PropType, reactive, ref } from 'vue';
import styles from './index.module.less';

type PostData = Record<string, number>;

const Grid = defineComponent({
  props: {
    remoteMethod: {
      type: Function,
      required: true,
    },
    load: {
      type: Function as PropType<((row: any, treeNode: TreeNode, resolve: (data: any[]) => void) => void) | undefined>,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [20, 30, 40, 50, 200],
    },
    rowKey: {
      type: String,
      default: '',
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    pageIndexName: {
      type: String,
      default: 'pageIndex',
    },
    totalCountName: {
      type: String,
      default: 'total',
    },
    dataName: {
      type: String,
      default: 'data',
    },
    border: {
      type: Boolean,
      default: true,
    },
    hasPagination: {
      type: Boolean,
      default: true,
    },
    rowStyle: {
      type: Object,
      default: () => {},
    },
    defaultSort: {
      type: Object as PropType<{
        prop: any;
        order: any;
      }>,
      default: () => {},
    },
  },
  emits: ['currentChange', 'selectionChange', 'sortChange'],
  setup: (props, ctx) => {
    const postData = ref<PostData>({});
    const searching = ref<boolean>(false);
    const tableData = reactive({
      data: [],
      currentPage: 1,
      size: props.pageSize,
      total: 0,
    });
    const _loadData = async (params?: PostData) => {
      if (!props.remoteMethod) {
        return null;
      }
      if (params) postData.value = deepCopy(params);
      postData.value = postData.value || {};
      postData.value[props.pageIndexName] = tableData.currentPage;
      postData.value.pageSize = tableData.size;
      searching.value = true;
      try {
        const response = await props.remoteMethod(postData.value);
        if (response) {
          const data = response[props.dataName];
          const recordsCount = response[props.totalCountName];
          tableData.data = data;
          tableData.total = recordsCount;
        }

        searching.value = false;
        return response;
      } catch (e) {
        if (e.name === 'CancelError') return null;
        // errorMessage.show(e);
        tableData.data = [];
        tableData.total = 0;
        searching.value = false;
        return null;
      }
    };
    const reload = async () => {
      return _loadData(postData.value);
    };
    const handleSizeChange = (size: number) => {
      tableData.size = size;
      _loadData();
    };
    const handleCurrentChange = (page: number) => {
      ctx.emit('currentChange', page);
      tableData.currentPage = page;
      _loadData();
    };
    const loadData = (params: PostData) => {
      if (params) {
        tableData.currentPage = params.pageIndex || 1;
      } else {
        tableData.currentPage = 1;
      }
      return _loadData(params);
    };
    ctx.expose({ loadData, reload });

    return () => (
      <div class={styles.flex_box}>
        <div class={styles.flex_box}>
          <ElTable
            // v-loading={searching.value}
            data={tableData.data}
            border={props.border}
            load={props.load}
            lazy={props.lazy}
            rowKey={props.rowKey}
            defaultExpandAll={props.defaultExpandAll}
            rowStyle={props.rowStyle}
            defaultSort={props.defaultSort}
            showOverflowTooltip
            stripe
            highlightCurrentRow
            style={{ width: '100%', marginBottom: '12px' }}
            onSelection-change={(e) => ctx.emit('selectionChange', e)}
            onSort-change={(e) => ctx.emit('sortChange', e)}
          >
            {ctx.slots.default?.()}
          </ElTable>
        </div>
        {/* {props.hasPagination ? (
          <ElPagination
            currentPage={tableData.currentPage}
            pageSizes={props.pageSizes}
            pageSize={tableData.size}
            layout={props.layout}
            total={tableData.total}
            onSize-change={handleSizeChange}
            onCurrent-change={handleCurrentChange}
          />
        ) : null} */}
      </div>
    );
  },
});

export default Grid;
