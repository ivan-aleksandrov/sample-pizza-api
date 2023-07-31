import { Controller, Get, Query } from '@nestjs/common';
import { Customer } from '../auth/decorators/customer.decorator';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // HTTP GET method to fetch products.
  // Endpoint: /products/all
  // Parameters:
  //   - type: The type of products to retrieve.
  // Returns:
  //   - An array containing the products object, if found; otherwise, an empty array.
  @Customer()
  @Get('/all')
  getProducts(@Query('type') type?: string) {
    return this.productsService.getProducts(type);
  }
}
