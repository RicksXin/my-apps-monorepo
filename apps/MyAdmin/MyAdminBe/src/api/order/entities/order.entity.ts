import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity({
  name: 'order',
})
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({
    length: 20,
    comment: '订单日期',
  })
  orderDate: string;

  // @Column({
  //   length: 50,
  // })
  // userId: string;

  @Column({
    length: 5,
    comment: '客户姓名',
  })
  userName: string;

  @Column({
    length: 20,
    comment: '客户电话',
  })
  phone: string;

  @Column({
    comment: '订单金额',
  })
  totalAmount: number;

  @Column({
    comment: '渠道Id',
  })
  sourceId: number;

  @Column({
    length: 50,
    comment: '送货地址',
  })
  address: string;

  @Column({
    length: 50,
    comment: '导购',
  })
  salesPerson: string;

  @Column({
    length: 20,
    comment: '活动Id',
    default: '',
  })
  activityId: string;

  @CreateDateColumn()
  creteTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'order_product_relation',
  })
  products: Product[];
}
