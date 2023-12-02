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
      const result: OrderProductDto[] = await this.model.getAll();
      res.status(200).json({ success: true, content: result });
    });

    router.get('/api/order-product/:memberId', async (req: Request, res: Response) => {
      const { memberId } = req.params;
      const result: OrderProductDto[] = await this.model.get(Number(memberId));
      res.status(200).json({ success: true, content: result });
    });
  }
}
