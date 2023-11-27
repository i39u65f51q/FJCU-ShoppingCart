import { Router, Request, Response } from 'express';
import { OrderProductModel } from '../model/OrderProduct';
import { OrderProductDto } from '../dto/OrderProduct.dto';

export class OrderProductController {
  private readonly model: OrderProductModel;
  constructor(router: Router) {
    this.model = new OrderProductModel();
    this.api(router);
  }
  private api(router: Router): void {
    router.get('/api/order-product', async (req: Request, res: Response) => {
      const mock: any[] = [];
      //FIXME:
      const result: OrderProductDto[] = await this.model.getAll();
      res.status(200).json({ success: true, content: mock });
    });

    router.get('/api/order-product/:orderId', async (req: Request, res: Response) => {
      const { orderId } = req.params;
      //FIXME:
      const result: OrderProductDto[] = await this.model.get(Number(orderId));
      const mock: any[] = [];
      res.status(200).json({ success: true, content: mock });
    });
  }
}
