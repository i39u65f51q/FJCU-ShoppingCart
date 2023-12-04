//508062334 陳彥志
import * as api from '../api/api.js';
export class ProductService {
  constructor() {}
  async getProducts() {
    const res = await api.getProducts();
    const { success, content } = res;
    if (!success) return [];
    return content;
  }

  async updateProduct(payload) {
    const res = await api.updateProduct(payload);
    const { success } = res;
    if (!success) return false;
    return true;
  }

  async deleteProduct(productId) {
    const res = await api.deleteProduct(productId);
    const { success } = res;
    if (!success) return false;
    return true;
  }

  async addProduct(payload) {
    const res = await api.addProduct(payload);
    const { success } = res;
    if (!success) return false;
    return true;
  }
}
