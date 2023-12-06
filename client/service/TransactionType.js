//508062334 陳彥志
import * as api from '../api/api.js';
export class TransactionTypeService {
  constructor() {}
  async getTransactionType() {
    const res = await api.getTransactionType();
    const { success, content } = res;
    if (!success) return [];
    return content;
  }
}
