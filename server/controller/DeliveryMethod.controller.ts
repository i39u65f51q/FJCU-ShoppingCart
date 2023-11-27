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
    router.get('/api/delivery', async (req: Request, res: Response) => {
      //FIXME:
      const result: DeliveryMethodDto[] = await this.model.getAll();

      const mock: DeliveryMethodDto[] = [
        { id: 1, name: '7-11店到店' },
        { id: 2, name: '宅配' },
      ];
      res.status(200).json({ success: true, content: mock });
    });
  }
}
