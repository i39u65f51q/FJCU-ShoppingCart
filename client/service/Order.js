import * as api from '../api/api.js';

export async function getOrders() {
  const result = await api.getOrders();
  const { success, content } = result;
  if (!success) return [];
  return content;
}

export async function getOrder(memberId) {
  const result = await api.getOrder(memberId);
  const { success, content } = result;
  if (!success) return [];
  return content;
}

//payload:{id:number,  status:number};
export async function updateOrder(payload) {
  const result = await api.updateOrder(payload);
  const { success } = result;
  return success;
}

export async function addOrder(payload) {
  const result = await api.addOrder(payload);
  const { success } = result;
  return success;
}
