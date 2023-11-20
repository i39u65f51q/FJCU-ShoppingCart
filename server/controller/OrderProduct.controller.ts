import { Router, Request, Response } from 'express';
import { OrderProductModel } from '../model/OrderProduct';

export class OrderProductController {
  private readonly model: OrderProductModel;
  constructor(router: Router) {
    this.model = new OrderProductModel();
    this.api(router);
  }
  private api(router: Router): void {
    router.get('/api/order-product', (req: Request, res: Response) => {});
  }
}
