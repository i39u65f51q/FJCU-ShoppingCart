//508062334 陳彥志
import { Router, Request, Response } from 'express';
import { OrderModel } from '../model/Order';
import { OrderDto } from '../dto/Order.dto';
import { OrderProductModel } from '../model/OrderProduct';
import { OrderProductDto } from '../dto/OrderProduct.dto';
import { ProductModel } from '../model/Products';
import { ProductDto } from '../dto/Product.dto';

export class OrderController {
  private readonly model: OrderModel;
  private readonly opModel: OrderProductModel;
  private readonly pModel: ProductModel;
  constructor(router: Router) {
    this.model = new OrderModel();
    this.opModel = new OrderProductModel();
    this.pModel = new ProductModel();
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
      const { products } = body;
      products.map(async (p: unknown) => {
        const dto: OrderProductDto = new OrderProductDto(p);
        dto.orderId = insertId;
        const result: boolean = await this.opModel.insert(dto);
        if (!result) {
          res.status(200).json({ success: false });
          return;
        }
      });
      //更新商品庫存
      const pLists = (await this.pModel.getAll()).map((p: unknown) => new ProductDto(p));
      let success: boolean = true;
      products.forEach(async (cp: unknown) => {
        if (!success) return;
        const cpDto: ProductDto = new ProductDto(cp);
        const find: ProductDto | null = pLists.find((p: ProductDto) => p.id === cpDto.id) || null;
        if (!find) return;
        find.quantity = find.quantity - cpDto.quantity;
        const result: boolean = await this.pModel.updateQuantity(find);
        if (!result) {
          success = false;
          res.status(200).json({ success: false });
        }
      });
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
