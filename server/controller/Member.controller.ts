//508062334 陳彥志
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
      const result: MemberDto[] | null = await this.model.getAuth(new MemberDto(body));
      if (!result || !result.length) {
        res.status(200).json({ success: false, content: [] });
      } else {
        res.status(200).json({ success: true, content: result[0] });
      }
    });
    //取得所有會員
    router.get('/api/members', async (req: Request, res: Response) => {
      const result: MemberDto[] = await this.model.getAll();
      res.status(200).json({ success: true, content: result });
    });
    //取得會員
    router.get('/api/member/:memberId', async (req: Request, res: Response) => {
      const { memberId } = req.params;
      const result: MemberDto[] = await this.model.get(Number(memberId));
      if (result.length === 0) {
        res.status(200).json({ success: false, content: null });
      } else {
        res.status(200).json({ success: true, content: result[0] });
      }
    });
    //新增會員
    router.post('/api/member', async (req: Request, res: Response) => {
      const { body } = req;
      const result: MemberDto[] | null = await this.model.getAuth(new MemberDto(body));
      if (result && result.length > 0) {
        res.status(200).json({ success: false, content: result });
        return;
      }
      const insertId: number = await this.model.insert(new MemberDto(body));
      res.status(200).json({ success: true, content: [], insertId });
    });
    //更新會員
    router.patch('/api/member', async (req: Request, res: Response) => {
      const { body } = req;
      const result: boolean = await this.model.update(new MemberDto(body));
      res.status(200).json({ success: result });
    });
  }
}
