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
      const mock: ProductDto[] = [
        { id: 1, name: '商品A', price: 30, quantity: 11 },
        { id: 2, name: '商品B', price: 35, quantity: 12 },
        { id: 3, name: '商品C', price: 33, quantity: 2 },
        { id: 4, name: '商品D', price: 23, quantity: 3 },
        { id: 5, name: '商品E', price: 21, quantity: 10 },
      ];
      //FIXME:
      const result: ProductDto[] = await this.model.getAll();
      res.status(200).json({ success: true, content: mock });
    });
    //新增商品
    router.post('/api/product', async (req: Request, res: Response) => {
      const { body } = req;
      //FIXME:
      const insertId: number = await this.model.insert(new ProductDto(body));
      res.status(200).json({ success: true });
    });
    //更新商品
    router.patch('/api/product', async (req: Request, res: Response) => {
      const { body } = req;
      //FIXME:
      const result: boolean = await this.model.update(new ProductDto(body));
      res.status(200).json({ success: true });
    });
    //刪除商品
    router.delete('/api/product/:productId', async (req: Request, res: Response) => {
      const { productId } = req.params;
      //FIXME:
      const result: boolean = await this.model.delete(Number(productId));
      res.status(200).json({ success: true });
    });
  }
}
