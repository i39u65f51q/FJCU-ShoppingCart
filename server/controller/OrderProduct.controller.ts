import { Router, Request, Response } from 'express';
import { OrderProductModel } from '../model/OrderProduct';

export class OrderProductController {
  private readonly model: OrderProductModel;
  constructor(router: Router) {
    this.model = new OrderProductModel();
    this.api(router);
  }
  private api(router: Router): void {
    router.get('/api/order-product', (req: Request, res: Response) => {
      const mock: any[] = [];
      res.status(200).json({ success: true, content: mock });
    });
    router.get('/api/order-product/:orderId', (req: Request, res: Response) => {
      const { orderId } = req.params;

      const mock: any[] = [];
      res.status(200).json({ success: true, content: mock });
    });
  }
}
