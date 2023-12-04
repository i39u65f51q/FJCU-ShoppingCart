//508062334 陳彥志
import { Router, Request, Response } from 'express';
import { DeliveryMethodModel } from '../model/DeliveryMethod';
import { DeliveryMethodDto } from '../dto/DeliveryMethod.dto';

export class DeliveryMethodController {
  private readonly model: DeliveryMethodModel;
  constructor(router: Router) {
    this.model = new DeliveryMethodModel();
    this.api(router);
  }

  private api(router: Router): void {
    //取得運送方式
    router.get('/api/delivery', async (req: Request, res: Response) => {
      const result: DeliveryMethodDto[] = await this.model.getAll();
      res.status(200).json({ success: true, content: result });
    });
  }
}
