import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let productsController: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
  });

  it('should return an array with elements', async () => {
    const result = await productsController.getProducts();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return an array with elements', async () => {
    const result = await productsController.getProducts('pizzas');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return an empty array', async () => {
    const result = await productsController.getProducts('nonExisting');
    expect(result.length).toBe(0);
  });
});
