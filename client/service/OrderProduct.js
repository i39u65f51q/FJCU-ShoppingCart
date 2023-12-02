import * as api from '../api/api.js';

//{orderId:number, product:Id}
export class OrderProductService {
  constructor() {}
  async getOrderProducts() {
    const res = await api.getOrderProducts();
    const { success, content } = res;
    if (!success) return [];
    return content;
  }

  async getOrderProduct(orderId) {
    const res = await api.getOrderProduct(orderId);
    const { success, content } = res;
    if (!success) return [];
    return content;
  }
}
