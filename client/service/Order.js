import { getOrders, getOrder, updateOrder, deleteOrder, addOrder } from '../lib/fetch.js';

export class OrderService {
  constructor() {
    this.list = [];

    this.init();
  }

  async init() {
    this.list = await getOrders();
  }
}
