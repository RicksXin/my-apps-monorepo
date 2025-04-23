import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'product',
})
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({
    length: 50,
  })
  productName: string;

  @Column({
    length: 100,
    nullable: true,
  })
  categoryId: string;

  @Column({
    length: 100,
    nullable: true,
  })
  categoryName: string;

  @Column({
    length: 100,
    nullable: true,
  })
  spec: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
