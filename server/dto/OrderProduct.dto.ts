//508062334 陳彥志
import { get } from 'lodash-es';

export class OrderProductDto {
  public orderId: number;
  public productId: number;
  public quantity: number;
  public eachProductPrice: number;
  public total: number;
  constructor(payload: unknown) {
    this.orderId = get(payload, 'o_id') || get(payload, 'orderId') || -1;
    this.productId = get(payload, 'p_id') || get(payload, 'productId') || -1;
    this.quantity = get(payload, 'productquantity') || get(payload, 'quantity') || -1;
    this.eachProductPrice = get(payload, 'orderpriceperitem') || get(payload, 'per_price') || -1;
    this.total = get(payload, 'total', -1);
  }
}
