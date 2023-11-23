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
    //取得所有訂單
    router.get('/api/order', (req: Request, res: Response) => {
      const mock: any[] = [];
      res.status(200).json({ success: true, content: mock });
    });

    //取得會員訂單
    router.get('/api/order/:memberId', (req: Request, res: Response) => {
      const { memberId } = req.params;
      const mock: any[] = [];
      res.status(200).json({ success: true, content: mock });
    });
    //新增訂單
    router.post('/api/order', (req: Request, res: Response) => {
      const { body } = req;
      res.status(200).json({ success: true });
    });
    //更新訂單
    router.patch('/api/order', (req: Request, res: Response) => {
      const { body } = req;
      res.status(200).json({ success: true });
    });
  }
}
