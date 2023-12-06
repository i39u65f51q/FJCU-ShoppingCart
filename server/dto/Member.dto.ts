//508062334 陳彥志
import { get } from 'lodash-es';

export class MemberDto {
  public id: number;
  public name: string;
  public phone: string;
  public account: string;
  public password: string;
  public authority: number;
  constructor(payload: unknown) {
    this.id = get(payload, 'm_id') || get(payload, 'id') || -1;
    this.name = get(payload, 'm_name') || get(payload, 'name') || '';
    this.phone = get(payload, 'phone', '');
    this.account = get(payload, 'account', '');
    this.password = get(payload, 'password', '');
    this.authority = get(payload, 'authority', 1);
  }
}
