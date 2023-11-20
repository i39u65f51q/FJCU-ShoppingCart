import { get } from 'lodash-es';

export class OrderProductDto {
  public orderId: number;
  public productId: number;
  public quantity: number;
  public eachProductPrice: number;
  public total: number;
  constructor(payload: unknown) {
    this.orderId = get(payload, 'o_id', -1);
    this.productId = get(payload, 'p_id', -1);
    this.quantity = get(payload, 'orderquantity', -1);
    this.eachProductPrice = get(payload, 'orderpriceperitem', -1);
    this.total = get(payload, 'total', -1);
  }
}
