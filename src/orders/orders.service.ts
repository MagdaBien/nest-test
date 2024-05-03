import { Injectable } from '@nestjs/common';
import { db, Order } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }

  public deleteById(id: Order['id']): void {
    db.orders = db.orders.filter((p) => p.id !== id);
  } 

  public create(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public updateById(id: Order['id'], orderData: Omit<Order, 'id'>): void {
    db.orders = db.orders.map((order) => {
      if (order.id === id) {
        return { ...order, ...orderData };
      }
      return order;
    });
  }    
}
