//508062334 陳彥志
import { Router, Request, Response } from 'express';
import { OrderModel } from '../model/Order';
import { OrderDto } from '../dto/Order.dto';
import { OrderProductModel } from '../model/OrderProduct';
import { OrderProductDto } from '../dto/OrderProduct.dto';

export class OrderController {
  private readonly model: OrderModel;
  private readonly opModel: OrderProductModel;
  constructor(router: Router) {
    this.model = new OrderModel();
    this.opModel = new OrderProductModel();
    this.api(router);
  }
  private api(router: Router): void {
    //取得所有訂單
    router.get('/api/order', async (req: Request, res: Response) => {
      const result: OrderDto[] = await this.model.getAll();
      res.status(200).json({ success: true, content: result });
    });

    //取得會員訂單
    router.get('/api/order/:memberId', async (req: Request, res: Response) => {
      const { memberId } = req.params;
      const result: OrderDto[] = await this.model.get(Number(memberId));
      res.status(200).json({ success: true, content: result });
    });
    //新增訂單
    router.post('/api/order', async (req: Request, res: Response) => {
      const { body } = req;
      const insertId: number = await this.model.insert(new OrderDto(body));

      if (!insertId) {
        res.status(200).json({ success: false });
        return;
      }
      // 取得id後在order product中新增商品
      const opDto: OrderProductDto = new OrderProductDto(body);
      opDto.orderId = insertId;
      const opInsertId: number = await this.opModel.insert(opDto);
      if (!opInsertId) {
        res.status(200).json({ success: false });
        return;
      }
      res.status(200).json({ success: true });
    });
    //更新訂單
    router.patch('/api/order', async (req: Request, res: Response) => {
      const { body } = req;
      const result: boolean = await this.model.update(new OrderDto(body));
      res.status(200).json({ success: result });
    });
  }
}
