import * as api from '../api/api.js';
export class OrderService {
  constructor() {}
  async getOrders() {
    const result = await api.getOrders();
    const { success, content } = result;
    if (!success) return [];
    return content;
  }

  async getOrder(memberId) {
    const result = await api.getOrder(memberId);
    const { success, content } = result;
    if (!success) return [];
    return content;
  }

  //payload:{id:number,  status:number};
  async updateOrder(payload) {
    const result = await api.updateOrder(payload);
    const { success } = result;
    return success;
  }

  async addOrder(payload) {
    const result = await api.addOrder(payload);
    const { success } = result;
    return success;
  }
}
