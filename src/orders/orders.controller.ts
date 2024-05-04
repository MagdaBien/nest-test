import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { Order } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  @Get('/extended')
  getAllExtended(): Promise<Order[]> {
    return this.ordersService.getAllExtended();
  }

  @Get('/')
  getAll(): Promise<Order[]> {
    return this.ordersService.getAll();
  }

  @Get('/extended/:id')
  async getByIdExtended(@Param('id', new ParseUUIDPipe()) id: string): Promise<Order | null> {
    const order = await this.ordersService.getByIdExtended(id);
    if (!order) { throw new NotFoundException('Order not found'); }
    return order;
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Order | null> {
    const order = await this.ordersService.getById(id);
    if (!order) { throw new NotFoundException('Order not found'); }
    return order;
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO): Promise<Order> {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ): Promise<Order> {
    if (!(await this.ordersService.getById(id))) { throw new NotFoundException('Order not found'); }

    return await this.ordersService.updateById(id, orderData);
    //return { success: true };
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Order> {
    if (!(await this.ordersService.getById(id))) { throw new NotFoundException('Order not found'); }
    return await this.ordersService.deleteById(id);
    //return { success: true };
  }
}
