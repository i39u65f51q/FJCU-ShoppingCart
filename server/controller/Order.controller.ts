import { Router, Request, Response } from 'express';
import { OrderModel } from '../model/Order';
import { OrderDto } from '../dto/Order.dto';

export class OrderController {
  private readonly model: OrderModel;
  constructor(router: Router) {
    this.model = new OrderModel();
    this.api(router);
  }
  private api(router: Router): void {
    router.get('/api/order', (req: Request, res: Response) => {});
    router.get('/api/order/:memberId', (req: Request, res: Response) => {});
    router.post('/api/order', (req: Request, res: Response) => {});
    router.put('/api/order/:orderId', (req: Request, res: Response) => {});
  }
}
