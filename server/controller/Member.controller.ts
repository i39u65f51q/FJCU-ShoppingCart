import { Router, Request, Response } from 'express';
import { MemberModel } from '../model/Member';

export class MemberController {
  private readonly model: MemberModel;
  constructor(router: Router) {
    this.model = new MemberModel();
    this.api(router);
  }
  private api(router: Router): void {
    router.get('/api/member', (req: Request, res: Response) => {
      const { memberId } = req.params;

      res.status(200).json({ content: 'ok' });
    });

    router.get('/api/member/:memberId', (req: Request, res: Response) => {
      const { memberId } = req.params;
    });

    router.post('/api/member/', (req: Request, res: Response) => {});
    router.put('/api/member/:memberId f', (req: Request, res: Response) => {});
  }
}
