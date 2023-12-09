//508062334 陳彥志
import { get } from 'lodash-es';

export class ProductDto {
  public id: number;
  public name: string;
  public price: number;
  public quantity: number;
  public disabled: number;
  constructor(payload: unknown) {
    this.id = get(payload, 'p_id') || get(payload, 'id') || get(payload, 'productId') || -1;
    this.name = get(payload, 'p_name') || get(payload, 'name') || '';
    this.price = get(payload, 'price', -1);
    this.quantity = get(payload, 'quantity', -1);
    this.disabled = get(payload, 'disabled', -1);
  }
}
