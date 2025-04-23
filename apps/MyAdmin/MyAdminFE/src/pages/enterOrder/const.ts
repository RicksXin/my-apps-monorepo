export const sourceList: {
  value: number;
  label: string;
}[] = [
  {
    value: 0,
    label: '自来客',
  },
  {
    value: 1,
    label: '亚细亚',
  },
];

export const salesPersonList:{  
  value: number;
  label: string;}[] = [{
    value: 0,
    label: '周',
  },{
    value: 1,
    label: '张',
  },{
    value: 2,
    label: '吴',
  }]
export const rules = {
  userName: [
    {
      required: true,
      message: '请输入客户姓名',
      trigger: 'change',
    },
  ],
  phone: [
    {
      required: true,
      message: '请输入客户电话',
      trigger: 'change',
    },
  ],
  orderDate: [
    {
      required: true,
      message: '请输入订单日期',
      trigger: 'change',
    },
  ],
  address: [
    {
      required: true,
      message: '请输入送货地址',
      trigger: 'change',
    },
  ],
  totalAmount: [
    {
      required: true,
      message: '请输入订单金额',
      trigger: 'change',
    },
  ],
  salesPerson: [
    {
      required: true,
      message: '请输入导购',
      trigger: 'change',
    },
  ],
};


const m=/([\d.]+)\s*米/g;
const m2= /定制(.*)/g;
const m3= /换(.*)/g;
const m4= /([\d.]+|米)?\s*\*\s*([\d.]+|米)?|([\d.]+|米)\s*\*|^\s*\*\s*([\d.]+|米)/g;
const m5= /(\d+)\s*(公分)/g;
const m7= /(\d+)\s*(张|把|个|套)/g;
const m8= /(灰|白|绿|粉|紫|果绿|热情橙|蓝|深灰|全灰|薄荷绿|橙|黄|深|浅|豆沙|橘)(色)?/g;
const m9= /(左|右)?(贵)?妃|单人位|双人位|二人位|三人位|四人位|升降|大号|加长|样品处理|样品|一字型|样品处理|右电动|左电动|总长|双电动|特价|不要电动|不要柜子|灰岩板|岩板|环保|大小/g;

export const regxdeal = (s: string) => {
  let result = s;
  result = result.replaceAll(m, '');
  result = result.replaceAll(m2, '');
  result = result.replaceAll(m3, '');
  result = result.replaceAll(m4, '');
  result = result.replaceAll(m5, '');
  result = result.replaceAll(m7, '');
  result = result.replaceAll(m8, '');
  result = result.replaceAll(m9, '');
  return result;
}

export const categoryList = [{
  value: 'CBR0001',
  label: '床床头柜组合'
}, {
  value: 'CDR0002',
  label: '梳妆台凳组合'
}, {
  value: 'CLR0001',
  label: '餐桌椅组合'
}, {
  value: 'SBR0001',
  label: '床'
}, {
  value: 'SBR0002',
  label: '床头柜'
}, {
  value: 'SBR0003',
  label: '床垫'
}, {
  value: 'SBR0004',
  label: '衣柜'
}, {
  value: 'SBR0005',
  label: '妆台'
}, {
  value: 'SBR0006',
  label: '妆凳'
}, {
  value: 'SBR0007',
  label: '衣架'
}, {
  value: 'SBR0008',
  label: '穿衣镜'
}, {
  value: 'SLR0001',
  label: '沙发'
}, {
  value: 'SLR0002',
  label: '茶几'
}, {
  value: 'SLR0003',
  label: '电视柜'
}, {
  value: 'SLR0004',
  label: '置物架'
}, {
  value: 'SLR0005',
  label: '鞋柜'
}, {
  value: 'SDR0001',
  label: '餐桌'
}, {
  value: 'SDR0002',
  label: '餐椅'
}, {
  value: 'SDR0003',
  label: '餐边柜'
}, {
  value: 'SOR0001',
  label: '办公桌'
}, {
  value: 'SOR0002',
  label: '办公椅'
}, {
  value: 'SOR0003',
  label: '书柜'
}, {
  value: 'SAR0001',
  label: '扶手椅&凳子'
}]