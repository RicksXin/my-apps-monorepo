import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private orderRepository: Repository<Order>;

  createOrder(orderDto: CreateOrderDto) {
    const order = new Order();
    Object.assign(order, {
      ...orderDto,
      salesPerson: orderDto.salesPerson.join(';'),
    });
    try {
      this.orderRepository.save(order);
      return '新增成功';
    } catch (err) {
      console.log(err);
      return '新增失败';
    }
  }

  getOrderList() {
    return this.orderRepository.find();
  }
}
