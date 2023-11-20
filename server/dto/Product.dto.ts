import { get } from 'lodash-es';

export class ProductDto {
  public id: number;
  public name: string;
  public price: number;
  public quantity: number;
  constructor(payload: unknown) {
    this.id = get(payload, 'p_id', -1);
    this.name = get(payload, 'p_name', '');
    this.price = get(payload, 'price', -1);
    this.quantity = get(payload, 'quantity', -1);
  }
}
