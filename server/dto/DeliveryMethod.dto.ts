import { get } from 'lodash-es';

export class DeliveryMethodDto {
  public readonly id: number;
  public readonly name: string;
  constructor(payload: unknown) {
    this.id = get(payload, 'd_id') || get(payload, 'id') || -1;
    this.name = get(payload, 'd_name') || get(payload, 'name') || '';
  }
}
