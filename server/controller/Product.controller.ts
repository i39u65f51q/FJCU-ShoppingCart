import { Router, Request, Response } from 'express';
import { ProductModel } from '../model/Products';

export class ProductController {
  private readonly model: ProductModel;
  constructor(router: Router) {
    this.model = new ProductModel();
    this.api(router);
  }
  private api(router: Router): void {
    router.get('/api/product', (req: Request, res: Response) => {});
    router.post('/api/product', (req: Request, res: Response) => {});
    router.put('/api/product/:productId', (req: Request, res: Response) => {});
    router.delete('/api/product/:productId', (req: Request, res: Response) => {});
  }
}
