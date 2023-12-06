//取得訂單商品
import { Router, Request, Response } from 'express';
import { ProductModel } from '../model/Products';
import { ProductDto } from '../dto/Product.dto';

export class ProductController {
  private readonly model: ProductModel;
  constructor(router: Router) {
    this.model = new ProductModel();
    this.api(router);
  }
  private api(router: Router): void {
    //取得商品
    router.get('/api/product', async (req: Request, res: Response) => {
      const result: ProductDto[] = await this.model.getAll();
      res.status(200).json({ success: true, content: result });
    });
    //新增商品
    router.post('/api/product', async (req: Request, res: Response) => {
      const { body } = req;
      const insertId: number = await this.model.insert(new ProductDto(body));
      res.status(200).json({ success: true, insertId });
    });
    //更新商品
    router.patch('/api/product', async (req: Request, res: Response) => {
      const { body } = req;
      const result: boolean = await this.model.update(new ProductDto(body));
      res.status(200).json({ success: result });
    });
    //刪除商品
    router.delete('/api/product/:productId', async (req: Request, res: Response) => {
      const { productId } = req.params;
      const result: boolean = await this.model.delete(Number(productId));
      res.status(200).json({ success: result });
    });
  }
}
