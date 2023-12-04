//508062334 陳彥志
import { get } from 'lodash-es';

export class OrderDto {
  public id: number;
  public memberId: number;
  public address: string;
  public status: number;
  public deliveryId: number;
  public transactionId: number;
  constructor(payload: unknown) {
    this.id = get(payload, 'o_id') || get(payload, 'orderId') || -1;
    this.memberId = get(payload, 'm_id') || get(payload, 'memberId') || -1;
    this.address = get(payload, 'address', '');
    this.status = get(payload, 'status', -1);
    this.deliveryId = get(payload, 'deliverymethodid', -1) || get(payload, 'deliveryId') || -1;
    this.transactionId = get(payload, 'transactiontypeid') || get(payload, 'transactionId') || -1;
  }
}
