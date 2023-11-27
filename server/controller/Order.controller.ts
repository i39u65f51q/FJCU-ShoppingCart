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
      const mock: any[] = [];
      //FIXME:
      const result: OrderDto[] = await this.model.getAll();
      res.status(200).json({ success: true, content: mock });
    });

    //取得會員訂單
    router.get('/api/order/:memberId', async (req: Request, res: Response) => {
      const { memberId } = req.params;
      const mock: any[] = [];
      //FIXME:
      const result: OrderDto[] = await this.model.get(Number(memberId));
      res.status(200).json({ success: true, content: mock });
    });
    //新增訂單
    router.post('/api/order', async (req: Request, res: Response) => {
      const { body } = req;
      const dto: OrderDto = new OrderDto(body);
      //FIXME:
      const insertId: number = await this.model.insert(dto);
      if (insertId === -1) {
        res.status(200).json({ success: false });
        return;
      }
      // 取得id後在order product中新增商品
      const opDto: OrderProductDto = new OrderProductDto(body);
      opDto.orderId = insertId;
      //FIXME:
      const opInsertId: number = await this.opModel.insert(opDto);
      if (opInsertId === -1) {
        res.status(200).json({ success: false });
        return;
      }
      res.status(200).json({ success: true });
    });
    //更新訂單
    router.patch('/api/order', async (req: Request, res: Response) => {
      const { body } = req;
      //FIXME:
      const result: boolean = await this.model.update(new OrderDto(body));
      res.status(200).json({ success: true });
    });
  }
}
