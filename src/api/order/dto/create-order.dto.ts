import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  // @IsNotEmpty({message: '订单Id不能为空'})
  // @Length(1, 50)
  // orderId: string;

  @IsNotEmpty({ message: '订单日期不能为空' })
  // @Length(1, 50)
  orderDate: string;

  @IsNotEmpty({ message: '客户姓名不能为空' })
  // @Length(1, 50)
  userName: string;

  @IsNotEmpty({ message: '客户电话不能为空' })
  // @Length(1, 50)
  phone: string;

  @IsNotEmpty({ message: '订单金额能为空' })
  // @Length(1, 50)
  totalAmount: number;

  @IsNotEmpty({ message: '送货地址不能为空' })
  // @Length(1, 50)
  address: string;

  @IsNotEmpty({ message: '渠道不能为空' })
  // @Length(1, 50)
  sourceId: number;

  @IsNotEmpty({ message: '导购不能为空' })
  // @Length(1, 50)
  salesPerson: string[];

  // @Length(1, 50)
  activityId: string;
}
