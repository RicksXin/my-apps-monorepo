import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('createOrder')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Post('getOrderList')
  async getOrderList() {
    const data = await this.orderService.getOrderList();
    console.log(data);
    return {
      total: data.length,
      data: data
    }

  }

  // @Post(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }
}
