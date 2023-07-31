import { Injectable } from '@nestjs/common';
import { productsMockData } from '../mock-data/products.mock-data';

@Injectable()
export class ProductsService {
  private readonly products = productsMockData; // mocked instead of DB

  async getProducts(type: string) {
    const transformedArray = [];
    if (!type) {
      for (const type in this.products) {
        const items = this.products[type].map(({ id, name, price }) => ({ id, name, price, type }));
        transformedArray.push(...items);
      }
      return transformedArray;
    } else {
      if (Object.keys(this.products).includes(type)) {
        const items = this.products[type].map(({ id, name, price }) => ({ id, name, price, type }));
        return items;
      }
    }
    return [];
  }
}
