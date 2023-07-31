import { Controller, Get, Post, Param, Body, BadRequestException, Req } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { Customer } from '../auth/decorators/customer.decorator';
import { Admin } from '../auth/decorators/admin.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // HTTP GET method to fetch orders.
  // Endpoint: /orders/all
  // Returns:
  //   - An array of orders retrieved from the orders service.
  @Admin()
  @Get('/all')
  getOrders() {
    return this.ordersService.getOrders();
  }

  // HTTP GET method to fetch all order IDs for current user.
  // Endpoint: /orders/myOrders
  // Returns:
  //   - An array containing the order IDs, if found; otherwise, an empty array.
  @Customer()
  @Get('/myOrders')
  async getMyOrdersIds(@Req() req: Request) {
    const orders = await this.ordersService.findOrderByUser(req['user'].username);
    return orders;
  }

  // HTTP GET method to fetch a single order by its ID.
  // Endpoint: /orders/get/:id
  // Parameters:
  //   - id: string - The unique identifier of the order to retrieve.
  // Returns:
  //   - An array containing the order object, if found; otherwise, an empty array.
  @Customer()
  @Get('/get/:id')
  async getOneOrder(@Param('id') id: string, @Req() req: Request) {
    const order = await this.ordersService.findOrder(id);
    if (!order) {
      return [];
    }
    // do not return order if not for same user (except if user is admin)
    if (order.username !== req['user'].username && req['user'].role !== 'admin') {
      return [];
    }
    return [order];
  }

  // HTTP POST method to create a new order.
  // Endpoint: /orders
  // Parameters:
  //   - createOrderDto: CreateOrderDto - An object containing the data for creating the new order.
  //   - req: Request - The HTTP request object.
  // Returns:
  //   - An object containing the ID of the newly created order.
  @Customer()
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    if (!createOrderDto.products) {
      throw new BadRequestException(`There is a problem with products`);
    }
    const newOrder = await this.ordersService.createOrder(createOrderDto, req['user']);
    return {
      id: newOrder.id,
    };
  }
}
