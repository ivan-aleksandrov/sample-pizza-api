import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { createMockRequest } from './mock.request';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    ordersController = module.get<OrdersController>(OrdersController);
  });

  it('should return an array', async () => {
    const result = await ordersController.getOrders();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an array with one object (order) in it', async () => {
    const mockRequest = createMockRequest();
    const result = await ordersController.getOneOrder('1', mockRequest);
    expect(result.length).toBe(1);
  });

  it('should return an empty array', async () => {
    const mockRequest = createMockRequest();
    const result = await ordersController.getOneOrder('0', mockRequest);
    expect(result.length).toBe(0);
  });
});
