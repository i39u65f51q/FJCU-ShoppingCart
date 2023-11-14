import { getOrders, getOrder, updateOrder, deleteOrder, addOrder } from '../lib/fetch.js';

const list = [];

export async function initialize() {
  list = await getOrders();
}

export function getList() {
  return list;
}
