import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ordersMockData } from '../mock-data/orders.mock-data';
import { productsMockData } from '../mock-data/products.mock-data';

@Injectable()
export class OrdersService {
  private readonly orders = ordersMockData; // mocked instead of DB
  private readonly products = productsMockData; // mocked instead of DB

  async getOrders() {
    return this.orders;
  }

  async findOrderByUser(username: string) {
    const orders = this.orders
      .filter((order) => order.username === username)
      .map((order) => {
        return order.id;
      });
    return orders;
  }

  async findOrder(id: string) {
    const order = this.orders.find((order) => order.id === id);
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto, user: any) {
    // The logic bellow simulates autoincrementing ID that should be executed in the DB upon insert
    const highestId = this.orders.reduce((maxId, currentElement) => {
      const currentId = parseInt(currentElement.id, 10);
      return currentId > maxId ? currentId : maxId;
    }, 0);
    const newId = (highestId + 1).toString();

    let totalCost = 0;
    for (const product of createOrderDto.products) {
      const menuProduct = this.findProductById(product.id);
      product.totalCost = product.quantity * menuProduct.price;
      totalCost += product.totalCost;
    }
    // Create the order object
    const newOrder = {
      id: newId, // this will be returned from DB so it wont be passed here
      timestamp: new Date().toISOString(),
      username: user.username, // fetching from the JWT decoding
      products: createOrderDto.products,
      totalCost: totalCost,
    };

    // Save the newly created order to the database
    this.orders.push(newOrder);

    return newOrder;
  }

  findProductById(id: number) {
    for (const category in this.products) {
      const product = this.products[category].find((product) => product.id === id);
      if (product) {
        return product;
      }
    }
    return null;
  }
}
