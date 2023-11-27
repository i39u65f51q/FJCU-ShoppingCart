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
    //身份驗證
    router.post('/api/auth', async (req: Request, res: Response) => {
      const { body } = req;

      const mock: MemberDto = {
        id: 1,
        name: 'Alan',
        phone: '091111',
        account: '123',
        password: 'abc123',
        authority: 1,
      };
      // const result: MemberDto | null = await this.model.getAuth(new MemberDto(body));//TODO:
      res.status(200).json({ success: true, content: mock });
    });
    //取得所有會員
    router.get('/api/members', async (req: Request, res: Response) => {
      const mock: MemberDto[] = [
        { id: 1, name: 'Alan', phone: '0911111111', account: 'abc123', password: 'abc123', authority: 1 },
        { id: 2, name: 'Jack', phone: '0922222222', account: 'abc456', password: 'abc456', authority: 1 },
      ];
      //FIXME:
      const result: MemberDto[] = await this.model.getAll();
      res.status(200).json({ success: true, content: mock });
    });
    //取得會員
    router.get('/api/member/:memberId', async (req: Request, res: Response) => {
      const { memberId } = req.params;
      const mock: MemberDto = {
        id: 1,
        name: 'Alan',
        phone: '0911111111',
        account: 'abc123',
        password: 'abc123',
        authority: 1,
      };
      //FIXME:
      const result: MemberDto | null = await this.model.get(Number(memberId));
      res.status(200).json({ success: true, content: mock });
    });
    //新增會員
    router.post('/api/member', async (req: Request, res: Response) => {
      const { body } = req;
      console.log(body);
      //FIXME:
      const insertId: number = await this.model.insert(new MemberDto(body));
      res.status(200).json({ success: true });
    });
    //更新會員
    router.patch('/api/member', async (req: Request, res: Response) => {
      const { body } = req;
      console.log(body);
      //FIXME:
      const result: boolean = await this.model.update(new MemberDto(body));
      res.status(200).json({ success: true });
    });
  }
}
