import { Router, Request, Response } from 'express';
import { MemberModel } from '../model/Member';
import { MemberDto } from '../dto/Member.dto';

export class MemberController {
  private readonly model: MemberModel;
  constructor(router: Router) {
    this.model = new MemberModel();
    this.api(router);
  }
  private api(router: Router): void {
    router.post('api/auth', (req: Request, res: Response) => {
      //TODO: Token
    });

    router.get('/api/member', (req: Request, res: Response) => {
      const mock: MemberDto[] = [
        { id: 1, name: 'Alan', phone: '0911111111', account: 'abc123', password: 'abc123', authority: 1 },
        { id: 2, name: 'Jack', phone: '0922222222', account: 'abc456', password: 'abc456', authority: 1 },
      ];

      res.status(200).json({ content: mock });
    });

    router.get('/api/member/:memberId', (req: Request, res: Response) => {
      const { memberId } = req.params;
    });

    router.post('/api/member/', (req: Request, res: Response) => {});
    router.put('/api/member/:memberId f', (req: Request, res: Response) => {});
  }
}
