//508062334 陳彥志
import * as api from '../api/api.js';
export class DeliveryMethodService {
  constructor() {}
  async getDeliveryMethod() {
    const res = await api.getDeliveryMethod();
    const { success, content } = res;
    if (!success) return [];
    return content;
  }
}
