import { Injectable } from '@nestjs/common';
import { db, Order } from './../db';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }

  public deleteById(id: Order['id']): void {
    db.products = db.products.filter((p) => p.id !== id);
  } 
}
