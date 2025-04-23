import { ElButton, ElForm, ElFormItem } from 'element-plus';
import { defineComponent, reactive, ref } from 'vue';
import * as XLSX from 'xlsx';
import { categoryList, regxdeal } from './const';
interface ExcelData {
  product: string;
  orderId: string
}
interface Product {
  productName: string;
  isCombine: boolean;
  categoryId: number;
}
const Query = defineComponent({
  emits: ['add'],
  setup: (_, ctx) => {
    const query = reactive({});
    const importRef = ref();
    const productList = ref<string[]>([])
    const resultList = ref<string[]>([])
    const combineList = ref<string[]>([])
    const abnor = ref<string[]>([])

    const importHandle = (event: Event) => {
      console.log('xxxx', importRef.value);
      if (!importRef.value) return


      const file = importRef.value.files[0]
      const exp = file.name.split('.').slice(-1)[0];
      if (exp === 'xls' || exp === 'xlsx') {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('maintainerType', '2');
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onloadend = async () => {
          const result = XLSX.read(reader.result, { type: 'binary' });
          XLSX.utils
            .sheet_to_json<ExcelData>(result.Sheets[result.SheetNames[1]])
            .forEach((d) => {
              productList.value.push(...d.product.split('/'));
              // originList.value.push(d);
            });
          // console.log(productList.value);
        };
      } else {
        console.log('错了');
        // this.$message({
        //   message: '文件格式不正确',
        //   type: 'warning',
        // });
      }
      // @ts-ignore
      event.target.value = null;
    }
    const importData = () => {
      if (importRef.value) {
        console.log('xaa');
        importRef.value.click()

      }
    }
    const generateCategory = (s: string): string => {
      const res = categoryList.find(c => s.includes(c.label))
      if (!res) {
        if (s.includes('书桌')) {
          return 'SOR0001'
        } else if (s.includes('电脑椅')) {
          return 'SOR0002'
        } else if (s.includes('柜')) {
          return 'SLR0004'
        } else if (s.includes('垫')) {
          return 'SBR0003'
        } else if (s === '羊驼') {
          return 'SAR0001'
        } else if (s.includes('椅') || s.includes('凳')) {
          return 'SAR0001'
        }
        return ''
      }
      return res.value
    }
    const removeM = () => {
      productList.value.forEach((p) => {
        let r = p;
        r = regxdeal(r);
        if (r.includes('+')) {
          const [one, two, three, four] = r.split('+');
          if (four || three) {
            if (/\d+\+\d+/g.test(r.slice(-3))) {
              r = r.slice(0, r.length - 3);
              const [s1, s2, s3] = r.split('+')
              resultList.value.push(s1);
              resultList.value.push(s2);
              if (s3) resultList.value.push(s3);
            } else {
              abnor.value.push(r)
            }
          } else {
            if (/\d+\+\d+/g.test(r.slice(-3))) {
              r = r.slice(0, r.length - 3);
              const cr = r.includes('餐桌椅') ? `${r}组合` : r.includes('床') ? `${r}床头柜组合` : '梳妆台凳组合'
              combineList.value.push(cr)
              if (r.includes('餐桌椅')) {
                resultList.value.push(r.replace('餐桌椅', '餐桌'));
                resultList.value.push(r.replace('餐桌椅', '餐椅'));
              } else if (r.includes('床')) {
                if (r.includes('床头') && !r.includes('床头柜')) r = r.replace('床头', '床')
                resultList.value.push(r);
                resultList.value.push(r.includes('床头') ? `${r}柜` : `${r}头柜`);
              } else if (r.includes('妆台')) {
                resultList.value.push(r);
                resultList.value.push(r.replace('妆台', '妆凳'));
              } else {
                abnor.value.push(r);
              }
            } else {
              resultList.value.push(one);
              resultList.value.push(two);
            }
          }
        } else {
          if (r.includes('床头') && !r.includes('床头柜')) r = r.replace('床头', '床')
          resultList.value.push(r)
        }
      });
      resultList.value = resultList.value.map((r) => {
        if (
          r.includes('棕垫')
          || /^[0-9]*\.?[0-9]+$/.test(r)
          || r.includes('样品')
          || r.includes('毛毛虫')
          || r === '马丁'
          || r === '床'
          || r === '电视柜'
          || r === '沙发'
          || r === '床头柜'
          || r === '沙发床'
          || r === '妆台'
          || r === '妆凳'
          || r === '功能椅'
          || r === '茶几'
          || r === '茶几图片'
          || r === '餐桌'
          || r === '餐椅'
          || r === '单椅'
          || r === '床垫'
          || r === '鞋柜'
        ) { return ''; }
        return r;
      }).filter((v) => !!v);
      combineList.value = combineList.value.map((r) => {
        if (
          r.includes('棕垫')
          || /^[0-9]*\.?[0-9]+$/.test(r)
          || r.includes('样品')
          || r.includes('毛毛虫')
          || r === '马丁'
          || r === '床'
          || r === '电视柜'
          || r === '沙发'
          || r === '床头柜'
          || r === '沙发床'
          || r === '妆台'
          || r === '妆凳'
          || r === '功能椅'
          || r === '茶几'
          || r === '茶几图片'
          || r === '餐桌'
          || r === '餐椅'
          || r === '单椅'
          || r === '床垫'
        ) { return ''; }
        return r;
      }).filter((v) => !!v);
      combineList.value = [...new Set(combineList.value)]
      resultList.value = [...new Set(resultList.value), '棕垫', '毛毛虫功能椅', '2231沙发'];
      // resultList.value), 'KA12A餐桌', '棕垫', 'D06-2餐椅', '117餐椅'])];
      console.log(resultList.value.map(r => ({
        productName: r,
        categoryId: generateCategory(r),
        isCombine: false
      })));
      console.log(combineList.value.map(r => ({
        productName: r,
        categoryId: generateCategory(r),
        isCombine: true
      })));

      // console.log(abnor.value, abnor.value.length);
    }

    const exportData = () => {

    }
    return () => (
      <ElForm model={query}>
        <ElFormItem>
          <ElButton type="primary" onClick={() => ctx.emit('add')}>
            新增
          </ElButton>
          <input
            ref={importRef}
            style={{ display: 'none' }}
            id="fileId"
            type="file"
            accept=".XLS,.xlsx"
            onChange={importHandle}
          />
          <ElButton type="primary" style={{ marginLeft: '16px', display: 'block' }} onClick={importData}>
            导入数据
          </ElButton>
          <ElButton type="primary" style={{ display: 'block' }} onClick={removeM}>
            清洗数据
          </ElButton>

          <ElButton type="primary" style={{ display: 'block' }} onClick={exportData}>
            导出
          </ElButton>
        </ElFormItem>
      </ElForm >
    );
  },
});

export default Query;
